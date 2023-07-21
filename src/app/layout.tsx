import './globals.css';
import { Nunito } from 'next/font/google';
import type { Metadata } from 'next';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChipWiz V2',
  description: 'Poker chips when no chips are available',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/assets/icons/favicon.ico' sizes='any' />
      </head>
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
