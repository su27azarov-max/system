# 🎖️ RankKursant

Система рейтинга курсантов на React + TypeScript + Tailwind CSS.

## 📋 Функционал

- **Рейтинг взвода** - просмотр рейтинга курсантов в выбранном взводе
- **Рейтинг потока** - общий рейтинг всех курсантов по всем взводам
- **Выбор взвода** через выпадающий список
- **Детализация по категориям**:
  - Оценки на занятии
  - Самостоятельная работа
  - Дополнительные задания
  - Написание статей
- **Статистика**: количество курсантов, средний балл, лучший результат
- **Медали** для топ-3 (🥇🥈🥉)

## 🚀 Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для production
npm run build

# Предпросмотр собранной версии
npm run preview
```

## 📊 Тестовые данные

В приложении уже есть тестовые данные:
- 2 взвода (ВУ-201, ВУ-202)
- 10 курсантов (5 в каждом взводе)
- 55 записей баллов

## 🌐 Деплой на GitHub Pages

### Автоматический деплой через GitHub Actions

Создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Ручной деплой

1. Соберите проект: `npm run build`
2. Загрузите содержимое папки `dist/` в ветку `gh-pages` или в корень репозитория
3. В настройках репозитория (Settings → Pages) выберите:
   - Source: Deploy from a branch
   - Branch: `gh-pages` (или `main`)
   - Folder: `/ (root)`

## 🎨 Технологии

- React 18
- TypeScript 5.6
- Vite 6
- Tailwind CSS 4

## 📁 Структура проекта

```
.
├── index.html              # Точка входа
├── package.json            # Зависимости
├── vite.config.js          # Конфигурация Vite
├── tsconfig.json           # Конфигурация TypeScript
├── src/
│   ├── main.tsx           # Инициализация React
│   ├── App.tsx            # Главный компонент
│   ├── index.css          # Стили Tailwind
│   └── vite-env.d.ts      # Типы Vite
└── dist/                   # Собранная версия (после npm run build)
```

## ✨ Особенности

- ✅ Относительные пути (работает на GitHub Pages)
- ✅ TypeScript для типобезопасности
- ✅ Tailwind CSS для стилизации
- ✅ Адаптивный дизайн
- ✅ Быстрая загрузка (~150 KB)

## 📄 Лицензия

MIT
