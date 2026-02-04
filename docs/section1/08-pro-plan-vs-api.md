---
title: "Урок 8. Pro-план vs API-оплата"
description: "Когда выгоднее подписка Pro/Max, а когда API-ключ: сравнение моделей оплаты Claude Code"
---

# Pro-план vs API-оплата

!!! info "Что ты узнаешь"
    - Как работает оплата через подписку (Pro/Max)
    - Как настроить API-ключ для Claude Code
    - Когда выгоднее каждый вариант

## Введение

Claude Code поддерживает два способа оплаты: подписка через claude.ai и API-ключ через console.anthropic.com. Каждый способ имеет свои плюсы, и выбор зависит от интенсивности использования.

## Подписка (Pro / Max)

Подписка — фиксированная ежемесячная плата. Ты не считаешь токены, просто работаешь.

**Плюсы:**

- Предсказуемый бюджет
- Не нужно думать о токенах
- Простая авторизация через браузер

**Минусы:**

- Есть лимиты на количество запросов
- При достижении лимита — ожидание до следующего периода

## API-оплата

API-ключ — оплата по факту использования. Каждый запрос стоит определённое количество токенов.

**Настройка:**

```bash
# Установи переменную окружения
export ANTHROPIC_API_KEY=sk-ant-api-xxxxx

# Или добавь в ~/.bashrc / ~/.zshrc для постоянного использования
echo 'export ANTHROPIC_API_KEY=sk-ant-api-xxxxx' >> ~/.bashrc
source ~/.bashrc
```

**Плюсы:**

- Полный контроль над расходами
- Нет лимитов — платишь за то, что используешь
- Можно использовать параллельно несколько сессий

**Минусы:**

- Непредсказуемый бюджет при интенсивной работе
- Нужно следить за балансом

## Стоимость токенов (API)

| Модель | Input (за 1M токенов) | Output (за 1M токенов) |
|--------|----------------------|------------------------|
| Opus | $15 | $75 |
| Sonnet | $3 | $15 |
| Haiku | $0.25 | $1.25 |

!!! tip "Сколько это в реальности?"
    Один типичный запрос в Claude Code (прочитать файл, изменить код, запустить тест) — примерно 5-20K токенов. При API-оплате это $0.01-0.30 на Sonnet.

## Когда что выбирать

| Сценарий | Рекомендация |
|----------|-------------|
| Начинаю изучать | Pro подписка ($20) |
| Работаю каждый день, 2-4 часа | Max $100 |
| Работаю интенсивно, 6-8 часов | Max $200 или API |
| Эпизодическое использование | API-ключ |
| CI/CD и автоматизация | API-ключ |

## Практика

1. Определи свой паттерн использования (ежедневно / эпизодически)
2. Посчитай примерный бюджет при API-оплате
3. Выбери оптимальный вариант и настрой авторизацию

## Итоги

- Подписка — предсказуемый бюджет, есть лимиты
- API — оплата по факту, полный контроль, нет лимитов
- Для начала хватит Pro ($20), для работы — Max или API
- API-ключ настраивается через `ANTHROPIC_API_KEY`

## Проверь себя

<div class="quiz-block" data-quiz-id="u08-q1" data-answer="b">
  <div class="quiz-question">Какая переменная окружения нужна для API-оплаты?</div>
  <label><input type="radio" name="u08-q1" value="a"> CLAUDE_API_KEY</label>
  <label><input type="radio" name="u08-q1" value="b"> ANTHROPIC_API_KEY</label>
  <label><input type="radio" name="u08-q1" value="c"> OPENAI_API_KEY</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u08-q2" data-answer="c">
  <div class="quiz-question">Какой способ оплаты лучше для CI/CD-автоматизации?</div>
  <label><input type="radio" name="u08-q2" value="a"> Pro подписка</label>
  <label><input type="radio" name="u08-q2" value="b"> Max подписка</label>
  <label><input type="radio" name="u08-q2" value="c"> API-ключ</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u08-q3" data-answer="a">
  <div class="quiz-question">Какая модель самая дешёвая при API-оплате?</div>
  <label><input type="radio" name="u08-q3" value="a"> Haiku</label>
  <label><input type="radio" name="u08-q3" value="b"> Sonnet</label>
  <label><input type="radio" name="u08-q3" value="c"> Opus</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
