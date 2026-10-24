'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/admin.module.css';

interface StaffMember {
    id: number; name: string; role: string; bio: string; education: string; experience: string; category: string;
}

const CATS = ['Воспитатели', 'Специалисты'];

export default function AdminStaffPage() {
    const [staff, setStaff] = useState<StaffMember[]>([]);
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState<Partial<StaffMember> | null>(null);
    const [loading, setLoading] = useState(false);

    const load = async () => { const res = await fetch('/api/admin/staff'); setStaff(await res.json()); };
    useEffect(() => { load(); }, []);
    const openAdd = () => { setEditing({ name: '', role: '', bio: '', education: '', experience: '', category: 'Воспитатели' }); setModal(true); };
    const openEdit = (s: StaffMember) => { setEditing({ ...s }); setModal(true); };

    const save = async () => {
        if (!editing?.name || !editing?.role) return;
        setLoading(true);
        const method = editing.id ? 'PUT' : 'POST';
        await fetch('/api/admin/staff', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
        await load(); setModal(false); setEditing(null); setLoading(false);
    };

    const del = async (id: number) => {
        if (!confirm('Удалить этого сотрудника?')) return;
        await fetch('/api/admin/staff', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
        await load();
    };

    return (
        <>
            <div className={styles.topbar}><h1>👩‍🏫 Сотрудники</h1></div>
            <div className={styles.content}>
                <div className={styles.tableHeader}>
                    <h2>Все сотрудники ({staff.length})</h2>
                    <button className={styles.addBtn} onClick={openAdd}>+ Добавить сотрудника</button>
                </div>
                <table className={styles.adminTable}>
                    <thead><tr><th>Имя</th><th>Должность</th><th>Категория</th><th>Опыт</th><th>Действия</th></tr></thead>
                    <tbody>
                        {staff.map(s => (
                            <tr key={s.id}>
                                <td><strong>{s.name}</strong></td>
                                <td>{s.role}</td>
                                <td><span className={`${styles.readBadge} ${styles.new}`}>{s.category}</span></td>
                                <td>{s.experience}</td>
                                <td><div className={styles.actionBtns}><button className={styles.editBtn} onClick={() => openEdit(s)}>✏️ Изменить</button><button className={styles.delBtn} onClick={() => del(s.id)}>🗑 Удалить</button></div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modal && (
                <div className={styles.modal} onClick={() => setModal(false)}>
                    <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
                        <h3>{editing?.id ? 'Редактировать сотрудника' : 'Добавить сотрудника'}</h3>
                        <div className={styles.modalForm}>
                            {[['name', 'Имя и фамилия *'], ['role', 'Должность *'], ['education', 'Образование'], ['experience', 'Опыт работы']].map(([k, l]) => (
                                <div className="form-group" key={k}><label>{l}</label><input className="form-input" value={(editing as any)?.[k] || ''} onChange={e => setEditing(p => ({ ...p, [k]: e.target.value }))} /></div>
                            ))}
                            <div className="form-group"><label>Категория</label>
                                <select className="form-input" value={editing?.category || 'Воспитатели'} onChange={e => setEditing(p => ({ ...p, category: e.target.value }))}>
                                    {CATS.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="form-group"><label>О педагоге</label><textarea className="form-input" rows={3} value={editing?.bio || ''} onChange={e => setEditing(p => ({ ...p, bio: e.target.value }))} /></div>
                            <div className={styles.modalActions}><button className={styles.cancelBtn} onClick={() => setModal(false)}>Отмена</button><button className={styles.saveBtn} onClick={save} disabled={loading}>{loading ? '...' : 'Сохранить'}</button></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
