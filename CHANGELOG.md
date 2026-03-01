# Changelog

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/).

## [Unreleased]

### Добавлено

- Инициализация проекта MkDocs Material
- Структура курса: 2 раздела, 44 урока
- CI/CD для GitLab Pages
- Кастомный JS-виджет для интерактивных квизов
- Кастомные стили (фирменная палитра Claude)

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
