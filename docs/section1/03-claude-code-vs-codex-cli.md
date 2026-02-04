---
title: "Урок 3. Claude Code vs Codex CLI"
description: "Сравнение Claude Code и Codex CLI от OpenAI: два терминальных агента, их сильные стороны и различия"
---

# Claude Code vs Codex CLI

!!! info "Что ты узнаешь"
    - Что такое Codex CLI и чем он похож на Claude Code
    - Ключевые различия в экосистемах и возможностях
    - Какой инструмент выбрать под свои задачи

## Введение

Codex CLI — терминальный ИИ-агент от OpenAI, прямой конкурент Claude Code. Оба инструмента работают из командной строки, имеют доступ к файлам и могут выполнять команды. Но под капотом у них разные модели и разный набор возможностей.

## Общее между ними

Оба инструмента — терминальные ИИ-агенты:

- Работают в CLI, без привязки к конкретной IDE
- Читают и пишут файлы
- Запускают bash-команды
- Работают с git
- Поддерживают систему permissions

## Ключевые различия

| Критерий | Claude Code | Codex CLI |
|----------|-------------|-----------|
| Компания | Anthropic | OpenAI |
| Модели | Claude (Opus, Sonnet, Haiku) | GPT, o-series |
| Hooks | Да (SessionStart, PreToolUse, PostToolUse и др.) | Ограниченная поддержка |
| CLAUDE.md / правила | Да (CLAUDE.md + .claude/rules/) | Инструкции через конфиг |
| Skills | Да | Нет |
| MCP | Да | Нет |
| Sub-agents | Да | Нет |
| Slash-команды | Да (кастомные) | Базовые |
| Headless-режим | Да (`-p`) | Да (аналогичный) |
| Установка | `npm install -g @anthropic-ai/claude-code` | `npm install -g @openai/codex` |

## Сильные стороны Claude Code

!!! tip "Claude Code выигрывает в:"
    - **Расширяемость**: hooks, MCP, skills, sub-agents — целая экосистема
    - **Проектные правила**: CLAUDE.md + модульные .claude/rules/
    - **Кастомные команды**: свои slash-команды с аргументами
    - **Модели Claude**: Opus особенно хорош для сложных задач

## Сильные стороны Codex CLI

!!! tip "Codex CLI выигрывает в:"
    - **Простота**: минималистичный интерфейс, быстрый старт
    - **Модели OpenAI**: если ты уже в экосистеме OpenAI
    - **o-series модели**: хороши для reasoning-задач

## Что выбрать

Выбор зависит от твоих потребностей:

- **Claude Code** — если нужна глубокая автоматизация, расширяемость и продвинутые возможности
- **Codex CLI** — если ты уже в экосистеме OpenAI и нужен простой терминальный агент

В этом курсе мы сосредоточимся на Claude Code и его экосистеме.

## Практика

Если ты уже пользовался Codex CLI или другими ИИ-инструментами, запиши:

1. Что тебе нравилось в них?
2. Чего не хватало?
3. Какие задачи оставались нерешёнными?

Эти наблюдения помогут оценить, насколько Claude Code закрывает твои потребности.

## Итоги

- Claude Code и Codex CLI — оба терминальные ИИ-агенты
- Claude Code имеет более развитую экосистему: hooks, MCP, skills, sub-agents
- Codex CLI проще в освоении и привязан к экосистеме OpenAI
- Выбор зависит от потребностей в автоматизации и предпочтений по моделям

## Проверь себя

<div class="quiz-block" data-quiz-id="u03-q1" data-answer="b">
  <div class="quiz-question">Кто разработал Codex CLI?</div>
  <label><input type="radio" name="u03-q1" value="a"> Anthropic</label>
  <label><input type="radio" name="u03-q1" value="b"> OpenAI</label>
  <label><input type="radio" name="u03-q1" value="c"> Google</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u03-q2" data-answer="a">
  <div class="quiz-question">Какой инструмент поддерживает MCP (Model Context Protocol)?</div>
  <label><input type="radio" name="u03-q2" value="a"> Claude Code</label>
  <label><input type="radio" name="u03-q2" value="b"> Codex CLI</label>
  <label><input type="radio" name="u03-q2" value="c"> Оба</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u03-q3" data-answer="c">
  <div class="quiz-question">Что общего у Claude Code и Codex CLI?</div>
  <label><input type="radio" name="u03-q3" value="a"> Оба используют модели Claude</label>
  <label><input type="radio" name="u03-q3" value="b"> Оба работают только в VS Code</label>
  <label><input type="radio" name="u03-q3" value="c"> Оба — терминальные агенты с доступом к файлам и bash</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
