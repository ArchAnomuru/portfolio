"""Create the full schema in the throwaway local Postgres.

The project has no Alembic migrations — production tables are owned by the
management-v2 project and mirrored here as read-only models. For a local demo
instance we just materialise every mapped table at once.
"""

import asyncio
import importlib
import pkgutil

from sqlalchemy.ext.asyncio import create_async_engine

from app.core.config import settings
from app.db.base import Base
from app.external_models.management import ManagementBase

assert "localhost:5544" in settings.DATABASE_URL, "refusing to touch a non-local database"


def import_all_models() -> None:
    for package_name in ("app.models", "app.external_models"):
        package = importlib.import_module(package_name)
        for module in pkgutil.iter_modules(package.__path__):
            importlib.import_module(f"{package_name}.{module.name}")


async def main() -> None:
    import_all_models()
    engine = create_async_engine(settings.DATABASE_URL)

    # The mirror of the management DB uses its own declarative base.
    async with engine.begin() as conn:
        await conn.run_sync(ManagementBase.metadata.create_all)
        await conn.run_sync(Base.metadata.create_all)

    await engine.dispose()
    total = len(Base.metadata.tables) + len(ManagementBase.metadata.tables)
    print(f"created {total} tables")


if __name__ == "__main__":
    asyncio.run(main())
