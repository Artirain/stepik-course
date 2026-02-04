---
title: "Урок 14. Выбор модели под задачу"
description: "Практические рекомендации по выбору модели Claude для разных типов задач в разработке"
---

# Оптимальный выбор модели под разные задачи

!!! info "Что ты узнаешь"
    - Какую модель выбирать под конкретный тип задачи
    - Стратегию переключения моделей в рабочем процессе
    - Как экономить токены без потери качества

## Введение

В [Уроке 5](05-opus-sonnet-haiku.md) мы разобрали характеристики моделей. Теперь перейдём к практике — какую модель выбирать для конкретных задач, с которыми ты сталкиваешься каждый день.

## Матрица выбора

| Задача | Модель | Почему |
|--------|--------|--------|
| Проектирование архитектуры | Opus | Нужен глубокий анализ |
| Рефакторинг 10+ файлов | Opus | Нужно держать контекст |
| Security-ревью | Opus | Критически важна точность |
| Новая фича (2-3 файла) | Sonnet | Баланс скорость/качество |
| Написание тестов | Sonnet | Типовая задача |
| Code review | Sonnet | Хорошее качество анализа |
| Баг-фикс | Sonnet | Обычно достаточно |
| Исправление опечатки | Haiku | Тривиальная задача |
| Генерация документации | Haiku | Простая генерация |
| Sub-agent задачи | Haiku | Экономия на подзадачах |

## Стратегия переключения

!!! tip "Рабочий воркфлоу"
    1. **Старт дня** — Sonnet для текущих задач
    2. **Сложная проблема** — переключись на Opus
    3. **Рутина** — переключись на Haiku
    4. **Вернись к Sonnet** — для следующей задачи

```bash
# Быстрое переключение в сессии
/model sonnet   # для обычной работы
/model opus     # для сложного
/model haiku    # для простого
```

## Экономия токенов

- Не используй Opus для простых задач — это как стрелять из пушки по воробьям
- Haiku для sub-agents экономит до 10x по сравнению с Opus
- Если Sonnet справляется — не переключайся на Opus

## Практика

Возьми список задач из своего текущего проекта и распредели их по моделям. Попробуй неделю осознанно переключаться между моделями.

## Итоги

- Opus — сложные, архитектурные, критически важные задачи
- Sonnet — ежедневная основная работа
- Haiku — рутина, документация, sub-agents
- Осознанное переключение экономит токены и время

## Проверь себя

<div class="quiz-block" data-quiz-id="u14-q1" data-answer="c">
  <div class="quiz-question">Какую модель лучше использовать для sub-agent задач?</div>
  <label><input type="radio" name="u14-q1" value="a"> Opus</label>
  <label><input type="radio" name="u14-q1" value="b"> Sonnet</label>
  <label><input type="radio" name="u14-q1" value="c"> Haiku</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u14-q2" data-answer="b">
  <div class="quiz-question">С какой модели рекомендуется начинать рабочий день?</div>
  <label><input type="radio" name="u14-q2" value="a"> Opus</label>
  <label><input type="radio" name="u14-q2" value="b"> Sonnet</label>
  <label><input type="radio" name="u14-q2" value="c"> Haiku</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u14-q3" data-answer="a">
  <div class="quiz-question">Какая модель лучше для security-ревью?</div>
  <label><input type="radio" name="u14-q3" value="a"> Opus</label>
  <label><input type="radio" name="u14-q3" value="b"> Sonnet</label>
  <label><input type="radio" name="u14-q3" value="c"> Haiku</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
