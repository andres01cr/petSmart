import '@/styles/globals.css';
import { ReactNode } from 'react';
import { Providers } from '@/redux/providers';
export const metadata = {
  title: 'Pokemon Grid App',
  description: 'Responsive grid of Pokemon using the PokeAPI',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}