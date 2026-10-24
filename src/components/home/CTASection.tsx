'use client';
import { useState } from 'react';
import { ArrowRight, Phone, CheckCircle } from 'lucide-react';
import styles from './CTASection.module.css';

const CTA_IMG = 'https://images.unsplash.com/photo-1587654780541-dd0e84e5d06a?w=900&q=80&auto=format&fit=crop';

export default function CTASection() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !phone.trim()) { setError('Пожалуйста, заполните имя и телефон'); return; }
        setLoading(true); setError('');
        try {
            const res = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ parentName: name, phone, childAge: 'Не указано', groupInterest: 'Не указано', comment: 'Заявка с главной страницы' }),
            });
            if (res.ok) { setSuccess(true); setName(''); setPhone(''); }
            else setError('Ошибка при отправке. Попробуйте позже.');
        } catch { setError('Ошибка соединения. Попробуйте позже.'); }
        setLoading(false);
    };

    return (
        <section className={styles.wrap}>
            <div className={styles.bg} style={{ backgroundImage: `url('${CTA_IMG}')` }} />
            <div className={styles.overlay} />
            <div className={`container ${styles.inner}`}>
                <div className={`${styles.text} reveal-left`}>
                    <h2>Запишитесь на<br /><em>бесплатную экскурсию</em></h2>
                    <p>Приходите познакомиться с детским садом лично. Мы покажем группы, игровые зоны и расскажем всё о нашей программе.</p>
                    <ul className={styles.list}>
                        <li><CheckCircle size={18} strokeWidth={2} /> Бесплатная экскурсия по территории</li>
                        <li><CheckCircle size={18} strokeWidth={2} /> Ответим на все вопросы</li>
                        <li><CheckCircle size={18} strokeWidth={2} /> Познакомитесь с воспитателями</li>
                    </ul>
                </div>
                <div className={`${styles.formWrap} reveal-right`}>
                    {success ? (
                        <div className={styles.success}>
                            <CheckCircle size={56} strokeWidth={1.5} color="var(--primary)" />
                            <h3>Заявка отправлена!</h3>
                            <p>Мы свяжемся с вами в ближайшее время для подтверждения экскурсии.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <h3>Оставьте заявку</h3>
                            {error && <div className={styles.error}>{error}</div>}
                            <div className="form-group">
                                <label>Ваше имя</label>
                                <input className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="Имя и фамилия" required />
                            </div>
                            <div className="form-group">
                                <label>Номер телефона</label>
                                <input className="form-input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__" required />
                            </div>
                            <label className={styles.consent}>
                                <input type="checkbox" required />
                                Согласен(а) на обработку персональных данных
                            </label>
                            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                                {loading ? 'Отправка...' : 'Записаться на экскурсию'}
                                {!loading && <ArrowRight size={16} />}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
