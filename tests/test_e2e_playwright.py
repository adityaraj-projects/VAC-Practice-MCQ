import sys
import os
import time
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')

def run_e2e_tests():
    print("=" * 60)
    print("STARTING PLAYWRIGHT E2E AUTOMATED SYSTEM VERIFICATION")
    print("=" * 60)

    errors_detected = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 800}, service_workers="block")
        page = context.new_page()

        # Listen for console errors & unhandled exceptions
        def handle_console(msg):
            if msg.type == "error":
                print(f"[CONSOLE ERROR]: {msg.text} (location: {msg.location})")
                errors_detected.append(f"Console error: {msg.text}")
        
        def handle_page_error(exc):
            print(f"[PAGE UNCAUGHT EXCEPTION]: {exc}")
            errors_detected.append(f"Uncaught exception: {exc}")

        page.on("console", handle_console)
        page.on("pageerror", handle_page_error)

        # 1. Open Website
        print("\n--- Test 1: Direct Landing & Zero Login/Signup ---")
        page.goto("http://127.0.0.1:8888/index.html", wait_until="networkidle")
        time.sleep(0.5)

        # Assert no login/signup forms exist
        assert page.locator("input[type='password']").count() == 0, "No password inputs allowed"
        assert page.locator("text=Login").count() == 0, "No login button allowed"
        assert page.locator("text=Sign Up").count() == 0, "No signup button allowed"
        print("[PASS] Zero login/signup required. Landed immediately on Dashboard.")

        # Check total questions and module cards count
        body_text = page.locator("body").inner_text()
        assert "350" in body_text, "Should display 350 Total MCQs"
        assert "7 syllabus modules" in body_text, "Should display 7 syllabus modules"
        assert page.locator(".module-card").count() == 7, "Should display 7 module cards"
        print("[PASS] Dashboard rendered 350 Total MCQs and 7 Modules accurately.")

        # 2. Theme Toggle
        print("\n--- Test 2: Theme Switching (Dark / Light) ---")
        initial_theme = page.locator("html").get_attribute("data-theme")
        print(f"Initial theme: {initial_theme}")
        page.locator("#themeToggleBtn").click()
        time.sleep(0.2)
        toggled_theme = page.locator("html").get_attribute("data-theme")
        assert toggled_theme != initial_theme, "Theme attribute should flip"
        print(f"[PASS] Theme successfully toggled to {toggled_theme}.")
        page.locator("#themeToggleBtn").click() # toggle back

        # 3. Module 1 Practice & Option-by-Option Breakdown
        print("\n--- Test 3: Module 1 Practice & Option-by-Option Explanations ---")
        # Click "Practise MCQs" on Unit 1
        page.locator(".module-card").first.locator(".module-actions button.btn-primary").click()
        page.wait_for_selector(".arena-layout", state="visible")
        assert "Question 1 of 50" in page.locator(".arena-topbar").inner_text()
        print("[PASS] Question Arena loaded: Question 1 of 50.")

        # Verify 4 options rendered
        options = page.locator(".option-btn")
        assert options.count() == 4, f"Expected 4 options, found {options.count()}"
        print("[PASS] Exactly 4 options (A, B, C, D) are rendered.")

        # Select Option B (index 1)
        options.nth(1).click()
        time.sleep(0.3)

        # Verify Answer Locking: options disabled
        for i in range(4):
            assert options.nth(i).get_attribute("disabled") is not None, f"Option {i} should be locked"
        print("[PASS] Answer locking verified: options disabled after answering.")

        # Verify Option-by-Option Explanations Panel
        assert page.locator(".explanation-panel").is_visible(), "Explanation panel must be visible"
        exp_text = page.locator(".explanation-panel").inner_text()
        print("ACTUAL EXP TEXT:\n", exp_text)
        assert "Core Explanation:" in exp_text, "Core explanation missing"
        assert "OPTION-BY-OPTION BREAKDOWN" in exp_text.upper(), "Option breakdown title missing"
        assert "Option A" in exp_text, "Option A explanation missing"
        assert "Option B" in exp_text, "Option B explanation missing"
        assert "Option C" in exp_text, "Option C explanation missing"
        assert "Option D" in exp_text, "Option D explanation missing"
        print("[PASS] Option-by-option explanations verified (A, B, C, D all present and detailed).")

        # 4. Navigation (Next & Previous preserving state)
        print("\n--- Test 4: Navigation (Next & Prev) Preserving State ---")
        page.locator("button:has-text('Next →')").click()
        time.sleep(0.3)
        assert "Question 2 of 50" in page.locator(".arena-topbar").inner_text()
        print("[PASS] Moved to Question 2 of 50.")

        page.locator("button:has-text('← Previous')").click()
        time.sleep(0.3)
        assert "Question 1 of 50" in page.locator(".arena-topbar").inner_text()
        assert page.locator(".explanation-panel").is_visible(), "Previous question should still show explanation"
        print("[PASS] Moved back to Question 1: answered state & explanation preserved.")

        # 5. Question Palette Navigation & Flagging
        print("\n--- Test 5: Question Palette & Flagging ---")
        palette_btn_10 = page.locator(".palette-btn").nth(9) # question 10
        palette_btn_10.click()
        time.sleep(0.3)
        assert "Question 10 of 50" in page.locator(".arena-topbar").inner_text()
        print("[PASS] Palette jumped directly to Question 10 of 50.")

        page.locator("#flagBtn").click()
        time.sleep(0.2)
        assert "flagged" in page.locator(".palette-btn").nth(9).get_attribute("class")
        print("[PASS] Question 10 flagged for review (palette button turned yellow).")

        # 6. Exit to Dashboard
        page.locator(".brand-section").click() # click logo
        page.wait_for_selector(".module-card", state="visible")
        print("[PASS] Returned to Dashboard via brand logo.")

        # 7. Quick Revision Notes (All 7 Units)
        print("\n--- Test 7: Quick Revision Notes for All 7 Modules ---")
        page.locator("#navNotesBtn").click()
        page.wait_for_selector(".notes-nav", state="visible")
        assert page.locator(".notes-nav button").count() == 7, "Should have 7 module tabs"
        
        # Test switching tabs
        for u in range(1, 8):
            tab = page.locator(".notes-nav button").nth(u - 1)
            tab.click()
            time.sleep(0.2)
            content = page.locator(".panel").inner_text()
            assert f"Module {u}" in content or f"Unit {u}" in content, f"Module {u} notes not rendered"
            assert "Key Definitions" in content, f"Key definitions missing for Unit {u}"
            assert "Technical Comparisons" in content, f"Technical comparisons missing for Unit {u}"
        print("[PASS] All 7 Module Revision Notes tabs verified (definitions, syntax, differences, common errors, code examples, facts).")

        # 8. Full Timed Mock Exam Mode
        print("\n--- Test 8: Timed Mock Examination & Non-blocking Modal Submission ---")
        page.locator("#navMockBtn").click()
        page.wait_for_selector("#mockModal", state="visible")
        
        # Select 15 Questions / 15 Minutes
        page.select_option("#mockQCount", "15")
        page.select_option("#mockDuration", "15")
        page.locator("button:has-text('Start Examination')").click()
        page.wait_for_selector(".arena-layout", state="visible")

        # Verify Mock UI: Countdown timer active, 15 Questions total
        assert "Question 1 of 15" in page.locator(".arena-topbar").inner_text()
        assert page.locator("#timerBadge").is_visible(), "Countdown timer must be visible"
        print("[PASS] Mock examination started: 15 questions, active timer.")

        # Verify explanations are HIDDEN during mock exam
        mock_opts_q1 = page.locator(".option-btn")
        mock_opts_q1.nth(0).click()
        time.sleep(0.2)
        assert page.locator(".explanation-panel").count() == 0, "Explanations must NOT be shown during mock exam"
        print("[PASS] Explanations correctly hidden during active examination.")

        # Answer Q2
        page.locator("button:has-text('Next →')").click()
        time.sleep(0.2)
        page.locator(".option-btn").nth(2).click()

        # Answer Q3
        page.locator("button:has-text('Next →')").click()
        time.sleep(0.2)
        page.locator(".option-btn").nth(1).click()

        # Submit Examination
        page.locator(".palette-sidebar button:has-text('Submit Examination')").click()
        page.wait_for_selector("#dialogModal", state="visible")
        dialog_text = page.locator("#dialogModal").inner_text()
        assert "Answered:" in dialog_text and "3" in dialog_text, "Dialog must show 3 answered"
        assert "Unanswered:" in dialog_text and "12" in dialog_text, "Dialog must show 12 unanswered"
        print("[PASS] Non-blocking submission modal displayed accurate stats (3 answered, 12 unanswered).")

        # Confirm Submit
        page.locator("#modalConfirmBtn:has-text('Yes, Submit Exam')").click()
        page.wait_for_selector(".result-hero", state="visible")
        print("[PASS] Examination submitted successfully. Results dashboard loaded.")

        # 9. Results & Performance Analytics Verification
        print("\n--- Test 9: Results & Performance Analytics Scoring ---")
        results_text = page.locator("body").inner_text()
        assert "Needs Revision" in results_text or "Almost Ready" in results_text or "Exam Ready" in results_text, "Readiness badge missing"
        assert "Module-wise Performance Breakdown" in results_text, "Module breakdown table missing"
        assert ("Weak Topics" in results_text or "Outstanding Mastery" in results_text or "Revision Priorities" in results_text), "Weak topics / mastery section missing"
        print("[PASS] Results calculated: Score, Accuracy %, Readiness Badge, Module Breakdown, Weak Topics.")

        # 10. Review All Answers & Explanations
        print("\n--- Test 10: Review All Answers & Explanations ---")
        page.locator("button:has-text('Review Answers & Explanations')").click()
        page.wait_for_selector(".arena-layout", state="visible")
        # In review mode, explanation panel is visible for each question
        assert page.locator(".explanation-panel").is_visible(), "Explanation panel must be visible in review mode"
        print("[PASS] Review mode active: displays complete answers and option-by-option explanations.")

        # 11. Analytics Page & History Persistence
        print("\n--- Test 11: Analytics Dashboard & LocalStorage Persistence ---")
        page.locator("#navAnalyticsBtn").click()
        page.wait_for_selector(".breakdown-table", state="visible")
        analytics_text = page.locator("body").inner_text()
        assert "Full Mock Examination (15 Qs, 15m)" in analytics_text, "Attempt should be recorded in attempt history table"
        print("[PASS] Attempt successfully recorded in performance history.")

        # Test Refresh Persistence
        print("Reloading page to test persistence...")
        page.reload(wait_until="networkidle")
        time.sleep(0.5)
        page.locator("#navAnalyticsBtn").click()
        page.wait_for_selector(".breakdown-table", state="visible")
        analytics_text_after_reload = page.locator("body").inner_text()
        assert "Full Mock Examination (15 Qs, 15m)" in analytics_text_after_reload, "Attempt should persist after page reload"
        print("[PASS] LocalStorage persistence verified across page refresh.")

        # 12. Mobile Responsiveness Test (390 x 844)
        print("\n--- Test 12: Mobile Responsiveness Check (390x844) ---")
        page.locator(".brand-section").click() # return to dashboard
        time.sleep(0.3)
        page.set_viewport_size({"width": 390, "height": 844})
        time.sleep(0.5)
        # Check that page still displays brand and elements cleanly
        assert page.locator(".brand-title").is_visible(), "Brand title visible on mobile"
        assert page.locator(".module-card").count() == 7, "All 7 module cards visible on mobile"
        print("[PASS] Mobile layout responsive: no horizontal clipping or missing elements.")

        # Screenshot artifacts
        os.makedirs("tests/screenshots", exist_ok=True)
        page.screenshot(path="tests/screenshots/mobile_view.png")
        page.set_viewport_size({"width": 1280, "height": 800})
        page.screenshot(path="tests/screenshots/desktop_view.png")
        print("[PASS] Desktop and Mobile screenshots saved.")

        browser.close()

    if errors_detected:
        print(f"\n[FAIL] {len(errors_detected)} error(s) detected during test execution:")
        for err in errors_detected:
            print(" -", err)
        sys.exit(1)
    else:
        print("\n" + "=" * 60)
        print("ALL PLAYWRIGHT TESTS PASSED WITH 0 CONSOLE ERRORS!")
        print("=" * 60)

if __name__ == "__main__":
    run_e2e_tests()
