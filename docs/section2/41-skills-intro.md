---
title: "Урок 41. Что такое Skills"
description: "Знакомство со Skills в Claude Code: переиспользуемые наборы инструкций, отличие от slash-команд, файл SKILL.md"
---

# Что такое Skills

!!! info "Что ты узнаешь"
    - Что такое Skills и зачем они нужны
    - Чем Skills отличаются от slash-команд
    - Как устроен SKILL.md
    - Когда и где применять Skills

## Введение

Ты уже знаешь, что CLAUDE.md задаёт общие правила проекта, а slash-команды позволяют запускать шаблоны промптов. Skills — это следующий уровень. Это переиспользуемые наборы инструкций, которые описывают **как выполнять определённый тип задачи**.

Думай о Skills как о рецептах. CLAUDE.md — это правила кухни (чистота, температура, инструменты). Slash-команда — это кнопка "приготовить". А Skill — это подробный рецепт блюда: ингредиенты, порядок действий, критерии готовности.

## Зачем нужны Skills

Без Skills ты каждый раз объясняешь Claude Code, как именно выполнить задачу:

> "Создай компонент. Используй TypeScript. Добавь тесты. Файл назови PascalCase. Экспортируй как default. Добавь Storybook-историю..."

Со Skills ты описываешь эту инструкцию один раз в SKILL.md, а потом просто говоришь:

> "Создай компонент UserProfile"

Claude Code сам подтянет нужный Skill и выполнит задачу по инструкции.

## Skills vs slash-команды

Это разные механизмы, хотя они могут выглядеть похоже. Вот ключевые различия:

| Аспект | Slash-команды | Skills |
|---|---|---|
| Расположение | `.claude/commands/` | `.claude/skills/` или `.skills/` |
| Формат файла | Markdown-промпт | SKILL.md с front matter |
| Вызов | `/имя-команды` | Автоматически или по упоминанию |
| Цель | Запустить конкретный промпт | Описать как делать задачу |
| Контекст | Одноразовое действие | Переиспользуемая инструкция |
| References | Нет | Да — папка references |

### Slash-команда — это действие

```markdown
<!-- .claude/commands/create-component.md -->
Создай React-компонент $ARGUMENTS в папке src/components/
Используй TypeScript и добавь тесты.
```

Ты вызываешь её: `/create-component Button`. Claude выполняет промпт.

### Skill — это знание

```markdown
<!-- .claude/skills/react-component/SKILL.md -->
---
name: React Component
description: How to create React components in this project
---

## Правила создания компонентов

1. Используй функциональные компоненты
2. Именование: PascalCase
3. Один компонент — один файл
4. Тесты рядом: Component.test.tsx
5. Стили: CSS Modules (Component.module.css)
6. Экспорт: named export + re-export из index.ts
```

Claude Code знает этот Skill и применяет его автоматически, когда ты просишь создать компонент.

## Как Claude Code находит Skills

Claude Code ищет Skills в нескольких местах:

1. **`.claude/skills/`** — папка Skills в проекте
2. **`~/.claude/skills/`** — глобальные Skills пользователя

Каждый Skill — это папка, содержащая `SKILL.md` и опционально папку `references/` с примерами.

```
.claude/
  skills/
    react-component/
      SKILL.md
      references/
        ExampleComponent.tsx
        ExampleComponent.test.tsx
    api-endpoint/
      SKILL.md
      references/
        example-route.ts
```

## Когда использовать Skills

Skills особенно полезны, когда:

- В проекте есть повторяющиеся паттерны (компоненты, эндпоинты, миграции)
- Ты хочешь стандартизировать подход к типовым задачам
- Новые разработчики (или Claude Code) должны следовать принятым правилам
- Тебе важна консистентность кода

!!! tip "Совет"
    Начни с одного Skill для самой частой задачи. Например, если ты постоянно создаёшь React-компоненты — опиши этот паттерн в SKILL.md. Потом добавляй другие по мере необходимости.

## Практика

1. Создай папку `.claude/skills/` в своём проекте
2. Подумай, какие задачи ты выполняешь чаще всего
3. Опиши одну из них в виде SKILL.md (пока без front matter — просто текст)
4. Попроси Claude Code выполнить эту задачу и проверь, учитывает ли он инструкции

## Итоги

- Skills — переиспользуемые наборы инструкций для типовых задач
- Хранятся в `.claude/skills/` как папки с SKILL.md
- Отличаются от slash-команд: Skills описывают «как», а команды запускают «что»
- Claude Code находит и применяет Skills автоматически
- Могут содержать примеры в папке `references/`

## Проверь себя

<div class="quiz-block" data-quiz-id="u41-q1" data-answer="b" markdown>
  <div class="quiz-question">Где хранятся Skills проекта?</div>
  <label><input type="radio" name="u41-q1" value="a"> .claude/commands/</label>
  <label><input type="radio" name="u41-q1" value="b"> .claude/skills/</label>
  <label><input type="radio" name="u41-q1" value="c"> .claude/plugins/</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u41-q2" data-answer="c" markdown>
  <div class="quiz-question">Чем Skills отличаются от slash-команд?</div>
  <label><input type="radio" name="u41-q2" value="a"> Skills быстрее работают</label>
  <label><input type="radio" name="u41-q2" value="b"> Skills можно вызвать только вручную</label>
  <label><input type="radio" name="u41-q2" value="c"> Skills описывают «как делать задачу», а slash-команды запускают промпт</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u41-q3" data-answer="a" markdown>
  <div class="quiz-question">Как называется главный файл Skill'а?</div>
  <label><input type="radio" name="u41-q3" value="a"> SKILL.md</label>
  <label><input type="radio" name="u41-q3" value="b"> skill.yaml</label>
  <label><input type="radio" name="u41-q3" value="c"> index.md</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u41-q4" data-answer="b" markdown>
  <div class="quiz-question">Какую аналогию лучше всего описывает Skill?</div>
  <label><input type="radio" name="u41-q4" value="a"> Кнопка запуска</label>
  <label><input type="radio" name="u41-q4" value="b"> Подробный рецепт</label>
  <label><input type="radio" name="u41-q4" value="c"> Файл конфигурации</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
