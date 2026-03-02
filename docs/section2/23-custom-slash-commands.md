---
title: "Урок 23. Кастомные slash-команды"
description: "Как создавать собственные slash-команды для Claude Code через файлы в .claude/commands/"
---

# Кастомные slash-команды

!!! info "Что ты узнаешь"
    - Как создать собственную slash-команду
    - Какие поля доступны в front matter команды
    - Как вызывать кастомные команды через `/имя`

## Введение

Claude Code поддерживает встроенные slash-команды вроде `/help` или `/clear`. Но настоящая сила --- в создании **собственных** команд.

Ты можешь описать часто повторяемые промпты в файлах и вызывать их одной короткой командой. Это как алиасы в bash, только для Claude.

!!! note "Команды и Skills — единая система"
    Slash-команды из `.claude/commands/` и Skills из `.claude/skills/` — это теперь **единая система**. Файл в `.claude/commands/review.md` и skill в `.claude/skills/review/SKILL.md` оба создают команду `/review`. Путь через `commands/` по-прежнему работает, но для новых команд рекомендуется использовать Skills (см. урок 41).

## Где хранятся команды

Кастомные команды живут в папке `.claude/commands/` в корне проекта:

```text
my-project/
├── .claude/
│   ├── commands/
│   │   ├── review.md
│   │   ├── refactor.md
│   │   └── test-gen.md
│   └── rules/
├── src/
└── CLAUDE.md
```

Каждый `.md`-файл --- одна команда. Имя файла (без расширения) становится именем команды.

## Анатомия команды

Файл команды состоит из двух частей: **front matter** (метаданные в YAML) и **тело** (промпт).

```markdown
---
description: "Проводит code review текущих изменений"
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash
---

Проведи code review текущих изменений в проекте.

1. Посмотри `git diff` для staged и unstaged изменений
2. Проверь код на:
   - Баги и потенциальные ошибки
   - Нарушения стиля кода
   - Проблемы с производительностью
   - Пропущенные edge cases
3. Дай конкретные рекомендации по улучшению
```

### Поля front matter

| Поле | Описание | Обязательное |
|---|---|---|
| `description` | Краткое описание команды. Отображается в списке | Рекомендуется |
| `allowed-tools` | Список tools, которые команда может использовать | Нет |
| `model` | Модель для выполнения команды (например, `sonnet`) | Нет |
| `argument-hint` | Подсказка формата аргументов в автодополнении (например, `[файл] [формат]`) | Нет |
| `user-invocable` | Может ли пользователь вызвать команду через `/имя` (по умолчанию `true`) | Нет |
| `disable-model-invocation` | Запретить Claude вызывать команду автоматически (по умолчанию `false`) | Нет |

!!! note "Про allowed-tools"
    Если `allowed-tools` не указан, команда может использовать все доступные инструменты. Указывай этот параметр, когда хочешь ограничить команду --- например, запретить ей делать `Write` или `Edit`.

### Тело команды --- промпт

Всё, что идёт после front matter, --- это промпт, который Claude Code получит при вызове команды. Пиши его так же, как писал бы обычный запрос.

## Как вызвать команду

Кастомные команды вызываются по имени файла:

```text
/review
```

Это запустит команду из файла `.claude/commands/review.md`.

Если начнёшь вводить `/` в Claude Code, он покажет автодополнение со списком доступных команд и их описаниями.

!!! tip "Встроенные команды"
    Claude Code также поставляется с несколькими bundled skills: `/simplify` (упрощение кода), `/batch` (параллельная работа в worktrees), `/debug` (отладка).

## Примеры полезных команд

### Генерация тестов

Файл `.claude/commands/test-gen.md`:

```markdown
---
description: "Генерирует unit-тесты для указанного файла"
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - Bash
---

Сгенерируй unit-тесты для файла, который я укажу.

Требования:
- Используй Jest
- Покрой основные сценарии и edge cases
- Используй describe/it блоки
- Добавь моки для внешних зависимостей
- Именуй тест-файл как *.test.ts
```

### Документирование функции

Файл `.claude/commands/document.md`:

```markdown
---
description: "Добавляет JSDoc-документацию к функциям"
allowed-tools:
  - Read
  - Edit
---

Найди все публичные функции в указанном файле, у которых нет JSDoc-комментариев, и добавь их.

Формат:
- Описание функции
- @param для каждого параметра с типом и описанием
- @returns с типом и описанием
- @throws если функция может бросить исключение
```

### Быстрый рефакторинг

Файл `.claude/commands/refactor.md`:

```markdown
---
description: "Рефакторит код с сохранением поведения"
allowed-tools:
  - Read
  - Edit
  - Bash
---

Проведи рефакторинг указанного кода.

Правила:
- Не меняй внешнее поведение
- Улучши читаемость
- Убери дублирование
- Примени SOLID-принципы где уместно
- После рефакторинга запусти тесты, чтобы убедиться, что ничего не сломалось
```

## Персональные команды

Помимо проектных команд, ты можешь создать **персональные** команды, которые работают во всех проектах. Они хранятся в домашней директории:

```text
~/.claude/commands/
├── my-review.md
└── my-commit.md
```

Вызываются так же — по имени:

```text
/my-review
```

!!! tip "Совет"
    Проектные команды коммить в Git --- они полезны всей команде. Персональные из `~/.claude/commands/` --- твои личные, они не попадают в репозиторий.

## Практика

Создай свою первую кастомную команду.

**Шаг 1.** Создай папку:

```bash
mkdir -p .claude/commands
```

**Шаг 2.** Создай файл `.claude/commands/status.md`:

```markdown
---
description: "Показывает статус проекта"
allowed-tools:
  - Bash
  - Read
---

Покажи текущий статус проекта:

1. Выполни `git status` и покажи результат
2. Выполни `git log --oneline -5` для последних коммитов
3. Проверь, есть ли незакоммиченные изменения
4. Кратко резюмируй состояние проекта
```

**Шаг 3.** Вызови команду в Claude Code:

```text
/status
```

## Итоги

- Кастомные команды хранятся в `.claude/commands/` как `.md`-файлы
- Front matter содержит метаданные: `description`, `allowed-tools`, `model`, `argument-hint` и др.
- Тело файла --- промпт, который получает Claude Code
- Команды вызываются по имени файла: `/review`, `/test-gen`
- Персональные команды хранятся в `~/.claude/commands/`
- Commands и Skills — единая система; для новых команд рекомендуется путь `.claude/skills/` (см. [Урок 41](41-skills-intro.md))

## Проверь себя

<div class="quiz-block" data-quiz-id="u23-q1" data-answer="c" markdown>
  <div class="quiz-question">Где хранятся кастомные проектные slash-команды?</div>
  <label><input type="radio" name="u23-q1" value="a"> В корне проекта в файле commands.yaml</label>
  <label><input type="radio" name="u23-q1" value="b"> В папке .claude/rules/</label>
  <label><input type="radio" name="u23-q1" value="c"> В папке .claude/commands/</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u23-q2" data-answer="a" markdown>
  <div class="quiz-question">Как вызвать кастомную команду review?</div>
  <label><input type="radio" name="u23-q2" value="a"> /review</label>
  <label><input type="radio" name="u23-q2" value="b"> /command:review</label>
  <label><input type="radio" name="u23-q2" value="c"> /run review</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u23-q3" data-answer="a" markdown>
  <div class="quiz-question">Что произойдёт, если не указать allowed-tools в front matter?</div>
  <label><input type="radio" name="u23-q3" value="a"> Команда сможет использовать все доступные инструменты</label>
  <label><input type="radio" name="u23-q3" value="b"> Команда не сможет использовать никакие инструменты</label>
  <label><input type="radio" name="u23-q3" value="c"> Claude Code выдаст ошибку</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u23-q4" data-answer="b" markdown>
  <div class="quiz-question">Где хранятся персональные команды, доступные во всех проектах?</div>
  <label><input type="radio" name="u23-q4" value="a"> .claude/commands/</label>
  <label><input type="radio" name="u23-q4" value="b"> ~/.claude/commands/</label>
  <label><input type="radio" name="u23-q4" value="c"> /etc/claude/commands/</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u23-q5" data-answer="b" markdown>
  <div class="quiz-question">Что определяет имя кастомной команды?</div>
  <label><input type="radio" name="u23-q5" value="a"> Поле name в front matter</label>
  <label><input type="radio" name="u23-q5" value="b"> Имя файла без расширения .md</label>
  <label><input type="radio" name="u23-q5" value="c"> Первый заголовок в теле файла</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
