import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import styles from '@/styles/admin.module.css';

export default async function AdminDashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect('/admin/login');

    const [newsCount, staffCount, galleryCount, inquiryCount, unreadCount] = await Promise.all([
        prisma.news.count(),
        prisma.staff.count(),
        prisma.galleryImage.count(),
        prisma.inquiry.count(),
        prisma.inquiry.count({ where: { read: false } }),
    ]);
    const recentInquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 5 });

    return (
        <>
            <div className={styles.topbar}>
                <h1>📊 Дашборд</h1>
                <div className={styles.topbarRight}>
                    <span className={styles.adminBadge}>Администратор</span>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={`${styles.icon} ${styles.green}`}>📰</div>
                        <div><strong>{newsCount}</strong><p>Новостей</p></div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={`${styles.icon} ${styles.blue}`}>👩‍🏫</div>
                        <div><strong>{staffCount}</strong><p>Сотрудников</p></div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={`${styles.icon} ${styles.yellow}`}>🖼️</div>
                        <div><strong>{galleryCount}</strong><p>Фото в галерее</p></div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={`${styles.icon} ${styles.red}`}>📋</div>
                        <div>
                            <strong>{inquiryCount}</strong>
                            <p>Заявок {unreadCount > 0 && <span style={{ color: 'var(--primary)', fontWeight: 700 }}>({unreadCount} новых)</span>}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.tableHeader}>
                    <h2>Последние заявки</h2>
                </div>
                <table className={styles.adminTable}>
                    <thead>
                        <tr>
                            <th>Родитель</th>
                            <th>Телефон</th>
                            <th>Возраст</th>
                            <th>Группа</th>
                            <th>Дата</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentInquiries.map(inq => (
                            <tr key={inq.id} className={!inq.read ? styles.unread : ''}>
                                <td><strong>{inq.parentName}</strong></td>
                                <td><a href={`tel:${inq.phone}`}>{inq.phone}</a></td>
                                <td>{inq.childAge}</td>
                                <td>{inq.groupInterest}</td>
                                <td>{new Date(inq.createdAt).toLocaleDateString('ru-RU')}</td>
                                <td>
                                    <span className={`${styles.readBadge} ${inq.read ? styles.read : styles.new}`}>
                                        {inq.read ? 'Обработана' : '🔔 Новая'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {recentInquiries.length === 0 && (
                            <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-light)', padding: 40 }}>Заявок пока нет</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
