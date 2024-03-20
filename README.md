## Cinemax Express API

API может быть запущен из Docker контейнера. Для этого описан файл `docker-compose.yml`, который запускает бэкэнд и базу данных PostgreSQL.

### Шаги для запуска приложения:

1. Создайте файл `.env`, в котором будут определены переменные `PORT`, `DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`.

2. **Сборка Docker контейнеров:**

    ```bash
    docker-compose build
    ```

3. **Запуск контейнеров:**

    ```bash
    docker-compose up
    ```
