/**
 * RankingTable — таблица рейтинга курсантов
 * Поддерживает: сортировку, цветовую индикацию топ-3, фильтрацию
 */

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CadetRating, SortConfig, ScoreCategory, CategoryConfig } from '../types';
import { Badge } from './ui';
import { ChevronUp, ChevronDown, Search, Filter } from 'lucide-react';

interface RankingTableProps {
  ratings: CadetRating[];
  categories: CategoryConfig[];
  isTeacher: boolean;
  showGroup?: boolean; // Показывать колонку группы
  groupFilter?: string;
  onGroupFilterChange?: (groupId: string) => void;
  groups?: { id: string; name: string; number: string }[];
}

export function RankingTable({
  ratings,
  categories,
  isTeacher,
  showGroup = false,
  groupFilter = '',
  onGroupFilterChange,
  groups = [],
}: RankingTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'total', direction: 'desc' });
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Фильтрация по поиску и группе
  const filteredRatings = useMemo(() => {
    let result = [...ratings];
    
    // Поиск по ФИО
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(r => r.cadet.fullName.toLowerCase().includes(query));
    }

    // Фильтр по группе
    if (groupFilter) {
      result = result.filter(r => r.cadet.groupId === groupFilter);
    }

    return result;
  }, [ratings, searchQuery, groupFilter]);

  // Сортировка
  const sortedRatings = useMemo(() => {
    const sorted = [...filteredRatings];
    sorted.sort((a, b) => {
      let aVal: number, bVal: number;

      if (sortConfig.key === 'total') {
        aVal = a.totalPoints;
        bVal = b.totalPoints;
      } else if (sortConfig.key === 'name') {
        return sortConfig.direction === 'asc'
          ? a.cadet.fullName.localeCompare(b.cadet.fullName)
          : b.cadet.fullName.localeCompare(a.cadet.fullName);
      } else {
        // Сортировка по категории
        aVal = a.categoryPoints[sortConfig.key as ScoreCategory] || 0;
        bVal = b.categoryPoints[sortConfig.key as ScoreCategory] || 0;
      }

      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return sorted;
  }, [filteredRatings, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  const getRankBadge = (index: number) => {
    if (index === 0) return <Badge variant="gold">🥇 1</Badge>;
    if (index === 1) return <Badge variant="silver">🥈 2</Badge>;
    if (index === 2) return <Badge variant="bronze">🥉 3</Badge>;
    return <span className="text-slate-500 text-sm">{index + 1}</span>;
  };

  // Определяем, является ли курсант отстающим (менее 30% от максимума)
  const maxPossible = categories.reduce((sum, c) => sum + c.maxPoints, 0);
  const isLowPerformer = (total: number) => total < maxPossible * 0.3;

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortConfig.key !== columnKey) return <ChevronDown size={14} className="text-slate-300" />;
    return sortConfig.direction === 'asc' 
      ? <ChevronUp size={14} className="text-blue-600" />
      : <ChevronDown size={14} className="text-blue-600" />;
  };

  return (
    <div>
      {/* Панель фильтров */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск по ФИО..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {onGroupFilterChange && groups.length > 0 && (
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={groupFilter}
              onChange={(e) => onGroupFilterChange(e.target.value)}
              className="pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Все группы</option>
              {groups.map(g => (
                <option key={g.id} value={g.id}>{g.number}</option>
              ))}
            </select>
          </div>
        )}

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">Все категории</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Таблица */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 text-left font-semibold text-slate-600 w-12">#</th>
              <th 
                className="px-4 py-3 text-left font-semibold text-slate-600 cursor-pointer hover:text-slate-800"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  ФИО <SortIcon columnKey="name" />
                </div>
              </th>
              {showGroup && (
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Группа</th>
              )}
              {categories.map(cat => (
                <th
                  key={cat.id}
                  className="px-3 py-3 text-center font-semibold text-slate-600 cursor-pointer hover:text-slate-800 hidden md:table-cell"
                  onClick={() => handleSort(cat.id)}
                  title={`${cat.name} (макс. ${cat.maxPoints})`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span className="truncate max-w-[80px]">{cat.name.split(' ')[0]}</span>
                    <SortIcon columnKey={cat.id} />
                  </div>
                </th>
              ))}
              <th 
                className="px-4 py-3 text-center font-semibold text-slate-600 cursor-pointer hover:text-slate-800"
                onClick={() => handleSort('total')}
              >
                <div className="flex items-center justify-center gap-1">
                  Итого <SortIcon columnKey="total" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedRatings.map((rating, index) => {
              const isLow = isLowPerformer(rating.totalPoints);
              const rowBg = isLow ? 'bg-red-50/50' : index < 3 ? 'bg-amber-50/30' : '';
              
              return (
                <tr
                  key={rating.cadet.id}
                  className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${rowBg}`}
                >
                  <td className="px-4 py-3">
                    {getRankBadge(index)}
                  </td>
                  <td className="px-4 py-3">
                    {isTeacher ? (
                      <Link
                        to={`/students/${rating.cadet.id}`}
                        className="font-medium text-slate-800 hover:text-blue-600 transition-colors"
                      >
                        {rating.cadet.fullName}
                      </Link>
                    ) : (
                      <span className="font-medium text-slate-800">{rating.cadet.fullName}</span>
                    )}
                  </td>
                  {showGroup && (
                    <td className="px-4 py-3 text-slate-600">
                      {rating.group.number}
                    </td>
                  )}
                  {categories.map(cat => (
                    <td key={cat.id} className="px-3 py-3 text-center text-slate-600 hidden md:table-cell">
                      <span className={rating.categoryPoints[cat.id] >= cat.maxPoints * 0.8 ? 'text-green-600 font-medium' : ''}>
                        {rating.categoryPoints[cat.id]}
                      </span>
                      <span className="text-slate-400 text-xs">/{cat.maxPoints}</span>
                    </td>
                  ))}
                  <td className="px-4 py-3 text-center">
                    <span className={`font-bold text-base ${isLow ? 'text-red-600' : 'text-slate-800'}`}>
                      {rating.totalPoints}
                    </span>
                    <span className="text-slate-400 text-xs ml-1">/{maxPossible}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {sortedRatings.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          Курсанты не найдены
        </div>
      )}
    </div>
  );
}
