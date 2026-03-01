---
title: "Урок 6. Установка на Mac"
description: "Пошаговая установка Claude Code на macOS: официальный install script, авторизация и проверка"
last_verified: "2026-03-01"
---

# Установка Claude Code на Mac

!!! info "Что ты узнаешь"
    - Как установить Claude Code официальным способом
    - Как пройти авторизацию
    - Как проверить установку и диагностику

## Введение

На **1 марта 2026** самый прямой путь для macOS/Linux — официальный install script от Anthropic.

## Требования

- macOS
- терминал (Terminal.app / iTerm2)
- интернет и аккаунт Claude

## Шаг 1: Установка Claude Code

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

После установки перезапусти терминал или выполни команду, которую покажет установщик для обновления `PATH`.

## Шаг 2: Первый запуск и авторизация

```bash
claude
```

При первом запуске откроется браузер для логина.

## Шаг 3: Проверка состояния

```bash
claude doctor
```

`claude doctor` проверяет конфигурацию, версию и состояние авторизации.

!!! note "Важно"
    `/doctor` — это slash-команда внутри интерактивной сессии Claude Code,
    а `claude doctor` — CLI-команда в терминале.

## Альтернатива через npm

Если тебе нужно управлять установкой через Node/npm:

```bash
npm install -g @anthropic-ai/claude-code
```

## Практика

1. Установи Claude Code через install script.
2. Запусти `claude` и пройди авторизацию.
3. Выполни `claude doctor`.

## Итоги

- Рекомендуемый путь на macOS: `curl -fsSL https://claude.ai/install.sh | bash`
- Проверка состояния: `claude doctor`
- npm-установка остаётся рабочей альтернативой

## Проверь себя

<div class="quiz-block" data-quiz-id="u06-q1" data-answer="b">
  <div class="quiz-question">Какая команда рекомендована для установки на macOS по официальному quickstart?</div>
  <label><input type="radio" name="u06-q1" value="a"> brew install claude-code</label>
  <label><input type="radio" name="u06-q1" value="b"> curl -fsSL https://claude.ai/install.sh | bash</label>
  <label><input type="radio" name="u06-q1" value="c"> pip install claude-code</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u06-q2" data-answer="a">
  <div class="quiz-question">Какой командой проверяют состояние установки из терминала?</div>
  <label><input type="radio" name="u06-q2" value="a"> claude doctor</label>
  <label><input type="radio" name="u06-q2" value="b"> claude /doctor</label>
  <label><input type="radio" name="u06-q2" value="c"> claude fix</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u06-q3" data-answer="c">
  <div class="quiz-question">Что верно про /doctor и claude doctor?</div>
  <label><input type="radio" name="u06-q3" value="a"> Это одна и та же CLI-команда</label>
  <label><input type="radio" name="u06-q3" value="b"> Работает только /doctor</label>
  <label><input type="radio" name="u06-q3" value="c"> /doctor — внутри сессии, claude doctor — в терминале</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
