/**
 * MyRating — рейтинг курсанта в группе + детализация баллов
 * Доступно только для роли "cadet"
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Trophy, Target } from 'lucide-react';
import { Card, Badge, TableSkeleton } from '../../components/ui';
import { getCurrentUser } from '../../data/store';
import { getCadets, getGroups, getScoresByCadet, getCategories, getCadetsByGroup, getTotalPoints } from '../../data/store';
import { User, Cadet, Group, ScoreRecord, CategoryConfig, CadetRating } from '../../types';

export function MyRatingPage() {
  const [loading, setLoading] = useState(true);
  const [cadet, setCadet] = useState<Cadet | null>(null);
  const [group, setGroup] = useState<Group | null>(null);
  const [myScores, setMyScores] = useState<ScoreRecord[]>([]);
  const [groupRank, setGroupRank] = useState(0);
  const [groupTotal, setGroupTotal] = useState(0);
  const categories = getCategories();

  useEffect(() => {
    const timer = setTimeout(() => {
      const user = getCurrentUser();
      if (!user || !user.groupId) {
        setLoading(false);
        return;
      }

      // Найти курсанта по userId
      const allCadets = getCadets();
      const myCadet = allCadets.find((c: Cadet) => c.userId === user.id);
      if (myCadet) {
        setCadet(myCadet);
        const g = getGroups().find((gr: Group) => gr.id === myCadet.groupId);
        setGroup(g || null);
        setMyScores(getScoresByCadet(myCadet.id));

        // Подсчитать место в группе
        const groupCadets = getCadetsByGroup(myCadet.groupId);
        const ratings = groupCadets.map((c: Cadet) => ({
          id: c.id,
          total: getTotalPoints(c.id),
        }));
        ratings.sort((a, b) => b.total - a.total);
        const rank = ratings.findIndex((r: any) => r.id === myCadet.id) + 1;
        setGroupRank(rank);
        setGroupTotal(ratings.length);
      }

      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const totalPoints = myScores.reduce((sum: number, s: ScoreRecord) => sum + s.points, 0);
  const maxPossible = categories.reduce((sum: number, c: CategoryConfig) => sum + c.maxPoints, 0);
  const percentage = maxPossible > 0 ? Math.round((totalPoints / maxPossible) * 100) : 0;

  if (loading) {
    return <TableSkeleton rows={6} cols={3} />;
  }

  if (!cadet) {
    return (
      <Card>
        <p className="text-slate-500 text-center py-8">Данные курсанта не найдены</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Мой рейтинг</h1>
        <p className="text-slate-500 text-sm mt-1">{group?.number} • {group?.name}</p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="text-center py-6">
          <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <p className="text-3xl font-bold text-slate-800">{totalPoints}</p>
          <p className="text-sm text-slate-500">Всего баллов</p>
          <p className="text-xs text-slate-400 mt-1">из {maxPossible} возможных</p>
        </Card>

        <Card className="text-center py-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-lg font-bold text-blue-700">{groupRank}</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{groupRank}<span className="text-lg text-slate-400">/{groupTotal}</span></p>
          <p className="text-sm text-slate-500">Место в группе</p>
        </Card>

        <Card className="text-center py-6">
          <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-3xl font-bold text-slate-800">{percentage}%</p>
          <p className="text-sm text-slate-500">Выполнение</p>
          <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full rounded-full ${percentage >= 80 ? 'bg-green-500' : percentage >= 50 ? 'bg-blue-500' : 'bg-amber-500'}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </Card>
      </div>

      {/* Прогресс по категориям */}
      <Card>
        <h3 className="font-semibold text-slate-800 mb-4">Баллы по категориям</h3>
        <div className="space-y-4">
          {categories.map((cat: CategoryConfig) => {
            const earned = myScores
              .filter((s: ScoreRecord) => s.category === cat.id)
              .reduce((sum: number, s: ScoreRecord) => sum + s.points, 0);
            const pct = Math.min((earned / cat.maxPoints) * 100, 100);

            return (
              <div key={cat.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-700 font-medium">{cat.name}</span>
                  <span className="text-slate-500">{earned}/{cat.maxPoints}</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      pct >= 80 ? 'bg-green-500' : pct >= 50 ? 'bg-blue-500' : pct >= 30 ? 'bg-amber-500' : 'bg-red-400'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Детализация баллов */}
      <Card>
        <h3 className="font-semibold text-slate-800 mb-4">Мои баллы ({myScores.length} записей)</h3>
        {myScores.length === 0 ? (
          <p className="text-slate-500 text-center py-4">Пока нет начислений</p>
        ) : (
          <div className="space-y-2">
            {[...myScores].sort((a: ScoreRecord, b: ScoreRecord) => b.date.localeCompare(a.date)).map((score: ScoreRecord) => {
              const cat = categories.find((c: CategoryConfig) => c.id === score.category);
              return (
                <div
                  key={score.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <Calendar size={14} className="text-slate-400" />
                      <span className="text-xs text-slate-400">
                        {new Date(score.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{score.description || 'Без описания'}</p>
                      <Badge>{cat?.name || score.category}</Badge>
                    </div>
                  </div>
                  <span className="font-bold text-green-600">+{score.points}</span>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
