---
title: "Урок 22. Модульные правила через .claude/rules"
description: "Как разделить инструкции для Claude Code на отдельные файлы в папке .claude/rules/ вместо монолитного CLAUDE.md"
---

# Модульные правила через .claude/rules

!!! info "Что ты узнаешь"
    - Зачем разделять правила на отдельные файлы
    - Как устроена папка `.claude/rules/`
    - Как организовать модульную структуру правил в проекте

## Введение

Ты уже знаешь, что `CLAUDE.md` --- мощный инструмент для настройки поведения Claude Code. Но что делать, когда файл разрастается до сотен строк? Читать и поддерживать такой монолит становится тяжело.

Решение --- папка `.claude/rules/`. Вместо одного огромного файла ты создаёшь несколько маленьких, каждый из которых отвечает за свою тему.

## Зачем нужны модульные правила

Представь проект, где `CLAUDE.md` содержит правила по стилю кода, тестированию, архитектуре, деплою и документации. Всё в одном файле --- каша.

Модульный подход даёт тебе:

- **Читаемость.** Каждый файл --- одна тема. Открыл, прочитал, закрыл.
- **Поддержку.** Изменения в правилах тестирования не затрагивают файл с правилами стиля.
- **Командную работу.** Разные люди отвечают за разные файлы, меньше merge-конфликтов.
- **Переиспользование.** Один и тот же файл правил можно копировать между проектами.

## Структура папки .claude/rules/

Папка `.claude/rules/` находится в корне проекта. Каждый `.md`-файл внутри --- отдельное правило, которое Claude Code подхватывает автоматически.

```
my-project/
├── .claude/
│   └── rules/
│       ├── code-style.md
│       ├── testing.md
│       ├── architecture.md
│       ├── git-workflow.md
│       └── documentation.md
├── src/
├── tests/
└── CLAUDE.md          # может оставаться для общих правил
```

Claude Code загружает **все** `.md`-файлы из этой папки. Порядок загрузки --- алфавитный по имени файла.

## Формат файла правила

Каждый файл --- обычный Markdown. Никакого специального front matter не нужно. Просто пиши инструкции так же, как в `CLAUDE.md`.

Пример файла `.claude/rules/code-style.md`:

```markdown
# Стиль кода

- Используй TypeScript strict mode
- Именуй переменные в camelCase
- Именуй компоненты в PascalCase
- Максимальная длина строки --- 100 символов
- Всегда используй точку с запятой
```

Пример файла `.claude/rules/testing.md`:

```markdown
# Тестирование

- Пиши unit-тесты для каждой публичной функции
- Используй Jest как test runner
- Именуй тест-файлы как *.test.ts
- Стремись к покрытию не менее 80%
- Моки внешних сервисов обязательны
```

## Как это работает вместе с CLAUDE.md

`CLAUDE.md` и `.claude/rules/` не конфликтуют. Они дополняют друг друга:

| Источник | Назначение |
|---|---|
| `CLAUDE.md` | Общие правила, краткий обзор проекта |
| `.claude/rules/*.md` | Детальные правила по конкретным темам |

Claude Code объединяет все инструкции в единый контекст. Если правила противоречат друг другу, более конкретное правило из `.claude/rules/` обычно имеет приоритет.

!!! tip "Совет"
    Оставь в корневом `CLAUDE.md` только самое важное: описание проекта, ключевые команды, ссылки. Детали вынеси в `.claude/rules/`.

## Практика

Создай модульную структуру правил для своего проекта.

**Шаг 1.** Создай папку:

```bash
mkdir -p .claude/rules
```

**Шаг 2.** Создай файл `.claude/rules/code-style.md`:

```markdown
# Стиль кода

- Используй отступ в 2 пробела
- Предпочитай const вместо let
- Не используй var
```

**Шаг 3.** Создай файл `.claude/rules/commits.md`:

```markdown
# Git-коммиты

- Пиши сообщения коммитов на английском
- Используй conventional commits (feat:, fix:, docs:)
- Одно изменение --- один коммит
```

**Шаг 4.** Запусти Claude Code и убедись, что он следует обоим наборам правил.

!!! warning "Важно"
    Не дублируй одни и те же инструкции в `CLAUDE.md` и в файлах `.claude/rules/`. Это создаёт путаницу и тратит контекст.

## Именование файлов

Хорошая практика --- использовать говорящие имена файлов:

| Имя файла | Содержание |
|---|---|
| `code-style.md` | Стиль и форматирование кода |
| `testing.md` | Правила тестирования |
| `architecture.md` | Архитектурные решения |
| `git-workflow.md` | Работа с Git |
| `security.md` | Правила безопасности |
| `api-design.md` | Дизайн API |
| `documentation.md` | Правила документирования |

Помни: порядок загрузки --- алфавитный. Если порядок важен, используй числовые префиксы: `01-code-style.md`, `02-testing.md`.

## Итоги

- Папка `.claude/rules/` позволяет разделить правила на модули
- Каждый `.md`-файл в этой папке --- отдельное правило
- Модульный подход улучшает читаемость и упрощает поддержку
- `CLAUDE.md` и `.claude/rules/` работают вместе, дополняя друг друга
- Используй понятные имена файлов и не дублируй инструкции

## Проверь себя

<div class="quiz-block" data-quiz-id="u22-q1" data-answer="b" markdown>
  <div class="quiz-question">Где располагается папка с модульными правилами?</div>
  <label><input type="radio" name="u22-q1" value="a"> В домашней директории пользователя ~/.claude/rules/</label>
  <label><input type="radio" name="u22-q1" value="b"> В корне проекта .claude/rules/</label>
  <label><input type="radio" name="u22-q1" value="c"> В папке src/.rules/</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u22-q2" data-answer="a" markdown>
  <div class="quiz-question">Какой формат используют файлы правил в .claude/rules/?</div>
  <label><input type="radio" name="u22-q2" value="a"> Markdown (.md)</label>
  <label><input type="radio" name="u22-q2" value="b"> YAML (.yaml)</label>
  <label><input type="radio" name="u22-q2" value="c"> JSON (.json)</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u22-q3" data-answer="c" markdown>
  <div class="quiz-question">Что произойдёт, если одно и то же правило есть и в CLAUDE.md, и в .claude/rules/?</div>
  <label><input type="radio" name="u22-q3" value="a"> Claude Code выдаст ошибку</label>
  <label><input type="radio" name="u22-q3" value="b"> Правило из CLAUDE.md всегда побеждает</label>
  <label><input type="radio" name="u22-q3" value="c"> Создаётся дублирование, которое тратит контекст впустую</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u22-q4" data-answer="b" markdown>
  <div class="quiz-question">В каком порядке Claude Code загружает файлы из .claude/rules/?</div>
  <label><input type="radio" name="u22-q4" value="a"> В случайном порядке</label>
  <label><input type="radio" name="u22-q4" value="b"> В алфавитном порядке по имени файла</label>
  <label><input type="radio" name="u22-q4" value="c"> В порядке создания файлов</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u22-q5" data-answer="a" markdown>
  <div class="quiz-question">Какое главное преимущество модульных правил перед монолитным CLAUDE.md?</div>
  <label><input type="radio" name="u22-q5" value="a"> Лучшая читаемость и удобство поддержки</label>
  <label><input type="radio" name="u22-q5" value="b"> Более быстрая загрузка Claude Code</label>
  <label><input type="radio" name="u22-q5" value="c"> Автоматическая валидация правил</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
