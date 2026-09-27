import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Обработка ошибок
window.addEventListener('error', (event) => {
  console.error('Глобальная ошибка:', event.error)
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif;">
      <h1 style="color: red;">Ошибка приложения</h1>
      <pre style="background: #f5f5f5; padding: 10px; overflow: auto;">${event.error}</pre>
    </div>
  `
})

try {
  const root = document.getElementById('root')
  if (!root) {
    throw new Error('Элемент с id="root" не найден')
  }

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  
  console.log('✅ Приложение успешно запущено')
} catch (error) {
  console.error('❌ Ошибка запуска:', error)
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif;">
      <h1 style="color: red;">Критическая ошибка</h1>
      <pre style="background: #f5f5f5; padding: 10px; overflow: auto;">${error}</pre>
    </div>
  `
}
