import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        const passwordHash = await bcrypt.hash('admin123', 10);
        await prisma.admin.upsert({ where: { email: 'admin@balapan.kz' }, update: {}, create: { email: 'admin@balapan.kz', passwordHash, name: 'Администратор' } });

        await prisma.settings.upsert({ where: { id: 1 }, update: {}, create: { id: 1, siteName: 'Балапан', slogan: 'Место, где детство наполнено открытиями', address: 'г. Алматы, ул. Абая, 10', phone: '+7 (727) 200-00-00', whatsapp: '77272000000', email: 'info@balapan.kz', workHours: 'Пн–Пт: 07:00–19:00', mapEmbedUrl: '', about: 'Мы создаём тёплую, безопасную и вдохновляющую среду для каждого ребёнка.' } });

        const groups = [
            { name: 'Ясельная группа', ageRange: '1.5–2 года', capacity: 10, icon: '🍼', order: 1 },
            { name: 'Младшая группа', ageRange: '2–3 года', capacity: 12, icon: '🌱', order: 2 },
            { name: 'Средняя группа', ageRange: '3–4 года', capacity: 15, icon: '🌸', order: 3 },
            { name: 'Старшая группа', ageRange: '4–5 лет', capacity: 15, icon: '🌟', order: 4 },
            { name: 'Подготовка к школе', ageRange: '5–6 лет', capacity: 12, icon: '🎒', order: 5 },
        ];
        for (const g of groups) {
            const ex = await prisma.group.findFirst({ where: { name: g.name } });
            if (!ex) await prisma.group.create({ data: g });
        }

        const activities = [
            { name: 'Речь и коммуникация', description: 'Развиваем речь через сказки, ролевые игры и общение в группе.', ageRange: '2–6 лет', frequency: 'Ежедневно', icon: '💬', order: 1 },
            { name: 'Логика и математика', description: 'Игровые задания на счёт, формы, сравнение и причинно-следственные связи.', ageRange: '3–6 лет', frequency: '3 раза в неделю', icon: '🧩', order: 2 },
            { name: 'Рисование и лепка', description: 'Развиваем мелкую моторику и воображение через творческие занятия.', ageRange: '2–6 лет', frequency: '4 раза в неделю', icon: '🎨', order: 3 },
            { name: 'Музыка и танцы', description: 'Ритм, слух, движение — музыкальные занятия для всестороннего развития.', ageRange: '1.5–6 лет', frequency: '2 раза в неделю', icon: '🎵', order: 4 },
            { name: 'Физическая активность', description: 'Утренняя зарядка, подвижные игры и занятия физкультурой на свежем воздухе.', ageRange: '1.5–6 лет', frequency: 'Ежедневно', icon: '⚽', order: 5 },
            { name: 'Изучение языков', description: 'Знакомство с казахским и русским языками через песни и игры.', ageRange: '3–6 лет', frequency: '5 раз в неделю', icon: '🌐', order: 6 },
        ];
        for (const a of activities) {
            const ex = await prisma.activity.findFirst({ where: { name: a.name } });
            if (!ex) await prisma.activity.create({ data: a });
        }

        const staffData = [
            { name: 'Айгүл Сейткали', role: 'Главный воспитатель', bio: 'Тёплый педагог с индивидуальным подходом к каждому ребёнку.', education: 'КазНПУ, педагогика дошкольного образования', experience: '12 лет', category: 'Воспитатели', order: 1 },
            { name: 'Марина Петрова', role: 'Воспитатель', bio: 'Специалист по развитию речи и подготовке к школе.', education: 'АГУ, психология и педагогика', experience: '8 лет', category: 'Воспитатели', order: 2 },
            { name: 'Дина Ахметова', role: 'Воспитатель', bio: 'Создаёт радостную атмосферу в группе.', education: 'КазГПУ, дошкольное воспитание', experience: '6 лет', category: 'Воспитатели', order: 3 },
            { name: 'Лариса Иванова', role: 'Музыкальный руководитель', bio: 'Проводит занятия по ритмике, пению и музыкальным играм.', education: 'КазНУИ, музыкальное образование', experience: '10 лет', category: 'Специалисты', order: 4 },
            { name: 'Асель Нурланова', role: 'Педагог-психолог', bio: 'Помогает детям с адаптацией, развивает эмоциональный интеллект.', education: 'КазНУ, психология', experience: '7 лет', category: 'Специалисты', order: 5 },
        ];
        for (const s of staffData) {
            const ex = await prisma.staff.findFirst({ where: { name: s.name } });
            if (!ex) await prisma.staff.create({ data: s });
        }

        const newsData = [
            { title: 'Открытый день в «Балапан» — приглашаем семьи!', slug: 'open-day-2024', excerpt: 'Приходите познакомиться с нашим детским садом.', content: 'Уважаемые родители! Мы рады пригласить вас на открытый день в детский сад «Балапан». Вы сможете познакомиться с воспитателями, увидеть группы и задать все интересующие вопросы.', published: true },
            { title: 'Набор в ясельную группу — места ещё есть', slug: 'nursery-enrollment', excerpt: 'Начинаем приём заявок для детей от 1.5 лет.', content: 'Дорогие родители! Мы открываем запись в ясельную группу на новый учебный год. Спешите занять место для вашего малыша!', published: true },
            { title: 'Осенний праздник «Золотая листва»', slug: 'autumn-fest-2024', excerpt: 'Дети подготовили замечательное выступление для родителей.', content: 'В нашем детском саду прошёл прекрасный осенний праздник «Золотая листва». Дети показали спектакль, исполнили песни и танцы, а также поделились своими творческими работами.', published: true },
        ];
        for (const n of newsData) {
            const ex = await prisma.news.findUnique({ where: { slug: n.slug } });
            if (!ex) await prisma.news.create({ data: n });
        }

        const galleryData = [
            { url: '', caption: 'Уютная игровая комната', category: 'Помещения', order: 1 },
            { url: '', caption: 'Спальная зона', category: 'Помещения', order: 2 },
            { url: '', caption: 'Творческое занятие', category: 'Занятия', order: 3 },
            { url: '', caption: 'Музыкальный урок', category: 'Занятия', order: 4 },
            { url: '', caption: 'Прогулка в саду', category: 'Прогулки', order: 5 },
            { url: '', caption: 'Новогодний утренник', category: 'Праздники', order: 6 },
        ];
        for (const g of galleryData) {
            const ex = await prisma.galleryImage.findFirst({ where: { caption: g.caption } });
            if (!ex) await prisma.galleryImage.create({ data: g });
        }

        return NextResponse.json({ success: true, message: 'База данных заполнена успешно!' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
