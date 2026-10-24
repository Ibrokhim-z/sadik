'use client';
import { useState } from 'react';
import styles from './teachers.module.css';

interface StaffMember {
    id: number;
    name: string;
    role: string;
    photo: string;
    bio: string;
    education: string;
    experience: string;
    category: string;
}

const CATS = ['Все', 'Воспитатели', 'Специалисты'];

export default function TeachersClient({ staff }: { staff: StaffMember[] }) {
    const [active, setActive] = useState('Все');
    const filtered = active === 'Все' ? staff : staff.filter(s => s.category === active);

    return (
        <>
            <div className={styles.filters}>
                {CATS.map(c => (
                    <button
                        key={c}
                        className={`${styles.filter} ${active === c ? styles.filterActive : ''}`}
                        onClick={() => setActive(c)}
                    >
                        {c}
                    </button>
                ))}
            </div>
            <div className={styles.grid}>
                {filtered.map((s, i) => (
                    <div key={s.id} className={`${styles.card} reveal stagger-${Math.min(i + 1, 5)}`}>
                        <div className={styles.avatar}>{s.name[0]}</div>
                        <h3>{s.name}</h3>
                        <div className={styles.role}>{s.role}</div>
                        <div className={styles.badge}>{s.category}</div>
                        <p className={styles.bio}>{s.bio}</p>
                        <div className={styles.info}>
                            {s.education && <div><strong>Образование:</strong> {s.education}</div>}
                            {s.experience && <div><strong>Опыт:</strong> {s.experience}</div>}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
