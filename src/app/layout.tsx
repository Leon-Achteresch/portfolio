import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Leon Achteresch | Software Entwickler | Galaxy Portfolio',
  description: 'Full-Stack Software Entwickler spezialisiert auf React, Next.js und TypeScript. Erlebe mein Portfolio als interaktive Galaxie-Reise.',
  keywords: ['Software Entwickler', 'Web Development', 'React', 'Next.js', 'TypeScript', 'Full-Stack', 'Three.js', 'WebGL'],
  authors: [{ name: 'Leon Achteresch' }],
  openGraph: {
    title: 'Leon Achteresch | Galaxy Portfolio',
    description: 'Erlebe ein einzigartiges Portfolio als interaktive 3D Galaxie-Reise.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#030712] text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
