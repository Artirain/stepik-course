---
title: "Урок 21. CLAUDE.md — размещение и приоритет"
description: "Три уровня CLAUDE.md: глобальный, проектный, вложенный. Приоритеты и наследование правил"
---

# CLAUDE.md — где размещать и какой приоритет

!!! info "Что ты узнаешь"
    - Три уровня CLAUDE.md и их назначение
    - Порядок приоритетов
    - Как организовать правила в большом проекте

## Введение

CLAUDE.md может существовать на нескольких уровнях одновременно. Claude Code читает их все и объединяет. Но если правила конфликтуют — побеждает более специфичный уровень.

## Три уровня

### 1. Глобальный: `~/.claude/CLAUDE.md`

Правила для **всех** твоих проектов. Сюда выноси общие предпочтения:

```markdown
# Глобальные правила
- Пиши комментарии на русском
- Используй conventional commits
- Не добавляй console.log в production
```

### 2. Проектный: `./CLAUDE.md`

Правила для **конкретного** проекта. Специфика технологий и стиля:

```markdown
# Проектные правила
- Проект на Python 3.12 + FastAPI
- Тесты: pytest
- Линтер: ruff
```

### 3. Вложенный: `./subfolder/CLAUDE.md`

Правила для **подпапки** или модуля:

```markdown
# Правила для фронтенда
- React 18 + TypeScript
- CSS Modules
- Компоненты в PascalCase
```

## Приоритет

```
Вложенный > Проектный > Глобальный
```

Если проектный CLAUDE.md говорит «пиши на TypeScript», а вложенный в `backend/CLAUDE.md` говорит «пиши на Python» — в папке `backend/` будет Python.

!!! tip "Правило"
    Более специфичный уровень всегда побеждает. Правила не заменяются полностью — они дополняются, а при конфликте побеждает ближайший к рабочей папке.

## Когда какой уровень использовать

| Уровень | Когда |
|---------|-------|
| Глобальный | Общий стиль, язык комментариев, привычки |
| Проектный | Технологии, фреймворки, правила проекта |
| Вложенный | Специфика модуля/подпроекта (монорепозиторий) |

## Практика

1. Создай `~/.claude/CLAUDE.md` с общими правилами
2. Создай `./CLAUDE.md` в проекте со спецификой
3. Проверь, что Claude Code учитывает оба

## Итоги

- Три уровня: глобальный, проектный, вложенный
- Приоритет: вложенный > проектный > глобальный
- Правила дополняются, при конфликте — ближайший побеждает
- Глобальный — для общих предпочтений, проектный — для специфики

## Проверь себя

<div class="quiz-block" data-quiz-id="u21-q1" data-answer="c">
  <div class="quiz-question">Какой CLAUDE.md имеет наивысший приоритет?</div>
  <label><input type="radio" name="u21-q1" value="a"> Глобальный (~/.claude/CLAUDE.md)</label>
  <label><input type="radio" name="u21-q1" value="b"> Проектный (./CLAUDE.md)</label>
  <label><input type="radio" name="u21-q1" value="c"> Вложенный (./subfolder/CLAUDE.md)</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u21-q2" data-answer="a">
  <div class="quiz-question">Где размещается глобальный CLAUDE.md?</div>
  <label><input type="radio" name="u21-q2" value="a"> ~/.claude/CLAUDE.md</label>
  <label><input type="radio" name="u21-q2" value="b"> /etc/claude/CLAUDE.md</label>
  <label><input type="radio" name="u21-q2" value="c"> ~/.config/claude.md</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u21-q3" data-answer="b">
  <div class="quiz-question">Что происходит при конфликте правил разных уровней?</div>
  <label><input type="radio" name="u21-q3" value="a"> Claude Code выдаёт ошибку</label>
  <label><input type="radio" name="u21-q3" value="b"> Побеждает более специфичный (ближайший) уровень</label>
  <label><input type="radio" name="u21-q3" value="c"> Используется глобальный</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
