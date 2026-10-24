'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/admin.module.css';

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('/api/admin/settings').then(r => r.json()).then(d => setSettings(d || {}));
    }, []);

    const save = async () => {
        setLoading(true);
        await fetch('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
        setSaved(true); setTimeout(() => setSaved(false), 3000); setLoading(false);
    };

    const fields: [string, string, string][] = [
        ['siteName', 'Название детского сада', 'text'],
        ['slogan', 'Слоган', 'text'],
        ['address', 'Адрес', 'text'],
        ['phone', 'Телефон', 'tel'],
        ['whatsapp', 'WhatsApp (номер с кодом страны)', 'text'],
        ['email', 'Email', 'email'],
        ['workHours', 'Режим работы', 'text'],
        ['mapEmbedUrl', 'URL iframe карты (Google Maps embed)', 'text'],
    ];

    return (
        <>
            <div className={styles.topbar}>
                <h1>⚙️ Настройки</h1>
                <div className={styles.topbarRight}>
                    {saved && <span className={styles.adminBadge}>✅ Сохранено!</span>}
                </div>
            </div>
            <div className={styles.content}>
                <div style={{ background: 'white', borderRadius: 16, padding: '36px', maxWidth: 700, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                    <h2 style={{ marginBottom: 28 }}>Контактная информация и общие настройки</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {fields.map(([key, label, type]) => (
                            <div className="form-group" key={key}>
                                <label>{label}</label>
                                <input
                                    className="form-input"
                                    type={type}
                                    value={settings[key] || ''}
                                    onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))}
                                />
                            </div>
                        ))}
                        <div className="form-group">
                            <label>О детском саде (главная страница)</label>
                            <textarea className="form-input" rows={4} value={settings.about || ''} onChange={e => setSettings(s => ({ ...s, about: e.target.value }))} style={{ resize: 'vertical' }} />
                        </div>
                        <button className={styles.addBtn} onClick={save} disabled={loading} style={{ alignSelf: 'flex-start' }}>
                            {loading ? '...' : '💾 Сохранить настройки'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
