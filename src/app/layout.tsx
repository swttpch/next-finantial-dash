import type { Metadata } from 'next';
import './globals.css';
import 'chart.js/auto';
import { Providers } from '@/providers/chakra.provider';

export const metadata: Metadata = {
  title: 'Finantial app',
  description: 'Finantial app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      // className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
