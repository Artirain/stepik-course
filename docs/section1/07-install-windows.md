---
title: "Урок 7. Установка на Windows"
description: "Установка Claude Code на Windows через WSL2: пошаговое руководство от настройки WSL до первого запуска"
---

# Установка Claude Code на Windows

!!! info "Что ты узнаешь"
    - Почему Claude Code на Windows работает через WSL2
    - Как установить и настроить WSL2 с нуля
    - Как установить Claude Code и пройти авторизацию

## Введение

Claude Code — это CLI-инструмент, разработанный для Unix-окружения. На Windows он работает через WSL2 (Windows Subsystem for Linux). Не пугайся — установка WSL2 занимает несколько минут, а дальше всё работает так же, как на Mac или Linux.

## Требования

- Windows 10 (версия 2004+) или Windows 11
- Аккаунт Anthropic (Pro/Max или API-ключ)
- Включённая виртуализация в BIOS (см. раздел ниже)

### Проверка и включение виртуализации

Виртуализация нужна для работы WSL2. Проверь, включена ли она:

1. Нажми ++ctrl+shift+esc++ чтобы открыть Диспетчер задач
2. Перейди на вкладку **Производительность** → **ЦП**
3. Внизу найди строку **Виртуализация** — должно быть **Включено**

Если виртуализация выключена:

1. Перезагрузи компьютер и войди в BIOS (обычно клавиша ++del++, ++f2++ или ++f10++ при загрузке)
2. Найди раздел **Advanced** или **CPU Configuration**
3. Включи параметр:
   - Для Intel: **Intel VT-x** или **Intel Virtualization Technology**
   - Для AMD: **AMD-V** или **SVM Mode**
4. Сохрани (++f10++) и перезагрузись

## Шаг 1: Проверка WSL

Сначала проверим, установлен ли уже WSL. Открой **PowerShell** (можно без прав администратора):

```powershell
wsl --version
```

**Если видишь версию WSL** (например, `WSL version: 2.0.9`) — переходи к Шагу 2.

**Если видишь ошибку** — значит WSL не установлен, выполни установку ниже.

### Установка WSL

Открой **PowerShell от имени администратора**:

1. Нажми ++win++, напиши `powershell`
2. Правой кнопкой → **Запуск от имени администратора**

Выполни команду:

```powershell
wsl --install -d Ubuntu
```

!!! warning "Важно: используй именно эту команду"
    Команда `wsl --install` без указания дистрибутива может не установить Ubuntu автоматически. Используй `wsl --install -d Ubuntu` чтобы гарантированно установить Ubuntu.

После завершения **обязательно перезагрузи компьютер**.

## Шаг 2: Настройка Ubuntu

После перезагрузки нужно запустить Ubuntu:

1. Нажми ++win++ и напиши `Ubuntu`
2. Кликни на **Ubuntu** (оранжевая иконка с кругом)

При первом запуске Ubuntu попросит создать пользователя:

```
Enter new UNIX username: _
```

Введи имя пользователя (маленькими латинскими буквами, например `ivan`), затем создай пароль.

!!! tip "Пароль не отображается"
    Когда вводишь пароль, символы не показываются — это нормально для Linux. Просто введи пароль и нажми Enter.

После входа обнови пакеты:

```bash
sudo apt update && sudo apt upgrade -y
```

Система запросит пароль, который ты только что создал.

## Шаг 3: Установка Node.js

Claude Code требует Node.js 18+. Установим его через nvm (Node Version Manager).

**Часть 1: Установка nvm**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
```

**Важно:** После установки nvm нужно перезапустить терминал. Закрой окно Ubuntu и открой его снова (++win++ → `Ubuntu`).

**Часть 2: Установка Node.js**

После перезапуска терминала выполни:

```bash
nvm install --lts
nvm use --lts
```

**Часть 3: Проверка**

```bash
node --version
npm --version
```

Должно показать Node.js 18+ и npm 9+.

!!! tip "Если npm требует обновления"
    При установке Claude Code может появиться сообщение о необходимости обновить npm. Выполни команду, которую предложит система, например:
    ```bash
    npm install -g npm@11.9.0
    ```

## Шаг 4: Установка Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

## Шаг 5: Авторизация в Claude Code

Запусти Claude Code:

```bash
claude
```

При первом запуске откроется процесс авторизации:

1. Claude Code покажет ссылку для авторизации и спросит, открыть ли браузер
2. Нажми **Enter** — откроется браузер с сайтом Anthropic
3. Войди в свой аккаунт Anthropic (или создай, если нет)
4. Подтверди разрешение для Claude Code
5. После успешной авторизации вернись в терминал — Claude Code готов к работе

!!! warning "Если браузер не открывается"
    Скопируй ссылку из терминала и открой её вручную в браузере. Или добавь в `~/.bashrc`:
    ```bash
    echo 'export BROWSER=wslview' >> ~/.bashrc
    source ~/.bashrc
    ```

## Шаг 6: Первый запуск с проектом

```bash
# Перейди в папку проекта
cd /mnt/c/Users/ТвоёИмя/projects/my-project

# Запусти Claude Code
claude
```

!!! info "Пути к файлам Windows"
    Диски Windows доступны в WSL:

    - Диск C: → `/mnt/c/`
    - Диск D: → `/mnt/d/`
    - Папка Documents: `/mnt/c/Users/ТвоёИмя/Documents/`

## Интеграция с VS Code

VS Code отлично работает с WSL. Вот как настроить:

### Установка расширения Remote - WSL

1. Открой VS Code
2. Нажми ++ctrl+shift+x++ (или кликни на иконку расширений слева)
3. В поиске напиши `Remote - WSL`
4. Найди расширение **WSL** от Microsoft (иконка с пингвином)
5. Нажми **Install**

### Использование VS Code с WSL

**Способ 1: Из терминала Ubuntu**

```bash
cd /mnt/c/Users/ТвоёИмя/projects/my-project
code .
```

VS Code откроется и автоматически подключится к WSL.

**Способ 2: Из VS Code**

1. Нажми ++ctrl+shift+p++
2. Напиши `WSL: Connect to WSL`
3. Выбери дистрибутив Ubuntu

После подключения в левом нижнем углу VS Code появится зелёная плашка **WSL: Ubuntu**.

### Запуск Claude Code в VS Code

1. В VS Code нажми ++ctrl+grave++ чтобы открыть терминал
2. Убедись, что терминал показывает Ubuntu (не PowerShell)
3. Запусти `claude`

## Диагностика проблем

!!! tip "Частые проблемы и решения"

    **«WSL не установлен» или ошибка виртуализации**

    - Проверь, что виртуализация включена в BIOS (см. раздел выше)
    - Убедись, что используешь PowerShell от администратора

    **Ubuntu не появился после `wsl --install`**

    - Используй `wsl --install -d Ubuntu`
    - Перезагрузи компьютер

    **nvm: command not found**

    - Закрой терминал Ubuntu и открой заново
    - Если не помогло, выполни: `source ~/.bashrc`

    **Медленная работа с файлами Windows**

    - Файлы в `/mnt/c/` работают медленнее
    - Для лучшей производительности создай проекты в Ubuntu: `~/projects/`

    **Браузер не открывается при авторизации**

    - Скопируй ссылку вручную из терминала
    - Или настрой: `echo 'export BROWSER=wslview' >> ~/.bashrc && source ~/.bashrc`

## Практика

1. Проверь виртуализацию в Диспетчере задач
2. Установи WSL2 и Ubuntu
3. Создай пользователя в Ubuntu
4. Установи Node.js через nvm
5. Установи Claude Code
6. Пройди авторизацию
7. Установи расширение WSL в VS Code

## Итоги

- Windows требует WSL2 для Claude Code
- Установка: проверка виртуализации → WSL2 → Ubuntu → Node.js → Claude Code
- Авторизация происходит через браузер при первом запуске
- Файлы Windows доступны через `/mnt/c/`
- VS Code интегрируется с WSL через расширение WSL

## Проверь себя

<div class="quiz-block" data-quiz-id="u07-q1" data-answer="b">
  <div class="quiz-question">Через что работает Claude Code на Windows?</div>
  <label><input type="radio" name="u07-q1" value="a"> Напрямую через PowerShell</label>
  <label><input type="radio" name="u07-q1" value="b"> Через WSL2 (Windows Subsystem for Linux)</label>
  <label><input type="radio" name="u07-q1" value="c"> Через Docker</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u07-q2" data-answer="b">
  <div class="quiz-question">Какую команду использовать для установки WSL с Ubuntu?</div>
  <label><input type="radio" name="u07-q2" value="a"> wsl --install</label>
  <label><input type="radio" name="u07-q2" value="b"> wsl --install -d Ubuntu</label>
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
