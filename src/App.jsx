import React, { useState } from 'react'

// База данных
const groups = [
  { id: 'group-1', name: 'Взвод учебный 201', number: 'ВУ-201' },
  { id: 'group-2', name: 'Взвод учебный 202', number: 'ВУ-202' }
]

const categories = [
  { id: 'classroom', name: 'Оценки на занятии' },
  { id: 'independent', name: 'Самостоятельная работа' },
  { id: 'additional', name: 'Дополнительные задания' },
  { id: 'articles', name: 'Написание статей' }
]

const cadets = [
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
]

const scores = [
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
]

function App() {
  const [currentView, setCurrentView] = useState('platoon')
  const [selectedGroupId, setSelectedGroupId] = useState('group-1')

  const getCadetTotalPoints = (cadetId) => {
    return scores.filter(s => s.cadetId === cadetId).reduce((sum, s) => sum + s.points, 0)
  }

  const getCadetCategoryPoints = (cadetId, categoryId) => {
    return scores.filter(s => s.cadetId === cadetId && s.category === categoryId).reduce((sum, s) => sum + s.points, 0)
  }

  const cadetsList = currentView === 'platoon' 
    ? cadets.filter(c => c.groupId === selectedGroupId)
    : cadets

  const rating = cadetsList
    .map(cadet => ({
      ...cadet,
      totalPoints: getCadetTotalPoints(cadet.id),
      categoryPoints: categories.reduce((acc, cat) => {
        acc[cat.id] = getCadetCategoryPoints(cadet.id, cat.id)
        return acc
      }, {})
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints)

  const avg = rating.length > 0 
    ? Math.round(rating.reduce((sum, r) => sum + r.totalPoints, 0) / rating.length)
    : 0

  const max = rating.length > 0 ? Math.max(...rating.map(r => r.totalPoints)) : 0

  const group = groups.find(g => g.id === selectedGroupId)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <header style={{ backgroundColor: '#0f172a', color: 'white', padding: '1.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', margin: 0 }}>🎖️ RankKursant</h1>
        <p style={{ color: '#cbd5e1', marginTop: '0.25rem' }}>Система рейтинга курсантов</p>
      </header>

      <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '1rem' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => setCurrentView('platoon')}
            style={{
              padding: '0.5rem 1.5rem',
              fontWeight: '500',
              background: 'none',
              border: 'none',
              borderBottom: currentView === 'platoon' ? '2px solid #2563eb' : '2px solid transparent',
              color: currentView === 'platoon' ? '#2563eb' : '#4b5563',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Рейтинг взвода
          </button>
          <button
            onClick={() => setCurrentView('stream')}
            style={{
              padding: '0.5rem 1.5rem',
              fontWeight: '500',
              background: 'none',
              border: 'none',
              borderBottom: currentView === 'stream' ? '2px solid #2563eb' : '2px solid transparent',
              color: currentView === 'stream' ? '#2563eb' : '#4b5563',
              cursor: 'pointer',
              fontSize: '1rem'
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
              style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
            >
              {groups.map(g => (
                <option key={g.id} value={g.id}>{g.number} - {g.name}</option>
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
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>{avg}</div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Лучший результат</div>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>{max}</div>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', margin: 0 }}>
              {currentView === 'platoon' ? `Рейтинг взвода ${group.number}` : 'Рейтинг потока (все взводы)'}
            </h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <tr>
                  <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Место</th>
                  <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>ФИО</th>
                  {currentView === 'stream' && (
                    <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Взвод</th>
                  )}
                  {categories.map(cat => (
                    <th key={cat.id} style={{ padding: '0.75rem 1rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>{cat.name}</th>
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
                        <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>{groups.find(g => g.id === cadetRating.groupId)?.number}</div>
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
  )
}

export default App
