---
title: "Урок 42. SKILL.md и папка references"
description: "Структура файла SKILL.md: front matter, инструкции, примеры в references — как правильно оформить Skill"
---

# SKILL.md и папка references

!!! info "Что ты узнаешь"
    - Как устроен файл SKILL.md
    - Какие поля front matter доступны
    - Как писать инструкции внутри Skill'а
    - Зачем нужна папка references и как её использовать

## Введение

В прошлом уроке ты узнал, что такое Skills и зачем они нужны. Теперь разберёмся в деталях: как правильно оформить SKILL.md, что писать в front matter и как использовать папку references для примеров.

Хорошо оформленный Skill — это чёткая инструкция, которую Claude Code может воспроизводить стабильно и предсказуемо.

## Структура Skill'а

Каждый Skill — это папка со следующей структурой:

```
.claude/skills/
  название-skill/
    SKILL.md          # Главный файл с инструкциями
    references/       # Папка с примерами (опционально)
      example1.tsx
      example2.test.tsx
      example3.css
```

Имя папки — это идентификатор Skill'а. Используй kebab-case: `react-component`, `api-endpoint`, `db-migration`.

## Front matter

SKILL.md начинается с YAML front matter — метаданных Skill'а:

```markdown
---
name: React Component
description: How to create React components following project conventions
globs:
  - "src/components/**/*.tsx"
  - "src/components/**/*.test.tsx"
---
```

### Поля front matter

| Поле | Обязательное | Описание |
|---|---|---|
| `name` | Да | Название Skill'а (человекочитаемое) |
| `description` | Да | Описание — когда и зачем применять |
| `globs` | Нет | Паттерны файлов, к которым Skill применяется |

Поле `globs` помогает Claude Code понять, когда активировать Skill. Если ты работаешь с файлом, подходящим под паттерн, Claude автоматически учтёт инструкции из соответствующего Skill'а.

## Тело SKILL.md — инструкции

После front matter идут инструкции. Пиши их как Markdown-документ с чёткой структурой:

```markdown
---
name: React Component
description: How to create React components following project conventions
globs:
  - "src/components/**/*.tsx"
---

## Структура компонента

Каждый компонент создаётся как папка:

```
ComponentName/
  ComponentName.tsx        # Основной файл
  ComponentName.test.tsx   # Тесты
  ComponentName.module.css # Стили
  index.ts                 # Re-export
```

## Правила

1. Только функциональные компоненты (no class components)
2. Именование: PascalCase
3. Props — отдельный interface с суффиксом Props
4. Обязательный export default
5. Тесты покрывают: рендер, пропсы, события

## Props

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}
```

## Тестирование

Используй React Testing Library. Минимум 3 теста:
- Рендер без ошибок
- Отображение пропсов
- Обработка событий
```

!!! tip "Совет"
    Пиши инструкции так, как объяснял бы задачу новому разработчику. Чётко, по шагам, с примерами. Чем конкретнее — тем предсказуемее результат.

## Папка references

References — это реальные примеры файлов, которые Claude Code использует как образцы. Это самая мощная часть Skills.

### Зачем нужны references

Инструкции описывают правила словами. References показывают, как выглядит результат. Claude Code анализирует примеры и воспроизводит паттерн.

```
.claude/skills/react-component/
  SKILL.md
  references/
    Button.tsx
    Button.test.tsx
    Button.module.css
    index.ts
```

### Пример reference-файла

```tsx
// references/Button.tsx
import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
```

### Правила для references

- Файлы должны быть **реальными, рабочими примерами** из проекта
- Не клади туда сломанный или устаревший код
- 1-3 файла на каждый тип — достаточно. Не нужно 20 примеров
- Именуй файлы понятно: `ExampleButton.tsx`, а не `test1.tsx`

## Ссылки на references из SKILL.md

В SKILL.md ты можешь явно сослаться на reference-файл:

```markdown
## Пример

Смотри reference: `references/Button.tsx` — это образец
правильно оформленного компонента.

Тесты оформляй по аналогии с `references/Button.test.tsx`.
```

Claude Code прочитает эти файлы и будет использовать их как шаблон.

## Полный пример Skill'а

```
.claude/skills/api-endpoint/
  SKILL.md
  references/
    users.route.ts
    users.controller.ts
    users.service.ts
    users.test.ts
```

```markdown
---
name: API Endpoint
description: How to create REST API endpoints in Express
globs:
  - "src/routes/**/*.ts"
  - "src/controllers/**/*.ts"
---

## Архитектура

Каждый эндпоинт состоит из трёх слоёв:

1. **Route** — определяет URL и HTTP-метод
2. **Controller** — обрабатывает запрос/ответ
3. **Service** — бизнес-логика

## Именование файлов

- `{entity}.route.ts`
- `{entity}.controller.ts`
- `{entity}.service.ts`
- `{entity}.test.ts`

## Валидация

Используй Zod для валидации входных данных.
Схема валидации — в отдельном файле `{entity}.schema.ts`.

## Примеры

Смотри references/ для полного примера CRUD-эндпоинта для сущности Users.
```

## Практика

1. Создай папку `.claude/skills/` с одним Skill'ом для типовой задачи в твоём проекте
2. Напиши SKILL.md с front matter, инструкциями и ссылками на references
3. Добавь 1-2 файла в `references/` как образцы
4. Попроси Claude Code выполнить задачу и проверь, следует ли он инструкциям из Skill'а

## Итоги

- SKILL.md — главный файл Skill'а с front matter и инструкциями
- Front matter содержит `name`, `description` и опционально `globs`
- Инструкции пишутся как Markdown — чётко, по шагам, с примерами
- Папка `references/` содержит реальные файлы-образцы
- References — самая мощная часть: Claude Code копирует паттерн из примеров

## Проверь себя

<div class="quiz-block" data-quiz-id="u42-q1" data-answer="a" markdown>
  <div class="quiz-question">Какой файл является главным в папке Skill'а?</div>
  <label><input type="radio" name="u42-q1" value="a"> SKILL.md</label>
  <label><input type="radio" name="u42-q1" value="b"> index.md</label>
  <label><input type="radio" name="u42-q1" value="c"> config.yaml</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u42-q2" data-answer="c" markdown>
  <div class="quiz-question">Для чего используется поле globs в front matter?</div>
  <label><input type="radio" name="u42-q2" value="a"> Для указания зависимостей</label>
  <label><input type="radio" name="u42-q2" value="b"> Для фильтрации логов</label>
  <label><input type="radio" name="u42-q2" value="c"> Для определения файлов, к которым Skill применяется</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u42-q3" data-answer="b" markdown>
  <div class="quiz-question">Что хранится в папке references?</div>
  <label><input type="radio" name="u42-q3" value="a"> Конфигурационные файлы</label>
  <label><input type="radio" name="u42-q3" value="b"> Реальные файлы-образцы, которые Claude Code использует как шаблон</label>
  <label><input type="radio" name="u42-q3" value="c"> Логи выполнения Skill'а</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u42-q4" data-answer="a" markdown>
  <div class="quiz-question">Сколько reference-файлов рекомендуется на каждый тип?</div>
  <label><input type="radio" name="u42-q4" value="a"> 1-3 файла</label>
  <label><input type="radio" name="u42-q4" value="b"> 10-20 файлов</label>
  <label><input type="radio" name="u42-q4" value="c"> Чем больше, тем лучше</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u42-q5" data-answer="c" markdown>
  <div class="quiz-question">Какой формат именования рекомендуется для папки Skill'а?</div>
  <label><input type="radio" name="u42-q5" value="a"> camelCase</label>
  <label><input type="radio" name="u42-q5" value="b"> PascalCase</label>
  <label><input type="radio" name="u42-q5" value="c"> kebab-case</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
