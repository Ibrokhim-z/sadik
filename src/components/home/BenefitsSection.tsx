import { Shield, Heart, BookOpen, Utensils, Sun } from 'lucide-react';
import styles from './BenefitsSection.module.css';

const benefits = [
    {
        icon: <Shield size={28} strokeWidth={1.8} />,
        title: 'Безопасная среда',
        desc: 'Охраняемая территория, видеонаблюдение, безопасные материалы и мебель по европейским стандартам.',
        color: '#3D7A5E',
        bg: '#E8F4EE',
    },
    {
        icon: <Heart size={28} strokeWidth={1.8} />,
        title: 'Заботливые педагоги',
        desc: 'Опытные воспитатели с профессиональным образованием и индивидуальным подходом к каждому ребёнку.',
        color: '#E07B5C',
        bg: '#FFF0EB',
    },
    {
        icon: <BookOpen size={28} strokeWidth={1.8} />,
        title: 'Развивающие программы',
        desc: 'Игровые методики для развития интеллекта, творчества, речи и социальных навыков.',
        color: '#C4873A',
        bg: '#FFF3E0',
    },
    {
        icon: <Utensils size={28} strokeWidth={1.8} />,
        title: 'Полноценное питание',
        desc: 'Свежеприготовленные блюда с соблюдением санитарных норм. Меню разработано диетологом.',
        color: '#5C7EC4',
        bg: '#EEF2FF',
    },
    {
        icon: <Sun size={28} strokeWidth={1.8} />,
        title: 'Ежедневные прогулки',
        desc: 'Благоустроенная территория с игровыми площадками. Прогулки в любую погоду — по нашим правилам.',
        color: '#3D7A5E',
        bg: '#E8F4EE',
    },
];

// Unsplash photo for the section image
const IMG = 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900&q=80&auto=format&fit=crop';

export default function BenefitsSection() {
    return (
        <section className={`section ${styles.wrap}`}>
            <div className="container">
                <div className={styles.layout}>
                    <div className={`${styles.imgCol} reveal-left`}>
                        <div className={styles.imgWrap}>
                            <img src={IMG} alt="Дети в детском саду Балапан" />
                            <div className={styles.badge}>
                                <span>🏅</span>
                                <div>
                                    <strong>Топ-выбор</strong>
                                    <span>родителей Алматы</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.right}>
                        <div className="reveal">
                            <div className="tag">Почему мы</div>
                            <h2>Преимущества<br />нашего детского сада</h2>
                            <p style={{ marginBottom: 40 }}>Мы не просто присматриваем за детьми — мы помогаем им расти счастливыми, здоровыми и любознательными.</p>
                        </div>
                        <div className={styles.grid}>
                            {benefits.map((b, i) => (
                                <div key={i} className={`${styles.card} reveal stagger-${Math.min(i + 1, 5)}`}>
                                    <div className={styles.icon} style={{ color: b.color, background: b.bg }}>
                                        {b.icon}
                                    </div>
                                    <div>
                                        <h4>{b.title}</h4>
                                        <p>{b.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
