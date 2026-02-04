---
title: "Урок 9. Настройки permissions"
description: "Как настроить permissions в Claude Code для безопасной работы: режимы, файл настроек, рекомендации"
---

# Настройки permissions для безопасности

!!! info "Что ты узнаешь"
    - Как работает система permissions в Claude Code
    - Три режима: Ask, Auto-allow, Deny
    - Рекомендуемые настройки для безопасной работы

## Введение

Claude Code может читать файлы, запускать команды и вносить изменения. Система permissions контролирует, что агент может делать автоматически, а что требует твоего подтверждения. Правильная настройка — баланс между удобством и безопасностью.

## Три режима permissions

| Режим | Описание | Когда использовать |
|-------|----------|-------------------|
| **Ask** | Спрашивает перед каждым действием | Для чувствительных операций |
| **Auto-allow** | Выполняет автоматически | Для безопасных операций |
| **Deny** | Запрещает полностью | Для опасных операций |

## Типы операций

Claude Code разделяет действия на категории:

- **Read** — чтение файлов
- **Write** — запись/изменение файлов
- **Bash** — выполнение bash-команд
- **MCP tools** — инструменты MCP-серверов

## Рекомендуемые настройки

!!! tip "Безопасный баланс"
    | Операция | Режим | Почему |
    |----------|-------|--------|
    | Read | Auto-allow | Чтение безопасно |
    | Write | Ask | Контроль изменений |
    | Bash (безопасные) | Auto-allow | `ls`, `cat`, `git status` |
    | Bash (опасные) | Ask | `rm`, `git push`, `npm publish` |

## Настройка через CLI

```bash
# Открыть интерактивный конфигуратор
/permissions

# Или через config
/config
```

## Файл настроек

Permissions хранятся в `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": [
      "Read",
      "Bash(git status)",
      "Bash(git diff)",
      "Bash(npm test)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push --force)"
    ]
  }
}
```

## Глобальные vs проектные настройки

- **Глобальные**: `~/.claude/settings.json` — для всех проектов
- **Проектные**: `.claude/settings.json` — для конкретного проекта

Проектные настройки имеют приоритет над глобальными.

!!! warning "Важно"
    Проектный `.claude/settings.json` попадает в git. Не добавляй туда секреты или пути, специфичные для твоей машины.

## Практика

1. Запусти Claude Code и набери `/permissions`
2. Настрой Read на auto-allow
3. Настрой Write на ask
4. Добавь безопасные bash-команды в allow-список

## Итоги

- Система permissions контролирует действия Claude Code
- Три режима: Ask (спрашивает), Auto-allow (разрешает), Deny (запрещает)
- Рекомендация: Read — auto, Write — ask, Bash — выборочно
- Настройки хранятся в `.claude/settings.json`

## Проверь себя

<div class="quiz-block" data-quiz-id="u09-q1" data-answer="b">
  <div class="quiz-question">Какой режим permissions рекомендуется для записи файлов?</div>
  <label><input type="radio" name="u09-q1" value="a"> Auto-allow</label>
  <label><input type="radio" name="u09-q1" value="b"> Ask</label>
  <label><input type="radio" name="u09-q1" value="c"> Deny</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u09-q2" data-answer="c">
  <div class="quiz-question">Где хранятся проектные настройки permissions?</div>
  <label><input type="radio" name="u09-q2" value="a"> ~/.claude/permissions.json</label>
  <label><input type="radio" name="u09-q2" value="b"> package.json</label>
  <label><input type="radio" name="u09-q2" value="c"> .claude/settings.json</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u09-q3" data-answer="a">
  <div class="quiz-question">Какие настройки имеют приоритет — глобальные или проектные?</div>
  <label><input type="radio" name="u09-q3" value="a"> Проектные</label>
  <label><input type="radio" name="u09-q3" value="b"> Глобальные</label>
  <label><input type="radio" name="u09-q3" value="c"> Одинаковый приоритет</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
