---
title: "Урок 38. Context7 MCP"
description: "Как подключить Context7 MCP для актуальной документации библиотек"
last_verified: "2026-03-01"
---

# Первый шаг с Context7 MCP

!!! info "Что ты узнаешь"
    - Зачем нужен Context7
    - Как подключить сервер
    - Как убедиться, что конфиг корректный

## Введение

Context7 даёт доступ к актуальной документации библиотек. Это полезно, когда модельные знания могут отставать от последних релизов.

## Установка

```bash
claude mcp add context7 -- npx -y @upstash/context7-mcp@latest
```

После добавления проверь конфиг (`.mcp.json`) и список серверов:

```bash
claude mcp list
```

## Пример `.mcp.json`

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

## Использование

После подключения задавай вопросы о свежих API как обычно — Claude Code сам решит, когда задействовать Context7.

Примеры:

- "Покажи актуальный пример Server Actions в Next.js"
- "Какой сейчас рекомендуемый синтаксис в React 19 для ..."

## Когда Context7 особенно полезен

- Работа с фреймворками, которые часто обновляются (Next.js, React, Svelte)
- Вопросы про новые API, которых не было в обучающих данных модели
- Проверка актуального синтаксиса перед внедрением в продакшн

!!! warning "Ограничения"
    Context7 не заменяет ручную проверку документации. Если результат критичен — всегда сверяйся с официальным сайтом библиотеки.

## Удаление

Если MCP-сервер больше не нужен:

```bash
claude mcp remove context7
```

## Практика

1. Подключи Context7.
2. Проверь `claude mcp list`.
3. Задай вопрос про новую фичу фреймворка.
4. Сравни ответ до и после подключения.

## Итоги

- Context7 помогает получать более актуальные ответы по документации
- Подключается одной командой через `claude mcp add`
- Конфиг хранится в `.mcp.json`

## Проверь себя

<div class="quiz-block" data-quiz-id="u38-q1" data-answer="b">
  <div class="quiz-question">Какую задачу решает Context7?</div>
  <label><input type="radio" name="u38-q1" value="a"> Ускоряет интернет</label>
  <label><input type="radio" name="u38-q1" value="b"> Даёт доступ к актуальной документации</label>
  <label><input type="radio" name="u38-q1" value="c"> Заменяет модель Claude</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u38-q2" data-answer="a">
  <div class="quiz-question">Где обычно проверяют, что MCP-сервер подключён?</div>
  <label><input type="radio" name="u38-q2" value="a"> claude mcp list</label>
  <label><input type="radio" name="u38-q2" value="b"> npm ls</label>
  <label><input type="radio" name="u38-q2" value="c"> /status mcp</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u38-q3" data-answer="c">
  <div class="quiz-question">Какой файл нужно проверять после добавления MCP-сервера в проект?</div>
  <label><input type="radio" name="u38-q3" value="a"> .claude/mcp.json</label>
  <label><input type="radio" name="u38-q3" value="b"> mcp.yaml</label>
  <label><input type="radio" name="u38-q3" value="c"> .mcp.json</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
