/**
 * База данных курсантов
 * Содержит информацию о группах, курсантах и их баллах
 */

export interface Group {
  id: string;
  name: string;
  number: string;
}

export interface Cadet {
  id: string;
  fullName: string;
  groupId: string;
}

export interface Score {
  id: string;
  cadetId: string;
  category: 'classroom' | 'independent' | 'additional' | 'articles';
  points: number;
  description: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  maxPoints: number;
}

// Группы
export const groups: Group[] = [
  { id: 'group-1', name: 'Взвод учебный 201', number: 'ВУ-201' },
  { id: 'group-2', name: 'Взвод учебный 202', number: 'ВУ-202' },
];

// Категории баллов
export const categories: Category[] = [
  { id: 'classroom', name: 'Оценки на занятии', maxPoints: 50 },
  { id: 'independent', name: 'Самостоятельная работа', maxPoints: 30 },
  { id: 'additional', name: 'Дополнительные задания', maxPoints: 20 },
  { id: 'articles', name: 'Написание статей', maxPoints: 15 },
];

// Курсанты
export const cadets: Cadet[] = [
  // Группа ВУ-201
  { id: 'cadet-1', fullName: 'Петров Алексей Иванович', groupId: 'group-1' },
  { id: 'cadet-2', fullName: 'Сидоров Дмитрий Николаевич', groupId: 'group-1' },
  { id: 'cadet-3', fullName: 'Козлов Михаил Андреевич', groupId: 'group-1' },
  { id: 'cadet-4', fullName: 'Новиков Артём Владимирович', groupId: 'group-1' },
  { id: 'cadet-5', fullName: 'Морозов Виктор Сергеевич', groupId: 'group-1' },
  // Группа ВУ-202
  { id: 'cadet-6', fullName: 'Волков Роман Дмитриевич', groupId: 'group-2' },
  { id: 'cadet-7', fullName: 'Соколов Никита Олегович', groupId: 'group-2' },
  { id: 'cadet-8', fullName: 'Лебедев Кирилл Александрович', groupId: 'group-2' },
  { id: 'cadet-9', fullName: 'Семёнов Егор Павлович', groupId: 'group-2' },
  { id: 'cadet-10', fullName: 'Егоров Даниил Игоревич', groupId: 'group-2' },
];

// Баллы курсантов
export const scores: Score[] = [
  // Петров А.И. — отличник
  { id: 'score-1', cadetId: 'cadet-1', category: 'classroom', points: 10, description: 'Отличный ответ на семинаре', date: '2025-09-15' },
  { id: 'score-2', cadetId: 'cadet-1', category: 'classroom', points: 8, description: 'Доклад по теме', date: '2025-09-22' },
  { id: 'score-3', cadetId: 'cadet-1', category: 'independent', points: 10, description: 'СР №1 — отлично', date: '2025-10-01' },
  { id: 'score-4', cadetId: 'cadet-1', category: 'additional', points: 5, description: 'Олимпиадная задача', date: '2025-10-10' },
  { id: 'score-5', cadetId: 'cadet-1', category: 'articles', points: 10, description: 'Статья в вестник', date: '2025-11-05' },
  { id: 'score-6', cadetId: 'cadet-1', category: 'classroom', points: 9, description: 'Активное участие', date: '2025-11-12' },
  { id: 'score-7', cadetId: 'cadet-1', category: 'independent', points: 8, description: 'СР №2 — хорошо', date: '2025-11-20' },

  // Сидоров Д.Н. — хорошист
  { id: 'score-8', cadetId: 'cadet-2', category: 'classroom', points: 7, description: 'Ответ на занятии', date: '2025-09-15' },
  { id: 'score-9', cadetId: 'cadet-2', category: 'independent', points: 6, description: 'СР №1', date: '2025-10-01' },
  { id: 'score-10', cadetId: 'cadet-2', category: 'classroom', points: 8, description: 'Доклад', date: '2025-10-20' },
  { id: 'score-11', cadetId: 'cadet-2', category: 'additional', points: 3, description: 'Доп. задание', date: '2025-11-01' },
  { id: 'score-12', cadetId: 'cadet-2', category: 'independent', points: 7, description: 'СР №2', date: '2025-11-20' },

  // Козлов М.А. — средний
  { id: 'score-13', cadetId: 'cadet-3', category: 'classroom', points: 5, description: 'Ответ', date: '2025-09-22' },
  { id: 'score-14', cadetId: 'cadet-3', category: 'independent', points: 4, description: 'СР №1', date: '2025-10-01' },
  { id: 'score-15', cadetId: 'cadet-3', category: 'classroom', points: 6, description: 'Работа в группе', date: '2025-10-20' },
  { id: 'score-16', cadetId: 'cadet-3', category: 'independent', points: 5, description: 'СР №2', date: '2025-11-20' },
  { id: 'score-17', cadetId: 'cadet-3', category: 'additional', points: 2, description: 'Доп. задание', date: '2025-11-25' },

  // Новиков А.В. — отстающий
  { id: 'score-18', cadetId: 'cadet-4', category: 'classroom', points: 3, description: 'Слабый ответ', date: '2025-09-15' },
  { id: 'score-19', cadetId: 'cadet-4', category: 'independent', points: 2, description: 'СР не сдана', date: '2025-10-05' },
  { id: 'score-20', cadetId: 'cadet-4', category: 'classroom', points: 4, description: 'Присутствие', date: '2025-11-12' },
  { id: 'score-21', cadetId: 'cadet-4', category: 'independent', points: 3, description: 'СР частично', date: '2025-11-20' },

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

// Функции для работы с данными
export function getCadetTotalPoints(cadetId: string): number {
  return scores
    .filter(s => s.cadetId === cadetId)
    .reduce((sum, s) => sum + s.points, 0);
}

export function getCadetCategoryPoints(cadetId: string, categoryId: string): number {
  return scores
    .filter(s => s.cadetId === cadetId && s.category === categoryId)
    .reduce((sum, s) => sum + s.points, 0);
}

export function getCadetsByGroup(groupId: string): Cadet[] {
  return cadets.filter(c => c.groupId === groupId);
}

export function getGroupById(groupId: string): Group | undefined {
  return groups.find(g => g.id === groupId);
}

export function getCadetById(cadetId: string): Cadet | undefined {
  return cadets.find(c => c.id === cadetId);
}
