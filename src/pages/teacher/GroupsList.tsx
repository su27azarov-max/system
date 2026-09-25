/**
 * GroupsList — список всех групп (для преподавателя)
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, TrendingUp, Trophy } from 'lucide-react';
import { Card, TableSkeleton } from '../../components/ui';
import { getCadetsByGroup, getGroups, getTotalPoints } from '../../data/store';
import { Group, Cadet } from '../../types';

export function GroupsListPage() {
  const [loading, setLoading] = useState(true);
  const [groupData, setGroupData] = useState<any[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const groups = getGroups();
      const data = groups.map((group: Group) => {
        const cadets = getCadetsByGroup(group.id);
        const ratings = cadets.map((c: Cadet) => getTotalPoints(c.id));
        const avg = ratings.length > 0 ? Math.round(ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length) : 0;
        const max = ratings.length > 0 ? Math.max(...ratings) : 0;
        return {
          ...group,
          count: cadets.length,
          avgPoints: avg,
          maxPoints: max,
        };
      });
      setGroupData(data);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <TableSkeleton rows={4} cols={4} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Группы</h1>
        <p className="text-slate-500 text-sm mt-1">Управление группами курсантов</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {groupData.map((group: any) => (
          <Link key={group.id} to={`/groups/${group.id}`} className="group">
            <Card className="hover:border-blue-300 hover:shadow-md transition-all h-full">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                    {group.number}
                  </h3>
                  <p className="text-sm text-slate-500">{group.name}</p>
                </div>
                <ArrowRight className="text-slate-300 group-hover:text-blue-500 transition-colors mt-1" size={24} />
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                <div className="text-center">
                  <Users size={18} className="text-blue-500 mx-auto mb-1" />
                  <p className="text-lg font-bold text-slate-800">{group.count}</p>
                  <p className="text-xs text-slate-500">Курсантов</p>
                </div>
                <div className="text-center">
                  <TrendingUp size={18} className="text-green-500 mx-auto mb-1" />
                  <p className="text-lg font-bold text-slate-800">{group.avgPoints}</p>
                  <p className="text-xs text-slate-500">Средний</p>
                </div>
                <div className="text-center">
                  <Trophy size={18} className="text-amber-500 mx-auto mb-1" />
                  <p className="text-lg font-bold text-slate-800">{group.maxPoints}</p>
                  <p className="text-xs text-slate-500">Лучший</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
