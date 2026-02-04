---
title: "Урок 13. Расширенный режим мышления"
description: "Extended thinking в Claude Code: когда включать, как влияет на результат и стоимость"
---

# Расширенный режим мышления

!!! info "Что ты узнаешь"
    - Что такое extended thinking и как он работает
    - Когда его использовать, а когда — нет
    - Как thinking tokens влияют на стоимость

## Введение

Extended thinking (расширенное мышление) — режим, в котором Claude «думает» перед ответом. Модель выстраивает цепочку рассуждений, прежде чем дать финальный результат. Это повышает качество на сложных задачах, но стоит дополнительных токенов.

## Как это работает

Обычный режим: вопрос → ответ. Extended thinking: вопрос → внутренние рассуждения → ответ.

Claude анализирует задачу по шагам: разбирает условия, рассматривает варианты, выбирает лучший подход — и только потом отвечает.

## Когда включать

!!! tip "Extended thinking полезен для:"
    - Сложных архитектурных решений
    - Дебага запутанных багов
    - Рефакторинга с учётом множества зависимостей
    - Security-ревью
    - Оптимизации производительности

## Когда НЕ включать

!!! warning "Extended thinking избыточен для:"
    - Простых правок (изменить строку, добавить комментарий)
    - Генерации типового кода
    - Быстрых вопросов
    - Документации

На простых задачах extended thinking только тратит токены, не улучшая результат.

## Влияние на стоимость

Thinking tokens — это дополнительные токены, которые модель тратит на рассуждения. Они не видны в финальном ответе, но оплачиваются при API-использовании.

| Задача | Без thinking | С thinking |
|--------|-------------|------------|
| Простая правка | ~2K tokens | ~8K tokens |
| Сложный рефакторинг | ~10K tokens | ~25K tokens |
| Архитектурный анализ | ~15K tokens | ~40K tokens |

## Практика

1. Попробуй дать Claude Code сложную задачу с extended thinking
2. Сравни качество с обычным режимом
3. Оцени разницу в скорости ответа

## Итоги

- Extended thinking — режим с внутренними рассуждениями перед ответом
- Улучшает качество на сложных задачах
- Тратит больше токенов и времени
- Не нужен для простых правок

## Проверь себя

<div class="quiz-block" data-quiz-id="u13-q1" data-answer="b">
  <div class="quiz-question">Что происходит в режиме extended thinking?</div>
  <label><input type="radio" name="u13-q1" value="a"> Claude отвечает быстрее</label>
  <label><input type="radio" name="u13-q1" value="b"> Claude выстраивает цепочку рассуждений перед ответом</label>
  <label><input type="radio" name="u13-q1" value="c"> Claude подключает внешние источники данных</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u13-q2" data-answer="c">
  <div class="quiz-question">Для какой задачи extended thinking НЕ нужен?</div>
  <label><input type="radio" name="u13-q2" value="a"> Архитектурный анализ</label>
  <label><input type="radio" name="u13-q2" value="b"> Security-ревью</label>
  <label><input type="radio" name="u13-q2" value="c"> Добавление комментария в код</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u13-q3" data-answer="a">
  <div class="quiz-question">Как extended thinking влияет на стоимость?</div>
  <label><input type="radio" name="u13-q3" value="a"> Увеличивает расход токенов</label>
  <label><input type="radio" name="u13-q3" value="b"> Не влияет</label>
  <label><input type="radio" name="u13-q3" value="c"> Уменьшает расход</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
