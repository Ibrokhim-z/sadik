import { Sunrise, Coffee, BookOpen, Utensils, Moon, Music, Dumbbell, Pencil, Users } from 'lucide-react';
import styles from './DaySchedule.module.css';

const schedule = [
    { time: '07:00', title: 'Приём детей', desc: 'Встречаем малышей, свободная игра', icon: <Sunrise size={20} strokeWidth={1.8} />, color: '#C4873A', bg: '#FFF3E0' },
    { time: '08:30', title: 'Завтрак', desc: 'Каша, творог, фрукты', icon: <Coffee size={20} strokeWidth={1.8} />, color: '#3D7A5E', bg: '#E8F4EE' },
    { time: '09:00', title: 'Развивающие занятия', desc: 'Речь, логика, познание', icon: <BookOpen size={20} strokeWidth={1.8} />, color: '#5C7EC4', bg: '#EEF2FF' },
    { time: '10:30', title: 'Прогулка', desc: 'Игры на свежем воздухе', icon: <Dumbbell size={20} strokeWidth={1.8} />, color: '#0891B2', bg: '#E0F7FA' },
    { time: '12:00', title: 'Обед', desc: 'Полноценный обед из трёх блюд', icon: <Utensils size={20} strokeWidth={1.8} />, color: '#E07B5C', bg: '#FFF0EB' },
    { time: '13:00', title: 'Тихий час', desc: 'Сон или спокойный отдых', icon: <Moon size={20} strokeWidth={1.8} />, color: '#8B5CF6', bg: '#F5F3FF' },
    { time: '15:30', title: 'Полдник', desc: 'Лёгкий перекус, молоко', icon: <Coffee size={20} strokeWidth={1.8} />, color: '#C4873A', bg: '#FFF3E0' },
    { time: '16:00', title: 'Творчество и кружки', desc: 'Рисование, музыка, танцы', icon: <Music size={20} strokeWidth={1.8} />, color: '#3D7A5E', bg: '#E8F4EE' },
    { time: '17:30', title: 'Вечерняя прогулка', desc: 'Подвижные игры, прощание', icon: <Users size={20} strokeWidth={1.8} />, color: '#5C7EC4', bg: '#EEF2FF' },
];

export default function DaySchedule() {
    return (
        <section className={`section ${styles.wrap}`}>
            <div className="container">
                <div className="section-header">
                    <div className="tag">Распорядок дня</div>
                    <h2>Как проходит день ребёнка</h2>
                    <p>Каждый день сбалансирован между развитием, отдыхом, питанием и игрой.</p>
                </div>
                <div className={styles.timeline}>
                    {schedule.map((s, i) => (
                        <div key={i} className={`${styles.item} reveal stagger-${Math.min(i % 5 + 1, 5)}`}>
                            <div className={styles.time}>{s.time}</div>
                            <div className={styles.dot} style={{ background: s.color }} />
                            <div className={styles.card}>
                                <div className={styles.icon} style={{ color: s.color, background: s.bg }}>
                                    {s.icon}
                                </div>
                                <div>
                                    <h4>{s.title}</h4>
                                    <p>{s.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
