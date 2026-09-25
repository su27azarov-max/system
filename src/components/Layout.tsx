/**
 * Layout — общий каркас приложения
 * Header с навигацией и боковая панель (для преподавателя)
 */

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User } from '../types';
import { 
  LayoutDashboard, Users, Settings, LogOut, 
  Trophy, GraduationCap, ChevronRight, Shield 
} from 'lucide-react';

interface LayoutProps {
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
}

export function Layout({ user, onLogout, children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isTeacher = user.role === 'teacher';

  // Навигация для преподавателя
  const teacherNav = [
    { path: '/dashboard', label: 'Сводка', icon: LayoutDashboard },
    { path: '/groups', label: 'Группы', icon: Users },
    { path: '/settings', label: 'Настройки', icon: Settings },
  ];

  // Навигация для курсанта
  const cadetNav = [
    { path: '/my-rating', label: 'Мой рейтинг', icon: Trophy },
    { path: '/overall', label: 'Общий рейтинг', icon: GraduationCap },
  ];

  const navItems = isTeacher ? teacherNav : cadetNav;

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Shield className="w-7 h-7 text-blue-400" />
              <span className="text-lg font-bold tracking-tight">RankKursant</span>
            </Link>

            {/* User info */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium">{user.fullName}</p>
                <p className="text-xs text-slate-400">
                  {isTeacher ? 'Преподаватель' : 'Курсант'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
                title="Выйти"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <nav className="bg-white rounded-xl border border-slate-200 shadow-sm p-2 lg:sticky lg:top-24">
              <ul className="flex lg:flex-col gap-1 overflow-x-auto">
                {navItems.map(item => {
                  const isActive = location.pathname.startsWith(item.path);
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                        }`}
                      >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                        {isActive && <ChevronRight size={14} className="ml-auto lg:hidden" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
