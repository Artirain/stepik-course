---
title: "Урок 7. Установка на Windows"
description: "Актуальная установка Claude Code на Windows: PowerShell/CMD, плюс варианты Git Bash и WSL"
last_verified: "2026-03-01"
---

# Установка Claude Code на Windows

!!! info "Что ты узнаешь"
    - Как установить Claude Code на Windows через PowerShell, CMD и WSL
    - Какой вариант подходит для твоего рабочего процесса
    - Как проверить успешность установки

## Введение

На 1 марта 2026 в quickstart есть три практичных варианта для Windows:

- PowerShell (нативный)
- CMD (нативный)
- WSL (Linux-окружение)

## Вариант 1: PowerShell

```powershell
irm https://claude.ai/install.ps1 | iex
```

После установки:

```powershell
claude
claude doctor
```

## Вариант 2: CMD

```cmd
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

## Вариант 3: WSL (если нужен Linux-стек)

```powershell
wsl --install -d Ubuntu
```

В Ubuntu:

```bash
curl -fsSL https://claude.ai/install.sh | bash
claude
claude doctor
```

## Когда что выбирать

| Сценарий | Вариант |
|---|---|
| Быстрый нативный старт | PowerShell/CMD |
| Linux-инструменты и Unix-workflow | WSL |

## Практика

1. Выбери один из трёх вариантов и установи Claude Code.
2. Запусти `claude doctor` и убедись, что статус — OK.
3. Выполни `claude --version` и запиши версию.

## Итоги

- На Windows доступны три способа: PowerShell, CMD и WSL
- PowerShell/CMD — самый быстрый нативный старт
- WSL — для тех, кому нужен Linux-стек
- `claude doctor` проверяет корректность установки

## Проверь себя

<div class="quiz-block" data-quiz-id="u07-q1" data-answer="b">
  <div class="quiz-question">Какая команда соответствует нативной установке в PowerShell?</div>
  <label><input type="radio" name="u07-q1" value="a"> curl -fsSL claude.ai/install.sh | bash</label>
  <label><input type="radio" name="u07-q1" value="b"> irm https://claude.ai/install.ps1 | iex</label>
  <label><input type="radio" name="u07-q1" value="c"> pip install claude-code</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u07-q2" data-answer="c">
  <div class="quiz-question">Когда чаще выбирают WSL?</div>
  <label><input type="radio" name="u07-q2" value="a"> Когда нужен только браузер</label>
  <label><input type="radio" name="u07-q2" value="b"> Когда не нужен терминал</label>
  <label><input type="radio" name="u07-q2" value="c"> Когда нужен Linux-стек и Unix-команды</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u07-q3" data-answer="a">
  <div class="quiz-question">Как проверить состояние установки после логина?</div>
  <label><input type="radio" name="u07-q3" value="a"> claude doctor</label>
  <label><input type="radio" name="u07-q3" value="b"> claude repair</label>
  <label><input type="radio" name="u07-q3" value="c"> claude --healthcheck-only</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
