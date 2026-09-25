/**
 * Dashboard — главная страница преподавателя
 * Сводка по группам, топ-10, общий рейтинг
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Trophy, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';
import { Card, TableSkeleton } from '../../components/ui';
import { RankingTable } from '../../components/RankingTable';
import { getCadets, getGroups, getScores, getCategories, getTotalPoints, getCategoryPoints } from '../../data/store';
import { CadetRating, Group, Cadet } from '../../types';

export function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<CadetRating[]>([]);
  const categories = getCategories();
  const groups = getGroups();

  useEffect(() => {
    const timer = setTimeout(() => {
      const cadets = getCadets();
      const allRatings: CadetRating[] = cadets.map((cadet: Cadet) => {
        const group = groups.find((g: Group) => g.id === cadet.groupId)!;
        const scores = getScores().filter((s: any) => s.cadetId === cadet.id);
        const categoryPoints: Record<string, number> = {};
        categories.forEach((cat: any) => {
          categoryPoints[cat.id] = getCategoryPoints(cadet.id, cat.id);
        });
        return {
          cadet,
          group,
          scores,
          totalPoints: getTotalPoints(cadet.id),
          categoryPoints: categoryPoints as CadetRating['categoryPoints'],
        };
      });
      setRatings(allRatings);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const top10 = useMemo(() => {
    return [...ratings]
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, 10);
  }, [ratings]);

  const groupStats = useMemo(() => {
    return groups.map((group: Group) => {
      const groupRatings = ratings.filter(r => r.cadet.groupId === group.id);
      const avgPoints = groupRatings.length > 0
        ? Math.round(groupRatings.reduce((sum: number, r) => sum + r.totalPoints, 0) / groupRatings.length)
        : 0;
      const maxPoints = Math.max(...groupRatings.map(r => r.totalPoints), 0);
      return { ...group, count: groupRatings.length, avgPoints, maxPoints };
    });
  }, [ratings, groups]);

  const maxPossible = categories.reduce((sum: number, c: any) => sum + c.maxPoints, 0);
  const lowPerformers = useMemo(() => {
    return ratings
      .filter(r => r.totalPoints < maxPossible * 0.3)
      .sort((a, b) => a.totalPoints - b.totalPoints);
  }, [ratings, maxPossible]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="h-28">
              <TableSkeleton rows={2} cols={1} />
            </Card>
          ))}
        </div>
        <Card>
          <TableSkeleton rows={8} cols={5} />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Сводка</h1>
        <p className="text-slate-500 text-sm mt-1">Обзор рейтинга курсантов по всем группам</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{ratings.length}</p>
            <p className="text-xs text-slate-500">Курсантов</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-xl">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">
              {ratings.length > 0 ? Math.round(ratings.reduce((s, r) => s + r.totalPoints, 0) / ratings.length) : 0}
            </p>
            <p className="text-xs text-slate-500">Средний балл</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-xl">
            <Trophy className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">
              {ratings.length > 0 ? Math.max(...ratings.map(r => r.totalPoints)) : 0}
            </p>
            <p className="text-xs text-slate-500">Макс. балл</p>
          </div>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Группы</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {groupStats.map((group: any) => (
            <Link key={group.id} to={`/groups/${group.id}`} className="group">
              <Card className="hover:border-blue-300 hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                      {group.number}
                    </h3>
                    <p className="text-sm text-slate-500">{group.name}</p>
                  </div>
                  <ArrowRight className="text-slate-400 group-hover:text-blue-500 transition-colors" size={20} />
                </div>
                <div className="flex gap-6 mt-3 pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-xs text-slate-500">Курсантов</span>
                    <p className="font-bold text-slate-700">{group.count}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">Средний</span>
                    <p className="font-bold text-slate-700">{group.avgPoints}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">Макс.</span>
                    <p className="font-bold text-slate-700">{group.maxPoints}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-3">🏆 Топ-10 курсантов</h2>
        <Card padding={false}>
          <div className="p-4">
            <RankingTable
              ratings={top10}
              categories={categories}
              isTeacher={true}
              showGroup={true}
              groups={groups}
            />
          </div>
        </Card>
      </div>

      {lowPerformers.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={20} />
            Требуют внимания
          </h2>
          <Card>
            <div className="space-y-2">
              {lowPerformers.map(r => (
                <Link
                  key={r.cadet.id}
                  to={`/students/${r.cadet.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-slate-800">{r.cadet.fullName}</p>
                    <p className="text-xs text-slate-500">{r.group.number}</p>
                  </div>
                  <span className="text-red-600 font-bold">{r.totalPoints} баллов</span>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
