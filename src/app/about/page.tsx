import type { Metadata } from 'next';
import styles from './about.module.css';

export const metadata: Metadata = {
    title: 'О нас — Детский сад «Балапан»',
    description: 'Узнайте историю и ценности детского сада «Балапан». Комфортные помещения, безопасная территория и заботливый подход к каждому ребёнку.',
};

const values = [
    { icon: '❤️', title: 'Любовь к детям', desc: 'Каждый педагог искренне любит детей и выбрал эту профессию по призванию.' },
    { icon: '🛡️', title: 'Безопасность', desc: 'Охраняемая территория, видеонаблюдение, безопасные материалы.' },
    { icon: '🌱', title: 'Развитие', desc: 'Игровые методики, ориентированные на интересы и темп каждого ребёнка.' },
    { icon: '🤝', title: 'Партнёрство с родителями', desc: 'Регулярная обратная связь, открытость и взаимное доверие.' },
];

const conditions = [
    { icon: '🏠', title: 'Уютные игровые комнаты', desc: 'Просторные, светлые помещения с безопасной мебелью и развивающими材料.' },
    { icon: '🛏️', title: 'Отдельные спальни', desc: 'Комфортные спальные зоны для полноценного дневного отдыха.' },
    { icon: '🌿', title: 'Территория для прогулок', desc: 'Озеленённый участок с игровыми площадками и песочницами.' },
    { icon: '🔒', title: 'Охрана и контроль', desc: 'Вход по пропускам, видеонаблюдение и круглосуточная охрана.' },
    { icon: '🥗', title: 'Собственная кухня', desc: 'Свежеприготовленное питание с соблюдением санитарных норм.' },
    { icon: '🎭', title: 'Актовый зал', desc: 'Специально оборудованный зал для праздников и выступлений.' },
];

export default function AboutPage() {
    return (
        <>
            <section className={`section ${styles.hero}`}>
                <div className="container">
                    <div className="section-header">
                        <div className="tag">О детском саде</div>
                        <h1>Мы — детский сад «Балапан»</h1>
                        <p>Уже более 7 лет мы создаём тёплую и безопасную среду для гармоничного развития детей от 1.5 до 6 лет.</p>
                    </div>
                </div>
            </section>

            <section className={`section ${styles.mission}`}>
                <div className="container">
                    <div className={styles.missionGrid}>
                        <div className="reveal-left">
                            <div className="tag">Наша миссия</div>
                            <h2>Философия и принципы воспитания</h2>
                            <p>Мы верим, что каждый ребёнок уникален. Наша задача — создать условия, в которых он сможет раскрыться, развить свои сильные стороны и научиться взаимодействовать с миром с уверенностью и радостью.</p>
                            <p style={{ marginTop: 16 }}>Мы не навязываем детям скорость и строгие стандарты. Мы ориентируемся на природный ритм развития каждого ребёнка, поддерживаем его любопытство и помогаем ему расти счастливым.</p>
                        </div>
                        <div className={`${styles.valueGrid} reveal-right`}>
                            {values.map((v, i) => (
                                <div key={i} className={styles.valueCard}>
                                    <span>{v.icon}</span>
                                    <div>
                                        <strong>{v.title}</strong>
                                        <p>{v.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className={`section ${styles.adaptation}`}>
                <div className="container">
                    <div className="section-header">
                        <div className="tag">Адаптация</div>
                        <h2>Мягкое вхождение в садик</h2>
                        <p>Мы понимаем, что первые дни в детском саду — важный момент как для ребёнка, так и для родителей. Наши воспитатели имеют опыт мягкой и постепенной адаптации.</p>
                    </div>
                    <div className={styles.adaptSteps}>
                        {[
                            { step: '1', title: 'Знакомство', desc: 'Экскурсия для ребёнка и родителей, встреча с воспитателем.' },
                            { step: '2', title: 'Первые дни', desc: 'Короткий день (2–3 часа), мама может оставаться рядом.' },
                            { step: '3', title: 'Привыкание', desc: 'Постепенное увеличение времени пребывания в группе.' },
                            { step: '4', title: 'Полный день', desc: 'Ребёнок уверенно чувствует себя в новой среде.' },
                        ].map((s, i) => (
                            <div key={i} className={`${styles.step} reveal stagger-${i + 1}`}>
                                <div className={styles.stepNum}>{s.step}</div>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={`section ${styles.conditions}`}>
                <div className="container">
                    <div className="section-header">
                        <div className="tag">Условия</div>
                        <h2>Инфраструктура и условия пребывания</h2>
                    </div>
                    <div className="grid-3">
                        {conditions.map((c, i) => (
                            <div key={i} className={`card ${styles.condCard} reveal stagger-${Math.min(i + 1, 5)}`}>
                                <div className={styles.condIcon}>{c.icon}</div>
                                <h3>{c.title}</h3>
                                <p>{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
