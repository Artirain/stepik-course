---
title: "Урок 38. Context7 MCP"
description: "Подключение Context7 MCP для актуальной документации библиотек в Claude Code"
---

# Первый шаг с Context7 MCP

!!! info "Что ты узнаешь"
    - Что такое Context7 и зачем он нужен
    - Как установить и настроить
    - Как использовать в работе

## Введение

Context7 — MCP-сервер, который предоставляет Claude Code актуальную документацию библиотек и фреймворков. Вместо того чтобы полагаться на знания модели (которые могут устареть), Claude Code обращается к Context7 и получает свежие docs.

## Зачем это нужно

Модели Claude обучены на данных до определённой даты. Если библиотека обновилась, модель может не знать о новых API. Context7 решает эту проблему, подключая живую документацию.

!!! example "Пример"
    Спрашиваешь про React 19 Server Components — без Context7 Claude может дать устаревший ответ. С Context7 — получит актуальную документацию.

## Установка

```bash
claude mcp add context7 -- npx -y @upstash/context7-mcp@latest
```

Это добавит Context7 в `.claude/mcp.json`:

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

После подключения Claude Code автоматически обращается к Context7, когда нужна документация. Просто задавай вопросы как обычно:

```
> Как использовать новый useActionState хук в React 19?
> Покажи пример Server Actions в Next.js 15
> Какой синтаксис у новых маршрутов в Express 5?
```

Claude Code сам решит, когда обратиться к Context7 за актуальными данными.

## Другие полезные MCP-серверы

| Сервер | Установка |
|--------|-----------|
| GitHub | `claude mcp add github -- npx -y @anthropic-ai/mcp-github` |
| Puppeteer | `claude mcp add puppeteer -- npx -y @anthropic-ai/mcp-puppeteer` |

## Практика

1. Установи Context7: `claude mcp add context7 -- npx -y @upstash/context7-mcp@latest`
2. Запусти Claude Code
3. Спроси о новой фиче в любой библиотеке
4. Сравни ответ с ответом без Context7

## Итоги

- Context7 предоставляет актуальную документацию библиотек
- Установка: одна команда `claude mcp add`
- Claude Code сам обращается к Context7 при необходимости
- Решает проблему устаревших знаний модели

## Проверь себя

<div class="quiz-block" data-quiz-id="u38-q1" data-answer="b">
  <div class="quiz-question">Какую проблему решает Context7?</div>
  <label><input type="radio" name="u38-q1" value="a"> Ускоряет работу Claude Code</label>
  <label><input type="radio" name="u38-q1" value="b"> Предоставляет актуальную документацию вместо устаревших знаний</label>
  <label><input type="radio" name="u38-q1" value="c"> Добавляет новые модели</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u38-q2" data-answer="a">
  <div class="quiz-question">Нужно ли вручную вызывать Context7 при каждом вопросе?</div>
  <label><input type="radio" name="u38-q2" value="a"> Нет, Claude Code обращается автоматически</label>
  <label><input type="radio" name="u38-q2" value="b"> Да, нужно писать /context7</label>
  <label><input type="radio" name="u38-q2" value="c"> Да, нужно указывать флаг --context7</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u38-q3" data-answer="c">
  <div class="quiz-question">Как установить Context7?</div>
  <label><input type="radio" name="u38-q3" value="a"> npm install context7</label>
  <label><input type="radio" name="u38-q3" value="b"> /mcp install context7</label>
  <label><input type="radio" name="u38-q3" value="c"> claude mcp add context7 -- npx -y @upstash/context7-mcp@latest</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
