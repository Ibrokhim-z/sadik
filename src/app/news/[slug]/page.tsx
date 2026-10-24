import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import styles from './article.module.css';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const news = await prisma.news.findUnique({ where: { slug } });
    if (!news) return { title: 'Новость не найдена' };
    return { title: `${news.title} — Балапан`, description: news.excerpt };
}

export default async function NewsArticlePage({ params }: Props) {
    const { slug } = await params;
    const news = await prisma.news.findUnique({ where: { slug, published: true } });
    if (!news) notFound();

    return (
        <section className={`section ${styles.wrap}`}>
            <div className="container">
                <div className={styles.inner}>
                    <Link href="/news" className={styles.back}>← Все новости</Link>
                    <div className={styles.date}>
                        {new Date(news.publishedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <h1>{news.title}</h1>
                    {news.excerpt && <p className={styles.excerpt}>{news.excerpt}</p>}
                    <div className={styles.imgBox}><span>📰</span></div>
                    <div className={styles.content}>{news.content}</div>
                    <div className={styles.footer}>
                        <Link href="/news" className="btn btn-outline">← Все новости</Link>
                        <Link href="/contacts" className="btn btn-primary">📅 Записаться на экскурсию</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
