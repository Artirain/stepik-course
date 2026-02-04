---
title: "Урок 10. Первый сеанс"
description: "Первый запуск Claude Code: интерфейс, первые промпты, навигация и завершение сессии"
---

# Первый сеанс — от запуска до базовых операций

!!! info "Что ты узнаешь"
    - Как запустить Claude Code и что ты увидишь
    - Как формулировать первые промпты
    - Как завершить сессию

## Введение

Ты установил Claude Code и прошёл авторизацию. Пора начать первый сеанс. В этом уроке мы разберём интерфейс, научимся давать задачи и правильно завершать работу.

## Запуск

Открой терминал, перейди в папку проекта и запусти:

```bash
cd ~/my-project
claude
```

Ты увидишь приветствие и промпт для ввода. Claude Code сразу видит файлы в текущей папке.

## Первые промпты

Начни с простого — попроси объяснить проект:

```
> Какие файлы есть в этом проекте? Опиши структуру.
```

Claude Code прочитает файлы и даст обзор. Попробуй ещё:

```
> Какие зависимости использует этот проект?
> Есть ли тесты? Какой фреймворк используется?
> Покажи главный entry-point приложения.
```

!!! tip "Совет: будь конкретным"
    Вместо «помоги с кодом» пиши «добавь валидацию email в файл src/utils.js». Чем конкретнее промпт, тем лучше результат.

## Навигация в сессии

Во время сессии ты можешь:

- **Ввести текст** — задать вопрос или дать задачу
- **Нажать Esc** — отменить текущий ввод
- **Нажать Ctrl+C** — прервать текущую операцию Claude
- **Ввести /help** — показать список команд

## Завершение сессии

```bash
# Через команду
/exit

# Или горячей клавишей
Ctrl+D
```

!!! warning "Ctrl+C vs /exit"
    `Ctrl+C` прерывает текущую операцию, но не завершает сессию. Для выхода используй `/exit` или `Ctrl+D`.

## Практика

1. Запусти `claude` в любом проекте
2. Попроси описать структуру проекта
3. Задай 3-5 вопросов о коде
4. Заверши сессию через `/exit`

## Итоги

- Запуск: `claude` в папке проекта
- Claude Code сразу видит файлы и может анализировать проект
- Будь конкретным в промптах
- Завершение: `/exit` или `Ctrl+D`

## Проверь себя

<div class="quiz-block" data-quiz-id="u10-q1" data-answer="c">
  <div class="quiz-question">Как завершить сессию Claude Code?</div>
  <label><input type="radio" name="u10-q1" value="a"> Ctrl+C</label>
  <label><input type="radio" name="u10-q1" value="b"> /quit</label>
  <label><input type="radio" name="u10-q1" value="c"> /exit или Ctrl+D</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u10-q2" data-answer="b">
  <div class="quiz-question">Что делает Ctrl+C в Claude Code?</div>
  <label><input type="radio" name="u10-q2" value="a"> Завершает сессию</label>
  <label><input type="radio" name="u10-q2" value="b"> Прерывает текущую операцию</label>
  <label><input type="radio" name="u10-q2" value="c"> Копирует текст</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u10-q3" data-answer="a">
  <div class="quiz-question">Какой промпт эффективнее?</div>
  <label><input type="radio" name="u10-q3" value="a"> «Добавь валидацию email в src/utils.js»</label>
  <label><input type="radio" name="u10-q3" value="b"> «Помоги с кодом»</label>
  <label><input type="radio" name="u10-q3" value="c"> «Сделай что-нибудь полезное»</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
