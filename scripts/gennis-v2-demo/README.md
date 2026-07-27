# Локальный демо-стенд gennis-v2

Как сняты скриншоты `gennis-v2-*.webp`: рабочий проект поднимается локально на
пустой базе с вымышленными данными. Ни одной строки продакшна в кадр не попадает.

```bash
# 1. Одноразовый Postgres (не трогает системный)
initdb -D /tmp/pgdata -U postgres --auth=trust -E UTF8
pg_ctl -D /tmp/pgdata -l /tmp/pg.log -o "-p 5544 -k /tmp -c listen_addresses=localhost" start
createdb -h localhost -p 5544 -U postgres gennis_management

# 2. Окружение — переменные перекрывают .env проекта
cd ~/projects/work/gennis-v2/apps/backend
export DATABASE_URL="postgresql+asyncpg://postgres@localhost:5544/gennis_management"
export GENNIS_DB_URL="" TURON_DB_URL="" SECRET_KEY="local-dev-only-secret" PYTHONPATH=.

# 3. Схема и данные
./venv/bin/python bootstrap_local.py     # create_all по обеим declarative base
./venv/bin/python seed_local.py          # штатный сид проекта
./venv/bin/python seed_demo_extra.py     # досыпать строк, чтобы таблицы не пустовали

# 4. Сервисы
./venv/bin/uvicorn app.main:app --port 8010
cd ../frontend && VITE_API_URL=http://localhost:8010/api/v1 \
  VITE_NEW_API_URL=http://localhost:8010/api/v1 npx vite --port 5173
```

Вход: `admin` / `Admin1234`.

Гочи:
- У проекта нет Alembic — схему создаёт `bootstrap_local.py`, и ей нужны **обе**
  declarative base: `Base` и `ManagementBase` (зеркало management-БД).
- `VITE_API_URL` обязан включать `/api/v1`, иначе логин уходит на `/auth/login` и ловит 404.
- Оба сид-скрипта отказываются работать, если в `DATABASE_URL` нет `localhost:5544`.
