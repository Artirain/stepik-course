---
title: "Урок 33. Коды завершения в Hooks"
description: "Как exit codes управляют поведением хуков: exit 0 для разрешения, exit 2 для блокировки, exit 1 для ошибок, и роль stdout"
---

# Коды завершения в Hooks

!!! info "Что ты узнаешь"
    - Что означают exit codes 0, 1 и 2 в хуках
    - Как блокировать действия через exit code 2
    - Как передавать информацию через stdout
    - Разницу между stdout и stderr в контексте хуков

## Введение

Exit codes — это язык общения между хуком и Claude Code. Каждый скрипт при завершении возвращает числовой код, и Claude Code интерпретирует этот код как инструкцию: продолжать, остановиться или обработать ошибку.

Понимание exit codes критически важно для написания рабочих хуков. Неправильный код завершения может привести к тому, что хук будет блокировать все действия вместо одного, или наоборот — пропускать опасные команды.

## Exit 0 — всё в порядке

Exit code 0 означает: «Действие разрешено, продолжай».

```bash
#!/bin/bash
# Простейший хук — разрешить всё
exit 0
```

Если скрипт завершается с кодом 0 и **ничего не выводит в stdout**, Claude Code просто выполняет действие как обычно.

### Exit 0 + stdout = контекст

Если при exit 0 скрипт что-то выведет в stdout, этот текст добавляется к контексту Claude Code. Claude увидит этот текст и может учитывать его в дальнейшей работе.

```bash
#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if echo "$COMMAND" | grep -q "git push"; then
  echo "Напоминание: убедись, что все тесты пройдены перед push"
fi

exit 0
```

В этом примере при `git push` Claude получит напоминание, но действие не будет заблокировано.

!!! tip "Когда использовать stdout"
    Используй stdout для:

    - Напоминаний и подсказок
    - Дополнительной информации о контексте
    - Рекомендаций (без принуждения)

## Exit 2 — блокировка действия

Exit code 2 — это **блокировка**. Работает только в PreToolUse. Если скрипт завершается с кодом 2, Claude Code **не выполнит** инструмент.

```bash
#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Блокируем force push
if echo "$COMMAND" | grep -qE 'git\s+push\s+.*--force'; then
  echo "Force push запрещён политикой проекта" >&2
  exit 2
fi

exit 0
```

### Что видит Claude при блокировке

Когда хук возвращает exit 2, Claude Code:

1. Не выполняет инструмент
2. Сообщает Claude, что действие заблокировано
3. Передаёт текст из stderr как причину блокировки
4. Claude пытается найти альтернативный способ выполнить задачу

!!! warning "Exit 2 в PostToolUse"
    Exit code 2 в PostToolUse **не имеет эффекта блокировки** — действие уже выполнено. В PostToolUse код 2 обрабатывается как обычная ошибка.

### Пример: блокировка по паттернам

```bash
#!/bin/bash
# ~/.claude/hooks/block-patterns.sh

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Массив запрещённых паттернов
BLOCKED_PATTERNS=(
  "rm -rf /"
  "mkfs"
  "dd if="
  "> /dev/sda"
  "chmod 777"
  "curl.*| bash"
  "wget.*| sh"
)

for pattern in "${BLOCKED_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qE "$pattern"; then
    echo "BLOCKED: команда содержит запрещённый паттерн: $pattern" >&2
    exit 2
  fi
done

exit 0
```

## Exit 1 — ошибка

Exit code 1 сигнализирует об ошибке в самом хуке. Это **не блокировка**, а именно сбой скрипта.

```bash
#!/bin/bash
# Если jq не установлен — ошибка хука
if ! command -v jq &> /dev/null; then
  echo "Error: jq is not installed" >&2
  exit 1
fi

INPUT=$(cat)
# ... обработка
exit 0
```

### Как Claude Code обрабатывает exit 1

При exit 1 Claude Code:

1. Считает, что хук завершился с ошибкой
2. Логирует ошибку
3. **Продолжает выполнение** инструмента (по умолчанию)
4. Текст из stderr отображается как предупреждение

!!! danger "Важно"
    Exit 1 **не блокирует** действие! Если тебе нужна блокировка — используй exit 2. Если хук упал с ошибкой (exit 1), действие всё равно будет выполнено.

## Stdout vs Stderr

Понимание разницы между stdout и stderr в хуках важно:

| Поток | Назначение | Когда использовать |
|---|---|---|
| stdout | Контекст для Claude | Подсказки, напоминания, данные |
| stderr | Сообщения об ошибках | Причины блокировки, ошибки хука |

```bash
#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if echo "$COMMAND" | grep -q "npm install"; then
  # stdout — Claude увидит это как контекст
  echo "Пакет будет установлен. Проверь package-lock.json после установки."

  # stderr — отобразится в логах, но не в контексте Claude
  echo "Hook: npm install detected" >&2
fi

exit 0
```

## Сводная таблица exit codes

| Exit code | Значение | PreToolUse | PostToolUse |
|---|---|---|---|
| 0 | Успех | Разрешить действие | Успешное завершение |
| 0 + stdout | Успех + контекст | Разрешить + добавить контекст | Добавить контекст |
| 1 | Ошибка хука | Действие выполняется | Ошибка логируется |
| 2 | Блокировка | Действие блокируется | Нет эффекта (ошибка) |

## Типичные ошибки

### Ошибка: блокировка через exit 1

```bash
# НЕПРАВИЛЬНО — exit 1 не блокирует!
if echo "$COMMAND" | grep -q "rm -rf"; then
  echo "Опасная команда!" >&2
  exit 1  # Действие всё равно выполнится
fi

# ПРАВИЛЬНО — exit 2 блокирует
if echo "$COMMAND" | grep -q "rm -rf"; then
  echo "Опасная команда!" >&2
  exit 2  # Действие заблокировано
fi
```

### Ошибка: забытый exit 0

```bash
#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if echo "$COMMAND" | grep -q "npm"; then
  echo "npm detected"
fi
# Без exit 0 скрипт может вернуть код последней команды
# Если grep не нашёл совпадение — вернётся exit 1!
```

Всегда завершай скрипт явным `exit 0`:

```bash
#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if echo "$COMMAND" | grep -q "npm"; then
  echo "npm detected"
fi

exit 0  # Явно указываем успешное завершение
```

## Практика

1. Напиши хук, который блокирует `git push --force` (exit 2) и предупреждает при обычном `git push` (exit 0 + stdout)
2. Создай хук с обработкой ошибок — проверяй наличие `jq` перед работой
3. Проверь разницу: измени exit 2 на exit 1 и убедись, что действие больше не блокируется
4. Добавь логирование в stderr для отладки хука

## Итоги

- Exit 0 — действие разрешено; если есть stdout, он добавляется к контексту
- Exit 2 — действие заблокировано (только PreToolUse); stderr содержит причину
- Exit 1 — ошибка хука; действие **не блокируется**, ошибка логируется
- Stdout передаёт контекст Claude, stderr — сообщения об ошибках
- Всегда завершай скрипты явным `exit 0` в конце

## Проверь себя

<div class="quiz-block" data-quiz-id="u33-q1" data-answer="b" markdown>
  <div class="quiz-question">Какой exit code блокирует выполнение инструмента в PreToolUse?</div>
  <label><input type="radio" name="u33-q1" value="a"> 0</label>
  <label><input type="radio" name="u33-q1" value="b"> 2</label>
  <label><input type="radio" name="u33-q1" value="c"> 1</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u33-q2" data-answer="c" markdown>
  <div class="quiz-question">Что происходит при exit 1 в PreToolUse?</div>
  <label><input type="radio" name="u33-q2" value="a"> Действие блокируется</label>
  <label><input type="radio" name="u33-q2" value="b"> Claude Code завершает работу</label>
  <label><input type="radio" name="u33-q2" value="c"> Ошибка логируется, действие выполняется</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u33-q3" data-answer="a" markdown>
  <div class="quiz-question">Куда попадает текст из stdout при exit 0?</div>
  <label><input type="radio" name="u33-q3" value="a"> В контекст Claude</label>
  <label><input type="radio" name="u33-q3" value="b"> В лог ошибок</label>
  <label><input type="radio" name="u33-q3" value="c"> Игнорируется</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u33-q4" data-answer="b" markdown>
  <div class="quiz-question">Работает ли exit 2 в PostToolUse как блокировка?</div>
  <label><input type="radio" name="u33-q4" value="a"> Да, отменяет выполненное действие</label>
  <label><input type="radio" name="u33-q4" value="b"> Нет, действие уже выполнено</label>
  <label><input type="radio" name="u33-q4" value="c"> Да, откатывает изменения</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u33-q5" data-answer="c" markdown>
  <div class="quiz-question">Почему важно всегда ставить явный exit 0 в конце скрипта?</div>
  <label><input type="radio" name="u33-q5" value="a"> Без него скрипт не запустится</label>
  <label><input type="radio" name="u33-q5" value="b"> Без него действие блокируется</label>
  <label><input type="radio" name="u33-q5" value="c"> Без него может вернуться код последней команды (например, 1 от grep)</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
