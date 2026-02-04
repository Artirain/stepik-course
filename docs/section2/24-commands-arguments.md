---
title: "Урок 24. Аргументы через $ARGUMENTS"
description: "Как передавать пользовательский ввод в промпт кастомной команды с помощью переменной $ARGUMENTS"
---

# Аргументы через $ARGUMENTS

!!! info "Что ты узнаешь"
    - Что такое `$ARGUMENTS` и как он работает
    - Как подставить пользовательский ввод в промпт команды
    - Как создавать гибкие и переиспользуемые команды

## Введение

В прошлом уроке ты создал кастомные slash-команды. Но они были статичными --- каждый раз выполняли одно и то же. А что, если ты хочешь, чтобы команда принимала входные данные?

Для этого существует переменная `$ARGUMENTS`. Она позволяет передать текст при вызове команды, и этот текст автоматически подставится в промпт.

## Как работает $ARGUMENTS

Когда ты вызываешь команду с текстом после имени, весь этот текст попадает в переменную `$ARGUMENTS`:

```
/project:review src/utils/parser.ts
```

В этом примере `src/utils/parser.ts` --- это и есть `$ARGUMENTS`.

В файле команды ты используешь `$ARGUMENTS` как плейсхолдер:

```markdown
---
description: "Проводит code review указанного файла"
---

Проведи детальный code review файла: $ARGUMENTS

Проверь:
- Корректность логики
- Обработку ошибок
- Читаемость кода
- Соответствие стилю проекта
```

Когда ты вызовешь `/project:review src/utils/parser.ts`, Claude Code получит промпт:

> Проведи детальный code review файла: src/utils/parser.ts

## Где размещать $ARGUMENTS в промпте

Переменную `$ARGUMENTS` можно вставить в любое место промпта --- в начало, середину или конец. Можно использовать её несколько раз.

### В начале

```markdown
---
description: "Объясняет концепцию"
---

$ARGUMENTS

Объясни эту концепцию простым языком. Приведи примеры кода.
```

Вызов: `/project:explain Dependency Injection`

### В середине

```markdown
---
description: "Создаёт компонент по имени"
---

Создай React-компонент с именем $ARGUMENTS.

Требования:
- TypeScript
- Functional component
- Экспорт по умолчанию
```

Вызов: `/project:component UserProfile`

### В нескольких местах

```markdown
---
description: "Создаёт тест для файла"
---

Прочитай файл $ARGUMENTS и создай для него unit-тесты.

Сохрани тесты рядом с файлом $ARGUMENTS, добавив суффикс .test.
```

## Примеры полезных команд с $ARGUMENTS

### Анализ ошибки

Файл `.claude/commands/debug.md`:

```markdown
---
description: "Анализирует ошибку и предлагает решение"
---

Вот ошибка, которую я получил:

$ARGUMENTS

Проанализируй эту ошибку:
1. Объясни, что она означает
2. Определи вероятную причину
3. Предложи конкретное решение
4. Покажи исправленный код
```

Вызов:

```
/project:debug TypeError: Cannot read properties of undefined (reading 'map')
```

### Миграция кода

Файл `.claude/commands/migrate.md`:

```markdown
---
description: "Мигрирует файл на новый стек"
---

Мигрируй файл $ARGUMENTS с текущего стека на новый.

Правила миграции:
- Замени class components на functional components с hooks
- Замени PropTypes на TypeScript interfaces
- Сохрани всю бизнес-логику
- Убедись, что компонент экспортируется так же, как раньше
```

Вызов: `/project:migrate src/components/Header.jsx`

### Генерация API-эндпоинта

Файл `.claude/commands/api-endpoint.md`:

```markdown
---
description: "Создаёт REST API эндпоинт"
---

Создай REST API эндпоинт для ресурса: $ARGUMENTS

Включи:
- Все CRUD-операции (GET, POST, PUT, DELETE)
- Валидацию входных данных
- Обработку ошибок
- TypeScript типы для request и response
```

Вызов: `/project:api-endpoint users`

## Что если $ARGUMENTS пустой

Если ты вызовешь команду без аргументов, переменная `$ARGUMENTS` будет пустой строкой. Claude Code получит промпт с пустым местом там, где стоял `$ARGUMENTS`.

Поэтому пиши промпты так, чтобы они были осмысленными и без аргументов, или явно укажи, что аргумент обязателен:

```markdown
---
description: "Рефакторит указанный файл (укажи путь к файлу)"
---

Рефактори файл: $ARGUMENTS

Если путь к файлу не указан, спроси у меня, какой файл рефакторить.
```

!!! tip "Совет"
    Добавляй подсказку в `description`, чтобы пользователь знал, какой аргумент передать. Например: `"Рефакторит файл (укажи путь)"`.

## Практика

Создай команду с `$ARGUMENTS` и протестируй её.

**Шаг 1.** Создай файл `.claude/commands/explain.md`:

```markdown
---
description: "Объясняет код в указанном файле (укажи путь)"
---

Прочитай файл $ARGUMENTS и объясни, что делает этот код.

Структура объяснения:
1. Общее назначение файла
2. Основные функции и их роль
3. Зависимости и импорты
4. Возможные улучшения
```

**Шаг 2.** Вызови команду:

```
/project:explain src/index.ts
```

**Шаг 3.** Попробуй вызвать без аргумента и посмотри, как Claude отреагирует.

## Итоги

- `$ARGUMENTS` --- переменная, которая подставляет пользовательский ввод в промпт команды
- Весь текст после имени команды попадает в `$ARGUMENTS`
- Переменную можно использовать в любом месте промпта и несколько раз
- Если аргумент не передан, `$ARGUMENTS` будет пустой строкой
- Указывай в `description`, какой аргумент ожидается

## Проверь себя

<div class="quiz-block" data-quiz-id="u24-q1" data-answer="b" markdown>
  <div class="quiz-question">Что содержит переменная $ARGUMENTS при вызове `/project:review src/app.ts`?</div>
  <label><input type="radio" name="u24-q1" value="a"> review</label>
  <label><input type="radio" name="u24-q1" value="b"> src/app.ts</label>
  <label><input type="radio" name="u24-q1" value="c"> /project:review src/app.ts</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u24-q2" data-answer="c" markdown>
  <div class="quiz-question">Сколько раз можно использовать $ARGUMENTS в одном промпте?</div>
  <label><input type="radio" name="u24-q2" value="a"> Только один раз</label>
  <label><input type="radio" name="u24-q2" value="b"> Максимум два раза</label>
  <label><input type="radio" name="u24-q2" value="c"> Неограниченное количество раз</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u24-q3" data-answer="a" markdown>
  <div class="quiz-question">Что произойдёт, если вызвать команду без аргументов?</div>
  <label><input type="radio" name="u24-q3" value="a"> $ARGUMENTS будет пустой строкой</label>
  <label><input type="radio" name="u24-q3" value="b"> Claude Code выдаст ошибку</label>
  <label><input type="radio" name="u24-q3" value="c"> Команда не запустится</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u24-q4" data-answer="b" markdown>
  <div class="quiz-question">Для чего нужен $ARGUMENTS в кастомных командах?</div>
  <label><input type="radio" name="u24-q4" value="a"> Для указания модели Claude</label>
  <label><input type="radio" name="u24-q4" value="b"> Для подстановки пользовательского ввода в промпт</label>
  <label><input type="radio" name="u24-q4" value="c"> Для ограничения списка инструментов</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
