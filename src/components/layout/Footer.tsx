'use client';
import Link from 'next/link';
import { MapPin, Phone, MessageCircle, Clock, ArrowUp } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.brand}>
                    <Link href="/" className={styles.logo}>
                        <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
                            <path d="M16 4C16 4 6 10 6 20a10 10 0 0020 0C26 10 16 4 16 4z" fill="#3D7A5E" />
                            <path d="M16 12v12" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
                            <path d="M16 18c0 0-3-3-5-2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M16 15c0 0 3-2 5-1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        Балапан
                    </Link>
                    <p>Место, где детство наполнено открытиями. Тёплый частный детский сад в Алматы.</p>
                    <div className={styles.social}>
                        <a href="https://wa.me/77272000000" target="_blank" rel="noopener" aria-label="WhatsApp">
                            <MessageCircle size={18} strokeWidth={1.8} />
                        </a>
                        <a href="tel:+77272000000" aria-label="Позвонить">
                            <Phone size={18} strokeWidth={1.8} />
                        </a>
                    </div>
                </div>
                <div className={styles.col}>
                    <h4>Страницы</h4>
                    <Link href="/about">О нас</Link>
                    <Link href="/activities">Занятия</Link>
                    <Link href="/teachers">Воспитатели</Link>
                    <Link href="/gallery">Галерея</Link>
                    <Link href="/news">Новости</Link>
                </div>
                <div className={styles.col}>
                    <h4>Контакты</h4>
                    <p><MapPin size={14} strokeWidth={2} /> г. Алматы, ул. Абая, 10</p>
                    <a href="tel:+77272000000"><Phone size={14} strokeWidth={2} /> +7 (727) 200-00-00</a>
                    <a href="https://wa.me/77272000000" target="_blank" rel="noopener"><MessageCircle size={14} strokeWidth={2} /> WhatsApp</a>
                    <p><Clock size={14} strokeWidth={2} /> Пн–Пт: 07:00–19:00</p>
                </div>
                <div className={styles.col}>
                    <h4>Группы</h4>
                    <Link href="/contacts">Ясельная (1.5–2 года)</Link>
                    <Link href="/contacts">Младшая (2–3 года)</Link>
                    <Link href="/contacts">Средняя (3–4 года)</Link>
                    <Link href="/contacts">Старшая (4–5 лет)</Link>
                    <Link href="/contacts">Подготовка к школе</Link>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <p>© {new Date().getFullYear()} Детский сад «Балапан». Все права защищены.</p>
                    <p className={styles.admin}><Link href="/admin">Вход для администратора</Link></p>
                </div>
            </div>
        </footer>
    );
}
