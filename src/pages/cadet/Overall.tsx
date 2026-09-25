/**
 * Overall — общий рейтинг по всем группам
 * Курсант видит только ФИО + сумма баллов (без детализации)
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Trophy, Medal, Search } from 'lucide-react';
import { Card, Badge, TableSkeleton } from '../../components/ui';
import { getCadets, getGroups, getTotalPoints } from '../../data/store';
import { Cadet, Group } from '../../types';

interface OverallEntry {
  rank: number;
  fullName: string;
  groupNumber: string;
  totalPoints: number;
}

export function OverallPage() {
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<OverallEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      const cadets = getCadets();
      const groups = getGroups();

      const allEntries: OverallEntry[] = cadets
        .map((cadet: Cadet) => {
          const group = groups.find((g: Group) => g.id === cadet.groupId);
          return {
            rank: 0,
            fullName: cadet.fullName,
            groupNumber: group?.number || '',
            totalPoints: getTotalPoints(cadet.id),
          };
        })
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .map((entry, index) => ({ ...entry, rank: index + 1 }));

      setEntries(allEntries);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const filteredEntries = useMemo(() => {
    if (!searchQuery) return entries;
    const query = searchQuery.toLowerCase();
    return entries.filter(e => e.fullName.toLowerCase().includes(query));
  }, [entries, searchQuery]);

  const getRankDisplay = (rank: number) => {
    if (rank === 1) return <Badge variant="gold">🥇 1</Badge>;
    if (rank === 2) return <Badge variant="silver">🥈 2</Badge>;
    if (rank === 3) return <Badge variant="bronze">🥉 3</Badge>;
    return <span className="text-slate-500 text-sm font-medium">{rank}</span>;
  };

  if (loading) {
    return <TableSkeleton rows={10} cols={3} />;
  }

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Общий рейтинг</h1>
        <p className="text-slate-500 text-sm mt-1">Рейтинг курсантов по всем группам</p>
      </div>

      {/* Топ-3 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {entries.slice(0, 3).map((entry, index) => (
          <Card key={entry.rank} className={`text-center py-6 ${index === 0 ? 'ring-2 ring-amber-300 bg-amber-50' : ''}`}>
            {index === 0 ? (
              <Trophy className="w-10 h-10 text-amber-500 mx-auto mb-2" />
            ) : (
              <Medal className={`w-8 h-8 mx-auto mb-2 ${index === 1 ? 'text-slate-400' : 'text-orange-400'}`} />
            )}
            <p className="font-bold text-slate-800 text-lg">{entry.totalPoints}</p>
            <p className="text-sm text-slate-600 mt-1">{entry.fullName}</p>
            <p className="text-xs text-slate-400">{entry.groupNumber}</p>
          </Card>
        ))}
      </div>

      {/* Поиск */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Поиск по ФИО..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Таблица общего рейтинга */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left font-semibold text-slate-600 w-16">Место</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">ФИО</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Группа</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-600">Баллы</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => (
                <tr
                  key={entry.rank}
                  className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                    entry.rank <= 3 ? 'bg-amber-50/30' : ''
                  }`}
                >
                  <td className="px-4 py-3">{getRankDisplay(entry.rank)}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{entry.fullName}</td>
                  <td className="px-4 py-3 text-slate-600">{entry.groupNumber}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-bold text-slate-800">{entry.totalPoints}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredEntries.length === 0 && (
        <Card>
          <p className="text-slate-500 text-center py-4">Курсанты не найдены</p>
        </Card>
      )}
    </div>
  );
}
