---
title: "Урок 19. CLAUDE.md — что это?"
description: "Что такое CLAUDE.md, зачем он нужен и как написать правила для Claude Code в своём проекте"
---

# CLAUDE.md — что это такое?

!!! info "Что ты узнаешь"
    - Что такое CLAUDE.md и зачем он нужен
    - Что писать в CLAUDE.md, а что — нет
    - Пример хорошего CLAUDE.md для проекта

## Введение

CLAUDE.md — файл с инструкциями для Claude Code, который располагается в корне проекта. Claude Code автоматически читает его при старте сессии. Это аналог `.cursorrules` для Cursor или `.github/copilot-instructions.md` для Copilot.

Благодаря CLAUDE.md ты не повторяешь одни и те же инструкции каждый раз. Агент сразу знает правила проекта.

## Зачем нужен CLAUDE.md

Без CLAUDE.md ты каждый раз объясняешь Claude Code:

- На каком языке писать
- Какой фреймворк используется
- Какой стиль кода принят
- Как делать коммиты

С CLAUDE.md всё это прописано один раз и работает автоматически.

## Что писать

```markdown
# CLAUDE.md

## Проект
Это REST API на Node.js + Express + TypeScript.
БД — PostgreSQL через Prisma ORM.

## Стиль кода
- TypeScript strict mode
- Именование: camelCase для переменных, PascalCase для типов
- Максимум 80 символов в строке

## Тестирование
- Фреймворк: Jest
- Запуск: `npm test`
- Покрытие > 80%

## Git
- Conventional commits (feat:, fix:, refactor:)
- Ветки: feature/*, bugfix/*, hotfix/*

## Запрещено
- Не используй any в TypeScript
- Не пиши console.log в production-коде
- Не делай force push
```

## Что НЕ писать

!!! warning "Не добавляй в CLAUDE.md:"
    - API-ключи и секреты
    - Пароли и токены
    - Чувствительную информацию о пользователях
    - Информацию, которая не относится к коду

## Формат

CLAUDE.md — обычный Markdown. Никакого специального синтаксиса не нужно. Пиши понятно и структурировано.

## Практика

1. Создай CLAUDE.md в корне своего проекта
2. Опиши: технологии, стиль кода, тесты, git-правила
3. Запусти Claude Code и убедись, что он следует правилам

## Итоги

- CLAUDE.md — файл с правилами проекта для Claude Code
- Читается автоматически при старте сессии
- Пиши: технологии, стиль, тесты, правила коммитов
- Не пиши: секреты, пароли, API-ключи

## Проверь себя

<div class="quiz-block" data-quiz-id="u19-q1" data-answer="c">
  <div class="quiz-question">Где размещается CLAUDE.md?</div>
  <label><input type="radio" name="u19-q1" value="a"> В папке .claude/</label>
  <label><input type="radio" name="u19-q1" value="b"> В домашней папке пользователя</label>
  <label><input type="radio" name="u19-q1" value="c"> В корне проекта</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u19-q2" data-answer="b">
  <div class="quiz-question">Когда Claude Code читает CLAUDE.md?</div>
  <label><input type="radio" name="u19-q2" value="a"> Только по команде /load</label>
  <label><input type="radio" name="u19-q2" value="b"> Автоматически при старте сессии</label>
  <label><input type="radio" name="u19-q2" value="c"> Никогда, нужно копировать вручную</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u19-q3" data-answer="a">
  <div class="quiz-question">Что НЕ стоит добавлять в CLAUDE.md?</div>
  <label><input type="radio" name="u19-q3" value="a"> API-ключи и пароли</label>
  <label><input type="radio" name="u19-q3" value="b"> Стиль кода</label>
  <label><input type="radio" name="u19-q3" value="c"> Правила коммитов</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
