# Полное руководство по Claude Code — вайбкодинг с нуля

Сайт-курс из 44 уроков, охватывающий Claude Code от установки до продвинутых возможностей: hooks, MCP, skills, саб-агенты.

## Технологии

- **SSG:** MkDocs + Material for MkDocs
- **Квизы:** кастомный JS-виджет
- **Основной хостинг:** GitHub Pages
- **CI/CD:** GitHub Actions (основной) + GitLab CI (зеркальный)

## Локальная разработка

### Требования

- Python 3.10+
- pip

### Установка

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Запуск

```bash
mkdocs serve
```

Сайт будет доступен по адресу `http://127.0.0.1:8000`.

### Сборка

```bash
mkdocs build --strict
```

## Структура курса

| Раздел | Уроки | Тема |
|--------|-------|------|
| 1. Основы и настройка | 1–18 | Установка, настройка, базовые возможности |
| 2. Продвинутые возможности | 19–44 | CLAUDE.md, hooks, MCP, skills, тестинг |

## Деплой

- GitHub Pages: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
- Quality checks: [`.github/workflows/quality.yml`](.github/workflows/quality.yml)
- GitLab Pages (зеркальный пайплайн): [`.gitlab-ci.yml`](.gitlab-ci.yml)

## Лицензия

Все права защищены.
