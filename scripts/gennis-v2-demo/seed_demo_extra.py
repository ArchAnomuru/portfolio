"""Top up the local demo database so the accounting screens look like a working
month rather than a fresh install.

Every name and figure here is invented. Run after seed_local.py, against the
throwaway Postgres on port 5544 only.
"""

import asyncio
import random
from datetime import date, timedelta

from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from app.core.config import settings
from app.external_models.management import (
    GennisOverhead,
    GennisStudentPayment,
    GennisTeacherSalaryPayment,
    MgmtDividend,
)

assert "localhost:5544" in settings.DATABASE_URL, "refusing to seed a non-local database"

LOCATION_ID = 1
TODAY = date.today()
MONTH, YEAR = TODAY.month, TODAY.year

random.seed(7)

STUDENTS = [
    "Shaxrizoda Ziyodullayeva", "Aziz Karimov", "Nilufar Ergasheva",
    "Jasur Rahmonov", "Kamola Xolmatova", "Doniyor Sattorov",
    "Madina Yusupova", "Bekzod Nazarov", "Sevara Tursunova",
    "Ulug'bek Ismoilov", "Dilnoza Qodirova", "Farrux Abdullayev",
    "Zarina Mahmudova", "Otabek Sharipov", "Gulnora Aliyeva",
    "Sanjar Toshpulatov", "Malika Rustamova", "Islom Yo'ldoshev",
]

TEACHERS = ["Bobur Toshmatov", "Nodira Salimova", "Rustam Aliyev"]

CHANNELS = ["cash", "click", "payme", "bank", "humo"]

OVERHEADS = [
    (1, "Kommunal xizmatlar", 1_850_000),
    (2, "Arenda", 15_000_000),
    (1, "Internet va aloqa", 640_000),
    (1, "Kanselyariya", 420_000),
    (2, "Reklama", 3_200_000),
]


async def main() -> None:
    engine = create_async_engine(settings.DATABASE_URL)
    Session = async_sessionmaker(engine, expire_on_commit=False)

    async with Session() as db:
        for index, student in enumerate(STUDENTS, start=10):
            db.add(
                GennisStudentPayment(
                    student_id=index,
                    student_name=student,
                    location_id=LOCATION_ID,
                    payment_sum=random.choice([250_000, 300_000, 350_000, 390_000, 430_000]),
                    channel=random.choice(CHANNELS),
                    is_real_payment=True,
                    paid_date=TODAY - timedelta(days=random.randint(0, 24)),
                    calendar_month=MONTH,
                    calendar_year=YEAR,
                    deleted=False,
                )
            )

        # A few discounts so the "Diskontlar" tab is not empty either.
        for index, student in enumerate(STUDENTS[:4], start=60):
            db.add(
                GennisStudentPayment(
                    student_id=index,
                    student_name=student,
                    location_id=LOCATION_ID,
                    payment_sum=random.choice([50_000, 70_000, 100_000]),
                    channel="cash",
                    is_real_payment=False,
                    paid_date=TODAY - timedelta(days=random.randint(1, 20)),
                    calendar_month=MONTH,
                    calendar_year=YEAR,
                    deleted=False,
                )
            )

        for teacher_index, teacher in enumerate(TEACHERS, start=2):
            db.add(
                GennisTeacherSalaryPayment(
                    teacher_id=teacher_index,
                    teacher_name=teacher,
                    location_id=LOCATION_ID,
                    payment_sum=random.choice([1_200_000, 1_500_000, 2_100_000]),
                    channel="cash",
                    payment_type_id=1,
                    paid_date=TODAY - timedelta(days=random.randint(1, 15)),
                    calendar_month=MONTH,
                    calendar_year=YEAR,
                    reason="Iyul oyligi",
                    deleted=False,
                )
            )

        for type_id, name, cost in OVERHEADS:
            db.add(
                GennisOverhead(
                    overhead_type_id=type_id,
                    item_name=name,
                    item_sum=cost,
                    channel="cash",
                    payment_type_id=1,
                    location_id=LOCATION_ID,
                    date=TODAY - timedelta(days=random.randint(1, 20)),
                    calendar_month=MONTH,
                    calendar_year=YEAR,
                    deleted=False,
                )
            )

        for amount, note in ((1_500_000, "Iyul ulushi"), (900_000, "Qo'shimcha ulush")):
            db.add(
                MgmtDividend(
                    amount=amount,
                    source="cash",
                    date=TODAY - timedelta(days=random.randint(1, 18)),
                    description=note,
                    payment_type="cash",
                    location_id=LOCATION_ID,
                    deleted=False,
                )
            )

        await db.commit()

    await engine.dispose()
    print("demo top-up complete")


if __name__ == "__main__":
    asyncio.run(main())
