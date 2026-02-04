# CLAUDE.md — Правила для ИИ-ассистента

## Проект

Это сайт-курс "Полное руководство по Claude Code — вайбкодинг с нуля",
собранный на MkDocs с темой Material for MkDocs. Хостится на GitLab Pages.

## Структура

- `docs/` — контент курса (markdown)
- `docs/section1/` — Раздел 1: Основы и настройка (уроки 01-18)
- `docs/section2/` — Раздел 2: Продвинутые возможности (уроки 19-44)
- `docs/stylesheets/` — кастомные CSS
- `docs/javascripts/` — JS-виджет квизов
- `docs/assets/images/` — изображения
- `overrides/` — переопределения темы Material
- `mkdocs.yml` — конфигурация сборки

## Язык контента

Весь контент пишется на **русском языке**. Технические термины
(Claude Code, MCP, hooks, slash-commands, skills) оставляются на английском
без перевода. Имена файлов — на английском (slug-формат).

## Формат уроков

Каждый урок следует шаблону:

1. YAML front matter (`title`, `description`)
2. H1 заголовок
3. Admonition "Что вы узнаете" (`!!! info`)
4. Введение
5. Основной контент с подразделами (H2, H3)
6. Практика
7. Итоги
8. Секция "Проверь себя" с квизами (3-5 вопросов)

## Квизы

Квизы реализованы как HTML-блоки (md_in_html). Формат:

```html
<div class="quiz-block" data-quiz-id="uNN-qN" data-answer="b" markdown>
  <div class="quiz-question">Текст вопроса?</div>
  <label><input type="radio" name="uNN-qN" value="a"> Вариант A</label>
  <label><input type="radio" name="uNN-qN" value="b"> Вариант B</label>
  <label><input type="radio" name="uNN-qN" value="c"> Вариант C</label>
  <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
  <div class="quiz-result"></div>
</div>
```

- `data-quiz-id` — уникальный ID: `u{номер_урока}-q{номер_вопроса}`
- `data-answer` — правильный ответ (буква или буквы через запятую)
- Для множественного выбора: `type="checkbox"` и `data-answer="a,c"`

## Markdown-расширения

Доступны: admonitions, code blocks с подсветкой, таблицы,
pymdownx.keys (`++ctrl+c++`), pymdownx.mark (`==выделение==`),
pymdownx.tabbed (вкладки контента), Mermaid-диаграммы.

## Стиль текста

- Обращение к студенту на "ты"
- Дружелюбный, но профессиональный тон
- Короткие абзацы (3-5 предложений)
- Практические примеры в каждом уроке
- Код всегда с указанием языка (`bash`, `yaml`, `python`, `json`)

## Команды

- Локальный запуск: `mkdocs serve`
- Сборка: `mkdocs build --strict`
- Сайт: http://127.0.0.1:8000
