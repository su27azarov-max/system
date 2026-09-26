# 🎖️ RankKursant

Простая система рейтинга курсантов на React + Vite.

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

## 🚀 Локальный запуск

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для production
npm run build
```

## 📊 Данные

В приложении уже есть тестовые данные:
- 2 взвода (ВУ-201, ВУ-202)
- 10 курсантов (5 в каждом взводе)
- 55 записей баллов

## 🌐 Деплой на GitHub Pages

### Способ 1: Автоматический деплой через GitHub Actions

1. Создайте файл `.github/workflows/deploy.yml`:

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

2. Запушьте изменения в ветку `main`
3. Через 1-2 минуты сайт будет доступен

### Способ 2: Ручной деплой

1. Соберите проект:
```bash
npm run build
```

2. Загрузите содержимое папки `dist/` в ветку `gh-pages` или в корень репозитория

3. В настройках репозитория (Settings → Pages) выберите:
   - Source: Deploy from a branch
   - Branch: `gh-pages` (или `main`, если загружали в корень)
   - Folder: `/ (root)`

## 🎨 Технологии

- React 18
- Vite 5
- Inline стили (без CSS фреймворков)

## 📁 Структура проекта

```
.
├── index.html          # Точка входа
├── package.json        # Зависимости
├── vite.config.js      # Конфигурация Vite
├── src/
│   ├── main.jsx       # Инициализация React
│   └── App.jsx        # Главный компонент
└── dist/              # Собранная версия (после npm run build)
```

## ✨ Особенности

- ✅ Относительные пути (работает на GitHub Pages)
- ✅ Inline стили (не требует дополнительных файлов)
- ✅ Адаптивный дизайн
- ✅ Быстрая загрузка (~150 KB)

## 📄 Лицензия

MIT
