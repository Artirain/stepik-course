---
title: "Урок 12. Базовые команды"
description: "Полный справочник slash-команд Claude Code: /help, /model, /compact, /clear, /cost, /doctor и другие"
---

# Базовые команды Claude Code

!!! info "Что ты узнаешь"
    - Все основные slash-команды и для чего они
    - Горячие клавиши для быстрой работы
    - Когда использовать /compact и /clear

## Введение

Claude Code управляется через slash-команды — они начинаются с `/`. Это встроенные инструменты для управления сессией, моделью, контекстом и настройками.

## Основные команды

| Команда | Описание |
|---------|----------|
| `/help` | Показать список всех команд |
| `/model` | Переключить модель (Opus/Sonnet/Haiku) |
| `/status` | Информация о текущей сессии |
| `/cost` | Показать расход токенов |
| `/permissions` | Настройки разрешений |
| `/config` | Общие настройки |
| `/compact` | Сжать контекст (суммаризация) |
| `/clear` | Полностью очистить контекст |
| `/exit` | Завершить сессию |
| `/doctor` | Диагностика проблем |
| `/hooks` | Настройка hooks |

## Подробнее о ключевых командах

### /compact — сжатие контекста

Когда контекст разрастается и Claude начинает «забывать» начало разговора, `/compact` суммаризирует историю, освобождая место.

```
/compact
```

!!! tip "Когда использовать"
    - Сессия длится больше 30 минут
    - Claude начинает повторяться или «забывать»
    - Индикатор контекста показывает >70%

### /clear — полная очистка

В отличие от `/compact`, `/clear` удаляет весь контекст. Используй, когда переключаешься на совершенно другую задачу.

### /cost — контроль расходов

```
/cost
```

Показывает, сколько токенов ты использовал в текущей сессии. Полезно при API-оплате.

### /doctor — диагностика

```
/doctor
```

Проверяет здоровье Claude Code: версия, авторизация, подключение к API, настройки.

## Горячие клавиши

| Клавиша | Действие |
|---------|----------|
| ++esc++ | Отменить текущий ввод |
| ++ctrl+c++ | Прервать операцию Claude |
| ++ctrl+d++ | Завершить сессию |
| ++up++ | Предыдущий промпт |

## Практика

1. Запусти Claude Code
2. Набери `/help` — изучи список команд
3. Попробуй `/model` — переключись на другую модель
4. Набери `/status` — посмотри информацию о сессии
5. Попробуй `/cost` — посмотри расход токенов

## Итоги

- Slash-команды начинаются с `/` и управляют сессией
- `/compact` — сжать контекст, `/clear` — полностью очистить
- `/model` — переключить модель, `/cost` — расход токенов
- `/doctor` — диагностика проблем

## Проверь себя

<div class="quiz-block" data-quiz-id="u12-q1" data-answer="b">
  <div class="quiz-question">Какая команда сжимает контекст без его удаления?</div>
  <label><input type="radio" name="u12-q1" value="a"> /clear</label>
  <label><input type="radio" name="u12-q1" value="b"> /compact</label>
  <label><input type="radio" name="u12-q1" value="c"> /reset</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u12-q2" data-answer="a">
  <div class="quiz-question">Какая команда показывает расход токенов?</div>
  <label><input type="radio" name="u12-q2" value="a"> /cost</label>
  <label><input type="radio" name="u12-q2" value="b"> /usage</label>
  <label><input type="radio" name="u12-q2" value="c"> /tokens</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u12-q3" data-answer="c">
  <div class="quiz-question">Что делает /clear в отличие от /compact?</div>
  <label><input type="radio" name="u12-q3" value="a"> Сжимает контекст</label>
  <label><input type="radio" name="u12-q3" value="b"> Перезапускает Claude Code</label>
  <label><input type="radio" name="u12-q3" value="c"> Полностью удаляет контекст</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
