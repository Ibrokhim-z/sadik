'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ZoomIn } from 'lucide-react';
import styles from './GalleryPreview.module.css';

// Real Unsplash kindergarten gallery photos
const GALLERY = [
    { src: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=600&q=80&auto=format&fit=crop', caption: 'Творческое занятие' },
    { src: 'https://images.unsplash.com/photo-1503516459261-40c66117780a?w=600&q=80&auto=format&fit=crop', caption: 'Прогулка на улице' },
    { src: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&q=80&auto=format&fit=crop', caption: 'Игровая зона' },
    { src: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80&auto=format&fit=crop', caption: 'Рисование' },
    { src: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80&auto=format&fit=crop', caption: 'Чтение книг' },
    { src: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&q=80&auto=format&fit=crop', caption: 'Музыкальное занятие' },
];

interface GalleryImage { id: number; url: string; caption: string; }

export default function GalleryPreview({ images }: { images: GalleryImage[] }) {
    const [lightbox, setLightbox] = useState<string | null>(null);

    // Use DB images if available, else fallback to Unsplash
    const display = images.length > 0
        ? images.slice(0, 6).map(img => ({ src: img.url || GALLERY[0].src, caption: img.caption }))
        : GALLERY;

    return (
        <section className={`section ${styles.wrap}`}>
            <div className="container">
                <div className="section-header">
                    <div className="tag">Галерея</div>
                    <h2>Жизнь нашего детского сада</h2>
                    <p>Посмотрите, как проходят будни и праздники в «Балапан».</p>
                </div>
                <div className={styles.grid}>
                    {display.map((img, i) => (
                        <div
                            key={i}
                            className={`${styles.item} reveal stagger-${Math.min(i + 1, 5)}`}
                            onClick={() => setLightbox(img.src)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={e => e.key === 'Enter' && setLightbox(img.src)}
                        >
                            <div className={styles.imgWrap}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={img.src} alt={img.caption} loading="lazy" />
                                <div className={styles.overlay}>
                                    <ZoomIn size={28} strokeWidth={1.8} color="#fff" />
                                    <span>{img.caption}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.cta}>
                    <Link href="/gallery" className="btn btn-outline">Смотреть всю галерею →</Link>
                </div>
            </div>

            {lightbox && (
                <div className="lightbox-overlay open" onClick={() => setLightbox(null)}>
                    <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
                    <img src={lightbox} alt="Gallery" />
                </div>
            )}
        </section>
    );
}
