'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/admin.module.css';

interface Activity {
    id: number; name: string; description: string; ageRange: string; frequency: string; icon: string;
}

export default function AdminActivitiesPage() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState<Partial<Activity> | null>(null);
    const [loading, setLoading] = useState(false);

    const load = async () => { const res = await fetch('/api/admin/activities'); setActivities(await res.json()); };
    useEffect(() => { load(); }, []);

    const openAdd = () => { setEditing({ name: '', description: '', ageRange: '3–6 лет', frequency: '', icon: '⭐' }); setModal(true); };
    const openEdit = (a: Activity) => { setEditing({ ...a }); setModal(true); };

    const save = async () => {
        if (!editing?.name) return; setLoading(true);
        const method = editing.id ? 'PUT' : 'POST';
        await fetch('/api/admin/activities', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
        await load(); setModal(false); setEditing(null); setLoading(false);
    };

    const del = async (id: number) => {
        if (!confirm('Удалить занятие?')) return;
        await fetch('/api/admin/activities', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
        await load();
    };

    return (
        <>
            <div className={styles.topbar}><h1>🎨 Занятия</h1></div>
            <div className={styles.content}>
                <div className={styles.tableHeader}>
                    <h2>Все занятия ({activities.length})</h2>
                    <button className={styles.addBtn} onClick={openAdd}>+ Добавить занятие</button>
                </div>
                <table className={styles.adminTable}>
                    <thead><tr><th>Иконка</th><th>Название</th><th>Возраст</th><th>Частота</th><th>Действия</th></tr></thead>
                    <tbody>
                        {activities.map(a => (
                            <tr key={a.id}>
                                <td style={{ fontSize: '1.8rem' }}>{a.icon}</td>
                                <td><strong>{a.name}</strong><br /><small style={{ color: 'var(--text-light)' }}>{a.description?.substring(0, 60)}...</small></td>
                                <td>{a.ageRange}</td>
                                <td>{a.frequency || '—'}</td>
                                <td><div className={styles.actionBtns}><button className={styles.editBtn} onClick={() => openEdit(a)}>✏️ Изменить</button><button className={styles.delBtn} onClick={() => del(a.id)}>🗑</button></div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modal && (
                <div className={styles.modal} onClick={() => setModal(false)}>
                    <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
                        <h3>{editing?.id ? 'Редактировать занятие' : 'Добавить занятие'}</h3>
                        <div className={styles.modalForm}>
                            {[['name', 'Название *'], ['icon', 'Иконка (эмодзи)'], ['ageRange', 'Возрастной диапазон'], ['frequency', 'Частота проведения']].map(([k, l]) => (
                                <div className="form-group" key={k}><label>{l}</label><input className="form-input" value={(editing as any)?.[k] || ''} onChange={e => setEditing(p => ({ ...p, [k]: e.target.value }))} /></div>
                            ))}
                            <div className="form-group"><label>Описание</label><textarea className="form-input" rows={3} value={editing?.description || ''} onChange={e => setEditing(p => ({ ...p, description: e.target.value }))} /></div>
                            <div className={styles.modalActions}><button className={styles.cancelBtn} onClick={() => setModal(false)}>Отмена</button><button className={styles.saveBtn} onClick={save} disabled={loading}>{loading ? '...' : 'Сохранить'}</button></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
