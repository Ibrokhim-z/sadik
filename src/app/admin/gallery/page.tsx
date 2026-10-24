'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/admin.module.css';

const GALLERY_CATS = ['Помещения', 'Занятия', 'Прогулки', 'Праздники', 'Творчество', 'Питание', 'Общее'];

interface GalleryImg { id: number; url: string; caption: string; category: string; order: number; }

export default function AdminGalleryPage() {
    const [images, setImages] = useState<GalleryImg[]>([]);
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState<Partial<GalleryImg> | null>(null);
    const [loading, setLoading] = useState(false);

    const load = async () => { const res = await fetch('/api/admin/gallery'); setImages(await res.json()); };
    useEffect(() => { load(); }, []);

    const openAdd = () => { setEditing({ url: '', caption: '', category: 'Общее' }); setModal(true); };
    const openEdit = (img: GalleryImg) => { setEditing({ ...img }); setModal(true); };

    const save = async () => {
        if (!editing?.category) return;
        setLoading(true);
        const method = editing.id ? 'PUT' : 'POST';
        await fetch('/api/admin/gallery', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
        await load(); setModal(false); setEditing(null); setLoading(false);
    };

    const del = async (id: number) => {
        if (!confirm('Удалить фото?')) return;
        await fetch('/api/admin/gallery', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
        await load();
    };

    return (
        <>
            <div className={styles.topbar}><h1>🖼️ Галерея</h1></div>
            <div className={styles.content}>
                <div className={styles.tableHeader}>
                    <h2>Фотографии ({images.length})</h2>
                    <button className={styles.addBtn} onClick={openAdd}>+ Добавить фото</button>
                </div>
                <table className={styles.adminTable}>
                    <thead><tr><th>URL / Описание</th><th>Категория</th><th>Порядок</th><th>Действия</th></tr></thead>
                    <tbody>
                        {images.map(img => (
                            <tr key={img.id}>
                                <td><strong>{img.caption || '(без подписи)'}</strong><br /><small style={{ color: 'var(--text-light)', wordBreak: 'break-all' }}>{img.url || '—'}</small></td>
                                <td><span className={`${styles.readBadge} ${styles.new}`}>{img.category}</span></td>
                                <td>{img.order}</td>
                                <td><div className={styles.actionBtns}><button className={styles.editBtn} onClick={() => openEdit(img)}>✏️</button><button className={styles.delBtn} onClick={() => del(img.id)}>🗑</button></div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modal && (
                <div className={styles.modal} onClick={() => setModal(false)}>
                    <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
                        <h3>{editing?.id ? 'Редактировать фото' : 'Добавить фото'}</h3>
                        <div className={styles.modalForm}>
                            <div className="form-group"><label>URL изображения</label><input className="form-input" value={editing?.url || ''} onChange={e => setEditing(p => ({ ...p, url: e.target.value }))} placeholder="/images/gallery/photo.jpg" /></div>
                            <div className="form-group"><label>Подпись</label><input className="form-input" value={editing?.caption || ''} onChange={e => setEditing(p => ({ ...p, caption: e.target.value }))} /></div>
                            <div className="form-group"><label>Категория</label>
                                <select className="form-input" value={editing?.category || 'Общее'} onChange={e => setEditing(p => ({ ...p, category: e.target.value }))}>
                                    {GALLERY_CATS.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className={styles.modalActions}><button className={styles.cancelBtn} onClick={() => setModal(false)}>Отмена</button><button className={styles.saveBtn} onClick={save} disabled={loading}>{loading ? '...' : 'Сохранить'}</button></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
