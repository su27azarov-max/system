import { useState } from 'react';
import { groups, cadets, categories, getCadetTotalPoints, getCadetCategoryPoints, getCadetsByGroup, getGroupById } from './data/database';

function App() {
  const [currentView, setCurrentView] = useState('platoon');
  const [selectedGroupId, setSelectedGroupId] = useState('group-1');

  const getRating = () => {
    const cadetsList = currentView === 'platoon' ? getCadetsByGroup(selectedGroupId) : cadets;
    return cadetsList
      .map(cadet => ({
        ...cadet,
        totalPoints: getCadetTotalPoints(cadet.id),
        categoryPoints: categories.reduce((acc: Record<string, number>, cat) => {
          acc[cat.id] = getCadetCategoryPoints(cadet.id, cat.id);
          return acc;
        }, {})
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints);
  };

  const rating = getRating();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <header style={{ backgroundColor: '#0f172a', color: 'white', padding: '1.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>🎖️ RankKursant</h1>
        <p style={{ color: '#cbd5e1', marginTop: '0.25rem' }}>Система рейтинга курсантов</p>
      </header>

      <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', maxWidth: '80rem', margin: '0 auto' }}>
          <button
            onClick={() => setCurrentView('platoon')}
            style={{
              padding: '0.5rem 1.5rem',
              fontWeight: '500',
              color: currentView === 'platoon' ? '#2563eb' : '#4b5563',
              borderBottom: currentView === 'platoon' ? '2px solid #2563eb' : 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Рейтинг взвода
          </button>
          <button
            onClick={() => setCurrentView('stream')}
            style={{
              padding: '0.5rem 1.5rem',
              fontWeight: '500',
              color: currentView === 'stream' ? '#2563eb' : '#4b5563',
              borderBottom: currentView === 'stream' ? '2px solid #2563eb' : 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Рейтинг потока
          </button>
        </div>
      </nav>

      <main style={{ maxWidth: '80rem', margin: '0 auto', padding: '2rem 1rem' }}>
        {currentView === 'platoon' && (
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              Выберите взвод:
            </label>
            <select
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem'
              }}
            >
              {groups.map(group => (
                <option key={group.id} value={group.id}>
                  {group.number} - {group.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>
              {currentView === 'platoon' ? 'Курсантов во взводе' : 'Всего курсантов'}
            </div>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>{rating.length}</div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Средний балл</div>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>
              {rating.length > 0 ? Math.round(rating.reduce((sum, r) => sum + r.totalPoints, 0) / rating.length) : 0}
            </div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Лучший результат</div>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>
              {rating.length > 0 ? Math.max(...rating.map(r => r.totalPoints)) : 0}
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>
              {currentView === 'platoon' 
                ? `Рейтинг взвода ${getGroupById(selectedGroupId)?.number}`
                : 'Рейтинг потока (все взводы)'}
            </h2>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%' }}>
              <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <tr>
                  <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Место</th>
                  <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>ФИО</th>
                  {currentView === 'stream' && (
                    <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Взвод</th>
                  )}
                  {categories.map(cat => (
                    <th key={cat.id} style={{ padding: '0.75rem 1rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                      {cat.name}
                    </th>
                  ))}
                  <th style={{ padding: '0.75rem 1.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Итого</th>
                </tr>
              </thead>
              <tbody>
                {rating.map((cadetRating, index) => (
                  <tr key={cadetRating.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '1.5rem' }}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>{cadetRating.fullName}</div>
                    </td>
                    {currentView === 'stream' && (
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>{getGroupById(cadetRating.groupId)?.number}</div>
                      </td>
                    )}
                    {categories.map(cat => (
                      <td key={cat.id} style={{ padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827' }}>{cadetRating.categoryPoints[cat.id]}</div>
                      </td>
                    ))}
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>{cadetRating.totalPoints}</div>
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
