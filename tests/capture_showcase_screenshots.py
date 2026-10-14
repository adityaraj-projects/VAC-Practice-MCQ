import time
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 850})
    page.goto("http://127.0.0.1:8888/index.html")
    time.sleep(0.5)

    # 1. Practice Arena with Option-by-Option Breakdown
    page.locator(".module-card").first.locator(".module-actions button.btn-primary").click()
    page.wait_for_selector(".arena-layout", state="visible")
    page.locator(".option-btn").nth(1).click() # answer
    time.sleep(0.3)
    page.screenshot(path="tests/screenshots/arena_explanation.png")

    # 2. Quick Revision Notes
    page.locator("#navNotesBtn").click()
    page.wait_for_selector(".notes-nav", state="visible")
    time.sleep(0.3)
    page.screenshot(path="tests/screenshots/revision_notes.png")

    # 3. Analytics
    page.locator("#navAnalyticsBtn").click()
    page.wait_for_selector(".breakdown-table", state="visible")
    time.sleep(0.3)
    page.screenshot(path="tests/screenshots/analytics_dashboard.png")

    browser.close()
    print("Showcase screenshots captured successfully!")
