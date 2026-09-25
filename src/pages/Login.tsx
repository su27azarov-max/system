/**
 * Страница входа в систему
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, LogIn } from 'lucide-react';
import { Button, Input, showToast } from '../components/ui';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        showToast('Добро пожаловать!', 'success');
        navigate('/');
      } else {
        setError('Неверный email или пароль');
        showToast('Ошибка входа', 'error');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">RankKursant</h1>
          <p className="text-slate-400 mt-2">Система учёта рейтинга курсантов</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teacher@rankkursant.ru"
              required
              error={error}
            />

            <Input
              label="Пароль"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <Button type="submit" loading={loading} className="w-full" size="lg">
              <LogIn size={18} className="mr-2" />
              Войти
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-500 font-medium mb-3">Демо-доступ:</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center bg-slate-50 rounded-lg px-3 py-2">
                <div>
                  <span className="font-medium text-slate-700">Преподаватель:</span>
                  <span className="text-slate-500 ml-1">teacher@rankkursant.ru</span>
                </div>
                <code className="bg-slate-200 px-2 py-0.5 rounded text-slate-600">teacher123</code>
              </div>
              <div className="flex justify-between items-center bg-slate-50 rounded-lg px-3 py-2">
                <div>
                  <span className="font-medium text-slate-700">Курсант:</span>
                  <span className="text-slate-500 ml-1">petrov@rankkursant.ru</span>
                </div>
                <code className="bg-slate-200 px-2 py-0.5 rounded text-slate-600">cadet123</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
