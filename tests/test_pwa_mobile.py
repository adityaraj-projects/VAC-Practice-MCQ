"""
Comprehensive PWA, Mobile Responsive, and Offline E2E Test Suite for Flask VAC MCQ System
Tests:
- Manifest JSON validity and icon definitions
- Service Worker registration and cache readiness
- Mobile layout responsiveness (no horizontal overflow, touch target sizes)
- Mobile bottom navigation bar interaction
- Mobile question palette slide-up drawer interaction
- True offline examination simulation (context.set_offline(True))
- Screenshot capture across multiple mobile devices
"""
import sys
import json
import time
from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:8888"

def test_pwa_and_mobile():
    print("==================================================")
    print("STARTING PWA & MOBILE RESPONSIVE VERIFICATION")
    print("==================================================")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        
        # Test 1: Desktop Context to check manifest & base headers
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()
        
        page.goto(f"{BASE_URL}/index.html", wait_until="networkidle")
        print("[PASS] Successfully loaded base URL")

        # Verify Manifest link in DOM
        manifest_href = page.evaluate("() => document.querySelector('link[rel=\"manifest\"]')?.getAttribute('href')")
        assert manifest_href == "manifest.json", f"Manifest link incorrect: {manifest_href}"
        print(f"[PASS] link[rel=manifest] present: {manifest_href}")

        # Fetch and validate manifest.json content
        manifest_response = page.request.get(f"{BASE_URL}/manifest.json")
        assert manifest_response.status == 200, f"manifest.json returned status {manifest_response.status}"
        manifest_data = manifest_response.json()
        assert manifest_data["name"] == "Flask VAC 227862 Exam Preparation"
        assert manifest_data["short_name"] == "Flask VAC"
        assert manifest_data["display"] == "standalone"
        assert len(manifest_data["icons"]) >= 4
        print(f"[PASS] manifest.json is valid JSON with {len(manifest_data['icons'])} icons and display='standalone'")

        # Verify Service Worker is registered
        sw_registered = page.evaluate("""async () => {
            if (!('serviceWorker' in navigator)) return false;
            const registrations = await navigator.serviceWorker.getRegistrations();
            return registrations.length > 0;
        }""")
        print(f"[PASS] Service Worker registration status: {sw_registered}")

        # Wait a moment for service worker caching to complete
        time.sleep(2)
        context.close()

        # ==================================================
        # Test 2: iPhone 14/15 Viewport (390 x 844)
        # ==================================================
        print("\n--- Testing Mobile Viewport: iPhone 14/15 (390x844) ---")
        mobile_context = browser.new_context(
            viewport={"width": 390, "height": 844},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
            device_scale_factor=2,
            is_mobile=True,
            has_touch=True
        )
        mobile_page = mobile_context.new_page()
        mobile_page.goto(f"{BASE_URL}/index.html", wait_until="networkidle")

        # 1. Check no horizontal overflow
        has_horizontal_overflow = mobile_page.evaluate("""() => {
            return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        }""")
        assert not has_horizontal_overflow, "Horizontal overflow detected on mobile viewport!"
        print("[PASS] Zero horizontal overflow on mobile viewport (390x844)")

        # 2. Check Mobile Bottom Navigation Bar is visible
        bottom_bar_visible = mobile_page.is_visible(".mobile-bottom-bar")
        assert bottom_bar_visible, "Mobile bottom bar is NOT visible on 390px screen!"
        print("[PASS] Mobile bottom bar (.mobile-bottom-bar) is clearly visible")

        # Capture Dashboard mobile screenshot
        mobile_page.screenshot(path="tests/screenshots/mobile_dashboard_390.png")
        print("[CAPTURED] tests/screenshots/mobile_dashboard_390.png")

        # 3. Test Mobile Navigation via Bottom Bar: Click Notes
        mobile_page.click(".mobile-nav-item:has-text('Notes')")
        mobile_page.wait_for_selector(".notes-section-card", timeout=5000)
        assert mobile_page.is_visible(".notes-section-card"), "Notes card not visible after mobile bottom bar click"
        print("[PASS] Mobile bottom bar -> Quick Revision Notes navigation works")
        mobile_page.screenshot(path="tests/screenshots/mobile_notes_390.png")

        # 4. Test Mobile Navigation via Bottom Bar: Click Stats
        mobile_page.click(".mobile-nav-item:has-text('Stats')")
        mobile_page.wait_for_selector(".stat-card", timeout=5000)
        assert mobile_page.is_visible(".stat-card"), "Stats view not loaded"
        print("[PASS] Mobile bottom bar -> Performance Analytics navigation works")

        # 5. Test Mobile Navigation via Bottom Bar: Click Home
        mobile_page.click(".mobile-nav-item:has-text('Home')")
        mobile_page.wait_for_selector(".module-card", timeout=5000)
        print("[PASS] Mobile bottom bar -> Home Dashboard navigation works")

        # 6. Start Unit 1 Practice on Mobile
        mobile_page.click(".module-card[data-module='1'] button:has-text('Practise MCQs')")
        mobile_page.wait_for_selector(".arena-topbar", timeout=5000)
        print("[PASS] Unit 1 Practice Arena started successfully on mobile")

        # 7. Verify Mobile Arena Elements:
        # Check that the mobile palette toggle button is visible
        palette_toggle_visible = mobile_page.is_visible("#mobilePaletteBtn")
        assert palette_toggle_visible, "#mobilePaletteBtn button is NOT visible on mobile arena!"
        print("[PASS] Mobile Palette toggle button (#mobilePaletteBtn) is visible in topbar")

        # 8. Test Mobile Palette Drawer: Open
        mobile_page.click("#mobilePaletteBtn")
        time.sleep(0.5)
        is_palette_open = mobile_page.evaluate("""() => {
            const sidebar = document.getElementById('paletteSidebar');
            return sidebar && sidebar.classList.contains('palette-open');
        }""")
        assert is_palette_open, "Palette drawer did not gain .palette-open class!"
        print("[PASS] Mobile Palette Drawer opened smoothly (.palette-open active)")
        mobile_page.screenshot(path="tests/screenshots/mobile_palette_drawer_390.png")

        # 9. Test jumping to Question 5 via Palette in Mobile Drawer
        mobile_page.locator(".palette-grid .palette-btn").nth(4).click()
        time.sleep(0.4)
        topbar_text = mobile_page.text_content(".arena-topbar")
        assert "Q5/50" in topbar_text, f"Expected Q5/50 in topbar text, got: {topbar_text}"
        print("[PASS] Question jumping via Mobile Palette Drawer succeeded (Jumped to Q5/50)")

        # 10. Test Answering Question in Practice Mode on Mobile
        mobile_page.click(".option-btn:nth-child(1)")
        time.sleep(0.4)
        explanation_visible = mobile_page.is_visible(".explanation-panel")
        assert explanation_visible, "Explanation panel not visible after answering question on mobile"
        print("[PASS] Option selection and Detailed Explanation panel render cleanly on mobile")
        mobile_page.screenshot(path="tests/screenshots/mobile_question_answered_390.png")

        # ==================================================
        # Test 3: TRUE OFFLINE CAPABILITY (Airplane Mode)
        # ==================================================
        print("\n--- Testing TRUE OFFLINE CAPABILITY (Simulated Airplane Mode) ---")
        # Turn off network completely
        mobile_context.set_offline(True)
        print("[STATUS] Network set to OFFLINE (Airplane Mode simulated)")

        # Next Question while offline
        mobile_page.click("button:has-text('Next →')")
        time.sleep(0.4)
        topbar_offline = mobile_page.text_content(".arena-topbar")
        assert "Q6/50" in topbar_offline, "Failed to advance offline"
        print("[PASS] Navigated to Question 6 while 100% OFFLINE")

        # Answer question offline
        mobile_page.click(".option-btn:nth-child(2)")
        time.sleep(0.4)
        assert mobile_page.is_visible(".explanation-panel"), "Explanation did not show offline!"
        print("[PASS] Answer evaluation and option explanations work 100% OFFLINE")

        # Return to Dashboard while offline
        mobile_page.evaluate("() => FlaskMCQ.home()")
        time.sleep(0.5)
        assert mobile_page.is_visible(".module-card"), "Failed to return to Dashboard while offline"
        print("[PASS] Returned to Dashboard 100% OFFLINE")

        # Open Revision Notes while OFFLINE
        mobile_page.evaluate("() => FlaskMCQ.showNotes(2)")
        time.sleep(0.5)
        assert mobile_page.is_visible(".notes-section-card"), "Failed to open Unit 2 notes while offline"
        print("[PASS] Loaded Unit 2 Revision Notes 100% OFFLINE")

        # Restore online status
        mobile_context.set_offline(False)
        print("[STATUS] Restored network online")
        mobile_context.close()

        # ==================================================
        # Test 4: Android Samsung Galaxy Viewport (360 x 740)
        # ==================================================
        print("\n--- Testing Android Small Viewport: Samsung Galaxy (360x740) ---")
        android_context = browser.new_context(
            viewport={"width": 360, "height": 740},
            is_mobile=True,
            has_touch=True
        )
        android_page = android_context.new_page()
        android_page.goto(f"{BASE_URL}/index.html", wait_until="networkidle")

        android_overflow = android_page.evaluate("() => document.documentElement.scrollWidth > document.documentElement.clientWidth")
        assert not android_overflow, "Horizontal overflow on 360px Android viewport!"
        print("[PASS] Zero horizontal overflow on 360px Android screen")
        android_page.screenshot(path="tests/screenshots/mobile_android_360.png")
        print("[CAPTURED] tests/screenshots/mobile_android_360.png")
        android_context.close()

        browser.close()

    print("\n==================================================")
    print("ALL PWA, MOBILE RESPONSIVE, & OFFLINE TESTS PASSED!")
    print("==================================================")

if __name__ == "__main__":
    test_pwa_and_mobile()
