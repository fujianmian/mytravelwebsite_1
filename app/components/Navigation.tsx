'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Home,
  Calendar,
  Plus,
  Image,
  User,
  Zap
} from 'lucide-react';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/', id: 'dashboard' },
    { icon: Calendar, label: 'Events', href: '/events', id: 'events' },
    { icon: Plus, label: 'Create', href: '/create', id: 'create' },
    { icon: Image, label: 'Gallery', href: '/gallery', id: 'gallery' },
    { icon: User, label: 'Profile', href: '/profile', id: 'profile' },
  ];

  const handleNavigation = (href) => {
    router.push(href);
  };

  const isActiveRoute = (href) => {
    return pathname === href;
  };

  return (
    <>
      {/* Top Header */}
      <header className="border-b border-[#1B1B1B] bg-[#0F0F0F]/90 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF0080] to-[#00FFFF] flex items-center justify-center cyberpunk-glow">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-['Orbitron'] font-bold neon-text">
                CyberEvents
              </span>
            </div>

            {/* User Avatar */}
            <Avatar className="w-8 h-8 border-2 border-[#00FFFF]">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
              <AvatarFallback className="bg-[#1B1B1B] text-[#00FFFF]">NM</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#1B1B1B] bg-[#0F0F0F]/95 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleNavigation(item.href)}
                className={`flex flex-col items-center gap-1 px-3 py-2 h-auto min-w-0 transition-all duration-300 ${isActiveRoute(item.href)
                  ? 'text-[#FF0080] cyberpunk-glow'
                  : 'text-[#B0B0B0] hover:text-white'
                  }`}
              >
                <item.icon className={`w-5 h-5 ${isActiveRoute(item.href) ? 'text-[#FF0080]' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom padding to prevent content from being hidden behind nav */}
      <div className="h-16" />
    </>
  );
}