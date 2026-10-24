import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import styles from './activities.module.css';

export const metadata: Metadata = {
    title: 'Занятия и развитие — Детский сад «Балапан»',
    description: 'Игровые методики, творческие занятия, музыка, спорт и подготовка к школе в детском саду «Балапан».',
};

export default async function ActivitiesPage() {
    const activities = await prisma.activity.findMany({ orderBy: { order: 'asc' } });

    return (
        <>
            <section className={`section ${styles.hero}`}>
                <div className="container">
                    <div className="section-header">
                        <div className="tag">Занятия</div>
                        <h1>Развитие и занятия</h1>
                        <p>Наши программы разработаны для гармоничного развития ребёнка через игру, творчество и исследование. Никакого давления, только радость от познания.</p>
                    </div>
                </div>
            </section>

            <section className={`section ${styles.approach}`}>
                <div className="container">
                    <div className={styles.approachGrid}>
                        <div className="reveal-left">
                            <h2>Наш подход к обучению</h2>
                            <p>Мы используем игровые методики дошкольного образования, при которых ребёнок учится через собственный опыт, эксперименты и взаимодействие со сверстниками.</p>
                            <ul className={styles.points}>
                                <li>🎯 Занятия адаптированы под возраст и уровень развития</li>
                                <li>✨ Группы небольшие — воспитатель уделяет внимание каждому</li>
                                <li>🔄 Регулярное наблюдение за прогрессом ребёнка</li>
                                <li>🤝 Взаимодействие с родителями на каждом этапе</li>
                            </ul>
                        </div>
                        <div className={`${styles.pillars} reveal-right`}>
                            {[
                                { icon: '🧠', label: 'Познание' },
                                { icon: '🎨', label: 'Творчество' },
                                { icon: '💪', label: 'Физическое' },
                                { icon: '💬', label: 'Общение' },
                            ].map((p, i) => (
                                <div key={i} className={styles.pillar}>
                                    <span>{p.icon}</span>
                                    <strong>{p.label}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className={`section ${styles.list}`}>
                <div className="container">
                    <div className="section-header">
                        <div className="tag">Программа</div>
                        <h2>Все направления развития</h2>
                    </div>
                    <div className={styles.grid}>
                        {activities.map((a, i) => (
                            <div key={a.id} className={`${styles.card} reveal stagger-${Math.min(i + 1, 5)}`}>
                                <div className={styles.cardIcon}>{a.icon}</div>
                                <div className={styles.cardBody}>
                                    <h3>{a.name}</h3>
                                    <p>{a.description}</p>
                                    <div className={styles.meta}>
                                        <span className="badge badge-green">👶 {a.ageRange}</span>
                                        {a.frequency && <span className="badge badge-yellow">🗓 {a.frequency}</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
