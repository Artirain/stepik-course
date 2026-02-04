---
title: "Урок 11. Первое изменение кода"
description: "Как попросить Claude Code внести изменение в код: промпт, diff, подтверждение и откат"
---

# Первое изменение кода

!!! info "Что ты узнаешь"
    - Как попросить Claude Code изменить код
    - Как работает показ diff и подтверждение
    - Как откатить изменение через git

## Введение

Ты уже умеешь запускать Claude Code и задавать вопросы. Теперь сделаем следующий шаг — попросим агента изменить код. Claude Code покажет тебе, что именно изменится, и дождётся подтверждения.

## Как это работает

Агентный цикл изменения кода:

1. Ты описываешь, что нужно изменить
2. Claude Code читает соответствующие файлы
3. Показывает diff — что будет изменено
4. Ждёт твоего подтверждения (если permissions = Ask)
5. Применяет изменения

## Пример

```
> Добавь функцию validateEmail в файл src/utils.js.
> Она должна проверять формат email через регулярное выражение.
```

Claude Code:

1. Прочитает `src/utils.js`
2. Предложит diff с новой функцией
3. Покажет что-то вроде:

```diff
+ function validateEmail(email) {
+   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
+   return re.test(email);
+ }
```

4. Спросит: «Применить изменение?»

## Подтверждение и отклонение

- **y / Enter** — применить изменение
- **n** — отклонить
- Ты можешь попросить доработать: «Добавь ещё проверку на длину»

## Откат через git

Если изменение не понравилось после применения:

```bash
# Посмотри, что изменилось
git diff

# Откати последнее изменение
git checkout -- src/utils.js
```

!!! tip "Совет: работай с git"
    Всегда работай в git-репозитории. Так ты можешь безопасно откатить любое изменение Claude Code.

## Практика

1. Создай простой проект (или возьми существующий)
2. Попроси Claude Code добавить функцию
3. Изучи diff, прими изменение
4. Проверь результат
5. Попробуй откатить через `git checkout`

## Итоги

- Claude Code показывает diff перед изменением
- Ты контролируешь каждое изменение через подтверждение
- Всегда работай с git для безопасного отката
- Конкретные промпты дают лучший результат

## Проверь себя

<div class="quiz-block" data-quiz-id="u11-q1" data-answer="b">
  <div class="quiz-question">Что Claude Code показывает перед применением изменений?</div>
  <label><input type="radio" name="u11-q1" value="a"> Полный файл целиком</label>
  <label><input type="radio" name="u11-q1" value="b"> Diff — разницу между старым и новым кодом</label>
  <label><input type="radio" name="u11-q1" value="c"> Только номер строки</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u11-q2" data-answer="c">
  <div class="quiz-question">Как откатить изменение, сделанное Claude Code?</div>
  <label><input type="radio" name="u11-q2" value="a"> Нажать Ctrl+Z</label>
  <label><input type="radio" name="u11-q2" value="b"> Написать /undo</label>
  <label><input type="radio" name="u11-q2" value="c"> Через git (например, git checkout)</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>

<div class="quiz-block" data-quiz-id="u11-q3" data-answer="a">
  <div class="quiz-question">Зачем работать с git при использовании Claude Code?</div>
  <label><input type="radio" name="u11-q3" value="a"> Для безопасного отката изменений</label>
  <label><input type="radio" name="u11-q3" value="b"> Claude Code не работает без git</label>
  <label><input type="radio" name="u11-q3" value="c"> Для ускорения работы ИИ</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
