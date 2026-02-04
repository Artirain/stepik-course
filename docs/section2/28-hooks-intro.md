---
title: "Урок 28. Что такое Hooks"
description: "Знакомство с системой хуков Claude Code: скрипты, которые запускаются на lifecycle-событиях"
---

# Что такое Hooks

!!! info "Что ты узнаешь"
    - Что такое hooks и зачем они нужны
    - Какие lifecycle-события поддерживаются
    - Как хуки интегрируются в рабочий процесс Claude Code

## Введение

Hooks (хуки) --- это **скрипты**, которые Claude Code автоматически запускает при определённых событиях. Ты можешь настроить, что должно произойти до вызова инструмента, после него, при старте сессии или при получении уведомления.

Это как Git hooks, только для Claude Code. Они позволяют автоматизировать рутину и встроить проверки в рабочий процесс.

## Зачем нужны хуки

Без хуков ты вручную контролируешь каждый шаг. С хуками ты можешь:

- **Автоматически проверять** код перед записью в файл
- **Логировать** действия Claude Code
- **Запускать линтер** после каждого изменения
- **Собирать информацию** о проекте при старте сессии
- **Блокировать** опасные операции

Хуки --- это твоя страховочная сеть и автоматизация в одном флаконе.

## Lifecycle-события

Claude Code поддерживает несколько типов событий, к которым ты можешь привязать скрипты:

### PreToolUse

Срабатывает **перед** тем, как Claude Code вызовет инструмент (Read, Write, Edit, Bash и др.).

Типичные сценарии:

- Проверить, не пытается ли агент записать в защищённый файл
- Залогировать, какой инструмент вызывается
- Заблокировать определённые операции

```
Событие: Claude хочет вызвать Write для файла config.prod.json
Хук PreToolUse: Проверяет --- файл в списке защищённых? → Блокирует запись
```

### PostToolUse

Срабатывает **после** вызова инструмента.

Типичные сценарии:

- Запустить линтер после записи в файл
- Запустить тесты после изменения кода
- Обновить индекс после создания нового файла

```
Событие: Claude записал изменения в src/auth.ts
Хук PostToolUse: Запускает eslint src/auth.ts → Показывает ошибки
```

### Notification

Срабатывает, когда Claude Code отправляет уведомление пользователю (например, при завершении длительной задачи).

Типичные сценарии:

- Отправить уведомление в Slack
- Воспроизвести звук
- Записать в лог

### SubagentStop

Срабатывает, когда саб-агент завершает работу.

Типичные сценарии:

- Проверить результат работы саб-агента
- Залогировать статистику
- Запустить пост-обработку

### SessionStart

Срабатывает **при запуске** новой сессии Claude Code.

Типичные сценарии:

- Собрать информацию о состоянии проекта
- Проверить зависимости
- Показать статус Git

Этому событию посвящён отдельный урок далее.

## Как хуки интегрируются в процесс

Вот как выглядит поток работы Claude Code с хуками:

```
SessionStart → хук запускается
│
├── Пользователь даёт задачу
│
├── Claude решает вызвать Write
│   ├── PreToolUse → хук проверяет, можно ли записывать
│   ├── Write выполняется (если хук разрешил)
│   └── PostToolUse → хук запускает линтер
│
├── Claude решает вызвать Bash
│   ├── PreToolUse → хук логирует команду
│   ├── Bash выполняется
│   └── PostToolUse → хук проверяет exit code
│
├── Claude завершает задачу
│   └── Notification → хук отправляет уведомление
│
└── Саб-агент завершает работу
    └── SubagentStop → хук обрабатывает результат
```

## Хуки vs. правила (rules)

Важно понимать разницу:

| Аспект | Rules (.claude/rules/) | Hooks |
|---|---|---|
| Тип | Текстовые инструкции | Исполняемые скрипты |
| Когда работают | Постоянно, как часть контекста | На конкретных событиях |
| Что делают | Направляют поведение Claude | Выполняют действия в системе |
| Обязательность | Claude может проигнорировать | Выполняются автоматически |

Rules --- это "мягкие" рекомендации. Hooks --- "жёсткие" автоматические действия.

!!! note "Дополнение"
    Хуки запускаются **детерминированно**. Если событие произошло --- хук выполнится. Claude не может "решить" пропустить хук, в отличие от правила.

## Формат хука

Хуки --- это обычные shell-скрипты. Они получают информацию о событии через stdin в формате JSON и могут влиять на поведение Claude Code через exit code и stdout.

Пример минимального хука:

```bash
#!/bin/bash
# Логирует все вызовы инструментов
echo "Tool called at $(date)" >> /tmp/claude-hooks.log
```

Подробнее о настройке хуков --- в следующем уроке.

## Практика

Пока что просто осмотрись. Выполни эти шаги, чтобы подготовиться к следующим урокам:

**Шаг 1.** Проверь, есть ли у тебя настроенные хуки:

```bash
claude config list
```

**Шаг 2.** Подумай, какие автоматические проверки были бы полезны в твоём проекте:

- Нужно ли запускать линтер после каждого изменения?
- Есть ли файлы, которые нельзя изменять?
- Хочешь ли ты логировать действия Claude Code?

**Шаг 3.** Запиши свои идеи --- ты реализуешь их в следующих уроках.

## Итоги

- Hooks --- скрипты, которые запускаются на lifecycle-событиях Claude Code
- Поддерживаемые события: PreToolUse, PostToolUse, Notification, SubagentStop, SessionStart
- Хуки выполняются детерминированно --- Claude не может их пропустить
- Основные задачи хуков: проверка, логирование, автоматизация, блокировка
- Хуки дополняют правила: rules --- мягкие рекомендации, hooks --- жёсткие действия

## Проверь себя

<div class="quiz-block" data-quiz-id="u28-q1" data-answer="c" markdown>
  <div class="quiz-question">Что такое hooks в Claude Code?</div>
  <label><input type="radio" name="u28-q1" value="a"> Текстовые инструкции для Claude</label>
  <label><input type="radio" name="u28-q1" value="b"> Конфигурационные файлы проекта</label>
  <label><input type="radio" name="u28-q1" value="c"> Скрипты, запускаемые на lifecycle-событиях</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u28-q2" data-answer="a" markdown>
  <div class="quiz-question">Какое событие срабатывает ДО вызова инструмента?</div>
  <label><input type="radio" name="u28-q2" value="a"> PreToolUse</label>
  <label><input type="radio" name="u28-q2" value="b"> PostToolUse</label>
  <label><input type="radio" name="u28-q2" value="c"> SessionStart</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u28-q3" data-answer="b" markdown>
  <div class="quiz-question">Чем хуки отличаются от правил (rules)?</div>
  <label><input type="radio" name="u28-q3" value="a"> Хуки --- это текстовые рекомендации</label>
  <label><input type="radio" name="u28-q3" value="b"> Хуки выполняются детерминированно, правила --- мягкие рекомендации</label>
  <label><input type="radio" name="u28-q3" value="c"> Правила выполняются быстрее хуков</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u28-q4" data-answer="c" markdown>
  <div class="quiz-question">Какое событие подходит для запуска линтера после изменения файла?</div>
  <label><input type="radio" name="u28-q4" value="a"> PreToolUse</label>
  <label><input type="radio" name="u28-q4" value="b"> SessionStart</label>
  <label><input type="radio" name="u28-q4" value="c"> PostToolUse</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u28-q5" data-answer="a" markdown>
  <div class="quiz-question">В каком формате хук получает информацию о событии?</div>
  <label><input type="radio" name="u28-q5" value="a"> JSON через stdin</label>
  <label><input type="radio" name="u28-q5" value="b"> YAML через аргументы командной строки</label>
  <label><input type="radio" name="u28-q5" value="c"> XML через переменные окружения</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
