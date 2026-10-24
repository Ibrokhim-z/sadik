import { Star, Quote } from 'lucide-react';
import styles from './TestimonialsSection.module.css';

const testimonials = [
    { name: 'Айгерим К.', text: 'Дочь ходит уже второй год и каждое утро сама бежит в садик! Воспитатели очень тёплые, всегда на связи. Спасибо за такую атмосферу.', child: 'мама Дианы, 4 года' },
    { name: 'Руслан М.', text: 'Сначала опасались отдавать в частный сад, но «Балапан» превзошёл все ожидания. Ребёнок стал намного самостоятельнее и общительнее.', child: 'папа Тимура, 3.5 года' },
    { name: 'Наталья С.', text: 'Отличное питание, чистота, игровые зоны — всё на высшем уровне. Педагоги знают подход к каждому ребёнку. Очень довольны!', child: 'мама Маши, 5 лет' },
];

export default function TestimonialsSection() {
    return (
        <section className={`section ${styles.wrap}`}>
            <div className="container">
                <div className="section-header">
                    <div className="tag">Отзывы</div>
                    <h2>Что говорят родители</h2>
                </div>
                <div className={styles.grid}>
                    {testimonials.map((t, i) => (
                        <div key={i} className={`${styles.card} reveal stagger-${i + 1}`}>
                            <div className={styles.quoteIcon}>
                                <Quote size={20} strokeWidth={1.8} />
                            </div>
                            <p className={styles.text}>{t.text}</p>
                            <div className={styles.stars}>
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <Star key={j} size={15} fill="#C4873A" color="#C4873A" strokeWidth={0} />
                                ))}
                            </div>
                            <div className={styles.author}>
                                <div className={styles.avatar}>{t.name[0]}</div>
                                <div>
                                    <strong>{t.name}</strong>
                                    <span>{t.child}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
