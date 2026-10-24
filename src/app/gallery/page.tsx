import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import GalleryClient from './GalleryClient';
import styles from './gallery.module.css';

export const metadata: Metadata = {
    title: 'Галерея — Детский сад «Балапан»',
    description: 'Фотографии занятий, игровых комнат, прогулок и праздников в детском саду «Балапан».',
};

export default async function GalleryPage() {
    const images = await prisma.galleryImage.findMany({ orderBy: { order: 'asc' } });

    return (
        <>
            <section className={`section ${styles.hero}`}>
                <div className="container">
                    <div className="section-header">
                        <div className="tag">Галерея</div>
                        <h1>Жизнь нашего детского сада</h1>
                        <p>Посмотрите, как проходят обычные дни, праздники и творческие занятия в «Балапан».</p>
                    </div>
                </div>
            </section>
            <section className={`section ${styles.main}`}>
                <div className="container">
                    <GalleryClient images={images} />
                </div>
            </section>
        </>
    );
}
