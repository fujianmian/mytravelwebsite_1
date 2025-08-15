'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Search,
  Filter,
  Star,
  Heart,
  Share2,
  Ticket
} from 'lucide-react';
import Navigation from '../components/Navigation';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  attendees: number;
  maxAttendees: number;
  price: number;
  category: string;
  organizer: {
    name: string;
    avatar: string;
  };
  rating: number;
  isLiked: boolean;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Neon Nights: Cyberpunk Music Festival',
    description: 'Experience the future of music with holographic performances and AI-generated beats in a fully immersive cyberpunk environment.',
    date: '2024-02-15',
    time: '20:00',
    location: 'Neo Tokyo Arena',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
    attendees: 1247,
    maxAttendees: 2000,
    price: 89,
    category: 'Music',
    organizer: {
      name: 'Trinity Code',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    rating: 4.8,
    isLiked: true
  },
  {
    id: '2',
    title: 'Digital Art Revolution Expo',
    description: 'Showcase of cutting-edge digital art, NFT galleries, and interactive installations by renowned cyber artists.',
    date: '2024-02-18',
    time: '14:00',
    location: 'Virtual Reality Center',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    attendees: 892,
    maxAttendees: 1500,
    price: 45,
    category: 'Art',
    organizer: {
      name: 'Morpheus Prime',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    rating: 4.6,
    isLiked: false
  },
  {
    id: '3',
    title: 'Hacker Conference 2024',
    description: 'Elite gathering of cybersecurity experts, ethical hackers, and tech innovators sharing cutting-edge knowledge.',
    date: '2024-02-22',
    time: '09:00',
    location: 'Cyber Security Hub',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
    attendees: 567,
    maxAttendees: 800,
    price: 120,
    category: 'Technology',
    organizer: {
      name: 'Agent Smith',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    rating: 4.9,
    isLiked: true
  },
  {
    id: '4',
    title: 'Neon Gaming Tournament',
    description: 'Ultimate esports competition featuring the latest cyberpunk games with massive prize pools and live streaming.',
    date: '2024-02-25',
    time: '16:00',
    location: 'Gaming Arena X',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop',
    attendees: 1834,
    maxAttendees: 3000,
    price: 25,
    category: 'Gaming',
    organizer: {
      name: 'Cipher Ghost',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    rating: 4.7,
    isLiked: false
  },
  {
    id: '5',
    title: 'Future Fashion Week',
    description: 'Revolutionary fashion show featuring smart fabrics, LED clothing, and wearable technology from top cyber designers.',
    date: '2024-03-01',
    time: '19:00',
    location: 'Fashion District',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=400&fit=crop',
    attendees: 723,
    maxAttendees: 1200,
    price: 75,
    category: 'Fashion',
    organizer: {
      name: 'Neo Matrix',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    rating: 4.5,
    isLiked: true
  },
  {
    id: '6',
    title: 'Blockchain & AI Summit',
    description: 'Convergence of blockchain technology and artificial intelligence with industry leaders and innovative startups.',
    date: '2024-03-05',
    time: '10:00',
    location: 'Tech Innovation Center',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    attendees: 445,
    maxAttendees: 600,
    price: 150,
    category: 'Technology',
    organizer: {
      name: 'Data Oracle',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    rating: 4.8,
    isLiked: false
  }
];

export default function Events() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [events, setEvents] = useState(mockEvents);

  const categories = ['All', 'Music', 'Art', 'Technology', 'Gaming', 'Fashion'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleLike = (eventId: string) => {
    setEvents(events.map(event =>
      event.id === eventId ? { ...event, isLiked: !event.isLiked } : event
    ));
  };

  const getAttendancePercentage = (attendees: number, maxAttendees: number) => {
    return (attendees / maxAttendees) * 100;
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] circuit-pattern">
      <Navigation />

      <main className="container mx-auto px-4 py-8 bottom-nav-safe">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-['Orbitron'] font-bold mb-4">
            <span className="neon-text glitch-text" data-text="CYBER">CYBER</span>
            <span className="neon-text-cyan ml-4">EVENTS</span>
          </h1>
          <p className="text-[#B0B0B0] text-lg max-w-2xl">
            Discover and join the most exclusive cyberpunk events in the digital realm.
            From neon-lit concerts to high-tech conferences.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B0B0B0] w-4 h-4" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#1B1B1B] border-[#FF0080] text-white placeholder-[#B0B0B0] cyberpunk-border"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={`cyberpunk-border ${selectedCategory === category
                    ? 'bg-[#FF0080] text-white cyberpunk-glow'
                    : 'bg-transparent text-[#B0B0B0] hover:text-white'
                  }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="holographic-card cyberpunk-border hover:cyberpunk-glow transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#FF0080] text-white border-0">
                    {event.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleLike(event.id)}
                    className={`w-8 h-8 p-0 rounded-full ${event.isLiked
                        ? 'bg-[#FF0080] text-white cyberpunk-glow'
                        : 'bg-black/50 text-white hover:bg-[#FF0080]'
                      }`}
                  >
                    <Heart className={`w-4 h-4 ${event.isLiked ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-8 h-8 p-0 rounded-full bg-black/50 text-white hover:bg-[#00FFFF] hover:text-black"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="bg-black/70 px-2 py-1 rounded text-sm text-white">
                    ${event.price}
                  </div>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-['Orbitron'] text-white line-clamp-2">
                  {event.title}
                </CardTitle>
                <p className="text-[#B0B0B0] text-sm line-clamp-2">
                  {event.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Date and Time */}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-[#00FFFF]" />
                    <span className="text-[#B0B0B0]">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-[#8AFF00]" />
                    <span className="text-[#B0B0B0]">{event.location}</span>
                  </div>

                  {/* Attendees */}
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-[#FCEE09]" />
                    <span className="text-[#B0B0B0]">
                      {event.attendees.toLocaleString()} / {event.maxAttendees.toLocaleString()} attending
                    </span>
                  </div>

                  {/* Attendance Progress */}
                  <div className="w-full bg-[#1B1B1B] rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#FF0080] to-[#00FFFF] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getAttendancePercentage(event.attendees, event.maxAttendees)}%` }}
                    />
                  </div>

                  {/* Organizer and Rating */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6 border border-[#00FFFF]">
                        <AvatarImage src={event.organizer.avatar} />
                        <AvatarFallback className="bg-[#1B1B1B] text-[#00FFFF] text-xs">
                          {event.organizer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-[#B0B0B0]">{event.organizer.name}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#FCEE09] fill-current" />
                      <span className="text-sm text-[#FCEE09]">{event.rating}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full mt-4 cyberpunk-border bg-gradient-to-r from-[#FF0080] to-[#00FFFF] text-white hover:from-[#00FFFF] hover:to-[#FF0080] cyberpunk-glow">
                    <Ticket className="w-4 h-4 mr-2" />
                    Get Tickets
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {filteredEvents.length > 0 && (
          <div className="text-center mt-8">
            <Button className="cyberpunk-border bg-transparent text-[#00FFFF] hover:bg-[#00FFFF] hover:text-[#0F0F0F] cyberpunk-glow-cyan">
              Load More Events
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-['Orbitron'] text-white mb-2">No Events Found</h3>
            <p className="text-[#B0B0B0]">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>
    </div>
  );
}
