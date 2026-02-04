---
title: "Урок 4. Pro и Max — сравнение цен"
description: "Обзор планов подписки Claude: Pro и Max, их лимиты, цены и рекомендации по выбору"
---

# Pro и Max — сравнение цен

!!! info "Что ты узнаешь"
    - Какие планы подписки существуют для Claude Code
    - Чем отличаются Pro, Max $100 и Max $200
    - Как выбрать оптимальный план под свои задачи

## Введение

Claude Code доступен через подписку на claude.ai или через API-ключ. Подписка — самый простой способ начать: фиксированная цена, без подсчёта токенов. Но какой план выбрать?

Anthropic предлагает три тарифа: Pro, Max $100 и Max $200. Разница — в объёме использования и доступных моделях.

## Сравнительная таблица планов

| Параметр | Pro | Max $100 | Max $200 |
|----------|-----|----------|----------|
| Цена | $20/мес | $100/мес | $200/мес |
| Claude Code | Да | Да | Да |
| Лимит использования | Базовый | 5× от Pro | 20× от Pro |
| Opus | Ограниченно | Да | Да, больше |
| Sonnet | Да | Да | Да |
| Haiku | Да | Да | Да |
| Extended thinking | Ограниченно | Да | Да |
| Headless-режим | Да | Да | Да |

## Какой план выбрать

### Pro ($20/мес) — для знакомства

!!! tip "Pro подходит, если:"
    - Ты только начинаешь изучать Claude Code
    - Используешь инструмент эпизодически
    - Хочешь попробовать перед вложением в Max

На Pro-плане ты получишь полноценный Claude Code, но с ограничениями на количество запросов. Для обучения и небольших проектов этого достаточно.

### Max $100/мес — для ежедневной работы

!!! tip "Max $100 подходит, если:"
    - Ты работаешь с Claude Code каждый день
    - Нужен стабильный доступ к Opus
    - Не хочешь думать о лимитах при обычной работе

Это оптимальный выбор для большинства разработчиков, которые используют Claude Code как основной инструмент.

### Max $200/мес — для интенсивного использования

!!! tip "Max $200 подходит, если:"
    - Claude Code — твой основной рабочий инструмент
    - Ты используешь Opus для сложных задач несколько раз в день
    - Работаешь над крупными проектами с большим контекстом

## Альтернатива: API-оплата

Помимо подписки, можно платить через API-ключ — по количеству использованных токенов. Об этом подробнее в [Уроке 8](08-pro-plan-vs-api.md).

## Практика

1. Оцени, сколько часов в день ты планируешь использовать Claude Code
2. Определи, нужен ли тебе Opus или достаточно Sonnet
3. Выбери план, который соответствует твоей интенсивности

## Итоги

- Pro ($20) — для знакомства и эпизодического использования
- Max $100 — для ежедневной работы, оптимальный выбор
- Max $200 — для интенсивного использования без ограничений
- Альтернатива — API-оплата по токенам

## Проверь себя

<div class="quiz-block" data-quiz-id="u04-q1" data-answer="a">
  <div class="quiz-question">Сколько стоит план Pro?</div>
  <label><input type="radio" name="u04-q1" value="a"> $20/мес</label>
  <label><input type="radio" name="u04-q1" value="b"> $100/мес</label>
  <label><input type="radio" name="u04-q1" value="c"> $200/мес</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u04-q2" data-answer="b">
  <div class="quiz-question">Какой план оптимален для ежедневной работы?</div>
  <label><input type="radio" name="u04-q2" value="a"> Pro</label>
  <label><input type="radio" name="u04-q2" value="b"> Max $100</label>
  <label><input type="radio" name="u04-q2" value="c"> Бесплатный</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u04-q3" data-answer="c">
  <div class="quiz-question">Во сколько раз больше использования даёт Max $200 по сравнению с Pro?</div>
  <label><input type="radio" name="u04-q3" value="a"> 5×</label>
  <label><input type="radio" name="u04-q3" value="b"> 10×</label>
  <label><input type="radio" name="u04-q3" value="c"> 20×</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
