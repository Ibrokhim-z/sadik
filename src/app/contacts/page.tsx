'use client';
import { useState } from 'react';
import styles from './contacts.module.css';

const AGE_OPTIONS = ['До 1.5 лет', '1.5–2 года', '2–3 года', '3–4 года', '4–5 лет', '5–6 лет'];
const GROUP_OPTIONS = ['Ясельная группа', 'Младшая группа', 'Средняя группа', 'Старшая группа', 'Подготовка к школе'];

export default function ContactsPage() {
    const [form, setForm] = useState({
        parentName: '', phone: '', childAge: '', groupInterest: '', comment: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.parentName.trim()) e.parentName = 'Укажите ваше имя';
        if (!form.phone.trim()) e.phone = 'Укажите номер телефона';
        if (!form.childAge) e.childAge = 'Выберите возраст ребёнка';
        if (!form.groupInterest) e.groupInterest = 'Выберите группу';
        return e;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setLoading(true); setErrors({});
        try {
            const res = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.ok) setSuccess(true);
            else setErrors({ global: 'Ошибка при отправке. Попробуйте позже.' });
        } catch { setErrors({ global: 'Ошибка соединения.' }); }
        setLoading(false);
    };

    const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm(f => ({ ...f, [k]: e.target.value }));
        setErrors(er => { const n = { ...er }; delete n[k]; return n; });
    };

    return (
        <>
            <section className={`section ${styles.hero}`}>
                <div className="container">
                    <div className="section-header">
                        <div className="tag">Контакты</div>
                        <h1>Контакты и запись</h1>
                        <p>Свяжитесь с нами любым удобным способом или оставьте заявку — мы перезвоним и запишем вас на экскурсию.</p>
                    </div>
                </div>
            </section>

            <section className={`section ${styles.main}`}>
                <div className="container">
                    <div className={styles.grid}>
                        {/* Contact info */}
                        <div className={styles.info}>
                            <h2>Наши контакты</h2>
                            <div className={styles.infoCards}>
                                <div className={styles.infoCard}>
                                    <span>📍</span>
                                    <div>
                                        <strong>Адрес</strong>
                                        <p>г. Алматы, ул. Абая, 10</p>
                                    </div>
                                </div>
                                <div className={styles.infoCard}>
                                    <span>📞</span>
                                    <div>
                                        <strong>Телефон</strong>
                                        <a href="tel:+77272000000">+7 (727) 200-00-00</a>
                                    </div>
                                </div>
                                <div className={styles.infoCard}>
                                    <span>💬</span>
                                    <div>
                                        <strong>WhatsApp</strong>
                                        <a href="https://wa.me/77272000000?text=Здравствуйте!%20Хочу%20узнать%20о%20записи%20в%20детский%20сад." target="_blank" rel="noopener">
                                            Написать в WhatsApp
                                        </a>
                                    </div>
                                </div>
                                <div className={styles.infoCard}>
                                    <span>✉️</span>
                                    <div>
                                        <strong>Email</strong>
                                        <a href="mailto:info@balapan.kz">info@balapan.kz</a>
                                    </div>
                                </div>
                                <div className={styles.infoCard}>
                                    <span>⏰</span>
                                    <div>
                                        <strong>Режим работы</strong>
                                        <p>Пн–Пт: 07:00–19:00</p>
                                        <p>Сб: 08:00–14:00</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.mapBox}>
                                <div className={styles.mapPlaceholder}>
                                    <span>🗺️</span>
                                    <p>г. Алматы, ул. Абая, 10</p>
                                    <a
                                        href="https://maps.google.com/?q=Алматы,+ул.+Абая,+10"
                                        target="_blank" rel="noopener"
                                        className="btn btn-outline"
                                        style={{ marginTop: 12 }}
                                    >
                                        Построить маршрут
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Inquiry form */}
                        <div className={styles.formWrap}>
                            {success ? (
                                <div className={styles.success}>
                                    <span>🎉</span>
                                    <h2>Заявка отправлена!</h2>
                                    <p>Спасибо! Мы свяжемся с вами в течение рабочего дня для подтверждения записи.</p>
                                    <button className="btn btn-primary" onClick={() => setSuccess(false)}>Отправить ещё заявку</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                                    <h2>Записаться на экскурсию</h2>
                                    <p>Оставьте заявку — мы перезвоним и подберём удобное время.</p>

                                    {errors.global && <div className={styles.errorBox}>{errors.global}</div>}

                                    <div className="form-group">
                                        <label>Имя родителя *</label>
                                        <input
                                            className={`form-input ${errors.parentName ? 'error' : ''}`}
                                            value={form.parentName}
                                            onChange={set('parentName')}
                                            placeholder="Ваше имя и фамилия"
                                        />
                                        {errors.parentName && <span className={styles.err}>{errors.parentName}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label>Номер телефона *</label>
                                        <input
                                            className={`form-input ${errors.phone ? 'error' : ''}`}
                                            type="tel"
                                            value={form.phone}
                                            onChange={set('phone')}
                                            placeholder="+7 (___) ___-__-__"
                                        />
                                        {errors.phone && <span className={styles.err}>{errors.phone}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label>Возраст ребёнка *</label>
                                        <select
                                            className={`form-input ${errors.childAge ? 'error' : ''}`}
                                            value={form.childAge}
                                            onChange={set('childAge')}
                                        >
                                            <option value="">Выберите возраст</option>
                                            {AGE_OPTIONS.map(o => <option key={o}>{o}</option>)}
                                        </select>
                                        {errors.childAge && <span className={styles.err}>{errors.childAge}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label>Интересующая группа *</label>
                                        <select
                                            className={`form-input ${errors.groupInterest ? 'error' : ''}`}
                                            value={form.groupInterest}
                                            onChange={set('groupInterest')}
                                        >
                                            <option value="">Выберите группу</option>
                                            {GROUP_OPTIONS.map(o => <option key={o}>{o}</option>)}
                                        </select>
                                        {errors.groupInterest && <span className={styles.err}>{errors.groupInterest}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label>Комментарий (необязательно)</label>
                                        <textarea
                                            className="form-input"
                                            value={form.comment}
                                            onChange={set('comment')}
                                            placeholder="Ваши вопросы или пожелания..."
                                            rows={4}
                                            style={{ resize: 'vertical' }}
                                        />
                                    </div>

                                    <label className={styles.consent}>
                                        <input type="checkbox" required />
                                        Согласен(а) на обработку персональных данных в соответствии с политикой конфиденциальности
                                    </label>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                        style={{ width: '100%', justifyContent: 'center', padding: '16px' }}
                                    >
                                        {loading ? '⏳ Отправка...' : '📅 Отправить заявку'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
