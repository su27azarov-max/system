import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Обработка глобальных ошибок
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif;">
      <h1 style="color: red;">Ошибка приложения</h1>
      <pre style="background: #f5f5f5; padding: 10px; overflow: auto;">${event.error}</pre>
    </div>
  `;
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

try {
  const root = document.getElementById('root');
  if (!root) {
    throw new Error('Element with id "root" not found');
  }

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif;">
      <h1 style="color: red;">Критическая ошибка</h1>
      <pre style="background: #f5f5f5; padding: 10px; overflow: auto;">${error}</pre>
    </div>
  `;
}
