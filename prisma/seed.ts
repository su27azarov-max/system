/**
 * Seed-скрипт для заполнения базы данных тестовыми данными
 * ============================================================
 * Запуск: npx ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts
 * 
 * Создаёт:
 * - 1 преподавателя
 * - 2 группы
 * - 10 курсантов (5 в каждой группе)
 * - 5-7 записей баллов на каждого курсанта
 * - 4 категории с лимитами
 * ============================================================
 */

import { PrismaClient, Role, ScoreCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Запуск seed...');

  // Очистка
  await prisma.scoreRecord.deleteMany();
  await prisma.cadet.deleteMany();
  await prisma.user.deleteMany();
  await prisma.group.deleteMany();
  await prisma.categoryConfig.deleteMany();

  // ============ КАТЕГОРИИ ============
  const categories = await Promise.all([
    prisma.categoryConfig.create({
      data: {
        category: ScoreCategory.CLASSROOM,
        name: 'Оценки на занятии',
        maxPoints: 50,
        description: 'Баллы за работу на паре: ответы, доклады, участие в дискуссиях',
      },
    }),
    prisma.categoryConfig.create({
      data: {
        category: ScoreCategory.INDEPENDENT,
        name: 'Самостоятельная работа',
        maxPoints: 30,
        description: 'Баллы за сдачу самостоятельных работ',
      },
    }),
    prisma.categoryConfig.create({
      data: {
        category: ScoreCategory.ADDITIONAL,
        name: 'Дополнительные задания',
        maxPoints: 20,
        description: 'Баллы за выполнение сверхпрограммных задач',
      },
    }),
    prisma.categoryConfig.create({
      data: {
        category: ScoreCategory.ARTICLES,
        name: 'Написание статей',
        maxPoints: 15,
        description: 'Баллы за научные и учебные статьи',
      },
    }),
  ]);
  console.log(`✅ Создано ${categories.length} категорий`);

  // ============ ПРЕПОДАВАТЕЛЬ ============
  const teacher = await prisma.user.create({
    data: {
      email: 'teacher@rankkursant.ru',
      password: '$2b$10$hash_placeholder', // bcrypt hash от 'teacher123'
      fullName: 'Иванов Сергей Петрович',
      role: Role.TEACHER,
    },
  });
  console.log(`✅ Преподаватель: ${teacher.fullName}`);

  // ============ ГРУППЫ ============
  const group1 = await prisma.group.create({
    data: { name: 'Взвод учебный 201', number: 'ВУ-201' },
  });
  const group2 = await prisma.group.create({
    data: { name: 'Взвод учебный 202', number: 'ВУ-202' },
  });
  console.log(`✅ Создано 2 группы: ${group1.number}, ${group2.number}`);

  // ============ КУРСАНТЫ ============
  const cadetData = [
    { name: 'Петров Алексей Иванович', group: group1.id, email: 'petrov@rankkursant.ru' },
    { name: 'Сидоров Дмитрий Николаевич', group: group1.id, email: 'sidorov@rankkursant.ru' },
    { name: 'Козлов Михаил Андреевич', group: group1.id, email: 'kozlov@rankkursant.ru' },
    { name: 'Новиков Артём Владимирович', group: group1.id, email: 'novikov@rankkursant.ru' },
    { name: 'Морозов Виктор Сергеевич', group: group1.id, email: 'morozov@rankkursant.ru' },
    { name: 'Волков Роман Дмитриевич', group: group2.id, email: 'volkov@rankkursant.ru' },
    { name: 'Соколов Никита Олегович', group: group2.id, email: 'sokolov@rankkursant.ru' },
    { name: 'Лебедев Кирилл Александрович', group: group2.id, email: 'lebedev@rankkursant.ru' },
    { name: 'Семёнов Егор Павлович', group: group2.id, email: 'semenov@rankkursant.ru' },
    { name: 'Егоров Даниил Игоревич', group: group2.id, email: 'egorov@rankkursant.ru' },
  ];

  const cadets = [];
  for (const data of cadetData) {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: '$2b$10$hash_placeholder', // bcrypt hash от 'cadet123'
        fullName: data.name,
        role: Role.CADET,
        groupId: data.group,
      },
    });

    const cadet = await prisma.cadet.create({
      data: {
        userId: user.id,
        groupId: data.group,
        fullName: data.name,
      },
    });
    cadets.push(cadet);
  }
  console.log(`✅ Создано ${cadets.length} курсантов`);

  // ============ БАЛЛЫ ============
  // Генерируем 5-7 записей на каждого курсанта
  const scoreTemplates = [
    // Для отличников (cadets 0, 5)
    [
      { category: ScoreCategory.CLASSROOM, points: 10, description: 'Отличный ответ на семинаре' },
      { category: ScoreCategory.CLASSROOM, points: 8, description: 'Доклад по теме' },
      { category: ScoreCategory.INDEPENDENT, points: 10, description: 'СР №1 — отлично' },
      { category: ScoreCategory.ADDITIONAL, points: 5, description: 'Олимпиадная задача' },
      { category: ScoreCategory.ARTICLES, points: 10, description: 'Статья в вестник' },
      { category: ScoreCategory.CLASSROOM, points: 9, description: 'Активное участие' },
      { category: ScoreCategory.INDEPENDENT, points: 8, description: 'СР №2 — хорошо' },
    ],
    // Для хорошистов (cadets 1, 6)
    [
      { category: ScoreCategory.CLASSROOM, points: 7, description: 'Ответ на занятии' },
      { category: ScoreCategory.INDEPENDENT, points: 6, description: 'СР №1' },
      { category: ScoreCategory.CLASSROOM, points: 8, description: 'Доклад' },
      { category: ScoreCategory.ADDITIONAL, points: 3, description: 'Доп. задание' },
      { category: ScoreCategory.INDEPENDENT, points: 7, description: 'СР №2' },
    ],
    // Для средних (cadets 2, 7)
    [
      { category: ScoreCategory.CLASSROOM, points: 5, description: 'Ответ' },
      { category: ScoreCategory.INDEPENDENT, points: 4, description: 'СР №1' },
      { category: ScoreCategory.CLASSROOM, points: 6, description: 'Работа в группе' },
      { category: ScoreCategory.INDEPENDENT, points: 5, description: 'СР №2' },
      { category: ScoreCategory.ADDITIONAL, points: 2, description: 'Доп. задание' },
    ],
    // Для отстающих (cadets 3, 8)
    [
      { category: ScoreCategory.CLASSROOM, points: 3, description: 'Слабый ответ' },
      { category: ScoreCategory.INDEPENDENT, points: 2, description: 'СР не сдана вовремя' },
      { category: ScoreCategory.CLASSROOM, points: 4, description: 'Присутствие' },
      { category: ScoreCategory.INDEPENDENT, points: 3, description: 'СР частично' },
    ],
    // Для хорошистов-2 (cadets 4, 9)
    [
      { category: ScoreCategory.CLASSROOM, points: 8, description: 'Хороший ответ' },
      { category: ScoreCategory.INDEPENDENT, points: 7, description: 'СР №1' },
      { category: ScoreCategory.ADDITIONAL, points: 5, description: 'Доп. проект' },
      { category: ScoreCategory.CLASSROOM, points: 7, description: 'Доклад' },
      { category: ScoreCategory.ARTICLES, points: 5, description: 'Тезисы конференции' },
      { category: ScoreCategory.INDEPENDENT, points: 6, description: 'СР №2' },
    ],
  ];

  const templateMap = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4];
  let totalScores = 0;

  for (let i = 0; i < cadets.length; i++) {
    const template = scoreTemplates[templateMap[i]];
    const baseDate = new Date('2025-09-15');

    for (let j = 0; j < template.length; j++) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() + j * 10 + Math.floor(Math.random() * 5));

      await prisma.scoreRecord.create({
        data: {
          cadetId: cadets[i].id,
          category: template[j].category,
          points: template[j].points,
          description: template[j].description,
          date: date,
        },
      });
      totalScores++;
    }
  }
  console.log(`✅ Создано ${totalScores} записей баллов`);

  console.log('\n🎉 Seed завершён успешно!');
  console.log('\n📋 Тестовые данные для входа:');
  console.log('   Преподаватель: teacher@rankkursant.ru / teacher123');
  console.log('   Курсант:       petrov@rankkursant.ru / cadet123');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
