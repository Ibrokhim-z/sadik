'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';
import styles from './Navbar.module.css';

const links = [
    { href: '/', label: 'Главная' },
    { href: '/about', label: 'О нас' },
    { href: '/activities', label: 'Занятия' },
    { href: '/teachers', label: 'Воспитатели' },
    { href: '/gallery', label: 'Галерея' },
    { href: '/news', label: 'Новости' },
    { href: '/contacts', label: 'Контакты' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const close = () => setMenuOpen(false);

    return (
        <>
            <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
                <div className={`container ${styles.inner}`}>
                    {/* Logo */}
                    <Link href="/" className={styles.logo} onClick={close}>
                        <span className={styles.logoLeaf}>
                            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                                <path d="M16 4C16 4 6 10 6 20a10 10 0 0020 0C26 10 16 4 16 4z" fill="#3D7A5E" />
                                <path d="M16 12v12" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
                                <path d="M16 18c0 0-3-3-5-2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M16 15c0 0 3-2 5-1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </span>
                        <span className={styles.logoText}>Балапан</span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className={styles.desktopNav}>
                        {links.map(l => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className={`${styles.navLink} ${pathname === l.href ? styles.active : ''}`}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA + Burger */}
                    <div className={styles.actions}>
                        <a href="tel:+77272000000" className={styles.phoneBtn}>
                            <Phone size={15} strokeWidth={2.2} />
                            <span>+7 (727) 200-00-00</span>
                        </a>
                        <Link href="/contacts" className={`btn btn-primary ${styles.ctaBtn}`}>
                            Записаться
                        </Link>
                        <button
                            className={styles.burger}
                            onClick={() => setMenuOpen(v => !v)}
                            aria-label="Открыть меню"
                            aria-expanded={menuOpen}
                        >
                            {menuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile overlay backdrop */}
            <div
                className={`${styles.backdrop} ${menuOpen ? styles.backdropOpen : ''}`}
                onClick={close}
                aria-hidden="true"
            />

            {/* Mobile slide-out drawer */}
            <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`} role="dialog" aria-label="Навигация">
                <div className={styles.drawerHeader}>
                    <Link href="/" className={styles.logo} onClick={close}>
                        <span className={styles.logoLeaf}>
                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                                <path d="M16 4C16 4 6 10 6 20a10 10 0 0020 0C26 10 16 4 16 4z" fill="#3D7A5E" />
                                <path d="M16 12v12" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                        </span>
                        <span className={styles.logoText}>Балапан</span>
                    </Link>
                    <button className={styles.closeBtn} onClick={close} aria-label="Закрыть меню">
                        <X size={22} strokeWidth={2} />
                    </button>
                </div>

                <nav className={styles.drawerNav}>
                    {links.map(l => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className={`${styles.drawerLink} ${pathname === l.href ? styles.drawerActive : ''}`}
                            onClick={close}
                        >
                            {l.label}
                            <ChevronRight size={16} className={styles.chevron} />
                        </Link>
                    ))}
                </nav>

                <div className={styles.drawerFooter}>
                    <a href="tel:+77272000000" className={`btn btn-outline`} style={{ width: '100%', justifyContent: 'center' }}>
                        <Phone size={16} />
                        +7 (727) 200-00-00
                    </a>
                    <Link href="/contacts" className={`btn btn-primary`} style={{ width: '100%', justifyContent: 'center' }} onClick={close}>
                        Записаться на экскурсию
                    </Link>
                </div>
            </div>
        </>
    );
}
