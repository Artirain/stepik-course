# Changelog

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/).

## [Unreleased]

### Добавлено

- Инициализация проекта MkDocs Material
- Структура курса: 2 раздела, 44 урока
- CI/CD для GitLab Pages
- Кастомный JS-виджет для интерактивных квизов
- Кастомные стили (фирменная палитра Claude)

## [2026-03-02]

### Добавлено

- `last_verified` во все 18 уроков section1
- Кросс-ссылки между связанными уроками (15→16/17, 19→21/22, 23→41, 26→27/43, 28→29/34/35/40, 37→38)
- Mermaid-диаграммы в уроки 15 (сессии), 28 (hooks lifecycle), 40 (headless pipeline)
- Расширен контент 7 тонких уроков: 13, 14, 17, 30, 36, 38, 39

### Исправлено

- CI: удалён markdownlint (оставлен только `mkdocs build --strict`)
- CI: исправлен lychee (убран устаревший `--exclude-mail`, добавлены исключения)
- Исправлены битые ссылки: `support.claude.com` → `anthropic.com/pricing`, `docs.anthropic.com` → `code.claude.com`
- MD040: добавлен язык ко всем code blocks без спецификатора
- MD029: исправлена нумерация списков, разорванных code blocks

## [2026-03-01]

### Добавлено

- `.markdownlint.yml` — отключены правила MD013, MD025, MD034 для MkDocs Material

### Исправлено

- Hooks (уроки 28-36): добавлены 8 новых событий, stdin JSON-схемы, CLAUDE_SESSION_ID, MultilineEdit/WebSearch/Task
- Slash-команды (уроки 23-25): убраны устаревшие `/project:` и `/user:` префиксы, добавлены новые поля front matter
- Skills (уроки 41-43): исправлена концепция единой системы commands+skills, убрано поле `globs`, добавлены новые поля
- Headless mode (урок 40): добавлен термин Agent SDK, исправлен `--allowed-tools`
- Claude Code on the Web (урок 39): расширен до полноценного урока
- 8 уроков (07,30,31,32,34,36,39,44) приведены к шаблону
