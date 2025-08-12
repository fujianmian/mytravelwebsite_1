'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Search,
  Filter,
  Heart,
  Share2,
  Download,
  Play,
  Eye,
  Calendar,
  User
} from 'lucide-react';
import Navigation from '../components/Navigation';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  title: string;
  event: string;
  date: string;
  author: string;
  likes: number;
  views: number;
  category: string;
  isLiked: boolean;
}

const mockMedia: MediaItem[] = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    title: 'Neon Nights Opening',
    event: 'Neon Nights Festival',
    date: '2024-02-15',
    author: 'Trinity Code',
    likes: 1247,
    views: 8934,
    category: 'Concert',
    isLiked: true
  },
  {
    id: '2',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    title: 'Digital Art Showcase',
    event: 'Art Revolution Expo',
    date: '2024-02-18',
    author: 'Morpheus Prime',
    likes: 892,
    views: 5621,
    category: 'Art',
    isLiked: false
  },
  {
    id: '3',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    title: 'Hacker Conference Keynote',
    event: 'Hacker Conference 2024',
    date: '2024-02-22',
    author: 'Agent Smith',
    likes: 567,
    views: 3421,
    category: 'Tech',
    isLiked: true
  },
  {
    id: '4',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
    title: 'Gaming Tournament Finals',
    event: 'Neon Gaming Tournament',
    date: '2024-02-25',
    author: 'Cipher Ghost',
    likes: 1834,
    views: 12456,
    category: 'Gaming',
    isLiked: false
  },
  {
    id: '5',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop',
    title: 'Future Fashion Runway',
    event: 'Future Fashion Week',
    date: '2024-03-01',
    author: 'Neo Matrix',
    likes: 723,
    views: 4567,
    category: 'Fashion',
    isLiked: true
  },
  {
    id: '6',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    title: 'AI Summit Presentation',
    event: 'Blockchain & AI Summit',
    date: '2024-03-05',
    author: 'Data Oracle',
    likes: 445,
    views: 2890,
    category: 'Tech',
    isLiked: false
  }
];

export default function Gallery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [media, setMedia] = useState(mockMedia);

  const categories = ['All', 'Concert', 'Art', 'Tech', 'Gaming', 'Fashion'];
  const types = ['All', 'Images', 'Videos'];

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.event.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesType = selectedType === 'All' ||
      (selectedType === 'Images' && item.type === 'image') ||
      (selectedType === 'Videos' && item.type === 'video');
    return matchesSearch && matchesCategory && matchesType;
  });

  const toggleLike = (mediaId: string) => {
    setMedia(media.map(item =>
      item.id === mediaId ? { ...item, isLiked: !item.isLiked } : item
    ));
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] circuit-pattern pb-20 bottom-nav-safe">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-['Orbitron'] font-bold mb-4">
            <span className="neon-text glitch-text" data-text="CYBER">CYBER</span>
            <span className="neon-text-cyan ml-4">GALLERY</span>
          </h1>
          <p className="text-[#B0B0B0] text-lg max-w-2xl">
            Explore stunning visuals and moments captured from cyberpunk events across the digital realm.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B0B0B0] w-4 h-4" />
            <Input
              placeholder="Search gallery..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#1B1B1B] border-[#FF0080] text-white placeholder-[#B0B0B0] cyberpunk-border"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Category Filters */}
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

            {/* Type Filters */}
            <div className="w-px h-8 bg-[#1B1B1B] mx-2" />
            {types.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? 'default' : 'outline'}
                onClick={() => setSelectedType(type)}
                className={`cyberpunk-border ${selectedType === type
                    ? 'bg-[#00FFFF] text-black cyberpunk-glow-cyan'
                    : 'bg-transparent text-[#B0B0B0] hover:text-white'
                  }`}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item) => (
            <Card key={item.id} className="holographic-card cyberpunk-border hover:cyberpunk-glow transition-all duration-300 overflow-hidden group">
              <div className="relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Media Type Indicator */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-[#FF0080] flex items-center justify-center cyberpunk-glow">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#FF0080] text-white border-0">
                    {item.category}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleLike(item.id)}
                    className={`w-8 h-8 p-0 rounded-full ${item.isLiked
                        ? 'bg-[#FF0080] text-white cyberpunk-glow'
                        : 'bg-black/50 text-white hover:bg-[#FF0080]'
                      }`}
                  >
                    <Heart className={`w-4 h-4 ${item.isLiked ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-8 h-8 p-0 rounded-full bg-black/50 text-white hover:bg-[#00FFFF] hover:text-black"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-8 h-8 p-0 rounded-full bg-black/50 text-white hover:bg-[#8AFF00] hover:text-black"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>

                {/* Stats Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <div className="flex items-center gap-3 text-white text-sm">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{item.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{item.views.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <h3 className="font-['Orbitron'] font-semibold text-white line-clamp-1">
                    {item.title}
                  </h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#00FFFF]" />
                      <span className="text-[#B0B0B0]">{item.event}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#8AFF00]" />
                      <span className="text-[#B0B0B0]">by {item.author}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-[#B0B0B0]">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                    <Badge variant="outline" className="text-xs border-[#00FFFF] text-[#00FFFF]">
                      {item.type.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {filteredMedia.length > 0 && (
          <div className="text-center mt-8">
            <Button className="cyberpunk-border bg-transparent text-[#00FFFF] hover:bg-[#00FFFF] hover:text-[#0F0F0F] cyberpunk-glow-cyan">
              Load More Media
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredMedia.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-xl font-['Orbitron'] text-white mb-2">No Media Found</h3>
            <p className="text-[#B0B0B0]">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>
    </div>
  );
}
