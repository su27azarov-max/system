/**
 * Seed-скрипт: тестовые данные для приложения RankKursant
 * Содержит: 2 группы, 10 курсантов, 1 преподаватель, записи баллов
 */

import { User, Group, Cadet, ScoreRecord, CategoryConfig } from '../types';

// ============ КАТЕГОРИИ ============
export const defaultCategories: CategoryConfig[] = [
  {
    id: 'classroom',
    name: 'Оценки на занятии',
    maxPoints: 50,
    description: 'Баллы за работу на паре: ответы, доклады, участие в дискуссиях',
  },
  {
    id: 'independent',
    name: 'Самостоятельная работа',
    maxPoints: 30,
    description: 'Баллы за сдачу самостоятельных работ',
  },
  {
    id: 'additional',
    name: 'Дополнительные задания',
    maxPoints: 20,
    description: 'Баллы за выполнение сверхпрограммных задач',
  },
  {
    id: 'articles',
    name: 'Написание статей',
    maxPoints: 15,
    description: 'Баллы за научные и учебные статьи',
  },
];

// ============ ПОЛЬЗОВАТЕЛИ ============
export const seedUsers: User[] = [
  // Преподаватель
  {
    id: 'user-teacher-1',
    email: 'teacher@rankkursant.ru',
    password: 'teacher123',
    fullName: 'Иванов Сергей Петрович',
    role: 'teacher',
  },
  // Курсанты группы ВУ-201
  {
    id: 'user-cadet-1',
    email: 'petrov@rankkursant.ru',
    password: 'cadet123',
    fullName: 'Петров Алексей Иванович',
    role: 'cadet',
    groupId: 'group-1',
  },
  {
    id: 'user-cadet-2',
    email: 'sidorov@rankkursant.ru',
    password: 'cadet123',
    fullName: 'Сидоров Дмитрий Николаевич',
    role: 'cadet',
    groupId: 'group-1',
  },
  {
    id: 'user-cadet-3',
    email: 'kozlov@rankkursant.ru',
    password: 'cadet123',
    fullName: 'Козлов Михаил Андреевич',
    role: 'cadet',
    groupId: 'group-1',
  },
  {
    id: 'user-cadet-4',
    email: 'novikov@rankkursant.ru',
    password: 'cadet123',
    fullName: 'Новиков Артём Владимирович',
    role: 'cadet',
    groupId: 'group-1',
  },
  {
    id: 'user-cadet-5',
    email: 'morozov@rankkursant.ru',
    password: 'cadet123',
    fullName: 'Морозов Виктор Сергеевич',
    role: 'cadet',
    groupId: 'group-1',
  },
  // Курсанты группы ВУ-202
  {
    id: 'user-cadet-6',
    email: 'volkov@rankkursant.ru',
    password: 'cadet123',
    fullName: 'Волков Роман Дмитриевич',
    role: 'cadet',
    groupId: 'group-2',
  },
  {
    id: 'user-cadet-7',
    email: 'sokolov@rankkursant.ru',
    password: 'cadet123',
    fullName: 'Соколов Никита Олегович',
    role: 'cadet',
    groupId: 'group-2',
  },
  {
    id: 'user-cadet-8',
    email: 'lebedev@rankkursant.ru',
    password: 'cadet123',
    fullName: 'Лебедев Кирилл Александрович',
    role: 'cadet',
    groupId: 'group-2',
  },
  {
    id: 'user-cadet-9',
    email: 'semenov@rankkursant.ru',
    password: 'cadet123',
    fullName: 'Семёнов Егор Павлович',
    role: 'cadet',
    groupId: 'group-2',
  },
  {
    id: 'user-cadet-10',
    email: 'egorov@rankkursant.ru',
    password: 'cadet123',
    fullName: 'Егоров Даниил Игоревич',
    role: 'cadet',
    groupId: 'group-2',
  },
];

// ============ ГРУППЫ ============
export const seedGroups: Group[] = [
  { id: 'group-1', name: 'Взвод учебный 201', number: 'ВУ-201' },
  { id: 'group-2', name: 'Взвод учебный 202', number: 'ВУ-202' },
];

// ============ КУРСАНТЫ ============
export const seedCadets: Cadet[] = [
  { id: 'cadet-1', userId: 'user-cadet-1', groupId: 'group-1', fullName: 'Петров Алексей Иванович' },
  { id: 'cadet-2', userId: 'user-cadet-2', groupId: 'group-1', fullName: 'Сидоров Дмитрий Николаевич' },
  { id: 'cadet-3', userId: 'user-cadet-3', groupId: 'group-1', fullName: 'Козлов Михаил Андреевич' },
  { id: 'cadet-4', userId: 'user-cadet-4', groupId: 'group-1', fullName: 'Новиков Артём Владимирович' },
  { id: 'cadet-5', userId: 'user-cadet-5', groupId: 'group-1', fullName: 'Морозов Виктор Сергеевич' },
  { id: 'cadet-6', userId: 'user-cadet-6', groupId: 'group-2', fullName: 'Волков Роман Дмитриевич' },
  { id: 'cadet-7', userId: 'user-cadet-7', groupId: 'group-2', fullName: 'Соколов Никита Олегович' },
  { id: 'cadet-8', userId: 'user-cadet-8', groupId: 'group-2', fullName: 'Лебедев Кирилл Александрович' },
  { id: 'cadet-9', userId: 'user-cadet-9', groupId: 'group-2', fullName: 'Семёнов Егор Павлович' },
  { id: 'cadet-10', userId: 'user-cadet-10', groupId: 'group-2', fullName: 'Егоров Даниил Игоревич' },
];

// ============ ЗАПИСИ БАЛЛОВ ============
// Генерируем 5-7 записей на каждого курсанта
export const seedScores: ScoreRecord[] = [
  // Петров А.И. — отличник
  { id: 'score-1', cadetId: 'cadet-1', category: 'classroom', points: 10, description: 'Отличный ответ на семинаре', date: '2025-09-15' },
  { id: 'score-2', cadetId: 'cadet-1', category: 'classroom', points: 8, description: 'Доклад по теме "Основы"', date: '2025-09-22' },
  { id: 'score-3', cadetId: 'cadet-1', category: 'independent', points: 10, description: 'СР №1 — сдана на отлично', date: '2025-10-01' },
  { id: 'score-4', cadetId: 'cadet-1', category: 'additional', points: 5, description: 'Решение олимпиадной задачи', date: '2025-10-10' },
  { id: 'score-5', cadetId: 'cadet-1', category: 'articles', points: 10, description: 'Статья в вестник вуза', date: '2025-11-05' },
  { id: 'score-6', cadetId: 'cadet-1', category: 'classroom', points: 9, description: 'Активное участие в дискуссии', date: '2025-11-12' },
  { id: 'score-7', cadetId: 'cadet-1', category: 'independent', points: 8, description: 'СР №2 — хорошо', date: '2025-11-20' },

  // Сидоров Д.Н. — хорошист
  { id: 'score-8', cadetId: 'cadet-2', category: 'classroom', points: 7, description: 'Ответ на занятии', date: '2025-09-15' },
  { id: 'score-9', cadetId: 'cadet-2', category: 'independent', points: 6, description: 'СР №1 — удовлетворительно', date: '2025-10-01' },
  { id: 'score-10', cadetId: 'cadet-2', category: 'classroom', points: 8, description: 'Доклад', date: '2025-10-20' },
  { id: 'score-11', cadetId: 'cadet-2', category: 'additional', points: 3, description: 'Доп. задание', date: '2025-11-01' },
  { id: 'score-12', cadetId: 'cadet-2', category: 'independent', points: 7, description: 'СР №2', date: '2025-11-20' },

  // Козлов М.А. — средний
  { id: 'score-13', cadetId: 'cadet-3', category: 'classroom', points: 5, description: 'Ответ на занятии', date: '2025-09-22' },
  { id: 'score-14', cadetId: 'cadet-3', category: 'independent', points: 4, description: 'СР №1', date: '2025-10-01' },
  { id: 'score-15', cadetId: 'cadet-3', category: 'classroom', points: 6, description: 'Работа в группе', date: '2025-10-20' },
  { id: 'score-16', cadetId: 'cadet-3', category: 'independent', points: 5, description: 'СР №2', date: '2025-11-20' },
  { id: 'score-17', cadetId: 'cadet-3', category: 'additional', points: 2, description: 'Доп. задание', date: '2025-11-25' },

  // Новиков А.В. — отстающий
  { id: 'score-18', cadetId: 'cadet-4', category: 'classroom', points: 3, description: 'Слабый ответ', date: '2025-09-15' },
  { id: 'score-19', cadetId: 'cadet-4', category: 'independent', points: 2, description: 'СР №1 — не сдана вовремя', date: '2025-10-05' },
  { id: 'score-20', cadetId: 'cadet-4', category: 'classroom', points: 4, description: 'Присутствие', date: '2025-11-12' },
  { id: 'score-21', cadetId: 'cadet-4', category: 'independent', points: 3, description: 'СР №2 — частично', date: '2025-11-20' },

  // Морозов В.С.
  { id: 'score-22', cadetId: 'cadet-5', category: 'classroom', points: 8, description: 'Хороший ответ', date: '2025-09-15' },
  { id: 'score-23', cadetId: 'cadet-5', category: 'independent', points: 7, description: 'СР №1', date: '2025-10-01' },
  { id: 'score-24', cadetId: 'cadet-5', category: 'additional', points: 5, description: 'Доп. проект', date: '2025-10-15' },
  { id: 'score-25', cadetId: 'cadet-5', category: 'classroom', points: 7, description: 'Доклад', date: '2025-11-12' },
  { id: 'score-26', cadetId: 'cadet-5', category: 'articles', points: 5, description: 'Тезисы конференции', date: '2025-11-20' },
  { id: 'score-27', cadetId: 'cadet-5', category: 'independent', points: 6, description: 'СР №2', date: '2025-11-25' },

  // Волков Р.Д. — отличник группы 2
  { id: 'score-28', cadetId: 'cadet-6', category: 'classroom', points: 10, description: 'Блестящий ответ', date: '2025-09-15' },
  { id: 'score-29', cadetId: 'cadet-6', category: 'classroom', points: 9, description: 'Доклад', date: '2025-09-22' },
  { id: 'score-30', cadetId: 'cadet-6', category: 'independent', points: 10, description: 'СР №1 — отлично', date: '2025-10-01' },
  { id: 'score-31', cadetId: 'cadet-6', category: 'additional', points: 7, description: 'Олимпиада', date: '2025-10-15' },
  { id: 'score-32', cadetId: 'cadet-6', category: 'articles', points: 12, description: 'Публикация в журнале', date: '2025-11-01' },
  { id: 'score-33', cadetId: 'cadet-6', category: 'classroom', points: 8, description: 'Активность', date: '2025-11-12' },
  { id: 'score-34', cadetId: 'cadet-6', category: 'independent', points: 9, description: 'СР №2', date: '2025-11-20' },

  // Соколов Н.О.
  { id: 'score-35', cadetId: 'cadet-7', category: 'classroom', points: 7, description: 'Ответ', date: '2025-09-15' },
  { id: 'score-36', cadetId: 'cadet-7', category: 'independent', points: 8, description: 'СР №1', date: '2025-10-01' },
  { id: 'score-37', cadetId: 'cadet-7', category: 'classroom', points: 6, description: 'Работа на паре', date: '2025-10-20' },
  { id: 'score-38', cadetId: 'cadet-7', category: 'additional', points: 4, description: 'Доп. задание', date: '2025-11-01' },
  { id: 'score-39', cadetId: 'cadet-7', category: 'independent', points: 7, description: 'СР №2', date: '2025-11-20' },
  { id: 'score-40', cadetId: 'cadet-7', category: 'articles', points: 5, description: 'Тезисы', date: '2025-11-25' },

  // Лебедев К.А.
  { id: 'score-41', cadetId: 'cadet-8', category: 'classroom', points: 6, description: 'Ответ', date: '2025-09-22' },
  { id: 'score-42', cadetId: 'cadet-8', category: 'independent', points: 5, description: 'СР №1', date: '2025-10-01' },
  { id: 'score-43', cadetId: 'cadet-8', category: 'classroom', points: 7, description: 'Доклад', date: '2025-11-12' },
  { id: 'score-44', cadetId: 'cadet-8', category: 'independent', points: 6, description: 'СР №2', date: '2025-11-20' },
  { id: 'score-45', cadetId: 'cadet-8', category: 'additional', points: 3, description: 'Доп. задача', date: '2025-11-25' },

  // Семёнов Е.П. — отстающий
  { id: 'score-46', cadetId: 'cadet-9', category: 'classroom', points: 3, description: 'Присутствие', date: '2025-09-15' },
  { id: 'score-47', cadetId: 'cadet-9', category: 'independent', points: 2, description: 'СР №1 — не сдана', date: '2025-10-05' },
  { id: 'score-48', cadetId: 'cadet-9', category: 'classroom', points: 4, description: 'Слабый ответ', date: '2025-11-12' },
  { id: 'score-49', cadetId: 'cadet-9', category: 'independent', points: 3, description: 'СР №2 — частично', date: '2025-11-20' },

  // Егоров Д.И.
  { id: 'score-50', cadetId: 'cadet-10', category: 'classroom', points: 8, description: 'Хороший ответ', date: '2025-09-15' },
  { id: 'score-51', cadetId: 'cadet-10', category: 'independent', points: 7, description: 'СР №1', date: '2025-10-01' },
  { id: 'score-52', cadetId: 'cadet-10', category: 'additional', points: 6, description: 'Проект', date: '2025-10-15' },
  { id: 'score-53', cadetId: 'cadet-10', category: 'classroom', points: 9, description: 'Доклад', date: '2025-11-12' },
  { id: 'score-54', cadetId: 'cadet-10', category: 'independent', points: 8, description: 'СР №2', date: '2025-11-20' },
  { id: 'score-55', cadetId: 'cadet-10', category: 'articles', points: 7, description: 'Статья', date: '2025-11-25' },
];
