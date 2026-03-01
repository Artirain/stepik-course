---
title: "Урок 31. Notification и логирование"
description: "Как настроить уведомления и аудит действий через Notification и PostToolUse"
last_verified: "2026-03-01"
---

# Notification и логирование через hooks

## Введение

`Notification` удобно использовать для сигналов пользователю, а `PostToolUse` — для журналирования действий.

## Notification: пример

```json
{
  "hooks": {
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/notify.sh"
          }
        ]
      }
    ]
  }
}
```

`notify.sh` получает JSON через stdin. Поле `message` содержит текст уведомления.

```bash
#!/usr/bin/env bash
set -euo pipefail

input="$(cat)"
message="$(jq -r '.message // "Claude notification"' <<<"$input")"

echo "[Notification] $message"
```

## PostToolUse: логирование

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash|Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/posttool-log.sh"
          }
        ]
      }
    ]
  }
}
```

```bash
#!/usr/bin/env bash
set -euo pipefail

input="$(cat)"
mkdir -p "$CLAUDE_PROJECT_DIR/.claude/logs"

tool_name="$(jq -r '.tool_name // "unknown"' <<<"$input")"
hook_event="$(jq -r '.hook_event_name // "unknown"' <<<"$input")"

printf '%s | %s | %s\n' "$(date '+%F %T')" "$hook_event" "$tool_name" \
  >> "$CLAUDE_PROJECT_DIR/.claude/logs/actions.log"
```

## Итоги

- Для уведомлений используй `Notification`
- Для аудита действий — `PostToolUse`
- Основные данные берутся из JSON на stdin

## Проверь себя

<div class="quiz-block" data-quiz-id="u31-q1" data-answer="b" markdown>
  <div class="quiz-question">Какое событие подходит для системных уведомлений пользователю?</div>
  <label><input type="radio" name="u31-q1" value="a"> PreCompact</label>
  <label><input type="radio" name="u31-q1" value="b"> Notification</label>
  <label><input type="radio" name="u31-q1" value="c"> SessionEnd</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u31-q2" data-answer="a" markdown>
  <div class="quiz-question">Где hook получает данные о событии?</div>
  <label><input type="radio" name="u31-q2" value="a"> Через stdin JSON</label>
  <label><input type="radio" name="u31-q2" value="b"> Через query string</label>
  <label><input type="radio" name="u31-q2" value="c"> Через package.json</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u31-q3" data-answer="c" markdown>
  <div class="quiz-question">Что лучше использовать для аудита действий инструментов?</div>
  <label><input type="radio" name="u31-q3" value="a"> SessionStart</label>
  <label><input type="radio" name="u31-q3" value="b"> UserPromptSubmit</label>
  <label><input type="radio" name="u31-q3" value="c"> PostToolUse</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
