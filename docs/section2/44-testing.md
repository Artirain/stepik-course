---
title: "Урок 44. Тестинг"
description: "Выстраивание проверяемого воркфлоу: тестинг результатов Claude Code, интеграция с CI и автоматизация"
---

# Тестинг — выстраивание проверяемого воркфлоу

!!! info "Что ты узнаешь"
    - Зачем тестировать результаты работы ИИ
    - Как интегрировать тесты в рабочий процесс с Claude Code
    - Автоматизация тестирования через hooks и headless-режим

## Введение

ИИ может ошибаться. Даже отлично написанный промпт не гарантирует 100% корректный код. Тестинг — твоя страховка. Выстраивание проверяемого воркфлоу превращает Claude Code из «генератора кода» в надёжный инструмент.

## Стратегии тестирования

### 1. Запуск тестов после каждого изменения

Самый простой подход — попроси Claude Code запустить тесты:

```
Напиши функцию сортировки и запусти тесты.
```

Claude Code напишет код, запустит `npm test` или `pytest`, увидит результат и исправит ошибки.

### 2. Промпты для тестирования

```
# Сгенерировать тесты
Напиши unit-тесты для функции calculateTotal в src/utils.ts

# Запустить и исправить
Запусти тесты. Если что-то упало — исправь код и запусти снова.

# Полный цикл
Добавь функцию валидации, напиши тесты и убедись, что все проходят.
```

### 3. Автотестирование через hooks

Настрой PostToolUse хук, чтобы тесты запускались автоматически после записи файлов:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write(*.test.ts)",
        "command": "npm test -- --bail 2>&1 | tail -20"
      }
    ]
  }
}
```

### 4. Headless-режим для CI/CD

Интегрируй Claude Code в CI-пайплайн:

```bash
# В GitHub Actions / GitLab CI
claude -p "Запусти все тесты и выведи результат" --output-format json
```

## Чеклист верификации

!!! tip "Проверяй после каждого изменения"
    - [ ] Код компилируется без ошибок
    - [ ] Тесты проходят
    - [ ] Линтер не ругается
    - [ ] Типы корректны (TypeScript)
    - [ ] Логика соответствует задаче (ручная проверка)

## Интеграция с фреймворками

=== "JavaScript / TypeScript"

    ```bash
    # Jest
    npm test

    # Vitest
    npx vitest run
    ```

=== "Python"

    ```bash
    # pytest
    pytest -v

    # unittest
    python -m pytest
    ```

## Практика

1. Попроси Claude Code написать функцию и тесты для неё
2. Запусти тесты — убедись, что проходят
3. Настрой PostToolUse хук для автозапуска тестов
4. Попробуй headless-режим: `claude -p "Запусти тесты"`

## Итоги

- Всегда тестируй результаты Claude Code
- Промпты «напиши и запусти тесты» — базовая стратегия
- PostToolUse хук — автоматический запуск тестов после записи
- Headless-режим (`-p`) — для интеграции с CI/CD
- Чеклист: компиляция → тесты → линтер → типы → логика

## Проверь себя

<div class="quiz-block" data-quiz-id="u44-q1" data-answer="c">
  <div class="quiz-question">Зачем тестировать результаты Claude Code?</div>
  <label><input type="radio" name="u44-q1" value="a"> Это требование лицензии</label>
  <label><input type="radio" name="u44-q1" value="b"> Claude Code сам не запускает тесты</label>
  <label><input type="radio" name="u44-q1" value="c"> ИИ может ошибаться, тесты — страховка</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u44-q2" data-answer="a">
  <div class="quiz-question">Какой хук подходит для автозапуска тестов после записи файла?</div>
  <label><input type="radio" name="u44-q2" value="a"> PostToolUse</label>
  <label><input type="radio" name="u44-q2" value="b"> SessionStart</label>
  <label><input type="radio" name="u44-q2" value="c"> PreToolUse</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u44-q3" data-answer="b">
  <div class="quiz-question">Как запустить Claude Code в CI/CD-пайплайне?</div>
  <label><input type="radio" name="u44-q3" value="a"> claude --ci</label>
  <label><input type="radio" name="u44-q3" value="b"> claude -p "промпт"</label>
  <label><input type="radio" name="u44-q3" value="c"> claude run tests</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
