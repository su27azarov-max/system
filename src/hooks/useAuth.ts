/**
 * Хук для работы с аутентификацией
 * Управляет состоянием текущего пользователя
 */

import { useState, useCallback, useEffect } from 'react';
import { User } from '../types';
import { login as storeLogin, logout as storeLogout, getCurrentUser, initializeStore } from '../data/store';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Инициализация при первом рендере
  useEffect(() => {
    try {
      initializeStore();
      const currentUser = getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Auth initialization error:', error);
      setUser(null);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const login = useCallback((email: string, password: string): boolean => {
    try {
      const loggedInUser = storeLogin(email, password);
      if (loggedInUser) {
        setUser(loggedInUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    try {
      storeLogout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
    }
  }, []);

  return { 
    user, 
    login, 
    logout, 
    isAuthenticated: !!user,
    isInitialized 
  };
}
