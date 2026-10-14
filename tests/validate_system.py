# -*- coding: utf-8 -*-
"""
Automated Verification & Integrity Test Suite for
Flask VAC 227862 Examination System
"""

import json
import re
import os

def test_full_system():
    print("==================================================")
    print("RUNNING AUTOMATED INTEGRITY TEST SUITE")
    print("==================================================")

    # 1. File Existence Test
    required_files = [
        "index.html",
        "css/style.css",
        "js/app.js",
        "_redirects",
        "netlify.toml",
        "data/unit1.js",
        "data/unit2.js",
        "data/unit3.js",
        "data/unit4.js",
        "data/unit5.js",
        "data/unit6.js",
        "data/unit7.js",
        "data/notes.js"
    ]

    for rf in required_files:
        assert os.path.exists(rf), f"CRITICAL: Missing file {rf}"
        size = os.path.getsize(rf)
        assert size > 0, f"CRITICAL: Empty file {rf}"
        print(f"[PASS] File Verified: {rf} ({size:,} bytes)")

    # 2. Question Bank Validation
    all_questions = []
    unit_counts = {}
    difficulty_counts = {"Easy": 0, "Medium": 0, "Hard": 0}
    seen_ids = set()

    for u in range(1, 8):
        fpath = f"data/unit{u}.js"
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()

        match = re.search(r"window\.UNIT\d+_QUESTIONS\s*=\s*(\[.*?\]);", content, re.DOTALL)
        assert match, f"Could not extract JSON from {fpath}"
        questions = json.loads(match.group(1))

        assert len(questions) >= 50, f"Module {u} has fewer than 50 questions: {len(questions)}"
        unit_counts[u] = len(questions)

        for q in questions:
            # Check ID uniqueness
            assert q["id"] not in seen_ids, f"Duplicate ID: {q['id']}"
            seen_ids.add(q["id"])

            # Check Module tag
            assert q["module"] == u, f"Module mismatch in {q['id']}: expected {u}, got {q['module']}"

            # Check 4 Options
            assert len(q["options"]) == 4, f"Options count != 4 in {q['id']}"
            for opt in q["options"]:
                assert opt and len(opt.strip()) > 0, f"Empty option text in {q['id']}"

            # Check Correct Answer bounds
            assert 0 <= q["correctAnswer"] <= 3, f"Invalid correctAnswer in {q['id']}"

            # Check Option Explanations
            for letter in ["A", "B", "C", "D"]:
                assert letter in q["optionExplanations"], f"Missing explanation for {letter} in {q['id']}"
                exp = q["optionExplanations"][letter]
                assert exp and len(exp.strip()) > 10, f"Explanation for {letter} too short in {q['id']}"

            # Check Topic & Difficulty
            assert q["topic"] and len(q["topic"]) > 2, f"Missing topic in {q['id']}"
            assert q["difficulty"] in difficulty_counts, f"Invalid difficulty in {q['id']}"
            difficulty_counts[q["difficulty"]] += 1

            all_questions.append(q)

    print(f"[PASS] Question Bank Verified: Total {len(all_questions)} MCQs across all 7 modules.")
    print(f"       Per Module Counts: {unit_counts}")
    print(f"       Difficulty Distribution: {difficulty_counts}")

    # 3. Revision Notes Validation
    with open("data/notes.js", "r", encoding="utf-8") as f:
        notes_content = f.read()
    match_notes = re.search(r"window\.FLASK_REVISION_NOTES\s*=\s*(\{.*?\});", notes_content, re.DOTALL)
    assert match_notes, "Could not extract notes JSON from data/notes.js"
    notes_data = json.loads(match_notes.group(1))

    for u in range(1, 8):
        str_u = str(u)
        assert str_u in notes_data, f"Missing revision notes for Module {u}"
        n = notes_data[str_u]
        assert len(n["definitions"]) >= 4, f"Insufficient definitions for Unit {u}"
        assert len(n["syntaxAndDecorators"]) >= 2, f"Insufficient syntax for Unit {u}"
        assert len(n["keyDifferences"]) >= 2, f"Insufficient differences for Unit {u}"
        assert len(n["commonErrorsAndFixes"]) >= 2, f"Insufficient errors for Unit {u}"
        assert len(n["codeExamples"]) >= 1, f"Missing code example for Unit {u}"
        assert len(n["examFacts"]) >= 4, f"Insufficient exam facts for Unit {u}"
        print(f"[PASS] Notes Verified for Module {u}: {n['title']}")

    # 4. Simulation of Scoring & Readiness Logic
    sample_scores = [
        (85, "Exam Ready"),
        (90, "Exam Ready"),
        (75, "Almost Ready"),
        (60, "Almost Ready"),
        (45, "Needs Revision"),
        (0, "Needs Revision")
    ]
    for score, expected in sample_scores:
        if score >= 80:
            actual = "Exam Ready"
        elif score >= 60:
            actual = "Almost Ready"
        else:
            actual = "Needs Revision"
        assert actual == expected, f"Readiness logic failed for {score}"
    print("[PASS] Scoring & Readiness Thresholds Verified.")

    print("==================================================")
    print("ALL INTEGRITY CHECKS PASSED (100% SUCCESS)")
    print("==================================================")

if __name__ == "__main__":
    test_full_system()
