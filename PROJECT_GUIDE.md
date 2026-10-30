# Путеводитель: table-crm

Автономная инструкция: достаточно этой папки, исходников и перечисленных защищённых копий. История чатов и центральный каталог не требуются.

[Восстановление](RECOVERY.md) · [Карта файлов и зависимостей](PROJECT_MAP.json)

## Назначение

По [README.md](README.md): а также сделать небольшое *представление,* которое будет использовать данный API

Обнаруженные языки: JavaScript, TypeScript, Vue SFC.

## Порядок чтения

1. Локальные AGENTS.md / CLAUDE.md и документы ниже.
2. Манифесты: версии среды, зависимости, команды.
3. Кандидаты точек входа; фактический запуск проверить по манифесту.
4. PROJECT_MAP.json: imports_local от источника к импортируемому файлу; входящие рёбра — потребители модуля.
5. RECOVERY.md: независимые данные, восстановление среды, запуск и критерии приёмки.

- [README.md](README.md)
- [backend/README.md](backend/README.md)
- [doc/README.md](doc/README.md)
- [frontend/README.md](frontend/README.md)

## Манифесты

- [backend/package.json](backend/package.json)
- [frontend/package.json](frontend/package.json)

## Кандидаты точек входа

- [backend/src/main.ts](backend/src/main.ts)
- [frontend/src/main.js](frontend/src/main.js)

## Основные файлы по локальным импортам

| Файл | Входящих импортов |
|---|---:|
| [backend/src/app.service.ts](backend/src/app.service.ts) | 2 |
| [backend/src/app.module.ts](backend/src/app.module.ts) | 2 |
| [backend/src/leads/leads.controller.ts](backend/src/leads/leads.controller.ts) | 2 |
| [backend/src/leads/amo-crm.service.ts](backend/src/leads/amo-crm.service.ts) | 2 |
| [doc/paths.js](doc/paths.js) | 1 |
| [doc/treeBuilder.js](doc/treeBuilder.js) | 1 |
| [doc/fileStats.js](doc/fileStats.js) | 1 |
| [doc/projectConfig.js](doc/projectConfig.js) | 1 |
| [doc/config.js](doc/config.js) | 1 |
| [backend/src/app.controller.ts](backend/src/app.controller.ts) | 1 |
| [backend/src/leads/leads.module.ts](backend/src/leads/leads.module.ts) | 1 |
| [backend/src/leads.controller.ts](backend/src/leads.controller.ts) | 1 |

## Проверки

- [backend/src/app.controller.spec.ts](backend/src/app.controller.spec.ts)
- [backend/src/leads.controller.spec.ts](backend/src/leads.controller.spec.ts)
- [backend/src/leads/leads.controller.spec.ts](backend/src/leads/leads.controller.spec.ts)
- [backend/test/app.e2e-spec.ts](backend/test/app.e2e-spec.ts)
- [backend/test/jest-e2e.json](backend/test/jest-e2e.json)

## Чтение карты без специальных плагинов

PROJECT_MAP.json — UTF-8 JSON: nodes и edges. Пути файлов относительные. contains обозначает наличие файла; imports_local — статически распознанный импорт; declares_dependency — объявление пакета в манифесте. evidence содержит источник и, где доступно, строку. Карта не исполняет код.

Статус исходного анализа: static-scan-complete; ограничений чтения: 0. Исходный снимок: 2026-10-30T14:47:11.360Z.

После изменения кода перечитайте затронутые файлы: карта является снимком. Отсутствие ребра не доказывает отсутствие зависимости.
