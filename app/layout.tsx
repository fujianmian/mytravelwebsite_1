import './globals.css';
import type { Metadata } from 'next';
import { Orbitron, Exo_2 } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900']
});

const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-exo2',
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://your-domain.com' // Replace with your actual production domain
      : 'http://localhost:3001'
  ),
  title: 'CyberEvents - Built with ChatAndBuild',
  description: 'Cyberpunk-themed event management platform with neon aesthetics and futuristic design',
  keywords: 'no-code, app builder, conversation-driven development, event management, cyberpunk theme, Next.js, TypeScript',
  openGraph: {
    title: 'CyberEvents - Built with ChatAndBuild',
    description: 'Cyberpunk-themed event management platform with neon aesthetics and futuristic design',
    images: ['https://cdn.chatandbuild.com/images/preview.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CyberEvents - Built with ChatAndBuild',
    description: 'Cyberpunk-themed event management platform with neon aesthetics and futuristic design',
    images: ['https://cdn.chatandbuild.com/images/preview.png'],
    site: '@chatandbuild',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${exo2.variable}`}>
      <body className={`${exo2.className} min-h-screen`}>
        {children}
      </body>
    </html>
  );
}