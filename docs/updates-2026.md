---
title: "Что нового в 2026"
description: "Краткий апдейт по ключевым изменениям в Claude Code и смежной экосистеме"
---

# Что нового в 2026

## Почему этот раздел появился

Темы про ИИ-агентов быстро устаревают. Этот раздел фиксирует, что в курсе уже обновлено под актуальное состояние на **1 марта 2026**.

## Обновлено в курсе

- актуализированы уроки по планам и оплате (подход через официальные источники)
- обновлены установки для macOS и Windows по текущему quickstart
- исправлены уроки по hooks под актуальный формат конфигурации
- исправлен MCP-конфиг: `.mcp.json` вместо старого пути
- переработан урок по Claude Code on the Web под текущий research preview
- обновлено сравнение Claude Code vs Codex CLI без устаревших «нет/да» утверждений
- **hooks**: добавлены 8 новых событий (PermissionRequest, PostToolUseFailure, SubagentStart, ConfigChange, WorktreeCreate/Remove, TeammateIdle, TaskCompleted)
- **hooks**: дополнена таблица инструментов (MultilineEdit, WebSearch, Task)
- **hooks**: добавлены stdin JSON-схемы и переменная `CLAUDE_SESSION_ID`
- **slash-команды**: убраны устаревшие префиксы `/project:` и `/user:` — команды вызываются по имени
- **slash-команды**: добавлены новые поля front matter (argument-hint, user-invocable, disable-model-invocation)
- **slash-команды**: добавлена каноническая форма `$ARGUMENTS[N]` для позиционных аргументов
- **skills**: исправлена концепция — commands и skills теперь единая система
- **skills**: убрано устаревшее поле `globs`, добавлены новые поля (context, agent, hooks)
- **skills**: добавлены bundled skills: `/simplify`, `/batch`, `/debug`
- **skills vs subagents**: исправлено — теперь можно создавать агентов вручную через `context: fork` и `.claude/agents/`
- **headless mode**: добавлен термин Agent SDK, исправлен флаг `--allowed-tools`
- **web**: расширен до полноценного урока с `--remote`, `/teleport`, diff-просмотр
- **шаблон**: 8 уроков приведены к стандартному шаблону (добавлены `!!! info`, `## Практика`, `## Итоги`)

## Правило актуальности

Для «хрупких» тем (цены, тарифы, команды, ограничения) смотри поле `last_verified` в front matter уроков и проверяй официальные страницы перед применением в проде.

## Официальные источники

- Claude Code docs: <https://docs.anthropic.com/en/docs/claude-code/overview>
- Hooks: <https://docs.anthropic.com/en/docs/claude-code/hooks>
- MCP: <https://docs.anthropic.com/en/docs/claude-code/mcp>
- Claude plans: <https://support.claude.com/en/articles/9267304-about-claude-s-plan-tiers>
- Anthropic API pricing: <https://www.anthropic.com/pricing#api>
