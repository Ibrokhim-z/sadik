import styles from './DayScheduleSection.module.css';

const schedule = [
    { time: '7:00', label: 'Встреча детей', icon: '☀️', desc: 'Приём, свободная игра' },
    { time: '8:00', label: 'Завтрак', icon: '🥞', desc: 'Питательный первый приём пищи' },
    { time: '9:00', label: 'Занятия', icon: '🎨', desc: 'Развивающие и творческие' },
    { time: '10:30', label: 'Прогулка', icon: '🌳', desc: 'Свежий воздух, подвижные игры' },
    { time: '12:00', label: 'Обед', icon: '🍲', desc: 'Горячий сбалансированный обед' },
    { time: '13:00', label: 'Тихий час', icon: '💤', desc: 'Дневной сон и отдых' },
    { time: '15:00', label: 'Полдник', icon: '🍎', desc: 'Фрукты, йогурт, выпечка' },
    { time: '15:30', label: 'Игры', icon: '🧩', desc: 'Свободные игры, чтение' },
    { time: '19:00', label: 'До свидания!', icon: '👋', desc: 'Выдача детей домой' },
];

export default function DayScheduleSection() {
    return (
        <section className={`section ${styles.wrap}`}>
            <div className="container">
                <div className="section-header">
                    <div className="tag">Распорядок дня</div>
                    <h2>Как проходит день ребёнка</h2>
                    <p>Режим дня выстроен с учётом физиологических потребностей детей. Точное время может варьироваться в зависимости от возраста группы.</p>
                </div>
                <div className={styles.timeline}>
                    {schedule.map((s, i) => (
                        <div key={i} className={`${styles.item} reveal stagger-${Math.min((i % 5) + 1, 5)}`}>
                            <div className={styles.time}>{s.time}</div>
                            <div className={styles.dot}>
                                <span>{s.icon}</span>
                            </div>
                            <div className={styles.content}>
                                <strong>{s.label}</strong>
                                <p>{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
