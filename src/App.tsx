import { useState } from 'react';

// Типы данных
interface Group {
  id: string;
  name: string;
  number: string;
}

interface Category {
  id: string;
  name: string;
}

interface Cadet {
  id: string;
  fullName: string;
  groupId: string;
}

interface Score {
  cadetId: string;
  category: string;
  points: number;
}

// База данных
const groups: Group[] = [
  { id: 'group-1', name: 'Взвод учебный 201', number: 'ВУ-201' },
  { id: 'group-2', name: 'Взвод учебный 202', number: 'ВУ-202' }
];

const categories: Category[] = [
  { id: 'classroom', name: 'Оценки на занятии' },
  { id: 'independent', name: 'Самостоятельная работа' },
  { id: 'additional', name: 'Дополнительные задания' },
  { id: 'articles', name: 'Написание статей' }
];

const cadets: Cadet[] = [
  { id: 'cadet-1', fullName: 'Петров Алексей Иванович', groupId: 'group-1' },
  { id: 'cadet-2', fullName: 'Сидоров Дмитрий Николаевич', groupId: 'group-1' },
  { id: 'cadet-3', fullName: 'Козлов Михаил Андреевич', groupId: 'group-1' },
  { id: 'cadet-4', fullName: 'Новиков Артём Владимирович', groupId: 'group-1' },
  { id: 'cadet-5', fullName: 'Морозов Виктор Сергеевич', groupId: 'group-1' },
  { id: 'cadet-6', fullName: 'Волков Роман Дмитриевич', groupId: 'group-2' },
  { id: 'cadet-7', fullName: 'Соколов Никита Олегович', groupId: 'group-2' },
  { id: 'cadet-8', fullName: 'Лебедев Кирилл Александрович', groupId: 'group-2' },
  { id: 'cadet-9', fullName: 'Семёнов Егор Павлович', groupId: 'group-2' },
  { id: 'cadet-10', fullName: 'Егоров Даниил Игоревич', groupId: 'group-2' }
];

const scores: Score[] = [
  { cadetId: 'cadet-1', category: 'classroom', points: 10 },
  { cadetId: 'cadet-1', category: 'classroom', points: 8 },
  { cadetId: 'cadet-1', category: 'independent', points: 10 },
  { cadetId: 'cadet-1', category: 'additional', points: 5 },
  { cadetId: 'cadet-1', category: 'articles', points: 10 },
  { cadetId: 'cadet-1', category: 'classroom', points: 9 },
  { cadetId: 'cadet-1', category: 'independent', points: 8 },
  { cadetId: 'cadet-2', category: 'classroom', points: 7 },
  { cadetId: 'cadet-2', category: 'independent', points: 6 },
  { cadetId: 'cadet-2', category: 'classroom', points: 8 },
  { cadetId: 'cadet-2', category: 'additional', points: 3 },
  { cadetId: 'cadet-2', category: 'independent', points: 7 },
  { cadetId: 'cadet-3', category: 'classroom', points: 5 },
  { cadetId: 'cadet-3', category: 'independent', points: 4 },
  { cadetId: 'cadet-3', category: 'classroom', points: 6 },
  { cadetId: 'cadet-3', category: 'independent', points: 5 },
  { cadetId: 'cadet-3', category: 'additional', points: 2 },
  { cadetId: 'cadet-4', category: 'classroom', points: 3 },
  { cadetId: 'cadet-4', category: 'independent', points: 2 },
  { cadetId: 'cadet-4', category: 'classroom', points: 4 },
  { cadetId: 'cadet-4', category: 'independent', points: 3 },
  { cadetId: 'cadet-5', category: 'classroom', points: 8 },
  { cadetId: 'cadet-5', category: 'independent', points: 7 },
  { cadetId: 'cadet-5', category: 'additional', points: 5 },
  { cadetId: 'cadet-5', category: 'classroom', points: 7 },
  { cadetId: 'cadet-5', category: 'articles', points: 5 },
  { cadetId: 'cadet-5', category: 'independent', points: 6 },
  { cadetId: 'cadet-6', category: 'classroom', points: 10 },
  { cadetId: 'cadet-6', category: 'classroom', points: 9 },
  { cadetId: 'cadet-6', category: 'independent', points: 10 },
  { cadetId: 'cadet-6', category: 'additional', points: 7 },
  { cadetId: 'cadet-6', category: 'articles', points: 12 },
  { cadetId: 'cadet-6', category: 'classroom', points: 8 },
  { cadetId: 'cadet-6', category: 'independent', points: 9 },
  { cadetId: 'cadet-7', category: 'classroom', points: 7 },
  { cadetId: 'cadet-7', category: 'independent', points: 8 },
  { cadetId: 'cadet-7', category: 'classroom', points: 6 },
  { cadetId: 'cadet-7', category: 'additional', points: 4 },
  { cadetId: 'cadet-7', category: 'independent', points: 7 },
  { cadetId: 'cadet-7', category: 'articles', points: 5 },
  { cadetId: 'cadet-8', category: 'classroom', points: 6 },
  { cadetId: 'cadet-8', category: 'independent', points: 5 },
  { cadetId: 'cadet-8', category: 'classroom', points: 7 },
  { cadetId: 'cadet-8', category: 'independent', points: 6 },
  { cadetId: 'cadet-8', category: 'additional', points: 3 },
  { cadetId: 'cadet-9', category: 'classroom', points: 3 },
  { cadetId: 'cadet-9', category: 'independent', points: 2 },
  { cadetId: 'cadet-9', category: 'classroom', points: 4 },
  { cadetId: 'cadet-9', category: 'independent', points: 3 },
  { cadetId: 'cadet-10', category: 'classroom', points: 8 },
  { cadetId: 'cadet-10', category: 'independent', points: 7 },
  { cadetId: 'cadet-10', category: 'additional', points: 6 },
  { cadetId: 'cadet-10', category: 'classroom', points: 9 },
  { cadetId: 'cadet-10', category: 'independent', points: 8 },
  { cadetId: 'cadet-10', category: 'articles', points: 7 }
];

// Вспомогательные функции
const getCadetTotalPoints = (cadetId: string): number => {
  return scores
    .filter(s => s.cadetId === cadetId)
    .reduce((sum, s) => sum + s.points, 0);
};

const getCadetCategoryPoints = (cadetId: string, categoryId: string): number => {
  return scores
    .filter(s => s.cadetId === cadetId && s.category === categoryId)
    .reduce((sum, s) => sum + s.points, 0);
};

interface CadetRating extends Cadet {
  totalPoints: number;
  categoryPoints: Record<string, number>;
}

export default function App() {
  const [currentView, setCurrentView] = useState<'platoon' | 'stream'>('platoon');
  const [selectedGroupId, setSelectedGroupId] = useState<string>('group-1');

  const cadetsList = currentView === 'platoon' 
    ? cadets.filter(c => c.groupId === selectedGroupId)
    : cadets;

  const rating: CadetRating[] = cadetsList
    .map(cadet => ({
      ...cadet,
      totalPoints: getCadetTotalPoints(cadet.id),
      categoryPoints: categories.reduce((acc, cat) => {
        acc[cat.id] = getCadetCategoryPoints(cadet.id, cat.id);
        return acc;
      }, {} as Record<string, number>)
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints);

  const avg = rating.length > 0 
    ? Math.round(rating.reduce((sum, r) => sum + r.totalPoints, 0) / rating.length)
    : 0;

  const max = rating.length > 0 ? Math.max(...rating.map(r => r.totalPoints)) : 0;

  const group = groups.find(g => g.id === selectedGroupId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-slate-900 text-white py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">🎖️ RankKursant</h1>
          <p className="text-slate-300 mt-1">Система рейтинга курсантов</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex gap-4">
          <button
            onClick={() => setCurrentView('platoon')}
            className={`px-6 py-2 font-medium border-b-2 transition-colors ${
              currentView === 'platoon'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent hover:text-blue-600'
            }`}
          >
            Рейтинг взвода
          </button>
          <button
            onClick={() => setCurrentView('stream')}
            className={`px-6 py-2 font-medium border-b-2 transition-colors ${
              currentView === 'stream'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent hover:text-blue-600'
            }`}
          >
            Рейтинг потока
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Group Selector */}
        {currentView === 'platoon' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Выберите взвод:
            </label>
            <select
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {groups.map(g => (
                <option key={g.id} value={g.id}>{g.number} - {g.name}</option>
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
            <div className="text-3xl font-bold text-gray-900">{avg}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Лучший результат</div>
            <div className="text-3xl font-bold text-gray-900">{max}</div>
          </div>
        </div>

        {/* Rating Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {currentView === 'platoon' 
                ? `Рейтинг взвода ${group?.number}`
                : 'Рейтинг потока (все взводы)'}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Место</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ФИО</th>
                  {currentView === 'stream' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Взвод</th>
                  )}
                  {categories.map(cat => (
                    <th key={cat.id} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {cat.name}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Итого</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rating.map((cadetRating, index) => (
                  <tr key={cadetRating.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-2xl">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{cadetRating.fullName}</div>
                    </td>
                    {currentView === 'stream' && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {groups.find(g => g.id === cadetRating.groupId)?.number}
                        </div>
                      </td>
                    )}
                    {categories.map(cat => (
                      <td key={cat.id} className="px-4 py-4 whitespace-nowrap text-center">
                        <div className="text-lg font-bold text-gray-900">
                          {cadetRating.categoryPoints[cat.id]}
                        </div>
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-2xl font-bold text-blue-600">{cadetRating.totalPoints}</div>
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
