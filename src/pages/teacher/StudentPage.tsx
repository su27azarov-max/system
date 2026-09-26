/**
 * StudentPage — карточка курсанта (для преподавателя)
 * Все баллы + форма добавления нового балла
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Calendar } from 'lucide-react';
import { Card, Button, Badge, TableSkeleton, showToast } from '../../components/ui';
import { AddScoreModal } from '../../components/AddScoreModal';
import { getCadetById, getGroups, getScoresByCadet, getCategories, deleteScore } from '../../data/store';
import { Cadet, Group, ScoreRecord, CategoryConfig } from '../../types';

export function StudentPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [cadet, setCadet] = useState<Cadet | null>(null);
  const [group, setGroup] = useState<Group | null>(null);
  const [scores, setScores] = useState<ScoreRecord[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const categories = getCategories();

  const loadData = () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      const c = getCadetById(id);
      if (c) {
        setCadet(c);
        const g = getGroups().find((gr: Group) => gr.id === c.groupId);
        setGroup(g || null);
        setScores(getScoresByCadet(id));
      }
    } catch (error) {
      console.error('Error loading student data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(loadData, 300);
    return () => clearTimeout(timer);
  }, [id]);

  const handleDeleteScore = (scoreId: string) => {
    if (confirm('Удалить эту запись?')) {
      deleteScore(scoreId);
      setScores(prev => prev.filter(s => s.id !== scoreId));
      showToast('Запись удалена', 'info');
    }
  };

  const totalPoints = scores.reduce((sum: number, s: ScoreRecord) => sum + s.points, 0);
  const maxPossible = categories.reduce((sum: number, c: CategoryConfig) => sum + c.maxPoints, 0);

  // Баллы по категориям
  const categoryBreakdown = categories.map((cat: CategoryConfig) => ({
    ...cat,
    earned: scores.filter((s: ScoreRecord) => s.category === cat.id).reduce((sum: number, s: ScoreRecord) => sum + s.points, 0),
  }));

  if (loading) {
    return <TableSkeleton rows={6} cols={4} />;
  }

  if (!cadet) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Курсант не найден</p>
        <Link to="/dashboard" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
          ← Вернуться к сводке
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <Link to={group ? `/groups/${group.id}` : '/dashboard'} className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft size={14} /> Назад
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{cadet.fullName}</h1>
            <p className="text-slate-500 text-sm">{group?.number} • {group?.name}</p>
          </div>
          <Button onClick={() => setModalOpen(true)}>
            <Plus size={16} className="mr-1" />
            Добавить балл
          </Button>
        </div>
      </div>

      {/* Общий балл */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="text-center py-4">
          <p className="text-3xl font-bold text-blue-700">{totalPoints}</p>
          <p className="text-xs text-slate-500">Всего баллов</p>
          <p className="text-xs text-slate-400">из {maxPossible}</p>
        </Card>
        {categoryBreakdown.map((cat: any) => (
          <Card key={cat.id} className="text-center py-4">
            <p className="text-2xl font-bold text-slate-800">{cat.earned}</p>
            <p className="text-xs text-slate-500 truncate">{cat.name}</p>
            <p className="text-xs text-slate-400">из {cat.maxPoints}</p>
          </Card>
        ))}
      </div>

      {/* Прогресс-бары по категориям */}
      <Card>
        <h3 className="font-semibold text-slate-800 mb-4">Прогресс по категориям</h3>
        <div className="space-y-4">
          {categoryBreakdown.map((cat: any) => {
            const percentage = Math.min((cat.earned / cat.maxPoints) * 100, 100);
            return (
              <div key={cat.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-700 font-medium">{cat.name}</span>
                  <span className="text-slate-500">{cat.earned}/{cat.maxPoints}</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      percentage >= 80 ? 'bg-green-500' : percentage >= 50 ? 'bg-blue-500' : percentage >= 30 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* История баллов */}
      <Card>
        <h3 className="font-semibold text-slate-800 mb-4">История начислений ({scores.length})</h3>
        {scores.length === 0 ? (
          <p className="text-slate-500 text-center py-4">Нет записей</p>
        ) : (
          <div className="space-y-2">
            {[...scores].sort((a: ScoreRecord, b: ScoreRecord) => b.date.localeCompare(a.date)).map((score: ScoreRecord) => {
              const cat = categories.find((c: CategoryConfig) => c.id === score.category);
              return (
                <div
                  key={score.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <Calendar size={14} className="text-slate-400" />
                      <span className="text-xs text-slate-400">{new Date(score.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{score.description || 'Без описания'}</p>
                      <Badge>{cat?.name || score.category}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">+{score.points}</span>
                    <button
                      onClick={() => handleDeleteScore(score.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                      title="Удалить"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <AddScoreModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        cadetId={cadet.id}
        cadetName={cadet.fullName}
        categories={categories}
        onSuccess={loadData}
      />
    </div>
  );
}
