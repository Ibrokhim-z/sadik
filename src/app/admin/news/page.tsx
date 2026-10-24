'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/admin.module.css';

interface NewsItem {
    id: number; title: string; excerpt: string; content: string; published: boolean; publishedAt: string; slug: string;
}

export default function AdminNewsPage() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState<Partial<NewsItem> | null>(null);
    const [loading, setLoading] = useState(false);

    const load = async () => {
        const res = await fetch('/api/admin/news'); const data = await res.json(); setNews(data);
    };
    useEffect(() => { load(); }, []);

    const openAdd = () => { setEditing({ title: '', excerpt: '', content: '', published: true }); setModal(true); };
    const openEdit = (n: NewsItem) => { setEditing({ ...n }); setModal(true); };

    const save = async () => {
        if (!editing?.title || !editing?.content) return;
        setLoading(true);
        const method = editing.id ? 'PUT' : 'POST';
        await fetch('/api/admin/news', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
        await load(); setModal(false); setEditing(null); setLoading(false);
    };

    const del = async (id: number) => {
        if (!confirm('Удалить эту новость?')) return;
        await fetch('/api/admin/news', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
        await load();
    };

    return (
        <>
            <div className={styles.topbar}><h1>📰 Новости</h1></div>
            <div className={styles.content}>
                <div className={styles.tableHeader}>
                    <h2>Все новости ({news.length})</h2>
                    <button className={styles.addBtn} onClick={openAdd}>+ Добавить новость</button>
                </div>
                <table className={styles.adminTable}>
                    <thead><tr><th>Заголовок</th><th>Дата</th><th>Статус</th><th>Действия</th></tr></thead>
                    <tbody>
                        {news.map(n => (
                            <tr key={n.id}>
                                <td><strong>{n.title}</strong><br /><small style={{ color: 'var(--text-light)' }}>{n.excerpt?.substring(0, 60)}...</small></td>
                                <td>{new Date(n.publishedAt).toLocaleDateString('ru-RU')}</td>
                                <td><span className={`${styles.readBadge} ${n.published ? styles.new : styles.read}`}>{n.published ? '✅ Опубликована' : '⏸ Черновик'}</span></td>
                                <td><div className={styles.actionBtns}><button className={styles.editBtn} onClick={() => openEdit(n)}>✏️ Изменить</button><button className={styles.delBtn} onClick={() => del(n.id)}>🗑 Удалить</button></div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modal && (
                <div className={styles.modal} onClick={() => setModal(false)}>
                    <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
                        <h3>{editing?.id ? 'Редактировать новость' : 'Добавить новость'}</h3>
                        <div className={styles.modalForm}>
                            <div className="form-group"><label>Заголовок *</label><input className="form-input" value={editing?.title || ''} onChange={e => setEditing(p => ({ ...p, title: e.target.value }))} /></div>
                            <div className="form-group"><label>Краткое описание</label><input className="form-input" value={editing?.excerpt || ''} onChange={e => setEditing(p => ({ ...p, excerpt: e.target.value }))} /></div>
                            <div className="form-group"><label>Содержание *</label><textarea className="form-input" rows={7} value={editing?.content || ''} onChange={e => setEditing(p => ({ ...p, content: e.target.value }))} style={{ resize: 'vertical' }} /></div>
                            <label style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer', fontSize: '0.9rem' }}>
                                <input type="checkbox" checked={editing?.published ?? true} onChange={e => setEditing(p => ({ ...p, published: e.target.checked }))} />
                                Опубликовать
                            </label>
                            <div className={styles.modalActions}><button className={styles.cancelBtn} onClick={() => setModal(false)}>Отмена</button><button className={styles.saveBtn} onClick={save} disabled={loading}>{loading ? '...' : 'Сохранить'}</button></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
