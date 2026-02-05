---
title: "Полное руководство по Claude Code — вайбкодинг с нуля"
description: "Практический курс по Claude Code для разработчиков: от установки до продвинутых возможностей"
---

# Полное руководство по Claude Code

Практический курс по Claude Code для разработчиков: от установки и первых команд до безопасных permissions, CLAUDE.md, кастомных slash-команд, саб-агентов, Hooks, Skills и MCP.

---

## Чему ты научишься

- Быстро ставить Claude Code на macOS и Windows и доводить до рабочего состояния
- Понимать, когда Claude Code лучше Cursor и Codex CLI, и что выбирать под свои задачи
- Разбираться в Pro/Max, оплате через API и осознанно выбирать план и модель
- Настраивать permissions так, чтобы было безопасно: минимум рисков, максимум удобства
- Уверенно работать в CLI: команды, первый сеанс, правки кода, сессии
- Управлять контекстом: не раздувать диалог, делать перемотку, держать фокус
- Оформлять проектные правила через CLAUDE.md и подключать файлы через @
- Делать модульные правила через `.claude/rules`
- Писать свои slash-команды с аргументами
- Использовать саб-агентов для делегирования задач
- Настраивать Hooks под реальную рутину
- Подключать MCP, работать в Claude Code on the Web и запускать headless-режим
- Выстраивать проверяемый воркфлоу: тестинг и верификация результата

---

## Программа курса

### Раздел 1: Основы и настройка

| # | Название урока |
|---|----------------|
| 1 | [Плюсы и особенности Claude Code](section1/01-claude-code-features.md) |
| 2 | [Claude Code vs Cursor](section1/02-claude-code-vs-cursor.md) |
| 3 | [Claude Code vs Codex CLI](section1/03-claude-code-vs-codex-cli.md) |
| 4 | [Pro и Max — сравнение цен](section1/04-pro-vs-max-pricing.md) |
| 5 | [Выбор между Opus, Sonnet и Haiku](section1/05-opus-sonnet-haiku.md) |
| 6 | [Установка на Mac](section1/06-install-mac.md) |
| 7 | [Установка на Windows](section1/07-install-windows.md) |
| 8 | [Pro-план vs API-оплата](section1/08-pro-plan-vs-api.md) |
| 9 | [Настройки permissions](section1/09-permissions-security.md) |
| 10 | [Первый сеанс](section1/10-first-session.md) |
| 11 | [Первое изменение кода](section1/11-first-code-change.md) |
| 12 | [Базовые команды](section1/12-basic-commands.md) |
| 13 | [Расширенный режим мышления](section1/13-extended-thinking.md) |
| 14 | [Выбор модели под задачу](section1/14-model-choice-for-tasks.md) |
| 15 | [Старт, завершение, возобновление](section1/15-session-management.md) |
| 16 | [Управление контекстом](section1/16-context-management.md) |
| 17 | [Перемотка диалога](section1/17-dialog-rewind.md) |
| 18 | [Правка UI по скриншоту](section1/18-ui-fix-by-screenshot.md) |

### Раздел 2: Продвинутые возможности

| # | Название урока |
|---|----------------|
| 19 | [CLAUDE.md — что это?](section2/19-claude-md-intro.md) |
| 20 | [CLAUDE.md — синтаксис @](section2/20-claude-md-at-syntax.md) |
| 21 | [CLAUDE.md — размещение и приоритет](section2/21-claude-md-placement-priority.md) |
| 22 | [CLAUDE.md — модульные правила](section2/22-claude-md-modular-rules.md) |
| 23 | [Кастомные slash-команды](section2/23-custom-slash-commands.md) |
| 24 | [Аргументы через $ARGUMENTS](section2/24-commands-arguments.md) |
| 25 | [Несколько аргументов $1/$2/$3](section2/25-commands-multiple-args.md) |
| 26 | [Саб-агенты](section2/26-subagents-intro.md) |
| 27 | [Файл определения агента](section2/27-custom-agent-definition.md) |
| 28 | [Hooks — lifecycle-события](section2/28-hooks-intro.md) |
| 29 | [Настройка Hooks через /hooks](section2/29-hooks-configuration.md) |
| 30 | [Хук SessionStart](section2/30-hooks-session-start.md) |
| 31 | [Уведомления и логирование](section2/31-hooks-notifications-logging.md) |
| 32 | [PreToolUse и PostToolUse](section2/32-hooks-pre-post-tool-use.md) |
| 33 | [Коды завершения в Hooks](section2/33-hooks-exit-codes.md) |
| 34 | [Переменные окружения в Hooks](section2/34-hooks-env-variables.md) |
| 35 | [Matchers — wildcard и паттерны](section2/35-hooks-matchers-patterns.md) |
| 36 | [SubagentStop хук](section2/36-hooks-subagent-stop.md) |
| 37 | [Что такое MCP](section2/37-mcp-intro.md) |
| 38 | [Context7 MCP](section2/38-mcp-context7.md) |
| 39 | [Claude Code on the Web](section2/39-claude-code-web.md) |
| 40 | [Хедлесс-режим (опция -p)](section2/40-headless-mode.md) |
| 41 | [Skills в Claude Code](section2/41-skills-intro.md) |
| 42 | [SKILL.md и папка references](section2/42-skills-md-references.md) |
| 43 | [Skills vs саб-агенты](section2/43-skills-vs-subagents.md) |
| 44 | [Тестинг](section2/44-testing.md) |
