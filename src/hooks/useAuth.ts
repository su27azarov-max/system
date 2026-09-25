/**
 * Хук для работы с аутентификацией
 * Управляет состоянием текущего пользователя
 */

import { useState, useCallback } from 'react';
import { User } from '../types';
import { login as storeLogin, logout as storeLogout, getCurrentUser, initializeStore } from '../data/store';

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    initializeStore();
    return getCurrentUser();
  });

  const login = useCallback((email: string, password: string): boolean => {
    const loggedInUser = storeLogin(email, password);
    if (loggedInUser) {
      setUser(loggedInUser);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    storeLogout();
    setUser(null);
  }, []);

  return { user, login, logout, isAuthenticated: !!user };
}
