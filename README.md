# 🎓 Flask VAC 227862: University MCQ Examination System

> **Subject**: Web Application Development using Flask | **Subject Code**: 227862  
> **Course**: MCA / MSc IT (Semester 3) | **Target**: Comprehensive University MCQ Examination Preparation

[![PWA Ready](https://img.shields.io/badge/PWA-100%25%20Offline%20Ready-success?style=for-the-badge&logo=pwa)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![Deploy with Netlify](https://img.shields.io/badge/Netlify-Deployable-00C7B7?style=for-the-badge&logo=netlify)](https://www.netlify.com/)
[![Questions](https://img.shields.io/badge/Question%20Bank-350%20MCQs-blue?style=for-the-badge)](#question-bank)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](#)

---

## 🚀 Key Highlights

- **⚡ Zero Friction Practice**: No login, registration, or backend database required. Launch and start practicing immediately.
- **📱 Full Mobile Responsive Design**: Engineered with a thumb-friendly bottom navigation bar, dynamic slide-up question palette drawer, and touch targets ($\ge 48$px).
- **📶 Progressive Web App (PWA)**: Installable directly on **Android (Chrome)**, **iOS (Safari)**, and **Desktop (Chrome/Edge)**.
- **✈️ 100% True Offline Execution**: Powered by a Service Worker with *Cache-First / Stale-While-Revalidate* strategy. Practice in Airplane Mode without internet!
- **📖 Deep Option-by-Option Explanations**: Every question includes reasoning for why the correct option is right AND why each of the other three distractors is wrong.
- **⏱️ University Mock Exam Simulator**: Realistic countdown timer with auto-submission upon expiry, question tagging (Flag for review), and detailed performance diagnostics.
- **📊 Performance Analytics & Mistake Bank**: Automatic tracking of overall exam readiness, module-wise accuracy, and 1-tap "Retry Mistakes" mode.

---

## 📚 Question Bank Coverage (350 MCQs across 7 Modules)

| Unit | Syllabus Module Name | Questions | Difficulty Breakdown |
| :---: | :--- | :---: | :--- |
| **1** | Introduction to Flask & Architecture | **50** | 18 Easy, 24 Medium, 8 Hard |
| **2** | Routing, Templating (Jinja2) & Static Files | **50** | 17 Easy, 23 Medium, 10 Hard |
| **3** | Forms, Request Handling & File Uploads | **50** | 17 Easy, 24 Medium, 9 Hard |
| **4** | Database Integration (Flask-SQLAlchemy & ORM) | **50** | 18 Easy, 23 Medium, 9 Hard |
| **5** | User Authentication, Sessions & Cookies | **50** | 17 Easy, 24 Medium, 9 Hard |
| **6** | RESTful APIs & Production Deployment (WSGI) | **50** | 16 Easy, 24 Medium, 10 Hard |
| **7** | Project Work, Testing, Blueprints & Best Practices | **50** | 17 Easy, 24 Medium, 9 Hard |
| **Total** | **All 7 University Syllabus Modules** | **350** | **120 Easy, 166 Medium, 64 Hard** |

---

## 📱 Mobile & PWA Installation

### Android (Chrome / Brave / Edge)
1. Open the website.
2. Tap the in-app banner **"Install Flask VAC App on your Phone"** or open the 3-dots menu (`⋮`) -> **"Install app"**.
3. The app is added to your home screen with a native standalone display.

### iPhone (Safari)
1. Open the website in Safari.
2. Tap the Share button (`📤`) at the bottom.
3. Select **"Add to Home Screen"** (`[+]`) and tap **"Add"**.

### Desktop (Windows / Mac)
1. In Chrome or Edge, click the **Install icon** on the right side of the address bar.
2. Launch directly as a desktop application window.

---

## 🌐 Netlify Deployment

This repository is pre-configured with `netlify.toml` and `_redirects` for 1-click deployment.

### Drag-and-Drop Deploy:
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop this repository folder.
3. Your PWA will be live with full HTTPS in seconds.

### Git-based Deploy:
- **Build command**: *(Leave blank)*
- **Publish directory**: `.`

---

## 📂 Project Structure

```text
VAC-Practice-MCQ/
├── index.html            # Main HTML5 Single-Page Application entry
├── manifest.json         # PWA Manifest (standalone display, icons, shortcuts)
├── sw.js                 # Offline Service Worker (Cache-First + SWR)
├── netlify.toml          # Netlify build, routing, & PWA security headers
├── _redirects            # SPA redirect rules
├── css/
│   └── style.css         # Complete responsive design system & dark/light theme
├── js/
│   └── app.js            # Core SPA Controller & state management
├── data/
│   ├── unit1.js to unit7.js  # 350 curated MCQs with ABCD explanations
│   └── notes.js          # High-yield revision summaries for all 7 modules
├── icons/                # High-resolution PWA icons (192, 512, maskable, apple)
└── tests/                # Automated Playwright E2E & system validation suite
```

---

## 🛠️ Local Development

To run locally using Python's built-in HTTP server:

```bash
python -m http.server 8080
```

Open `http://localhost:8080` in your web browser.

---

## 👨‍💻 Author

Developed for **University VAC Examination Preparation**.
Repository: [adityaraj-projects/VAC-Practice-MCQ](https://github.com/adityaraj-projects/VAC-Practice-MCQ)
