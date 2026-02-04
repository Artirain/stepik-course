---
title: "Урок 27. Файл определения агента"
description: "Как создать кастомного агента через файл в .claude/agents/ с указанием имени, модели, инструментов и инструкций"
---

# Файл определения агента

!!! info "Что ты узнаешь"
    - Как создать файл определения кастомного агента
    - Какие поля доступны: name, description, model, tools, instructions
    - Как запустить кастомного агента в Claude Code

## Введение

В предыдущем уроке ты узнал, что Claude Code может порождать саб-агентов для выполнения подзадач. Но встроенные паттерны --- это только начало.

Ты можешь создавать **собственных агентов** --- специализированных помощников с заданной ролью, набором инструментов и инструкциями. Каждый такой агент описывается в отдельном файле.

## Где хранятся определения агентов

Файлы агентов живут в папке `.claude/agents/` в корне проекта:

```
my-project/
├── .claude/
│   ├── agents/
│   │   ├── reviewer.md
│   │   ├── architect.md
│   │   └── test-writer.md
│   ├── commands/
│   └── rules/
├── src/
└── CLAUDE.md
```

Каждый `.md`-файл --- один агент.

## Формат файла агента

Файл агента состоит из **front matter** (метаданные в YAML) и **тела** (инструкции):

```markdown
---
name: "Code Reviewer"
description: "Проводит тщательный code review с фокусом на качество и безопасность"
model: "claude-sonnet-4-20250514"
tools:
  - Read
  - Grep
  - Glob
  - Bash
---

Ты --- опытный code reviewer. Твоя задача --- находить проблемы в коде.

При проведении review:
1. Проверь логику и корректность
2. Найди потенциальные баги
3. Оцени обработку ошибок
4. Проверь безопасность (SQL-инъекции, XSS, утечки данных)
5. Оцени читаемость и maintainability
6. Предложи конкретные улучшения с примерами кода

Формат ответа:
- Критические проблемы (блокеры)
- Важные замечания
- Мелкие улучшения
- Общее впечатление
```

## Поля front matter

### name

Имя агента. Отображается при его вызове.

```yaml
name: "Test Generator"
```

### description

Краткое описание назначения агента. Помогает понять, для чего он нужен.

```yaml
description: "Генерирует comprehensive unit-тесты для TypeScript-кода"
```

### model

Модель Claude, которую будет использовать агент. Позволяет выбрать баланс между скоростью и качеством.

```yaml
model: "claude-sonnet-4-20250514"
```

Варианты:

| Модель | Когда использовать |
|---|---|
| `claude-sonnet-4-20250514` | Быстрые задачи, рутинные операции |
| `claude-opus-4-20250514` | Сложные задачи, требующие глубокого анализа |

!!! tip "Совет"
    Для рутинных агентов (линтинг, простые тесты) используй Sonnet --- он быстрее и дешевле. Для сложных (архитектурный анализ, security review) --- Opus.

### tools

Список инструментов, доступных агенту. Ограничивает, что агент может делать.

```yaml
tools:
  - Read
  - Grep
  - Glob
  - Bash
  - Edit
  - Write
```

Основные инструменты:

| Инструмент | Назначение |
|---|---|
| `Read` | Чтение файлов |
| `Write` | Создание файлов |
| `Edit` | Редактирование файлов |
| `Grep` | Поиск по содержимому |
| `Glob` | Поиск файлов по паттерну |
| `Bash` | Выполнение shell-команд |

!!! warning "Безопасность"
    Будь осторожен с инструментами `Write`, `Edit` и `Bash`. Если агент предназначен только для анализа, не давай ему инструменты для изменения кода.

### instructions

Тело файла (после front matter) --- это инструкции для агента. Здесь ты описываешь его роль, правила поведения и формат ответов.

## Примеры кастомных агентов

### Архитектор

Файл `.claude/agents/architect.md`:

```markdown
---
name: "Software Architect"
description: "Анализирует архитектуру и предлагает улучшения"
model: "claude-opus-4-20250514"
tools:
  - Read
  - Grep
  - Glob
---

Ты --- software architect с 15-летним опытом.

Твои задачи:
1. Анализировать текущую архитектуру проекта
2. Выявлять архитектурные проблемы
3. Предлагать улучшения с обоснованием

Принципы:
- SOLID
- Clean Architecture
- Domain-Driven Design (где уместно)
- Предпочитай композицию наследованию

Формат ответа:
- Текущее состояние (что хорошо, что плохо)
- Проблемные области
- Рекомендации с примерами
- Приоритет изменений (что делать в первую очередь)
```

### Генератор тестов

Файл `.claude/agents/test-writer.md`:

```markdown
---
name: "Test Writer"
description: "Пишет comprehensive unit и integration тесты"
model: "claude-sonnet-4-20250514"
tools:
  - Read
  - Write
  - Grep
  - Glob
  - Bash
---

Ты --- специалист по тестированию.

Правила написания тестов:
1. Покрывай happy path и edge cases
2. Используй AAA-паттерн (Arrange, Act, Assert)
3. Один assert на тест (по возможности)
4. Давай тестам понятные имена: "should return empty array when no items found"
5. Мокай внешние зависимости
6. Не тестируй implementation details

Стек:
- Jest для unit-тестов
- Supertest для API-тестов
- Testing Library для компонентов

После написания тестов запусти их и убедись, что все проходят.
```

### Security-аудитор

Файл `.claude/agents/security.md`:

```markdown
---
name: "Security Auditor"
description: "Проверяет код на уязвимости безопасности"
model: "claude-opus-4-20250514"
tools:
  - Read
  - Grep
  - Glob
---

Ты --- специалист по информационной безопасности.

Проверяй код на:
1. SQL-инъекции
2. XSS-уязвимости
3. Утечки секретов (API-ключи, пароли в коде)
4. Небезопасную десериализацию
5. Проблемы с аутентификацией и авторизацией
6. Path traversal
7. Небезопасные зависимости

Для каждой найденной проблемы укажи:
- Серьёзность (Critical / High / Medium / Low)
- Описание уязвимости
- Где именно она находится (файл и строка)
- Как её исправить (пример кода)
```

## Как запустить кастомного агента

Ты можешь вызвать агента через slash-команду или упомянуть его в промпте:

```
Используй агента reviewer для проверки файла src/auth.ts
```

Или через команду, которая ссылается на агента.

## Практика

Создай своего первого кастомного агента.

**Шаг 1.** Создай папку:

```bash
mkdir -p .claude/agents
```

**Шаг 2.** Создай файл `.claude/agents/documenter.md`:

```markdown
---
name: "Documenter"
description: "Генерирует документацию для кода"
model: "claude-sonnet-4-20250514"
tools:
  - Read
  - Grep
  - Glob
---

Ты --- технический писатель.

Для каждого файла или модуля создавай документацию:
1. Общее описание назначения
2. Список экспортируемых функций/классов
3. Примеры использования
4. Зависимости

Стиль: лаконичный, с примерами кода.
```

**Шаг 3.** Попроси Claude Code использовать этого агента для документирования части твоего проекта.

## Итоги

- Файлы агентов хранятся в `.claude/agents/` как `.md`-файлы
- Front matter содержит: `name`, `description`, `model`, `tools`
- Тело файла --- инструкции, описывающие роль и поведение агента
- Ограничивай `tools`, чтобы агент не делал лишнего
- Выбирай `model` в зависимости от сложности задачи

## Проверь себя

<div class="quiz-block" data-quiz-id="u27-q1" data-answer="b" markdown>
  <div class="quiz-question">Где хранятся файлы определения кастомных агентов?</div>
  <label><input type="radio" name="u27-q1" value="a"> .claude/commands/</label>
  <label><input type="radio" name="u27-q1" value="b"> .claude/agents/</label>
  <label><input type="radio" name="u27-q1" value="c"> .claude/rules/</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u27-q2" data-answer="a" markdown>
  <div class="quiz-question">Какое поле определяет, какие инструменты доступны агенту?</div>
  <label><input type="radio" name="u27-q2" value="a"> tools</label>
  <label><input type="radio" name="u27-q2" value="b"> allowed-tools</label>
  <label><input type="radio" name="u27-q2" value="c"> permissions</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u27-q3" data-answer="c" markdown>
  <div class="quiz-question">Какую модель лучше выбрать для агента, который делает простой линтинг?</div>
  <label><input type="radio" name="u27-q3" value="a"> claude-opus-4-20250514 --- он самый мощный</label>
  <label><input type="radio" name="u27-q3" value="b"> Модель не влияет на результат</label>
  <label><input type="radio" name="u27-q3" value="c"> claude-sonnet-4-20250514 --- он быстрее и дешевле для простых задач</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u27-q4" data-answer="b" markdown>
  <div class="quiz-question">Почему агенту для анализа кода не стоит давать инструмент Write?</div>
  <label><input type="radio" name="u27-q4" value="a"> Write замедляет работу агента</label>
  <label><input type="radio" name="u27-q4" value="b"> Агент-аналитик не должен изменять код --- это вопрос безопасности</label>
  <label><input type="radio" name="u27-q4" value="c"> Write несовместим с Grep</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u27-q5" data-answer="a" markdown>
  <div class="quiz-question">Что описывается в теле файла агента (после front matter)?</div>
  <label><input type="radio" name="u27-q5" value="a"> Инструкции, определяющие роль и поведение агента</label>
  <label><input type="radio" name="u27-q5" value="b"> Список файлов проекта</label>
  <label><input type="radio" name="u27-q5" value="c"> Конфигурация окружения</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
