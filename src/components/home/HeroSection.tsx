'use client';
import Link from 'next/link';
import { ArrowRight, Phone, Star, Users, Heart } from 'lucide-react';
import styles from './HeroSection.module.css';

const STATS = [
    { icon: <Star size={18} strokeWidth={2} />, value: '7+', label: 'лет работы' },
    { icon: <Users size={18} strokeWidth={2} />, value: '150+', label: 'выпускников' },
    { icon: <Heart size={18} strokeWidth={2} />, value: '98%', label: 'довольных семей' },
];

// Unsplash photo for hero background
const HERO_IMG = 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1800&q=85&auto=format&fit=crop';

export default function HeroSection() {
    return (
        <section className={styles.hero}>
            {/* Background image */}
            <div
                className={styles.bg}
                style={{ backgroundImage: `url('${HERO_IMG}')` }}
            />
            <div className={styles.overlay} />

            <div className={`container ${styles.content}`}>
                <div className={styles.left}>
                    <span className={`tag ${styles.tag}`}>
                        Частный детский сад в Алматы
                    </span>
                    <h1 className={styles.title}>
                        Место, где детство<br />
                        <em>наполнено открытиями</em>
                    </h1>
                    <p className={styles.desc}>
                        Мы создаём безопасную, тёплую и вдохновляющую среду для детей от 1.5 до 6 лет. Гармоничное развитие через игру, творчество и заботу.
                    </p>
                    <div className={styles.btns}>
                        <Link href="/contacts" className="btn btn-accent">
                            Записаться на экскурсию <ArrowRight size={16} />
                        </Link>
                        <a href="tel:+77272000000" className="btn btn-white">
                            <Phone size={16} />
                            Позвонить нам
                        </a>
                    </div>

                    {/* Stats row */}
                    <div className={styles.stats}>
                        {STATS.map((s, i) => (
                            <div key={i} className={styles.stat}>
                                <span className={styles.statIcon}>{s.icon}</span>
                                <strong>{s.value}</strong>
                                <span>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom wave */}
            <div className={styles.wave}>
                <svg viewBox="0 0 1440 80" preserveAspectRatio="none" fill="var(--bg)">
                    <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
                </svg>
            </div>
        </section>
    );
}
