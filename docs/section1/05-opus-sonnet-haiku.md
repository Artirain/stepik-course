---
title: "Урок 5. Выбор между Opus, Sonnet и Haiku"
description: "Как выбрать модель Claude для разных задач: Opus для сложного, Sonnet для ежедневной работы, Haiku для быстрых правок"
---

# Выбор между Opus, Sonnet и Haiku

!!! info "Что ты узнаешь"
    - Характеристики каждой модели Claude
    - Когда использовать Opus, Sonnet и Haiku
    - Как переключаться между моделями в Claude Code

## Введение

В Claude Code доступны три модели: Opus, Sonnet и Haiku. Каждая оптимизирована под свой класс задач. Правильный выбор модели — это баланс между качеством ответа, скоростью и стоимостью.

## Характеристики моделей

### Opus — мощность

Самая умная модель Claude. Opus лучше всех справляется с:

- Сложной архитектурой и системным дизайном
- Глубоким рефакторингом большого кодобейза
- Security-ревью и поиском уязвимостей
- Планированием и декомпозицией сложных задач

!!! warning "Минусы Opus"
    - Медленнее Sonnet и Haiku
    - Дороже при API-оплате
    - На Pro-плане доступен с ограничениями

### Sonnet — баланс

Основная рабочая модель. Sonnet — золотая середина:

- Ежедневное кодирование: фичи, баг-фиксы, тесты
- Работа с документацией
- Code review среднего уровня сложности
- Генерация типового кода

### Haiku — скорость

Самая быстрая и дешёвая модель:

- Простые правки и исправления
- Быстрые ответы на вопросы
- Генерация документации
- Работа sub-agents (изолированные подзадачи)

## Таблица сравнения

| Параметр | Opus | Sonnet | Haiku |
|----------|------|--------|-------|
| Качество | Максимальное | Высокое | Хорошее |
| Скорость | Медленная | Средняя | Быстрая |
| Стоимость (API) | Высокая | Средняя | Низкая |
| Сложные задачи | Отлично | Хорошо | Базово |
| Простые правки | Избыточно | Хорошо | Отлично |

## Переключение моделей

В Claude Code переключиться на другую модель можно в любой момент:

```bash
# В сессии Claude Code
/model

# Или при запуске
claude --model opus
claude --model sonnet
claude --model haiku
```

## Стратегия использования

!!! tip "Рекомендуемый подход"
    1. **Начинай с Sonnet** — для большинства задач его достаточно
    2. **Переключайся на Opus** — когда задача сложная и Sonnet не справляется
    3. **Используй Haiku** — для простых задач и sub-agents

## Практика

Попробуй мысленно распределить свои типичные задачи по моделям:

| Твоя задача | Рекомендуемая модель |
|-------------|---------------------|
| Написать новую фичу | Sonnet |
| Спроектировать архитектуру | Opus |
| Исправить опечатку | Haiku |

## Итоги

- **Opus** — для сложных задач, архитектуры, глубокого анализа
- **Sonnet** — основная рабочая модель для ежедневных задач
- **Haiku** — для быстрых правок и sub-agents
- Переключение через `/model` или флаг `--model`

## Проверь себя

<div class="quiz-block" data-quiz-id="u05-q1" data-answer="b">
  <div class="quiz-question">Какая модель рекомендуется как основная для ежедневной работы?</div>
  <label><input type="radio" name="u05-q1" value="a"> Opus</label>
  <label><input type="radio" name="u05-q1" value="b"> Sonnet</label>
  <label><input type="radio" name="u05-q1" value="c"> Haiku</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u05-q2" data-answer="c">
  <div class="quiz-question">Какая модель самая быстрая и дешёвая?</div>
  <label><input type="radio" name="u05-q2" value="a"> Opus</label>
  <label><input type="radio" name="u05-q2" value="b"> Sonnet</label>
  <label><input type="radio" name="u05-q2" value="c"> Haiku</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u05-q3" data-answer="a">
  <div class="quiz-question">Какую команду нужно ввести для переключения модели в сессии?</div>
  <label><input type="radio" name="u05-q3" value="a"> /model</label>
  <label><input type="radio" name="u05-q3" value="b"> /switch</label>
  <label><input type="radio" name="u05-q3" value="c"> /change-model</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u05-q4" data-answer="a">
  <div class="quiz-question">Для какой задачи лучше всего подходит Opus?</div>
  <label><input type="radio" name="u05-q4" value="a"> Проектирование архитектуры системы</label>
  <label><input type="radio" name="u05-q4" value="b"> Исправление опечатки в README</label>
  <label><input type="radio" name="u05-q4" value="c"> Генерация простого комментария</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
