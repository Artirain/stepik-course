---
title: "Урок 39. Claude Code on the Web"
description: "Актуальный обзор Claude Code on the Web: research preview, доступ и сценарии"
last_verified: "2026-03-01"
---

# Claude Code on the Web

## Что это

Claude Code on the Web — браузерный режим Claude Code в формате research preview.

Точка входа: <https://claude.ai/code>

## Кому доступно сейчас

По актуальной документации:

- доступно: **Pro**, **Max**
- в планах: Team и Enterprise premium seats

## Что умеет

- асинхронные задачи в облачной среде
- работа с GitHub-репозиториями
- запуск задач без локальной установки CLI
- перенос задачи из web обратно в локальный терминал

## Когда использовать

- нужно быстро запустить задачу из браузера
- удобно делегировать фоновую работу
- нет локального checkout под рукой

## Когда лучше CLI

- нужен полный локальный контроль окружения
- важны тонкие shell-процессы и локальные инструменты
- нужна строгая интеграция в локальный инженерный workflow

## Проверь себя

<div class="quiz-block" data-quiz-id="u39-q1" data-answer="b" markdown>
  <div class="quiz-question">Где открывается Claude Code on the Web?</div>
  <label><input type="radio" name="u39-q1" value="a"> claude.ai/chat</label>
  <label><input type="radio" name="u39-q1" value="b"> claude.ai/code</label>
  <label><input type="radio" name="u39-q1" value="c"> npmjs.com</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u39-q2" data-answer="a" markdown>
  <div class="quiz-question">Кому доступен web-режим на 1 марта 2026?</div>
  <label><input type="radio" name="u39-q2" value="a"> Pro и Max</label>
  <label><input type="radio" name="u39-q2" value="b"> Только Enterprise</label>
  <label><input type="radio" name="u39-q2" value="c"> Только API-пользователям</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u39-q3" data-answer="c" markdown>
  <div class="quiz-question">Когда CLI обычно предпочтительнее web?</div>
  <label><input type="radio" name="u39-q3" value="a"> Когда хочешь работать без установки</label>
  <label><input type="radio" name="u39-q3" value="b"> Когда нужен только обзор PR</label>
  <label><input type="radio" name="u39-q3" value="c"> Когда нужен полный локальный контроль среды</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
