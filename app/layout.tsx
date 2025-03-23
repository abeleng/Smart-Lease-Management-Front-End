import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Modify font loading configuration to prevent timeout
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Add display swap to prevent blocking
  preload: true,
  adjustFontFallback: false // Disable font fallback adjustment
});

export const metadata: Metadata = {
  title: 'Lease Calculator App',
  description: 'Calculate and manage your leases efficiently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}