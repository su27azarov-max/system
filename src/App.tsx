/**
 * App.tsx — главный компонент приложения RankKursant
 * Роутинг, авторизация, защита маршрутов
 * 
 * ВАЖНО: Используется HashRouter для совместимости с GitHub Pages
 * (статический хостинг не поддерживает серверную маршрутизацию)
 */

import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Layout } from './components/Layout';
import { ToastContainer } from './components/ui';

// Страницы
import { LoginPage } from './pages/Login';
import { DashboardPage } from './pages/teacher/Dashboard';
import { GroupPage } from './pages/teacher/GroupPage';
import { StudentPage } from './pages/teacher/StudentPage';
import { SettingsPage } from './pages/teacher/Settings';
import { GroupsListPage } from './pages/teacher/GroupsList';
import { MyRatingPage } from './pages/cadet/MyRating';
import { OverallPage } from './pages/cadet/Overall';

/**
 * Компонент защиты маршрута
 * Перенаправляет неавторизованных на /login
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

/**
 * Редирект на нужную страницу в зависимости от роли
 */
function HomeRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={user.role === 'teacher' ? '/dashboard' : '/my-rating'} replace />;
}

/**
 * Обёртка для страниц преподавателя
 */
function TeacherLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  if (!user || user.role !== 'teacher') {
    return <Navigate to="/login" replace />;
  }
  return <Layout user={user} onLogout={logout}>{children}</Layout>;
}

/**
 * Обёртка для страниц курсанта
 */
function CadetLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  if (!user || user.role !== 'cadet') {
    return <Navigate to="/login" replace />;
  }
  return <Layout user={user} onLogout={logout}>{children}</Layout>;
}

export default function App() {
  return (
    <HashRouter>
      <ToastContainer />
      <Routes>
        {/* Публичные маршруты */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute><HomeRedirect /></ProtectedRoute>} />

        {/* Маршруты преподавателя */}
        <Route path="/dashboard" element={<TeacherLayout><DashboardPage /></TeacherLayout>} />
        <Route path="/groups" element={<TeacherLayout><GroupsListPage /></TeacherLayout>} />
        <Route path="/groups/:id" element={<TeacherLayout><GroupPage /></TeacherLayout>} />
        <Route path="/students/:id" element={<TeacherLayout><StudentPage /></TeacherLayout>} />
        <Route path="/settings" element={<TeacherLayout><SettingsPage /></TeacherLayout>} />

        {/* Маршруты курсанта */}
        <Route path="/my-rating" element={<CadetLayout><MyRatingPage /></CadetLayout>} />
        <Route path="/overall" element={<CadetLayout><OverallPage /></CadetLayout>} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
