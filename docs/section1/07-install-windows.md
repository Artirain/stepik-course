---
title: "Урок 7. Установка на Windows"
description: "Установка Claude Code на Windows через WSL2: пошаговое руководство от настройки WSL до первого запуска"
---

# Установка Claude Code на Windows

!!! info "Что ты узнаешь"
    - Почему Claude Code на Windows работает через WSL2
    - Как установить и настроить WSL2
    - Как установить Claude Code и пройти авторизацию

## Введение

Claude Code — это CLI-инструмент, разработанный для Unix-окружения. На Windows он работает через WSL2 (Windows Subsystem for Linux). Не пугайся — установка WSL2 занимает несколько минут, а дальше всё работает так же, как на Mac или Linux.

## Требования

- Windows 10 (версия 2004+) или Windows 11
- Включённая виртуализация в BIOS
- Аккаунт Anthropic (Pro/Max или API-ключ)

## Шаг 1: Установка WSL2

Открой PowerShell от имени администратора и выполни:

```powershell
wsl --install
```

Эта команда установит WSL2 и Ubuntu. После установки перезагрузи компьютер.

!!! tip "Если WSL уже установлен"
    Проверь версию: `wsl --version`. Убедись, что используется WSL 2, а не WSL 1.

## Шаг 2: Настройка Ubuntu

После перезагрузки запусти Ubuntu из меню «Пуск». При первом запуске создай имя пользователя и пароль.

```bash
# Обнови пакеты
sudo apt update && sudo apt upgrade -y
```

## Шаг 3: Установка Node.js

```bash
# Установи nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# Перезапусти терминал (закрой и открой Ubuntu заново)
# Затем установи Node.js
nvm install --lts
nvm use --lts

# Проверь
node --version  # 18.x или выше
npm --version
```

## Шаг 4: Установка Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

## Шаг 5: Первый запуск

```bash
# Перейди в папку проекта
cd /mnt/c/Users/ТвоёИмя/projects/my-project

# Запусти Claude Code
claude
```

!!! warning "Пути к файлам Windows"
    Диски Windows доступны в WSL по пути `/mnt/c/`, `/mnt/d/` и т.д. Твоя папка Documents: `/mnt/c/Users/ТвоёИмя/Documents/`.

## Интеграция с VS Code

VS Code отлично работает с WSL через расширение «Remote - WSL»:

1. Установи расширение **Remote - WSL** в VS Code
2. Открой терминал WSL в VS Code: `Ctrl+Shift+`` → выбери Ubuntu
3. Запускай Claude Code прямо из терминала VS Code

## Диагностика проблем

!!! tip "Частые проблемы"
    - **«WSL не установлен»** — проверь виртуализацию в BIOS (VT-x / AMD-V)
    - **Медленная файловая система** — работай в WSL-файлах (`~/projects`), а не в `/mnt/c/` для лучшей производительности
    - **Браузер не открывается** — установи `export BROWSER=wslview` в `~/.bashrc`

## Практика

1. Установи WSL2 и Ubuntu
2. Установи Node.js через nvm
3. Установи Claude Code
4. Запусти `claude` и пройди авторизацию

## Итоги

- Windows требует WSL2 для Claude Code
- Установка: WSL2 → Ubuntu → Node.js → Claude Code
- Файлы Windows доступны через `/mnt/c/`
- VS Code интегрируется с WSL через Remote - WSL

## Проверь себя

<div class="quiz-block" data-quiz-id="u07-q1" data-answer="b">
  <div class="quiz-question">Через что работает Claude Code на Windows?</div>
  <label><input type="radio" name="u07-q1" value="a"> Напрямую через PowerShell</label>
  <label><input type="radio" name="u07-q1" value="b"> Через WSL2 (Windows Subsystem for Linux)</label>
  <label><input type="radio" name="u07-q1" value="c"> Через Docker</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u07-q2" data-answer="a">
  <div class="quiz-question">Как установить WSL2?</div>
  <label><input type="radio" name="u07-q2" value="a"> wsl --install (в PowerShell от администратора)</label>
  <label><input type="radio" name="u07-q2" value="b"> npm install wsl</label>
  <label><input type="radio" name="u07-q2" value="c"> apt install wsl2</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u07-q3" data-answer="c">
  <div class="quiz-question">Где в WSL доступен диск C: Windows?</div>
  <label><input type="radio" name="u07-q3" value="a"> /windows/c/</label>
  <label><input type="radio" name="u07-q3" value="b"> /c/</label>
  <label><input type="radio" name="u07-q3" value="c"> /mnt/c/</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
