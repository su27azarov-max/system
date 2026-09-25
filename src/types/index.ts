/**
 * Типы данных для приложения RankKursant
 * Описывают структуру курсантов, групп, баллов и категорий
 */

// Роли пользователей
export type UserRole = 'teacher' | 'cadet';

// Категории начисления баллов
export type ScoreCategory = 
  | 'classroom'      // Оценки на занятии
  | 'independent'    // Самостоятельная работа
  | 'additional'     // Дополнительные задания
  | 'articles';      // Написание статей

// Пользователь системы
export interface User {
  id: string;
  email: string;
  password: string; // В реальном проекте — хеш
  fullName: string;
  role: UserRole;
  groupId?: string; // Для курсантов
}

// Группа курсантов
export interface Group {
  id: string;
  name: string;
  number: string; // Номер группы, например "ВУ-201"
}

// Курсант
export interface Cadet {
  id: string;
  userId: string;
  groupId: string;
  fullName: string;
}

// Запись о начислении баллов
export interface ScoreRecord {
  id: string;
  cadetId: string;
  category: ScoreCategory;
  points: number;
  description: string;
  date: string; // ISO string
}

// Категория с лимитом
export interface CategoryConfig {
  id: ScoreCategory;
  name: string;
  maxPoints: number;
  description: string;
}

// Сводка рейтинга курсанта
export interface CadetRating {
  cadet: Cadet;
  group: Group;
  scores: ScoreRecord[];
  totalPoints: number;
  categoryPoints: Record<ScoreCategory, number>;
}

// Сортировка таблицы
export type SortDirection = 'asc' | 'desc';
export interface SortConfig {
  key: string;
  direction: SortDirection;
}
