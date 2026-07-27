"""Pixelate personal data regions in portfolio screenshots, then export WebP.

Pixelation is irreversible (unlike blur), so the published shots keep the UI
readable while the underlying names, phones and balances are gone for good.
"""

from pathlib import Path

from PIL import Image

SRC = Path("/home/anomuru/.claude/image-cache/209e95d0-499c-454f-bbd5-6cf7ae04cf61")
OUT = Path("/home/anomuru/portfolio/public/projects")
BLOCK = 16

# (left, top, right, bottom) in the 1920x1080 source space.
REDACTIONS: dict[str, list[tuple[int, int, int, int]]] = {
    # Dashboard: totals, teacher names, lead names + phone numbers.
    "1.png": [
        (180, 200, 610, 250),
        (1005, 375, 1905, 685),
        (210, 825, 1240, 1035),
    ],
    # CRM call queue: every debtor card holds a name, balance and two phones.
    "2.png": [
        (160, 360, 485, 505),
        (510, 360, 835, 505),
        (160, 625, 485, 770),
        (510, 625, 835, 770),
        (860, 625, 1185, 770),
        (1210, 625, 1535, 770),
        (1560, 625, 1600, 770),
    ],
    # Accounting: cash/click/bank totals and the student name columns.
    "4.png": [
        (160, 234, 480, 272),
        (205, 400, 862, 966),
    ],
    # Group profile: student roster with balances, plus teacher name fields.
    "5.png": [
        (940, 480, 1625, 1080),
        (445, 895, 615, 1080),
    ],
    # Group submenu: no personal data on screen.
    "6.png": [],
    # Attendance grid: student first and last names.
    "7.png": [
        (180, 295, 535, 1005),
    ],
    # Management dashboard: revenue, payroll and profit per branch — client financials.
    "8.png": [
        (680, 158, 812, 360),
        (1210, 158, 1342, 360),
        (1745, 158, 1880, 360),
        (555, 512, 672, 585),
        (930, 512, 1065, 715),
        (1370, 512, 1485, 585),
        (1740, 512, 1880, 715),
        (555, 830, 672, 902),
        (930, 830, 1065, 1035),
        (1370, 830, 1485, 902),
        (1740, 830, 1880, 1035),
    ],
    # Task board: the assignee column carries staff full names.
    "9.png": [
        (1190, 300, 1420, 1050),
    ],
    # Payroll: named employees with their individual salaries.
    "10.png": [
        (355, 112, 645, 150),
        (895, 112, 1185, 150),
        (1435, 112, 1725, 150),
        (300, 350, 525, 1062),
        (1080, 350, 1195, 1062),
        (1580, 350, 1690, 1062),
    ],
    # Settings + live voice assistant: nothing personal on screen.
    "12.png": [],
}

# Applied after redaction, when part of the frame has to go entirely.
CROPS: dict[str, tuple[int, int, int, int]] = {
    # Hand-drawn red annotation loops around the sidebar — keep the content pane only.
    "10.png": (280, 0, 1920, 1080),
}

NAMES = {
    "1.png": "gennis-dashboard",
    "2.png": "gennis-crm",
    "4.png": "gennis-accounting",
    "5.png": "gennis-group",
    "6.png": "gennis-group-menu",
    "7.png": "gennis-attendance",
    "8.png": "management-dashboard",
    "9.png": "management-tasks",
    "10.png": "management-payroll",
    "12.png": "management-voice",
}


def pixelate(image: Image.Image, box: tuple[int, int, int, int]) -> None:
    region = image.crop(box)
    width, height = region.size
    small = region.resize(
        (max(1, width // BLOCK), max(1, height // BLOCK)), Image.BILINEAR
    )
    image.paste(small.resize(region.size, Image.NEAREST), box)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    for filename, boxes in REDACTIONS.items():
        source = SRC / filename
        if not source.exists():
            raise FileNotFoundError(source)

        image = Image.open(source).convert("RGB")
        for box in boxes:
            pixelate(image, box)

        crop = CROPS.get(filename)
        if crop:
            image = image.crop(crop)

        target = OUT / f"{NAMES[filename]}.webp"
        image.save(target, "WEBP", quality=84, method=6)
        print(f"{filename} -> {target.name}  {target.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
