import './globals.css';
import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { QueryProvider } from '@/query/QueryProvider';

export const viewport: Viewport = {
  themeColor: '#ffffff',
  viewportFit: 'cover',
};
export const metadata: Metadata = {
  title: 'بیمه شخص ثالث',
  description: 'ثبت بیمه شخص ثالث',
};
const vazirmatnFont = localFont({
  src: [
    { path: '../fonts/Vazirmatn-Regular.woff2' },
    { path: '../fonts/Vazirmatn-Bold.woff2', weight: '500' },
    { path: '../fonts/Vazirmatn[wght].woff2', weight: '600 700' },
  ],
  display: 'swap',
});
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatnFont.className}>
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
