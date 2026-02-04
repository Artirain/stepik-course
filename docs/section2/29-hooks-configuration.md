---
title: "Урок 29. Настройка Hooks через /hooks"
description: "Как настраивать хуки через интерактивный конфигуратор и выносить логику в sh-скрипты"
---

# Настройка Hooks через /hooks и вынос команд в sh

!!! info "Что ты узнаешь"
    - Как использовать интерактивный конфигуратор `/hooks`
    - Как выносить логику хуков в отдельные sh-скрипты
    - Структура хука в settings.json

## Введение

Claude Code предоставляет команду `/hooks` — интерактивный конфигуратор для создания и редактирования хуков. Это самый простой способ настроить автоматизацию, не редактируя JSON вручную.

## Конфигурация через /hooks

Набери в сессии Claude Code:

```
/hooks
```

Откроется интерактивное меню:

1. **Выбери событие** — PreToolUse, PostToolUse, SessionStart и т.д.
2. **Укажи команду** — bash-команда или путь к скрипту
3. **Настрой matchers** — на какие инструменты реагировать (опционально)
4. **Сохрани** — хук добавится в `.claude/settings.json`

## Структура хука в settings.json

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write(*.py)",
        "command": "echo 'Файл Python будет изменён'",
        "timeout": 5000
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write",
        "command": ".claude/hooks/format.sh",
        "timeout": 10000
      }
    ]
  }
}
```

### Поля

| Поле | Описание |
|------|----------|
| `matcher` | Паттерн: на какие инструменты срабатывать |
| `command` | Bash-команда или путь к скрипту |
| `timeout` | Таймаут в миллисекундах (по умолчанию 60000) |

## Вынос в sh-скрипты

Для сложной логики выноси команды в отдельные файлы:

```bash
# .claude/hooks/format.sh
#!/bin/bash

# Форматируем Python-файл после записи
if [[ "$CLAUDE_FILE_PATH" == *.py ]]; then
    ruff format "$CLAUDE_FILE_PATH"
    ruff check --fix "$CLAUDE_FILE_PATH"
fi
```

Не забудь сделать скрипт исполняемым:

```bash
chmod +x .claude/hooks/format.sh
```

!!! tip "Совет"
    Храни скрипты в `.claude/hooks/` — так они рядом с конфигом и попадают в git.

## Практика

1. Запусти Claude Code и набери `/hooks`
2. Создай PostToolUse хук на событие Write
3. Укажи команду `echo "Файл записан!"`
4. Проверь, что хук срабатывает при записи файла

## Итоги

- `/hooks` — интерактивный конфигуратор хуков
- Хуки хранятся в `.claude/settings.json`
- Сложную логику выноси в `.claude/hooks/*.sh`
- Каждый хук имеет matcher, command и timeout

## Проверь себя

<div class="quiz-block" data-quiz-id="u29-q1" data-answer="b">
  <div class="quiz-question">Какая команда открывает конфигуратор хуков?</div>
  <label><input type="radio" name="u29-q1" value="a"> /config hooks</label>
  <label><input type="radio" name="u29-q1" value="b"> /hooks</label>
  <label><input type="radio" name="u29-q1" value="c"> /settings hooks</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u29-q2" data-answer="a">
  <div class="quiz-question">Где хранится конфигурация хуков?</div>
  <label><input type="radio" name="u29-q2" value="a"> .claude/settings.json</label>
  <label><input type="radio" name="u29-q2" value="b"> hooks.json</label>
  <label><input type="radio" name="u29-q2" value="c"> .claude/hooks.yml</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u29-q3" data-answer="c">
  <div class="quiz-question">Зачем выносить логику хука в .sh файл?</div>
  <label><input type="radio" name="u29-q3" value="a"> Это обязательное требование</label>
  <label><input type="radio" name="u29-q3" value="b"> Скрипты работают быстрее</label>
  <label><input type="radio" name="u29-q3" value="c"> Для сложной логики, которая не помещается в одну строку</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
