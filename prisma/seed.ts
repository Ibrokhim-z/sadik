import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin
  const passwordHash = await bcrypt.hash("admin123", 10);
  await prisma.admin.upsert({
    where: { email: "admin@balapan.kz" },
    update: {},
    create: { email: "admin@balapan.kz", passwordHash, name: "Администратор" },
  });

  // Settings
  await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      siteName: "Балапан",
      slogan: "Место, где детство наполнено открытиями",
      address: "г. Алматы, ул. Абая, 10",
      phone: "+7 (727) 200-00-00",
      whatsapp: "+77272000000",
      email: "info@balapan.kz",
      workHours: "Пн–Пт: 07:00–19:00, Сб: 08:00–14:00",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.0!2d76.9!3d43.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDEyJzAwLjAiTiA3NsKwNTQnMDAuMCJF!5e0!3m2!1sru!2skz!4v1234567890",
      about: "Мы создаём тёплую, безопасную и вдохновляющую среду, где каждый ребёнок раскрывает свои таланты.",
    },
  });

  // Groups
  const groups = [
    { name: "Ясельная группа", ageRange: "1.5–2 года", capacity: 10, icon: "🍼", order: 1 },
    { name: "Младшая группа", ageRange: "2–3 года", capacity: 12, icon: "🌱", order: 2 },
    { name: "Средняя группа", ageRange: "3–4 года", capacity: 15, icon: "🌸", order: 3 },
    { name: "Старшая группа", ageRange: "4–5 лет", capacity: 15, icon: "🌟", order: 4 },
    { name: "Подготовка к школе", ageRange: "5–6 лет", capacity: 12, icon: "🎒", order: 5 },
  ];
  for (const g of groups) {
    await prisma.group.upsert({ where: { id: g.order }, update: {}, create: g });
  }

  // Activities
  const activities = [
    { name: "Речь и коммуникация", description: "Развиваем речь через сказки, ролевые игры и общение в группе.", ageRange: "2–6 лет", frequency: "Ежедневно", icon: "💬", order: 1 },
    { name: "Логика и математика", description: "Игровые задания на счёт, формы, сравнение и причинно-следственные связи.", ageRange: "3–6 лет", frequency: "3 раза в неделю", icon: "🧩", order: 2 },
    { name: "Рисование и лепка", description: "Развиваем мелкую моторику и воображение через творческие занятия.", ageRange: "2–6 лет", frequency: "4 раза в неделю", icon: "🎨", order: 3 },
    { name: "Музыка и танцы", description: "Ритм, слух, движение — музыкальные занятия для всестороннего развития.", ageRange: "1.5–6 лет", frequency: "2 раза в неделю", icon: "🎵", order: 4 },
    { name: "Физическая активность", description: "Утренняя зарядка, подвижные игры и занятия физкультурой на свежем воздухе.", ageRange: "1.5–6 лет", frequency: "Ежедневно", icon: "⚽", order: 5 },
    { name: "Изучение языков", description: "Знакомство с казахским и русским языками через песни, игры и сказки.", ageRange: "3–6 лет", frequency: "5 раз в неделю", icon: "🌐", order: 6 },
  ];
  for (const a of activities) {
    await prisma.activity.upsert({ where: { id: a.order }, update: {}, create: a });
  }

  // Staff
  const staff = [
    { name: "Айгүл Сейткали", role: "Главный воспитатель", bio: "Тёплый и внимательный педагог с индивидуальным подходом к каждому ребёнку.", education: "КазНПУ, педагогика дошкольного образования", experience: "12 лет", category: "Воспитатели", order: 1 },
    { name: "Марина Петрова", role: "Воспитатель", bio: "Специалист по развитию речи и подготовке детей к школе.", education: "АГУ, психология и педагогика", experience: "8 лет", category: "Воспитатели", order: 2 },
    { name: "Дина Ахметова", role: "Воспитатель", bio: "Создаёт радостную атмосферу, в которой дети учатся играючи.", education: "КазГПУ, дошкольное воспитание", experience: "6 лет", category: "Воспитатели", order: 3 },
    { name: "Лариса Иванова", role: "Музыкальный руководитель", bio: "Проводит занятия по ритмике, пению и музыкальным играм.", education: "КазНУИ, музыкальное образование", experience: "10 лет", category: "Специалисты", order: 4 },
    { name: "Асель Нурланова", role: "Педагог-психолог", bio: "Помогает детям с адаптацией, развивает эмоциональный интеллект.", education: "КазНУ, психология", experience: "7 лет", category: "Специалисты", order: 5 },
  ];
  for (const s of staff) {
    await prisma.staff.upsert({ where: { id: s.order }, update: {}, create: s });
  }

  // News
  const news = [
    { title: "Открытый день в «Балапан» — приглашаем семьи!", slug: "open-day-2024", excerpt: "Приходите познакомиться с нашим детским садом, задать вопросы и увидеть, как проходит день ребёнка.", content: "Уважаемые родители! Мы рады пригласить вас на открытый день...", published: true },
    { title: "Набор в ясельную группу — места ещё есть", slug: "nursery-enrollment", excerpt: "Начинаем приём заявок на новый учебный год для детей от 1.5 лет.", content: "Дорогие родители! Мы открываем запись в ясельную группу...", published: true },
    { title: "Осенний праздник «Золотая листва»", slug: "autumn-fest-2024", excerpt: "Дети подготовили замечательное выступление для родителей — поделки, песни и танцы.", content: "В нашем детском саду прошёл прекрасный осенний праздник...", published: true },
  ];
  for (let i = 0; i < news.length; i++) {
    await prisma.news.upsert({ where: { slug: news[i].slug }, update: {}, create: { ...news[i], order: i + 1 } as any });
  }

  // Gallery categories
  const galleryItems = [
    { url: "/images/gallery/interior-1.jpg", category: "Помещения", caption: "Уютная игровая комната", order: 1 },
    { url: "/images/gallery/interior-2.jpg", category: "Помещения", caption: "Спальная зона", order: 2 },
    { url: "/images/gallery/class-1.jpg", category: "Занятия", caption: "Творческое занятие", order: 3 },
    { url: "/images/gallery/class-2.jpg", category: "Занятия", caption: "Музыкальный урок", order: 4 },
    { url: "/images/gallery/walk-1.jpg", category: "Прогулки", caption: "Прогулка в саду", order: 5 },
    { url: "/images/gallery/event-1.jpg", category: "Праздники", caption: "Новогодний утренник", order: 6 },
  ];
  for (const g of galleryItems) {
    const existing = await prisma.galleryImage.findFirst({ where: { url: g.url } });
    if (!existing) await prisma.galleryImage.create({ data: g });
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
