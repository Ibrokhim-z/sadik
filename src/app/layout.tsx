import type { Metadata } from 'next';
import { connection } from 'next/server';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollAnimator from '@/components/ui/ScrollAnimator';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SessionProvider from '@/components/ui/SessionProvider';

export const metadata: Metadata = {
  title: 'Балапан — Частный детский сад в Алматы',
  description: 'Тёплый и безопасный частный детский сад «Балапан» в Алматы. Игровое развитие, творчество, музыка, подготовка к школе. Запишитесь на экскурсию.',
  keywords: 'детский сад алматы, частный детский сад, балапан, дошкольное образование',
  openGraph: {
    title: 'Балапан — Частный детский сад в Алматы',
    description: 'Место, где детство наполнено открытиями.',
    type: 'website',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await connection();
  const session = await getServerSession(authOptions);
  return (
    <html lang="ru">
      <body>
        <SessionProvider session={session}>
          <Navbar />
          <main style={{ paddingTop: 'var(--nav-h)' }}>
            {children}
          </main>
          <Footer />
          <ScrollAnimator />
        </SessionProvider>
      </body>
    </html>
  );
}
