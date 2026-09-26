/**
 * GroupPage — рейтинг конкретной группы
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, ArrowLeft } from 'lucide-react';
import { Card, Button, TableSkeleton } from '../../components/ui';
import { RankingTable } from '../../components/RankingTable';
import { AddScoreModal } from '../../components/AddScoreModal';
import { getCadetsByGroup, getGroups, getScores, getCategories, getTotalPoints, getCategoryPoints } from '../../data/store';
import { CadetRating, Group, Cadet } from '../../types';

export function GroupPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<CadetRating[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCadetId, setSelectedCadetId] = useState('');
  const [selectedCadetName, setSelectedCadetName] = useState('');

  const categories = getCategories();
  const group = getGroups().find((g: Group) => g.id === id);

  const loadRatings = () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      const cadets = getCadetsByGroup(id);
      const allRatings: CadetRating[] = cadets.map((cadet: Cadet) => {
        const groupData = getGroups().find((g: Group) => g.id === cadet.groupId);
        if (!groupData) {
          console.warn(`Group not found for cadet: ${cadet.fullName}`);
          return null;
        }
        const scores = getScores().filter((s: any) => s.cadetId === cadet.id);
        const categoryPoints: Record<string, number> = {};
        categories.forEach((cat: any) => {
          categoryPoints[cat.id] = getCategoryPoints(cadet.id, cat.id);
        });
        return {
          cadet,
          group: groupData,
          scores,
          totalPoints: getTotalPoints(cadet.id),
          categoryPoints: categoryPoints as CadetRating['categoryPoints'],
        };
      }).filter((r): r is CadetRating => r !== null);
      setRatings(allRatings);
    } catch (error) {
      console.error('Error loading group ratings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(loadRatings, 400);
    return () => clearTimeout(timer);
  }, [id]);

  const handleAddScore = (cadetId: string, cadetName: string) => {
    setSelectedCadetId(cadetId);
    setSelectedCadetName(cadetName);
    setModalOpen(true);
  };

  const maxPossible = categories.reduce((sum: number, c: any) => sum + c.maxPoints, 0);
  const groupAvg = ratings.length > 0
    ? Math.round(ratings.reduce((s, r) => s + r.totalPoints, 0) / ratings.length)
    : 0;

  if (!group) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Группа не найдена</p>
        <Link to="/dashboard" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
          ← Вернуться к сводке
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="space-y-4"><TableSkeleton rows={8} cols={5} /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
            <ArrowLeft size={14} /> К сводке
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">{group.number}</h1>
          <p className="text-slate-500 text-sm">{group.name}</p>
        </div>
        <Button onClick={() => {
          if (ratings.length > 0) {
            handleAddScore(ratings[0].cadet.id, ratings[0].cadet.fullName);
          }
        }}>
          <Plus size={16} className="mr-1" />
          Добавить балл
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="text-center py-3">
          <p className="text-xl font-bold text-slate-800">{ratings.length}</p>
          <p className="text-xs text-slate-500">Курсантов</p>
        </Card>
        <Card className="text-center py-3">
          <p className="text-xl font-bold text-blue-700">{groupAvg}</p>
          <p className="text-xs text-slate-500">Средний балл</p>
        </Card>
        <Card className="text-center py-3">
          <p className="text-xl font-bold text-green-600">
            {ratings.length > 0 ? Math.max(...ratings.map(r => r.totalPoints)) : 0}
          </p>
          <p className="text-xs text-slate-500">Лучший</p>
        </Card>
        <Card className="text-center py-3">
          <p className="text-xl font-bold text-slate-800">{maxPossible}</p>
          <p className="text-xs text-slate-500">Максимум</p>
        </Card>
      </div>

      <Card padding={false}>
        <div className="p-4">
          <RankingTable ratings={ratings} categories={categories} isTeacher={true} />
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-slate-800 mb-3">Быстрое начисление баллов</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ratings.map(r => (
            <button
              key={r.cadet.id}
              onClick={() => handleAddScore(r.cadet.id, r.cadet.fullName)}
              className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-left"
            >
              <div>
                <p className="font-medium text-sm text-slate-800">{r.cadet.fullName}</p>
                <p className="text-xs text-slate-500">Текущий рейтинг: {r.totalPoints}</p>
              </div>
              <Plus size={16} className="text-blue-500" />
            </button>
          ))}
        </div>
      </Card>

      <AddScoreModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        cadetId={selectedCadetId}
        cadetName={selectedCadetName}
        categories={categories}
        onSuccess={loadRatings}
      />
    </div>
  );
}
