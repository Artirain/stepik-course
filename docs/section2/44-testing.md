---
title: "Урок 44. Тестинг"
description: "Проверяемый workflow с Claude Code: тесты, hooks и CI"
last_verified: "2026-03-01"
---

# Тестинг: обязательный слой над AI-правками

!!! info "Что ты узнаешь"
    - Почему тестирование критично при работе с AI-ассистентом
    - Как автоматизировать тесты через `PostToolUse` hooks
    - Как использовать headless-режим в CI/CD пайплайне

## Введение

Claude Code ускоряет разработку, но не заменяет проверку качества. Надёжный workflow: кодогенерация -> автоматические проверки -> ручная валидация.

## Базовый цикл

1. Сформулируй задачу с явным требованием тестов.
2. Запусти тесты и линтер.
3. Исправь падения.
4. Повтори до зелёного состояния.

## Автотесты через PostToolUse

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write(*.test.ts)|Write(*.spec.ts)|Write(*.py)",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/run-tests.sh",
            "timeout": 120
          }
        ]
      }
    ]
  }
}
```

`run-tests.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

cd "$CLAUDE_PROJECT_DIR"

if [[ -f package.json ]]; then
  npm test -- --bail
elif [[ -f pyproject.toml || -f requirements.txt ]]; then
  pytest -q
fi
```

## Headless для CI

```bash
claude -p "Проверь diff, предложи риски и список тестов" --output-format json
```

Для CI лучше использовать `--output-format json`, чтобы парсить результат машинно.

## Мини-чеклист

- [ ] сборка проходит
- [ ] тесты зелёные
- [ ] линтер зелёный
- [ ] нет регрессий в критичных сценариях

## Практика

1. Подключи `PostToolUse` hook для автоматического запуска тестов при записи тестовых файлов.
2. Запусти `claude -p "Напиши тест для функции X" --output-format json` и проверь JSON-вывод.
3. Пройди мини-чеклист выше для одного из своих проектов.

## Итоги

- AI-правки без тестов = высокий риск
- hooks позволяют автоматически запускать проверки
- headless-режим хорошо ложится в CI-пайплайны

## Проверь себя

<div class="quiz-block" data-quiz-id="u44-q1" data-answer="c">
  <div class="quiz-question">Почему тесты обязательны при работе с Claude Code?</div>
  <label><input type="radio" name="u44-q1" value="a"> Потому что так требует npm</label>
  <label><input type="radio" name="u44-q1" value="b"> Потому что иначе не работает /hooks</label>
  <label><input type="radio" name="u44-q1" value="c"> Потому что AI-изменения нужно проверять на регрессии</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u44-q2" data-answer="a">
  <div class="quiz-question">Какой hook обычно используют для запуска тестов после изменений?</div>
  <label><input type="radio" name="u44-q2" value="a"> PostToolUse</label>
  <label><input type="radio" name="u44-q2" value="b"> SessionEnd</label>
  <label><input type="radio" name="u44-q2" value="c"> PreCompact</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u44-q3" data-answer="b">
  <div class="quiz-question">Какой формат вывода удобен для CI при запуске `claude -p`?</div>
  <label><input type="radio" name="u44-q3" value="a"> markdown</label>
  <label><input type="radio" name="u44-q3" value="b"> json</label>
  <label><input type="radio" name="u44-q3" value="c"> xml</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
