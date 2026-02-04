---
title: "Урок 40. Headless-режим Claude Code"
description: "Как запускать Claude Code без интерактивного режима с помощью флага -p для автоматизации и CI/CD"
---

# Headless-режим — Claude Code без интерактива

!!! info "Что ты узнаешь"
    - Что такое headless-режим и зачем он нужен
    - Как использовать флаг `-p` для запуска без интерактива
    - Какие флаги доступны: `--output-format`, `--model` и другие
    - Как интегрировать Claude Code в CI/CD-пайплайны

## Введение

По умолчанию Claude Code работает в интерактивном режиме — ты вводишь промпт, получаешь ответ, продолжаешь диалог. Но что, если нужно запустить Claude Code из скрипта? Или встроить его в CI/CD-пайплайн? Для этого есть headless-режим.

Headless-режим запускается флагом `-p` (от слова "print"). Claude Code получает промпт, выполняет задачу и завершается. Без интерактива, без ожидания ввода.

## Базовый синтаксис

```bash
claude -p "твой промпт"
```

Пример:

```bash
claude -p "Объясни, что делает функция main в файле app.py"
```

Claude Code прочитает файл, сформирует ответ и выведет его в stdout. После этого процесс завершится.

## Основные флаги

### `-p` / `--print`

Главный флаг headless-режима. Принимает промпт как строку:

```bash
claude -p "Добавь docstring ко всем функциям в src/utils.py"
```

### `--output-format`

Управляет форматом вывода. Доступные значения:

- `text` — обычный текст (по умолчанию)
- `json` — структурированный JSON
- `stream-json` — потоковый JSON (каждая строка — отдельный JSON-объект)

```bash
claude -p "Перечисли все TODO в проекте" --output-format json
```

Пример JSON-вывода:

```json
{
  "result": "Найдены следующие TODO:\n1. src/api.py:12 — TODO: добавить валидацию\n2. src/db.py:45 — TODO: оптимизировать запрос",
  "cost_usd": 0.023,
  "duration_ms": 4521,
  "turns": 1
}
```

### `--model`

Позволяет указать конкретную модель:

```bash
claude -p "Проанализируй код" --model claude-sonnet-4-20250514
```

### `--allowedTools`

Ограничивает набор инструментов, которые агент может использовать:

```bash
claude -p "Проверь стиль кода" --allowedTools Read,Grep
```

### `--max-turns`

Ограничивает количество шагов агента:

```bash
claude -p "Исправь баг в auth.py" --max-turns 5
```

## Передача данных через stdin

Можно передать данные через пайп:

```bash
cat error.log | claude -p "Проанализируй эти ошибки и предложи исправления"
```

```bash
git diff | claude -p "Напиши commit message для этих изменений"
```

Это мощный приём — ты комбинируешь Unix-утилиты с возможностями агента.

## Использование в CI/CD

Headless-режим идеально подходит для автоматизации. Вот пример для GitHub Actions:

```yaml
name: Code Review with Claude
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code
      - name: Review changes
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          git diff origin/main...HEAD | claude -p \
            "Проведи code review этих изменений. \
             Укажи баги, проблемы безопасности и стиля." \
            --output-format json > review.json
```

## Примеры сценариев

**Генерация документации:**

```bash
claude -p "Сгенерируй README.md для этого проекта" > README.md
```

**Анализ кода перед деплоем:**

```bash
claude -p "Есть ли в проекте уязвимости безопасности?" --output-format json
```

**Автоматический commit message:**

```bash
git diff --staged | claude -p "Напиши conventional commit message"
```

**Массовый рефакторинг:**

```bash
claude -p "Замени все var на const/let во всех JS-файлах" --max-turns 20
```

## Комбинирование флагов

Флаги можно комбинировать:

```bash
claude -p "Найди и исправь все TODO в проекте" \
  --output-format json \
  --model claude-sonnet-4-20250514 \
  --max-turns 10
```

!!! tip "Совет"
    Для CI/CD всегда используй `--output-format json`. Это позволяет парсить результат и принимать решения на основе вывода — например, фейлить билд, если Claude нашёл критические проблемы.

## Практика

1. Запусти `claude -p "Покажи структуру проекта"` в любом проекте
2. Попробуй передать вывод `git diff` через пайп
3. Используй `--output-format json` и изучи структуру ответа
4. Напиши простой bash-скрипт, который анализирует код с помощью Claude Code

## Итоги

- Headless-режим запускается флагом `-p` — Claude Code работает без интерактива
- `--output-format json` даёт структурированный вывод для автоматизации
- `--model` позволяет выбрать конкретную модель
- Данные можно передавать через stdin (пайп)
- Идеально подходит для CI/CD, скриптов и автоматизации

## Проверь себя

<div class="quiz-block" data-quiz-id="u40-q1" data-answer="a" markdown>
  <div class="quiz-question">Какой флаг запускает Claude Code в headless-режиме?</div>
  <label><input type="radio" name="u40-q1" value="a"> -p</label>
  <label><input type="radio" name="u40-q1" value="b"> -h</label>
  <label><input type="radio" name="u40-q1" value="c"> --headless</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u40-q2" data-answer="b" markdown>
  <div class="quiz-question">Какой формат вывода лучше для CI/CD?</div>
  <label><input type="radio" name="u40-q2" value="a"> text</label>
  <label><input type="radio" name="u40-q2" value="b"> json</label>
  <label><input type="radio" name="u40-q2" value="c"> xml</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u40-q3" data-answer="c" markdown>
  <div class="quiz-question">Как передать данные в Claude Code через пайп?</div>
  <label><input type="radio" name="u40-q3" value="a"> claude --input file.txt</label>
  <label><input type="radio" name="u40-q3" value="b"> claude -p "промпт" < file.txt</label>
  <label><input type="radio" name="u40-q3" value="c"> cat file.txt | claude -p "промпт"</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u40-q4" data-answer="a" markdown>
  <div class="quiz-question">Что происходит после выполнения команды в headless-режиме?</div>
  <label><input type="radio" name="u40-q4" value="a"> Процесс завершается автоматически</label>
  <label><input type="radio" name="u40-q4" value="b"> Claude ждёт следующий промпт</label>
  <label><input type="radio" name="u40-q4" value="c"> Открывается интерактивный режим</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u40-q5" data-answer="b" markdown>
  <div class="quiz-question">Какой флаг ограничивает количество шагов агента?</div>
  <label><input type="radio" name="u40-q5" value="a"> --limit</label>
  <label><input type="radio" name="u40-q5" value="b"> --max-turns</label>
  <label><input type="radio" name="u40-q5" value="c"> --steps</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
