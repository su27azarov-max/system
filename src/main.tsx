import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Глобальная обработка необработанных ошибок
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Инициализация приложения
try {
  const root = document.getElementById("root");
  if (!root) {
    throw new Error('Element with id "root" not found in DOM');
  }

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to initialize app:', error);
  document.body.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:system-ui;">
      <div style="text-align:center;padding:2rem;">
        <h1 style="color:#dc2626;margin-bottom:1rem;">Критическая ошибка</h1>
        <p style="color:#64748b;">Не удалось запустить приложение</p>
        <pre style="text-align:left;background:#f1f5f9;padding:1rem;border-radius:0.5rem;margin-top:1rem;overflow:auto;">${error}</pre>
        <button onclick="localStorage.clear();location.reload()" style="margin-top:1rem;padding:0.5rem 1rem;background:#2563eb;color:white;border:none;border-radius:0.5rem;cursor:pointer;">
          Сбросить и перезагрузить
        </button>
      </div>
    </div>
  `;
}
