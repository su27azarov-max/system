import { useState } from 'react';
import { 
  groups, 
  cadets, 
  categories, 
  getCadetTotalPoints, 
  getCadetCategoryPoints,
  getCadetsByGroup,
  getGroupById
} from './data/database';

type View = 'platoon' | 'stream';

interface CadetRating {
  id: string;
  fullName: string;
  groupId: string;
  totalPoints: number;
  categoryPoints: Record<string, number>;
}

function App() {
  const [currentView, setCurrentView] = useState<View>('platoon');
  const [selectedGroupId, setSelectedGroupId] = useState<string>('group-1');

  // Получить рейтинг для взвода
  const getPlatoonRating = (): CadetRating[] => {
    const groupCadets = getCadetsByGroup(selectedGroupId);
    return groupCadets
      .map(cadet => ({
        id: cadet.id,
        fullName: cadet.fullName,
        groupId: cadet.groupId,
        totalPoints: getCadetTotalPoints(cadet.id),
        categoryPoints: categories.reduce((acc, cat) => {
          acc[cat.id] = getCadetCategoryPoints(cadet.id, cat.id);
          return acc;
        }, {} as Record<string, number>)
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints);
  };

  // Получить рейтинг для потока (все группы)
  const getStreamRating = (): CadetRating[] => {
    return cadets
      .map(cadet => ({
        id: cadet.id,
        fullName: cadet.fullName,
        groupId: cadet.groupId,
        totalPoints: getCadetTotalPoints(cadet.id),
        categoryPoints: categories.reduce((acc, cat) => {
          acc[cat.id] = getCadetCategoryPoints(cadet.id, cat.id);
          return acc;
        }, {} as Record<string, number>)
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints);
  };

  const rating = currentView === 'platoon' ? getPlatoonRating() : getStreamRating();
  const maxTotalPoints = categories.reduce((sum, cat) => sum + cat.maxPoints, 0);

  const getRankBadge = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
  };

  const getProgressColor = (points: number, max: number) => {
    const percent = (points / max) * 100;
    if (percent >= 80) return 'bg-green-500';
    if (percent >= 50) return 'bg-blue-500';
    if (percent >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">🎖️ RankKursant</h1>
          <p className="text-slate-300 mt-1">Система рейтинга курсантов</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentView('platoon')}
              className={`px-6 py-4 font-medium transition-colors ${
                currentView === 'platoon'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Рейтинг взвода
            </button>
            <button
              onClick={() => setCurrentView('stream')}
              className={`px-6 py-4 font-medium transition-colors ${
                currentView === 'stream'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Рейтинг потока
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Group Selector (only for platoon view) */}
        {currentView === 'platoon' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Выберите взвод:
            </label>
            <select
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {groups.map(group => (
                <option key={group.id} value={group.id}>
                  {group.number} - {group.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">
              {currentView === 'platoon' ? 'Курсантов во взводе' : 'Всего курсантов'}
            </div>
            <div className="text-3xl font-bold text-gray-900">{rating.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Средний балл</div>
            <div className="text-3xl font-bold text-gray-900">
              {rating.length > 0 
                ? Math.round(rating.reduce((sum, r) => sum + r.totalPoints, 0) / rating.length)
                : 0}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Максимум баллов</div>
            <div className="text-3xl font-bold text-gray-900">{maxTotalPoints}</div>
          </div>
        </div>

        {/* Rating Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {currentView === 'platoon' 
                ? `Рейтинг взвода ${getGroupById(selectedGroupId)?.number}`
                : 'Рейтинг потока (все взводы)'}
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Место
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ФИО
                  </th>
                  {currentView === 'stream' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Взвод
                    </th>
                  )}
                  {categories.map(cat => (
                    <th key={cat.id} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {cat.name}
                      <div className="text-xs text-gray-400 font-normal normal-case">
                        макс. {cat.maxPoints}
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Итого
                    <div className="text-xs text-gray-400 font-normal normal-case">
                      из {maxTotalPoints}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rating.map((cadetRating, index) => (
                  <tr key={cadetRating.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-2xl">{getRankBadge(index)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {cadetRating.fullName}
                      </div>
                    </td>
                    {currentView === 'stream' && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {getGroupById(cadetRating.groupId)?.number}
                        </div>
                      </td>
                    )}
                    {categories.map(cat => {
                      const points = cadetRating.categoryPoints[cat.id];
                      return (
                        <td key={cat.id} className="px-4 py-4 whitespace-nowrap text-center">
                          <div className="text-sm font-medium text-gray-900">{points}</div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div
                              className={`h-1.5 rounded-full ${getProgressColor(points, cat.maxPoints)}`}
                              style={{ width: `${Math.min((points / cat.maxPoints) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </td>
                      );
                    })}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {cadetRating.totalPoints}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(cadetRating.totalPoints, maxTotalPoints)}`}
                          style={{ width: `${Math.min((cadetRating.totalPoints / maxTotalPoints) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
