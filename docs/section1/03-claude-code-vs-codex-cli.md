---
title: "Урок 3. Claude Code vs Codex CLI"
description: "Сравнение Claude Code и Codex CLI: где инструменты сходятся, а где отличаются подходом"
last_verified: "2026-03-01"
---

# Claude Code vs Codex CLI

!!! info "Что ты узнаешь"
    - Что общего у Claude Code и Codex CLI сегодня
    - В чём реальные различия по workflow
    - Как выбрать инструмент под конкретный тип работы

## Введение

Оба инструмента — полноценные терминальные coding-агенты. Историческое сравнение «у одного есть X, у другого нет» быстро устаревает: обе платформы активно добавляют функции.

Поэтому важнее сравнивать не «галочки», а **операционный стиль работы**.

## Что общего

- CLI-подход: работа из терминала
- чтение/редактирование файлов
- запуск команд
- контроль разрешений
- интеграция в автоматизацию и CI
- расширяемость через дополнительные механизмы (MCP/правила/конфиги)

## Где различаются на практике

| Критерий | Claude Code | Codex CLI |
|----------|-------------|-----------|
| Основная модельная экосистема | Claude | OpenAI GPT/o-series |
| Центральный формат проектных правил | CLAUDE.md + rules/hooks | AGENTS.md + конфиг Codex |
| Подход к автоматизации | hooks + headless + MCP + cloud workflows | CLI automation + approvals + MCP + навыки/инструкции |
| Web/облачный сценарий | Claude Code on the Web + интеграции | Codex cloud tasks/PR reviews в экосистеме OpenAI |
| Сильная сторона | Глубокая интеграция с экосистемой Claude | Плотная интеграция с экосистемой OpenAI |

## Практический выбор

**Выбирай Claude Code, если:**

- у тебя уже рабочий процесс на Anthropic
- важны текущие Claude-ориентированные паттерны (CLAUDE.md, hooks и т.д.)
- команда уже стандартизировала процессы вокруг Claude Code

**Выбирай Codex CLI, если:**

- основной стек у тебя в OpenAI-экосистеме
- ты строишь процессы на AGENTS.md/инфраструктуре Codex
- важно упростить интеграцию с уже существующими OpenAI-пайплайнами

## Важный вывод

В 2026 это не выбор «сильный vs слабый», а выбор **экосистемы и операционной модели**.

## Практика

1. Возьми одну и ту же задачу (например, фикс бага + тесты).
2. Запусти её в обоих инструментах.
3. Сравни не «качество одного ответа», а цикл: правки, проверки, стоимость, удобство контроля.

## Итоги

- Оба инструмента уже покрывают базовый набор возможностей coding-агента
- Ключевая разница — экосистема, conventions и интеграции
- Решение лучше принимать после короткого hands-on сравнения на своей задаче

## Проверь себя

<div class="quiz-block" data-quiz-id="u03-q1" data-answer="b">
  <div class="quiz-question">Что сейчас обычно важнее при выборе между Claude Code и Codex CLI?</div>
  <label><input type="radio" name="u03-q1" value="a"> Иконка инструмента</label>
  <label><input type="radio" name="u03-q1" value="b"> Экосистема и рабочий процесс команды</label>
  <label><input type="radio" name="u03-q1" value="c"> Количество звёзд на GitHub</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u03-q2" data-answer="c">
  <div class="quiz-question">Как корректнее сравнивать инструменты?</div>
  <label><input type="radio" name="u03-q2" value="a"> По одному скриншоту</label>
  <label><input type="radio" name="u03-q2" value="b"> По чужим комментариям</label>
  <label><input type="radio" name="u03-q2" value="c"> По полному рабочему циклу на одинаковой задаче</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u03-q3" data-answer="a">
  <div class="quiz-question">Верно ли, что в 2026 корректно считать один из этих инструментов «безнадёжно урезанным»?</div>
  <label><input type="radio" name="u03-q3" value="a"> Нет, оба активно развиваются</label>
  <label><input type="radio" name="u03-q3" value="b"> Да, всегда Codex CLI</label>
  <label><input type="radio" name="u03-q3" value="c"> Да, всегда Claude Code</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
