---
title: "Урок 15. Старт, завершение, возобновление"
description: "Полный гайд по управлению сессиями Claude Code: запуск, продолжение, возобновление из списка"
---

# Полный гайд по старту, завершению и возобновлению

!!! info "Что ты узнаешь"
    - Как запускать новые и продолжать старые сессии
    - Разница между --continue и --resume
    - Как управлять историей сессий

## Введение

Сессия в Claude Code — это один непрерывный диалог с агентом. Ты можешь завершить сессию и вернуться к ней позже. Claude Code сохраняет контекст разговора.

## Запуск новой сессии

```bash
# Простой запуск (новая сессия)
claude
```

## Продолжение последней сессии

```bash
# Продолжить последнюю сессию
claude --continue
# или короткая форма
claude -c
```

Claude Code загрузит контекст последнего разговора и ты сможешь продолжить с того места, где остановился.

## Возобновление из списка

```bash
# Показать список прошлых сессий и выбрать
claude --resume
# или короткая форма
claude -r
```

Ты увидишь список последних сессий с описанием. Выбери нужную и продолжи работу.

## Завершение сессии

| Способ | Что происходит |
|--------|---------------|
| `/exit` | Корректное завершение, сессия сохраняется |
| ++ctrl+d++ | То же, что /exit |
| ++ctrl+c++ | Прерывает текущую операцию, НЕ завершает сессию |

## Когда начинать новую сессию

!!! tip "Начни новую сессию, если:"
    - Переключаешься на совершенно другую задачу
    - Контекст сильно загрязнён (даже /compact не помогает)
    - Прошло много времени с последней сессии

!!! tip "Продолжи старую, если:"
    - Задача не завершена
    - Нужен контекст предыдущего разговора
    - Хочешь доработать результат

## Практика

1. Запусти новую сессию: `claude`
2. Задай 2-3 вопроса, заверши через `/exit`
3. Продолжи: `claude --continue`
4. Убедись, что контекст сохранился
5. Попробуй `claude --resume` — посмотри список сессий

## Итоги

- `claude` — новая сессия
- `claude --continue` / `-c` — продолжить последнюю
- `claude --resume` / `-r` — выбрать из списка
- Завершение: `/exit` или `Ctrl+D`
- `Ctrl+C` только прерывает операцию, не завершает сессию

## Проверь себя

<div class="quiz-block" data-quiz-id="u15-q1" data-answer="b">
  <div class="quiz-question">Какой флаг продолжает последнюю сессию?</div>
  <label><input type="radio" name="u15-q1" value="a"> --resume</label>
  <label><input type="radio" name="u15-q1" value="b"> --continue</label>
  <label><input type="radio" name="u15-q1" value="c"> --last</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u15-q2" data-answer="a">
  <div class="quiz-question">Что делает claude --resume?</div>
  <label><input type="radio" name="u15-q2" value="a"> Показывает список сессий для выбора</label>
  <label><input type="radio" name="u15-q2" value="b"> Продолжает последнюю сессию</label>
  <label><input type="radio" name="u15-q2" value="c"> Перезапускает Claude Code</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u15-q3" data-answer="c">
  <div class="quiz-question">Какой способ корректно завершает сессию с сохранением?</div>
  <label><input type="radio" name="u15-q3" value="a"> Ctrl+C</label>
  <label><input type="radio" name="u15-q3" value="b"> Закрыть терминал</label>
  <label><input type="radio" name="u15-q3" value="c"> /exit или Ctrl+D</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
