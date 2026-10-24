import Link from 'next/link';
import { MessageSquare, Music, Dumbbell, Globe, Palette, Brain } from 'lucide-react';
import styles from './ActivitiesSection.module.css';

const activities = [
    { icon: <MessageSquare size={24} strokeWidth={1.8} />, title: 'Речь и коммуникация', desc: 'Сказки, ролевые игры, развитие речи.', age: '2–6 лет', color: '#3D7A5E', bg: '#E8F4EE' },
    { icon: <Brain size={24} strokeWidth={1.8} />, title: 'Логика и математика', desc: 'Счёт, формы, задачи через игру.', age: '3–6 лет', color: '#5C7EC4', bg: '#EEF2FF' },
    { icon: <Palette size={24} strokeWidth={1.8} />, title: 'Творчество и лепка', desc: 'Рисование, лепка, аппликация.', age: '2–6 лет', color: '#C4873A', bg: '#FFF3E0' },
    { icon: <Music size={24} strokeWidth={1.8} />, title: 'Музыка и ритмика', desc: 'Песни, движение, слух и ритм.', age: '1.5–6 лет', color: '#8B5CF6', bg: '#F5F3FF' },
    { icon: <Dumbbell size={24} strokeWidth={1.8} />, title: 'Физическое развитие', desc: 'Зарядка, подвижные игры, спорт.', age: '1.5–6 лет', color: '#E07B5C', bg: '#FFF0EB' },
    { icon: <Globe size={24} strokeWidth={1.8} />, title: 'Языковое развитие', desc: 'Казахский и русский через игры и песни.', age: '3–6 лет', color: '#0891B2', bg: '#E0F7FA' },
];

export default function ActivitiesSection() {
    return (
        <section className={`section ${styles.wrap}`}>
            <div className="container">
                <div className="section-header">
                    <div className="tag">Программа</div>
                    <h2>Направления развития</h2>
                    <p>Каждый ребёнок получает комплексное развитие по 6 ключевым направлениям, адаптированным к его возрасту и особенностям.</p>
                </div>
                <div className={styles.grid}>
                    {activities.map((a, i) => (
                        <div key={i} className={`${styles.card} reveal stagger-${Math.min(i + 1, 5)}`}>
                            <div className={styles.icon} style={{ color: a.color, background: a.bg }}>
                                {a.icon}
                            </div>
                            <h3>{a.title}</h3>
                            <p>{a.desc}</p>
                            <span className="badge badge-green">{a.age}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.cta}>
                    <Link href="/activities" className="btn btn-primary">Все занятия и программы</Link>
                </div>
            </div>
        </section>
    );
}
