---
title: "Урок 34. Переменные окружения в Hooks"
description: "Какие переменные окружения доступны в хуках Claude Code: CLAUDE_SESSION_ID, CLAUDE_TOOL_NAME, CLAUDE_TOOL_INPUT и другие"
---

# Переменные окружения в Hooks

!!! info "Что ты узнаешь"
    - Какие переменные окружения доступны в хуках
    - Для чего нужна каждая переменная
    - Как использовать переменные в реальных скриптах
    - Как отлаживать хуки с помощью переменных

## Введение

Когда Claude Code вызывает хук, он передаёт скрипту набор переменных окружения. Эти переменные содержат информацию о текущей сессии, инструменте, проекте и входных данных.

Благодаря переменным окружения хук знает контекст: какой инструмент вызван, в каком проекте работает Claude Code, какая сессия активна. Это позволяет писать гибкие скрипты, которые ведут себя по-разному в зависимости от ситуации.

## Список переменных

### CLAUDE_SESSION_ID

Уникальный идентификатор текущей сессии Claude Code. Каждый запуск `claude` создаёт новую сессию с уникальным ID.

```bash
echo "Session: $CLAUDE_SESSION_ID"
# Session: a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

**Зачем нужна:** для логирования и группировки действий по сессиям. Ты можешь отследить все действия одного запуска Claude Code.

### CLAUDE_TOOL_NAME

Имя инструмента, который вызывается или был вызван. Например: `Bash`, `Write`, `Read`, `Edit`, `Glob`, `Grep`.

```bash
echo "Tool: $CLAUDE_TOOL_NAME"
# Tool: Bash
```

**Зачем нужна:** для фильтрации действий. Можно создать один универсальный скрипт, который ведёт себя по-разному для разных инструментов.

### CLAUDE_TOOL_INPUT

Входные данные инструмента в формате JSON (строка).

```bash
echo "Input: $CLAUDE_TOOL_INPUT"
# Input: {"command":"npm test"}
```

**Зачем нужна:** для анализа того, что именно Claude Code собирается сделать. Можно извлечь конкретные поля через `jq`.

```bash
COMMAND=$(echo "$CLAUDE_TOOL_INPUT" | jq -r '.command // empty')
FILE_PATH=$(echo "$CLAUDE_TOOL_INPUT" | jq -r '.file_path // empty')
```

### CLAUDE_PROJECT_DIR

Абсолютный путь к директории проекта, в которой работает Claude Code.

```bash
echo "Project: $CLAUDE_PROJECT_DIR"
# Project: /home/user/my-project
```

**Зачем нужна:** для привязки логов к проекту, для проверки путей файлов относительно проекта.

### CLAUDE_NOTIFICATION

Текст уведомления. Доступна только в Notification hook.

```bash
echo "Message: $CLAUDE_NOTIFICATION"
# Message: Task completed successfully
```

**Зачем нужна:** для отображения в desktop-уведомлениях и звуковых оповещениях.

### CLAUDE_HOOK_EVENT

Тип события хука: `PreToolUse`, `PostToolUse`, `Notification` или `SubagentStop`.

```bash
echo "Event: $CLAUDE_HOOK_EVENT"
# Event: PreToolUse
```

**Зачем нужна:** если ты используешь один скрипт для нескольких типов хуков, эта переменная помогает определить контекст вызова.

## Использование переменных в скриптах

### Универсальный логгер

Один скрипт для логирования всех событий:

```bash
#!/bin/bash
# ~/.claude/hooks/universal-logger.sh

LOG_DIR="$HOME/.claude/logs"
mkdir -p "$LOG_DIR"

TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
LOG_FILE="$LOG_DIR/$(date '+%Y-%m-%d').log"

# Собираем все доступные переменные
cat >> "$LOG_FILE" <<EOF
[$TIMESTAMP]
  Event: $CLAUDE_HOOK_EVENT
  Session: $CLAUDE_SESSION_ID
  Tool: $CLAUDE_TOOL_NAME
  Project: $CLAUDE_PROJECT_DIR
  Input: $CLAUDE_TOOL_INPUT
---
EOF

exit 0
```

### Условная логика по инструменту

```bash
#!/bin/bash
# ~/.claude/hooks/smart-hook.sh

case "$CLAUDE_TOOL_NAME" in
  "Bash")
    COMMAND=$(echo "$CLAUDE_TOOL_INPUT" | jq -r '.command // empty')
    echo "Выполняется команда: $COMMAND"
    ;;
  "Write")
    FILE=$(echo "$CLAUDE_TOOL_INPUT" | jq -r '.file_path // empty')
    echo "Записывается файл: $FILE"
    ;;
  "Edit")
    FILE=$(echo "$CLAUDE_TOOL_INPUT" | jq -r '.file_path // empty')
    echo "Редактируется файл: $FILE"
    ;;
  *)
    echo "Инструмент: $CLAUDE_TOOL_NAME"
    ;;
esac

exit 0
```

### Фильтрация по проекту

Можно применять разные правила для разных проектов:

```bash
#!/bin/bash
# ~/.claude/hooks/project-rules.sh

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Строгие правила для production-проекта
if echo "$CLAUDE_PROJECT_DIR" | grep -q "production-api"; then
  if echo "$COMMAND" | grep -qE 'npm install|yarn add'; then
    echo "BLOCKED: Установка пакетов в production-проекте запрещена через Claude Code" >&2
    exit 2
  fi
fi

# Мягкие правила для dev-проекта
if echo "$CLAUDE_PROJECT_DIR" | grep -q "dev-playground"; then
  echo "Dev-проект: ограничения снижены"
fi

exit 0
```

### Аналитика по сессиям

```bash
#!/bin/bash
# ~/.claude/hooks/session-stats.sh

STATS_DIR="$HOME/.claude/stats"
STATS_FILE="$STATS_DIR/$CLAUDE_SESSION_ID.json"

mkdir -p "$STATS_DIR"

# Создаём файл статистики если его нет
if [ ! -f "$STATS_FILE" ]; then
  echo '{"tools":{}}' > "$STATS_FILE"
fi

# Увеличиваем счётчик для инструмента
TOOL="$CLAUDE_TOOL_NAME"
CURRENT=$(jq -r ".tools[\"$TOOL\"] // 0" "$STATS_FILE")
NEW_COUNT=$((CURRENT + 1))

jq ".tools[\"$TOOL\"] = $NEW_COUNT" "$STATS_FILE" > "${STATS_FILE}.tmp"
mv "${STATS_FILE}.tmp" "$STATS_FILE"

exit 0
```

## Отладка хуков

Переменные окружения помогают отлаживать хуки. Создай отладочный скрипт:

```bash
#!/bin/bash
# ~/.claude/hooks/debug-hook.sh

DEBUG_FILE="$HOME/.claude/debug.log"

echo "=== DEBUG $(date) ===" >> "$DEBUG_FILE"
echo "CLAUDE_HOOK_EVENT=$CLAUDE_HOOK_EVENT" >> "$DEBUG_FILE"
echo "CLAUDE_SESSION_ID=$CLAUDE_SESSION_ID" >> "$DEBUG_FILE"
echo "CLAUDE_TOOL_NAME=$CLAUDE_TOOL_NAME" >> "$DEBUG_FILE"
echo "CLAUDE_TOOL_INPUT=$CLAUDE_TOOL_INPUT" >> "$DEBUG_FILE"
echo "CLAUDE_PROJECT_DIR=$CLAUDE_PROJECT_DIR" >> "$DEBUG_FILE"
echo "CLAUDE_NOTIFICATION=$CLAUDE_NOTIFICATION" >> "$DEBUG_FILE"

# Также логируем stdin
echo "STDIN:" >> "$DEBUG_FILE"
cat >> "$DEBUG_FILE"
echo "" >> "$DEBUG_FILE"
echo "===================" >> "$DEBUG_FILE"

exit 0
```

!!! tip "Совет по отладке"
    Подключи debug-hook временно ко всем событиям (matcher: ""), выполни несколько действий в Claude Code, затем изучи `~/.claude/debug.log`. Это покажет, какие данные реально приходят в хук.

## Сводная таблица

| Переменная | Описание | Доступна в |
|---|---|---|
| `CLAUDE_SESSION_ID` | ID сессии | Все хуки |
| `CLAUDE_TOOL_NAME` | Имя инструмента | PreToolUse, PostToolUse |
| `CLAUDE_TOOL_INPUT` | JSON входных данных | PreToolUse, PostToolUse |
| `CLAUDE_PROJECT_DIR` | Путь к проекту | Все хуки |
| `CLAUDE_NOTIFICATION` | Текст уведомления | Notification |
| `CLAUDE_HOOK_EVENT` | Тип события | Все хуки |

## Практика

1. Создай универсальный логгер, используя все доступные переменные
2. Напиши хук, который применяет разные правила для разных проектов на основе `CLAUDE_PROJECT_DIR`
3. Создай отладочный скрипт и изучи, какие данные приходят в хук
4. Напиши скрипт статистики, который считает количество вызовов каждого инструмента за сессию

## Итоги

- Claude Code передаёт в хуки набор переменных окружения: session ID, tool name, input, project dir и др.
- `CLAUDE_TOOL_INPUT` содержит JSON с входными данными — разбирай его через `jq`
- `CLAUDE_PROJECT_DIR` позволяет применять разные правила для разных проектов
- `CLAUDE_SESSION_ID` помогает группировать логи и статистику по сессиям
- Переменные окружения — основной инструмент для написания гибких хуков

## Проверь себя

<div class="quiz-block" data-quiz-id="u34-q1" data-answer="c" markdown>
  <div class="quiz-question">Какая переменная содержит имя вызываемого инструмента?</div>
  <label><input type="radio" name="u34-q1" value="a"> $CLAUDE_SESSION_ID</label>
  <label><input type="radio" name="u34-q1" value="b"> $CLAUDE_HOOK_EVENT</label>
  <label><input type="radio" name="u34-q1" value="c"> $CLAUDE_TOOL_NAME</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u34-q2" data-answer="b" markdown>
  <div class="quiz-question">В каком формате хранятся данные в CLAUDE_TOOL_INPUT?</div>
  <label><input type="radio" name="u34-q2" value="a"> Обычный текст</label>
  <label><input type="radio" name="u34-q2" value="b"> JSON</label>
  <label><input type="radio" name="u34-q2" value="c"> YAML</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u34-q3" data-answer="a" markdown>
  <div class="quiz-question">В каком хуке доступна переменная CLAUDE_NOTIFICATION?</div>
  <label><input type="radio" name="u34-q3" value="a"> Только в Notification</label>
  <label><input type="radio" name="u34-q3" value="b"> Во всех хуках</label>
  <label><input type="radio" name="u34-q3" value="c"> В PreToolUse и PostToolUse</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u34-q4" data-answer="c" markdown>
  <div class="quiz-question">Для чего используется CLAUDE_PROJECT_DIR?</div>
  <label><input type="radio" name="u34-q4" value="a"> Для хранения логов</label>
  <label><input type="radio" name="u34-q4" value="b"> Для идентификации сессии</label>
  <label><input type="radio" name="u34-q4" value="c"> Для определения директории проекта и применения специфичных правил</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u34-q5" data-answer="b" markdown>
  <div class="quiz-question">С помощью какой утилиты удобнее всего разбирать CLAUDE_TOOL_INPUT?</div>
  <label><input type="radio" name="u34-q5" value="a"> sed</label>
  <label><input type="radio" name="u34-q5" value="b"> jq</label>
  <label><input type="radio" name="u34-q5" value="c"> awk</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
