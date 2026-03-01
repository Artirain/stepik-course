---
title: "Урок 34. Данные hooks: stdin и переменные окружения"
description: "Какие данные реально доступны в hooks и как безопасно их использовать"
last_verified: "2026-03-01"
---

# Данные hooks: stdin и переменные окружения

!!! info "Что ты узнаешь"
    - Какие данные hooks получают через stdin JSON
    - Как использовать `CLAUDE_PROJECT_DIR` для переносимых путей
    - Почему stdin — самый надёжный источник данных

## Введение

Надёжный источник данных для hooks — JSON во `stdin`.

Из документированного окружения для hook-команд гарантированно полезен `CLAUDE_PROJECT_DIR`.

## Что читать из stdin

Вход зависит от события, но обычно содержит:

- `hook_event_name`
- `tool_name` / `tool_input` (для tool-событий)
- `message` (для Notification)

Пример разбора:

```bash
#!/usr/bin/env bash
set -euo pipefail

input="$(cat)"

event="$(jq -r '.hook_event_name // "unknown"' <<<"$input")"
tool="$(jq -r '.tool_name // "n/a"' <<<"$input")"

echo "event=$event tool=$tool"
```

## Переменные окружения

### CLAUDE_PROJECT_DIR

Используй `CLAUDE_PROJECT_DIR` для устойчивых путей к скриптам и логам:

```bash
mkdir -p "$CLAUDE_PROJECT_DIR/.claude/logs"
```

### CLAUDE_SESSION_ID

Уникальный идентификатор текущей сессии. Полезен для группировки логов:

```bash
echo "session=$CLAUDE_SESSION_ID" >> "$CLAUDE_PROJECT_DIR/.claude/logs/actions.log"
```

## Что приходит в stdin по типу события

| Событие | Ключевые поля stdin JSON |
|---------|--------------------------|
| `PreToolUse` / `PostToolUse` | `hook_event_name`, `tool_name`, `tool_input` |
| `Notification` | `hook_event_name`, `message` |
| `SessionStart` / `SessionEnd` | `hook_event_name` |
| `Stop` | `hook_event_name`, `decision` |
| `SubagentStop` | `hook_event_name`, `decision` |
| `UserPromptSubmit` | `hook_event_name`, `prompt` |
| `PreCompact` | `hook_event_name`, `context` |

## Практика

1. Сделай debug-hook, который пишет весь stdin в файл.
2. Отдельно логируй `hook_event_name` и `tool_name`.
3. Используй пути через `CLAUDE_PROJECT_DIR`.

## Итоги

- Основной канал данных: JSON через stdin
- `CLAUDE_PROJECT_DIR` помогает делать переносимые hook-скрипты
- Не завязывайся на недокументированные переменные без проверки

## Проверь себя

<div class="quiz-block" data-quiz-id="u34-q1" data-answer="a" markdown>
  <div class="quiz-question">Какой источник данных в hooks наиболее надёжен?</div>
  <label><input type="radio" name="u34-q1" value="a"> JSON через stdin</label>
  <label><input type="radio" name="u34-q1" value="b"> Только случайные env-переменные</label>
  <label><input type="radio" name="u34-q1" value="c"> Имя ветки Git из UI</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u34-q2" data-answer="b" markdown>
  <div class="quiz-question">Для чего используют CLAUDE_PROJECT_DIR?</div>
  <label><input type="radio" name="u34-q2" value="a"> Для смены модели</label>
  <label><input type="radio" name="u34-q2" value="b"> Для корректных путей к скриптам и логам проекта</label>
  <label><input type="radio" name="u34-q2" value="c"> Для подсчёта токенов</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u34-q3" data-answer="c" markdown>
  <div class="quiz-question">Почему не стоит полагаться только на недокументированные env-переменные?</div>
  <label><input type="radio" name="u34-q3" value="a"> Они всегда медленные</label>
  <label><input type="radio" name="u34-q3" value="b"> Они работают только на Windows</label>
  <label><input type="radio" name="u34-q3" value="c"> Их наличие/формат может измениться</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
