---
title: "Урок 32. PreToolUse и PostToolUse хуки"
description: "Разбираем два ключевых хука: PreToolUse для валидации и блокировки действий, PostToolUse для логирования и форматирования результатов"
---

# PreToolUse и PostToolUse хуки

!!! info "Что ты узнаешь"
    - Когда срабатывают PreToolUse и PostToolUse
    - Как использовать PreToolUse для валидации и блокировки
    - Как использовать PostToolUse для логирования и модификации результатов
    - Чем отличаются эти два хука и когда выбирать каждый

## Введение

PreToolUse и PostToolUse — это два главных хука в системе hooks Claude Code. Они образуют пару «до и после»: PreToolUse срабатывает **перед** выполнением инструмента, а PostToolUse — **после**.

Эта пара покрывает большинство сценариев автоматизации. Хочешь запретить опасную команду? PreToolUse. Нужно записать результат? PostToolUse.

## PreToolUse: перед действием

PreToolUse вызывается до того, как Claude Code выполнит инструмент. На вход хук получает JSON с информацией о предстоящем действии через stdin.

### Что приходит на вход

```json
{
  "tool_name": "Bash",
  "tool_input": {
    "command": "rm -rf /tmp/old-files"
  }
}
```

### Что может сделать PreToolUse

У PreToolUse три основные задачи:

1. **Разрешить** действие (exit code 0, пустой stdout)
2. **Заблокировать** действие (exit code 2)
3. **Модифицировать контекст** (exit code 0, текст в stdout)

### Валидация команд

Вот пример — блокировка опасных команд:

```bash
#!/bin/bash
# ~/.claude/hooks/validate-bash.sh

# Читаем JSON из stdin
INPUT=$(cat)

# Извлекаем команду
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Проверяем на опасные паттерны
if echo "$COMMAND" | grep -qE 'rm\s+-rf\s+/(?!tmp)'; then
  echo "BLOCKED: Опасная команда rm -rf вне /tmp" >&2
  exit 2
fi

if echo "$COMMAND" | grep -qE 'DROP\s+TABLE|DROP\s+DATABASE'; then
  echo "BLOCKED: DROP-запросы запрещены" >&2
  exit 2
fi

# Всё в порядке — разрешаем
exit 0
```

Подключение:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/validate-bash.sh"
          }
        ]
      }
    ]
  }
}
```

### Валидация записи файлов

Можно контролировать, куда Claude Code записывает файлы:

```bash
#!/bin/bash
# ~/.claude/hooks/validate-write.sh

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Запрет записи в системные файлы
if echo "$FILE_PATH" | grep -qE '^/(etc|usr|bin|sbin)/'; then
  echo "BLOCKED: Запись в системные директории запрещена" >&2
  exit 2
fi

# Запрет перезаписи .env файлов
if echo "$FILE_PATH" | grep -qE '\.env$'; then
  echo "BLOCKED: Перезапись .env файлов запрещена" >&2
  exit 2
fi

exit 0
```

### Добавление контекста

PreToolUse может не блокировать, а дополнять контекст. Если скрипт выводит текст в stdout и завершается с кодом 0, этот текст добавляется к контексту Claude:

```bash
#!/bin/bash
# ~/.claude/hooks/add-context.sh

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Если используется npm — напоминаем про правила
if echo "$COMMAND" | grep -q "npm install"; then
  echo "Напоминание: используй --save-exact для фиксации версий"
fi

exit 0
```

## PostToolUse: после действия

PostToolUse вызывается после выполнения инструмента. Он получает тот же JSON с информацией о действии.

### Логирование

Самый частый сценарий — запись действий в лог:

```bash
#!/bin/bash
# ~/.claude/hooks/post-log.sh

TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$TIMESTAMP] $CLAUDE_TOOL_NAME completed (session: $CLAUDE_SESSION_ID)" \
  >> ~/.claude/logs/tools.log
```

### Форматирование результатов

PostToolUse может добавлять информацию к результату через stdout:

```bash
#!/bin/bash
# ~/.claude/hooks/post-write-info.sh

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -n "$FILE_PATH" ] && [ -f "$FILE_PATH" ]; then
  LINES=$(wc -l < "$FILE_PATH")
  SIZE=$(du -h "$FILE_PATH" | cut -f1)
  echo "Файл $FILE_PATH: $LINES строк, $SIZE"
fi

exit 0
```

### Автоматические действия после записи

Можно автоматически запускать линтер или форматтер после записи файла:

```bash
#!/bin/bash
# ~/.claude/hooks/post-write-lint.sh

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Форматируем Python-файлы
if echo "$FILE_PATH" | grep -qE '\.py$'; then
  if command -v black &> /dev/null; then
    black --quiet "$FILE_PATH" 2>/dev/null
    echo "Файл отформатирован через black"
  fi
fi

# Форматируем JS/TS файлы
if echo "$FILE_PATH" | grep -qE '\.(js|ts|jsx|tsx)$'; then
  if command -v prettier &> /dev/null; then
    prettier --write "$FILE_PATH" 2>/dev/null
    echo "Файл отформатирован через prettier"
  fi
fi

exit 0
```

## Сравнение PreToolUse и PostToolUse

| Характеристика | PreToolUse | PostToolUse |
|---|---|---|
| Когда срабатывает | До выполнения | После выполнения |
| Может заблокировать | Да (exit 2) | Нет |
| Может добавить контекст | Да (stdout) | Да (stdout) |
| Типичные задачи | Валидация, блокировка | Логирование, форматирование |
| Получает результат | Нет | Нет (но может прочитать файл) |

## Цепочки хуков

Можно комбинировать несколько хуков для одного события:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/validate-bash.sh"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/validate-write.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/post-log.sh"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/post-write-lint.sh"
          }
        ]
      }
    ]
  }
}
```

## Практика

1. Создай PreToolUse hook, который блокирует команды с `sudo`
2. Создай PostToolUse hook, который логирует все операции записи файлов
3. Добавь PreToolUse hook, который предупреждает при установке npm-пакетов без `--save-exact`
4. Проверь работу — запусти Claude Code и убедись, что хуки срабатывают

## Итоги

- PreToolUse срабатывает до выполнения инструмента и может заблокировать действие (exit 2)
- PostToolUse срабатывает после выполнения — подходит для логирования и дополнительных действий
- Оба хука получают JSON с информацией о действии через stdin
- Оба хука могут добавлять контекст через stdout (exit 0)
- Хуки можно комбинировать в цепочки для разных инструментов

## Проверь себя

<div class="quiz-block" data-quiz-id="u32-q1" data-answer="a" markdown>
  <div class="quiz-question">Когда срабатывает PreToolUse?</div>
  <label><input type="radio" name="u32-q1" value="a"> До выполнения инструмента</label>
  <label><input type="radio" name="u32-q1" value="b"> После выполнения инструмента</label>
  <label><input type="radio" name="u32-q1" value="c"> Одновременно с выполнением</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u32-q2" data-answer="c" markdown>
  <div class="quiz-question">Какой exit code блокирует действие в PreToolUse?</div>
  <label><input type="radio" name="u32-q2" value="a"> 0</label>
  <label><input type="radio" name="u32-q2" value="b"> 1</label>
  <label><input type="radio" name="u32-q2" value="c"> 2</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u32-q3" data-answer="b" markdown>
  <div class="quiz-question">Может ли PostToolUse заблокировать действие?</div>
  <label><input type="radio" name="u32-q3" value="a"> Да, через exit code 2</label>
  <label><input type="radio" name="u32-q3" value="b"> Нет, действие уже выполнено</label>
  <label><input type="radio" name="u32-q3" value="c"> Да, через exit code 1</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u32-q4" data-answer="a" markdown>
  <div class="quiz-question">Что происходит, когда PreToolUse выводит текст в stdout и завершается с exit 0?</div>
  <label><input type="radio" name="u32-q4" value="a"> Текст добавляется к контексту Claude</label>
  <label><input type="radio" name="u32-q4" value="b"> Действие блокируется</label>
  <label><input type="radio" name="u32-q4" value="c"> Текст игнорируется</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u32-q5" data-answer="c" markdown>
  <div class="quiz-question">Для чего лучше всего подходит PostToolUse?</div>
  <label><input type="radio" name="u32-q5" value="a"> Блокировка опасных команд</label>
  <label><input type="radio" name="u32-q5" value="b"> Валидация входных данных</label>
  <label><input type="radio" name="u32-q5" value="c"> Логирование и автоматическое форматирование</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
