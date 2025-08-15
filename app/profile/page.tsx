'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Star,
  Trophy,
  Settings,
  Camera,
  Edit3,
  Save,
  X,
  Shield,
  Bell,
  Palette,
  Zap
} from 'lucide-react';
import Navigation from '../components/Navigation';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Neo Matrix',
    email: 'neo@cyberevents.com',
    bio: 'Cyberpunk event enthusiast and digital realm explorer. Creating immersive experiences that blur the line between reality and virtual worlds.',
    location: 'Neo Tokyo',
    joinDate: '2023-01-15'
  });

  const [editData, setEditData] = useState(profileData);

  const stats = [
    { label: 'Events Hosted', value: 28, color: '#FF0080' },
    { label: 'Events Attended', value: 156, color: '#00FFFF' },
    { label: 'Total Points', value: 15420, color: '#8AFF00' },
    { label: 'Rating', value: 4.9, color: '#FCEE09' }
  ];

  const achievements = [
    { id: 1, title: 'Cyber Legend', description: 'Reached 15,000+ points', icon: Trophy, color: '#FCEE09' },
    { id: 2, title: 'Event Master', description: 'Hosted 25+ events', icon: Star, color: '#FF0080' },
    { id: 3, title: 'Community Builder', description: 'Attended 150+ events', icon: User, color: '#00FFFF' },
    { id: 4, title: 'Digital Pioneer', description: 'Early platform adopter', icon: Zap, color: '#8AFF00' }
  ];

  const recentActivity = [
    { id: 1, type: 'hosted', event: 'Neon Nights Festival', date: '2024-02-15' },
    { id: 2, type: 'attended', event: 'Digital Art Expo', date: '2024-02-18' },
    { id: 3, type: 'hosted', event: 'Cyber Gaming Tournament', date: '2024-02-22' },
    { id: 4, type: 'attended', event: 'Future Fashion Week', date: '2024-03-01' }
  ];

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] circuit-pattern pb-20">
      <Navigation />

      <main className="container mx-auto px-4 py-8 bottom-nav-safe">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-['Orbitron'] font-bold mb-4">
            <span className="neon-text glitch-text" data-text="CYBER">CYBER</span>
            <span className="neon-text-cyan ml-4">PROFILE</span>
          </h1>
          <p className="text-[#B0B0B0] text-lg max-w-2xl">
            Manage your digital identity and track your journey through the cyberpunk event ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Profile */}
            <Card className="holographic-card cyberpunk-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-['Orbitron'] text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-[#FF0080]" />
                  Profile Information
                </CardTitle>
                <Button
                  variant="ghost"
                  onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
                  className="text-[#00FFFF] hover:text-white"
                >
                  {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-[#00FFFF] cyberpunk-glow-cyan">
                      <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" />
                      <AvatarFallback className="bg-[#1B1B1B] text-[#00FFFF] text-2xl">NM</AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full bg-[#FF0080] hover:bg-[#FF0080]/80 cyberpunk-glow"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-['Orbitron'] font-bold text-white">
                        {profileData.name}
                      </h2>
                      <Badge className="bg-[#FF0080] text-white border-0">
                        Cyber Legend
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[#B0B0B0]">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {profileData.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Joined {new Date(profileData.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-[#B0B0B0] mb-2 block">Name</label>
                    {isEditing ? (
                      <Input
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="bg-[#1B1B1B] border-[#FF0080] text-white cyberpunk-border"
                      />
                    ) : (
                      <p className="text-white">{profileData.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-[#B0B0B0] mb-2 block">Email</label>
                    {isEditing ? (
                      <Input
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        className="bg-[#1B1B1B] border-[#00FFFF] text-white cyberpunk-border"
                      />
                    ) : (
                      <p className="text-white">{profileData.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-[#B0B0B0] mb-2 block">Bio</label>
                    {isEditing ? (
                      <Textarea
                        value={editData.bio}
                        onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                        className="bg-[#1B1B1B] border-[#8AFF00] text-white cyberpunk-border min-h-[100px]"
                      />
                    ) : (
                      <p className="text-white">{profileData.bio}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-[#B0B0B0] mb-2 block">Location</label>
                    {isEditing ? (
                      <Input
                        value={editData.location}
                        onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                        className="bg-[#1B1B1B] border-[#FCEE09] text-white cyberpunk-border"
                      />
                    ) : (
                      <p className="text-white">{profileData.location}</p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleSave}
                      className="cyberpunk-border bg-[#8AFF00] text-black hover:bg-[#8AFF00]/80 cyberpunk-glow-green"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="cyberpunk-border bg-transparent text-[#B0B0B0] hover:text-white"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="holographic-card cyberpunk-border">
              <CardHeader>
                <CardTitle className="text-xl font-['Orbitron'] text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#FCEE09]" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-[#1B1B1B] border border-[#FF0080]/30"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center`} style={{ backgroundColor: achievement.color + '20', border: `1px solid ${achievement.color}` }}>
                        <achievement.icon className="w-5 h-5" style={{ color: achievement.color }} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{achievement.title}</h4>
                        <p className="text-sm text-[#B0B0B0]">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="holographic-card cyberpunk-border">
              <CardHeader>
                <CardTitle className="text-xl font-['Orbitron'] text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#00FFFF]" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#1B1B1B]/50">
                      <div className={`w-2 h-2 rounded-full ${activity.type === 'hosted' ? 'bg-[#FF0080]' : 'bg-[#00FFFF]'}`} />
                      <div className="flex-1">
                        <p className="text-white">
                          <span className={activity.type === 'hosted' ? 'text-[#FF0080]' : 'text-[#00FFFF]'}>
                            {activity.type === 'hosted' ? 'Hosted' : 'Attended'}
                          </span>
                          {' '}{activity.event}
                        </p>
                        <p className="text-sm text-[#B0B0B0]">{new Date(activity.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="holographic-card cyberpunk-border">
              <CardHeader>
                <CardTitle className="text-lg font-['Orbitron'] text-white">Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[#B0B0B0]">{stat.label}</span>
                      <span className="font-semibold text-white">{stat.value}</span>
                    </div>
                    <Progress
                      value={stat.label === 'Rating' ? (stat.value / 5) * 100 : Math.min((stat.value / 200) * 100, 100)}
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Settings */}
            <Card className="holographic-card cyberpunk-border">
              <CardHeader>
                <CardTitle className="text-lg font-['Orbitron'] text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#8AFF00]" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start cyberpunk-border bg-transparent text-[#B0B0B0] hover:text-white hover:bg-[#1B1B1B]">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy & Security
                </Button>
                <Button className="w-full justify-start cyberpunk-border bg-transparent text-[#B0B0B0] hover:text-white hover:bg-[#1B1B1B]">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Button>
                <Button className="w-full justify-start cyberpunk-border bg-transparent text-[#B0B0B0] hover:text-white hover:bg-[#1B1B1B]">
                  <Palette className="w-4 h-4 mr-2" />
                  Theme Settings
                </Button>
              </CardContent>
            </Card>

            {/* Level Progress */}
            <Card className="holographic-card cyberpunk-border">
              <CardHeader>
                <CardTitle className="text-lg font-['Orbitron'] text-white">Level Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-['Orbitron'] font-bold neon-text mb-2">47</div>
                  <p className="text-sm text-[#B0B0B0]">Current Level</p>
                </div>
                <Progress value={75} className="h-3 mb-2" />
                <div className="flex justify-between text-xs text-[#B0B0B0]">
                  <span>15,420 XP</span>
                  <span>16,000 XP</span>
                </div>
                <p className="text-center text-sm text-[#00FFFF] mt-2">580 XP to next level</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
