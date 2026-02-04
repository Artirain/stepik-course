---
title: "Урок 35. Matchers: wildcard и паттерны"
description: "Как использовать matchers для точного выбора инструментов: wildcard *, конкретные имена, паттерны с аргументами вроде Bash(npm *) и Write(*.py)"
---

# Matchers: wildcard и паттерны

!!! info "Что ты узнаешь"
    - Что такое matcher и как он фильтрует хуки
    - Как работает wildcard `*`
    - Как задавать паттерны с аргументами: `Bash(npm *)`, `Write(*.py)`
    - Как комбинировать несколько matchers

## Введение

Matcher определяет, для каких инструментов сработает хук. Без матчера тебе пришлось бы внутри скрипта проверять имя инструмента вручную. С матчером Claude Code сам решает, когда вызывать хук, а когда — нет.

Matchers поддерживают паттерны — от простого wildcard `*` до точных фильтров вроде `Bash(git push *)`. Это даёт тебе тонкий контроль без написания лишнего кода.

## Пустой matcher

Пустая строка `""` или отсутствие matcher — хук срабатывает для **всех** инструментов.

```json
{
  "matcher": "",
  "hooks": [
    {
      "type": "command",
      "command": "bash ~/.claude/hooks/log-all.sh"
    }
  ]
}
```

Это полезно для логирования, аналитики и уведомлений, где ты хочешь отслеживать всё.

## Wildcard `*`

Символ `*` работает аналогично пустому matcher — срабатывает на все инструменты:

```json
{
  "matcher": "*",
  "hooks": [
    {
      "type": "command",
      "command": "bash ~/.claude/hooks/log-all.sh"
    }
  ]
}
```

!!! note "Разница между `""` и `*`"
    Функционально `""` и `*` работают одинаково — оба матчат все инструменты. Используй то, что кажется понятнее в контексте.

## Точное имя инструмента

Указание имени инструмента — самый частый тип matcher. Хук срабатывает только для конкретного инструмента.

### Доступные имена инструментов

| Имя | Описание |
|---|---|
| `Bash` | Выполнение команд в терминале |
| `Write` | Создание и запись файлов |
| `Edit` | Редактирование существующих файлов |
| `Read` | Чтение файлов |
| `Glob` | Поиск файлов по паттерну |
| `Grep` | Поиск в содержимом файлов |
| `WebFetch` | Запросы к URL |
| `TodoWrite` | Управление списком задач |
| `NotebookEdit` | Редактирование Jupyter notebooks |

### Примеры

Хук только для Bash:

```json
{
  "matcher": "Bash",
  "hooks": [
    {
      "type": "command",
      "command": "bash ~/.claude/hooks/validate-bash.sh"
    }
  ]
}
```

Хук только для Write:

```json
{
  "matcher": "Write",
  "hooks": [
    {
      "type": "command",
      "command": "bash ~/.claude/hooks/validate-write.sh"
    }
  ]
}
```

## Паттерны с аргументами

Самая мощная возможность matchers — фильтрация по содержимому входных данных. Формат: `ToolName(pattern)`.

### Bash с фильтрацией по команде

```json
{
  "matcher": "Bash(npm *)",
  "hooks": [
    {
      "type": "command",
      "command": "bash ~/.claude/hooks/validate-npm.sh"
    }
  ]
}
```

Этот хук сработает только когда Claude Code вызывает Bash с командой, начинающейся с `npm`.

Ещё примеры:

```json
{
  "matcher": "Bash(git *)"
}
```

Сработает на `git push`, `git commit`, `git checkout` и любую другую git-команду.

```json
{
  "matcher": "Bash(docker *)"
}
```

Сработает на `docker build`, `docker run`, `docker compose up` и т.д.

### Write с фильтрацией по расширению

```json
{
  "matcher": "Write(*.py)",
  "hooks": [
    {
      "type": "command",
      "command": "bash ~/.claude/hooks/lint-python.sh"
    }
  ]
}
```

Хук сработает только при записи Python-файлов. Идеально для автоматического линтинга.

Другие примеры:

```json
{
  "matcher": "Write(*.ts)"
}
```

Только TypeScript-файлы.

```json
{
  "matcher": "Write(*.test.*)"
}
```

Только тестовые файлы.

```json
{
  "matcher": "Write(*.md)"
}
```

Только Markdown-файлы.

### Bash с конкретной командой

```json
{
  "matcher": "Bash(rm *)"
}
```

Сработает при любой команде удаления.

```json
{
  "matcher": "Bash(sudo *)"
}
```

Сработает при любом использовании sudo.

## Комбинация нескольких matchers

В массиве хуков можно указать несколько записей с разными matchers:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash(rm *)",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/block-rm.sh"
          }
        ]
      },
      {
        "matcher": "Bash(sudo *)",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/block-sudo.sh"
          }
        ]
      },
      {
        "matcher": "Write(*.env*)",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/block-env-write.sh"
          }
        ]
      },
      {
        "matcher": "Write(*.py)",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/lint-python.sh"
          }
        ]
      }
    ]
  }
}
```

При вызове инструмента Claude Code проверяет **все** matchers по порядку. Если действие совпадает с несколькими — вызываются все подходящие хуки.

## Примеры реальных конфигураций

### Безопасность проекта

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash(rm *)",
        "hooks": [{"type": "command", "command": "echo 'BLOCKED: rm запрещён' >&2 && exit 2"}]
      },
      {
        "matcher": "Bash(sudo *)",
        "hooks": [{"type": "command", "command": "echo 'BLOCKED: sudo запрещён' >&2 && exit 2"}]
      },
      {
        "matcher": "Bash(git push *--force*)",
        "hooks": [{"type": "command", "command": "echo 'BLOCKED: force push запрещён' >&2 && exit 2"}]
      }
    ]
  }
}
```

### Автоформатирование

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write(*.py)",
        "hooks": [{"type": "command", "command": "bash ~/.claude/hooks/format-python.sh"}]
      },
      {
        "matcher": "Write(*.js)",
        "hooks": [{"type": "command", "command": "bash ~/.claude/hooks/format-js.sh"}]
      },
      {
        "matcher": "Write(*.ts)",
        "hooks": [{"type": "command", "command": "bash ~/.claude/hooks/format-ts.sh"}]
      }
    ]
  }
}
```

### Раздельное логирование

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{"type": "command", "command": "bash ~/.claude/hooks/log-bash.sh"}]
      },
      {
        "matcher": "Write",
        "hooks": [{"type": "command", "command": "bash ~/.claude/hooks/log-write.sh"}]
      },
      {
        "matcher": "Edit",
        "hooks": [{"type": "command", "command": "bash ~/.claude/hooks/log-edit.sh"}]
      }
    ]
  }
}
```

## Порядок проверки matchers

Matchers проверяются в порядке их указания в массиве. Если действие подходит под несколько matchers, вызываются все подходящие хуки. Если хотя бы один из PreToolUse хуков вернёт exit 2, действие будет заблокировано.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "*",
        "hooks": [{"type": "command", "command": "bash ~/.claude/hooks/log-all.sh"}]
      },
      {
        "matcher": "Bash(rm *)",
        "hooks": [{"type": "command", "command": "echo 'BLOCKED' >&2 && exit 2"}]
      }
    ]
  }
}
```

В этом примере при `rm -rf temp/` сначала сработает логирование (matcher `*`), а затем — блокировка (matcher `Bash(rm *)`).

## Практика

1. Настрой matcher `Bash(git *)` для логирования всех git-операций
2. Создай хук с matcher `Write(*.env*)` для блокировки записи в .env файлы
3. Настрой автоформатирование для Python-файлов через matcher `Write(*.py)`
4. Комбинируй несколько matchers: блокировка + логирование + форматирование

## Итоги

- Пустой matcher `""` или `*` — хук срабатывает для всех инструментов
- Точное имя (`Bash`, `Write`) — хук срабатывает для конкретного инструмента
- Паттерны с аргументами (`Bash(npm *)`, `Write(*.py)`) — тонкая фильтрация
- Несколько matchers в массиве — можно настроить разные хуки для разных ситуаций
- При нескольких совпадениях вызываются все подходящие хуки по порядку

## Проверь себя

<div class="quiz-block" data-quiz-id="u35-q1" data-answer="b" markdown>
  <div class="quiz-question">Что означает matcher "" (пустая строка)?</div>
  <label><input type="radio" name="u35-q1" value="a"> Хук не будет срабатывать</label>
  <label><input type="radio" name="u35-q1" value="b"> Хук сработает для всех инструментов</label>
  <label><input type="radio" name="u35-q1" value="c"> Произойдёт ошибка</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u35-q2" data-answer="c" markdown>
  <div class="quiz-question">Какой matcher сработает при записи Python-файлов?</div>
  <label><input type="radio" name="u35-q2" value="a"> Bash(*.py)</label>
  <label><input type="radio" name="u35-q2" value="b"> Python(*)</label>
  <label><input type="radio" name="u35-q2" value="c"> Write(*.py)</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u35-q3" data-answer="a" markdown>
  <div class="quiz-question">Какой matcher отловит команду "npm install express"?</div>
  <label><input type="radio" name="u35-q3" value="a"> Bash(npm *)</label>
  <label><input type="radio" name="u35-q3" value="b"> Write(npm *)</label>
  <label><input type="radio" name="u35-q3" value="c"> Bash(install *)</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u35-q4" data-answer="c" markdown>
  <div class="quiz-question">Что произойдёт, если действие совпадает с двумя matchers, и один из них возвращает exit 2?</div>
  <label><input type="radio" name="u35-q4" value="a"> Сработает только первый matcher</label>
  <label><input type="radio" name="u35-q4" value="b"> Оба хука пропускаются</label>
  <label><input type="radio" name="u35-q4" value="c"> Действие будет заблокировано</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u35-q5" data-answer="b" markdown>
  <div class="quiz-question">Какой формат используется для паттернов с аргументами?</div>
  <label><input type="radio" name="u35-q5" value="a"> ToolName[pattern]</label>
  <label><input type="radio" name="u35-q5" value="b"> ToolName(pattern)</label>
  <label><input type="radio" name="u35-q5" value="c"> ToolName{pattern}</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
