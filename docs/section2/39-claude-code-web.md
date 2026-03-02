---
title: "Урок 39. Claude Code on the Web"
description: "Актуальный обзор Claude Code on the Web: research preview, доступ и сценарии"
last_verified: "2026-03-01"
---

# Claude Code on the Web

!!! info "Что ты узнаешь"
    - Что такое Claude Code on the Web и как его запустить
    - Какие задачи удобно решать через браузер
    - Как переносить сессии между web и CLI
    - Чем web-режим отличается от локального CLI

## Введение

Claude Code on the Web — браузерный режим Claude Code, который позволяет запускать задачи в облачной среде без локальной установки. Статус на март 2026 — research preview.

Точка входа: <https://claude.ai/code>

## Кому доступно

- **Pro**, **Max** — полный доступ
- **Team**, **Enterprise** — premium seats

## Ключевые возможности

- **Асинхронные задачи** — запускаешь из браузера и закрываешь вкладку, работа продолжается в облаке
- **GitHub-интеграция** — подключаешь репозиторий и работаешь с ним напрямую
- **Diff-просмотр** — визуальное ревью изменений перед созданием PR
- **Handoff в CLI** — команда `/teleport` переносит web-сессию в локальный терминал
- **Флаг `--remote`** — запуск облачной задачи из локального CLI
- **Мобильный доступ** — работает на iOS и Android через мобильное приложение

## Когда использовать web

- Нужно быстро запустить задачу без локального окружения
- Хочешь делегировать фоновую работу и вернуться к результату позже
- Работаешь с телефона или планшета
- Нет локального checkout репозитория

## Работа с CLI: --remote и /teleport

Из локального терминала можно запустить задачу в облаке:

```bash
claude --remote "Обнови зависимости и запусти тесты"
```

А если ты начал работу в браузере и хочешь продолжить локально — набери `/teleport` в web-интерфейсе. Claude Code подготовит команду для продолжения сессии в терминале.

!!! tip "Совет"
    `--remote` удобен для долгих задач: запускаешь из терминала, закрываешь ноутбук, проверяешь результат позже в браузере.

## Когда лучше CLI

- Нужен полный контроль над локальным окружением
- Важны локальные инструменты, shell-процессы и Docker
- Нужна тонкая интеграция hooks/MCP с локальной инфраструктурой

Подробнее про headless-режим CLI — в [Уроке 40](40-headless-mode.md).

## Практика

1. Открой <https://claude.ai/code> и изучи интерфейс.
2. Попробуй подключить тестовый GitHub-репозиторий.
3. Запусти простую задачу (например, «добавь README.md»).

## Итоги

- Claude Code on the Web работает в браузере по адресу `claude.ai/code`
- Задачи выполняются асинхронно в облаке
- `/teleport` и `--remote` связывают web и CLI
- Web-режим удобен для фоновых задач, CLI — для полного контроля

## Проверь себя

<div class="quiz-block" data-quiz-id="u39-q1" data-answer="b" markdown>
  <div class="quiz-question">Где открывается Claude Code on the Web?</div>
  <label><input type="radio" name="u39-q1" value="a"> claude.ai/chat</label>
  <label><input type="radio" name="u39-q1" value="b"> claude.ai/code</label>
  <label><input type="radio" name="u39-q1" value="c"> npmjs.com</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u39-q2" data-answer="a" markdown>
  <div class="quiz-question">Кому доступен web-режим на 1 марта 2026?</div>
  <label><input type="radio" name="u39-q2" value="a"> Pro и Max</label>
  <label><input type="radio" name="u39-q2" value="b"> Только Enterprise</label>
  <label><input type="radio" name="u39-q2" value="c"> Только API-пользователям</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u39-q3" data-answer="c" markdown>
  <div class="quiz-question">Когда CLI обычно предпочтительнее web?</div>
  <label><input type="radio" name="u39-q3" value="a"> Когда хочешь работать без установки</label>
  <label><input type="radio" name="u39-q3" value="b"> Когда нужен только обзор PR</label>
  <label><input type="radio" name="u39-q3" value="c"> Когда нужен полный локальный контроль среды</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
