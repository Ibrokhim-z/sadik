import { Baby, Sprout, Flower2, Sparkles, GraduationCap, Users } from 'lucide-react';
import styles from './AgeGroupsSection.module.css';

interface Group {
    id: number;
    name: string;
    ageRange: string;
    capacity: number;
    icon: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
    'Ясельная': <Baby size={28} strokeWidth={1.8} />,
    'Младшая': <Sprout size={28} strokeWidth={1.8} />,
    'Средняя': <Flower2 size={28} strokeWidth={1.8} />,
    'Старшая': <Sparkles size={28} strokeWidth={1.8} />,
    'Подготовка': <GraduationCap size={28} strokeWidth={1.8} />,
};

const COLORS = ['#3D7A5E', '#C4873A', '#5C7EC4', '#8B5CF6', '#E07B5C'];
const BGS = ['#E8F4EE', '#FFF3E0', '#EEF2FF', '#F5F3FF', '#FFF0EB'];

function getIcon(name: string) {
    for (const key of Object.keys(ICON_MAP)) {
        if (name.includes(key)) return ICON_MAP[key];
    }
    return <Users size={28} strokeWidth={1.8} />;
}

export default function AgeGroupsSection({ groups }: { groups: Group[] }) {
    return (
        <section className={`section ${styles.wrap}`}>
            <div className="container">
                <div className="section-header">
                    <div className="tag">Наши группы</div>
                    <h2>Возрастные группы</h2>
                    <p>Программа каждой группы разработана с учётом возрастных особенностей и потребностей ребёнка.</p>
                </div>
                <div className={styles.grid}>
                    {groups.map((g, i) => (
                        <div key={g.id} className={`${styles.card} reveal stagger-${Math.min(i + 1, 5)}`}>
                            <div
                                className={styles.icon}
                                style={{ color: COLORS[i % COLORS.length], background: BGS[i % BGS.length] }}
                            >
                                {getIcon(g.name)}
                            </div>
                            <h3>{g.name}</h3>
                            <div className={styles.age}>{g.ageRange}</div>
                            <div className={styles.capacity}>
                                <Users size={14} strokeWidth={2} />
                                До {g.capacity} детей
                            </div>
                            <span className="badge badge-green">Запись открыта</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
