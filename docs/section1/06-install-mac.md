---
title: "Урок 6. Установка на Mac"
description: "Пошаговая установка Claude Code на macOS: Node.js, npm, авторизация и проверка работоспособности"
---

# Установка Claude Code на Mac

!!! info "Что ты узнаешь"
    - Какие требования нужны для установки
    - Как установить Node.js и Claude Code
    - Как пройти авторизацию и проверить работоспособность

## Введение

Установка Claude Code на macOS — процесс из нескольких простых шагов. Тебе понадобится Node.js 18+ и менеджер пакетов npm. Весь процесс занимает 5-10 минут.

## Требования

- macOS 12 (Monterey) или новее
- Node.js 18+ (рекомендуется LTS-версия)
- Терминал (встроенный Terminal.app или iTerm2)
- Аккаунт Anthropic (Pro/Max подписка или API-ключ)

## Шаг 1: Установка Node.js

=== "Через Homebrew (рекомендуется)"

    ```bash
    # Установи Homebrew, если ещё нет
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

    # Установи Node.js
    brew install node
    ```

=== "Через nvm"

    ```bash
    # Установи nvm
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

    # Перезапусти терминал, затем:
    nvm install --lts
    nvm use --lts
    ```

Проверь установку:

```bash
node --version  # Должно быть 18.x или выше
npm --version   # Должно быть 9.x или выше
```

## Шаг 2: Установка Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

!!! warning "Ошибка доступа?"
    Если получаешь `EACCES`, не используй `sudo`. Лучше настрой npm на установку без root-прав:
    ```bash
    mkdir ~/.npm-global
    npm config set prefix '~/.npm-global'
    echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
    source ~/.zshrc
    ```

## Шаг 3: Первый запуск и авторизация

```bash
# Перейди в папку любого проекта
cd ~/my-project

# Запусти Claude Code
claude
```

При первом запуске откроется браузер для авторизации через Anthropic Console. Войди в свой аккаунт и подтверди доступ.

## Шаг 4: Проверка работоспособности

После авторизации ты увидишь промпт Claude Code. Попробуй:

```
> Привет! Расскажи, какие файлы есть в этой папке.
```

Если Claude Code отвечает и показывает содержимое папки — всё работает.

## Обновление

```bash
npm update -g @anthropic-ai/claude-code
```

## Диагностика проблем

Если что-то пошло не так:

```bash
# Проверка здоровья Claude Code
claude /doctor
```

!!! tip "Частые проблемы"
    - **«command not found»** — Node.js не в PATH, перезапусти терминал
    - **Ошибка авторизации** — проверь подписку на console.anthropic.com
    - **Старая версия Node** — обнови через `brew upgrade node` или `nvm install --lts`

## Практика

1. Установи Node.js (если ещё нет)
2. Установи Claude Code через npm
3. Запусти `claude` в папке любого проекта
4. Попроси Claude Code описать структуру проекта

## Итоги

- Для macOS нужен Node.js 18+ (через Homebrew или nvm)
- Установка: `npm install -g @anthropic-ai/claude-code`
- Первый запуск: `claude` → авторизация через браузер
- Обновление: `npm update -g @anthropic-ai/claude-code`
- Диагностика: `claude /doctor`

## Проверь себя

<div class="quiz-block" data-quiz-id="u06-q1" data-answer="b">
  <div class="quiz-question">Какая минимальная версия Node.js нужна для Claude Code?</div>
  <label><input type="radio" name="u06-q1" value="a"> 14+</label>
  <label><input type="radio" name="u06-q1" value="b"> 18+</label>
  <label><input type="radio" name="u06-q1" value="c"> 20+</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u06-q2" data-answer="c">
  <div class="quiz-question">Какая команда устанавливает Claude Code?</div>
  <label><input type="radio" name="u06-q2" value="a"> brew install claude-code</label>
  <label><input type="radio" name="u06-q2" value="b"> pip install claude-code</label>
  <label><input type="radio" name="u06-q2" value="c"> npm install -g @anthropic-ai/claude-code</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u06-q3" data-answer="a">
  <div class="quiz-question">Какая команда запускает диагностику проблем?</div>
  <label><input type="radio" name="u06-q3" value="a"> claude /doctor</label>
  <label><input type="radio" name="u06-q3" value="b"> claude --diagnose</label>
  <label><input type="radio" name="u06-q3" value="c"> claude fix</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
