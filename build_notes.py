# -*- coding: utf-8 -*-
"""
Generates data/notes.js with syllabus-aligned Quick Revision Notes
for all 7 modules of VAC 227862: Web Application Development using Flask.
"""

import json

notes = {
    1: {
        "module": 1,
        "title": "Introduction to Flask and Web Development Concepts",
        "overview": "Covers web architecture fundamentals, Client-Server & 3-Tier models, HTTP protocol & status codes, Flask microframework philosophy, Werkzeug & Jinja2 origins, and building your first Flask application.",
        "definitions": [
            {"term": "Static Website", "def": "Serves pre-built fixed HTML/CSS files stored on the server directly to the browser without server-side execution."},
            {"term": "Dynamic Web App", "def": "Executes backend code (Python/Flask) and queries databases to construct real-time, user-personalized responses."},
            {"term": "Client-Server Architecture", "def": "A computing model where the Client (browser) requests services/resources and the Server (Flask) processes and returns responses."},
            {"term": "3-Tier Model", "def": "Architecture divided into Presentation Tier (Browser UI), Application Tier (Flask Server Logic), and Data Tier (Database)."},
            {"term": "WSGI", "def": "Web Server Gateway Interface (PEP 3333), the standard Python specification bridging web servers (Gunicorn) with web applications (Flask)."},
            {"term": "Microframework", "def": "A minimalist, unopinionated framework with a lightweight core providing routing and templating while leaving ORM, auth, and forms pluggable."}
        ],
        "syntaxAndDecorators": [
            {"name": "from flask import Flask", "syntax": "app = Flask(__name__)", "desc": "Instantiates the Flask application object. __name__ locates root resources."},
            {"name": "@app.route('/')", "syntax": "@app.route('/path')", "desc": "Decorator mapping a URL path to a Python view function."},
            {"name": "app.run()", "syntax": "app.run(debug=True, host='0.0.0.0', port=5000)", "desc": "Runs the local development server. Port 5000 is default; debug=True enables live auto-reloader & interactive debugger."}
        ],
        "keyDifferences": [
            {"conceptA": "Flask", "conceptB": "Django", "diff": "Flask is minimalist, unopinionated, 1-file setup, pluggable ORM; Django is monolithic, 'batteries-included' with built-in ORM, admin UI, and rigid scaffolding."},
            {"conceptA": "Frontend", "conceptB": "Backend", "diff": "Frontend executes in client browser (HTML, CSS, JS); Backend executes on server (Python, Flask, SQL)."},
            {"conceptA": "Cookies", "conceptB": "Sessions", "diff": "Cookies are stored client-side in the browser (max ~4 KB); Sessions maintain server-signed conversational state across stateless HTTP requests."}
        ],
        "commonErrorsAndFixes": [
            {"error": "RuntimeError: No application context", "cause": "Calling Flask extensions outside a request cycle", "fix": "Wrap in `with app.app_context():`"},
            {"error": "TypeError: Flask.__init__() missing argument", "cause": "Instantiating `Flask()` without `__name__`", "fix": "Always write `app = Flask(__name__)`"},
            {"error": "Port 5000 already in use (Address already in use)", "cause": "Another process or AirPlay using port 5000", "fix": "Pass custom port: `app.run(port=5001)` or `port=8000`"}
        ],
        "codeExamples": [
            {
                "title": "Minimal 'Hello World' Flask App",
                "code": "from flask import Flask\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return 'Hello, World!'\n\nif __name__ == '__main__':\n    app.run(debug=True)",
                "explanation": "Creates app instance, binds '/' to home(), and starts the development server with debug mode."
            }
        ],
        "examFacts": [
            "Flask was created by Armin Ronacher in April 2010.",
            "Flask is built upon two core libraries: Werkzeug (WSGI/routing) and Jinja2 (templating).",
            "Default Flask development port is 5000.",
            "HTTP 200 = Success, 404 = Not Found, 403 = Forbidden, 500 = Server Error.",
            "Major companies using Flask microservices: Netflix, Reddit, Lyft.",
            "NEVER run `debug=True` in production because the interactive browser debugger allows arbitrary Remote Code Execution (RCE)."
        ]
    },
    2: {
        "module": 2,
        "title": "Routing, Templating and Static Files",
        "overview": "Covers dynamic URL routing, converters, dynamic URL generation with url_for(), Jinja2 template engine, control structures, template inheritance, filters, and static asset integration.",
        "definitions": [
            {"term": "URL Routing", "def": "Mapping incoming HTTP URL paths to specific Python view functions via Werkzeug's URL Map."},
            {"term": "Dynamic Route", "def": "A route with variable sections `<variable_name>` extracted from the URL and passed to the view function."},
            {"term": "url_for()", "def": "Dynamic URL reverse-lookup function that generates URLs from endpoint (view function) names, ensuring refactoring safety."},
            {"term": "Jinja2 Engine", "def": "Flask's fast, designer-friendly dynamic templating engine that compiles templates into optimized Python bytecode."},
            {"term": "Template Inheritance", "def": "A DRY layout mechanism where child templates extend a master `base.html` and override designated `{% block %}` placeholders."},
            {"term": "Static Files", "def": "Client assets (CSS, JS, images) served directly from the `static/` directory without server-side Python execution."}
        ],
        "syntaxAndDecorators": [
            {"name": "URL Converters", "syntax": "<converter:name>", "desc": "Converters: string (default, no slashes), int (positive int), float (float), path (accepts slashes), uuid (UUIDs)."},
            {"name": "render_template", "syntax": "render_template('index.html', title='Home', **context)", "desc": "Renders an HTML template from the mandatory `templates/` folder."},
            {"name": "url_for('static')", "syntax": "{{ url_for('static', filename='css/style.css') }}", "desc": "Standard method for generating URLs to files in the `static/` folder."},
            {"name": "Jinja Delimiters", "syntax": "{{ var }} | {% statement %} | {# comment #}", "desc": "{{ }} for expressions, {% %} for control statements (if/for/extends/block), {# #} for server-side comments."}
        ],
        "keyDifferences": [
            {"conceptA": "Hardcoded URLs (`/about`)", "conceptB": "url_for('about')", "diff": "Hardcoded strings break on route renaming or sub-paths; `url_for` dynamically resolves by function name with auto-escaping."},
            {"conceptA": "{% extends %}", "conceptB": "{% include %}", "diff": "`extends` establishes parent-child layout inheritance; `include` renders and inlines an external HTML partial directly."},
            {"conceptA": "loop.index", "conceptB": "loop.index0", "diff": "`loop.index` is 1-indexed (1, 2, 3); `loop.index0` is 0-indexed (0, 1, 2)."},
            {"conceptA": "/about/", "conceptB": "/about", "diff": "Trailing slash `/about/` acts like a directory (redirects without slash); `/about` acts like a file (accessing `/about/` gives 404)."}
        ],
        "commonErrorsAndFixes": [
            {"error": "jinja2.exceptions.TemplateNotFound", "cause": "Template file missing or placed outside the `templates/` folder", "fix": "Ensure template is inside `./templates/` and filename spelling matches exactly."},
            {"error": "werkzeug.routing.BuildError", "cause": "Invalid endpoint name in `url_for()`", "fix": "Pass the Python view function name, not the URL string (e.g. `url_for('about')`, not `url_for('/about')`)."},
            {"error": "TypeError: view() got unexpected keyword argument", "cause": "Variable in `<var_name>` does not match argument in `def view(var_name):`", "fix": "Ensure route variable name exactly matches view function argument."}
        ],
        "codeExamples": [
            {
                "title": "Template Inheritance Layout",
                "code": "<!-- base.html -->\n<!DOCTYPE html>\n<html>\n<head><title>{% block title %}My Site{% endblock %}</title></head>\n<body>\n  <nav><a href=\"{{ url_for('home') }}\">Home</a></nav>\n  <main>{% block content %}{% endblock %}</main>\n</body>\n</html>\n\n<!-- child: about.html -->\n{% extends 'base.html' %}\n{% block title %}About Us{% endblock %}\n{% block content %}<h1>About Us Page</h1>{% endblock %}",
                "explanation": "Child template extends base.html and overrides title and content blocks cleanly."
            }
        ],
        "examFacts": [
            "`{{ name | upper }}` converts string to uppercase; `{{ items | length }}` returns count; `{{ val | default('N/A') }}` provides fallback.",
            "`{{ user_input | safe }}` disables auto-escaping, presenting an XSS security hazard if used on untrusted user input.",
            "`{{ super() }}` inside a child block renders the parent block's default content.",
            "Passing `_external=True` in `url_for('endpoint', _external=True)` generates an absolute URL with scheme and host.",
            "Unmatched keyword arguments in `url_for('user', name='Rahul', page=2)` become query parameters (`/user/Rahul?page=2`)."
        ]
    },
    3: {
        "module": 3,
        "title": "Forms and Request Handling",
        "overview": "Covers HTML form anatomy, HTTP methods GET vs POST, the request context object, form reading (request.form vs request.args), file uploads, secure_filename, and server-side input validation.",
        "definitions": [
            {"term": "request Object", "def": "Flask's thread-local context object containing all client HTTP transaction details (headers, form body, files, cookies)."},
            {"term": "ImmutableMultiDict", "def": "Werkzeug dictionary type used for `request.form` and `request.args` that can store multiple values per key and prevents in-place mutation."},
            {"term": "FileStorage", "def": "Werkzeug wrapper object returned by `request.files` providing helper attributes (`filename`, `content_type`, `save()`)."},
            {"term": "Server-side Validation", "def": "Input verification performed in backend Python code that cannot be bypassed by clients or developer tools."},
            {"term": "Post/Redirect/Get (PRG)", "def": "Design pattern where successful POST requests redirect (302) to a GET route, preventing duplicate form submissions on page refresh."}
        ],
        "syntaxAndDecorators": [
            {"name": "methods parameter", "syntax": "@app.route('/form', methods=['GET', 'POST'])", "desc": "Enables route to accept POST submissions; default is GET only."},
            {"name": "request.form.get()", "syntax": "val = request.form.get('field_name', default)", "desc": "Safely retrieves POST body data without raising KeyError."},
            {"name": "request.form.getlist()", "syntax": "skills = request.form.getlist('skills')", "desc": "Retrieves all checked checkboxes or multi-select options as a Python list."},
            {"name": "secure_filename()", "syntax": "from werkzeug.utils import secure_filename; name = secure_filename(file.filename)", "desc": "Strips path traversal characters (`../`) and dangerous symbols before saving uploaded files."}
        ],
        "keyDifferences": [
            {"conceptA": "HTTP GET", "conceptB": "HTTP POST", "diff": "GET appends data to URL query string, visible, length-limited, bookmarkable; POST sends data in body, hidden from URL, no size limit, not cached."},
            {"conceptA": "request.form['key']", "conceptB": "request.form.get('key')", "diff": "`['key']` raises KeyError / 400 Bad Request if missing; `.get()` returns None or default safely."},
            {"conceptA": "request.args", "conceptB": "request.form", "diff": "`request.args` parses URL query string (?q=val); `request.form` parses POST request body."},
            {"conceptA": "Client Validation", "conceptB": "Server Validation", "diff": "Client validation (HTML5/JS) provides instant UX feedback but is easily bypassed; Server validation in Python is non-negotiable for security."}
        ],
        "commonErrorsAndFixes": [
            {"error": "405 Method Not Allowed", "cause": "Sending POST to route configured only for GET", "fix": "Add `methods=['GET', 'POST']` to `@app.route()`."},
            {"error": "400 Bad Request: KeyError", "cause": "Accessing missing input via `request.form['name']`", "fix": "Use `request.form.get('name')` and verify HTML input has `name='name'`."},
            {"error": "request.files is empty", "cause": "Form missing multipart encoding", "fix": "Add `enctype='multipart/form-data'` to the HTML `<form>` tag."}
        ],
        "codeExamples": [
            {
                "title": "Secure File Upload Handler",
                "code": "from flask import Flask, request, redirect, flash\nfrom werkzeug.utils import secure_filename\nimport os\n\nALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'pdf'}\napp.config['UPLOAD_FOLDER'] = 'uploads/'\napp.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB\n\ndef allowed_file(filename):\n    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS\n\n@app.route('/upload', methods=['POST'])\ndef upload_file():\n    file = request.files.get('resume')\n    if file and file.filename != '' and allowed_file(file.filename):\n        filename = secure_filename(file.filename)\n        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))\n        flash('File uploaded successfully!', 'success')\n        return redirect('/success')\n    return 'Invalid file', 400",
                "explanation": "Validates file existence, whitelists extensions, cleans filename with secure_filename(), and saves to dedicated folder."
            }
        ],
        "examFacts": [
            "HTTP 413 Payload Too Large is returned if upload exceeds `app.config['MAX_CONTENT_LENGTH']`.",
            "Directly saving `file.filename` exposes applications to Directory Traversal attacks (e.g. `../../etc/passwd`).",
            "Radio buttons sharing the same `name` attribute form a mutually exclusive group.",
            "`request.remote_addr` captures the client's IP address.",
            "`request.values` provides a read-only combined view of both `args` and `form`."
        ]
    },
    4: {
        "module": 4,
        "title": "Flask with Database Integration",
        "overview": "Covers relational database concepts (SQLite vs MySQL), SQLAlchemy ORM architecture, model definitions, column constraints, database session CRUD operations, dirty tracking, safe transactions, and Flask-Migrate.",
        "definitions": [
            {"term": "SQLAlchemy ORM", "def": "Object-Relational Mapping library that bridges Python classes to SQL tables and class instances to table rows."},
            {"term": "db.session", "def": "The active transactional staging area for database operations, managing pending adds, flushes, commits, and rollbacks."},
            {"term": "Dirty Tracking", "def": "SQLAlchemy's automatic detection of mutated attributes on attached objects, triggering SQL UPDATE on commit without needing db.session.add()."},
            {"term": "Soft Delete", "def": "Deactivating a record via a flag (`is_active = False`) instead of issuing a destructive SQL DELETE statement."},
            {"term": "Flask-Migrate", "def": "Extension integrating Alembic to track model schema changes and generate automated database migration scripts."}
        ],
        "syntaxAndDecorators": [
            {"name": "Database URI", "syntax": "app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.db'", "desc": "SQLite relative URI (3 slashes). MySQL: `mysql+pymysql://user:pwd@host/dbname`."},
            {"name": "Model Class", "syntax": "class Student(db.Model): __tablename__ = 'students'", "desc": "Declares an ORM entity model inheriting from `db.Model`."},
            {"name": "Column Constraints", "syntax": "db.Column(db.String(100), primary_key=True, nullable=False, unique=True, default='MCA')", "desc": "Configures SQL column type and schema constraints."},
            {"name": "Table Creation", "syntax": "with app.app_context(): db.create_all()", "desc": "Creates all missing tables defined in registered db.Model classes."}
        ],
        "keyDifferences": [
            {"conceptA": "SQLite", "conceptB": "MySQL / PostgreSQL", "diff": "SQLite is serverless, file-based, zero-config, single-writer; MySQL is client-server, multi-user, supports high-concurrency row locking."},
            {"conceptA": "db.create_all()", "conceptB": "Flask-Migrate", "diff": "`db.create_all()` only creates missing tables (never updates existing columns); Flask-Migrate tracks and applies schema alterations over time."},
            {"conceptA": "filter_by()", "conceptB": "filter()", "diff": "`filter_by(attr=val)` only supports simple keyword equality; `filter(Model.age >= 18)` supports arbitrary Python expressions and SQL operators."},
            {"conceptA": "db.session.get(Model, id)", "conceptB": "Model.query.all()", "diff": "`get()` looks up a single record by primary key (or returns None); `all()` executes SELECT * returning a list."}
        ],
        "commonErrorsAndFixes": [
            {"error": "RuntimeError: Working outside of application context", "cause": "Running `db.create_all()` without active app context", "fix": "Wrap in `with app.app_context(): db.create_all()`."},
            {"error": "sqlalchemy.exc.IntegrityError", "cause": "Violating unique constraint (e.g. duplicate email) or NOT NULL", "fix": "Catch exception, call `db.session.rollback()`, and return user feedback."},
            {"error": "PendingRollbackError", "cause": "Previous query failed and `db.session.rollback()` was not called", "fix": "Always call `db.session.rollback()` in `except` blocks."}
        ],
        "codeExamples": [
            {
                "title": "Complete Safe CRUD Transaction Pattern",
                "code": "# CREATE / INSERT\nnew_student = Student(name='Rahul', email='rahul@gmail.com', course='MCA')\ntry:\n    db.session.add(new_student)\n    db.session.commit()\n    flash('Student created!', 'success')\nexcept Exception as e:\n    db.session.rollback()\n    flash('Database error: Duplicate email or constraint violation.', 'danger')\n\n# READ\nstudent = db.session.get(Student, 1)\n\n# UPDATE (No add() needed due to dirty tracking!)\nif student:\n    student.name = 'Amit Verma'\n    db.session.commit()\n\n# DELETE\nif student:\n    db.session.delete(student)\n    db.session.commit()",
                "explanation": "Demonstrates safe add/commit with rollback in try-except, dirty tracking update, and deletion."
            }
        ],
        "examFacts": [
            "Pro-Tip: You do NOT need to call `db.session.add()` when updating an existing record retrieved from the session.",
            "`app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False` disables memory-heavy event tracking.",
            "`flask db init` is run once per project; `flask db migrate -m 'msg'` generates migration scripts; `flask db upgrade` applies them.",
            "Relationships are declared with `db.relationship('ChildModel', backref='parent')`; foreign keys use `db.ForeignKey('parent_table.id')`.",
            "`Student.query.count()` executes SQL `SELECT count(*)` efficiently without loading objects into Python memory."
        ]
    },
    5: {
        "module": 5,
        "title": "User Authentication and Sessions",
        "overview": "Covers Authentication vs Authorization, password hashing with Werkzeug, signed session cookies, flash notifications, Flask-Login architecture, route protection via @login_required, and Role-Based Access Control (RBAC).",
        "definitions": [
            {"term": "Authentication (AuthN)", "def": "The process of verifying WHO a user is (e.g. username and password check)."},
            {"term": "Authorization (AuthZ)", "def": "The process of verifying WHAT an authenticated user is permitted to do (roles and permissions)."},
            {"term": "Salt", "def": "A cryptographically random string appended to passwords before hashing to defeat precomputed Rainbow Table attacks."},
            {"term": "Flask-Login", "def": "Extension managing the user session lifecycle (login, logout, remember me, current_user, login_required)."},
            {"term": "UserMixin", "def": "Flask-Login helper class providing default implementations of `is_authenticated`, `is_active`, `is_anonymous`, and `get_id()`."},
            {"term": "RBAC", "def": "Role-Based Access Control, granting access based on predefined roles (Admin, Faculty, Student)."}
        ],
        "syntaxAndDecorators": [
            {"name": "generate_password_hash", "syntax": "from werkzeug.security import generate_password_hash; hash = generate_password_hash(password)", "desc": "One-way cryptographic salting and hashing (scrypt / pbkdf2)."},
            {"name": "check_password_hash", "syntax": "from werkzeug.security import check_password_hash; valid = check_password_hash(hash, password)", "desc": "Constant-time verification of password against stored hash."},
            {"name": "@login_required", "syntax": "@app.route('/dashboard')\n@login_required\ndef dashboard():", "desc": "Restricts route access to authenticated users; redirects guests to login_view."},
            {"name": "user_loader callback", "syntax": "@login_manager.user_loader\ndef load_user(user_id):\n    return db.session.get(User, int(user_id))", "desc": "Reloads the active User object from the database using session ID on each request."}
        ],
        "keyDifferences": [
            {"conceptA": "Signed Session", "conceptB": "Encrypted Session", "diff": "Default Flask sessions are cryptographically signed with `app.secret_key` via itsdangerous: readable by client, but tampering is detected and rejected."},
            {"conceptA": "session.permanent = False", "conceptB": "session.permanent = True", "diff": "Default expires on browser window close; permanent persists until `PERMANENT_SESSION_LIFETIME` (default 31 days)."},
            {"conceptA": "HttpOnly Cookie", "conceptB": "Secure Cookie", "diff": "HttpOnly blocks client-side JS (`document.cookie`) to mitigate XSS; Secure ensures transmission strictly over encrypted HTTPS."}
        ],
        "commonErrorsAndFixes": [
            {"error": "RuntimeError: The session is unavailable because no secret key was set", "cause": "Missing `app.secret_key` configuration", "fix": "Set `app.secret_key = 'super-secret-key'`."},
            {"error": "AttributeError: 'AnonymousUserMixin' object has no attribute 'id'", "cause": "Accessing `current_user.id` on guest visitors without checking authentication", "fix": "Check `if current_user.is_authenticated:` first or add `@login_required`."},
            {"error": "Redirect Loop on Login", "cause": "Protecting the login route with `@login_required`", "fix": "Remove `@login_required` from the `/login` route itself."}
        ],
        "codeExamples": [
            {
                "title": "Complete User Login View Flow",
                "code": "from flask import render_template, request, redirect, url_for, flash\nfrom flask_login import login_user, current_user\nfrom werkzeug.security import check_password_hash\n\n@app.route('/login', methods=['GET', 'POST'])\ndef login():\n    if current_user.is_authenticated:\n        return redirect(url_for('dashboard'))\n    if request.method == 'POST':\n        username = request.form.get('username')\n        password = request.form.get('password')\n        user = User.query.filter_by(username=username).first()\n        if user and check_password_hash(user.password_hash, password):\n            login_user(user, remember=True)\n            flash('Login successful!', 'success')\n            next_page = request.args.get('next')\n            return redirect(next_page or url_for('dashboard'))\n        flash('Invalid username or password.', 'danger')\n    return render_template('login.html')",
                "explanation": "Validates credentials with check_password_hash, calls login_user(), handles post-login redirect via next param, and prevents already-logged-in users from re-authenticating."
            }
        ],
        "examFacts": [
            "Plaintext passwords must NEVER be saved in database records.",
            "Modern Werkzeug defaults to the `scrypt` hashing algorithm.",
            "Flash messages are ephemeral and removed from session after being retrieved in templates via `get_flashed_messages()`.",
            "For guest users, `current_user` evaluates to an `AnonymousUserMixin` where `is_authenticated == False`.",
            "HTTP 403 Forbidden is the standard status code when an authenticated user attempts to access an unauthorized role endpoint (e.g. non-admin visiting `/admin`)."
        ]
    },
    6: {
        "module": 6,
        "title": "RESTful APIs and Deployment",
        "overview": "Covers REST architecture principles (statelessness, resource URIs), JSON exchange via jsonify() and request.get_json(), REST status codes, API error handling, logging levels, Flask Blueprints modularity, and production WSGI deployment on Render/PythonAnywhere/Heroku.",
        "definitions": [
            {"term": "REST", "def": "Representational State Transfer (Roy Fielding, 2000), an architectural style for scalable web services using HTTP verbs and JSON payloads."},
            {"term": "Statelessness", "def": "Core REST principle where each request contains all context needed; the server does not store conversational session state between requests."},
            {"term": "Flask Blueprint", "def": "A modular component container that groups related routes, error handlers, and templates, enabling scalable project organization."},
            {"term": "WSGI Server (Gunicorn/Waitress)", "def": "A production-grade multi-worker HTTP server capable of handling concurrent requests robustly, unlike Flask's development server."},
            {"term": "Reverse Proxy (Nginx)", "def": "A high-performance server in front of WSGI workers handling SSL termination, static file delivery, and rate limiting."}
        ],
        "syntaxAndDecorators": [
            {"name": "jsonify", "syntax": "from flask import jsonify; return jsonify({'id': 1, 'name': 'Rahul'}), 201", "desc": "Serializes Python dicts/lists to JSON with Content-Type: application/json and status code."},
            {"name": "request.get_json()", "syntax": "data = request.get_json()", "desc": "Parses incoming request JSON body into a Python dictionary."},
            {"name": "Blueprint declaration", "syntax": "student_bp = Blueprint('student', __name__, url_prefix='/students')", "desc": "Declares a modular blueprint; registered via `app.register_blueprint(student_bp)`."},
            {"name": "Logging", "syntax": "import logging; logging.basicConfig(level=logging.INFO); app.logger.info('User created')", "desc": "Records application milestones, warnings, and errors for production debugging."}
        ],
        "keyDifferences": [
            {"conceptA": "HTTP 200 OK", "conceptB": "HTTP 201 Created", "diff": "200 indicates general success; 201 explicitly indicates that a new resource was created (standard response to POST)."},
            {"conceptA": "HTTP 401", "conceptB": "HTTP 403", "diff": "401 = Missing/invalid authentication credentials; 403 = Authenticated identity lacks permission/role for the requested resource."},
            {"conceptA": "Development Server", "conceptB": "Production WSGI", "diff": "Flask built-in server is single-threaded with unsafe debug PIN; Gunicorn/Waitress provide robust multi-worker concurrency and process management."},
            {"conceptA": "jsonify()", "conceptB": "json.dumps()", "diff": "`jsonify()` returns a Flask Response object with `application/json` mimetype; `json.dumps()` returns a plain string."}
        ],
        "commonErrorsAndFixes": [
            {"error": "400 Bad Request on request.get_json()", "cause": "Missing `Content-Type: application/json` header or invalid JSON syntax", "fix": "Ensure client sends valid JSON and sets Content-Type header."},
            {"error": "502 Bad Gateway (Nginx/Render)", "cause": "Gunicorn backend server crashed or failed to boot", "fix": "Check server error logs for uncaught Python boot exceptions or missing dependencies in `requirements.txt`."},
            {"error": "BuildError: Could not build url for endpoint", "cause": "Omitting blueprint namespace in `url_for()`", "fix": "Prefix endpoint with blueprint name: `url_for('student.list')`."}
        ],
        "codeExamples": [
            {
                "title": "Complete RESTful CRUD API Endpoint",
                "code": "from flask import Blueprint, jsonify, request\nfrom app import db\nfrom app.models import Student\n\napi_bp = Blueprint('api', __name__, url_prefix='/api')\n\n@api_bp.route('/students', methods=['GET'])\ndef get_students():\n    students = Student.query.all()\n    return jsonify([{'id': s.id, 'name': s.name, 'course': s.course} for s in students])\n\n@api_bp.route('/students', methods=['POST'])\ndef create_student():\n    data = request.get_json()\n    if not data or 'name' not in data:\n        return jsonify({'error': 'Name field is required'}), 400\n    student = Student(name=data['name'], course=data.get('course', 'MCA'))\n    db.session.add(student)\n    db.session.commit()\n    return jsonify({'id': student.id, 'name': student.name}), 201",
                "explanation": "Implements REST GET (list) and POST (create with 201 and validation) inside a Blueprint."
            }
        ],
        "examFacts": [
            "Logging levels hierarchy: DEBUG < INFO < WARNING < ERROR < CRITICAL.",
            "Pre-flight deployment checklist: 1) `pip freeze > requirements.txt`, 2) `debug=False`, 3) Isolate secrets in `.env`.",
            "Optimal Gunicorn worker count formula: `(2 * CPU_cores) + 1`.",
            "Procfile syntax for Heroku/Render: `web: gunicorn app:app`.",
            "Waitress is the recommended pure-Python production WSGI server for Windows systems."
        ]
    },
    7: {
        "module": 7,
        "title": "Project Work and Practical Application of Flask Concepts",
        "overview": "Synthesizes all six modules into enterprise-grade architectures: Application Factory Pattern (`create_app`), decoupled extension initialization via `init_app()`, automated testing with `app.test_client()`, CSRF and security defenses, pagination, and debugging practical issues.",
        "definitions": [
            {"term": "Application Factory", "def": "A function (`create_app()`) that instantiates and configures a Flask app, avoiding circular imports and enabling multi-environment testing."},
            {"term": "In-Memory Test DB", "def": "Using `sqlite:///:memory:` to run automated unit tests at lightning speed in RAM without leaving disk artifacts."},
            {"term": "CSRF Token", "def": "A unique cryptographic token injected into forms (`csrf_token()`) to verify requests originate from authorized users on your site."},
            {"term": "Pagination Object", "def": "Flask-SQLAlchemy helper object containing `.items` (current page list), `.pages` (total count), `.has_next`, and `.has_prev`."},
            {"term": "RotatingFileHandler", "def": "Logging handler that caps log file sizes (e.g. 1 MB) and rotates backups, preventing server hard drive exhaustion."}
        ],
        "syntaxAndDecorators": [
            {"name": "test_client", "syntax": "client = app.test_client()", "desc": "Simulates HTTP requests for unit testing without booting a network server."},
            {"name": "CSRF hidden input", "syntax": "<input type=\"hidden\" name=\"csrf_token\" value=\"{{ csrf_token() }}\">", "desc": "Protects POST forms when Flask-WTF `CSRFProtect(app)` is active."},
            {"name": "Pagination query", "syntax": "pagination = Student.query.paginate(page=1, per_page=10)", "desc": "Issues SQL LIMIT and OFFSET queries to partition large datasets."},
            {"name": "Custom Error Handler", "syntax": "@app.errorhandler(404)\ndef not_found(e):\n    return render_template('404.html'), 404", "desc": "Catches application-wide exceptions and returns branded error pages."}
        ],
        "keyDifferences": [
            {"conceptA": "create_app()", "conceptB": "app = Flask(__name__)", "diff": "Factory pattern allows spawning fresh isolated app instances with different configs (dev/test/prod); global app leads to circular import bugs in large codebases."},
            {"conceptA": "SQL Injection", "conceptB": "ORM Parameterization", "diff": "Concatenating user strings into SQL (`f\"SELECT * FROM ... {user}\"`) creates critical vulnerabilities; SQLAlchemy parameterizes all queries automatically."},
            {"conceptA": "unittest", "conceptB": "pytest", "diff": "`unittest` is Python's standard library class-based test framework; `pytest` is a modern, concise function and fixture-based test runner."}
        ],
        "commonErrorsAndFixes": [
            {"error": "Circular Import Error (ImportError / AttributeError)", "cause": "Two modules importing each other at module level (e.g. `app` importing `models` while `models` imports `app`)", "fix": "Implement Application Factory Pattern: declare `db = SQLAlchemy()` in `extensions.py` and bind via `db.init_app(app)` inside `create_app()`."},
            {"error": "400 Bad Request: CSRF token missing", "cause": "Form submitted without the CSRF token hidden input while CSRFProtect is active", "fix": "Add `{{ csrf_token() }}` to the form or set `WTF_CSRF_ENABLED = False` in TestingConfig."},
            {"error": "OperationalError: database is locked", "cause": "Multiple concurrent write transactions on SQLite", "fix": "Switch to client-server databases like PostgreSQL or MySQL in production."}
        ],
        "codeExamples": [
            {
                "title": "Complete Application Factory & Test Suite",
                "code": "# app/__init__.py\nfrom flask import Flask\nfrom app.extensions import db, login_manager\nfrom config import config\n\ndef create_app(config_name='development'):\n    app = Flask(__name__)\n    app.config.from_object(config[config_name])\n    db.init_app(app)\n    login_manager.init_app(app)\n    from app.routes import main_bp\n    app.register_blueprint(main_bp)\n    return app\n\n# tests/test_basic.py\nimport unittest\nfrom app import create_app, db\n\nclass BasicTestCase(unittest.TestCase):\n    def setUp(self):\n        self.app = create_app('testing')\n        self.client = self.app.test_client()\n        self.app_context = self.app.app_context()\n        self.app_context.push()\n        db.create_all()\n\n    def tearDown(self):\n        db.session.remove()\n        db.drop_all()\n        self.app_context.pop()\n\n    def test_home_page(self):\n        response = self.client.get('/')\n        self.assertEqual(response.status_code, 200)\n        self.assertIn(b'Welcome', response.data)",
                "explanation": "Demonstrates industrial Application Factory pattern with clean testing setup and teardown using in-memory database."
            }
        ],
        "examFacts": [
            "Setting `WTF_CSRF_ENABLED = False` in `TestingConfig` streamlines automated form testing.",
            "`assert response.status_code == 200` and `assert b'text' in response.data` are standard unit test assertions.",
            "Always include `.env`, `venv/`, and `*.db` in `.gitignore` to prevent credential leaks and repository bloat.",
            "Write-only password properties using `@property` and `@password.setter` protect user hashes from accidental reading.",
            "The Student Portal capstone integrates Models, Blueprints, Templates, Static assets, Validation, Auth, and APIs into a cohesive production application."
        ]
    }
}

def generate():
    assert len(notes) == 7
    js_content = f"// Quick Revision Notes for VAC 227862: Web Application Development using Flask\n// Comprehensive revision materials covering all 7 Modules\n\nwindow.FLASK_REVISION_NOTES = {json.dumps(notes, indent=2, ensure_ascii=False)};\n"
    with open("data/notes.js", "w", encoding="utf-8") as f:
        f.write(js_content)
    print("Successfully generated data/notes.js with comprehensive revision notes for all 7 modules.")

if __name__ == "__main__":
    generate()
