// VAC 227862: Web Application Development using Flask
// Master Examination Preparation & Practice Engine
// Fully Static, Zero External Backend Dependencies, Netlify Deployable

(function() {
  'use strict';

  // 1. Module Metadata Registry
  const MODULES = {
    1: { name: "Introduction to Flask & Web Basics", code: "Unit 1", icon: "🌐" },
    2: { name: "Routing, Templating & Static Files", code: "Unit 2", icon: "📄" },
    3: { name: "Flask Forms & Request Handling", code: "Unit 3", icon: "📝" },
    4: { name: "Flask with Database Integration", code: "Unit 4", icon: "🗄️" },
    5: { name: "User Authentication & Sessions", code: "Unit 5", icon: "🔒" },
    6: { name: "RESTful APIs & Cloud Deployment", code: "Unit 6", icon: "🚀" },
    7: { name: "Project Work & Practical Applications", code: "Unit 7", icon: "💻" }
  };

  // 2. Aggregate All Validated Question Banks
  function getMasterQuestions() {
    const list = [];
    for (let u = 1; u <= 7; u++) {
      const qb = window[`UNIT${u}_QUESTIONS`];
      if (Array.isArray(qb)) {
        list.push(...qb);
      }
    }
    return list;
  }

  // 3. Persistent User State via LocalStorage
  const STORAGE_KEY = "flask_vac_mcq_state_v2";
  let state = {
    attempts: [],          // Past exam & quiz records
    wrongQuestionIds: [],  // Set of question IDs answered incorrectly
    bookmarks: [],         // Bookmarked question IDs
    theme: "dark",         // "dark" or "light"
    questionHistory: {}    // id -> { correct: count, total: count }
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        state = Object.assign(state, parsed);
      }
    } catch (e) {
      console.warn("Could not load state from localStorage:", e);
    }
    // Apply saved theme
    document.documentElement.setAttribute("data-theme", state.theme || "dark");
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Could not save state to localStorage:", e);
    }
  }

  // 4. Active Session & PWA State
  let session = null;
  let timerInterval = null;
  let deferredPrompt = null;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const btn = $("#pwaInstallBtn");
    if (btn) btn.classList.remove("pwa-hidden");
    const bnr = $("#pwaInstallBanner");
    if (bnr) bnr.classList.remove("pwa-hidden");
  });

  window.addEventListener("appinstalled", () => {
    showToast("🚀 Flask VAC successfully installed! Available offline anytime.");
    deferredPrompt = null;
    const btn = $("#pwaInstallBtn");
    if (btn) btn.classList.add("pwa-hidden");
    const bnr = $("#pwaInstallBanner");
    if (bnr) bnr.classList.add("pwa-hidden");
  });

  function installPWA() {
    if (!deferredPrompt) {
      showToast("To install Flask VAC, open your browser's menu (⋮ or Share) and select 'Add to Home Screen'.");
      return;
    }
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        showToast("🎉 Installing Flask VAC app on your device...");
      }
      deferredPrompt = null;
      const btn = $("#pwaInstallBtn");
      if (btn) btn.classList.add("pwa-hidden");
      const bnr = $("#pwaInstallBanner");
      if (bnr) bnr.classList.add("pwa-hidden");
    });
  }

  function toggleMobilePalette() {
    const sidebar = $(".palette-sidebar");
    let overlay = $(".palette-drawer-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "palette-drawer-overlay";
      overlay.onclick = toggleMobilePalette;
      document.body.appendChild(overlay);
    }
    if (sidebar) {
      const isOpen = sidebar.classList.toggle("palette-open");
      overlay.classList.toggle("active", isOpen);
    }
  }

  // 5. Utility Helpers
  const $ = selector => document.querySelector(selector);
  
  function escapeHtml(text) {
    if (!text) return "";
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function calculateReadiness(accuracy) {
    if (accuracy === null || accuracy === undefined) return { label: "Not Evaluated", color: "var(--text-muted)" };
    if (accuracy >= 80) return { label: "Exam Ready", color: "var(--success)" };
    if (accuracy >= 60) return { label: "Almost Ready", color: "var(--warning)" };
    return { label: "Needs Revision", color: "var(--danger)" };
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function showToast(msg) {
    let container = $("#toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    container.appendChild(t);
    setTimeout(() => {
      t.remove();
    }, 2800);
  }

  // 6. Navigation Bar & Mobile Bar Renderer
  function renderNavbar(currentMode = "") {
    const isDark = (state.theme || "dark") === "dark";
    return `
      <header class="top-nav">
        <div class="brand-section" onclick="FlaskMCQ.home()">
          <div class="brand-icon">F</div>
          <div>
            <div class="brand-title">Flask VAC 227862</div>
            <div class="brand-subtitle">University MCQ Examination Prep</div>
          </div>
        </div>
        <div class="nav-actions">
          <button id="pwaInstallBtn" class="btn btn-sm btn-install ${deferredPrompt ? '' : 'pwa-hidden'}" onclick="FlaskMCQ.installPWA()" title="Install Flask VAC App">
            📲 Install App
          </button>
          <button id="navMockBtn" class="btn btn-sm ${currentMode === 'mock' ? 'btn-primary' : ''} desktop-only" onclick="FlaskMCQ.showMockModal()">
            ⏱️ Mock Exam
          </button>
          <button id="navNotesBtn" class="btn btn-sm ${currentMode === 'notes' ? 'btn-primary' : ''} desktop-only" onclick="FlaskMCQ.showNotes(1)">
            📚 Revision Notes
          </button>
          <button id="navAnalyticsBtn" class="btn btn-sm ${currentMode === 'analytics' ? 'btn-primary' : ''} desktop-only" onclick="FlaskMCQ.showAnalytics()">
            📊 Analytics
          </button>
          <button id="themeToggleBtn" class="btn btn-sm btn-icon" onclick="FlaskMCQ.toggleTheme()" title="Toggle Dark/Light Mode">
            ${isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>
    `;
  }

  function renderMobileBottomBar(currentMode = "") {
    const isDark = (state.theme || "dark") === "dark";
    if (currentMode === "arena") return ""; // arena has specialized bottom action bar
    return `
      <nav class="mobile-bottom-bar" aria-label="Mobile Navigation">
        <button class="mobile-nav-item ${currentMode === 'home' ? 'active' : ''}" onclick="FlaskMCQ.home()">
          <span class="m-icon">🏠</span>
          <span>Home</span>
        </button>
        <button class="mobile-nav-item ${currentMode === 'mock' ? 'active' : ''}" onclick="FlaskMCQ.showMockModal()">
          <span class="m-icon">⏱️</span>
          <span>Mock</span>
        </button>
        <button class="mobile-nav-item ${currentMode === 'notes' ? 'active' : ''}" onclick="FlaskMCQ.showNotes(1)">
          <span class="m-icon">📚</span>
          <span>Notes</span>
        </button>
        <button class="mobile-nav-item ${currentMode === 'analytics' ? 'active' : ''}" onclick="FlaskMCQ.showAnalytics()">
          <span class="m-icon">📊</span>
          <span>Stats</span>
        </button>
        <button class="mobile-nav-item" onclick="FlaskMCQ.toggleTheme()">
          <span class="m-icon">${isDark ? '☀️' : '🌙'}</span>
          <span>${isDark ? 'Light' : 'Dark'}</span>
        </button>
      </nav>
    `;
  }

  // 7. Dashboard View
  function renderDashboard() {
    clearInterval(timerInterval);
    session = null;
    const allQuestions = getMasterQuestions();
    
    // Compute total attempts and stats
    let totalAnswered = 0;
    let totalCorrect = 0;
    for (const qid in state.questionHistory) {
      totalAnswered += state.questionHistory[qid].total || 0;
      totalCorrect += state.questionHistory[qid].correct || 0;
    }
    const overallPct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : null;
    const readiness = calculateReadiness(overallPct);
    const wrongCount = state.wrongQuestionIds ? state.wrongQuestionIds.length : 0;

    // Module Cards
    const moduleCardsHtml = Object.keys(MODULES).map(u => {
      const uNum = parseInt(u, 10);
      const mod = MODULES[uNum];
      const unitQs = allQuestions.filter(q => q.module === uNum);
      const qCount = unitQs.length;
      
      // Compute module accuracy from history
      let uAns = 0;
      let uCor = 0;
      unitQs.forEach(q => {
        const h = state.questionHistory[q.id];
        if (h && h.total > 0) {
          uAns += h.total;
          uCor += h.correct;
        }
      });
      const uPct = uAns > 0 ? Math.round((uCor / uAns) * 100) : 0;

      return `
        <div class="module-card" data-module="${uNum}">
          <div>
            <div class="module-card-header">
              <span class="module-badge">${mod.code}</span>
              <span style="font-size:1.3rem">${mod.icon}</span>
            </div>
            <h4>${mod.name}</h4>
            <p>${qCount} Exam Questions | Comprehensive option-by-option explanations</p>
          </div>
          <div>
            <div class="progress-container">
              <div class="progress-labels">
                <span>Attempted accuracy</span>
                <span><b>${uAns > 0 ? uPct + '%' : 'Not attempted'}</b> (${uCor}/${uAns})</span>
              </div>
              <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width:${uPct}%"></div>
              </div>
            </div>
            <div class="module-actions">
              <button class="btn btn-primary btn-sm" onclick="FlaskMCQ.startUnitPractice(${uNum})">Practise MCQs</button>
              <button class="btn btn-sm" onclick="FlaskMCQ.showNotes(${uNum})">Notes</button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    const app = $("#app");
    app.innerHTML = `
      ${renderNavbar("home")}
      
      <div id="pwaInstallBanner" class="pwa-install-banner ${deferredPrompt ? '' : 'pwa-hidden'}" onclick="FlaskMCQ.installPWA()">
        <div style="font-size:2rem">📲</div>
        <div style="flex:1">
          <div style="font-weight:700; font-size:1.02rem; color:var(--text); margin-bottom:2px;">Install Flask VAC App on your Phone</div>
          <div style="font-size:0.84rem; color:var(--text-muted)">1-Tap access to all 350 MCQs & revision notes — works 100% offline without internet!</div>
        </div>
        <button class="btn btn-primary btn-sm">Install App</button>
      </div>

      <div class="panel hero-banner">
        <div class="hero-info">
          <h1>Web Application Development using Flask</h1>
          <p>Subject Code: <b>227862</b> | Semester 3 (MCA / MSc IT). Complete coverage of all 7 university modules with 350+ thoroughly authored MCQs, detailed option-by-option reasoning, and timed exam simulation.</p>
          <div style="margin-top:16px; display:flex; gap:10px; flex-wrap:wrap;">
            <button class="btn btn-primary" onclick="FlaskMCQ.showMockModal()">⏱️ Full Mock Exam</button>
            <button class="btn" onclick="FlaskMCQ.startAllPractice()">🌐 Practise All Modules (350 Qs)</button>
            <button class="btn" onclick="FlaskMCQ.startWeakPractice()">
              ⚠️ Retry Mistakes ${wrongCount > 0 ? `(${wrongCount})` : ''}
            </button>
          </div>
        </div>
        <div class="readiness-gauge">
          <div class="gauge-label" style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Exam Readiness</div>
          <div class="gauge-pct" style="color:${readiness.color}">${overallPct !== null ? overallPct + '%' : '--'}</div>
          <div class="gauge-status" style="color:${readiness.color}">${readiness.label}</div>
          <div class="gauge-caption">${totalAnswered} questions attempted</div>
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <span class="stat-label">Total Question Bank</span>
          <span class="stat-value" style="color:var(--primary)">${allQuestions.length}</span>
          <span class="stat-sub">Across 7 syllabus modules</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Questions Attempted</span>
          <span class="stat-value">${totalAnswered}</span>
          <span class="stat-sub">Lifetime practice submissions</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Correct Answers</span>
          <span class="stat-value" style="color:var(--success)">${totalCorrect}</span>
          <span class="stat-sub">${overallPct !== null ? overallPct + '% overall accuracy' : 'No attempts yet'}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Saved Mistakes</span>
          <span class="stat-value" style="color:var(--danger)">${wrongCount}</span>
          <span class="stat-sub">Pending revision practice</span>
        </div>
      </div>

      <div class="section-title">
        <span>Syllabus Modules (1 to 7)</span>
        <button class="btn btn-sm" onclick="FlaskMCQ.resetProgressConfirm()">Reset Progress</button>
      </div>

      <div class="modules-grid">
        ${moduleCardsHtml}
      </div>

      ${renderMobileBottomBar("home")}
    `;
  }

  // 8. Session Runner (Practice, Mock, Weak, Review)
  function startSession({ mode, title, questions, durationMins = 0, isMock = false }) {
    if (!questions || questions.length === 0) {
      alert("No questions available for this selection.");
      return;
    }

    session = {
      mode: mode, // 'practice' | 'mock' | 'weak' | 'review'
      title: title,
      isMock: isMock,
      questions: questions,
      index: 0,
      answers: {},        // index -> selected option index (0..3)
      locked: {},         // index -> true
      flagged: {},        // index -> true
      startTime: Date.now(),
      endTime: durationMins > 0 ? Date.now() + durationMins * 60 * 1000 : null,
      durationMins: durationMins,
      // Active filters
      filterDifficulty: "All",
      filterTopic: "All",
      isRandomized: false
    };

    clearInterval(timerInterval);
    if (session.endTime) {
      timerInterval = setInterval(handleTimerTick, 1000);
    }

    renderArena();
  }

  function handleTimerTick() {
    if (!session || !session.endTime) return;
    const remainingMs = session.endTime - Date.now();
    const timerElem = $("#timerBadge");
    
    if (remainingMs <= 0) {
      clearInterval(timerInterval);
      showToast("⏰ Time is up! Submitting exam automatically...");
      finishSession(true);
      return;
    }

    if (timerElem) {
      const remainingSec = Math.floor(remainingMs / 1000);
      timerElem.textContent = "⏱️ " + formatTime(remainingSec);
      if (remainingSec < 300) { // under 5 minutes
        timerElem.classList.add("timer-warning");
      }
    }
  }

  // Render the Main Question & Arena Layout
  function renderArena() {
    if (!session) return;
    const qIndex = session.index;
    const q = session.questions[qIndex];
    const total = session.questions.length;
    const isMock = session.isMock;
    const isAnswered = session.answers[qIndex] !== undefined;
    const isLocked = session.locked[qIndex] === true;
    const selectedOpt = session.answers[qIndex];
    const isFlagged = session.flagged[qIndex] === true;

    // Difficulty tag class
    const diffClass = q.difficulty === "Easy" ? "tag-easy" : q.difficulty === "Medium" ? "tag-medium" : "tag-hard";

    // Build Options Buttons HTML
    const letters = ["A", "B", "C", "D"];
    const optionsHtml = q.options.map((optText, optIdx) => {
      let extraClass = "";
      let explanationSnippet = "";

      if (isMock) {
        // In mock mode, don't show correct/wrong until exam finishes
        if (selectedOpt === optIdx) extraClass = "selected";
      } else {
        // In practice or review mode, show instant feedback
        if (isAnswered) {
          if (optIdx === q.correctAnswer) {
            extraClass = "correct";
            explanationSnippet = `<div class="option-explanation-text"><b>✓ Option ${letters[optIdx]}:</b> ${escapeHtml(q.optionExplanations[letters[optIdx]])}</div>`;
          } else if (selectedOpt === optIdx) {
            extraClass = "wrong";
            explanationSnippet = `<div class="option-explanation-text"><b>✗ Option ${letters[optIdx]}:</b> ${escapeHtml(q.optionExplanations[letters[optIdx]])}</div>`;
          }
        }
      }

      return `
        <button class="option-btn ${extraClass}" onclick="FlaskMCQ.pickOption(${optIdx})" ${(!isMock && isLocked) ? 'disabled' : ''}>
          <span class="option-letter">${letters[optIdx]}</span>
          <div style="flex:1">
            <div>${escapeHtml(optText)}</div>
            ${explanationSnippet}
          </div>
        </button>
      `;
    }).join("");

    // Explanation panel in practice mode after answering
    let explanationPanelHtml = "";
    if (!isMock && isAnswered) {
      const isCorrect = selectedOpt === q.correctAnswer;
      explanationPanelHtml = `
        <div class="explanation-panel">
          <div class="explanation-header" style="color:${isCorrect ? 'var(--success)' : 'var(--danger)'}">
            <span>${isCorrect ? '✓ Correct Answer!' : '✗ Incorrect - Review the Technical Distinction:'}</span>
          </div>
          <div class="explanation-summary">
            <b>Core Explanation:</b> ${escapeHtml(q.correctExplanation)}
          </div>
          
          <div class="breakdown-title">Detailed Option-by-Option Breakdown:</div>
          ${letters.map((letChar, lIdx) => {
            const isThisCorrect = lIdx === q.correctAnswer;
            const explanation = q.optionExplanations[letChar];
            return `
              <div class="breakdown-item ${isThisCorrect ? 'is-correct' : 'is-wrong'}">
                <b>Option ${letChar} (${isThisCorrect ? 'Correct' : 'Incorrect'}):</b> ${escapeHtml(explanation)}
              </div>
            `;
          }).join("")}

          ${q.practicalExample ? `
            <div class="practical-example-box">
              <b>💡 Practical Example / Code Insight:</b><br>${escapeHtml(q.practicalExample)}
            </div>
          ` : ''}
        </div>
      `;
    }

    // Build Question Palette Grid
    const paletteGridHtml = session.questions.map((item, idx) => {
      let pClass = "palette-btn";
      if (idx === qIndex) pClass += " current";
      if (session.flagged[idx]) pClass += " flagged";
      
      if (isMock) {
        if (session.answers[idx] !== undefined) pClass += " answered";
      } else {
        if (session.answers[idx] !== undefined) {
          if (session.answers[idx] === item.correctAnswer) {
            pClass += " answered-correct";
          } else {
            pClass += " answered-wrong";
          }
        }
      }

      return `<button class="${pClass}" onclick="FlaskMCQ.jumpTo(${idx})">${idx + 1}</button>`;
    }).join("");

    const app = $("#app");
    app.innerHTML = `
      ${renderNavbar("arena")}
      
      <div class="arena-topbar">
        <div class="arena-topbar-left">
          <button class="btn btn-sm" onclick="FlaskMCQ.confirmExit()">← Exit</button>
          <b class="arena-topbar-title" title="${escapeHtml(session.title)}">${escapeHtml(session.title)}</b>
          <span style="color:var(--text-muted); font-size:0.85rem; flex-shrink:0;">Q${qIndex + 1}/${total}</span>
        </div>
        <div class="arena-topbar-right">
          <button id="mobilePaletteBtn" class="btn btn-sm mobile-only" onclick="FlaskMCQ.toggleMobilePalette()" title="View Question Palette">
            🗺️ Palette (${Object.keys(session.answers).length}/${total})
          </button>
          <button id="flagBtn" class="btn btn-sm" onclick="FlaskMCQ.toggleFlag()" title="Mark question for review">
            ${isFlagged ? '🚩 Flagged' : '🏳️ Flag'}
          </button>
          ${session.endTime ? `<div id="timerBadge" class="timer-badge">⏱️ --:--</div>` : ''}
        </div>
      </div>

      <div id="questionArena" class="arena-layout">
        <div class="arena-main">
          <div class="question-card">
            <div class="question-meta">
              <span class="tag">Module ${q.module}</span>
              <span class="tag ${diffClass}">${q.difficulty}</span>
              <span class="tag">${escapeHtml(q.topic)}</span>
              ${isFlagged ? '<span class="tag" style="background:var(--warning-bg); color:var(--warning-text); border-color:var(--warning-border)">Marked for Review</span>' : ''}
            </div>

            <div class="question-title">${escapeHtml(q.question)}</div>

            ${q.codeSnippet ? `<pre class="code-box"><code>${escapeHtml(q.codeSnippet)}</code></pre>` : ''}

            <div class="options-stack">
              ${optionsHtml}
            </div>

            ${explanationPanelHtml}
          </div>

          <div class="arena-controls">
            <button class="btn" onclick="FlaskMCQ.prevQuestion()" ${qIndex === 0 ? 'disabled' : ''}>← Previous</button>
            <div style="display:flex; gap:10px;">
              ${isMock && isAnswered ? `<button class="btn btn-sm" onclick="FlaskMCQ.clearAnswer()">Clear Selection</button>` : ''}
              ${qIndex === total - 1 ? 
                `<button class="btn btn-primary" onclick="FlaskMCQ.confirmFinish()">${isMock ? 'Submit Examination' : 'Finish Practice'}</button>` : 
                `<button class="btn btn-primary" onclick="FlaskMCQ.nextQuestion()">Next →</button>`}
            </div>
          </div>
        </div>

        <div class="palette-drawer-overlay" onclick="FlaskMCQ.toggleMobilePalette()"></div>

        <aside id="paletteSidebar" class="palette-sidebar">
          <div class="palette-header">
            <span>Question Palette (${Object.keys(session.answers).length}/${total})</span>
            <button class="btn btn-sm mobile-only" onclick="FlaskMCQ.toggleMobilePalette()" style="padding:2px 8px; font-size:0.75rem;">✕ Close</button>
          </div>
          <div class="palette-grid">
            ${paletteGridHtml}
          </div>
          <div class="palette-legend">
            ${isMock ? `
              <div class="legend-item"><div class="legend-dot" style="background:var(--primary)"></div> Answered</div>
              <div class="legend-item"><div class="legend-dot" style="background:var(--badge-bg); border:1px solid var(--border)"></div> Unanswered</div>
              <div class="legend-item"><div class="legend-dot" style="background:var(--warning)"></div> Flagged</div>
              <div class="legend-item"><div class="legend-dot" style="outline:2px solid var(--primary)"></div> Current</div>
            ` : `
              <div class="legend-item"><div class="legend-dot" style="background:var(--success)"></div> Correct</div>
              <div class="legend-item"><div class="legend-dot" style="background:var(--danger)"></div> Incorrect</div>
              <div class="legend-item"><div class="legend-dot" style="background:var(--warning)"></div> Flagged</div>
              <div class="legend-item"><div class="legend-dot" style="outline:2px solid var(--primary)"></div> Current</div>
            `}
          </div>
          <div style="margin-top:16px;">
            <button class="btn btn-sm" style="width:100%" onclick="FlaskMCQ.confirmFinish()">
              ${isMock ? 'Submit Examination' : 'Finish & View Score'}
            </button>
          </div>
        </aside>
      </div>
    `;

    // Immediately trigger timer update
    if (session.endTime) handleTimerTick();
  }

  // Answer Picking
  function pickOption(optIdx) {
    if (!session) return;
    const qIndex = session.index;
    const q = session.questions[qIndex];

    if (!session.isMock && session.locked[qIndex]) {
      return; // locked in practice mode
    }

    session.answers[qIndex] = optIdx;

    if (!session.isMock) {
      session.locked[qIndex] = true;
      const isCorrect = optIdx === q.correctAnswer;
      
      // Update history in state
      state.questionHistory[q.id] = state.questionHistory[q.id] || { correct: 0, total: 0 };
      state.questionHistory[q.id].total++;
      if (isCorrect) {
        state.questionHistory[q.id].correct++;
        // Remove from wrong questions if present
        state.wrongQuestionIds = state.wrongQuestionIds.filter(id => id !== q.id);
      } else {
        if (!state.wrongQuestionIds.includes(q.id)) {
          state.wrongQuestionIds.push(q.id);
        }
      }
      saveState();
    }

    renderArena();
  }

  function clearAnswer() {
    if (!session || !session.isMock) return;
    const qIndex = session.index;
    delete session.answers[qIndex];
    renderArena();
  }

  function nextQuestion() {
    if (!session) return;
    if (session.index < session.questions.length - 1) {
      session.index++;
      renderArena();
    }
  }

  function prevQuestion() {
    if (!session) return;
    if (session.index > 0) {
      session.index--;
      renderArena();
    }
  }

  function jumpTo(idx) {
    if (!session) return;
    if (idx >= 0 && idx < session.questions.length) {
      session.index = idx;
      const sb = $(".palette-sidebar");
      if (sb) sb.classList.remove("palette-open");
      const ov = $(".palette-drawer-overlay");
      if (ov) ov.classList.remove("active");
      renderArena();
    }
  }

  function toggleFlag() {
    if (!session) return;
    const qIndex = session.index;
    session.flagged[qIndex] = !session.flagged[qIndex];
    renderArena();
  }

  function showModalDialog({ title, message, confirmText = "Confirm", cancelText = "Cancel", isDanger = false, onConfirm }) {
    let modal = $("#dialogModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "dialogModal";
      modal.className = "modal-overlay";
      document.body.appendChild(modal);
    }
    modal.innerHTML = `
      <div class="modal-card">
        <h3>${escapeHtml(title)}</h3>
        <div style="color:var(--text-muted); font-size:0.95rem; line-height:1.5; margin-bottom:20px;">
          ${message}
        </div>
        <div class="modal-actions">
          <button class="btn" id="modalCancelBtn">${escapeHtml(cancelText)}</button>
          <button class="btn ${isDanger ? 'btn-danger' : 'btn-primary'}" id="modalConfirmBtn">${escapeHtml(confirmText)}</button>
        </div>
      </div>
    `;
    $("#modalCancelBtn").onclick = () => modal.remove();
    $("#modalConfirmBtn").onclick = () => {
      modal.remove();
      if (typeof onConfirm === "function") onConfirm();
    };
  }

  function confirmExit() {
    showModalDialog({
      title: "Exit Current Session?",
      message: "<p>Are you sure you want to exit? Your current unsaved responses in this active session will be discarded.</p>",
      confirmText: "Exit to Dashboard",
      cancelText: "Continue Session",
      isDanger: true,
      onConfirm: () => renderDashboard()
    });
  }

  function confirmFinish() {
    if (!session) return;
    const total = session.questions.length;
    const answeredCount = Object.keys(session.answers).length;
    const unanswered = total - answeredCount;

    const statsHtml = `
      <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:10px; padding:12px; margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
          <span>Total Questions:</span> <b>${total}</b>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:6px; color:var(--success)">
          <span>Answered:</span> <b>${answeredCount}</b>
        </div>
        <div style="display:flex; justify-content:space-between; color:${unanswered > 0 ? 'var(--warning)' : 'var(--text-muted)'}">
          <span>Unanswered:</span> <b>${unanswered}</b>
        </div>
      </div>
      ${unanswered > 0 ? `<p style="color:var(--warning); font-size:0.88rem; margin:0 0 10px 0;">⚠️ You have <b>${unanswered} unanswered question(s)</b>. Are you sure you want to submit now?</p>` : '<p style="margin:0 0 10px 0;">All questions have been answered. Ready to generate your performance analytics?</p>'}
    `;

    showModalDialog({
      title: session.isMock ? "Submit Examination" : "Finish Practice Session",
      message: statsHtml,
      confirmText: session.isMock ? "Yes, Submit Exam" : "View Results",
      cancelText: "Keep Reviewing",
      onConfirm: () => finishSession(false)
    });
  }

  // Session Finishing & Result Generation
  function finishSession(autoSubmitted = false) {
    clearInterval(timerInterval);
    if (!session) return;

    const total = session.questions.length;
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    const moduleBreakdown = {};
    const topicBreakdown = {};

    session.questions.forEach((q, idx) => {
      const u = q.module;
      const topic = q.topic;
      moduleBreakdown[u] = moduleBreakdown[u] || { correct: 0, total: 0 };
      topicBreakdown[topic] = topicBreakdown[topic] || { correct: 0, total: 0, module: u };

      moduleBreakdown[u].total++;
      topicBreakdown[topic].total++;

      const selected = session.answers[idx];
      const isAnswered = selected !== undefined;
      const isCorrect = isAnswered && selected === q.correctAnswer;

      if (isAnswered) {
        if (isCorrect) {
          correctCount++;
          moduleBreakdown[u].correct++;
          topicBreakdown[topic].correct++;
          if (session.isMock) {
            state.questionHistory[q.id] = state.questionHistory[q.id] || { correct: 0, total: 0 };
            state.questionHistory[q.id].total++;
            state.questionHistory[q.id].correct++;
            state.wrongQuestionIds = state.wrongQuestionIds.filter(id => id !== q.id);
          }
        } else {
          wrongCount++;
          if (session.isMock) {
            state.questionHistory[q.id] = state.questionHistory[q.id] || { correct: 0, total: 0 };
            state.questionHistory[q.id].total++;
            if (!state.wrongQuestionIds.includes(q.id)) {
              state.wrongQuestionIds.push(q.id);
            }
          }
        }
      } else {
        unansweredCount++;
      }
    });

    const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const timeSpentSec = Math.floor((Date.now() - session.startTime) / 1000);
    const readiness = calculateReadiness(accuracy);

    // Record attempt in state
    state.attempts.push({
      date: new Date().toISOString(),
      title: session.title,
      mode: session.mode,
      total,
      correct: correctCount,
      wrong: wrongCount,
      unanswered: unansweredCount,
      accuracy,
      timeSpentSec
    });
    saveState();

    // Preserve completed session for Review mode
    const completedSession = session;

    renderResults({
      autoSubmitted,
      title: session.title,
      isMock: session.isMock,
      total,
      correct: correctCount,
      wrong: wrongCount,
      unanswered: unansweredCount,
      accuracy,
      timeSpentSec,
      readiness,
      moduleBreakdown,
      topicBreakdown,
      completedSession
    });
  }

  // 9. Results Screen Renderer
  function renderResults(res) {
    const app = $("#app");

    // Identify weak topics (accuracy < 60%)
    const weakTopics = [];
    for (const t in res.topicBreakdown) {
      const tb = res.topicBreakdown[t];
      const pct = Math.round((tb.correct / tb.total) * 100);
      if (pct < 60) {
        weakTopics.push({ topic: t, module: tb.module, pct, correct: tb.correct, total: tb.total });
      }
    }

    // Build Module Breakdown Table Rows
    const modRowsHtml = Object.keys(res.moduleBreakdown).map(u => {
      const uNum = parseInt(u, 10);
      const mod = MODULES[uNum];
      const mb = res.moduleBreakdown[uNum];
      const pct = Math.round((mb.correct / mb.total) * 100);
      return `
        <tr>
          <td><b>${mod.code}</b>: ${mod.name}</td>
          <td>${mb.correct} / ${mb.total}</td>
          <td><b>${pct}%</b></td>
          <td style="width:200px">
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width:${pct}%; background:${pct >= 70 ? 'var(--success)' : pct >= 50 ? 'var(--warning)' : 'var(--danger)'}"></div>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    app.innerHTML = `
      ${renderNavbar("results")}
      
      <div class="panel result-hero">
        ${res.autoSubmitted ? `<div style="color:var(--danger-text); font-weight:700; margin-bottom:8px">⏰ Examination Time Expired - Auto-Submitted</div>` : ''}
        <span class="tag" style="font-size:0.85rem">${escapeHtml(res.title)} Results</span>
        <div class="result-score" style="color:${res.readiness.color}">${res.accuracy}%</div>
        <div class="result-verdict" style="color:${res.readiness.color}">${res.readiness.label}</div>
        <p style="color:var(--text-muted); font-size:0.95rem;">
          You scored <b>${res.correct}</b> correct out of <b>${res.total}</b> questions in <b>${formatTime(res.timeSpentSec)}</b>.
        </p>

        <div style="display:flex; justify-content:center; gap:12px; margin-top:24px; flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="FlaskMCQ.reviewCompletedSession()">🔍 Review Answers & Explanations</button>
          <button class="btn" onclick="FlaskMCQ.retrySessionWrong()">⚠️ Practise Mistakes From This Test (${res.wrong})</button>
          <button class="btn" onclick="FlaskMCQ.home()">🏠 Return to Dashboard</button>
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <span class="stat-label">Correct Answers</span>
          <span class="stat-value" style="color:var(--success)">${res.correct}</span>
          <span class="stat-sub">${Math.round((res.correct/res.total)*100)}% of total</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Incorrect Answers</span>
          <span class="stat-value" style="color:var(--danger)">${res.wrong}</span>
          <span class="stat-sub">Review explanations below</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Unanswered</span>
          <span class="stat-value" style="color:var(--text-muted)">${res.unanswered}</span>
          <span class="stat-sub">Skipped during test</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Time Taken</span>
          <span class="stat-value">${formatTime(res.timeSpentSec)}</span>
          <span class="stat-sub">Average ${Math.round(res.timeSpentSec/res.total)}s / question</span>
        </div>
      </div>

      <div class="panel">
        <h3 style="margin-bottom:14px; font-size:1.15rem">Module-wise Performance Breakdown</h3>
        <table class="breakdown-table">
          <thead>
            <tr>
              <th>Module</th>
              <th>Score</th>
              <th>Accuracy</th>
              <th>Performance Bar</th>
            </tr>
          </thead>
          <tbody>
            ${modRowsHtml}
          </tbody>
        </table>
      </div>

      ${weakTopics.length > 0 ? `
        <div class="panel" style="border-color:var(--danger-border); background:var(--danger-bg)">
          <h3 style="color:var(--danger-text); margin-bottom:8px;">⚠️ Recommended Revision Priorities (Weak Topics):</h3>
          <p style="font-size:0.88rem; color:var(--text); margin-bottom:14px;">The following syllabus topics scored below 60% accuracy and should be reviewed thoroughly in the Quick Revision Notes:</p>
          <div style="display:flex; flex-wrap:wrap; gap:8px;">
            ${weakTopics.map(wt => `
              <span class="tag tag-hard" style="font-size:0.82rem; padding:6px 12px;">
                <b>Unit ${wt.module}:</b> ${escapeHtml(wt.topic)} (${wt.pct}%)
              </span>
            `).join("")}
          </div>
        </div>
      ` : `
        <div class="panel" style="border-color:var(--success-border); background:var(--success-bg)">
          <h3 style="color:var(--success-text); margin-bottom:4px;">🎉 Outstanding Mastery!</h3>
          <p style="font-size:0.9rem; color:var(--text);">All covered topics achieved strong accuracy across this test attempt. Keep practicing mock exams to maintain peak readiness!</p>
        </div>
      `}

      ${renderMobileBottomBar("results")}
    `;

    // Cache completed session in window for review mode
    window._lastCompletedSession = res.completedSession;
  }

  // 10. Review Completed Session
  function reviewCompletedSession() {
    if (!window._lastCompletedSession) {
      alert("No completed session available to review.");
      return;
    }
    const rev = window._lastCompletedSession;
    session = {
      mode: "review",
      title: "Reviewing: " + rev.title,
      isMock: false, // In review mode, show explanations for every question!
      questions: rev.questions,
      index: 0,
      answers: rev.answers,
      locked: rev.questions.reduce((acc, q, i) => { acc[i] = true; return acc; }, {}),
      flagged: rev.flagged,
      startTime: Date.now(),
      endTime: null,
      durationMins: 0
    };
    renderArena();
  }

  function retrySessionWrong() {
    if (!window._lastCompletedSession) return;
    const rev = window._lastCompletedSession;
    const wrongQs = rev.questions.filter((q, idx) => {
      const ans = rev.answers[idx];
      return ans !== undefined && ans !== q.correctAnswer;
    });

    if (wrongQs.length === 0) {
      alert("No incorrect questions from this test to retry! Great job!");
      return;
    }

    startSession({
      mode: "practice",
      title: "Retry Mistakes (" + wrongQs.length + " Qs)",
      questions: shuffle(wrongQs),
      durationMins: 0,
      isMock: false
    });
  }

  // 11. Full Mock Exam Modal & Launcher
  function showMockModal() {
    let modal = $("#mockModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "mockModal";
      modal.className = "modal-overlay";
      document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
      <div class="modal-card">
        <h3>⏱️ Configure Mock Examination</h3>
        <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:18px;">
          Simulates real university exam conditions with a live countdown timer and auto-submission upon expiry. Questions are sampled proportionally across all 7 modules.
        </p>

        <div style="margin-bottom:16px;">
          <label style="font-weight:600; font-size:0.88rem; display:block; margin-bottom:6px;">Number of Questions:</label>
          <select id="mockQCount" class="btn" style="width:100%">
            <option value="15">15 Questions (Quick Diagnostic - 15 min)</option>
            <option value="25" selected>25 Questions (Quick Mock - 25 min)</option>
            <option value="35">35 Questions (Standard Exam - 35 min)</option>
            <option value="50">50 Questions (Comprehensive Exam - 50 min)</option>
            <option value="70">70 Questions (Mastery Benchmark - 70 min)</option>
          </select>
        </div>

        <div style="margin-bottom:20px;">
          <label style="font-weight:600; font-size:0.88rem; display:block; margin-bottom:6px;">Examination Duration:</label>
          <select id="mockDuration" class="btn" style="width:100%">
            <option value="15">15 Minutes</option>
            <option value="25" selected>25 Minutes</option>
            <option value="35">35 Minutes (1 min / question)</option>
            <option value="50">50 Minutes</option>
            <option value="70">70 Minutes</option>
          </select>
        </div>

        <div class="modal-actions">
          <button class="btn" onclick="$('#mockModal').remove()">Cancel</button>
          <button class="btn btn-primary" onclick="FlaskMCQ.launchMockExam()">Start Examination</button>
        </div>
      </div>
    `;
  }

  function launchMockExam() {
    const qCount = parseInt($("#mockQCount").value, 10) || 35;
    const duration = parseInt($("#mockDuration").value, 10) || 35;
    $("#mockModal").remove();

    const all = getMasterQuestions();
    const shuffled = shuffle(all).slice(0, Math.min(qCount, all.length));

    startSession({
      mode: "mock",
      title: `Full Mock Examination (${shuffled.length} Qs, ${duration}m)`,
      questions: shuffled,
      durationMins: duration,
      isMock: true
    });
  }

  // 12. Quick Revision Notes Viewer
  function showNotes(activeUnit = 1) {
    clearInterval(timerInterval);
    session = null;
    const notesData = window.FLASK_REVISION_NOTES || {};
    const mod = notesData[activeUnit];

    if (!mod) {
      alert("Revision notes for Module " + activeUnit + " not found.");
      return;
    }

    const tabsHtml = Object.keys(MODULES).map(u => {
      const uNum = parseInt(u, 10);
      const isActive = uNum === activeUnit;
      return `
        <button class="btn btn-sm ${isActive ? 'btn-primary' : ''}" onclick="FlaskMCQ.showNotes(${uNum})">
          ${MODULES[uNum].code}
        </button>
      `;
    }).join("");

    const defsHtml = mod.definitions.map(d => `
      <div class="definition-item">
        <b>${escapeHtml(d.term)}:</b> ${escapeHtml(d.def)}
      </div>
    `).join("");

    const syntaxHtml = mod.syntaxAndDecorators.map(s => `
      <div style="margin-bottom:12px;">
        <span class="tag" style="background:var(--primary-glow); color:var(--primary); font-weight:700;">${escapeHtml(s.name)}</span>
        <div style="font-family:var(--font-mono); background:var(--code-bg); padding:6px 12px; border-radius:6px; margin:6px 0; font-size:0.86rem; color:#f8fafc;">
          ${escapeHtml(s.syntax)}
        </div>
        <p style="font-size:0.85rem; color:var(--text-muted);">${escapeHtml(s.desc)}</p>
      </div>
    `).join("");

    const diffsHtml = mod.keyDifferences.map(kd => `
      <tr>
        <td style="font-weight:700; width:25%">${escapeHtml(kd.conceptA)}</td>
        <td style="font-weight:700; width:25%">${escapeHtml(kd.conceptB)}</td>
        <td style="font-size:0.88rem">${escapeHtml(kd.diff)}</td>
      </tr>
    `).join("");

    const errorsHtml = mod.commonErrorsAndFixes.map(ef => `
      <div style="margin-bottom:14px; padding:10px 14px; background:var(--badge-bg); border-radius:var(--radius-sm); border-left:3px solid var(--danger);">
        <b style="color:var(--danger-text); font-size:0.9rem;">⚠️ ${escapeHtml(ef.error)}</b>
        <p style="font-size:0.84rem; color:var(--text-muted); margin:4px 0;"><b>Cause:</b> ${escapeHtml(ef.cause)}</p>
        <p style="font-size:0.84rem; color:var(--success-text);"><b>Fix:</b> ${escapeHtml(ef.fix)}</p>
      </div>
    `).join("");

    const codeExamplesHtml = mod.codeExamples.map(ce => `
      <div style="margin-bottom:18px;">
        <h4 style="font-size:0.95rem; font-weight:700; margin-bottom:6px;">${escapeHtml(ce.title)}</h4>
        <pre class="code-box"><code>${escapeHtml(ce.code)}</code></pre>
        <p style="font-size:0.84rem; color:var(--text-muted);">${escapeHtml(ce.explanation)}</p>
      </div>
    `).join("");

    const factsHtml = mod.examFacts.map(fact => `
      <li style="margin-bottom:8px; font-size:0.9rem;">${escapeHtml(fact)}</li>
    `).join("");

    const app = $("#app");
    app.innerHTML = `
      ${renderNavbar("notes")}
      
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; flex-wrap:wrap; gap:12px;">
        <div>
          <h2>📚 Quick Revision Notes</h2>
          <p style="color:var(--text-muted); font-size:0.88rem;">Concise, high-yield examination summaries mapped strictly to university syllabus topics.</p>
        </div>
        <div style="display:flex; gap:10px;">
          <button class="btn btn-primary btn-sm" onclick="FlaskMCQ.startUnitPractice(${activeUnit})">
            Practise Unit ${activeUnit} MCQs
          </button>
          <button class="btn btn-sm" onclick="FlaskMCQ.home()">Home</button>
        </div>
      </div>

      <div class="notes-nav">
        ${tabsHtml}
      </div>

      <div class="panel">
        <span class="tag" style="background:var(--primary-glow); color:var(--primary); font-weight:700;">Module ${mod.module}</span>
        <h1 style="font-size:1.55rem; margin:10px 0 8px;">${escapeHtml(mod.title)}</h1>
        <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:20px;">${escapeHtml(mod.overview)}</p>

        <div class="notes-section-card">
          <h3>📖 Key Definitions & Core Terminology</h3>
          ${defsHtml}
        </div>

        <div class="notes-section-card">
          <h3>⚡ Essential Syntax, Decorators & Functions</h3>
          ${syntaxHtml}
        </div>

        <div class="notes-section-card">
          <h3>⚖️ Important Technical Comparisons</h3>
          <table class="breakdown-table">
            <thead>
              <tr>
                <th>Concept A</th>
                <th>Concept B</th>
                <th>Key Technical Distinction</th>
              </tr>
            </thead>
            <tbody>
              ${diffsHtml}
            </tbody>
          </table>
        </div>

        <div class="notes-section-card">
          <h3>🛠️ Common Errors & Debugging Fixes</h3>
          ${errorsHtml}
        </div>

        <div class="notes-section-card">
          <h3>💻 Exemplary Code Patterns</h3>
          ${codeExamplesHtml}
        </div>

        <div class="notes-section-card" style="border-color:var(--warning-border); background:var(--warning-bg)">
          <h3 style="color:var(--warning-text); border-color:var(--warning-border)">🎯 High-Yield Exam Facts Worth Remembering</h3>
          <ul style="padding-left:20px; color:var(--text);">
            ${factsHtml}
          </ul>
        </div>
      </div>

      ${renderMobileBottomBar("notes")}
    `;
  }

  // 13. Performance Analytics Dashboard View
  function showAnalytics() {
    clearInterval(timerInterval);
    session = null;
    const allQuestions = getMasterQuestions();
    const attempts = state.attempts || [];

    let totalAnswered = 0;
    let totalCorrect = 0;
    for (const qid in state.questionHistory) {
      totalAnswered += state.questionHistory[qid].total || 0;
      totalCorrect += state.questionHistory[qid].correct || 0;
    }
    const overallPct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : null;
    const readiness = calculateReadiness(overallPct);

    // Module-wise aggregated stats
    const modStats = Object.keys(MODULES).map(u => {
      const uNum = parseInt(u, 10);
      const mod = MODULES[uNum];
      const unitQs = allQuestions.filter(q => q.module === uNum);
      let cor = 0;
      let tot = 0;
      unitQs.forEach(q => {
        const h = state.questionHistory[q.id];
        if (h && h.total > 0) {
          tot += h.total;
          cor += h.correct;
        }
      });
      const pct = tot > 0 ? Math.round((cor / tot) * 100) : 0;
      return { uNum, mod, cor, tot, pct };
    });

    const modRows = modStats.map(ms => `
      <tr>
        <td><b>${ms.mod.code}</b>: ${ms.mod.name}</td>
        <td>${ms.cor} / ${ms.tot}</td>
        <td><b>${ms.tot > 0 ? ms.pct + '%' : 'Unattempted'}</b></td>
        <td style="width:180px">
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width:${ms.pct}%; background:${ms.pct >= 75 ? 'var(--success)' : ms.pct >= 50 ? 'var(--warning)' : 'var(--danger)'}"></div>
          </div>
        </td>
        <td>
          <button class="btn btn-sm" onclick="FlaskMCQ.startUnitPractice(${ms.uNum})">Practise</button>
        </td>
      </tr>
    `).join("");

    // Past attempts log
    const attemptsRows = attempts.slice().reverse().slice(0, 8).map(att => `
      <tr>
        <td>${new Date(att.date).toLocaleDateString()} ${new Date(att.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
        <td><b>${escapeHtml(att.title)}</b></td>
        <td>${att.correct} / ${att.total}</td>
        <td><b>${att.accuracy}%</b></td>
        <td>${formatTime(att.timeSpentSec)}</td>
      </tr>
    `).join("");

    const app = $("#app");
    app.innerHTML = `
      ${renderNavbar("analytics")}
      
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
        <div>
          <h2>📊 Performance Analytics Dashboard</h2>
          <p style="color:var(--text-muted); font-size:0.88rem;">Track syllabus mastery, attempt accuracy, and readiness for your university examination.</p>
        </div>
        <button class="btn btn-sm" onclick="FlaskMCQ.home()">← Dashboard</button>
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <span class="stat-label">Readiness Assessment</span>
          <span class="stat-value" style="color:${readiness.color}">${readiness.label}</span>
          <span class="stat-sub">${overallPct !== null ? overallPct + '% overall accuracy' : 'Needs practice data'}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Total Completed Tests</span>
          <span class="stat-value">${attempts.length}</span>
          <span class="stat-sub">Quizzes & Mock Exams</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Total Questions Solved</span>
          <span class="stat-value">${totalAnswered}</span>
          <span class="stat-sub">${totalCorrect} solved correctly</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Saved Mistake Bank</span>
          <span class="stat-value" style="color:var(--danger)">${state.wrongQuestionIds ? state.wrongQuestionIds.length : 0}</span>
          <span class="stat-sub">Questions for review</span>
        </div>
      </div>

      <div class="panel">
        <h3 style="margin-bottom:14px; font-size:1.15rem">Module-Wise Syllabus Mastery</h3>
        <table class="breakdown-table">
          <thead>
            <tr>
              <th>Module</th>
              <th>Correct / Attempted</th>
              <th>Accuracy</th>
              <th>Mastery Bar</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${modRows}
          </tbody>
        </table>
      </div>

      <div class="panel">
        <h3 style="margin-bottom:14px; font-size:1.15rem">Recent Test History (Last 8 Attempts)</h3>
        ${attempts.length > 0 ? `
          <table class="breakdown-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Test Title</th>
                <th>Score</th>
                <th>Accuracy</th>
                <th>Time Taken</th>
              </tr>
            </thead>
            <tbody>
              ${attemptsRows}
            </tbody>
          </table>
        ` : `
          <p style="color:var(--text-muted); font-size:0.9rem;">No completed examination attempts recorded yet. Take a mock exam or complete a module practice to view your history!</p>
        `}
      </div>

      ${renderMobileBottomBar("analytics")}
    `;
  }

  // 14. Practice Triggers
  function startUnitPractice(uNum) {
    const all = getMasterQuestions();
    const unitQs = all.filter(q => q.module === uNum);
    startSession({
      mode: "practice",
      title: `Unit ${uNum}: ${MODULES[uNum].name}`,
      questions: unitQs,
      durationMins: 0,
      isMock: false
    });
  }

  function startAllPractice() {
    const all = getMasterQuestions();
    startSession({
      mode: "practice",
      title: "All Modules Practice (350 Questions)",
      questions: shuffle(all),
      durationMins: 0,
      isMock: false
    });
  }

  function startWeakPractice() {
    const wrongIds = state.wrongQuestionIds || [];
    if (wrongIds.length === 0) {
      alert("🎉 Fantastic! You have zero recorded incorrect questions in your mistake bank. Keep practicing mock exams!");
      return;
    }
    const all = getMasterQuestions();
    const weakQs = all.filter(q => wrongIds.includes(q.id));

    startSession({
      mode: "practice",
      title: `Retry Incorrect Questions (${weakQs.length} Qs)`,
      questions: shuffle(weakQs),
      durationMins: 0,
      isMock: false
    });
  }

  function toggleTheme() {
    state.theme = (state.theme || "dark") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", state.theme);
    saveState();
    if (session) {
      renderArena();
    } else {
      renderDashboard();
    }
  }

  function resetProgressConfirm() {
    showModalDialog({
      title: "Reset All Progress Data?",
      message: "<p>Are you sure you want to completely reset all saved progress, test attempts, and mistake history? <b>This cannot be undone.</b></p>",
      confirmText: "Reset Everything",
      cancelText: "Cancel",
      isDanger: true,
      onConfirm: () => {
        state.attempts = [];
        state.wrongQuestionIds = [];
        state.questionHistory = {};
        state.bookmarks = [];
        saveState();
        showToast("Progress successfully reset.");
        renderDashboard();
      }
    });
  }

  // Keyboard navigation support
  window.addEventListener("keydown", function(e) {
    if (!session) return;
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") return;

    if (e.key === "ArrowRight") {
      nextQuestion();
    } else if (e.key === "ArrowLeft") {
      prevQuestion();
    } else if (["1", "2", "3", "4"].includes(e.key)) {
      pickOption(parseInt(e.key, 10) - 1);
    } else if (["a", "b", "c", "d", "A", "B", "C", "D"].includes(e.key)) {
      const idx = ["a", "b", "c", "d"].indexOf(e.key.toLowerCase());
      if (idx !== -1) pickOption(idx);
    }
  });

  // Expose Global Controller
  window.FlaskMCQ = {
    home: renderDashboard,
    startUnitPractice,
    startAllPractice,
    startWeakPractice,
    showMockModal,
    launchMockExam,
    showNotes,
    showAnalytics,
    toggleTheme,
    resetProgressConfirm,
    pickOption,
    clearAnswer,
    nextQuestion,
    prevQuestion,
    jumpTo,
    toggleFlag,
    confirmExit,
    confirmFinish,
    reviewCompletedSession,
    retrySessionWrong,
    installPWA,
    toggleMobilePalette
  };

  // Initialize and PWA Service Worker Registration
  document.addEventListener("DOMContentLoaded", () => {
    loadState();
    renderDashboard();

    // Register Service Worker for Offline PWA execution
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js")
          .then(reg => {
            console.log("[PWA] Service Worker registered successfully with scope:", reg.scope);
          })
          .catch(err => {
            console.warn("[PWA] Service Worker registration failed:", err);
          });
      });
    }

    // Handle App Shortcuts / Query Parameters
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const action = urlParams.get("action");
      if (action === "mock") {
        setTimeout(showMockModal, 250);
      } else if (action === "notes") {
        setTimeout(() => showNotes(1), 250);
      } else if (action === "analytics") {
        setTimeout(showAnalytics, 250);
      } else if (action === "mistakes") {
        setTimeout(startWeakPractice, 250);
      }
    } catch (e) {
      console.warn("Could not parse URL search params:", e);
    }
  });

})();
