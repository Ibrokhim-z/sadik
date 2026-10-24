'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import styles from '@/styles/admin.module.css';

const navItems = [
    { href: '/admin/dashboard', label: 'Дашборд', icon: '📊' },
    { href: '/admin/news', label: 'Новости', icon: '📰' },
    { href: '/admin/gallery', label: 'Галерея', icon: '🖼️' },
    { href: '/admin/staff', label: 'Сотрудники', icon: '👩‍🏫' },
    { href: '/admin/activities', label: 'Занятия', icon: '🎨' },
    { href: '/admin/inquiries', label: 'Заявки', icon: '📋' },
    { href: '/admin/settings', label: 'Настройки', icon: '⚙️' },
];

export default function AdminSidebar({ adminName }: { adminName?: string }) {
    const pathname = usePathname();
    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarLogo}>
                <h2>🌿 Балапан</h2>
                <p>Панель управления</p>
            </div>
            <nav className={styles.sidebarNav}>
                {navItems.map(i => (
                    <Link
                        key={i.href}
                        href={i.href}
                        className={`${styles.sidebarLink} ${pathname === i.href ? styles.active : ''}`}
                    >
                        <span>{i.icon}</span> {i.label}
                    </Link>
                ))}
                <Link href="/" className={styles.sidebarLink} target="_blank">
                    <span>🌐</span> Перейти на сайт
                </Link>
            </nav>
            <div className={styles.sidebarFooter}>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', marginBottom: 10, paddingLeft: 14 }}>
                    👤 {adminName || 'Администратор'}
                </div>
                <button className={styles.logoutBtn} onClick={() => signOut({ callbackUrl: '/admin/login' })}>
                    🚪 Выйти
                </button>
            </div>
        </aside>
    );
}
