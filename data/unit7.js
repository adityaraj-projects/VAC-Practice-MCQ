// Module 7: Project Work and Practical Application of Flask Concepts
// Total Questions: 50
// Auto-generated & Verified Question Bank

window.UNIT7_QUESTIONS = [
  {
    "id": "u7_01",
    "module": 7,
    "topic": "Application Factory Pattern",
    "difficulty": "Medium",
    "question": "What is the 'Application Factory Pattern' in Flask project architecture?",
    "codeSnippet": "def create_app(config_name='development'):\n    app = Flask(__name__)\n    app.config.from_object(config[config_name])\n    db.init_app(app)\n    login_manager.init_app(app)\n    app.register_blueprint(main_bp)\n    return app",
    "options": [
      "A design pattern where an application instance is constructed inside a dedicated factory function (`create_app()`), allowing multiple instances with different configurations (e.g. testing vs production) and preventing circular import problems",
      "A factory that physically manufactures computer chips for Flask servers",
      "A design pattern that eliminates the need for Python functions",
      "An automated script that submits forms without user input"
    ],
    "correctAnswer": 0,
    "correctExplanation": "The Application Factory Pattern wraps app creation inside a `create_app()` function. Instead of creating a single global `app` at module level, calling `create_app()` produces fresh instances tailored for testing, development, or production, and resolves circular imports between models, views, and extensions.",
    "optionExplanations": {
      "A": "Correct. Encapsulates app configuration and extension binding inside a reusable factory function.",
      "B": "Incorrect. Software design pattern, not hardware manufacturing.",
      "C": "Incorrect. Uses standard Python functions.",
      "D": "Incorrect. Not a bot script."
    },
    "practicalExample": "Automated test suites call `app = create_app('testing')` to test with an in-memory database without affecting development data."
  },
  {
    "id": "u7_02",
    "module": 7,
    "topic": "Circular Imports Solution",
    "difficulty": "Hard",
    "question": "How does the Application Factory Pattern solve the notorious 'Circular Import' issue in large Flask projects?",
    "codeSnippet": null,
    "options": [
      "By renaming all Python files to `.txt`",
      "By initializing extension objects (like `db = SQLAlchemy()`) globally WITHOUT passing `app`, and binding them later inside `create_app()` via `db.init_app(app)`",
      "By putting all 10,000 lines of code into a single file",
      "By disabling Python imports completely"
    ],
    "correctAnswer": 1,
    "correctExplanation": "In large projects, `models.py` needs `db`, but `app.py` needs `models.py`. Initializing extensions unattached (`db = SQLAlchemy()`) allows models to import `db` without importing `app`. Later, `create_app()` binds the extension to the active application using `db.init_app(app)`.",
    "optionExplanations": {
      "A": "Incorrect. Python files must end in `.py`.",
      "B": "Correct. Decouples extension declarations from application instantiation via `init_app()`.",
      "C": "Incorrect. Monolithic files are unmaintainable.",
      "D": "Incorrect. Python requires imports."
    },
    "practicalExample": "`extensions.py`: `db = SQLAlchemy()`. `models.py`: `from extensions import db`. `__init__.py`: `db.init_app(app)`."
  },
  {
    "id": "u7_03",
    "module": 7,
    "topic": "Configuration Management",
    "difficulty": "Medium",
    "question": "How are multiple environments (Development, Testing, Production) typically managed in a professional Flask project?",
    "codeSnippet": "class Config:\n    SECRET_KEY = os.environ.get('SECRET_KEY')\n\nclass DevelopmentConfig(Config):\n    DEBUG = True\n    SQLALCHEMY_DATABASE_URI = 'sqlite:///dev.db'\n\nclass ProductionConfig(Config):\n    DEBUG = False\n    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')",
    "options": [
      "By using inheritance with Python configuration classes inheriting from a base `Config` class",
      "By deleting and reinstalling Flask every time you switch environments",
      "By creating three separate physical computers",
      "By asking users which configuration they prefer in a popup"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Defining a base `Config` class and subclassing `DevelopmentConfig`, `TestingConfig`, and `ProductionConfig` provides clean, object-oriented configuration management that can be selected using `app.config.from_object()`.",
    "optionExplanations": {
      "A": "Correct. Class-based inheritance cleanly centralizes environment-specific settings.",
      "B": "Incorrect. Packages remain the same across environments.",
      "C": "Incorrect. Configs are software abstractions, not separate hardware.",
      "D": "Incorrect. Server configuration is invisible to client users."
    },
    "practicalExample": "`app.config.from_object(os.environ.get('FLASK_CONFIG', 'config.DevelopmentConfig'))`."
  },
  {
    "id": "u7_04",
    "module": 7,
    "topic": "Project Directory Architecture",
    "difficulty": "Easy",
    "question": "In a standard modular Flask project structure, which file serves as the entry point used to run the server?",
    "codeSnippet": "my_project/\n├── app/\n│   ├── __init__.py\n│   ├── models.py\n│   └── routes.py\n├── config.py\n└── run.py",
    "options": [
      "config.py",
      "run.py",
      "models.py",
      "requirements.txt"
    ],
    "correctAnswer": 1,
    "correctExplanation": "`run.py` sits at the project root, imports the application instance via `create_app()`, and starts the development server or exposes `app` for production WSGI servers like Gunicorn.",
    "optionExplanations": {
      "A": "Incorrect. `config.py` holds configuration classes.",
      "B": "Correct. `run.py` is the standard project execution entry point.",
      "C": "Incorrect. `models.py` contains database schema definitions.",
      "D": "Incorrect. `requirements.txt` is the dependencies manifest."
    },
    "practicalExample": "In terminal: `python run.py` or `gunicorn run:app`."
  },
  {
    "id": "u7_05",
    "module": 7,
    "topic": "Automated Testing in Flask",
    "difficulty": "Easy",
    "question": "Which Flask method generates a simulated HTTP test client for writing automated unit tests without running an actual web server?",
    "codeSnippet": "app = create_app('testing')\nclient = app._______________()",
    "options": [
      "test_client()",
      "make_browser()",
      "start_tester()",
      "create_http_client()"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`app.test_client()` creates a test client that sends simulated HTTP requests directly into Flask's WSGI interface, returning response objects without needing an active TCP network socket.",
    "optionExplanations": {
      "A": "Correct. `app.test_client()` is Flask's built-in automated testing client.",
      "B": "Incorrect. Method does not exist.",
      "C": "Incorrect. Method does not exist.",
      "D": "Incorrect. Not a Flask method."
    },
    "practicalExample": "In test file: `response = client.get('/about'); assert response.status_code == 200`."
  },
  {
    "id": "u7_06",
    "module": 7,
    "topic": "Testing HTTP Responses",
    "difficulty": "Medium",
    "question": "How do you assert that a view returned an HTTP 200 OK status code using Python's `assert` statement in a unit test?",
    "codeSnippet": "response = client.get('/')",
    "options": [
      "assert response.status_code == 200",
      "assert response.code() == 'OK'",
      "assert response.is_success is True",
      "assert response.http == 200"
    ],
    "correctAnswer": 0,
    "correctExplanation": "The response object returned by `client.get()` exposes `.status_code` as an integer. `assert response.status_code == 200` verifies the expected success code.",
    "optionExplanations": {
      "A": "Correct. `response.status_code == 200` is the standard assertion in pytest/unittest.",
      "B": "Incorrect. `status_code` is an integer property, not a function.",
      "C": "Incorrect. `is_success` is not standard on Flask response.",
      "D": "Incorrect. Not a valid property."
    },
    "practicalExample": "If a page fails, the test runner outputs `AssertionError: assert 500 == 200`, alerting developers immediately."
  },
  {
    "id": "u7_07",
    "module": 7,
    "topic": "Testing Response Data",
    "difficulty": "Medium",
    "question": "Why is `b'Welcome'` prefixed with a `b` when checking response data in `assert b'Welcome' in response.data`?",
    "codeSnippet": "response = client.get('/')\nassert b'Welcome' in response.data",
    "options": [
      "Because `b` stands for 'browser'",
      "`response.data` returns the HTTP response body as raw bytes, so the assertion string must be a byte-string literal (`b'...'`)",
      "Because `b` makes the text bold in HTML",
      "Because the test runs in binary mode"
    ],
    "correctAnswer": 1,
    "correctExplanation": "`response.data` contains the raw response payload as a Python `bytes` object. Comparing bytes requires a byte-string literal prefixed with `b` (or decoding using `response.get_data(as_text=True)`).",
    "optionExplanations": {
      "A": "Incorrect. `b` denotes bytes, not browser.",
      "B": "Correct. `response.data` is bytes; `b'...'` creates a bytes literal for type-safe comparison.",
      "C": "Incorrect. HTML bolding is `<b>`, unrelated to Python string prefixes.",
      "D": "Incorrect. Python byte comparison syntax."
    },
    "practicalExample": "Alternatively, test text directly: `assert 'Welcome' in response.get_data(as_text=True)`."
  },
  {
    "id": "u7_08",
    "module": 7,
    "topic": "Testing Form Submissions",
    "difficulty": "Medium",
    "question": "How do you test a POST form submission (e.g. login) using Flask's `test_client`?",
    "codeSnippet": null,
    "options": [
      "response = client.post('/login', data={'username': 'admin', 'password': '123'}, follow_redirects=True)",
      "response = client.submit('/login', user='admin')",
      "response = client.send_form('/login', values=['admin', '123'])",
      "response = client.upload('/login', form=True)"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`client.post(url, data=dict, follow_redirects=True)` sends form-encoded POST data and automatically follows the resulting 302 redirect so you can assert on the final landed page.",
    "optionExplanations": {
      "A": "Correct. Standard `client.post()` syntax with form data and redirect following.",
      "B": "Incorrect. Method does not exist.",
      "C": "Incorrect. Method does not exist.",
      "D": "Incorrect. Invalid syntax."
    },
    "practicalExample": "```python\nresp = client.post('/login', data={'username': 'rahul', 'password': 'secret'}, follow_redirects=True)\nassert b'Welcome, rahul' in resp.data\n```"
  },
  {
    "id": "u7_09",
    "module": 7,
    "topic": "In-Memory Test Database",
    "difficulty": "Hard",
    "question": "What database URI is commonly configured in `TestingConfig` to ensure automated tests run with maximum speed and leave zero leftover files on disk?",
    "codeSnippet": "SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'",
    "options": [
      "`sqlite:///:memory:`",
      "`mysql://localhost/test`",
      "`file:///temp.db`",
      "`ram://disk`"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`sqlite:///:memory:` creates a transient SQLite database entirely inside RAM. It is ultra-fast, created instantly in `setUp()`, and automatically destroyed when the test runner exits, preventing residual state from contaminating future test runs.",
    "optionExplanations": {
      "A": "Correct. In-memory SQLite database creates fast, isolated tests with zero disk residue.",
      "B": "Incorrect. MySQL requires active network daemons and persists data on disk.",
      "C": "Incorrect. Leaves physical temp files on disk.",
      "D": "Incorrect. Not a valid URI scheme."
    },
    "practicalExample": "Allows running 500 automated tests in 3 seconds without touching the physical hard drive."
  },
  {
    "id": "u7_10",
    "module": 7,
    "topic": "CSRF Protection with Flask-WTF",
    "difficulty": "Medium",
    "question": "Which extension provides automated Cross-Site Request Forgery (CSRF) protection for Flask forms?",
    "codeSnippet": null,
    "options": [
      "Flask-WTF (WTForms)",
      "Flask-Shield",
      "Flask-AntiHack",
      "Flask-Defender"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Flask-WTF integrates WTForms with Flask and automatically provides application-wide CSRF protection via `CSRFProtect(app)`.",
    "optionExplanations": {
      "A": "Correct. `Flask-WTF` provides built-in CSRF token generation and validation.",
      "B": "Incorrect. Not a standard extension.",
      "C": "Incorrect. Fabricated name.",
      "D": "Incorrect. Fabricated name."
    },
    "practicalExample": "Installation: `pip install flask-wtf`."
  },
  {
    "id": "u7_11",
    "module": 7,
    "topic": "CSRF Token in HTML Templates",
    "difficulty": "Medium",
    "question": "How do you include a CSRF token inside a standard HTML form when using Flask-WTF's `CSRFProtect(app)`?",
    "codeSnippet": "<form method=\"POST\" action=\"/transfer\">\n    <input type=\"hidden\" name=\"csrf_token\" value=\"{{ csrf_token() }}\">\n    ...\n</form>",
    "options": [
      "Using `<input type=\"hidden\" name=\"csrf_token\" value=\"{{ csrf_token() }}\">`",
      "Using `<meta password=\"csrf\">`",
      "By writing your user password in a comment",
      "CSRF tokens are not needed in POST forms"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Flask-WTF injects a `csrf_token()` helper into Jinja2. Placing `<input type=\"hidden\" name=\"csrf_token\" value=\"{{ csrf_token() }}\">` submits the token for server validation.",
    "optionExplanations": {
      "A": "Correct. Standard hidden input pattern transmitting the cryptographic CSRF token.",
      "B": "Incorrect. Meta tags are for headers, but forms require hidden inputs.",
      "C": "Incorrect. Passwords must never be in HTML comments.",
      "D": "Incorrect. POST forms altering state must always have CSRF defense."
    },
    "practicalExample": "If an attacker on an external site triggers a POST request to `/transfer`, Flask-WTF blocks it with `400 Bad Request: CSRF token missing`."
  },
  {
    "id": "u7_12",
    "module": 7,
    "topic": "SQL Injection Defense",
    "difficulty": "Hard",
    "question": "Why is Query A dangerous while Query B is secure against SQL Injection?",
    "codeSnippet": "# Query A:\ndb.session.execute(f\"SELECT * FROM users WHERE username = '{user_input}'\")\n\n# Query B:\nUser.query.filter_by(username=user_input).first()",
    "options": [
      "Query A is dangerous because f-strings concatenate untrusted user input directly into executable SQL syntax, whereas Query B uses SQLAlchemy's parameterized queries where input is treated strictly as literal data",
      "Query A is secure because f-strings encrypt Python code",
      "Query B is dangerous because ORMs cannot connect to databases",
      "Both queries are completely identical in security"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Direct string interpolation (`f\"... '{user_input}'\"`) allows attackers to inject malicious SQL syntax (e.g. `' OR '1'='1`). SQLAlchemy's `filter_by()` automatically uses bound parameters (`WHERE username = ?`), neutralizing injection attempts.",
    "optionExplanations": {
      "A": "Correct. Direct f-string formatting causes SQL injection; ORM parameterized queries prevent it.",
      "B": "Incorrect. F-strings perform plain string concatenation without encryption.",
      "C": "Incorrect. ORMs connect to databases safely.",
      "D": "Incorrect. Query A is critically vulnerable; Query B is secure."
    },
    "practicalExample": "If `user_input` is `admin' --`, Query A logs in without a password; Query B looks for a user literally named `admin' --`."
  },
  {
    "id": "u7_13",
    "module": 7,
    "topic": "XSS Vulnerability Defense",
    "difficulty": "Medium",
    "question": "How does Flask's default Jinja2 template engine defend applications against Cross-Site Scripting (XSS)?",
    "codeSnippet": null,
    "options": [
      "It automatically escapes characters with special HTML meaning (`<`, `>`, `&`, `'`, `\"`) in all variable expressions `{{ var }}`, unless explicitly bypassed with `|safe`",
      "It turns off the user's internet connection if script tags are detected",
      "It deletes all JavaScript files from the project",
      "It runs all client scripts through an AI firewall"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Jinja2 enables automatic contextual escaping by default on `.html` templates. Characters like `<` and `>` are converted into entity references (`&lt;` and `&gt;`), ensuring injected `<script>` tags render harmlessly as visible text.",
    "optionExplanations": {
      "A": "Correct. Automatic HTML entity encoding is Flask/Jinja2's primary XSS defense.",
      "B": "Incorrect. It does not disconnect users.",
      "C": "Incorrect. Application JS files execute normally.",
      "D": "Incorrect. Standard string entity escaping, not AI."
    },
    "practicalExample": "`<script>stealCookie()</script>` is displayed as literal text on screen rather than executing in the browser."
  },
  {
    "id": "u7_14",
    "module": 7,
    "topic": "Debugging: TemplateNotFound",
    "difficulty": "Easy",
    "question": "What is the most common cause of `jinja2.exceptions.TemplateNotFound: dashboard.html`?",
    "codeSnippet": null,
    "options": [
      "The file `dashboard.html` is missing, misspelled, or located outside the mandatory `templates/` directory (e.g. accidentally placed in project root or static folder)",
      "The client computer does not have Google Chrome installed",
      "The HTML template has more than 5 lines of code",
      "The server is missing a graphics card"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`TemplateNotFound` is raised when Jinja2 searches its registered template loaders (by default the `./templates/` folder) and cannot find a file matching that exact name. Common causes: typos, wrong directory, or case sensitivity on Linux.",
    "optionExplanations": {
      "A": "Correct. File missing, misspelled, or placed outside `templates/`.",
      "B": "Incorrect. Server-side exception independent of client browser.",
      "C": "Incorrect. Templates can have thousands of lines.",
      "D": "Incorrect. Web servers do not need dedicated graphics cards."
    },
    "practicalExample": "Move `dashboard.html` from project root into `./templates/dashboard.html`."
  },
  {
    "id": "u7_15",
    "module": 7,
    "topic": "Debugging: BadRequestKeyError",
    "difficulty": "Medium",
    "question": "A view function crashes with `werkzeug.exceptions.BadRequestKeyError: 400 Bad Request: KeyError: 'student_id'`. How should this bug be resolved?",
    "codeSnippet": "student_id = request.form['student_id']",
    "options": [
      "Replace direct indexing with `student_id = request.form.get('student_id')` and verify that the HTML form contains `<input name=\"student_id\">`",
      "Delete the Flask application and reinstall Python",
      "Change the route from POST to GET",
      "Turn off the database server"
    ],
    "correctAnswer": 0,
    "correctExplanation": "The error occurs because key `'student_id'` was not present in the POST payload. Using `.get('student_id')` prevents crashes by returning `None`, and ensuring the HTML input has `name=\"student_id\"` fixes the underlying data submission.",
    "optionExplanations": {
      "A": "Correct. Use `.get()` for safe retrieval and verify the form input's `name` attribute.",
      "B": "Incorrect. Reinstalling Python does not fix application logic bugs.",
      "C": "Incorrect. Changing to GET breaks POST form workflows.",
      "D": "Incorrect. Has nothing to do with database servers."
    },
    "practicalExample": "Always use `.get('key')` or check `if 'key' in request.form:` before accessing."
  },
  {
    "id": "u7_16",
    "module": 7,
    "topic": "Debugging: BuildError in url_for",
    "difficulty": "Medium",
    "question": "What does a `werkzeug.routing.exceptions.BuildError: Could not build url for endpoint 'profile'` mean in Flask?",
    "codeSnippet": "url = url_for('profile')",
    "options": [
      "Flask cannot compile C++ code",
      "No view function or blueprint endpoint named `'profile'` exists in the URL map (or if inside a blueprint, the namespace prefix was omitted, e.g. `'user.profile'`)",
      "The computer's hard disk is completely full",
      "The browser blocked the URL"
    ],
    "correctAnswer": 1,
    "correctExplanation": "`BuildError` occurs when `url_for(endpoint)` is passed an endpoint name that Flask does not recognize. This happens if the view function is misspelled or if the function is inside a blueprint and the blueprint prefix was omitted (`url_for('auth.profile')`).",
    "optionExplanations": {
      "A": "Incorrect. Flask does not compile C++.",
      "B": "Correct. Unknown endpoint name or missing blueprint namespace in `url_for()`.",
      "C": "Incorrect. Storage space is unrelated.",
      "D": "Incorrect. `url_for` runs entirely on the server."
    },
    "practicalExample": "If defined in blueprint `auth`: change `url_for('profile')` to `url_for('auth.profile')`."
  },
  {
    "id": "u7_17",
    "module": 7,
    "topic": "Debugging: Application Context Error",
    "difficulty": "Hard",
    "question": "When running a standalone database script, you encounter `RuntimeError: Working outside of application context`. What code fixes this error?",
    "codeSnippet": "# CRASHING CODE:\ndb.create_all()",
    "options": [
      "Wrap the call inside: `with app.app_context(): db.create_all()`",
      "Delete `app.py`",
      "Run `pip uninstall flask`",
      "Restart Windows in safe mode"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Flask-SQLAlchemy requires an active application context to access `app.config`. When running CLI commands or standalone scripts outside a web request, you must explicitly push context using `with app.app_context():`.",
    "optionExplanations": {
      "A": "Correct. Pushing `app.app_context()` provides the required application context.",
      "B": "Incorrect. Deleting source code destroys the project.",
      "C": "Incorrect. Uninstalling Flask breaks dependencies.",
      "D": "Incorrect. OS safe mode does not fix Python context management."
    },
    "practicalExample": "```python\nfrom app import create_app, db\napp = create_app()\nwith app.app_context():\n    db.create_all()\n```"
  },
  {
    "id": "u7_18",
    "module": 7,
    "topic": "Werkzeug Debugger PIN",
    "difficulty": "Medium",
    "question": "When starting a Flask application with `debug=True`, terminal displays a line like `* Debugger PIN: 123-456-789`. What is this PIN used for?",
    "codeSnippet": null,
    "options": [
      "It is a coupon code for free cloud hosting",
      "It unlocks the interactive Python debugging console in the browser when an error traceback occurs, preventing unauthorized visitors from executing arbitrary Python commands",
      "It is the user's database administrator password",
      "It is an encryption key for Wi-Fi routers"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Werkzeug's interactive debugger allows typing Python commands directly into tracebacks in the browser. The PIN is a security safeguard requiring you to enter the terminal-printed PIN before the console unlocks.",
    "optionExplanations": {
      "A": "Incorrect. Not a discount coupon.",
      "B": "Correct. Authenticates developers before opening the browser-based interactive Python execution console.",
      "C": "Incorrect. Not a database password.",
      "D": "Incorrect. Not a Wi-Fi key."
    },
    "practicalExample": "Clicking the small terminal icon on a traceback prompts for this PIN."
  },
  {
    "id": "u7_19",
    "module": 7,
    "topic": "Database Pagination Object",
    "difficulty": "Medium",
    "question": "When querying with `pagination = Student.query.paginate(page=1, per_page=10)`, which attribute contains the actual list of model objects for the current page?",
    "codeSnippet": null,
    "options": [
      "pagination.records",
      "pagination.items",
      "pagination.list",
      "pagination.data"
    ],
    "correctAnswer": 1,
    "correctExplanation": "The `Pagination` object returned by Flask-SQLAlchemy stores the list of retrieved model instances in `.items`.",
    "optionExplanations": {
      "A": "Incorrect. Attribute does not exist.",
      "B": "Correct. `pagination.items` holds the records for the current page.",
      "C": "Incorrect. Not a valid property.",
      "D": "Incorrect. Not a valid property."
    },
    "practicalExample": "In Jinja template: `{% for s in pagination.items %} <tr><td>{{ s.name }}</td></tr> {% endfor %}`."
  },
  {
    "id": "u7_20",
    "module": 7,
    "topic": "Pagination Navigation",
    "difficulty": "Easy",
    "question": "Which properties on a Flask-SQLAlchemy `Pagination` object indicate whether previous or next pages are available?",
    "codeSnippet": null,
    "options": [
      "pagination.has_prev and pagination.has_next",
      "pagination.can_back and pagination.can_forward",
      "pagination.left and pagination.right",
      "pagination.is_first and pagination.is_last"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`has_prev` evaluates to `True` if a previous page exists, and `has_next` evaluates to `True` if more pages follow. `prev_num` and `next_num` give their respective page numbers.",
    "optionExplanations": {
      "A": "Correct. `pagination.has_prev` and `pagination.has_next` are standard boolean flags.",
      "B": "Incorrect. Properties do not exist.",
      "C": "Incorrect. Not valid properties.",
      "D": "Incorrect. Not valid properties."
    },
    "practicalExample": "`{% if pagination.has_next %} <a href=\"{{ url_for('list', page=pagination.next_num) }}\">Next</a> {% endif %}`."
  },
  {
    "id": "u7_21",
    "module": 7,
    "topic": "Production Logging with File Handlers",
    "difficulty": "Hard",
    "question": "How can a deployed Flask application be configured to write log messages into rotating log files that automatically archive when reaching 1 Megabyte?",
    "codeSnippet": null,
    "options": [
      "Using `logging.handlers.RotatingFileHandler('app.log', maxBytes=1024*1024, backupCount=5)` and attaching it to `app.logger`",
      "By running a print statement in a while True loop",
      "Flask cannot write log files to disk",
      "By asking users to screenshot their screens"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Python's `logging.handlers.RotatingFileHandler` limits log file sizes (e.g. `maxBytes=1MB`). When the file fills, it rolls over to `app.log.1`, `app.log.2` up to `backupCount`, preventing log files from consuming all server disk space.",
    "optionExplanations": {
      "A": "Correct. `RotatingFileHandler` prevents server hard drive exhaustion by capping log file sizes.",
      "B": "Incorrect. Infinite loops hang the server.",
      "C": "Incorrect. Flask integrates with all Python logging handlers.",
      "D": "Incorrect. User screenshots are not automated server logs."
    },
    "practicalExample": "```python\nfile_handler = RotatingFileHandler('app.log', maxBytes=1048576, backupCount=10)\napp.logger.addHandler(file_handler)\n```"
  },
  {
    "id": "u7_22",
    "module": 7,
    "topic": "Custom Error Pages",
    "difficulty": "Easy",
    "question": "How do you render a branded, user-friendly 404 page for website visitors in Flask?",
    "codeSnippet": null,
    "options": [
      "@app.errorhandler(404)\ndef page_not_found(e):\n    return render_template('404.html'), 404",
      "@app.route('/error404')\ndef not_found():\n    return '404'",
      "def 404_handler(): return render_template('404.html')",
      "app.set_404_template('404.html')"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Decorating a view function with `@app.errorhandler(404)` intercepts all 404 events across the application and returns a rendered template with the explicit status code 404.",
    "optionExplanations": {
      "A": "Correct. Standard `@app.errorhandler(404)` implementation returning custom template and 404 status.",
      "B": "Incorrect. Only matches literal `/error404` URL.",
      "C": "Incorrect. Undecorated function and invalid identifier syntax.",
      "D": "Incorrect. Method does not exist in Flask."
    },
    "practicalExample": "Returns a styled template with search bar and home link whenever an invalid URL is typed."
  },
  {
    "id": "u7_23",
    "module": 7,
    "topic": "Custom 500 Error Handler",
    "difficulty": "Medium",
    "question": "In a custom 500 error handler, why is it recommended to rollback the database session before rendering the error template?",
    "codeSnippet": "@app.errorhandler(500)\ndef internal_server_error(e):\n    db.session.rollback()\n    return render_template('500.html'), 500",
    "options": [
      "Because 500 errors are often triggered by database transaction crashes; calling `db.session.rollback()` resets the corrupted transaction so subsequent queries can run cleanly",
      "Because rolling back deletes all users from the database",
      "Because Python crashes if `rollback()` is not called every 10 seconds",
      "It is not recommended; it causes 404 errors"
    ],
    "correctAnswer": 0,
    "correctExplanation": "An unhandled 500 exception often leaves the SQLAlchemy session in a failed, uncommitted transaction state. Calling `db.session.rollback()` in the 500 handler ensures the session is reset and healthy for subsequent requests.",
    "optionExplanations": {
      "A": "Correct. Resets corrupted database sessions caused by the runtime exception.",
      "B": "Incorrect. Rollback reverts uncommitted changes, preserving committed data.",
      "C": "Incorrect. Python does not mandate 10-second rollbacks.",
      "D": "Incorrect. It is official best practice recommended in Miguel Grinberg's Flask Web Development book."
    },
    "practicalExample": "Prevents `PendingRollbackError` from cascading into other user sessions."
  },
  {
    "id": "u7_24",
    "module": 7,
    "topic": "Environment Security: python-dotenv",
    "difficulty": "Easy",
    "question": "What is the purpose of the `python-dotenv` package in a Flask project?",
    "codeSnippet": "from dotenv import load_dotenv\nload_dotenv()",
    "options": [
      "It automatically reads key-value pairs from a local `.env` file and sets them as environment variables accessible via `os.environ`",
      "It adds decorative dots to HTML web pages",
      "It turns off the computer when an error occurs",
      "It encrypts all image files with dots"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`python-dotenv` parses `.env` files and loads environment variables into `os.environ` during local development, keeping sensitive keys out of version-controlled code.",
    "optionExplanations": {
      "A": "Correct. Standard package to load `.env` variables into `os.environ`.",
      "B": "Incorrect. Not related to visual dots.",
      "C": "Incorrect. Does not shut down hardware.",
      "D": "Incorrect. Not related to image encryption."
    },
    "practicalExample": "In `.env`: `SECRET_KEY=mysecret123`. In Python: `os.environ.get('SECRET_KEY')`."
  },
  {
    "id": "u7_25",
    "module": 7,
    "topic": "Git Ignore Best Practices",
    "difficulty": "Easy",
    "question": "Which of the following files/directories should ALWAYS be included in `.gitignore` and NEVER committed to a public Git repository?",
    "codeSnippet": null,
    "options": [
      "`.env` (containing secret keys and passwords), `venv/` (virtual environment), and `instance/` (local SQLite databases)",
      "`templates/` and `static/`",
      "`requirements.txt`",
      "`README.md`"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Committing `.env` leaks secret keys and API credentials. Committing `venv/` pollutes Git with thousands of system-specific binary files. Local databases (`instance/` or `*.db`) contain volatile test records. All three must be git-ignored.",
    "optionExplanations": {
      "A": "Correct. `.env`, `venv/`, and `*.db` must strictly be ignored in `.gitignore`.",
      "B": "Incorrect. `templates/` and `static/` are essential source code and must be committed.",
      "C": "Incorrect. `requirements.txt` must be committed for deployment builds.",
      "D": "Incorrect. `README.md` is project documentation and must be committed."
    },
    "practicalExample": "Prevents catastrophic security leaks where hackers scrape GitHub for exposed database passwords."
  },
  {
    "id": "u7_26",
    "module": 7,
    "topic": "Capstone Architecture: Student Portal",
    "difficulty": "Medium",
    "question": "In the hands-on Student Portal capstone described in the syllabus, what are the core components integrated together?",
    "codeSnippet": null,
    "options": [
      "SQLAlchemy Model (`Student`), Forms with validation, CRUD routes (List, Add, Edit, Delete), Flash feedback, and Jinja2 template inheritance",
      "Only an HTML file with no Python code",
      "A WordPress plugin with PHP scripts",
      "An iOS Swift application"
    ],
    "correctAnswer": 0,
    "correctExplanation": "The capstone project unites all course concepts: an SQLAlchemy relational model, route controllers handling GET/POST, form validation, transactional CRUD operations with flash feedback, and DRY Jinja2 templates.",
    "optionExplanations": {
      "A": "Correct. Complete integration of models, controllers, templates, and validation.",
      "B": "Incorrect. Requires Python backend and database.",
      "C": "Incorrect. Course is on Python Flask, not PHP WordPress.",
      "D": "Incorrect. Course is on web application development."
    },
    "practicalExample": "Represents the practical culmination of Modules 1 through 6."
  },
  {
    "id": "u7_27",
    "module": 7,
    "topic": "Testing JSON APIs with test_client",
    "difficulty": "Medium",
    "question": "How do you test an API endpoint that expects a JSON payload using Flask's `test_client`?",
    "codeSnippet": null,
    "options": [
      "response = client.post('/api/students', json={'name': 'Rahul', 'course': 'MCA'})",
      "response = client.post('/api/students', data='Rahul, MCA')",
      "response = client.api('/api/students', {'name': 'Rahul'})",
      "response = client.send_json('/api/students')"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Passing `json={...}` into `client.post()` automatically serializes the dictionary to a JSON string and attaches the `Content-Type: application/json` header.",
    "optionExplanations": {
      "A": "Correct. `client.post(url, json={...})` is the official helper for testing JSON APIs.",
      "B": "Incorrect. Sends raw string without JSON header.",
      "C": "Incorrect. `client.api()` does not exist.",
      "D": "Incorrect. Method does not exist."
    },
    "practicalExample": "`assert response.status_code == 201; assert response.get_json()['name'] == 'Rahul'`."
  },
  {
    "id": "u7_28",
    "module": 7,
    "topic": "pytest Fixtures in Flask",
    "difficulty": "Hard",
    "question": "What is a `pytest` fixture used for in Flask testing suites?",
    "codeSnippet": "import pytest\n\n@pytest.fixture\ndef client():\n    app = create_app('testing')\n    with app.test_client() as client:\n        with app.app_context():\n            db.create_all()\n        yield client\n        with app.app_context():\n            db.drop_all()",
    "options": [
      "It provides reusable setup and teardown test dependencies (like an initialized test client and temporary database) that are automatically injected into test functions",
      "It permanently repairs broken code",
      "It fixes database corruption on production servers",
      "It compiles Python into an executable file"
    ],
    "correctAnswer": 0,
    "correctExplanation": "A pytest fixture sets up pre-conditions (creates app, builds clean tables, returns test client) and tears them down (`yield` followed by `db.drop_all()`) cleanly between tests.",
    "optionExplanations": {
      "A": "Correct. Fixtures modularize setup and teardown state for test execution.",
      "B": "Incorrect. Fixtures set up test states; they don't rewrite code.",
      "C": "Incorrect. Runs only in automated test environments.",
      "D": "Incorrect. Not a compiler."
    },
    "practicalExample": "Any test requiring a client simply takes `def test_home(client):` as an argument."
  },
  {
    "id": "u7_29",
    "module": 7,
    "topic": "Database Concurrency & Locking",
    "difficulty": "Hard",
    "question": "Why can SQLite encounter `sqlite3.OperationalError: database is locked` under high concurrent write loads?",
    "codeSnippet": null,
    "options": [
      "SQLite locks the entire database file during write transactions, preventing other threads from writing simultaneously; client-server databases like PostgreSQL or MySQL use row-level locking to handle high concurrency",
      "Because SQLite can only be used by one person per month",
      "Because Python locks the hard drive",
      "Because the computer ran out of RAM"
    ],
    "correctAnswer": 0,
    "correctExplanation": "SQLite uses file-level locking during write operations. Under heavy concurrent writes from multiple processes, contention causes locks and timeout errors. High-concurrency production apps switch to PostgreSQL or MySQL which support fine-grained row-level locking.",
    "optionExplanations": {
      "A": "Correct. SQLite file-level write locking is a known limitation under heavy concurrent writes.",
      "B": "Incorrect. Handles many concurrent readers, but serializes writers.",
      "C": "Incorrect. Python does not lock hardware.",
      "D": "Incorrect. It is a lock contention issue, not an out-of-memory crash."
    },
    "practicalExample": "Explains why course materials recommend SQLite for prototypes and MySQL/PostgreSQL for production."
  },
  {
    "id": "u7_30",
    "module": 7,
    "topic": "Flash Messages in Real-World UX",
    "difficulty": "Easy",
    "question": "Why is it best practice to pair flash messaging with redirects rather than rendering templates directly on error?",
    "codeSnippet": "flash('Invalid credentials', 'danger')\nreturn redirect(url_for('auth.login'))",
    "options": [
      "It adheres to the Post/Redirect/Get pattern, ensuring that refreshing the page does not re-submit form data while still displaying the feedback notification",
      "Because redirects execute faster than rendering templates",
      "Because Flask cannot render templates after a flash",
      "Because flash messages only work on redirected pages"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Flash messages are stored in the session specifically so they can survive HTTP redirects. Pairing `flash()` with `redirect()` completes the Post/Redirect/Get pattern cleanly.",
    "optionExplanations": {
      "A": "Correct. Implements Post/Redirect/Get with clean session-backed user notifications.",
      "B": "Incorrect. Redirects require an extra network round-trip.",
      "C": "Incorrect. Templates can be rendered directly with flash, but refresh causes resubmission.",
      "D": "Incorrect. Flash messages are accessible in any subsequent template render."
    },
    "practicalExample": "User enters wrong password -> redirected to clean `/login` URL with red alert box displayed."
  },
  {
    "id": "u7_31",
    "module": 7,
    "topic": "UserMixin Password Property Security",
    "difficulty": "Hard",
    "question": "In a secure User model implementation, how can you prevent developers from accidentally reading the plaintext password attribute?",
    "codeSnippet": "class User(UserMixin, db.Model):\n    password_hash = db.Column(db.String(256))\n\n    @property\n    def password(self):\n        raise AttributeError('Password is not a readable attribute!')\n\n    @password.setter\n    def password(self, password):\n        self.password_hash = generate_password_hash(password)",
    "options": [
      "By implementing a write-only property using `@property` and `@password.setter`: reading `user.password` raises an `AttributeError`, while assigning `user.password = 'secret'` automatically hashes it into `password_hash`",
      "By setting the password to None",
      "By deleting the User class",
      "By using an SQLite trigger"
    ],
    "correctAnswer": 0,
    "correctExplanation": "This classic Flask security idiom (from Miguel Grinberg's Flask Web Development) creates a write-only property. Attempting to print `user.password` raises an error, while assigning a value hashes it automatically.",
    "optionExplanations": {
      "A": "Correct. Elegant Pythonic pattern enforcing write-only hashed password storage.",
      "B": "Incorrect. Overwriting with None destroys authentication credentials.",
      "C": "Incorrect. The class is necessary.",
      "D": "Incorrect. Pure Python property descriptor pattern."
    },
    "practicalExample": "`user.password = 'mypassword'` hashes behind the scenes, and `print(user.password)` crashes safely."
  },
  {
    "id": "u7_32",
    "module": 7,
    "topic": "Session Fixation Defense",
    "difficulty": "Hard",
    "question": "How does Flask-Login protect against 'Session Fixation' attacks upon user login?",
    "codeSnippet": null,
    "options": [
      "It records the user's MAC address",
      "`login_user()` automatically regenerates the session identifier upon successful authentication, preventing an attacker from pre-setting a known session ID",
      "It forces the user to solve a CAPTCHA on every request",
      "It turns off the server for 5 seconds"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Session Fixation occurs when an attacker tricks a victim into using a known session ID. When `login_user()` is called, Flask-Login migrates the session and issues a fresh session identifier.",
    "optionExplanations": {
      "A": "Incorrect. MAC addresses are not transmitted over HTTP/IP.",
      "B": "Correct. Regenerating session IDs on login neutralizes session fixation vulnerabilities.",
      "C": "Incorrect. CAPTCHAs are not invoked on every request.",
      "D": "Incorrect. No downtime occurs."
    },
    "practicalExample": "Ensures that privileges gained through authentication are tied to a newly generated session."
  },
  {
    "id": "u7_33",
    "module": 7,
    "topic": "Testing Database Seed Fixture",
    "difficulty": "Medium",
    "question": "In a unit test, why should you populate dummy records inside `setUp()` or a pytest fixture rather than testing against live production data?",
    "codeSnippet": null,
    "options": [
      "To ensure tests are isolated, repeatable, and deterministic without risking corruption or accidental deletion of live production records",
      "Because production data is encrypted with alien technology",
      "Because pytest refuses to connect to databases with more than 2 rows",
      "Because dummy data is required by the Python compiler"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Automated tests must be deterministic, isolated, and self-contained. Testing against live databases risks wiping real user accounts, sending real customer emails, and failing due to external state changes.",
    "optionExplanations": {
      "A": "Correct. Test isolation guarantees repeatability and protects live data.",
      "B": "Incorrect. Nonsense.",
      "C": "Incorrect. Pytest has no row count restrictions.",
      "D": "Incorrect. Compilers do not evaluate database contents."
    },
    "practicalExample": "Each test creates 2 dummy students, tests the view, and destroys them in `tearDown()`."
  },
  {
    "id": "u7_34",
    "module": 7,
    "topic": "HTTP Status 400 vs 422",
    "difficulty": "Medium",
    "question": "In REST API design, when might an API return HTTP 422 Unprocessable Entity instead of 400 Bad Request?",
    "codeSnippet": null,
    "options": [
      "When the JSON syntax is completely valid, but the data fails business validation rules (e.g. age is negative, or password is too short)",
      "When the database runs out of disk space",
      "When the client sends an image instead of a PDF",
      "When the server crashes completely"
    ],
    "correctAnswer": 0,
    "correctExplanation": "400 Bad Request typically indicates malformed request syntax (e.g. invalid JSON). 422 Unprocessable Entity indicates the syntax is well-formed JSON, but semantic business rules were violated.",
    "optionExplanations": {
      "A": "Correct. 422 signifies well-formed syntax that violates semantic business validation constraints.",
      "B": "Incorrect. Server storage issues trigger 500 or 507.",
      "C": "Incorrect. Mimetype issues typically trigger 415 Unsupported Media Type.",
      "D": "Incorrect. Server crashes trigger 500."
    },
    "practicalExample": "Sending `{'age': -5}` is valid JSON syntax, but fails semantic domain validation -> 422."
  },
  {
    "id": "u7_35",
    "module": 7,
    "topic": "Testing Redirect Assertions",
    "difficulty": "Medium",
    "question": "How do you test that an unauthenticated request to `/dashboard` redirects to `/login` without following the redirect automatically?",
    "codeSnippet": "response = client.get('/dashboard', follow_redirects=False)",
    "options": [
      "assert response.status_code == 302 and '/login' in response.headers['Location']",
      "assert response.status_code == 200",
      "assert response.data == 'login'",
      "assert client.is_redirected is True"
    ],
    "correctAnswer": 0,
    "correctExplanation": "With `follow_redirects=False`, the test client captures the redirect response directly. You verify that the status code is 302 and that the HTTP `Location` response header points to `/login`.",
    "optionExplanations": {
      "A": "Correct. Verifies 302 redirect code and inspects the target `Location` header.",
      "B": "Incorrect. 200 is only returned if redirects are followed or access is granted.",
      "C": "Incorrect. Response body of a 302 redirect contains minimal redirect HTML, not full page.",
      "D": "Incorrect. Not a valid client property."
    },
    "practicalExample": "```python\nresp = client.get('/dashboard', follow_redirects=False)\nassert resp.status_code == 302\nassert '/login' in resp.headers['Location']\n```"
  },
  {
    "id": "u7_36",
    "module": 7,
    "topic": "Secure Configuration Loading",
    "difficulty": "Medium",
    "question": "What is the recommended fallback pattern when loading a sensitive `SECRET_KEY` in `config.py`?",
    "codeSnippet": "SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-fallback-key-do-not-use-in-production'",
    "options": [
      "Loading from `os.environ.get('SECRET_KEY')` with a hardcoded fallback string strictly for local offline development, while raising a warning or error if the fallback is detected in production",
      "Leaving `SECRET_KEY = None` in production",
      "Using the string `'12345'` permanently everywhere",
      "Generating a new random secret key on every single HTTP request"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Using `os.environ.get('SECRET_KEY') or 'fallback'` allows team members to run the app locally without setting up environment variables, while production deployments inject a secure random key via environment variables.",
    "optionExplanations": {
      "A": "Correct. Balances local developer convenience with production security.",
      "B": "Incorrect. Setting None causes Flask sessions to crash.",
      "C": "Incorrect. Static weak keys allow attackers to forge session cookies.",
      "D": "Incorrect. Regenerating the key per request invalidates all active user sessions instantly."
    },
    "practicalExample": "In production, the hosting platform sets `SECRET_KEY=e83a9f...` in its environment settings."
  },
  {
    "id": "u7_37",
    "module": 7,
    "topic": "Database Session Context Management",
    "difficulty": "Medium",
    "question": "What happens if a view function opens an SQLAlchemy transaction, modifies records, but an unhandled exception occurs before `db.session.commit()`?",
    "codeSnippet": null,
    "options": [
      "Flask and SQLAlchemy automatically rollback uncommitted changes when the request context closes, preventing partial, corrupt data writes",
      "The data is written to disk anyway",
      "The database drops all tables",
      "The operating system crashes"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Flask-SQLAlchemy hooks into the request teardown signal. If a request ends with an unhandled exception without committing, the session is torn down and rolled back automatically, preventing partial database corruption.",
    "optionExplanations": {
      "A": "Correct. Request context teardown ensures uncommitted transactions are rolled back safely.",
      "B": "Incorrect. Uncommitted changes are not persisted.",
      "C": "Incorrect. Tables are not dropped.",
      "D": "Incorrect. OS is unaffected."
    },
    "practicalExample": "If code crashes halfway through transferring funds, the transaction is rolled back."
  },
  {
    "id": "u7_38",
    "module": 7,
    "topic": "Modular Templates Organization",
    "difficulty": "Easy",
    "question": "In a large multi-blueprint Flask application, how should template files be organized to prevent template naming collisions?",
    "codeSnippet": null,
    "options": [
      "Place templates in namespaced subfolders matching the blueprint name, e.g. `templates/auth/login.html` and `templates/students/list.html`",
      "Put all 100 templates in the root folder with numbers as names",
      "Delete all HTML files and use raw text strings",
      "Templates cannot be organized in subfolders"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Namespacing templates inside subdirectories (e.g. `templates/auth/login.html`) ensures that two blueprints containing an `index.html` file do not collide during template lookup.",
    "optionExplanations": {
      "A": "Correct. Namespacing by subfolder (`render_template('auth/login.html')`) avoids collision bugs.",
      "B": "Incorrect. Numbered flat templates are unmaintainable.",
      "C": "Incorrect. Violates separation of concerns.",
      "D": "Incorrect. Subfolders are standard in Jinja2."
    },
    "practicalExample": "`return render_template('students/index.html')` vs `return render_template('admin/index.html')`."
  },
  {
    "id": "u7_39",
    "module": 7,
    "topic": "Database Model __repr__ Debugging",
    "difficulty": "Easy",
    "question": "During interactive debugging in a Python terminal, what does this method produce?",
    "codeSnippet": "class Course(db.Model):\n    id = db.Column(db.Integer, primary_key=True)\n    code = db.Column(db.String(10))\n\n    def __repr__(self):\n        return f'<Course {self.code}>'",
    "options": [
      "`<Course 227862>` when printed",
      "An HTML web page",
      "A database migration file",
      "A JSON web token"
    ],
    "correctAnswer": 0,
    "correctExplanation": "The `__repr__` method formats how instances of `Course` are represented as strings when evaluated in terminal or logging outputs: `<Course 227862>`.",
    "optionExplanations": {
      "A": "Correct. Outputs `<Course 227862>` for fast visual debugging.",
      "B": "Incorrect. Does not generate HTML.",
      "C": "Incorrect. Not a migration script.",
      "D": "Incorrect. Not a JWT token."
    },
    "practicalExample": "Helps developers instantly identify objects in terminal and log outputs."
  },
  {
    "id": "u7_40",
    "module": 7,
    "topic": "Form Data Strip Validation",
    "difficulty": "Medium",
    "question": "Why is `name = request.form.get('name', '').strip()` considered a defensive coding best practice in form processing?",
    "codeSnippet": null,
    "options": [
      "It guarantees that `name` is always a string (never None) and removes deceptive leading/trailing whitespace before validation checks",
      "It converts text into uppercase",
      "It encrypts the name into SHA-256",
      "It automatically checks if the student is enrolled"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Passing `default=''` ensures `name` is always a string even if the key is missing. Calling `.strip()` removes whitespace so inputs containing only spaces (`'   '`) evaluate to `''`, triggering empty field validation.",
    "optionExplanations": {
      "A": "Correct. Guarantees safe string type and strips blank spaces for accurate validation.",
      "B": "Incorrect. Does not alter letter casing.",
      "C": "Incorrect. Does not perform hashing.",
      "D": "Incorrect. Does not perform database enrollment checks."
    },
    "practicalExample": "`if not name: flash('Name cannot be empty!')` reliably catches submissions containing only spacebars."
  },
  {
    "id": "u7_41",
    "module": 7,
    "topic": "Unit Testing Database Rollback",
    "difficulty": "Hard",
    "question": "In `unittest.TestCase`, what is the purpose of the `tearDown()` method when testing database models?",
    "codeSnippet": "def tearDown(self):\n    with self.app.app_context():\n        db.session.remove()\n        db.drop_all()",
    "options": [
      "To remove the scoped database session and drop all tables after each test, guaranteeing that the next test starts with a completely pristine database state",
      "To uninstall Python packages",
      "To shutdown the internet router",
      "To send test results to the university server"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`tearDown()` executes automatically after each test method. Calling `db.session.remove()` and `db.drop_all()` wipes test tables, preventing test records from leaking into subsequent test assertions.",
    "optionExplanations": {
      "A": "Correct. Guarantees test isolation and cleans up session/database state.",
      "B": "Incorrect. Packages remain installed.",
      "C": "Incorrect. Unrelated to networking hardware.",
      "D": "Incorrect. Test runners execute locally."
    },
    "practicalExample": "Ensures that creating student 'Rahul' in Test 1 does not trigger a duplicate username error in Test 2."
  },
  {
    "id": "u7_42",
    "module": 7,
    "topic": "Production Static Asset Optimization",
    "difficulty": "Medium",
    "question": "In high-traffic production environments, why is Nginx configured to serve `/static` files directly rather than letting Flask handle them?",
    "codeSnippet": "# nginx.conf\nlocation /static {\n    alias /var/www/myproject/static;\n}",
    "options": [
      "Nginx is written in C and optimized for event-driven asynchronous static file I/O; serving static files via Nginx frees up Flask Python worker processes to handle dynamic application logic",
      "Because Flask cannot display PNG images",
      "Because Python crashes if it reads CSS files",
      "Because Nginx encrypts CSS files"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Nginx uses kernel-level `sendfile` system calls to serve static assets directly from disk with near-zero CPU and memory usage, saving Python WSGI worker processes for dynamic route execution.",
    "optionExplanations": {
      "A": "Correct. Offloading static assets to Nginx dramatically improves overall system concurrency.",
      "B": "Incorrect. Flask can serve images, but it consumes worker threads unnecessarily.",
      "C": "Incorrect. Python reads CSS without issue.",
      "D": "Incorrect. Nginx does not encrypt CSS text."
    },
    "practicalExample": "Prevents 50 simultaneous CSS image requests from blocking 50 dynamic user login attempts."
  },
  {
    "id": "u7_43",
    "module": 7,
    "topic": "Database Model Inheritance",
    "difficulty": "Medium",
    "question": "How can common columns (such as `id`, `created_at`, `updated_at`) be shared across multiple SQLAlchemy models without duplicating code?",
    "codeSnippet": "class BaseModel(db.Model):\n    __abstract__ = True\n    id = db.Column(db.Integer, primary_key=True)\n    created_at = db.Column(db.DateTime, default=datetime.utcnow)\n\nclass Student(BaseModel):\n    name = db.Column(db.String(100))",
    "options": [
      "By creating an abstract base model with `__abstract__ = True` that child models inherit from",
      "By creating a single table for all entities in the universe",
      "By copy-pasting columns into 50 files",
      "SQLAlchemy does not support model inheritance"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Setting `__abstract__ = True` tells SQLAlchemy not to create a physical database table for `BaseModel`. Child classes inheriting from it inherit all defined columns cleanly, adhering to DRY principles.",
    "optionExplanations": {
      "A": "Correct. Abstract base models encapsulate shared schema columns across models.",
      "B": "Incorrect. Monolithic tables violate normalization.",
      "C": "Incorrect. Violates DRY and is error-prone.",
      "D": "Incorrect. SQLAlchemy has rich support for model inheritance."
    },
    "practicalExample": "Every model inheriting from `BaseModel` automatically has an `id` and `created_at` timestamp."
  },
  {
    "id": "u7_44",
    "module": 7,
    "topic": "Testing JSON Responses",
    "difficulty": "Medium",
    "question": "How do you extract and verify JSON data returned from an API endpoint inside a unit test?",
    "codeSnippet": "response = client.get('/api/students/1')",
    "options": [
      "data = response.get_json(); assert data['name'] == 'Rahul'",
      "data = json.load(response); assert data == 'Rahul'",
      "data = response.read_json(); assert data.name == 'Rahul'",
      "data = response.body.json"
    ],
    "correctAnswer": 0,
    "correctExplanation": "The response object from Flask's `test_client` provides `.get_json()`, which parses the JSON response payload into a Python dictionary for easy assertions.",
    "optionExplanations": {
      "A": "Correct. `response.get_json()` parses the test response body into a dictionary.",
      "B": "Incorrect. `json.load()` requires a file-like stream object.",
      "C": "Incorrect. Method does not exist.",
      "D": "Incorrect. Not standard Flask response syntax."
    },
    "practicalExample": "`assert response.status_code == 200; assert response.get_json()['course'] == 'MCA'`."
  },
  {
    "id": "u7_45",
    "module": 7,
    "topic": "Secure Password Update Workflow",
    "difficulty": "Hard",
    "question": "When allowing users to change their password on `/change-password`, what security check MUST precede updating the password hash?",
    "codeSnippet": null,
    "options": [
      "Verify that the user enters their CURRENT password correctly using `check_password_hash(current_user.password_hash, old_password)`",
      "Ask the user for their credit card number",
      "Turn on the computer webcam",
      "Delete the user's session immediately"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Before allowing a password change, applications must confirm that the person at the keyboard knows the existing password via `check_password_hash()`. This prevents an attacker who walks up to an unattended logged-in browser from locking the user out.",
    "optionExplanations": {
      "A": "Correct. Validates current password knowledge before altering authentication credentials.",
      "B": "Incorrect. Irrelevant and improper.",
      "C": "Incorrect. Privacy violation.",
      "D": "Incorrect. Sessions should only be refreshed after successful password updates."
    },
    "practicalExample": "`if not check_password_hash(current_user.password_hash, old_pwd): flash('Current password incorrect!', 'danger')`."
  },
  {
    "id": "u7_46",
    "module": 7,
    "topic": "Flask Test Request Context",
    "difficulty": "Hard",
    "question": "What is `with app.test_request_context():` used for in Flask testing and scripts?",
    "codeSnippet": null,
    "options": [
      "It creates a simulated request context, allowing you to test code that relies on `request`, `url_for()`, or `session` without actually sending an HTTP request",
      "It turns on debug mode permanently",
      "It disables all unit tests",
      "It runs the test in Google Chrome"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`app.test_request_context('/path')` pushes a fake request context onto the stack. This allows testing functions that look up `request.args` or calling `url_for()` outside an active HTTP request.",
    "optionExplanations": {
      "A": "Correct. Simulates request context for unit testing context-dependent functions like `url_for()`.",
      "B": "Incorrect. Does not affect debug configuration.",
      "C": "Incorrect. It facilitates unit testing.",
      "D": "Incorrect. Runs headlessly in Python."
    },
    "practicalExample": "Testing `url_for('about')` in a standalone script requires `with app.test_request_context(): print(url_for('about'))`."
  },
  {
    "id": "u7_47",
    "module": 7,
    "topic": "Cross-Origin API Security",
    "difficulty": "Medium",
    "question": "In a capstone project where a mobile app connects to a Flask REST API, why are cookies usually replaced with Token-Based Authentication (like JWT)?",
    "codeSnippet": null,
    "options": [
      "Mobile applications and cross-origin clients do not always share browser cookie storage seamlessly; tokens stored on the client and sent in `Authorization: Bearer <token>` headers are stateless and cross-platform",
      "Because cookies cannot be sent over Wi-Fi",
      "Because Python does not support cookies on smartphones",
      "Because tokens run 50 times faster"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Mobile clients (Android/iOS) and single-page apps (React/Flutter) are often hosted separately from the API backend. Token-based authentication (JWT) avoids cookie domain restrictions, eliminates CSRF risks, and supports stateless API scaling.",
    "optionExplanations": {
      "A": "Correct. Tokens provide flexible, stateless, cross-origin authentication for mobile and frontend clients.",
      "B": "Incorrect. Cookies travel over standard HTTP on any network.",
      "C": "Incorrect. Servers can send cookies to any client.",
      "D": "Incorrect. Performance difference is negligible."
    },
    "practicalExample": "The mobile app saves the token in secure device storage and includes it in API requests."
  },
  {
    "id": "u7_48",
    "module": 7,
    "topic": "Environment Configurations: TestingConfig",
    "difficulty": "Medium",
    "question": "Why should `TESTING = True` and `WTF_CSRF_ENABLED = False` be set inside `TestingConfig` during automated unit testing?",
    "codeSnippet": "class TestingConfig(Config):\n    TESTING = True\n    WTF_CSRF_ENABLED = False\n    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'",
    "options": [
      "`TESTING = True` enables better error propagation during tests, and disabling CSRF in test mode allows automated test clients to post forms without having to parse and scrape hidden CSRF tokens from HTML pages",
      "Because unit tests cannot run if CSRF is installed",
      "To make tests take 5 hours to run",
      "Because SQLite crashes if CSRF is enabled"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Setting `WTF_CSRF_ENABLED = False` in test suites simplifies testing form endpoints via `client.post()` without needing to extract dynamic CSRF tokens from previous GET requests, while keeping production CSRF protection fully active.",
    "optionExplanations": {
      "A": "Correct. Propagates exceptions clearly and streamlines automated form endpoint testing.",
      "B": "Incorrect. Tests can parse tokens, but it adds tedious test boilerplate.",
      "C": "Incorrect. Disabling CSRF speeds up test execution.",
      "D": "Incorrect. SQLite has no awareness of CSRF."
    },
    "practicalExample": "Allows direct testing of business logic: `client.post('/register', data={...})`."
  },
  {
    "id": "u7_49",
    "module": 7,
    "topic": "Database Transaction Isolation",
    "difficulty": "Hard",
    "question": "What happens if two concurrent Flask threads attempt to register a student with the same unique email address at the exact same instant?",
    "codeSnippet": null,
    "options": [
      "The database allows both and creates duplicate records",
      "The relational database's unique constraint enforces that one transaction commits successfully while the second transaction fails with an `IntegrityError`, which Flask must catch and rollback",
      "The computer CPU melts",
      "Both records are deleted automatically"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Relational databases enforce ACID isolation and unique constraints at the storage engine level. Even if both checks pass simultaneously in Python, the database transaction lock permits only one write to commit and rejects the second with an `IntegrityError`.",
    "optionExplanations": {
      "A": "Incorrect. Unique constraints physically prevent duplicate entries.",
      "B": "Correct. Relational ACID consistency guarantees that only one transaction succeeds while the other raises an IntegrityError.",
      "C": "Incorrect. Hardware is unaffected.",
      "D": "Incorrect. The first committed record remains intact."
    },
    "practicalExample": "Always wrap database commits in try-except with `db.session.rollback()`."
  },
  {
    "id": "u7_50",
    "module": 7,
    "topic": "Module 7 & Full Course Summary",
    "difficulty": "Hard",
    "question": "Which of the following statements comprehensively and accurately synthesizes the full curriculum of the university course (VAC 227862: Web Application Development using Flask)?",
    "codeSnippet": null,
    "options": [
      "Flask is a minimalist WSGI microframework built on Werkzeug and Jinja2; it processes HTTP client requests via URL routing and renders templates with inheritance and filters; user submissions are validated server-side from `request.form` and `request.files`; relational persistence is achieved via SQLAlchemy ORM models with `db.session` CRUD and Flask-Migrate; authentication and sessions are secured using password hashing, signed cookies, and Flask-Login with RBAC; REST APIs return JSON via `jsonify()` and modular Blueprints; and production readiness requires automated testing, secure configurations, and deployment via WSGI servers on cloud platforms",
      "Flask is a frontend JavaScript framework that only designs HTML buttons and has no backend or database capabilities",
      "Flask was designed exclusively for Windows 95 and cannot run on modern servers",
      "Flask applications must be written entirely in raw SQL strings without Python functions"
    ],
    "correctAnswer": 0,
    "correctExplanation": "This is the complete, master synthesis of all seven modules of course 227862, uniting web fundamentals, routing/templating, request handling, ORM database integration, authentication/sessions, REST APIs, and production deployment.",
    "optionExplanations": {
      "A": "Correct. Thorough, accurate, and comprehensive synthesis of the entire VAC 227862 syllabus.",
      "B": "Incorrect. Flask is a backend Python framework.",
      "C": "Incorrect. Modern framework released in 2010 running on modern cloud infrastructure.",
      "D": "Incorrect. Flask uses Python functions and SQLAlchemy ORMs."
    },
    "practicalExample": "Mastering these concepts prepares students to build production-grade web applications and excel in university examinations."
  }
];
