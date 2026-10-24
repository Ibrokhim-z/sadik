'use client';
import { useState } from 'react';
import styles from './gallery.module.css';

interface GalleryImage {
    id: number;
    url: string;
    caption: string;
    category: string;
}

const CATEGORY_COLORS: Record<string, string> = {
    'Помещения': '#c8f0dc',
    'Занятия': '#ffe8d0',
    'Прогулки': '#d0eeff',
    'Праздники': '#f0d0ff',
    'Творчество': '#fff0c8',
    'Питание': '#d0ffe8',
    'Общее': '#ffe0e0',
};

const CATEGORY_EMOJIS: Record<string, string> = {
    'Помещения': '🏠',
    'Занятия': '🎨',
    'Прогулки': '🌳',
    'Праздники': '🎉',
    'Творчество': '✏️',
    'Питание': '🥗',
    'Общее': '📷',
};

export default function GalleryClient({ images }: { images: GalleryImage[] }) {
    const cats = ['Все', ...Array.from(new Set(images.map(img => img.category)))];
    const [active, setActive] = useState('Все');
    const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

    const filtered = active === 'Все' ? images : images.filter(img => img.category === active);

    return (
        <>
            <div className={styles.filters}>
                {cats.map(c => (
                    <button
                        key={c}
                        className={`${styles.filter} ${active === c ? styles.filterActive : ''}`}
                        onClick={() => setActive(c)}
                    >
                        {c !== 'Все' && CATEGORY_EMOJIS[c]} {c}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className={styles.empty}>
                    <span>📷</span>
                    <p>В этой категории пока нет фотографий</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {filtered.map((img, i) => (
                        <div
                            key={img.id}
                            className={`${styles.item} reveal stagger-${Math.min(i % 5 + 1, 5)}`}
                            onClick={() => setLightbox(img)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={e => e.key === 'Enter' && setLightbox(img)}
                        >
                            <div
                                className={styles.imgBox}
                                style={{ background: CATEGORY_COLORS[img.category] || '#e8f0f8' }}
                            >
                                <span className={styles.emoji}>{CATEGORY_EMOJIS[img.category] || '📷'}</span>
                                <div className={styles.overlay}>
                                    <span>🔍</span>
                                    {img.caption && <p>{img.caption}</p>}
                                </div>
                            </div>
                            {img.caption && <div className={styles.cap}>{img.caption}</div>}
                        </div>
                    ))}
                </div>
            )}

            {lightbox && (
                <div
                    className="lightbox-overlay open"
                    onClick={() => setLightbox(null)}
                >
                    <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
                    <div className={styles.lightboxInner} onClick={e => e.stopPropagation()}>
                        <div
                            className={styles.lightboxImg}
                            style={{ background: CATEGORY_COLORS[lightbox.category] || '#e8f0f8' }}
                        >
                            <span style={{ fontSize: '6rem' }}>{CATEGORY_EMOJIS[lightbox.category] || '📷'}</span>
                        </div>
                        {lightbox.caption && <p className={styles.lightboxCap}>{lightbox.caption}</p>}
                    </div>
                </div>
            )}
        </>
    );
}
