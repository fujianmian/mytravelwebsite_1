'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  DollarSign,
  Upload,
  Tag,
  Zap,
  Plus,
  X
} from 'lucide-react';
import Navigation from '../components/Navigation';

export default function CreateEvent() {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: '',
    maxAttendees: '',
    category: ''
  });

  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const categories = [
    'Music', 'Art', 'Technology', 'Gaming', 'Fashion', 'Business', 'Sports', 'Food'
  ];

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleInputChange = (field: string, value: string) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] circuit-pattern pb-20">
      <Navigation />

      <main className="container mx-auto px-4 py-8 bottom-nav-safe">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-['Orbitron'] font-bold mb-4">
            <span className="neon-text glitch-text" data-text="CREATE">CREATE</span>
            <span className="neon-text-cyan ml-4">EVENT</span>
          </h1>
          <p className="text-[#B0B0B0] text-lg max-w-2xl">
            Design your next cyberpunk experience. Create immersive events that push the boundaries of reality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="holographic-card cyberpunk-border">
              <CardHeader>
                <CardTitle className="text-xl font-['Orbitron'] text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#FF0080]" />
                  Event Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-[#B0B0B0] mb-2 block">Event Title</label>
                  <Input
                    placeholder="Enter your event title..."
                    value={eventData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="bg-[#1B1B1B] border-[#FF0080] text-white placeholder-[#B0B0B0] cyberpunk-border"
                  />
                </div>

                <div>
                  <label className="text-sm text-[#B0B0B0] mb-2 block">Description</label>
                  <Textarea
                    placeholder="Describe your cyberpunk event experience..."
                    value={eventData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="bg-[#1B1B1B] border-[#FF0080] text-white placeholder-[#B0B0B0] cyberpunk-border min-h-[120px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-[#B0B0B0] mb-2 block flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#00FFFF]" />
                      Date
                    </label>
                    <Input
                      type="date"
                      value={eventData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="bg-[#1B1B1B] border-[#00FFFF] text-white cyberpunk-border"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-[#B0B0B0] mb-2 block flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#8AFF00]" />
                      Time
                    </label>
                    <Input
                      type="time"
                      value={eventData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="bg-[#1B1B1B] border-[#8AFF00] text-white cyberpunk-border"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-[#B0B0B0] mb-2 block flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#FCEE09]" />
                    Location
                  </label>
                  <Input
                    placeholder="Event location or virtual space..."
                    value={eventData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="bg-[#1B1B1B] border-[#FCEE09] text-white placeholder-[#B0B0B0] cyberpunk-border"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Event Settings */}
            <Card className="holographic-card cyberpunk-border">
              <CardHeader>
                <CardTitle className="text-xl font-['Orbitron'] text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#00FFFF]" />
                  Event Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-[#B0B0B0] mb-2 block flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[#8AFF00]" />
                      Price ($)
                    </label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={eventData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className="bg-[#1B1B1B] border-[#8AFF00] text-white placeholder-[#B0B0B0] cyberpunk-border"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-[#B0B0B0] mb-2 block flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#FF0080]" />
                      Max Attendees
                    </label>
                    <Input
                      type="number"
                      placeholder="100"
                      value={eventData.maxAttendees}
                      onChange={(e) => handleInputChange('maxAttendees', e.target.value)}
                      className="bg-[#1B1B1B] border-[#FF0080] text-white placeholder-[#B0B0B0] cyberpunk-border"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-[#B0B0B0] mb-2 block">Category</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={eventData.category === category ? 'default' : 'outline'}
                        onClick={() => handleInputChange('category', category)}
                        className={`cyberpunk-border text-sm ${eventData.category === category
                            ? 'bg-[#FF0080] text-white cyberpunk-glow'
                            : 'bg-transparent text-[#B0B0B0] hover:text-white'
                          }`}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-[#B0B0B0] mb-2 block flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#00FFFF]" />
                    Tags
                  </label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add a tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      className="bg-[#1B1B1B] border-[#00FFFF] text-white placeholder-[#B0B0B0] cyberpunk-border"
                    />
                    <Button
                      onClick={addTag}
                      className="cyberpunk-border bg-[#00FFFF] text-black hover:bg-[#00FFFF]/80"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-[#1B1B1B] text-[#00FFFF] border border-[#00FFFF] flex items-center gap-1"
                      >
                        {tag}
                        <X
                          className="w-3 h-3 cursor-pointer hover:text-[#FF0080]"
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Actions */}
          <div className="space-y-6">
            {/* Event Preview */}
            <Card className="holographic-card cyberpunk-border">
              <CardHeader>
                <CardTitle className="text-lg font-['Orbitron'] text-white">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="w-full h-32 bg-[#1B1B1B] rounded-lg border-2 border-dashed border-[#FF0080] flex items-center justify-center">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-[#FF0080] mx-auto mb-2" />
                      <p className="text-sm text-[#B0B0B0]">Upload Event Image</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-['Orbitron'] font-semibold text-white mb-2">
                      {eventData.title || 'Event Title'}
                    </h3>
                    <p className="text-sm text-[#B0B0B0] line-clamp-3">
                      {eventData.description || 'Event description will appear here...'}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#00FFFF]" />
                      <span className="text-[#B0B0B0]">
                        {eventData.date || 'Date'} {eventData.time && `at ${eventData.time}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#8AFF00]" />
                      <span className="text-[#B0B0B0]">{eventData.location || 'Location'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[#FCEE09]" />
                      <span className="text-[#B0B0B0]">${eventData.price || '0'}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full cyberpunk-border bg-gradient-to-r from-[#FF0080] to-[#00FFFF] text-white hover:from-[#00FFFF] hover:to-[#FF0080] cyberpunk-glow">
                Create Event
              </Button>
              <Button className="w-full cyberpunk-border bg-transparent text-[#B0B0B0] hover:text-white hover:bg-[#1B1B1B]">
                Save as Draft
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
