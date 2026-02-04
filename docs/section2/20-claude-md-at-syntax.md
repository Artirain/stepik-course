---
title: "Урок 20. CLAUDE.md — синтаксис @"
description: "Как подключать внешние файлы в CLAUDE.md через синтаксис @ для модульности и переиспользования"
---

# CLAUDE.md — как через синтаксис @ подтягивать файлы

!!! info "Что ты узнаешь"
    - Как работает синтаксис @ в CLAUDE.md
    - Зачем подключать внешние файлы
    - Ограничения и лучшие практики

## Введение

CLAUDE.md поддерживает синтаксис `@путь/к/файлу` для подключения содержимого других файлов в контекст. Это позволяет не дублировать информацию и модульно организовать правила.

## Как это работает

Когда Claude Code видит строку с `@`, он загружает указанный файл в контекст:

```markdown
# CLAUDE.md

## Проект
REST API на Express + TypeScript.

## Архитектура
Подробности в @docs/architecture.md

## Стиль кода
Правила в @.eslintrc.json

## API-эндпоинты
Документация: @docs/api-spec.yaml
```

Claude Code прочитает `docs/architecture.md`, `.eslintrc.json` и `docs/api-spec.yaml` и будет учитывать их содержимое.

## Зачем это нужно

- **Модульность** — каждый файл отвечает за своё
- **DRY** — не дублируешь информацию из документации
- **Актуальность** — если architecture.md обновится, Claude Code автоматически увидит новую версию

## Примеры использования

```markdown
# Подключение конфигурации
Конфиг линтера: @.eslintrc.json

# Подключение документации
API: @docs/openapi.yaml

# Подключение примеров
Пример компонента: @src/components/Example.tsx
```

## Ограничения

!!! warning "Учитывай:"
    - Подключённые файлы занимают место в контексте
    - Не подключай бинарные файлы (изображения, .exe)
    - Подключай только релевантные файлы — не весь проект
    - Пути указываются относительно корня проекта

## Практика

1. Создай документ `docs/architecture.md` в проекте
2. Добавь `@docs/architecture.md` в CLAUDE.md
3. Запусти Claude Code и спроси об архитектуре

## Итоги

- Синтаксис `@путь/файл` подключает содержимое в контекст
- Полезно для документации, конфигов, примеров кода
- Подключай только релевантные, текстовые файлы
- Пути — от корня проекта

## Проверь себя

<div class="quiz-block" data-quiz-id="u20-q1" data-answer="a">
  <div class="quiz-question">Какой синтаксис подключает файл в CLAUDE.md?</div>
  <label><input type="radio" name="u20-q1" value="a"> @путь/к/файлу</label>
  <label><input type="radio" name="u20-q1" value="b"> #include путь/к/файлу</label>
  <label><input type="radio" name="u20-q1" value="c"> import путь/к/файлу</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u20-q2" data-answer="c">
  <div class="quiz-question">Какие файлы НЕ стоит подключать через @?</div>
  <label><input type="radio" name="u20-q2" value="a"> Markdown-документацию</label>
  <label><input type="radio" name="u20-q2" value="b"> JSON-конфигурации</label>
  <label><input type="radio" name="u20-q2" value="c"> Бинарные файлы (изображения, .exe)</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u20-q3" data-answer="b">
  <div class="quiz-question">Относительно чего указываются пути в @?</div>
  <label><input type="radio" name="u20-q3" value="a"> Домашней папки пользователя</label>
  <label><input type="radio" name="u20-q3" value="b"> Корня проекта</label>
  <label><input type="radio" name="u20-q3" value="c"> Папки .claude/</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
