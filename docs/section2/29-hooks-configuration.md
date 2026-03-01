---
title: "Урок 29. Настройка Hooks"
description: "Как настраивать hooks в актуальном формате settings.json и организовывать скрипты"
last_verified: "2026-03-01"
---

# Настройка Hooks

!!! info "Что ты узнаешь"
    - Как настраивать hooks через `/hooks`
    - Как писать конфиг в актуальном формате
    - Где лучше хранить hook-скрипты

## Введение

Быстрый путь — `/hooks` в интерактивной сессии. После сохранения Claude Code записывает правила в `.claude/settings.json`.

## Базовый рабочий пример

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write(*.py)",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/pre-write-python.sh",
            "timeout": 10
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write(*.py)",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/post-write-python.sh",
            "timeout": 20
          }
        ]
      }
    ]
  }
}
```

## Практические рекомендации

- Держи сложную логику в файлах `.claude/hooks/*.sh`
- Используй `$CLAUDE_PROJECT_DIR`, чтобы скрипты не зависели от текущей директории
- Для `timeout` используй секунды и не завышай значения

## Пример скрипта

```bash
#!/usr/bin/env bash
set -euo pipefail

input="$(cat)"
tool_name="$(jq -r '.tool_name // empty' <<<"$input")"
file_path="$(jq -r '.tool_input.file_path // empty' <<<"$input")"

if [[ "$tool_name" == "Write" && "$file_path" == *.py ]]; then
  echo "Python write detected: $file_path"
fi
```

## Практика

1. Создай один `PreToolUse`-hook и один `PostToolUse`-hook.
2. Подключи скрипты через `$CLAUDE_PROJECT_DIR`.
3. Проверь поведение на `Write(*.py)`.

## Итоги

- Актуальный формат — объект `hooks` с ключами событий
- `/hooks` остаётся удобной точкой входа
- Скрипты лучше хранить внутри проекта

## Проверь себя

<div class="quiz-block" data-quiz-id="u29-q1" data-answer="a">
  <div class="quiz-question">Где хранится проектный конфиг hooks?</div>
  <label><input type="radio" name="u29-q1" value="a"> .claude/settings.json</label>
  <label><input type="radio" name="u29-q1" value="b"> hooks.yaml</label>
  <label><input type="radio" name="u29-q1" value="c"> .mcp.json</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u29-q2" data-answer="b">
  <div class="quiz-question">В каких единицах задаётся timeout для command hook?</div>
  <label><input type="radio" name="u29-q2" value="a"> Миллисекунды</label>
  <label><input type="radio" name="u29-q2" value="b"> Секунды</label>
  <label><input type="radio" name="u29-q2" value="c"> Минуты</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u29-q3" data-answer="c">
  <div class="quiz-question">Зачем использовать `$CLAUDE_PROJECT_DIR` в command?</div>
  <label><input type="radio" name="u29-q3" value="a"> Чтобы ускорить модель</label>
  <label><input type="radio" name="u29-q3" value="b"> Чтобы скрыть ошибки JSON</label>
  <label><input type="radio" name="u29-q3" value="c"> Чтобы скрипты работали независимо от текущей директории</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
