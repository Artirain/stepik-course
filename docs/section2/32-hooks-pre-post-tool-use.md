---
title: "Урок 32. PreToolUse и PostToolUse"
description: "Практика до- и после-инструментальных хуков: блокировка, обратная связь и постобработка"
last_verified: "2026-03-01"
---

# PreToolUse и PostToolUse

!!! info "Что ты узнаешь"
    - Как `PreToolUse` блокирует опасные команды до выполнения
    - Как `PostToolUse` помогает в постобработке и логировании
    - В чём ключевая разница между этими двумя событиями

## Введение

- `PreToolUse` — работает до выполнения инструмента, может блокировать вызов.
- `PostToolUse` — работает после успешного выполнения инструмента.

## PreToolUse: блокировка опасной команды

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/pre-bash-guard.sh"
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
cmd="$(jq -r '.tool_input.command // empty' <<<"$input")"

if [[ "$cmd" =~ rm[[:space:]]+-rf[[:space:]]+/ ]]; then
  echo "Запрещена потенциально разрушительная команда"
  exit 2
fi

exit 0
```

## PostToolUse: постобработка записи

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write(*.py)",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/post-write-python.sh"
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
file_path="$(jq -r '.tool_input.file_path // empty' <<<"$input")"

if [[ -n "$file_path" && -f "$file_path" ]]; then
  echo "Write completed: $file_path"
fi
```

## Ключевая разница

| Событие | Когда | Может блокировать |
|---|---|---|
| `PreToolUse` | До вызова | Да |
| `PostToolUse` | После вызова | Нет |

## Практика

1. Напиши `PreToolUse` guard-скрипт, который блокирует `rm -rf /` и `chmod 777`.
2. Напиши `PostToolUse` скрипт для `Write(*.py)`, который выводит путь записанного файла.
3. Протестируй оба хука в реальной сессии.

## Итоги

- `PreToolUse` проверяет действие до выполнения и может заблокировать его через `exit 2`
- `PostToolUse` срабатывает после успешного выполнения — подходит для логирования
- Оба события получают данные через stdin JSON

## Проверь себя

<div class="quiz-block" data-quiz-id="u32-q1" data-answer="a" markdown>
  <div class="quiz-question">Какой hook может заблокировать инструмент до выполнения?</div>
  <label><input type="radio" name="u32-q1" value="a"> PreToolUse</label>
  <label><input type="radio" name="u32-q1" value="b"> PostToolUse</label>
  <label><input type="radio" name="u32-q1" value="c"> SessionEnd</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u32-q2" data-answer="b" markdown>
  <div class="quiz-question">Какой код завершения обычно используют для блокировки в PreToolUse?</div>
  <label><input type="radio" name="u32-q2" value="a"> exit 0</label>
  <label><input type="radio" name="u32-q2" value="b"> exit 2</label>
  <label><input type="radio" name="u32-q2" value="c"> exit 127</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u32-q3" data-answer="c" markdown>
  <div class="quiz-question">Что лучше делать в PostToolUse?</div>
  <label><input type="radio" name="u32-q3" value="a"> Блокировать запрос пользователя до обработки</label>
  <label><input type="radio" name="u32-q3" value="b"> Подменять системные настройки CLI</label>
  <label><input type="radio" name="u32-q3" value="c"> Логирование и постобработка после инструмента</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
