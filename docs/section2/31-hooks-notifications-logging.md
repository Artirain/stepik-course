---
title: "Урок 31. Уведомления и логирование через Hooks"
description: "Как настроить звуковые и desktop-уведомления через Notification hook, а также логирование действий через PostToolUse"
---

# Уведомления и логирование через Hooks

!!! info "Что ты узнаешь"
    - Как работает Notification hook
    - Как настроить звуковые и desktop-уведомления
    - Как логировать действия Claude Code через PostToolUse
    - Как создать полноценную систему мониторинга

## Введение

Представь: ты запустил Claude Code на длинную задачу и переключился на другое окно. Прошло 10 минут, задача выполнена — но ты об этом не знаешь. Сидишь, ждёшь, периодически переключаешься проверить.

Notification hook решает эту проблему. Ты получаешь уведомление в тот момент, когда Claude Code нуждается во внимании — будь то завершение задачи, запрос подтверждения или ошибка.

А логирование через PostToolUse позволяет вести историю всех действий агента. Это полезно для отладки, аудита и понимания того, что именно делал Claude Code.

## Notification hook

Notification hook срабатывает, когда Claude Code отправляет уведомление пользователю. Типичные сценарии:

- Задача завершена
- Требуется подтверждение действия
- Произошла ошибка

### Базовая настройка

Добавь в `.claude/settings.json`:

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "notify-send 'Claude Code' \"$CLAUDE_NOTIFICATION\""
          }
        ]
      }
    ]
  }
}
```

Переменная `$CLAUDE_NOTIFICATION` содержит текст уведомления, которое Claude Code хотел показать.

### Звуковые уведомления

На разных ОС звуковые уведомления настраиваются по-разному.

**Linux:**

```bash
#!/bin/bash
# ~/.claude/hooks/notify-sound.sh
paplay /usr/share/sounds/freedesktop/stereo/complete.oga
notify-send "Claude Code" "$CLAUDE_NOTIFICATION"
```

**macOS:**

```bash
#!/bin/bash
# ~/.claude/hooks/notify-sound.sh
afplay /System/Library/Sounds/Glass.aiff
osascript -e "display notification \"$CLAUDE_NOTIFICATION\" with title \"Claude Code\""
```

**Windows (PowerShell через bash):**

```bash
#!/bin/bash
powershell.exe -Command "[System.Media.SystemSounds]::Asterisk.Play()"
powershell.exe -Command "New-BurntToastNotification -Text 'Claude Code', '$CLAUDE_NOTIFICATION'"
```

### Подключение скрипта

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/notify-sound.sh"
          }
        ]
      }
    ]
  }
}
```

## Логирование через PostToolUse

PostToolUse hook вызывается после каждого использования инструмента. Это идеальное место для логирования.

### Простой лог в файл

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"$(date '+%Y-%m-%d %H:%M:%S') | Tool: $CLAUDE_TOOL_NAME | Session: $CLAUDE_SESSION_ID\" >> ~/.claude/logs/actions.log"
          }
        ]
      }
    ]
  }
}
```

Теперь каждое действие записывается в файл с временной меткой, именем инструмента и ID сессии.

### Подробное логирование

Для более детального лога создай скрипт:

```bash
#!/bin/bash
# ~/.claude/hooks/log-action.sh

LOG_DIR="$HOME/.claude/logs"
LOG_FILE="$LOG_DIR/$(date '+%Y-%m-%d').log"

mkdir -p "$LOG_DIR"

# Формируем запись
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
TOOL="$CLAUDE_TOOL_NAME"
SESSION="$CLAUDE_SESSION_ID"
PROJECT="$CLAUDE_PROJECT_DIR"

# Читаем input из stdin (JSON)
INPUT=$(cat)

echo "[$TIMESTAMP] session=$SESSION tool=$TOOL project=$PROJECT" >> "$LOG_FILE"
echo "  input: $INPUT" >> "$LOG_FILE"
echo "---" >> "$LOG_FILE"
```

Подключение:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/log-action.sh"
          }
        ]
      }
    ]
  }
}
```

### Логирование только определённых инструментов

Не обязательно логировать всё. Можно записывать только критичные действия:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"$(date) WRITE: $CLAUDE_TOOL_INPUT\" >> ~/.claude/logs/writes.log"
          }
        ]
      },
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"$(date) BASH: $CLAUDE_TOOL_INPUT\" >> ~/.claude/logs/commands.log"
          }
        ]
      }
    ]
  }
}
```

## Комбинация: уведомления + логирование

Можно объединить оба подхода. Например, логировать всё и уведомлять о важном:

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/notify-sound.sh"
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
            "command": "bash ~/.claude/hooks/log-action.sh"
          }
        ]
      }
    ]
  }
}
```

## Практика

1. Настрой Notification hook с desktop-уведомлениями для своей ОС
2. Создай скрипт логирования, который записывает действия в файл
3. Запусти Claude Code, выполни несколько задач и проверь лог-файл
4. Настрой раздельное логирование для Write и Bash инструментов

## Итоги

- Notification hook уведомляет о событиях Claude Code через звук и desktop-нотификации
- PostToolUse hook позволяет логировать каждое действие агента
- Переменные `$CLAUDE_NOTIFICATION`, `$CLAUDE_TOOL_NAME`, `$CLAUDE_SESSION_ID` доступны в скриптах
- Можно комбинировать уведомления и логирование для полного контроля
- Matcher позволяет фильтровать, какие инструменты логировать

## Проверь себя

<div class="quiz-block" data-quiz-id="u31-q1" data-answer="b" markdown>
  <div class="quiz-question">Когда срабатывает Notification hook?</div>
  <label><input type="radio" name="u31-q1" value="a"> При каждом вызове инструмента</label>
  <label><input type="radio" name="u31-q1" value="b"> Когда Claude Code отправляет уведомление пользователю</label>
  <label><input type="radio" name="u31-q1" value="c"> Только при ошибках</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u31-q2" data-answer="a" markdown>
  <div class="quiz-question">Какая переменная содержит текст уведомления?</div>
  <label><input type="radio" name="u31-q2" value="a"> $CLAUDE_NOTIFICATION</label>
  <label><input type="radio" name="u31-q2" value="b"> $CLAUDE_MESSAGE</label>
  <label><input type="radio" name="u31-q2" value="c"> $NOTIFICATION_TEXT</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u31-q3" data-answer="c" markdown>
  <div class="quiz-question">Какой hook лучше всего подходит для логирования действий?</div>
  <label><input type="radio" name="u31-q3" value="a"> PreToolUse</label>
  <label><input type="radio" name="u31-q3" value="b"> Notification</label>
  <label><input type="radio" name="u31-q3" value="c"> PostToolUse</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u31-q4" data-answer="b" markdown>
  <div class="quiz-question">Что произойдёт, если в matcher указать пустую строку ""?</div>
  <label><input type="radio" name="u31-q4" value="a"> Hook не будет срабатывать</label>
  <label><input type="radio" name="u31-q4" value="b"> Hook сработает для всех инструментов</label>
  <label><input type="radio" name="u31-q4" value="c"> Произойдёт ошибка конфигурации</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
