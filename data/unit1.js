// Module 1: Introduction to Flask and Web Development Concepts
// Total Questions: 50
// Auto-generated & Verified Question Bank

window.UNIT1_QUESTIONS = [
  {
    "id": "u1_01",
    "module": 1,
    "topic": "Web Development Fundamentals",
    "difficulty": "Easy",
    "question": "What is the primary difference between a static website and a dynamic web application?",
    "codeSnippet": null,
    "options": [
      "Static websites use Python on the server, while dynamic web applications use only HTML and CSS",
      "Static websites deliver pre-built fixed files directly to the browser, whereas dynamic applications generate content on the fly via server-side execution and database queries",
      "Static websites require a database connection, while dynamic applications do not use databases",
      "Static websites cannot contain any CSS styling or JavaScript interactivity"
    ],
    "correctAnswer": 1,
    "correctExplanation": "A static website serves fixed HTML, CSS, and image files stored on the server without real-time backend processing. Dynamic web applications execute server-side code (such as Python in Flask) and query databases to create customized content per user request.",
    "optionExplanations": {
      "A": "Incorrect. Static websites do not execute Python or any server-side logic; they merely deliver static assets.",
      "B": "Correct. Static sites deliver unchanged files directly from disk, whereas dynamic applications use server-side scripts (Flask/Python) and databases to produce real-time, personalized responses.",
      "C": "Incorrect. It is dynamic applications that typically utilize databases, while static sites do not.",
      "D": "Incorrect. Static websites can and frequently do include rich CSS styling and client-side JavaScript."
    },
    "practicalExample": "A personal portfolio page with fixed text is a static site; an e-commerce dashboard or Instagram feed showing user-specific data is a dynamic web application."
  },
  {
    "id": "u1_02",
    "module": 1,
    "topic": "Frontend vs Backend",
    "difficulty": "Easy",
    "question": "Which of the following technologies operates exclusively on the client side (Frontend)?",
    "codeSnippet": null,
    "options": [
      "Python (Flask)",
      "HTML, CSS, and client-side JavaScript",
      "SQLite database engine",
      "Werkzeug WSGI server"
    ],
    "correctAnswer": 1,
    "correctExplanation": "HTML, CSS, and client-side JavaScript run directly inside the user's web browser (client-side), rendering the visual user interface. Python, Flask, SQLite, and Werkzeug run on the server.",
    "optionExplanations": {
      "A": "Incorrect. Python and Flask run on the server side to handle business logic and route requests.",
      "B": "Correct. HTML, CSS, and browser JavaScript execute entirely within the client's browser to present UI and capture user actions.",
      "C": "Incorrect. SQLite is a server-side relational database engine stored on the host system.",
      "D": "Incorrect. Werkzeug is a server-side WSGI utility library used by Flask."
    },
    "practicalExample": "When you click a button and an alert box pops up without contacting the server, client-side JavaScript executed in the browser."
  },
  {
    "id": "u1_03",
    "module": 1,
    "topic": "Client-Server Architecture",
    "difficulty": "Medium",
    "question": "In a classic 3-Tier web architecture, what are the three respective layers?",
    "codeSnippet": null,
    "options": [
      "Presentation Tier (Client/Browser), Application/Logic Tier (Flask Server), and Data Tier (Database)",
      "Operating System, Network Card, and Monitor",
      "HTML Tier, CSS Tier, and JavaScript Tier",
      "GET Tier, POST Tier, and Response Tier"
    ],
    "correctAnswer": 0,
    "correctExplanation": "The 3-tier architecture separates concerns into: 1) Presentation Layer (browser UI), 2) Application/Business Logic Layer (backend server like Flask executing Python), and 3) Data Layer (database like SQLite/MySQL storing persistent records).",
    "optionExplanations": {
      "A": "Correct. The three tiers are Presentation (Client UI), Application Logic (Flask/Python), and Data Storage (Database).",
      "B": "Incorrect. These are hardware/OS components, not web architectural tiers.",
      "C": "Incorrect. HTML, CSS, and JavaScript all belong exclusively to the Presentation Tier.",
      "D": "Incorrect. GET and POST are HTTP request methods, not structural tiers."
    },
    "practicalExample": "User fills a form (Presentation) -> Flask validates data & applies business rules (Application) -> Record inserted into MySQL (Data)."
  },
  {
    "id": "u1_04",
    "module": 1,
    "topic": "Web Request Lifecycle",
    "difficulty": "Medium",
    "question": "What is the correct sequential order of events when a user navigates to a Flask webpage?",
    "codeSnippet": null,
    "options": [
      "Database commit -> Browser displays page -> Route lookup -> HTTP Request sent",
      "Browser sends HTTP Request -> Flask matches route via URL Map -> View function executes logic -> Template engine renders HTML -> HTTP Response returned to browser",
      "Flask renders template -> Client sends HTTP request -> Route is looked up -> Database opens",
      "Browser executes Python code -> Client compiles Flask -> Database sends HTML to browser"
    ],
    "correctAnswer": 1,
    "correctExplanation": "The web request cycle begins with the browser generating an HTTP request. The Flask server receives it, Werkzeug's URL map matches the path to a registered view function, the view executes logic (querying DB if needed), Jinja2 renders HTML, and a 200 OK HTTP response is returned.",
    "optionExplanations": {
      "A": "Incorrect. The browser cannot display the page before the request is even sent.",
      "B": "Correct. Request -> Route match -> View execution -> HTML template render -> Response returned to browser.",
      "C": "Incorrect. The server cannot render a template before receiving the client's HTTP request.",
      "D": "Incorrect. Browsers never execute Python or compile Flask; Python runs entirely on the server."
    },
    "practicalExample": "Navigating to `http://localhost:5000/about` initiates a GET request, triggers `about()` in `app.py`, renders `about.html`, and displays the page."
  },
  {
    "id": "u1_05",
    "module": 1,
    "topic": "HTTP Methods",
    "difficulty": "Easy",
    "question": "Which HTTP method is specifically intended to retrieve or read data from the server without modifying server state?",
    "codeSnippet": null,
    "options": [
      "POST",
      "GET",
      "DELETE",
      "PUT"
    ],
    "correctAnswer": 1,
    "correctExplanation": "GET is a safe, idempotent HTTP method designed strictly to request and retrieve data from a resource without causing side effects or modifying server-side data.",
    "optionExplanations": {
      "A": "Incorrect. POST is used to submit new data to the server to create or process resources.",
      "B": "Correct. GET is standard for fetching resources (e.g. searching Google or viewing a home page).",
      "C": "Incorrect. DELETE is used to delete an existing resource on the server.",
      "D": "Incorrect. PUT is used to update or replace an existing resource completely."
    },
    "practicalExample": "Loading `https://amazon.in/products` in your browser generates an HTTP GET request."
  },
  {
    "id": "u1_06",
    "module": 1,
    "topic": "HTTP Methods",
    "difficulty": "Easy",
    "question": "Which HTTP method should be used when submitting sensitive credentials such as a user login password?",
    "codeSnippet": null,
    "options": [
      "GET",
      "HEAD",
      "POST",
      "OPTIONS"
    ],
    "correctAnswer": 2,
    "correctExplanation": "POST sends form data within the HTTP request body rather than appending it to the visible URL query string, preventing sensitive passwords from appearing in browser history, server access logs, or shoulder-surfing.",
    "optionExplanations": {
      "A": "Incorrect. GET appends parameters directly to the visible URL (e.g., `?password=secret`), exposing them in browser history and logs.",
      "B": "Incorrect. HEAD only requests HTTP response headers without any body.",
      "C": "Correct. POST packages form fields in the request body, which is the required standard for login and registration forms.",
      "D": "Incorrect. OPTIONS is used to query the communication options supported by the target web server."
    },
    "practicalExample": "<form action='/login' method='POST'> ensures credentials are not exposed in the browser's URL address bar."
  },
  {
    "id": "u1_07",
    "module": 1,
    "topic": "HTTP Status Codes",
    "difficulty": "Easy",
    "question": "Which HTTP status code signifies that the requested URL path could not be found on the server?",
    "codeSnippet": null,
    "options": [
      "200 OK",
      "403 Forbidden",
      "404 Not Found",
      "500 Internal Server Error"
    ],
    "correctAnswer": 2,
    "correctExplanation": "404 Not Found is the standard client error response code indicating that the server cannot locate the requested endpoint URL path.",
    "optionExplanations": {
      "A": "Incorrect. 200 OK indicates a successful HTTP request.",
      "B": "Incorrect. 403 Forbidden indicates the server understands the request but refuses to authorize it.",
      "C": "Correct. 404 Not Found indicates that no route or file matches the requested URL.",
      "D": "Incorrect. 500 indicates an unhandled exception or crash on the server side."
    },
    "practicalExample": "If an app has routes for `/` and `/about`, requesting `/contact` will cause Flask to return a 404 Not Found response."
  },
  {
    "id": "u1_08",
    "module": 1,
    "topic": "HTTP Status Codes",
    "difficulty": "Medium",
    "question": "What does an HTTP status code 500 indicate when interacting with a Flask web application?",
    "codeSnippet": null,
    "options": [
      "The client failed to provide a valid password",
      "An unhandled Python exception occurred inside the server-side code while processing the request",
      "The requested route does not exist in the URL map",
      "The client browser is missing CSS stylesheets"
    ],
    "correctAnswer": 1,
    "correctExplanation": "HTTP 500 (Internal Server Error) indicates that the Flask application encountered an unexpected runtime error (such as a ZeroDivisionError, KeyError, or unhandled database failure) that prevented it from returning a normal response.",
    "optionExplanations": {
      "A": "Incorrect. Authentication failures typically return 401 Unauthorized or 403 Forbidden.",
      "B": "Correct. 500 signifies a server-side crash or uncaught Python exception during request execution.",
      "C": "Incorrect. A non-existent route results in 404 Not Found.",
      "D": "Incorrect. Missing client assets do not cause server-side 500 errors."
    },
    "practicalExample": "If a view function executes `result = 10 / 0` without try/except, Flask halts execution and emits an HTTP 500 response."
  },
  {
    "id": "u1_09",
    "module": 1,
    "topic": "URL Anatomy",
    "difficulty": "Easy",
    "question": "In the URL 'https://example.com:5000/students?page=2', which portion represents the endpoint route path?",
    "codeSnippet": null,
    "options": [
      "https://",
      "example.com:5000",
      "/students",
      "?page=2"
    ],
    "correctAnswer": 2,
    "correctExplanation": "In this URL, 'https://' is the protocol/scheme, 'example.com:5000' is the host domain and port, '/students' is the hierarchical endpoint route path, and '?page=2' is the query string.",
    "optionExplanations": {
      "A": "Incorrect. 'https://' is the communication protocol.",
      "B": "Incorrect. 'example.com:5000' is the network host and port.",
      "C": "Correct. '/students' is the path mapped by Flask routes such as `@app.route('/students')`.",
      "D": "Incorrect. '?page=2' is the query string accessible in Flask via `request.args`."
    },
    "practicalExample": "Flask's `@app.route('/students')` matches the `/students` portion of the incoming URL."
  },
  {
    "id": "u1_10",
    "module": 1,
    "topic": "Cookies and Sessions",
    "difficulty": "Medium",
    "question": "What is the primary difference between cookies and sessions in web applications?",
    "codeSnippet": null,
    "options": [
      "Cookies are stored directly in the client browser, whereas session data is cryptographically managed by the server",
      "Cookies can store up to 50 GB of data, whereas sessions are limited to 4 KB",
      "Cookies are executed as Python scripts, whereas sessions are written in HTML",
      "Cookies only work over HTTPS, while sessions work without any network connection"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Cookies are small key-value text snippets stored locally inside the user's web browser and transmitted with every HTTP request. Sessions represent state managed across requests, where Flask securely cryptographically signs the data using the application's secret key.",
    "optionExplanations": {
      "A": "Correct. Cookies reside in the client's browser, while session state is managed and signed by the backend application.",
      "B": "Incorrect. Cookies are typically limited to around 4 KB by browser specifications, not 50 GB.",
      "C": "Incorrect. Neither cookies nor sessions are executable scripts.",
      "D": "Incorrect. Both cookies and sessions function over standard HTTP/HTTPS protocols."
    },
    "practicalExample": "A cookie might store a theme preference (`theme=dark`), while Flask's session stores the user's authenticated login state."
  },
  {
    "id": "u1_11",
    "module": 1,
    "topic": "Introduction to Web Frameworks",
    "difficulty": "Easy",
    "question": "Why do developers use web frameworks like Flask instead of writing raw Python socket servers?",
    "codeSnippet": null,
    "options": [
      "Web frameworks are required because Python cannot open TCP network sockets natively",
      "Frameworks provide pre-built routing, HTTP request/response parsing, session management, and template rendering, allowing developers to focus on application business logic",
      "Frameworks automatically compile Python into binary C code for the browser to run",
      "Frameworks eliminate the need for writing HTML or CSS forever"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Without a framework, developers must manually parse HTTP headers, manage socket connections, parse query strings, and construct HTTP response envelopes from scratch. Flask abstracts this boilerplate into clean decorators and functions.",
    "optionExplanations": {
      "A": "Incorrect. Python has a built-in `socket` module and can open TCP sockets easily.",
      "B": "Correct. Frameworks handle protocol parsing, URL matching, templating, and security boilerplate out-of-the-box.",
      "C": "Incorrect. Frameworks do not compile Python for client browsers.",
      "D": "Incorrect. Developers still create HTML templates and CSS stylesheets for user interfaces."
    },
    "practicalExample": "Instead of parsing raw HTTP byte strings, Flask allows writing `@app.route('/home')` and `return 'Home'`."
  },
  {
    "id": "u1_12",
    "module": 1,
    "topic": "Flask Background & Origins",
    "difficulty": "Easy",
    "question": "Who created the Flask web framework, and in which year was it first released?",
    "codeSnippet": null,
    "options": [
      "Guido van Rossum in 1991",
      "Armin Ronacher in 2010",
      "Tim Berners-Lee in 1989",
      "James Gosling in 1995"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Flask was created by Austrian open-source software developer Armin Ronacher and the Pocoo team in April 2010, initially as an April Fools' joke that evolved into one of the world's most popular microframeworks.",
    "optionExplanations": {
      "A": "Incorrect. Guido van Rossum created Python in 1991.",
      "B": "Correct. Armin Ronacher created Flask in 2010.",
      "C": "Incorrect. Tim Berners-Lee invented the World Wide Web and HTML in 1989.",
      "D": "Incorrect. James Gosling created Java in 1995."
    },
    "practicalExample": "Armin Ronacher originally combined Werkzeug and Jinja into a standalone zip file called 'Denkwerkzeug' before renaming it Flask."
  },
  {
    "id": "u1_13",
    "module": 1,
    "topic": "Flask Core Dependencies",
    "difficulty": "Medium",
    "question": "Flask is built upon two foundational underlying libraries. What are they?",
    "codeSnippet": null,
    "options": [
      "Django and Celery",
      "Werkzeug (WSGI utility library) and Jinja2 (template engine)",
      "NumPy and Pandas",
      "React and Bootstrap"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Flask's lightweight core relies directly on Werkzeug for handling the Web Server Gateway Interface (WSGI), routing, and request/response objects, and Jinja2 for fast, secure dynamic HTML templating.",
    "optionExplanations": {
      "A": "Incorrect. Django is a competing framework; Celery is an asynchronous task queue.",
      "B": "Correct. Werkzeug provides WSGI routing and HTTP utilities; Jinja2 provides dynamic HTML template rendering.",
      "C": "Incorrect. NumPy and Pandas are data science libraries unrelated to Flask core.",
      "D": "Incorrect. React and Bootstrap are frontend client libraries."
    },
    "practicalExample": "When Flask parses `request.args` it uses Werkzeug's data structures; when it calls `render_template()` it calls Jinja2."
  },
  {
    "id": "u1_14",
    "module": 1,
    "topic": "WSGI Concept",
    "difficulty": "Medium",
    "question": "What does the acronym WSGI stand for in the Python web development ecosystem?",
    "codeSnippet": null,
    "options": [
      "Web Socket General Interface",
      "Web Server Gateway Interface",
      "Wide Scale Graphical Integration",
      "Web Secure Global Identifier"
    ],
    "correctAnswer": 1,
    "correctExplanation": "WSGI stands for Web Server Gateway Interface (defined in PEP 3333). It is the standard universal specification describing how a web server communicates with Python web applications.",
    "optionExplanations": {
      "A": "Incorrect. WebSockets are a full-duplex protocol, not WSGI.",
      "B": "Correct. Web Server Gateway Interface is the standard Python bridge between servers (like Gunicorn/Nginx) and applications (like Flask).",
      "C": "Incorrect. This is a fabricated phrase.",
      "D": "Incorrect. Not related to Python server standards."
    },
    "practicalExample": "Gunicorn acts as a WSGI server that forwards HTTP requests to your Flask WSGI application callable `app`."
  },
  {
    "id": "u1_15",
    "module": 1,
    "topic": "Microframework Concept",
    "difficulty": "Medium",
    "question": "Why is Flask classified as a 'microframework'?",
    "codeSnippet": null,
    "options": [
      "Because it can only handle small web applications with fewer than 100 visitors per day",
      "Because it only runs on microcontrollers like Arduino and Raspberry Pi Pico",
      "Because its core is intentionally minimalist, simple, and unopinionated, leaving database, authentication, and form tools to pluggable extensions",
      "Because it restricts applications to a maximum of 1 megabyte of source code"
    ],
    "correctAnswer": 2,
    "correctExplanation": "The 'micro' in microframework means Flask aims to keep the core simple yet extensible. It does not force an ORM, form library, or authentication system on the developer, allowing developers the freedom to plug in any tools they prefer.",
    "optionExplanations": {
      "A": "Incorrect. Flask powers massive high-traffic websites such as Reddit and Netflix.",
      "B": "Incorrect. Flask runs on standard servers and computers, not just microcontrollers.",
      "C": "Correct. 'Micro' refers to its minimalist, unopinionated core that provides routing and templating while letting extensions handle the rest.",
      "D": "Incorrect. There is no artificial code size limitation in Flask."
    },
    "practicalExample": "Unlike Django which comes with a built-in ORM, Flask lets you choose between SQLAlchemy, MongoEngine, Peewee, or raw SQL."
  },
  {
    "id": "u1_16",
    "module": 1,
    "topic": "Flask vs Django",
    "difficulty": "Easy",
    "question": "Which of the following architectural philosophies best describes Django compared to Flask?",
    "codeSnippet": null,
    "options": [
      "Minimalist and unopinionated",
      "'Batteries-included' full-stack framework with built-in ORM, admin panel, and authentication",
      "A microframework with zero third-party dependencies",
      "A frontend JavaScript rendering library"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Django is famous for its 'batteries-included' philosophy. It ships with a built-in Object-Relational Mapper (ORM), an automatic admin dashboard, form validation, and user authentication straight out of the box.",
    "optionExplanations": {
      "A": "Incorrect. Minimalist and unopinionated describes Flask, not Django.",
      "B": "Correct. Django is a monolithic, 'batteries-included' framework providing built-in auth, ORM, and admin UI.",
      "C": "Incorrect. Django is full-stack, not a microframework.",
      "D": "Incorrect. Django is a server-side Python framework, not a frontend JavaScript library."
    },
    "practicalExample": "In Django, running `django-admin startproject` creates multiple configuration files and ready-to-use auth tables; in Flask, a complete app fits in 5 lines in `app.py`."
  },
  {
    "id": "u1_17",
    "module": 1,
    "topic": "Flask vs Django",
    "difficulty": "Medium",
    "question": "In which of the following scenarios is Flask typically preferred over Django?",
    "codeSnippet": null,
    "options": [
      "Building a massive enterprise ERP application requiring a pre-built admin panel out of the box",
      "Developing lightweight REST APIs, microservices, or deploying Machine Learning models",
      "When the project requires an unavoidable monolithic structure with built-in database migrations",
      "When developing an iOS and Android native mobile application"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Flask's minimalist overhead and flexibility make it the industry gold standard for microservices, lightweight REST APIs, and Machine Learning model inference endpoints where the full weight of Django is unnecessary.",
    "optionExplanations": {
      "A": "Incorrect. Large enterprise systems wanting instant admin panels are textbook use cases for Django.",
      "B": "Correct. Flask excels at microservices, REST APIs, and ML model serving due to low overhead and simplicity.",
      "C": "Incorrect. Monolithic structures with built-in migrations favor Django.",
      "D": "Incorrect. Neither Flask nor Django builds native mobile apps directly."
    },
    "practicalExample": "A data scientist wrapping a scikit-learn model in an HTTP POST endpoint can write a complete Flask microservice in under 20 lines of code."
  },
  {
    "id": "u1_18",
    "module": 1,
    "topic": "Flask vs Django",
    "difficulty": "Medium",
    "question": "How do Flask and Django handle database integration by default?",
    "codeSnippet": null,
    "options": [
      "Flask has a mandatory built-in ORM, while Django has no database support",
      "Both frameworks enforce the exact same built-in database engine",
      "Django includes its own proprietary ORM out of the box, whereas Flask leaves database selection pluggable via extensions like Flask-SQLAlchemy",
      "Neither framework can connect to SQL databases"
    ],
    "correctAnswer": 2,
    "correctExplanation": "Django includes its own built-in Django ORM as an integral part of the framework. Flask includes no database engine by default, giving developers the freedom to plug in Flask-SQLAlchemy, PyMySQL, psycopg2, or NoSQL databases.",
    "optionExplanations": {
      "A": "Incorrect. Flask has no built-in ORM; Django has a powerful one.",
      "B": "Incorrect. Django uses Django ORM; Flask commonly uses SQLAlchemy through community extensions.",
      "C": "Correct. Django has a tightly integrated built-in ORM, while Flask is database-agnostic and pluggable.",
      "D": "Incorrect. Both frameworks can connect to any major SQL database."
    },
    "practicalExample": "In Flask, you install `Flask-SQLAlchemy` with `pip install flask-sqlalchemy` when relational database support is needed."
  },
  {
    "id": "u1_19",
    "module": 1,
    "topic": "Industry Adoption",
    "difficulty": "Easy",
    "question": "Which major tech companies use Flask in their production microservices architecture as highlighted in the course syllabus?",
    "codeSnippet": null,
    "options": [
      "Netflix, Reddit, and Lyft",
      "Microsoft Word and Excel",
      "Adobe Photoshop and Illustrator",
      "Oracle Database Server Engine"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Companies like Netflix (for internal REST APIs and recommendation service orchestration), Reddit (for core backend traffic services), and Lyft (for microservice architectures) heavily utilize Flask.",
    "optionExplanations": {
      "A": "Correct. Netflix, Reddit, and Lyft are prominent production users of Flask microservices.",
      "B": "Incorrect. Word and Excel are desktop office software suites.",
      "C": "Incorrect. Photoshop and Illustrator are graphics design desktop applications.",
      "D": "Incorrect. Oracle DB engine is written in C/C++."
    },
    "practicalExample": "Netflix uses Flask to build lightweight internal RESTful endpoints that manage cloud microservice instances."
  },
  {
    "id": "u1_20",
    "module": 1,
    "topic": "Virtual Environments",
    "difficulty": "Medium",
    "question": "What is the primary purpose of creating a Python virtual environment (`venv`) before installing Flask?",
    "codeSnippet": null,
    "options": [
      "To speed up CPU clock speed during program execution",
      "To isolate project dependencies and prevent library version conflicts with other Python projects on the system",
      "To convert Python code into native HTML",
      "To allow Python to run without installing the Python interpreter"
    ],
    "correctAnswer": 1,
    "correctExplanation": "A virtual environment creates an isolated folder containing a dedicated Python executable and pip site-packages directory. This prevents different projects from colliding when they require conflicting versions of Flask or third-party packages.",
    "optionExplanations": {
      "A": "Incorrect. Virtual environments have zero effect on hardware clock speeds.",
      "B": "Correct. Isolates project libraries so Project A (using Flask 2.0) doesn't conflict with Project B (using Flask 3.0).",
      "C": "Incorrect. Virtual environments do not perform language translation.",
      "D": "Incorrect. You must have Python installed to create a virtual environment."
    },
    "practicalExample": "Running `python -m venv myenv` keeps all packages installed via `pip install flask` inside `myenv/` instead of global system files."
  },
  {
    "id": "u1_21",
    "module": 1,
    "topic": "Virtual Environments",
    "difficulty": "Easy",
    "question": "Which command creates a new Python virtual environment named 'venv' using Python's standard library?",
    "codeSnippet": null,
    "options": [
      "pip make venv",
      "python -m venv venv",
      "flask create-env venv",
      "npm init venv"
    ],
    "correctAnswer": 1,
    "correctExplanation": "`python -m venv venv` invokes the built-in `venv` module in Python to generate a self-contained virtual environment directory named 'venv'.",
    "optionExplanations": {
      "A": "Incorrect. `pip` installs packages; it does not create virtual environments.",
      "B": "Correct. `python -m venv <directory_name>` is the official command to initialize an environment.",
      "C": "Incorrect. Flask does not have a `create-env` command.",
      "D": "Incorrect. `npm` is Node.js's package manager, not Python's."
    },
    "practicalExample": "In terminal: `python -m venv venv` followed by `venv\\Scripts\\activate` on Windows."
  },
  {
    "id": "u1_22",
    "module": 1,
    "topic": "Virtual Environments",
    "difficulty": "Medium",
    "question": "How do you activate a virtual environment named 'venv' in a Windows Command Prompt / PowerShell?",
    "codeSnippet": null,
    "options": [
      "source venv/bin/activate",
      "venv\\Scripts\\activate",
      "python activate venv",
      "pip start venv"
    ],
    "correctAnswer": 1,
    "correctExplanation": "On Windows, the activation batch script or PowerShell script resides in the `Scripts` subfolder: `venv\\Scripts\\activate` (or `venv\\Scripts\\Activate.ps1`). On Linux/macOS, it is `source venv/bin/activate`.",
    "optionExplanations": {
      "A": "Incorrect. `source venv/bin/activate` is used on Unix-based systems (Linux/macOS), not default Windows.",
      "B": "Correct. On Windows, activation scripts are located in `venv\\Scripts\\activate`.",
      "C": "Incorrect. Invalid syntax.",
      "D": "Incorrect. Pip does not manage environment activation."
    },
    "practicalExample": "Once `(venv)` appears at the start of your terminal prompt, packages installed via pip will be isolated to this project."
  },
  {
    "id": "u1_23",
    "module": 1,
    "topic": "Package Management",
    "difficulty": "Easy",
    "question": "Which pip command is used to install the latest version of Flask inside your active Python environment?",
    "codeSnippet": null,
    "options": [
      "python get flask",
      "pip install flask",
      "npm install flask",
      "install-flask --now"
    ],
    "correctAnswer": 1,
    "correctExplanation": "`pip install flask` connects to the Python Package Index (PyPI) and downloads the Flask package along with its core dependencies (Werkzeug, Jinja2, itsdangerous, click, blinker).",
    "optionExplanations": {
      "A": "Incorrect. Python does not have a `get` command for packages.",
      "B": "Correct. `pip install flask` is the standard package installation command.",
      "C": "Incorrect. `npm` installs JavaScript packages, not Python packages.",
      "D": "Incorrect. Invalid syntax."
    },
    "practicalExample": "Terminal: `pip install flask` installs Flask and confirms installation with `Successfully installed flask...`."
  },
  {
    "id": "u1_24",
    "module": 1,
    "topic": "Package Management",
    "difficulty": "Medium",
    "question": "What is the purpose of running `pip freeze > requirements.txt` in a Flask project?",
    "codeSnippet": null,
    "options": [
      "It permanently freezes the Flask server to prevent any more requests",
      "It saves a snapshot of all currently installed package names and their exact versions to a file for easy replication by other developers or deployment platforms",
      "It encrypts the Python source code so others cannot view it",
      "It deletes unneeded dependencies to free up hard disk space"
    ],
    "correctAnswer": 1,
    "correctExplanation": "`pip freeze` outputs all installed packages in `package==version` format, and redirecting `>` it into `requirements.txt` allows collaborators or cloud deployment platforms (like Render or Heroku) to replicate the environment using `pip install -r requirements.txt`.",
    "optionExplanations": {
      "A": "Incorrect. It has nothing to do with pausing or freezing server execution.",
      "B": "Correct. It creates a reproducible record of all dependencies for deployment and collaboration.",
      "C": "Incorrect. It does not perform encryption.",
      "D": "Incorrect. It does not delete any files."
    },
    "practicalExample": "A deployment server runs `pip install -r requirements.txt` to install the exact same Flask and extension versions."
  },
  {
    "id": "u1_25",
    "module": 1,
    "topic": "First Flask Application",
    "difficulty": "Easy",
    "question": "Consider the minimal Flask application below:\nWhat is the role of `__name__` passed to `Flask(__name__)`?",
    "codeSnippet": "from flask import Flask\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return 'Hello World!'",
    "options": [
      "It gives a custom username to the web server administrator",
      "It tells Flask where to look for resources like templates and static files relative to the current module or package",
      "It is an optional comment string that Flask ignores completely",
      "It defines the default URL route for the website"
    ],
    "correctAnswer": 1,
    "correctExplanation": "`__name__` is a Python built-in variable that resolves to `'__main__'` when executed directly or the module name when imported. Flask uses it as a reference point to locate the root path for folders such as `templates/` and `static/`.",
    "optionExplanations": {
      "A": "Incorrect. It has no connection to user authentication or administrative usernames.",
      "B": "Correct. Flask uses the module's name to calculate the base path for static assets and template files.",
      "C": "Incorrect. It is a required parameter for the `Flask` application constructor.",
      "D": "Incorrect. URL routes are defined using `@app.route()`, not `__name__`."
    },
    "practicalExample": "If `app = Flask(__name__)` is located in `project/app.py`, Flask knows to search for templates inside `project/templates/`."
  },
  {
    "id": "u1_26",
    "module": 1,
    "topic": "Routing Fundamentals",
    "difficulty": "Easy",
    "question": "What Python language feature is `@app.route(\"/\")` in a Flask application?",
    "codeSnippet": null,
    "options": [
      "A Python decorator used to bind a URL pattern to a view function",
      "A class inheritance declaration",
      "An asynchronous generator expression",
      "A database SQL query trigger"
    ],
    "correctAnswer": 0,
    "correctExplanation": "In Python, the `@` symbol denotes a decorator. `@app.route('/')` is a Flask decorator that registers the decorated function as the handler for incoming requests to the specified URL path.",
    "optionExplanations": {
      "A": "Correct. `@app.route()` is a function decorator that registers the view function into Flask's URL routing map.",
      "B": "Incorrect. Class inheritance in Python uses `class Child(Parent):` syntax.",
      "C": "Incorrect. Generators use `yield` keyword.",
      "D": "Incorrect. It is not an SQL trigger."
    },
    "practicalExample": "Placing `@app.route('/about')` directly above `def about():` ensures requests to `/about` execute `about()`."
  },
  {
    "id": "u1_27",
    "module": 1,
    "topic": "View Functions",
    "difficulty": "Easy",
    "question": "What is the function called that is decorated by `@app.route()` and returns the response content?",
    "codeSnippet": null,
    "options": [
      "A Middleware Kernel",
      "A View Function",
      "A Binary Serializer",
      "A Database Trigger"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Functions associated with a route in Flask are called 'view functions'. They process the incoming web request and return a response (such as an HTML string, a rendered template, or a JSON payload).",
    "optionExplanations": {
      "A": "Incorrect. Middleware sits between server and application, but individual route handlers are view functions.",
      "B": "Correct. Functions bound to URL routes are termed 'view functions' in Flask.",
      "C": "Incorrect. Serializers convert data structures, not route endpoints.",
      "D": "Incorrect. Triggers are database-level routines."
    },
    "practicalExample": "In `def home(): return 'Hello'`, `home()` is the view function for the root URL route."
  },
  {
    "id": "u1_28",
    "module": 1,
    "topic": "Server Execution",
    "difficulty": "Medium",
    "question": "What is the default port number used by Flask's built-in development server when started with `app.run()`?",
    "codeSnippet": null,
    "options": [
      "80",
      "443",
      "5000",
      "8080"
    ],
    "correctAnswer": 2,
    "correctExplanation": "By default, Flask binds its built-in development HTTP server to port 5000 (`http://127.0.0.1:5000/` or `http://localhost:5000/`).",
    "optionExplanations": {
      "A": "Incorrect. Port 80 is the standard default port for HTTP in production web servers.",
      "B": "Incorrect. Port 443 is the standard default port for secure HTTPS.",
      "C": "Correct. Port 5000 is Flask's built-in default development port.",
      "D": "Incorrect. Port 8080 is common for alternate web proxies or Tomcat, but not Flask's default."
    },
    "practicalExample": "When running `python app.py`, the terminal displays: `* Running on http://127.0.0.1:5000`."
  },
  {
    "id": "u1_29",
    "module": 1,
    "topic": "Server Execution",
    "difficulty": "Medium",
    "question": "How can you configure a Flask application to run on port 8000 and be accessible from any device on your local network?",
    "codeSnippet": null,
    "options": [
      "app.run(port=8000, host='0.0.0.0')",
      "app.run(port='all', network=True)",
      "app.run(domain='*', port=8000)",
      "app.listen(8000, ip='public')"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Setting `host='0.0.0.0'` tells the operating system to listen on all available public network interfaces (not just the local loopback `127.0.0.1`), and `port=8000` overrides the default port 5000.",
    "optionExplanations": {
      "A": "Correct. `app.run(host='0.0.0.0', port=8000)` binds to all network interfaces on port 8000.",
      "B": "Incorrect. `port='all'` and `network=True` are invalid parameters.",
      "C": "Incorrect. `domain='*'` is not a valid argument for `app.run()`.",
      "D": "Incorrect. Flask uses `app.run()`, not `app.listen()`."
    },
    "practicalExample": "Using `app.run(host='0.0.0.0', port=8000)` allows your smartphone connected to the same Wi-Fi to test the app via `http://<your-pc-ip>:8000`."
  },
  {
    "id": "u1_30",
    "module": 1,
    "topic": "Debug Mode",
    "difficulty": "Medium",
    "question": "What two critical capabilities are enabled when starting Flask with `app.run(debug=True)`?",
    "codeSnippet": null,
    "options": [
      "Automatic database backup and CSS compression",
      "Automatic code reloader on file changes and an interactive browser-based debugger with traceback inspection",
      "Disabling all HTTP security headers and bypassing user passwords",
      "Automatic conversion of Flask routes into Django models"
    ],
    "correctAnswer": 1,
    "correctExplanation": "When `debug=True`, Werkzeug's code reloader monitors project files and restarts the server immediately upon file saves, while the interactive debugger presents interactive Python consoles right in the browser when an unhandled exception occurs.",
    "optionExplanations": {
      "A": "Incorrect. Debug mode does not perform database backups or CSS minification.",
      "B": "Correct. Debug mode provides live auto-reload and an interactive in-browser debugger traceback console.",
      "C": "Incorrect. It does not bypass application authentication logic.",
      "D": "Incorrect. It has no relationship with Django."
    },
    "practicalExample": "When editing `app.py`, saving the file causes the terminal to print `* Detected change in 'app.py', reloading` without manually restarting the terminal."
  },
  {
    "id": "u1_31",
    "module": 1,
    "topic": "Debug Mode Security",
    "difficulty": "Hard",
    "question": "Why is running `debug=True` strictly forbidden in a public production environment?",
    "codeSnippet": null,
    "options": [
      "Because debug mode limits the number of database queries to 10 per day",
      "Because the interactive debugger allows arbitrary, unauthenticated Python code execution directly on the hosting server through the browser",
      "Because debug mode causes the server to consume all hard disk space within 5 minutes",
      "Because debug mode makes all CSS stylesheets black and white"
    ],
    "correctAnswer": 1,
    "correctExplanation": "In debug mode, unhandled errors expose an interactive console where anyone who accesses the page (or obtains the debugger PIN) can execute arbitrary Python commands—including reading secrets, modifying files, or deleting databases via `os.system()`.",
    "optionExplanations": {
      "A": "Incorrect. Debug mode places no limits on database queries.",
      "B": "Correct. The interactive debugger console permits Remote Code Execution (RCE) on the server, posing a catastrophic security hazard.",
      "C": "Incorrect. Debug mode does not fill hard disks in minutes.",
      "D": "Incorrect. CSS rendering is unaffected by debug mode."
    },
    "practicalExample": "An attacker triggering a 500 error on a public server with `debug=True` could run `import os; os.system('rm -rf /')` through the browser console."
  },
  {
    "id": "u1_32",
    "module": 1,
    "topic": "Python __name__ Guard",
    "difficulty": "Medium",
    "question": "What is the purpose of the conditional block `if __name__ == '__main__':` in a Flask project file?",
    "codeSnippet": "if __name__ == '__main__':\n    app.run(debug=True)",
    "options": [
      "It ensures that `app.run()` executes only when the file is run directly by Python, and NOT when imported by a WSGI production server or test suite",
      "It checks whether the user is logged in as an administrator",
      "It validates that Python version 3 is installed on the computer",
      "It creates the `templates` and `static` directories automatically"
    ],
    "correctAnswer": 0,
    "correctExplanation": "When a script is run directly (`python app.py`), Python sets `__name__` to `'__main__'`. If imported as a module by a production WSGI server (like Gunicorn: `gunicorn app:app`), `__name__` is `'app'`, preventing the built-in development server from starting inadvertently.",
    "optionExplanations": {
      "A": "Correct. Guarantees `app.run()` only triggers during direct script execution, not when imported by WSGI servers or test runners.",
      "B": "Incorrect. It has no connection to user permissions or logins.",
      "C": "Incorrect. Python version checks use `sys.version_info`.",
      "D": "Incorrect. It does not create directories."
    },
    "practicalExample": "When Gunicorn imports `app` from `app.py`, Gunicorn runs the server workers while `app.run()` inside the `if` block is safely ignored."
  },
  {
    "id": "u1_33",
    "module": 1,
    "topic": "Directory Structure",
    "difficulty": "Easy",
    "question": "By default, what must the folder containing dynamic HTML templates be named in a standard Flask project?",
    "codeSnippet": null,
    "options": [
      "html_pages/",
      "views/",
      "templates/",
      "public/"
    ],
    "correctAnswer": 2,
    "correctExplanation": "Flask's `render_template()` function searches by default in a directory named exactly `templates` located in the same directory as the application module.",
    "optionExplanations": {
      "A": "Incorrect. Flask will not look in `html_pages/` without custom configuration.",
      "B": "Incorrect. `views/` is common in Ruby on Rails or Django, but Flask expects `templates/`.",
      "C": "Correct. Flask's default template directory name is strictly `templates`.",
      "D": "Incorrect. `public/` is standard in Node.js/Laravel, not Flask."
    },
    "practicalExample": "If `app.py` calls `render_template('index.html')`, Flask searches for the file at `./templates/index.html`."
  },
  {
    "id": "u1_34",
    "module": 1,
    "topic": "Directory Structure",
    "difficulty": "Easy",
    "question": "Where should static assets such as CSS stylesheets, JavaScript files, and PNG images be placed in a standard Flask project?",
    "codeSnippet": null,
    "options": [
      "In the `static/` directory",
      "In the `templates/` directory",
      "In the `venv/` directory",
      "Directly in the root directory alongside `app.py`"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Flask automatically configures a dedicated route `/static` that maps directly to files stored in the `static/` folder of your project root.",
    "optionExplanations": {
      "A": "Correct. Flask reserves the `static/` directory for client-side assets (CSS, JS, logos).",
      "B": "Incorrect. `templates/` is reserved for Jinja2 HTML templates.",
      "C": "Incorrect. `venv/` contains isolated Python packages and executables, not your project assets.",
      "D": "Incorrect. Assets in root are not automatically served by Flask's static handler."
    },
    "practicalExample": "A file at `static/css/style.css` is served by Flask at the URL `/static/css/style.css`."
  },
  {
    "id": "u1_35",
    "module": 1,
    "topic": "Flask & MVC Pattern",
    "difficulty": "Medium",
    "question": "How does a standard Flask project map to the Model-View-Controller (MVC) architectural pattern?",
    "codeSnippet": null,
    "options": [
      "Model: Browser, View: Database, Controller: HTML",
      "Model: Database Layer (e.g. SQLAlchemy), View: Jinja2 Templates (`templates/`), Controller: Python View Functions (`app.py`)",
      "Model: CSS, View: Python, Controller: SQLite",
      "Flask cannot implement or emulate MVC patterns in any way"
    ],
    "correctAnswer": 1,
    "correctExplanation": "In Flask: Models manage data schemas and database transactions (e.g., SQLAlchemy classes); Views represent the presentation markup rendered to users (`templates/*.html`); Controllers are the Flask Python view functions handling user requests and orchestrating business logic.",
    "optionExplanations": {
      "A": "Incorrect. Completely inverted roles.",
      "B": "Correct. Model = Database entities, View = Jinja2 presentation templates, Controller = Flask view functions.",
      "C": "Incorrect. CSS is presentation styling, not data modeling.",
      "D": "Incorrect. Flask applications naturally follow or can easily be structured in MVC patterns."
    },
    "practicalExample": "In a blog app: `Post` class in `models.py` (Model), `post_detail.html` (View), and `@app.route('/post/<id>')` in `app.py` (Controller)."
  },
  {
    "id": "u1_36",
    "module": 1,
    "topic": "Routing Fundamentals",
    "difficulty": "Medium",
    "question": "What is the expected output when running this script and navigating to `http://localhost:5000/contact` in the browser?",
    "codeSnippet": "from flask import Flask\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return 'Home'\n\n@app.route('/about')\ndef about():\n    return 'About Us'",
    "options": [
      "Home",
      "About Us",
      "A 404 Not Found error page",
      "A 500 Internal Server Error page"
    ],
    "correctAnswer": 2,
    "correctExplanation": "The application only registers routes for `'/'` and `'/about'`. Because no route has been defined for `'/contact'`, Flask's routing engine cannot find a matching view function and responds with a 404 Not Found error.",
    "optionExplanations": {
      "A": "Incorrect. `'/'` maps to 'Home', not `'/contact'`.",
      "B": "Incorrect. `'/about'` maps to 'About Us'.",
      "C": "Correct. Since `/contact` is not registered in the URL map, Flask returns an HTTP 404 Not Found error.",
      "D": "Incorrect. There is no unhandled exception in server code to trigger a 500 error."
    },
    "practicalExample": "To fix this, you would add `@app.route('/contact')` with a corresponding view function."
  },
  {
    "id": "u1_37",
    "module": 1,
    "topic": "View Return Types",
    "difficulty": "Hard",
    "question": "Which of the following is NOT a valid return value directly accepted from a Flask view function without error?",
    "codeSnippet": null,
    "options": [
      "A standard Python string: `return 'Hello World'`",
      "A Python integer: `return 42`",
      "A tuple containing response and status code: `return 'Created', 201`",
      "A dictionary: `return {'status': 'success'}`"
    ],
    "correctAnswer": 1,
    "correctExplanation": "In Flask, returning a bare integer like `return 42` raises a `TypeError` (e.g. `TypeError: 'int' object is not callable` or invalid response type). Flask accepts strings, dicts (auto-jsonified in modern Flask), tuples `(body, status)`, or Response objects.",
    "optionExplanations": {
      "A": "Incorrect. Strings are valid and automatically wrapped into a 200 OK Response object.",
      "B": "Correct. Returning a plain integer is invalid in Flask and causes a TypeError crash.",
      "C": "Incorrect. Tuples of `(response, status)` are completely valid.",
      "D": "Incorrect. Returning a dictionary is valid in modern Flask (Flask 1.1+) and auto-converts to JSON."
    },
    "practicalExample": "If you want to return the number 42, return it as a string: `return str(42)` or `return jsonify(count=42)`."
  },
  {
    "id": "u1_38",
    "module": 1,
    "topic": "Werkzeug Engine",
    "difficulty": "Medium",
    "question": "What is Werkzeug's primary responsibility within the Flask architecture?",
    "codeSnippet": null,
    "options": [
      "Rendering HTML tags and computing Jinja template loops",
      "Providing the WSGI compliance layer, routing system, request/response objects, and debugging utilities",
      "Managing SQL database tables and foreign keys",
      "Compressing video and audio files uploaded to the server"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Werkzeug is a comprehensive WSGI web application library. It implements the underlying HTTP parsing, routing table (`Map` and `Rule`), request and response wrappers, and the interactive debugger used by Flask.",
    "optionExplanations": {
      "A": "Incorrect. Jinja2 handles template tags and loops.",
      "B": "Correct. Werkzeug provides WSGI primitives, URL pattern routing, and HTTP request/response parsing.",
      "C": "Incorrect. SQLAlchemy or database drivers handle SQL tables.",
      "D": "Incorrect. Werkzeug has no media compression tools."
    },
    "practicalExample": "When you inspect `app.url_map`, you are viewing a Werkzeug routing map structure."
  },
  {
    "id": "u1_39",
    "module": 1,
    "topic": "HTTP Status Codes",
    "difficulty": "Easy",
    "question": "Which HTTP status code range represents client-side errors?",
    "codeSnippet": null,
    "options": [
      "100 - 199",
      "200 - 299",
      "400 - 499",
      "500 - 599"
    ],
    "correctAnswer": 2,
    "correctExplanation": "HTTP status codes in the 4xx range represent client errors (e.g. 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 405 Method Not Allowed).",
    "optionExplanations": {
      "A": "Incorrect. 1xx codes are informational.",
      "B": "Incorrect. 2xx codes indicate success (e.g. 200 OK, 201 Created).",
      "C": "Correct. 4xx status codes signify client-originated errors.",
      "D": "Incorrect. 5xx status codes indicate server-side errors."
    },
    "practicalExample": "Sending invalid JSON in a POST request often triggers a `400 Bad Request` client error."
  },
  {
    "id": "u1_40",
    "module": 1,
    "topic": "HTTP Status Codes",
    "difficulty": "Easy",
    "question": "Which HTTP status code range represents server-side internal errors?",
    "codeSnippet": null,
    "options": [
      "200 - 299",
      "300 - 399",
      "400 - 499",
      "500 - 599"
    ],
    "correctAnswer": 3,
    "correctExplanation": "HTTP 5xx status codes signify that an error occurred on the server while attempting to process a valid request (e.g. 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable).",
    "optionExplanations": {
      "A": "Incorrect. 2xx indicates success.",
      "B": "Incorrect. 3xx indicates redirection (e.g. 301 Moved Permanently, 302 Found).",
      "C": "Incorrect. 4xx indicates client errors.",
      "D": "Correct. 5xx codes represent server-side failures and unhandled exceptions."
    },
    "practicalExample": "A database connection failure inside Flask results in a `500 Internal Server Error`."
  },
  {
    "id": "u1_41",
    "module": 1,
    "topic": "Routing Fundamentals",
    "difficulty": "Medium",
    "question": "Can multiple `@app.route()` decorators be stacked on top of a single view function in Flask?",
    "codeSnippet": "@app.route('/')\n@app.route('/home')\n@app.route('/index')\ndef home():\n    return 'Welcome!'",
    "options": [
      "No, stacking decorators causes a Python SyntaxError",
      "No, Flask only allows one URL per view function",
      "Yes, this binds multiple URLs to the exact same view function, providing aliases without duplicating code",
      "Yes, but only if the user is authenticated as an administrator"
    ],
    "correctAnswer": 2,
    "correctExplanation": "Flask explicitly supports stacking multiple `@app.route()` decorators on a single view function. This allows convenient URL aliases (such as `/`, `/home`, and `/index`) to be served by the exact same logic.",
    "optionExplanations": {
      "A": "Incorrect. Decorator stacking is standard, valid Python syntax.",
      "B": "Incorrect. Flask fully supports multiple routes per function.",
      "C": "Correct. Stacking decorators binds multiple distinct URLs to a single shared view function.",
      "D": "Incorrect. It does not require administrative authentication."
    },
    "practicalExample": "A user visiting either `localhost:5000/` or `localhost:5000/home` receives 'Welcome!'."
  },
  {
    "id": "u1_42",
    "module": 1,
    "topic": "Flask Command Line",
    "difficulty": "Medium",
    "question": "When using the `flask run` command in terminal, which environment variable tells Flask which file contains the application instance?",
    "codeSnippet": null,
    "options": [
      "FLASK_ENV",
      "FLASK_APP",
      "PYTHON_PATH",
      "FLASK_SECRET"
    ],
    "correctAnswer": 1,
    "correctExplanation": "The `FLASK_APP` environment variable specifies how to load the application (e.g. `export FLASK_APP=app.py` or `set FLASK_APP=main`).",
    "optionExplanations": {
      "A": "Incorrect. `FLASK_ENV` was historically used for environment settings (development/production) and is now deprecated in favor of `FLASK_DEBUG`.",
      "B": "Correct. `FLASK_APP` designates the entry file or module containing the application instance.",
      "C": "Incorrect. `PYTHONPATH` sets Python module search paths.",
      "D": "Incorrect. `FLASK_SECRET` is not a standard CLI detection variable."
    },
    "practicalExample": "Running `set FLASK_APP=myapp.py` and then `flask run` boots `myapp.py`."
  },
  {
    "id": "u1_43",
    "module": 1,
    "topic": "Flask Request Flow",
    "difficulty": "Medium",
    "question": "What component in Flask matches an incoming HTTP URL path to the registered view function?",
    "codeSnippet": null,
    "options": [
      "The Jinja2 template compiler",
      "The Werkzeug URL Map (`app.url_map`)",
      "The SQLite B-tree index",
      "The Browser rendering engine"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Werkzeug provides the routing system through `app.url_map`. When a request arrives, Flask checks `app.url_map` to find which endpoint rule matches the requested path.",
    "optionExplanations": {
      "A": "Incorrect. Jinja2 compiles HTML templates, not URLs.",
      "B": "Correct. Werkzeug's `app.url_map` contains all registered routing rules and resolves matching endpoints.",
      "C": "Incorrect. SQLite indexes store table data, not web routes.",
      "D": "Incorrect. The browser sends requests; it does not map server endpoints."
    },
    "practicalExample": "You can print `print(app.url_map)` in Python to see all registered rules like `Rule '/' -> home`."
  },
  {
    "id": "u1_44",
    "module": 1,
    "topic": "Client-Server Architecture",
    "difficulty": "Easy",
    "question": "Which of the following is considered a client-side web browser?",
    "codeSnippet": null,
    "options": [
      "Google Chrome",
      "Gunicorn WSGI server",
      "MySQL Database Server",
      "Flask Application Engine"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Google Chrome (along with Firefox, Safari, Edge) is a client-side web browser that renders HTML, CSS, and executes JavaScript. Gunicorn, MySQL, and Flask are server-side software.",
    "optionExplanations": {
      "A": "Correct. Google Chrome is a client-side web browser.",
      "B": "Incorrect. Gunicorn is a server-side WSGI HTTP server.",
      "C": "Incorrect. MySQL is a server-side database system.",
      "D": "Incorrect. Flask is a server-side Python framework."
    },
    "practicalExample": "The user interacts with Google Chrome, which transmits requests over HTTP to Flask running on a server."
  },
  {
    "id": "u1_45",
    "module": 1,
    "topic": "Web Protocols",
    "difficulty": "Easy",
    "question": "What does HTTP stand for?",
    "codeSnippet": null,
    "options": [
      "High Transfer Text Protocol",
      "HyperText Transfer Protocol",
      "Hyperlink Transmission Technical Platform",
      "Host Terminal Test Program"
    ],
    "correctAnswer": 1,
    "correctExplanation": "HTTP stands for HyperText Transfer Protocol. It is the application-level protocol governing communication across the World Wide Web.",
    "optionExplanations": {
      "A": "Incorrect. Incorrect wording.",
      "B": "Correct. HyperText Transfer Protocol.",
      "C": "Incorrect. Fabricated term.",
      "D": "Incorrect. Fabricated term."
    },
    "practicalExample": "HTTP defines the structure of request methods (GET, POST), headers, and status codes."
  },
  {
    "id": "u1_46",
    "module": 1,
    "topic": "Web Protocols",
    "difficulty": "Easy",
    "question": "What is the primary difference between HTTP and HTTPS?",
    "codeSnippet": null,
    "options": [
      "HTTPS encrypts communication between browser and server using SSL/TLS, preventing eavesdropping and tampering",
      "HTTPS is only used for downloading images, while HTTP is used for text",
      "HTTP works only on mobile phones, while HTTPS works only on desktops",
      "HTTP requires Python, while HTTPS requires JavaScript"
    ],
    "correctAnswer": 0,
    "correctExplanation": "HTTPS (HyperText Transfer Protocol Secure) adds SSL/TLS cryptographic encryption over standard HTTP, ensuring privacy, data integrity, and server authentication.",
    "optionExplanations": {
      "A": "Correct. HTTPS secures data in transit via SSL/TLS encryption.",
      "B": "Incorrect. Both protocols handle all data types.",
      "C": "Incorrect. Both protocols work across all network devices.",
      "D": "Incorrect. Neither protocol requires a specific programming language."
    },
    "practicalExample": "Passwords submitted over HTTPS are encrypted before leaving the browser, preventing attackers on public Wi-Fi from reading them."
  },
  {
    "id": "u1_47",
    "module": 1,
    "topic": "Flask Application Object",
    "difficulty": "Medium",
    "question": "What happens if you create a Flask application without passing `__name__`, like `app = Flask()`?",
    "codeSnippet": null,
    "options": [
      "Flask uses '__main__' automatically and never throws an error",
      "Python raises a `TypeError` because the `import_name` argument is required by the `Flask` class constructor",
      "The operating system reboots immediately",
      "Flask converts into a Django project"
    ],
    "correctAnswer": 1,
    "correctExplanation": "In Flask, the `import_name` parameter in `Flask(import_name)` is mandatory. Calling `Flask()` with no arguments raises `TypeError: Flask.__init__() missing 1 required positional argument: 'import_name'`.",
    "optionExplanations": {
      "A": "Incorrect. `import_name` has no default value and must be supplied.",
      "B": "Correct. Omitting the positional argument `import_name` causes Python to raise a `TypeError`.",
      "C": "Incorrect. No OS crash occurs.",
      "D": "Incorrect. Fabricated effect."
    },
    "practicalExample": "Always instantiate Flask as `app = Flask(__name__)`."
  },
  {
    "id": "u1_48",
    "module": 1,
    "topic": "Flask Development Server",
    "difficulty": "Medium",
    "question": "Why is the built-in server started by `app.run()` unsuitable for high-traffic production environments?",
    "codeSnippet": null,
    "options": [
      "Because it does not support HTML",
      "Because it is a single-process development server designed for testing, lacking the concurrency, worker management, and robustness of production WSGI servers like Gunicorn or uWSGI",
      "Because it automatically deletes all Python files after 100 requests",
      "Because it only runs when connected to the internet"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Flask's built-in server is designed purely for development. It cannot efficiently handle concurrent traffic, scale across multiple CPU worker processes, or withstand security attacks like slowloris, which production servers (Gunicorn, uWSGI, Nginx) handle seamlessly.",
    "optionExplanations": {
      "A": "Incorrect. It serves HTML perfectly well.",
      "B": "Correct. It lacks multi-worker process management, performance optimizations, and security hardening necessary for production traffic.",
      "C": "Incorrect. It does not delete files.",
      "D": "Incorrect. It runs offline on localhost."
    },
    "practicalExample": "In production on Linux, you run `gunicorn -w 4 app:app` instead of `python app.py`."
  },
  {
    "id": "u1_49",
    "module": 1,
    "topic": "Web Architectures",
    "difficulty": "Medium",
    "question": "In web terminology, what is a 'Round-Trip Time' (RTT)?",
    "codeSnippet": null,
    "options": [
      "The time it takes for a user to type a URL on their keyboard",
      "The duration required for an HTTP request data packet to travel from the client to the server and for the response to travel back to the client",
      "The number of times a loop executes inside `app.py`",
      "The total time to write a Flask project from start to finish"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Round-Trip Time (RTT) is the length of time in milliseconds that it takes for a network signal or HTTP packet to be sent from the client plus the time it takes for acknowledgement or response to be received back.",
    "optionExplanations": {
      "A": "Incorrect. User typing speed is not RTT.",
      "B": "Correct. RTT measures the complete network latency duration of client -> server -> client.",
      "C": "Incorrect. CPU execution loops are not RTT.",
      "D": "Incorrect. Project development duration is not RTT."
    },
    "practicalExample": "Ping tools measure RTT (e.g. `64 bytes from 127.0.0.1: time=0.8ms`)."
  },
  {
    "id": "u1_50",
    "module": 1,
    "topic": "Flask Module 1 Summary",
    "difficulty": "Hard",
    "question": "Identify the TRUE statement regarding Flask's architecture and request handling:",
    "codeSnippet": null,
    "options": [
      "Flask requires an external Apache server and cannot run locally on its own for testing",
      "Flask matches incoming URLs using Werkzeug's routing map, handles dynamic layouts via Jinja2, and remains unopinionated by allowing developers to pick their own database and form libraries",
      "Flask stores all user passwords in plain text inside `app.py` automatically",
      "Flask view functions must always be written as object-oriented classes and cannot be standalone Python functions"
    ],
    "correctAnswer": 1,
    "correctExplanation": "This accurately summarizes Module 1: Flask leverages Werkzeug for WSGI routing/HTTP handling and Jinja2 for dynamic HTML rendering, while keeping its core minimalist and unopinionated so developers can choose extensions freely.",
    "optionExplanations": {
      "A": "Incorrect. Flask has a built-in development web server (`app.run()`).",
      "B": "Correct. Flask uses Werkzeug + Jinja2 and is unopinionated regarding databases and forms.",
      "C": "Incorrect. Flask does not store passwords in plain text in `app.py`.",
      "D": "Incorrect. Flask routes typically decorate simple standalone Python functions (though MethodViews are also possible)."
    },
    "practicalExample": "A developer can build a complete web app using basic functions: `@app.route('/') def home(): return 'Hi'`."
  }
];
