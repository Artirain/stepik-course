---
title: "Урок 36. SubagentStop"
description: "Как обрабатывать завершение саб-агентов через SubagentStop hook"
last_verified: "2026-03-01"
---

# SubagentStop: контроль завершения подзадач

!!! info "Что ты узнаешь"
    - Когда срабатывает `SubagentStop` и зачем его использовать
    - Как логировать результаты работы подагентов
    - Какие данные приходят в stdin для этого события

## Введение

`SubagentStop` срабатывает, когда завершается подзадача (subagent run). Это удобно для логирования, валидации результата и дополнительной обратной связи.

## Пример конфигурации

```json
{
  "hooks": {
    "SubagentStop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/subagent-stop.sh",
            "timeout": 15
          }
        ]
      }
    ]
  }
}
```

## Пример скрипта

```bash
#!/usr/bin/env bash
set -euo pipefail

input="$(cat)"
mkdir -p "$CLAUDE_PROJECT_DIR/.claude/logs"

status="$(jq -r '.decision // "unknown"' <<<"$input")"
event="$(jq -r '.hook_event_name // "SubagentStop"' <<<"$input")"

printf '%s | %s | decision=%s\n' "$(date '+%F %T')" "$event" "$status" \
  >> "$CLAUDE_PROJECT_DIR/.claude/logs/subagent.log"
```

## SubagentStop vs SubagentStart

| Событие | Когда | Типичное использование |
|---------|-------|------------------------|
| `SubagentStart` | Подагент запускается | Логирование старта, инъекция контекста |
| `SubagentStop` | Подагент завершается | Логирование результата, валидация |

Используй оба события для полной картины жизненного цикла подагентов.

!!! tip "Совет"
    Комбинируй `SubagentStart` и `SubagentStop` для измерения времени выполнения подзадач.

## Практика

1. Добавь `SubagentStop` hook.
2. Логируй завершение в отдельный файл.
3. Проверь, что записи появляются после задач с подагентами.

## Итоги

- `SubagentStop` помогает контролировать поведение подагентов
- Хук настраивается как и другие события в `hooks` объекте
- Для анализа лучше писать отдельный лог

## Проверь себя

<div class="quiz-block" data-quiz-id="u36-q1" data-answer="b">
  <div class="quiz-question">Когда срабатывает SubagentStop?</div>
  <label><input type="radio" name="u36-q1" value="a"> Перед запуском подагента</label>
  <label><input type="radio" name="u36-q1" value="b"> При завершении подагента</label>
  <label><input type="radio" name="u36-q1" value="c"> Только при ошибке сети</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u36-q2" data-answer="a">
  <div class="quiz-question">Где задаётся SubagentStop в конфиге?</div>
  <label><input type="radio" name="u36-q2" value="a"> hooks.SubagentStop</label>
  <label><input type="radio" name="u36-q2" value="b"> hooks.PreToolUse</label>
  <label><input type="radio" name="u36-q2" value="c"> hooks.TaskStop</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u36-q3" data-answer="c">
  <div class="quiz-question">Зачем чаще всего используют SubagentStop?</div>
  <label><input type="radio" name="u36-q3" value="a"> Для смены модели</label>
  <label><input type="radio" name="u36-q3" value="b"> Для подключения MCP</label>
  <label><input type="radio" name="u36-q3" value="c"> Для логирования и контроля завершения подзадач</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
