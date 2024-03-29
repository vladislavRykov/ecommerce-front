import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import './globals.css';
import NavHeader from '@/components/layouts/MainLayout/NavBar/NavHeader';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import { Provider } from 'react-redux';
import StoreProvider from './StoreProvider';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'ecommerce-front',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={roboto.className}>
          <MainLayout>{children}</MainLayout>
        </body>
      </html>
    </StoreProvider>
  );
}
