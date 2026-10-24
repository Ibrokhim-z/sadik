'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); setError('');
        const res = await signIn('credentials', { email, password, redirect: false });
        if (res?.ok) { router.push('/admin/dashboard'); router.refresh(); }
        else { setError('Неверный email или пароль'); }
        setLoading(false);
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.card}>
                <div className={styles.logo}>🌿 Балапан</div>
                <h1>Вход в панель управления</h1>
                <p>Доступ только для администраторов</p>
                {error && <div className={styles.error}>{error}</div>}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@balapan.kz" required />
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
                        <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                        {loading ? 'Вход...' : '🔑 Войти'}
                    </button>
                </form>
                <p className={styles.hint}>По умолчанию: admin@balapan.kz / admin123</p>
            </div>
        </div>
    );
}
