import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import styles from './news.module.css';

export const metadata: Metadata = {
    title: 'Новости и события — Детский сад «Балапан»',
    description: 'Последние новости, праздники, мероприятия и объявления детского сада «Балапан».',
};

export default async function NewsPage() {
    const news = await prisma.news.findMany({
        where: { published: true },
        orderBy: { publishedAt: 'desc' },
    });

    return (
        <>
            <section className={`section ${styles.hero}`}>
                <div className="container">
                    <div className="section-header">
                        <div className="tag">Новости</div>
                        <h1>Новости и события</h1>
                        <p>Следите за жизнью нашего детского сада — праздники, занятия, объявления и многое другое.</p>
                    </div>
                </div>
            </section>

            <section className={`section ${styles.main}`}>
                <div className="container">
                    {news.length === 0 ? (
                        <div className={styles.empty}>
                            <span>📰</span>
                            <p>Новостей пока нет. Скоро появится что-то интересное!</p>
                        </div>
                    ) : (
                        <div className={styles.grid}>
                            {news.map((n, i) => (
                                <Link key={n.id} href={`/news/${n.slug}`} className={`${styles.card} reveal stagger-${Math.min(i % 5 + 1, 5)}`}>
                                    <div className={styles.imgBox}>
                                        <span>📰</span>
                                    </div>
                                    <div className={styles.body}>
                                        <div className={styles.date}>
                                            {new Date(n.publishedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </div>
                                        <h3>{n.title}</h3>
                                        <p>{n.excerpt || n.content.substring(0, 120) + '...'}</p>
                                        <span className={styles.readMore}>Читать далее →</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
