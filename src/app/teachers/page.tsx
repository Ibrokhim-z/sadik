import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import TeachersClient from './TeachersClient';
import styles from './teachers.module.css';

export const metadata: Metadata = {
    title: 'Наши воспитатели — Детский сад «Балапан»',
    description: 'Познакомьтесь с нашими педагогами. Квалифицированные, любящие детей специалисты с многолетним опытом.',
};

export default async function TeachersPage() {
    const staff = await prisma.staff.findMany({ orderBy: { order: 'asc' } });

    return (
        <>
            <section className={`section ${styles.hero}`}>
                <div className="container">
                    <div className="section-header">
                        <div className="tag">Команда</div>
                        <h1>Наши воспитатели</h1>
                        <p>Наша команда — это педагоги по призванию. Они любят детей, постоянно развиваются и создают атмосферу тепла и доверия.</p>
                    </div>
                </div>
            </section>
            <section className={`section ${styles.main}`}>
                <div className="container">
                    <TeachersClient staff={staff} />
                </div>
            </section>
        </>
    );
}
