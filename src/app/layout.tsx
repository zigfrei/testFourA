import type { Metadata } from 'next';
import { Montserrat, Raleway } from 'next/font/google';
import './globals.css';
import localFont from 'next/font/local';
import Header from '@/components/layout/header';
import Providers from './providers';

const gilroy = localFont({
  src: [
    {
      path: './fonts/Gilroy/Gilroy-Medium_0.ttf',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-gilroy',
  display: 'swap',
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
});
export const metadata: Metadata = {
  title: 'Тестовое 4А',
  description:
    'Тестовое задание для кандидата на вакансию Frontend-разработчика в компанию 4А',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='ru'
      className={`${raleway.variable} ${gilroy.variable} antialiased`}
    >
      <body
        className={`${montserrat.className} relative bg-main-background text-base-white flex flex-col items-center justify-center`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
