---
title: "Урок 30. Хук SessionStart"
description: "Как использовать SessionStart для инициализации контекста и быстрых проверок проекта"
last_verified: "2026-03-01"
---

# SessionStart: автоматическая инициализация сессии

## Введение

`SessionStart` срабатывает при старте новой сессии и при возобновлении существующей. Это хорошее место для быстрой диагностики проекта и полезного контекста.

## Пример конфигурации

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/session-start.sh",
            "timeout": 10
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

cd "$CLAUDE_PROJECT_DIR"

echo "=== SessionStart ==="
echo "Branch: $(git branch --show-current 2>/dev/null || echo n/a)"
echo "Changed files: $(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')"
```

Что скрипт печатает в stdout, Claude может учитывать как контекст.

## Советы

- Делай `SessionStart` быстрым
- Не добавляй в stdout шум
- Для тяжёлых действий используй отдельные ручные команды

## Проверь себя

<div class="quiz-block" data-quiz-id="u30-q1" data-answer="a">
  <div class="quiz-question">Когда срабатывает SessionStart?</div>
  <label><input type="radio" name="u30-q1" value="a"> При старте и возобновлении сессии</label>
  <label><input type="radio" name="u30-q1" value="b"> Только при завершении сессии</label>
  <label><input type="radio" name="u30-q1" value="c"> Только после каждого Write</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u30-q2" data-answer="b">
  <div class="quiz-question">Где задаётся команда SessionStart в settings.json?</div>
  <label><input type="radio" name="u30-q2" value="a"> hooks.PreToolUse</label>
  <label><input type="radio" name="u30-q2" value="b"> hooks.SessionStart</label>
  <label><input type="radio" name="u30-q2" value="c"> hooks.Startup</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u30-q3" data-answer="c">
  <div class="quiz-question">Какой принцип важен для SessionStart?</div>
  <label><input type="radio" name="u30-q3" value="a"> Делать как можно дольше и подробнее</label>
  <label><input type="radio" name="u30-q3" value="b"> Никогда не использовать stdout</label>
  <label><input type="radio" name="u30-q3" value="c"> Держать hook быстрым и полезным</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
