---
title: "Урок 8. Pro-план vs API-оплата"
description: "Когда выгоднее подписка Pro/Max, а когда API-ключ: практический выбор модели оплаты"
last_verified: "2026-03-01"
---

# Pro-план vs API-оплата

!!! info "Что ты узнаешь"
    - В чём реальная разница между подпиской и API
    - Как считать API-расходы без самообмана
    - Как выбрать модель оплаты под твой сценарий

## Введение

У Claude Code есть два основных сценария оплаты:

- подписка (Pro/Max)
- API-ключ (помесячно по токенам)

Оба рабочие, но оптимальны для разных задач.

## Подписка (Pro / Max)

**Сильные стороны:**

- фиксированный бюджет
- быстрый старт без расчётов по токенам
- удобно для постоянной ручной разработки

**Ограничения:**

- есть лимиты использования
- при высокой нагрузке можно упираться в квоту

## API-оплата

**Сильные стороны:**

- оплата по факту
- легко автоматизировать (CI/CD, batch, headless)
- проще масштабировать под нестабильную нагрузку

**Ограничения:**

- бюджет нужно контролировать самому
- при плохой дисциплине расход может быть выше ожидаемого

## Настройка API-ключа

```bash
export ANTHROPIC_API_KEY=sk-ant-api-xxxxx
```

Для постоянной настройки:

```bash
echo 'export ANTHROPIC_API_KEY=sk-ant-api-xxxxx' >> ~/.bashrc
source ~/.bashrc
```

## Как проверять цену корректно

Цены на модели могут обновляться. Не держи «зашитую таблицу» в голове.

1. Проверяй официальный прайс перед расчётом: [Anthropic Pricing](https://www.anthropic.com/pricing#api)
2. Считай по формуле:

```text
Стоимость = (input_tokens / 1_000_000) * input_rate
         + (output_tokens / 1_000_000) * output_rate
```

3. Сверяй фактическое потребление по логам/метрикам, а не по ощущениям.

## Когда что выбирать

| Сценарий | Чаще лучше |
|----------|------------|
| Обучение и ручная ежедневная работа | Pro / Max |
| Стабильная высокая личная нагрузка | Max |
| CI/CD, боты, скрипты, интеграции | API |
| Нерегулярные всплески использования | API или гибрид |

## Практика

1. Выпиши 3 своих основных сценария: ручная работа, автоматизация, редкие тяжёлые задачи.
2. Для каждого оцени частоту и требование к предсказуемости бюджета.
3. Выбери схему: только подписка, только API или гибрид.

## Итоги

- Подписка = простота и фиксированный месячный платёж
- API = гибкость и автоматизация, но нужна финансовая дисциплина
- Цены моделей обязательно проверяются по официальному прайсу перед расчётами

## Проверь себя

<div class="quiz-block" data-quiz-id="u08-q1" data-answer="b">
  <div class="quiz-question">Какая переменная окружения нужна для API-доступа?</div>
  <label><input type="radio" name="u08-q1" value="a"> CLAUDE_API_KEY</label>
  <label><input type="radio" name="u08-q1" value="b"> ANTHROPIC_API_KEY</label>
  <label><input type="radio" name="u08-q1" value="c"> OPENAI_API_KEY</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u08-q2" data-answer="c">
  <div class="quiz-question">Что обычно лучше подходит для CI/CD-автоматизации?</div>
  <label><input type="radio" name="u08-q2" value="a"> Только Pro</label>
  <label><input type="radio" name="u08-q2" value="b"> Только Max</label>
  <label><input type="radio" name="u08-q2" value="c"> API-ключ</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u08-q3" data-answer="a">
  <div class="quiz-question">Где проверять актуальные API-цены перед расчётом?</div>
  <label><input type="radio" name="u08-q3" value="a"> На официальной странице Anthropic Pricing</label>
  <label><input type="radio" name="u08-q3" value="b"> В случайных таблицах в блогах</label>
  <label><input type="radio" name="u08-q3" value="c"> В старом README проекта</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
