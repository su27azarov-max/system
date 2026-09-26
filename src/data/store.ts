/**
 * Store — хранилище данных на основе localStorage
 * В MVP используется как замена бэкенду.
 * При подключении Prisma/Supabase — заменить на API-вызовы.
 */

import { User, Group, Cadet, ScoreRecord, CategoryConfig, ScoreCategory } from '../types';
import { seedUsers, seedGroups, seedCadets, seedScores, defaultCategories } from './seed';

const STORAGE_KEYS = {
  users: 'rk_users',
  groups: 'rk_groups',
  cadets: 'rk_cadets',
  scores: 'rk_scores',
  categories: 'rk_categories',
  currentUser: 'rk_current_user',
  initialized: 'rk_initialized',
};

// Инициализация хранилища seed-данными при первом запуске
export function initializeStore(): void {
  try {
    const isInitialized = localStorage.getItem(STORAGE_KEYS.initialized);
    if (!isInitialized) {
      localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(seedUsers));
      localStorage.setItem(STORAGE_KEYS.groups, JSON.stringify(seedGroups));
      localStorage.setItem(STORAGE_KEYS.cadets, JSON.stringify(seedCadets));
      localStorage.setItem(STORAGE_KEYS.scores, JSON.stringify(seedScores));
      localStorage.setItem(STORAGE_KEYS.categories, JSON.stringify(defaultCategories));
      localStorage.setItem(STORAGE_KEYS.initialized, 'true');
    }
  } catch (error) {
    console.error('Ошибка инициализации localStorage:', error);
  }
}

// ============ AUTH ============
export function login(email: string, password: string): User | null {
  try {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
    }
    return user || null;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

export function logout(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
  } catch (error) {
    console.error('Logout error:', error);
  }
}

export function getCurrentUser(): User | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.currentUser);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

// ============ USERS ============
export function getUsers(): User[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.users);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// ============ GROUPS ============
export function getGroups(): Group[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.groups);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// ============ CADETS ============
export function getCadets(): Cadet[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.cadets);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getCadetById(id: string): Cadet | undefined {
  return getCadets().find(c => c.id === id);
}

export function getCadetsByGroup(groupId: string): Cadet[] {
  return getCadets().filter(c => c.groupId === groupId);
}

export function addCadet(cadet: Omit<Cadet, 'id'>): Cadet {
  try {
    const cadets = getCadets();
    const newCadet: Cadet = { ...cadet, id: `cadet-${Date.now()}` };
    cadets.push(newCadet);
    localStorage.setItem(STORAGE_KEYS.cadets, JSON.stringify(cadets));
    return newCadet;
  } catch (error) {
    console.error('addCadet error:', error);
    return { ...cadet, id: `cadet-error-${Date.now()}` };
  }
}

export function deleteCadet(id: string): void {
  try {
    const cadets = getCadets().filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.cadets, JSON.stringify(cadets));
    const scores = getScores().filter(s => s.cadetId !== id);
    localStorage.setItem(STORAGE_KEYS.scores, JSON.stringify(scores));
  } catch (error) {
    console.error('deleteCadet error:', error);
  }
}

// ============ SCORES ============
export function getScores(): ScoreRecord[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.scores);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getScoresByCadet(cadetId: string): ScoreRecord[] {
  return getScores().filter(s => s.cadetId === cadetId);
}

export function addScore(score: Omit<ScoreRecord, 'id'>): ScoreRecord {
  try {
    const scores = getScores();
    const newScore: ScoreRecord = { ...score, id: `score-${Date.now()}` };
    scores.push(newScore);
    localStorage.setItem(STORAGE_KEYS.scores, JSON.stringify(scores));
    return newScore;
  } catch (error) {
    console.error('addScore error:', error);
    return { ...score, id: `score-error-${Date.now()}` };
  }
}

export function deleteScore(id: string): void {
  try {
    const scores = getScores().filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.scores, JSON.stringify(scores));
  } catch (error) {
    console.error('deleteScore error:', error);
  }
}

// ============ CATEGORIES ============
export function getCategories(): CategoryConfig[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.categories);
    return data ? JSON.parse(data) : defaultCategories;
  } catch {
    return defaultCategories;
  }
}

export function updateCategoryMaxPoints(categoryId: ScoreCategory, maxPoints: number): void {
  try {
    const categories = getCategories();
    const idx = categories.findIndex(c => c.id === categoryId);
    if (idx !== -1) {
      categories[idx].maxPoints = maxPoints;
      localStorage.setItem(STORAGE_KEYS.categories, JSON.stringify(categories));
    }
  } catch (error) {
    console.error('updateCategoryMaxPoints error:', error);
  }
}

// ============ УТИЛИТЫ ============
/** Подсчёт суммы баллов курсанта */
export function getTotalPoints(cadetId: string): number {
  return getScoresByCadet(cadetId).reduce((sum, s) => sum + s.points, 0);
}

/** Подсчёт баллов по категории для курсанта */
export function getCategoryPoints(cadetId: string, category: ScoreCategory): number {
  return getScoresByCadet(cadetId)
    .filter(s => s.category === category)
    .reduce((sum, s) => sum + s.points, 0);
}

/** Сброс всех данных (для разработки) */
export function resetStore(): void {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  initializeStore();
}
