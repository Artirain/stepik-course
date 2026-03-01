---
title: "Урок 25. Несколько аргументов: $1, $2, $3"
description: "Как использовать позиционные аргументы $1, $2, $3 в кастомных slash-командах Claude Code"
---

# Несколько аргументов: $1, $2, $3

!!! info "Что ты узнаешь"
    - Как передавать несколько аргументов в одну команду
    - Как работают позиционные аргументы `$1`, `$2`, `$3`
    - Как разделяются аргументы при вызове команды

## Введение

В прошлом уроке ты научился использовать `$ARGUMENTS` для передачи одного блока текста в команду. Но что, если команде нужно несколько входных значений?

Например, ты хочешь указать и файл-источник, и целевой язык для перевода кода. Или имя компонента и директорию, куда его сохранить.

Для этого Claude Code поддерживает **позиционные аргументы**: `$1`, `$2`, `$3` и так далее.

## Как работают позиционные аргументы

Когда ты вызываешь команду с несколькими словами после имени, Claude Code разбивает их по пробелам:

```
/convert src/utils.js typescript
```

В этом случае:

| Переменная | Значение |
|---|---|
| `$ARGUMENTS[0]` / `$1` | `src/utils.js` |
| `$ARGUMENTS[1]` / `$2` | `typescript` |
| `$ARGUMENTS` | `src/utils.js typescript` (всё целиком) |

Каноническая форма — `$ARGUMENTS[N]` с нулевой индексацией. Сокращения `$1`, `$2`, `$3` — алиасы, где `$1` = первое слово, `$2` = второе и т.д.

## Пример команды с двумя аргументами

Файл `.claude/commands/convert.md`:

```markdown
---
description: "Конвертирует файл в указанный язык (файл язык)"
---

Прочитай файл $1 и перепиши его на языке $2.

Требования:
- Сохрани логику и структуру
- Используй идиоматичный стиль целевого языка
- Добавь необходимые импорты
- Сохрани результат рядом с оригиналом
```

Вызов:

```
/convert src/parser.js python
```

Claude получит промпт:

> Прочитай файл src/parser.js и перепиши его на языке python.

## Пример с тремя аргументами

Файл `.claude/commands/scaffold.md`:

```markdown
---
description: "Создаёт компонент (имя тип директория)"
---

Создай React-компонент:
- Имя: $1
- Тип: $2 (functional или class)
- Директория: $3

Создай файлы:
- $3/$1.tsx --- сам компонент
- $3/$1.test.tsx --- тесты
- $3/$1.module.css --- стили
```

Вызов:

```
/scaffold UserCard functional src/components
```

Результат подстановки:

> Создай React-компонент:
> - Имя: UserCard
> - Тип: functional (functional или class)
> - Директория: src/components

## Разделение аргументов

Аргументы разделяются **пробелами**. Это важно понимать:

```
/cmd hello world foo
```

| Переменная | Значение |
|---|---|
| `$1` | `hello` |
| `$2` | `world` |
| `$3` | `foo` |
| `$ARGUMENTS` | `hello world foo` |

!!! warning "Важно"
    Если тебе нужно передать значение с пробелами как один аргумент --- это не поддерживается напрямую. Каждый пробел создаёт новый аргумент. Используй дефисы или подчёркивания вместо пробелов: `my-component` вместо `my component`.

## Совмещение $ARGUMENTS и $1/$2

Ты можешь использовать и `$ARGUMENTS`, и позиционные аргументы в одной команде. `$ARGUMENTS` всегда содержит **весь** текст целиком.

```markdown
---
description: "Ищет и заменяет (что на_что)"
---

В текущем проекте найди все вхождения "$1" и замени на "$2".

Полный запрос пользователя: $ARGUMENTS
```

При вызове `/replace oldFunc newFunc`:

- `$1` = `oldFunc`
- `$2` = `newFunc`
- `$ARGUMENTS` = `oldFunc newFunc`

## Практические примеры

### Сравнение двух файлов

Файл `.claude/commands/compare.md`:

```markdown
---
description: "Сравнивает два файла (файл1 файл2)"
allowed-tools:
  - Read
---

Прочитай два файла и сравни их:
- Файл 1: $1
- Файл 2: $2

Покажи:
1. Что общего между файлами
2. Ключевые различия
3. Какой подход лучше и почему
```

Вызов:

```
/compare src/v1/auth.ts src/v2/auth.ts
```

### Переименование сущности

Файл `.claude/commands/rename.md`:

```markdown
---
description: "Переименовывает сущность во всём проекте (старое_имя новое_имя)"
---

Переименуй "$1" в "$2" во всём проекте.

Шаги:
1. Найди все файлы, содержащие "$1"
2. Замени все вхождения на "$2"
3. Переименуй файлы, если имя сущности совпадает с именем файла
4. Обнови импорты
5. Покажи список всех изменённых файлов
```

Вызов:

```
/rename UserService AccountService
```

### Создание API-маршрута

Файл `.claude/commands/route.md`:

```markdown
---
description: "Создаёт API-маршрут (метод путь ресурс)"
---

Создай API-маршрут:
- HTTP-метод: $1
- Путь: $2
- Ресурс: $3

Включи:
- Обработчик маршрута
- Валидацию параметров
- Типы запроса и ответа
- Обработку ошибок
```

Вызов:

```
/route GET /api/users users
```

## Что если аргументов меньше, чем ожидается

Если команда использует `$1`, `$2`, `$3`, а ты передал только два аргумента, `$3` останется как есть (буквально `$3`) или будет пустым. Это может привести к странному промпту.

Защитись от этого в тексте команды:

```markdown
---
description: "Создаёт файл (имя тип [директория])"
---

Создай файл с именем $1 и типом $2.

Директория: $3
Если директория не указана, используй src/components/.
```

!!! tip "Совет"
    Указывай в `description` количество и порядок аргументов. Используй квадратные скобки для опциональных: `(имя тип [директория])`.

## Итоги

- Каноническая форма — `$ARGUMENTS[N]` с нулевой индексацией
- `$1`, `$2`, `$3` — удобные сокращения для позиционных аргументов
- `$ARGUMENTS` по-прежнему содержит весь ввод целиком
- Аргументы с пробелами не поддерживаются --- используй дефисы
- Указывай ожидаемые аргументы в `description` и `argument-hint`

## Проверь себя

<div class="quiz-block" data-quiz-id="u25-q1" data-answer="a" markdown>
  <div class="quiz-question">Чем разделяются позиционные аргументы при вызове команды?</div>
  <label><input type="radio" name="u25-q1" value="a"> Пробелами</label>
  <label><input type="radio" name="u25-q1" value="b"> Запятыми</label>
  <label><input type="radio" name="u25-q1" value="c"> Точками с запятой</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u25-q2" data-answer="c" markdown>
  <div class="quiz-question">Что содержит $2 при вызове `/cmd alpha beta gamma`?</div>
  <label><input type="radio" name="u25-q2" value="a"> alpha</label>
  <label><input type="radio" name="u25-q2" value="b"> gamma</label>
  <label><input type="radio" name="u25-q2" value="c"> beta</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u25-q3" data-answer="b" markdown>
  <div class="quiz-question">Что содержит $ARGUMENTS при вызове `/cmd alpha beta gamma`?</div>
  <label><input type="radio" name="u25-q3" value="a"> alpha</label>
  <label><input type="radio" name="u25-q3" value="b"> alpha beta gamma</label>
  <label><input type="radio" name="u25-q3" value="c"> gamma</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u25-q4" data-answer="a" markdown>
  <div class="quiz-question">Как передать значение с пробелом как один аргумент?</div>
  <label><input type="radio" name="u25-q4" value="a"> Это не поддерживается --- используй дефисы вместо пробелов</label>
  <label><input type="radio" name="u25-q4" value="b"> Обернуть в кавычки: "my value"</label>
  <label><input type="radio" name="u25-q4" value="c"> Использовать обратный слеш: my\ value</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u25-q5" data-answer="c" markdown>
  <div class="quiz-question">Какая хорошая практика при создании команд с аргументами?</div>
  <label><input type="radio" name="u25-q5" value="a"> Не использовать description</label>
  <label><input type="radio" name="u25-q5" value="b"> Всегда требовать ровно 5 аргументов</label>
  <label><input type="radio" name="u25-q5" value="c"> Указывать ожидаемые аргументы в description</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
