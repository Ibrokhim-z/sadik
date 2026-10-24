'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/admin.module.css';

interface Inquiry {
    id: number; parentName: string; phone: string; childAge: string;
    groupInterest: string; comment: string; read: boolean; createdAt: string;
}

export default function AdminInquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [selected, setSelected] = useState<Inquiry | null>(null);

    const load = async () => { const res = await fetch('/api/admin/inquiries'); setInquiries(await res.json()); };
    useEffect(() => { load(); }, []);

    const markRead = async (id: number, read: boolean) => {
        await fetch('/api/admin/inquiries', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, read }) });
        await load();
    };

    const del = async (id: number) => {
        if (!confirm('Удалить заявку?')) return;
        await fetch('/api/admin/inquiries', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
        await load(); if (selected?.id === id) setSelected(null);
    };

    const unread = inquiries.filter(i => !i.read).length;

    return (
        <>
            <div className={styles.topbar}>
                <h1>📋 Заявки</h1>
                <div className={styles.topbarRight}>
                    {unread > 0 && <span className={styles.adminBadge}>🔔 {unread} новых</span>}
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.tableHeader}>
                    <h2>Все заявки ({inquiries.length})</h2>
                </div>
                <table className={styles.adminTable}>
                    <thead><tr><th>Родитель</th><th>Телефон</th><th>Возраст ребёнка</th><th>Группа</th><th>Дата</th><th>Статус</th><th>Действия</th></tr></thead>
                    <tbody>
                        {inquiries.map(inq => (
                            <tr key={inq.id} className={!inq.read ? styles.unread : ''}>
                                <td><strong style={{ cursor: 'pointer', color: 'var(--primary)' }} onClick={() => setSelected(inq)}>{inq.parentName}</strong></td>
                                <td><a href={`tel:${inq.phone}`}>{inq.phone}</a></td>
                                <td>{inq.childAge}</td>
                                <td>{inq.groupInterest}</td>
                                <td>{new Date(inq.createdAt).toLocaleDateString('ru-RU')}</td>
                                <td><span className={`${styles.readBadge} ${inq.read ? styles.read : styles.new}`}>{inq.read ? 'Обработана' : '🔔 Новая'}</span></td>
                                <td>
                                    <div className={styles.actionBtns}>
                                        <button className={styles.editBtn} onClick={() => markRead(inq.id, !inq.read)}>{inq.read ? 'В новые' : '✅ Обработать'}</button>
                                        <button className={styles.delBtn} onClick={() => del(inq.id)}>🗑</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {inquiries.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: 'var(--text-light)' }}>Заявок пока нет</td></tr>}
                    </tbody>
                </table>
            </div>

            {selected && (
                <div className={styles.modal} onClick={() => setSelected(null)}>
                    <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
                        <h3>Детали заявки #{selected.id}</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
                            {[['Родитель', selected.parentName], ['Телефон', selected.phone], ['Возраст ребёнка', selected.childAge], ['Интересующая группа', selected.groupInterest], ['Дата', new Date(selected.createdAt).toLocaleString('ru-RU')], ['Комментарий', selected.comment || '—']].map(([l, v]) => (
                                <div key={l}>
                                    <strong style={{ fontSize: '0.8rem', color: 'var(--text-light)', display: 'block' }}>{l}</strong>
                                    <span>{v}</span>
                                </div>
                            ))}
                        </div>
                        <div className={styles.modalActions}>
                            <button className={styles.delBtn} onClick={() => del(selected.id)}>🗑 Удалить</button>
                            <button className={styles.saveBtn} onClick={() => { markRead(selected.id, true); setSelected(null); }}>✅ Отметить обработанной</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
