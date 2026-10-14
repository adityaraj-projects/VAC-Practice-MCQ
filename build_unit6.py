# -*- coding: utf-8 -*-
"""
Module 6 Question Bank Generator
Covers 50 validated MCQs on:
- API Concepts: Application Programming Interface, decoupling, web apps vs APIs
- REST Architecture: Representational State Transfer, Roy Fielding, statelessness, resource-oriented URLs
- CRUD mapping to HTTP Methods (GET, POST, PUT, PATCH, DELETE)
- REST HTTP Status Codes (200, 201, 204, 400, 401, 403, 404, 405, 500)
- Returning JSON: jsonify() helper, status code tuples, headers, application/json Content-Type
- Receiving JSON: request.get_json(), request.is_json, payload validation
- Error Handling in APIs: @app.errorhandler(404), abort(), structured JSON error responses
- Logging in Flask: import logging, app.logger, log levels (DEBUG, INFO, WARNING, ERROR, CRITICAL)
- Flask Blueprints: Blueprint class, modularity, url_prefix, register_blueprint(), folder structure
- Deployment vs Development Server: Gunicorn, uWSGI, Waitress, WSGI role, Nginx reverse proxy
- Pre-flight Deployment Checklist: pip freeze > requirements.txt, debug=False, environment variables (.env)
- Cloud Hosting Platforms: Render, PythonAnywhere, Heroku (Procfile, wsgi:app)
"""

import json

questions = [
    {
        "id": "u6_01",
        "module": 6,
        "topic": "API Fundamentals",
        "difficulty": "Easy",
        "question": "What does the acronym API stand for in software engineering?",
        "codeSnippet": None,
        "options": [
            "Application Programming Interface",
            "Automated Protocol Integrator",
            "Advanced Python Interpreter",
            "Application Process Index"
        ],
        "correctAnswer": 0,
        "correctExplanation": "API stands for Application Programming Interface. It defines a formal contract of endpoints, data structures, and protocols that allows two distinct software systems to communicate programmatically.",
        "optionExplanations": {
            "A": "Correct. Application Programming Interface is the official term.",
            "B": "Incorrect. Fabricated phrase.",
            "C": "Incorrect. Not related to the Python interpreter.",
            "D": "Incorrect. Fabricated term."
        },
        "practicalExample": "A mobile app communicates with a Flask backend via RESTful APIs exchanging JSON data."
    },
    {
        "id": "u6_02",
        "module": 6,
        "topic": "Web Application vs Web API",
        "difficulty": "Easy",
        "question": "What is the primary difference in output between a standard Flask web page and a Flask RESTful API endpoint?",
        "codeSnippet": None,
        "options": [
            "Web pages return rendered HTML/CSS visual documents for human browser viewing, whereas REST APIs return raw structured data (typically JSON) for consumption by client applications or mobile apps",
            "Web pages only run on Windows, while APIs only run on Mac",
            "Web pages can connect to databases, but APIs cannot",
            "There is no difference; both always return PDF files"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Traditional web routes use `render_template()` to return complete HTML documents for direct human consumption in web browsers. REST API endpoints use `jsonify()` to return structured data (such as JSON) consumed by JavaScript frontends, mobile apps, or external services.",
        "optionExplanations": {
            "A": "Correct. Web pages output styled HTML for human browsers; APIs output raw machine-readable JSON data.",
            "B": "Incorrect. Both are cross-platform web standards.",
            "C": "Incorrect. Both connect to databases identically.",
            "D": "Incorrect. PDF files are not standard default responses."
        },
        "practicalExample": "`return render_template('students.html')` vs `return jsonify(students_list)`."
    },
    {
        "id": "u6_03",
        "module": 6,
        "topic": "REST Architecture Principles",
        "difficulty": "Medium",
        "question": "What does REST stand for in web API architecture?",
        "codeSnippet": None,
        "options": [
            "Remote Execution System Transfer",
            "Representational State Transfer",
            "Relational Entity Standard Table",
            "Real-time Encrypted Socket Transmission"
        ],
        "correctAnswer": 1,
        "correctExplanation": "REST stands for Representational State Transfer, an architectural style formulated by Roy Fielding in his 2000 doctoral dissertation defining guidelines for scalable web services.",
        "optionExplanations": {
            "A": "Incorrect. Fabricated phrase.",
            "B": "Correct. Representational State Transfer.",
            "C": "Incorrect. Relational tables are database concepts.",
            "D": "Incorrect. Not a socket protocol."
        },
        "practicalExample": "RESTful services use standard HTTP verbs (GET, POST, PUT, DELETE) and resource-oriented URIs."
    },
    {
        "id": "u6_04",
        "module": 6,
        "topic": "REST Statelessness",
        "difficulty": "Medium",
        "question": "What does the principle of 'Statelessness' require in a RESTful API?",
        "codeSnippet": None,
        "options": [
            "The server must not store any data in a permanent database",
            "Every HTTP request from client to server must contain all necessary context and authentication data required to understand and process the request, with no server-side stored session context between calls",
            "The API cannot be used in more than one country",
            "All responses must be blank strings"
        ],
        "correctAnswer": 1,
        "correctExplanation": "In REST, statelessness means the server does not store client session state between requests. Every request must be self-contained (e.g. carrying an API token in the `Authorization` header), allowing any server in a cluster to handle any request.",
        "optionExplanations": {
            "A": "Incorrect. REST servers frequently use relational and NoSQL databases.",
            "B": "Correct. Each request must carry all authentication and parameter context independently.",
            "C": "Incorrect. REST APIs are globally accessible.",
            "D": "Incorrect. REST responses carry rich JSON payloads."
        },
        "practicalExample": "Instead of checking a server session cookie, a REST client sends an HTTP header: `Authorization: Bearer <jwt_token>`."
    },
    {
        "id": "u6_05",
        "module": 6,
        "topic": "RESTful Resource URIs",
        "difficulty": "Medium",
        "question": "Which of the following URL naming schemes best adheres to RESTful resource-oriented naming conventions?",
        "codeSnippet": None,
        "options": [
            "POST /getAllStudents",
            "GET /students/view?action=fetch",
            "GET /students and GET /students/101",
            "POST /doDeleteStudent101"
        ],
        "correctAnswer": 2,
        "correctExplanation": "RESTful endpoints identify resources using plural nouns (`/students`), with specific entities designated by IDs (`/students/101`). Actions (verbs) are indicated by standard HTTP methods (GET, POST, PUT, DELETE), not embedded in the URL path.",
        "optionExplanations": {
            "A": "Incorrect. Embedding verbs like `getAll` in URLs violates REST resource naming conventions.",
            "B": "Incorrect. Unnecessary query parameter actions.",
            "C": "Correct. Proper REST style uses nouns (`/students`) and relies on HTTP verbs for actions.",
            "D": "Incorrect. Deleting should use `DELETE /students/101`, not a verbose POST URL."
        },
        "practicalExample": "`GET /students` (list all), `POST /students` (create), `GET /students/1` (read one), `DELETE /students/1` (delete one)."
    },
    {
        "id": "u6_06",
        "module": 6,
        "topic": "HTTP Method to CRUD Mapping",
        "difficulty": "Easy",
        "question": "Which HTTP method corresponds to the CREATE operation in a standard RESTful API?",
        "codeSnippet": None,
        "options": [
            "GET",
            "POST",
            "PUT",
            "DELETE"
        ],
        "correctAnswer": 1,
        "correctExplanation": "In REST architectural conventions: POST creates a new subordinate resource under a collection.",
        "optionExplanations": {
            "A": "Incorrect. GET maps to READ.",
            "B": "Correct. POST maps to CREATE in CRUD.",
            "C": "Incorrect. PUT maps to UPDATE.",
            "D": "Incorrect. DELETE maps to DELETE."
        },
        "practicalExample": "Sending `POST /students` with JSON `{'name': 'Rahul'}` creates a new student resource."
    },
    {
        "id": "u6_07",
        "module": 6,
        "topic": "PUT vs PATCH",
        "difficulty": "Medium",
        "question": "What is the difference between HTTP PUT and HTTP PATCH in RESTful API updates?",
        "codeSnippet": None,
        "options": [
            "PUT replaces the entire resource representation completely, whereas PATCH applies partial modifications to specific fields",
            "PUT is only used for images, while PATCH is used for text",
            "PUT deletes data, while PATCH restores it",
            "There is no difference; they are exact aliases"
        ],
        "correctAnswer": 0,
        "correctExplanation": "PUT requires transmitting the entire resource object to replace existing data. PATCH is used for partial updates, sending only the modified fields (e.g. updating only `{'email': 'new@mail.com'}`).",
        "optionExplanations": {
            "A": "Correct. PUT = full replacement; PATCH = partial modification.",
            "B": "Incorrect. Both operate on structured data payloads.",
            "C": "Incorrect. Neither deletes data.",
            "D": "Incorrect. RFC standards define distinct semantics for PUT and PATCH."
        },
        "practicalExample": "Updating only a student's phone number without re-sending their name and email is best handled via `PATCH /students/1`."
    },
    {
        "id": "u6_08",
        "module": 6,
        "topic": "REST HTTP Status Code 201",
        "difficulty": "Easy",
        "question": "Which HTTP status code should be returned after a POST request successfully creates a new resource?",
        "codeSnippet": None,
        "options": [
            "200 OK",
            "201 Created",
            "204 No Content",
            "301 Moved Permanently"
        ],
        "correctAnswer": 1,
        "correctExplanation": "HTTP 201 Created is the specific success status code indicating that the request has succeeded and led to the creation of a new resource.",
        "optionExplanations": {
            "A": "Incorrect. 200 is standard OK, but 201 is the REST standard for successful creation.",
            "B": "Correct. 201 Created explicitly confirms creation.",
            "C": "Incorrect. 204 indicates success with no response body (common for DELETE).",
            "D": "Incorrect. 301 is a permanent redirect."
        },
        "practicalExample": "In route: `return jsonify({'id': new_s.id, 'name': new_s.name}), 201`."
    },
    {
        "id": "u6_09",
        "module": 6,
        "topic": "REST HTTP Status Code 204",
        "difficulty": "Medium",
        "question": "When an API endpoint successfully deletes a resource via `DELETE /students/1` and has no body content to return, what status code is standard?",
        "codeSnippet": None,
        "options": [
            "200 OK",
            "201 Created",
            "204 No Content",
            "404 Not Found"
        ],
        "correctAnswer": 2,
        "correctExplanation": "HTTP 204 No Content signifies that the action was executed successfully, but the server response payload is intentionally empty.",
        "optionExplanations": {
            "A": "Incorrect. 200 is used if returning a confirmation JSON object.",
            "B": "Incorrect. 201 is for creation, not deletion.",
            "C": "Correct. 204 No Content is the standard status code when no body is returned after deletion.",
            "D": "Incorrect. 404 indicates the resource did not exist."
        },
        "practicalExample": "`return ('', 204)` after `db.session.delete(student); db.session.commit()`."
    },
    {
        "id": "u6_10",
        "module": 6,
        "topic": "REST HTTP Status Code 400",
        "difficulty": "Easy",
        "question": "What does an HTTP 400 status code mean when interacting with an API?",
        "codeSnippet": None,
        "options": [
            "Bad Request: The client sent an invalid, malformed payload or omitted mandatory fields",
            "Unauthorized: The client provided invalid passwords",
            "Internal Server Error: The Python database driver crashed",
            "Service Unavailable: The server is down for maintenance"
        ],
        "correctAnswer": 0,
        "correctExplanation": "HTTP 400 Bad Request indicates that the server cannot process the request due to client error (e.g. malformed JSON syntax, invalid data types, or missing required payload parameters).",
        "optionExplanations": {
            "A": "Correct. 400 Bad Request indicates client-side payload or syntax validation errors.",
            "B": "Incorrect. Authentication failure is 401 Unauthorized.",
            "C": "Incorrect. Server crash is 500 Internal Server Error.",
            "D": "Incorrect. Maintenance is 503 Service Unavailable."
        },
        "practicalExample": "`if not data or 'name' not in data: return jsonify({'error': 'name required'}), 400`."
    },
    {
        "id": "u6_11",
        "module": 6,
        "topic": "HTTP Status 401 vs 403",
        "difficulty": "Medium",
        "question": "What is the technical distinction between HTTP 401 Unauthorized and HTTP 403 Forbidden in API design?",
        "codeSnippet": None,
        "options": [
            "401 means Authentication is missing or invalid (unauthenticated); 403 means the identity is known, but that user lacks Permission to access the resource (unauthorized)",
            "401 is for GET requests, while 403 is for POST requests",
            "401 means the database is full; 403 means the hard drive is full",
            "There is no difference; servers choose randomly between them"
        ],
        "correctAnswer": 0,
        "correctExplanation": "401 indicates that the client has not provided valid authentication credentials (e.g. missing API token). 403 indicates the server knows who the client is, but refuses authorization because the client lacks sufficient permission/role.",
        "optionExplanations": {
            "A": "Correct. 401 = Not Authenticated; 403 = Authenticated but Not Authorized (Permission Denied).",
            "B": "Incorrect. Both apply across all HTTP methods.",
            "C": "Incorrect. Not related to storage space.",
            "D": "Incorrect. RFC HTTP standards strictly define both codes."
        },
        "practicalExample": "Visiting `/api/admin` with no token -> 401. Visiting `/api/admin` with a student token -> 403."
    },
    {
        "id": "u6_12",
        "module": 6,
        "topic": "jsonify() Helper",
        "difficulty": "Easy",
        "question": "Which Flask function converts Python dictionaries and lists into a JSON response with the appropriate `Content-Type: application/json` header?",
        "codeSnippet": None,
        "options": [
            "json.dumps()",
            "jsonify()",
            "make_json()",
            "response.json()"
        ],
        "correctAnswer": 1,
        "correctExplanation": "`from flask import jsonify` imports Flask's JSON response helper. It serializes Python data structures and constructs a `Response` object with `mimetype='application/json'`.",
        "optionExplanations": {
            "A": "Incorrect. `json.dumps()` only returns a raw Python string with `text/html` header unless wrapped.",
            "B": "Correct. `jsonify()` serializes data and attaches the `application/json` header automatically.",
            "C": "Incorrect. Function does not exist.",
            "D": "Incorrect. Not a Flask function."
        },
        "practicalExample": "`return jsonify({'status': 'success', 'data': data})`."
    },
    {
        "id": "u6_13",
        "module": 6,
        "topic": "Status Code Tuples",
        "difficulty": "Easy",
        "question": "How do you return both a JSON payload and an explicit HTTP status code of 201 from a Flask view function?",
        "codeSnippet": None,
        "options": [
            "return jsonify(data), 201",
            "return 201, jsonify(data)",
            "return jsonify(data).status(201)",
            "return make_json(data, code=201)"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Flask view functions can return a tuple where the first element is the body/response object and the second element is the integer HTTP status code: `return jsonify(data), 201`.",
        "optionExplanations": {
            "A": "Correct. `return jsonify(data), 201` is standard Flask tuple syntax.",
            "B": "Incorrect. Status code must be the second tuple element, not first.",
            "C": "Incorrect. `jsonify` does not have a `.status()` method.",
            "D": "Incorrect. `make_json` does not exist."
        },
        "practicalExample": "`return jsonify({'message': 'Created'}), 201`."
    },
    {
        "id": "u6_14",
        "module": 6,
        "topic": "Receiving JSON Data",
        "difficulty": "Easy",
        "question": "Which method on Flask's `request` object parses an incoming JSON payload into a Python dictionary or list?",
        "codeSnippet": None,
        "options": [
            "request.get_json()",
            "request.form.to_json()",
            "request.read_json()",
            "json.load(request)"
        ],
        "correctAnswer": 0,
        "correctExplanation": "`request.get_json()` inspects the request body, parses the JSON string, and returns the resulting Python dictionary or list.",
        "optionExplanations": {
            "A": "Correct. `request.get_json()` is the official method for parsing JSON bodies.",
            "B": "Incorrect. `request.form` is for form-encoded data, not JSON.",
            "C": "Incorrect. Method does not exist.",
            "D": "Incorrect. `request` is a proxy object, not a direct file stream for `json.load()`."
        },
        "practicalExample": "`data = request.get_json(); name = data.get('name')`."
    },
    {
        "id": "u6_15",
        "module": 6,
        "topic": "request.get_json() Validation",
        "difficulty": "Medium",
        "question": "What happens if a client sends invalid JSON syntax (e.g. missing closing bracket) and your route calls `request.get_json()`?",
        "codeSnippet": None,
        "options": [
            "Flask ignores the error and returns an empty list",
            "Flask automatically raises a `400 Bad Request` error and aborts the request",
            "The operating system reboots",
            "Flask converts the malformed string into an HTML page"
        ],
        "correctAnswer": 1,
        "correctExplanation": "When `request.get_json()` encounters invalid JSON syntax or a missing/incorrect `Content-Type` header, it raises a `BadRequest` exception, which Flask translates into an automatic HTTP 400 Bad Request response.",
        "optionExplanations": {
            "A": "Incorrect. It does not fail silently unless `silent=True` is explicitly passed.",
            "B": "Correct. Automatically aborts with HTTP 400 Bad Request on syntax parsing failures.",
            "C": "Incorrect. No OS crash occurs.",
            "D": "Incorrect. Malformed JSON cannot be parsed."
        },
        "practicalExample": "Using `request.get_json(silent=True)` will return `None` instead of raising an error if you want manual handling."
    },
    {
        "id": "u6_16",
        "module": 6,
        "topic": "Validating Required JSON Fields",
        "difficulty": "Medium",
        "question": "Examine this API route snippet from course slides:\nWhat is the purpose of the conditional check `if not data or 'name' not in data:`?",
        "codeSnippet": "@app.route('/students', methods=['POST'])\ndef add_student():\n    data = request.get_json()\n    if not data or 'name' not in data:\n        return jsonify({'error': 'Name is required'}), 400\n    return jsonify({'message': 'Added'}), 201",
        "options": [
            "It turns off the database server",
            "It validates that a JSON body was supplied and contains the mandatory `'name'` key, returning a 400 error if missing",
            "It checks whether the user has administrator privileges",
            "It translates the name into uppercase"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Defensive API programming requires validating payloads before accessing keys. If `data` is None (no JSON sent) or `'name'` is omitted, returning a structured JSON error with status 400 prevents Python `KeyError` crashes.",
        "optionExplanations": {
            "A": "Incorrect. It does not affect database servers.",
            "B": "Correct. Verifies required payload fields and provides descriptive error responses.",
            "C": "Incorrect. Authorization is checked via auth tokens or decorators.",
            "D": "Incorrect. It does not perform string casing changes."
        },
        "practicalExample": "Prevents crashes when clients send `{}` or non-JSON payloads."
    },
    {
        "id": "u6_17",
        "module": 6,
        "topic": "API Error Handlers",
        "difficulty": "Medium",
        "question": "How do you register a global 404 error handler in Flask that returns a clean JSON error response instead of standard HTML?",
        "codeSnippet": None,
        "options": [
            "@app.errorhandler(404)\ndef not_found(error):\n    return jsonify({'error': 'Resource not found'}), 404",
            "@app.route('/404')\ndef handle_404():\n    return 'error'",
            "app.set_error(404, 'json')",
            "def 404(): return jsonify()"
        ],
        "correctAnswer": 0,
        "correctExplanation": "`@app.errorhandler(404)` intercepts 404 events globally across the application. Returning `jsonify({'error': '...'}), 404` ensures API clients receive structured JSON rather than an unexpected HTML error page.",
        "optionExplanations": {
            "A": "Correct. Standard `@app.errorhandler(status_code)` syntax returning JSON.",
            "B": "Incorrect. `@app.route('/404')` only matches the literal URL `/404`.",
            "C": "Incorrect. Method does not exist.",
            "D": "Incorrect. Function names cannot start with numbers in Python."
        },
        "practicalExample": "Essential for APIs so client mobile apps don't crash when parsing unexpected HTML error pages."
    },
    {
        "id": "u6_18",
        "module": 6,
        "topic": "abort() Function",
        "difficulty": "Easy",
        "question": "Which Flask function immediately halts view execution and raises an HTTP error response (e.g. 404 or 403)?",
        "codeSnippet": "from flask import abort\n\nstudent = db.session.get(Student, student_id)\nif not student:\n    abort(404)",
        "options": [
            "abort()",
            "cancel()",
            "terminate()",
            "halt()"
        ],
        "correctAnswer": 0,
        "correctExplanation": "`abort(status_code)` raises an `HTTPException` immediately, halting view function execution and triggering the registered error handler for that status code.",
        "optionExplanations": {
            "A": "Correct. `from flask import abort` is the standard control flow interrupt.",
            "B": "Incorrect. Not a Flask function.",
            "C": "Incorrect. Not a Flask function.",
            "D": "Incorrect. Not a Flask function."
        },
        "practicalExample": "`if student is None: abort(404)` automatically emits a 404 response."
    },
    {
        "id": "u6_19",
        "module": 6,
        "topic": "Flask Logging",
        "difficulty": "Easy",
        "question": "Why is application logging crucial after deploying a Flask application to production?",
        "codeSnippet": None,
        "options": [
            "Because browsers refuse to display websites without log files",
            "Because in production, `debug=True` is disabled and tracebacks are hidden from users; logs record warnings, errors, and system events to disk for diagnostic debugging",
            "Because logs automatically increase server CPU speed",
            "Because logs delete old database records"
        ],
        "correctAnswer": 1,
        "correctExplanation": "In production, error messages must never be displayed to users for security reasons. Logging records diagnostic information, warnings, and crash stack traces to secure log files so developers can inspect and fix issues post-deployment.",
        "optionExplanations": {
            "A": "Incorrect. Browsers have no access to server logs.",
            "B": "Correct. Logs provide essential audit trails and post-mortem debugging data when live errors occur.",
            "C": "Incorrect. Logs have no impact on hardware clock speeds.",
            "D": "Incorrect. Logs do not delete database records."
        },
        "practicalExample": "When a customer reports an unexpected 500 error, developers check the server log to read the exact Python traceback."
    },
    {
        "id": "u6_20",
        "module": 6,
        "topic": "Logging Severity Levels",
        "difficulty": "Medium",
        "question": "What is the standard order of Python logging levels from lowest to highest severity?",
        "codeSnippet": None,
        "options": [
            "DEBUG < INFO < WARNING < ERROR < CRITICAL",
            "INFO < DEBUG < ERROR < WARNING < CRITICAL",
            "WARNING < ERROR < CRITICAL < DEBUG < INFO",
            "CRITICAL < ERROR < WARNING < INFO < DEBUG"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Python's standard `logging` hierarchy is: DEBUG (detailed diagnostics) < INFO (normal milestones) < WARNING (unexpected indicators) < ERROR (runtime failure) < CRITICAL (system crash).",
        "optionExplanations": {
            "A": "Correct. Standard severity hierarchy in Python's `logging` module.",
            "B": "Incorrect. DEBUG is lower severity than INFO.",
            "C": "Incorrect. Inverted order.",
            "D": "Incorrect. Completely backwards."
        },
        "practicalExample": "Setting `level=logging.INFO` silences granular DEBUG messages while capturing INFO, WARNING, ERROR, and CRITICAL."
    },
    {
        "id": "u6_21",
        "module": 6,
        "topic": "app.logger Usage",
        "difficulty": "Easy",
        "question": "How do you log an informational message in Flask using the application's built-in logger?",
        "codeSnippet": None,
        "options": [
            "app.logger.info('Student added successfully')",
            "print_log('Student added successfully')",
            "console.log('Student added successfully')",
            "flask.write_log('Student added successfully')"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Flask provides `app.logger`, a standard Python `logging.Logger` instance pre-configured with the application's name. You record logs using `app.logger.info()`, `app.logger.error()`, etc.",
        "optionExplanations": {
            "A": "Correct. `app.logger.info(...)` is Flask's built-in logging interface.",
            "B": "Incorrect. Function does not exist.",
            "C": "Incorrect. `console.log()` is JavaScript, not Python.",
            "D": "Incorrect. Not a Flask function."
        },
        "practicalExample": "`app.logger.error(f'Database connection failed: {e}')`."
    },
    {
        "id": "u6_22",
        "module": 6,
        "topic": "Flask Blueprints Concept",
        "difficulty": "Easy",
        "question": "What is the primary purpose of Flask Blueprints?",
        "codeSnippet": None,
        "options": [
            "To draw architectural floor plans of computer laboratories",
            "To organize large Flask applications into modular, reusable, and maintainable component packages instead of stuffing all routes into a single monolithic `app.py`",
            "To compile Python into CSS stylesheets",
            "To automatically generate HTML forms without templates"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Blueprints enable modular application design. They allow splitting large apps into logical modules (e.g. `auth_bp`, `admin_bp`, `api_bp`), each with its own routes, templates, and static files.",
        "optionExplanations": {
            "A": "Incorrect. Not related to physical architecture.",
            "B": "Correct. Organizes routes and endpoints into modular, decoupled packages.",
            "C": "Incorrect. Python does not compile into CSS.",
            "D": "Incorrect. Blueprints manage routing structure, not form generation."
        },
        "practicalExample": "In an e-commerce app: `auth/routes.py`, `products/routes.py`, and `orders/routes.py` are each separate Blueprints."
    },
    {
        "id": "u6_23",
        "module": 6,
        "topic": "Creating a Blueprint",
        "difficulty": "Medium",
        "question": "Which syntax correctly instantiates a new Blueprint named 'student' in a file `students/routes.py`?",
        "codeSnippet": None,
        "options": [
            "from flask import Blueprint\nstudent_bp = Blueprint('student', __name__)",
            "from flask import Flask\nstudent_bp = Flask('student')",
            "student_bp = Blueprint.create('student')",
            "student_bp = new Blueprint('student')"
        ],
        "correctAnswer": 0,
        "correctExplanation": "`student_bp = Blueprint('blueprint_name', __name__)` initializes a Blueprint instance. The first argument is the blueprint's identifier, and `__name__` locates its module root.",
        "optionExplanations": {
            "A": "Correct. Standard Blueprint instantiation syntax.",
            "B": "Incorrect. `Flask()` creates the main app, not a blueprint.",
            "C": "Incorrect. Method does not exist.",
            "D": "Incorrect. `new` is JavaScript/Java syntax, invalid in Python."
        },
        "practicalExample": "You then define routes on it: `@student_bp.route('/list')`."
    },
    {
        "id": "u6_24",
        "module": 6,
        "topic": "Registering a Blueprint",
        "difficulty": "Easy",
        "question": "How is a Blueprint instance registered with the main Flask application object?",
        "codeSnippet": "from students.routes import student_bp",
        "options": [
            "app.register_blueprint(student_bp)",
            "app.use(student_bp)",
            "app.attach(student_bp)",
            "student_bp.bind(app)"
        ],
        "correctAnswer": 0,
        "correctExplanation": "`app.register_blueprint(blueprint_object)` binds the blueprint and all of its registered routes, error handlers, and context processors into the application's URL map.",
        "optionExplanations": {
            "A": "Correct. `app.register_blueprint(student_bp)` is the official registration method.",
            "B": "Incorrect. `app.use` is Node.js/Express.",
            "C": "Incorrect. Not a Flask method.",
            "D": "Incorrect. Inverted syntax."
        },
        "practicalExample": "In `app.py`: `app.register_blueprint(student_bp, url_prefix='/students')`."
    },
    {
        "id": "u6_25",
        "module": 6,
        "topic": "Blueprint url_prefix",
        "difficulty": "Medium",
        "question": "What is the effect of setting `url_prefix='/api/v1'` when registering a Blueprint?",
        "codeSnippet": "app.register_blueprint(api_bp, url_prefix='/api/v1')",
        "options": [
            "It deletes all routes that don't have that prefix",
            "It prepends `/api/v1` to every single route URL defined inside that blueprint automatically",
            "It forces the blueprint to run on port 1",
            "It disables all other blueprints"
        ],
        "correctAnswer": 1,
        "correctExplanation": "The `url_prefix` parameter prefixes all routes defined on that blueprint. For example, a route defined as `@api_bp.route('/users')` becomes accessible at `/api/v1/users`.",
        "optionExplanations": {
            "A": "Incorrect. Other routes are unaffected.",
            "B": "Correct. Automatically prefixes all route paths in that blueprint.",
            "C": "Incorrect. It affects URL paths, not network port numbers.",
            "D": "Incorrect. Multiple blueprints coexist cleanly."
        },
        "practicalExample": "Allows versioning APIs easily without hardcoding `/api/v1` in dozens of individual route decorators."
    },
    {
        "id": "u6_26",
        "module": 6,
        "topic": "url_for with Blueprints",
        "difficulty": "Hard",
        "question": "Given a blueprint named `admin` containing a view function `dashboard()`, how do you generate its URL using `url_for()`?",
        "codeSnippet": None,
        "options": [
            "url_for('admin.dashboard')",
            "url_for('dashboard')",
            "url_for('admin/dashboard')",
            "url_for('@admin_dashboard')"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Routes in blueprints are namespaced by the blueprint name. You access them using the syntax `url_for('blueprint_name.view_function_name')`.",
        "optionExplanations": {
            "A": "Correct. `url_for('admin.dashboard')` uses the blueprint namespace prefix.",
            "B": "Incorrect. Calling `url_for('dashboard')` will raise a `BuildError` if defined inside a blueprint.",
            "C": "Incorrect. Endpoints use dot notation, not slashes.",
            "D": "Incorrect. `@` symbol is not used."
        },
        "practicalExample": "In template: `<a href=\"{{ url_for('admin.dashboard') }}\">Admin Panel</a>`."
    },
    {
        "id": "u6_27",
        "module": 6,
        "topic": "Pre-flight Deployment Checklist",
        "difficulty": "Easy",
        "question": "Which command generates the `requirements.txt` file capturing all installed packages and their exact versions prior to deployment?",
        "codeSnippet": None,
        "options": [
            "pip freeze > requirements.txt",
            "pip export > requirements.txt",
            "python save-packages.py",
            "flask export requirements"
        ],
        "correctAnswer": 0,
        "correctExplanation": "`pip freeze > requirements.txt` dumps all active environment packages and exact version numbers into `requirements.txt`.",
        "optionExplanations": {
            "A": "Correct. `pip freeze > requirements.txt` is the universal Python standard.",
            "B": "Incorrect. `pip export` does not exist.",
            "C": "Incorrect. Not a standard Python command.",
            "D": "Incorrect. Not a Flask CLI command."
        },
        "practicalExample": "Cloud platforms (like Render or Heroku) read `requirements.txt` to install dependencies during the build step."
    },
    {
        "id": "u6_28",
        "module": 6,
        "topic": "Pre-flight Deployment Checklist",
        "difficulty": "Medium",
        "question": "Which of the following is an absolute MUST in the pre-flight deployment checklist before launching a Flask application to production?",
        "codeSnippet": None,
        "options": [
            "Ensure `debug=True` is permanently hardcoded in `app.run()`",
            "Disable debug mode completely (`debug=False`), isolate secrets into environment variables, and use a production WSGI server instead of `app.run()`",
            "Delete all CSS stylesheets",
            "Disable all user logins"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Production deployments strictly require: 1) `debug=False` to prevent remote code execution, 2) keeping secret keys and database URLs in environment variables, and 3) serving via a multi-worker WSGI server (e.g. Gunicorn).",
        "optionExplanations": {
            "A": "Incorrect. `debug=True` in production is a critical security vulnerability.",
            "B": "Correct. Disable debug mode, secure secrets in `.env`, and run via production WSGI servers.",
            "C": "Incorrect. CSS is necessary for user presentation.",
            "D": "Incorrect. User authentication must remain active."
        },
        "practicalExample": "Directly matches the deployment pre-flight checklist on Slide 13 of course materials."
    },
    {
        "id": "u6_29",
        "module": 6,
        "topic": "Production WSGI Servers",
        "difficulty": "Medium",
        "question": "Which of the following is a production-grade WSGI HTTP server commonly used to run Flask applications on Linux servers?",
        "codeSnippet": None,
        "options": [
            "Gunicorn (Green Unicorn)",
            "Jinja2",
            "Werkzeug Development Server",
            "SQLite"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Gunicorn is a battle-tested, pre-fork worker model WSGI HTTP server designed specifically for running Python web applications concurrently in production Linux environments.",
        "optionExplanations": {
            "A": "Correct. Gunicorn is the industry-standard production WSGI server for Python web apps.",
            "B": "Incorrect. Jinja2 is a templating engine, not an HTTP server.",
            "C": "Incorrect. Werkzeug dev server is single-threaded and unsuitable for production.",
            "D": "Incorrect. SQLite is a database engine, not an HTTP server."
        },
        "practicalExample": "Running in production: `gunicorn -w 4 -b 0.0.0.0:8000 app:app` spawns 4 worker processes."
    },
    {
        "id": "u6_30",
        "module": 6,
        "topic": "WSGI Server Command",
        "difficulty": "Hard",
        "question": "In the production command `gunicorn -w 4 app:app`, what does the argument `app:app` specify?",
        "codeSnippet": None,
        "options": [
            "The username and password for the server administrator",
            "The first `'app'` is the Python module/file name (`app.py`), and the second `'app'` is the Flask application instance variable defined inside that file",
            "It tells Gunicorn to restart 4 times",
            "It configures a dual-screen monitor"
        ],
        "correctAnswer": 1,
        "correctExplanation": "The syntax `<module>:<callable>` tells Gunicorn: import module `app` (`app.py`), and locate the WSGI callable object named `app` (`app = Flask(__name__)`) inside it.",
        "optionExplanations": {
            "A": "Incorrect. Gunicorn does not accept credentials in this argument.",
            "B": "Correct. Module name (`app.py`) followed by application variable name (`app = Flask(__name__)`).",
            "C": "Incorrect. `-w 4` specifies 4 worker processes, not restarts.",
            "D": "Incorrect. Unrelated to displays."
        },
        "practicalExample": "If your main file is `main.py` and application is `application = Flask(__name__)`, the command is `gunicorn main:application`."
    },
    {
        "id": "u6_31",
        "module": 6,
        "topic": "Environment Variables",
        "difficulty": "Medium",
        "question": "Why should sensitive configurations such as `SECRET_KEY` and database passwords be loaded from environment variables rather than hardcoded in `app.py`?",
        "codeSnippet": "import os\napp.secret_key = os.environ.get('SECRET_KEY')",
        "options": [
            "Because environment variables make the website load 100 times faster",
            "To prevent exposing private credentials when source code is committed to public Git repositories (like GitHub) and to allow different configurations between development and production",
            "Because Python does not allow strings in configuration files",
            "Because environment variables delete old cookies"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Hardcoding secrets in source files leads to credential leakage when code is pushed to version control. Using `os.environ.get()` keeps secrets in local `.env` files (ignored by Git) and enables distinct configs per deployment environment.",
        "optionExplanations": {
            "A": "Incorrect. Has zero impact on network loading speed.",
            "B": "Correct. Essential security practice to avoid credential leakage in Git and manage environment-specific settings.",
            "C": "Incorrect. Python configurations use strings routinely.",
            "D": "Incorrect. Environment variables have no connection to cookies."
        },
        "practicalExample": "Libraries like `python-dotenv` load variables from a local `.env` file into `os.environ`."
    },
    {
        "id": "u6_32",
        "module": 6,
        "topic": "Reverse Proxy Architecture",
        "difficulty": "Hard",
        "question": "In a robust production architecture, what software is commonly placed in front of Gunicorn as a Reverse Proxy?",
        "codeSnippet": "Client Browser  --->  Nginx (Reverse Proxy)  --->  Gunicorn (WSGI)  --->  Flask App",
        "options": [
            "Nginx or Apache",
            "SQLite",
            "Jinja2",
            "Werkzeug"
        ],
        "correctAnswer": 0,
        "correctExplanation": "A reverse proxy like Nginx sits on public port 80/443. It handles SSL/TLS termination, serves static assets (CSS/JS) with maximum speed, manages client rate limiting, and forwards dynamic requests to Gunicorn.",
        "optionExplanations": {
            "A": "Correct. Nginx is the standard high-performance reverse proxy for production Python deployments.",
            "B": "Incorrect. SQLite is an embedded database.",
            "C": "Incorrect. Jinja2 is a template renderer.",
            "D": "Incorrect. Werkzeug is a library, not a standalone front-facing reverse proxy."
        },
        "practicalExample": "Nginx serves `static/` files directly from disk without waking up Python, saving server CPU."
    },
    {
        "id": "u6_33",
        "module": 6,
        "topic": "Cloud Deployment: Render",
        "difficulty": "Easy",
        "question": "According to the course syllabus, how does deployment on cloud platform Render primarily operate?",
        "codeSnippet": None,
        "options": [
            "By mailing a physical USB flash drive to Render headquarters",
            "By connecting a Git repository (like GitHub) for automated builds and continuous deployment whenever changes are pushed",
            "By converting Python into C++ first",
            "By uploading files via dial-up modem"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Render provides automated GitHub integration. When you push commits to your repository, Render automatically pulls the code, installs dependencies from `requirements.txt`, and boots the app using your configured start command (e.g. `gunicorn app:app`).",
        "optionExplanations": {
            "A": "Incorrect. Physical media is not used for cloud hosting.",
            "B": "Correct. Modern Git-based automated deployment highlighted in course slides (Page 14).",
            "C": "Incorrect. Runs native Python runtimes.",
            "D": "Incorrect. Obsolete communication method."
        },
        "practicalExample": "Git push to `main` triggers a live deployment on Render within minutes."
    },
    {
        "id": "u6_34",
        "module": 6,
        "topic": "Cloud Deployment: PythonAnywhere",
        "difficulty": "Easy",
        "question": "What is PythonAnywhere as described in the course syllabus?",
        "codeSnippet": None,
        "options": [
            "A desktop gaming console",
            "A specialized Python cloud hosting environment that provides an in-browser bash terminal, scheduled tasks, and pre-configured WSGI configuration for Flask and Django",
            "A compiler that translates Python into Java bytecode",
            "A database that replaces MySQL"
        ],
        "correctAnswer": 1,
        "correctExplanation": "PythonAnywhere is an online integrated hosting platform built specifically for Python applications. It features browser-based bash consoles, virtualenv management, and easy WSGI web app deployment.",
        "optionExplanations": {
            "A": "Incorrect. It is a cloud hosting platform.",
            "B": "Correct. Dedicated Python cloud hosting platform covered in course slides (Page 14).",
            "C": "Incorrect. Not a Java bytecode compiler.",
            "D": "Incorrect. It is a hosting provider, not a database."
        },
        "practicalExample": "Popular among students and educators for deploying Flask prototypes without complex server administration."
    },
    {
        "id": "u6_35",
        "module": 6,
        "topic": "Cloud Deployment: Heroku & Procfile",
        "difficulty": "Medium",
        "question": "What is the purpose of the `Procfile` in a Heroku or Render deployment?",
        "codeSnippet": "# Procfile\nweb: gunicorn app:app",
        "options": [
            "It configures the font size for the web terminal",
            "It specifies the exact process command the hosting platform must execute to boot and run the application web dyno",
            "It stores the user's credit card information",
            "It compiles Python into an `.exe` file"
        ],
        "correctAnswer": 1,
        "correctExplanation": "The `Procfile` is a text file placed in the repository root declaring the process types and commands to execute (e.g. `web: gunicorn app:app`).",
        "optionExplanations": {
            "A": "Incorrect. Not related to fonts.",
            "B": "Correct. Declares the command to start the web server worker process.",
            "C": "Incorrect. Procfiles do not store billing details.",
            "D": "Incorrect. It does not compile executables."
        },
        "practicalExample": "`web: gunicorn app:app` tells Heroku to launch Gunicorn as the web process."
    },
    {
        "id": "u6_36",
        "module": 6,
        "topic": "Windows WSGI: Waitress",
        "difficulty": "Hard",
        "question": "Why is Gunicorn NOT typically used directly for production deployments on native Windows servers, and what is a popular pure-Python alternative?",
        "codeSnippet": None,
        "options": [
            "Gunicorn works only on Windows, while Waitress works on Linux",
            "Gunicorn relies on Unix POSIX system calls (like `fork()`) not available natively on Windows; `Waitress` is a production-quality pure-Python WSGI server that runs seamlessly on Windows and Linux",
            "Windows does not support Python web servers",
            "Waitress is an HTML validator"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Gunicorn relies heavily on Unix system calls (such as `fcntl` and `fork`), preventing it from running natively on Windows without WSL. `Waitress` is a pure-Python, multi-threaded production WSGI server that runs cross-platform on Windows.",
        "optionExplanations": {
            "A": "Incorrect. Inverted: Gunicorn is Unix/Linux only.",
            "B": "Correct. Gunicorn requires POSIX; Waitress runs natively on Windows production servers.",
            "C": "Incorrect. Windows hosts many Python production applications.",
            "D": "Incorrect. Waitress is an HTTP WSGI server, not an HTML validator."
        },
        "practicalExample": "On Windows: `from waitress import serve; serve(app, host='0.0.0.0', port=8080)`."
    },
    {
        "id": "u6_37",
        "module": 6,
        "topic": "JSON Serialization Limits",
        "difficulty": "Medium",
        "question": "What happens if you attempt to serialize a Python `datetime` object directly using `jsonify()` without formatting it?",
        "codeSnippet": "return jsonify({'created_at': datetime.now()})",
        "options": [
            "Modern Flask serializes it to an ISO 8601 formatted string automatically (or requires `.isoformat()` in custom serializers)",
            "The computer screen turns off",
            "The database is deleted",
            "Flask converts it into the number 0"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Flask's JSON provider includes custom encoders that automatically convert `datetime` and `date` objects into ISO 8601 format strings (e.g. `'2026-10-14T10:00:00'`). In standard Python `json.dumps()`, a `TypeError` would be raised.",
        "optionExplanations": {
            "A": "Correct. Flask's extended JSON encoder automatically serializes datetimes to ISO 8601 strings.",
            "B": "Incorrect. Hardware is unaffected.",
            "C": "Incorrect. No database operations are triggered.",
            "D": "Incorrect. It produces standard date strings, not zeros."
        },
        "practicalExample": "Modern Flask (Flask 2.2+) uses `app.json` provider for enhanced serialization."
    },
    {
        "id": "u6_38",
        "module": 6,
        "topic": "HTTP Status 405 Method Not Allowed",
        "difficulty": "Easy",
        "question": "If an API route is defined as `@app.route('/api/students', methods=['GET'])`, what status code is returned if a client sends a `DELETE` request to that URL?",
        "codeSnippet": None,
        "options": [
            "200 OK",
            "404 Not Found",
            "405 Method Not Allowed",
            "500 Server Error"
        ],
        "correctAnswer": 2,
        "correctExplanation": "Since the URL path `/api/students` exists but does not declare `DELETE` in its `methods` list, Flask returns HTTP 405 Method Not Allowed along with an `Allow: GET` header.",
        "optionExplanations": {
            "A": "Incorrect. The request is rejected.",
            "B": "Incorrect. 404 is only returned if the URL path itself does not exist.",
            "C": "Correct. 405 signifies the route exists but does not accept the requested HTTP method.",
            "D": "Incorrect. It is a client error, not a server crash."
        },
        "practicalExample": "To fix this, define a dedicated route handler accepting `DELETE`."
    },
    {
        "id": "u6_39",
        "module": 6,
        "topic": "CORS in Web APIs",
        "difficulty": "Hard",
        "question": "What is Cross-Origin Resource Sharing (CORS), and which extension solves CORS issues in Flask REST APIs?",
        "codeSnippet": None,
        "options": [
            "CORS is a browser security mechanism that restricts web applications from making API requests to a different domain/port; `Flask-CORS` adds the required `Access-Control-Allow-Origin` headers to permit cross-origin requests",
            "CORS is a database query accelerator; `Flask-Speed` solves it",
            "CORS is an image formatting standard",
            "CORS only happens on Windows XP"
        ],
        "correctAnswer": 0,
        "correctExplanation": "By default, browser Same-Origin Policy blocks frontend JavaScript running on `http://localhost:3000` (e.g. React/Vue) from fetching APIs on `http://localhost:5000`. The `Flask-CORS` extension attaches `Access-Control-Allow-Origin` headers to authorize cross-origin communication.",
        "optionExplanations": {
            "A": "Correct. Standard explanation of CORS and the `Flask-CORS` extension (`CORS(app)`).",
            "B": "Incorrect. CORS is browser security, not database speed.",
            "C": "Incorrect. Not related to images.",
            "D": "Incorrect. CORS is enforced by all modern web browsers."
        },
        "practicalExample": "`from flask_cors import CORS; CORS(app)` enables cross-origin API access for frontend clients."
    },
    {
        "id": "u6_40",
        "module": 6,
        "topic": "REST API Filtering with Query Params",
        "difficulty": "Medium",
        "question": "How should a RESTful API endpoint `GET /api/students` allow clients to filter results by department and limit results?",
        "codeSnippet": None,
        "options": [
            "Through URL query string parameters: `GET /api/students?dept=IT&limit=10` accessed in Flask via `request.args`",
            "By creating a new route for every single student in the college",
            "By sending a DELETE request",
            "By asking the user to call the server administrator"
        ],
        "correctAnswer": 0,
        "correctExplanation": "In REST design, filtering, sorting, and pagination are always communicated via URL query string parameters on collection endpoints (e.g. `/api/students?dept=IT&limit=10`), which Flask parses via `request.args`.",
        "optionExplanations": {
            "A": "Correct. Standard REST practice using query string parameters.",
            "B": "Incorrect. Unmaintainable anti-pattern.",
            "C": "Incorrect. DELETE deletes resources.",
            "D": "Incorrect. Ridiculous."
        },
        "practicalExample": "```python\ndept = request.args.get('dept')\nif dept:\n    query = query.filter_by(department=dept)\n```"
    },
    {
        "id": "u6_41",
        "module": 6,
        "topic": "Flask Blueprint Modular Folder Structure",
        "difficulty": "Medium",
        "question": "Examine this project structure from course slides (Page 12):\nWhat is the benefit of organizing `students/`, `users/`, and `api/` into separate subdirectories with their own `routes.py`?",
        "codeSnippet": "project/\n├── app.py\n├── students/\n│   └── routes.py\n├── users/\n│   └── routes.py\n└── api/\n    └── routes.py",
        "options": [
            "It reduces the size of the computer hard disk",
            "It isolates functionality into decoupled domain modules, allowing large developer teams to work on independent components without file merge conflicts",
            "It compiles Python into machine code",
            "It replaces the need for a database"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Modular directory structures isolate domain logic (users, students, api). Different developers or teams can maintain their respective modules independently, making testing, refactoring, and code reviews clean and organized.",
        "optionExplanations": {
            "A": "Incorrect. File organization does not compress disk hardware.",
            "B": "Correct. Promotes separation of concerns, scalability, and teamwork without merge conflicts.",
            "C": "Incorrect. Folder structure doesn't compile code.",
            "D": "Incorrect. Databases are still required."
        },
        "practicalExample": "A bug in the `students` module can be debugged inside `students/routes.py` without risking accidental edits to `users/routes.py`."
    },
    {
        "id": "u6_42",
        "module": 6,
        "topic": "HTTP Status 502 Bad Gateway",
        "difficulty": "Hard",
        "question": "In a production deployment with Nginx acting as a reverse proxy in front of Gunicorn, what does an HTTP 502 Bad Gateway error usually mean?",
        "codeSnippet": None,
        "options": [
            "Nginx is running, but Gunicorn has crashed or is not listening on the expected port/socket, preventing Nginx from receiving a response",
            "The client forgot to install Python on their phone",
            "The CSS stylesheet has a syntax error",
            "The user entered the wrong password"
        ],
        "correctAnswer": 0,
        "correctExplanation": "A 502 Bad Gateway error from Nginx means Nginx (the gateway/proxy) attempted to forward the request to the upstream backend server (Gunicorn), but Gunicorn was either stopped, crashed, or refused the connection.",
        "optionExplanations": {
            "A": "Correct. Upstream backend server (Gunicorn) is unreachable or crashed.",
            "B": "Incorrect. Client devices do not run the server Python code.",
            "C": "Incorrect. CSS errors do not trigger 502 gateway errors.",
            "D": "Incorrect. Authentication failures yield 401, not 502."
        },
        "practicalExample": "If Gunicorn crashes due to an unhandled import error on boot, Nginx returns 502 Bad Gateway to clients."
    },
    {
        "id": "u6_43",
        "module": 6,
        "topic": "REST Idempotence",
        "difficulty": "Hard",
        "question": "In RESTful API design, what does the term 'Idempotent' mean?",
        "codeSnippet": None,
        "options": [
            "An operation can be called multiple times with the exact same effect as calling it once, leaving the server in the identical state",
            "An operation that can only be run once per century",
            "An operation that runs in less than one nanosecond",
            "An endpoint that requires two passwords"
        ],
        "correctAnswer": 0,
        "correctExplanation": "An HTTP method is idempotent if executing it multiple times produces the exact same server state as a single execution. GET, PUT, and DELETE are idempotent. POST is NOT idempotent because making 5 identical POST requests creates 5 distinct records.",
        "optionExplanations": {
            "A": "Correct. Multiple identical requests produce the same end state (e.g. `DELETE /students/1` leaves student 1 deleted whether called 1 time or 10 times).",
            "B": "Incorrect. Fabricated definition.",
            "C": "Incorrect. Idempotency is about side effects, not execution speed.",
            "D": "Incorrect. Unrelated to authentication credentials."
        },
        "practicalExample": "Retrying a network-dropped PUT request is safe because PUT is idempotent."
    },
    {
        "id": "u6_44",
        "module": 6,
        "topic": "Flask Blueprint Templates & Static",
        "difficulty": "Hard",
        "question": "Can a Flask Blueprint have its own isolated `templates/` and `static/` directories?",
        "codeSnippet": "admin_bp = Blueprint('admin', __name__, template_folder='templates', static_folder='static')",
        "options": [
            "Yes, Blueprints accept `template_folder` and `static_folder` arguments to maintain self-contained modular assets",
            "No, Flask only permits a single global templates folder in the entire project",
            "Only if hosted on Heroku",
            "Only if written in JavaScript"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Blueprints can be completely self-contained modular packages, packaging their own templates (`template_folder='templates'`) and static assets (`static_folder='static'`).",
        "optionExplanations": {
            "A": "Correct. `template_folder` and `static_folder` parameters allow modular component packaging.",
            "B": "Incorrect. Flask searches blueprint template folders in addition to the global application template folder.",
            "C": "Incorrect. Hosting provider is irrelevant.",
            "D": "Incorrect. Blueprints are native Python constructs."
        },
        "practicalExample": "Enables distributing a reusable blueprint (like an admin panel) as a standalone Python package."
    },
    {
        "id": "u6_45",
        "module": 6,
        "topic": "HTTP Status 500 Debugging",
        "difficulty": "Medium",
        "question": "When debugging a 500 Internal Server Error in a deployed Flask API with `debug=False`, what is the FIRST place a developer should check?",
        "codeSnippet": None,
        "options": [
            "The server-side application log files (e.g. Gunicorn/Flask log output) to view the Python exception traceback",
            "The client's internet router settings",
            "The CSS stylesheet colors",
            "The user's monitor brightness"
        ],
        "correctAnswer": 0,
        "correctExplanation": "When `debug=False`, detailed error messages are hidden from clients for security. The full Python traceback is recorded in the server logs (e.g. `heroku logs`, `render logs`, or Gunicorn log files).",
        "optionExplanations": {
            "A": "Correct. Server logs contain the exact line number and exception traceback.",
            "B": "Incorrect. 500 is a server-side error, not client connectivity.",
            "C": "Incorrect. CSS styling does not cause 500 server crashes.",
            "D": "Incorrect. Hardware displays are unrelated."
        },
        "practicalExample": "In terminal: `tail -f /var/log/gunicorn/error.log` reveals the exact Python crash."
    },
    {
        "id": "u6_46",
        "module": 6,
        "topic": "jsonify vs json.dumps",
        "difficulty": "Hard",
        "question": "What is the key difference between Python's standard `json.dumps({'a': 1})` and Flask's `jsonify({'a': 1})`?",
        "codeSnippet": None,
        "options": [
            "`json.dumps()` returns a plain Python string with default `text/html` mimetype, whereas `jsonify()` returns a full Flask `Response` object with `mimetype='application/json'` and custom Flask type serialization support",
            "`json.dumps()` only works on Linux",
            "`jsonify()` deletes the dictionary after serialization",
            "There is no difference; they are identical aliases"
        ],
        "correctAnswer": 0,
        "correctExplanation": "`json.dumps()` converts a dictionary into a string. If returned from a Flask view, Flask assumes it is an HTML string (`Content-Type: text/html`). `jsonify()` constructs a true Flask `Response` object with `Content-Type: application/json`.",
        "optionExplanations": {
            "A": "Correct. `jsonify()` packages the string into an HTTP Response with `Content-Type: application/json`.",
            "B": "Incorrect. Both run across all platforms.",
            "C": "Incorrect. It does not delete data.",
            "D": "Incorrect. Their return types and HTTP header outputs differ completely."
        },
        "practicalExample": "API clients inspecting response headers expect `Content-Type: application/json`."
    },
    {
        "id": "u6_47",
        "module": 6,
        "topic": "RESTful Nested Resources",
        "difficulty": "Medium",
        "question": "What is the standard RESTful URI convention to retrieve all grades belonging to student with ID 42?",
        "codeSnippet": None,
        "options": [
            "GET /students/42/grades",
            "GET /getGradesForStudent?id=42",
            "POST /findStudent42Grades",
            "DELETE /grades/42"
        ],
        "correctAnswer": 0,
        "correctExplanation": "In REST API design, sub-resources that belong to a parent entity are represented hierarchically: `/parent_collection/{parent_id}/child_collection`, thus `GET /students/42/grades`.",
        "optionExplanations": {
            "A": "Correct. Standard nested resource URI pattern in REST.",
            "B": "Incorrect. RPC-style URL with embedded verb.",
            "C": "Incorrect. Non-RESTful POST with embedded action verb.",
            "D": "Incorrect. DELETE deletes resources."
        },
        "practicalExample": "`GET /departments/1/students` lists all students in department 1."
    },
    {
        "id": "u6_48",
        "module": 6,
        "topic": "Flask Blueprint url_prefix Defaults",
        "difficulty": "Medium",
        "question": "If a Blueprint is registered without a `url_prefix`, what prefix is used?",
        "codeSnippet": "app.register_blueprint(public_bp)",
        "options": [
            "None; the routes are mounted directly at the root application path (e.g. `/`)",
            "It defaults to the blueprint's name",
            "Flask throws an error requiring a prefix",
            "It defaults to `/default`"
        ],
        "correctAnswer": 0,
        "correctExplanation": "If `url_prefix` is omitted during registration, the blueprint's routes are bound directly to the root application URL map without any prefix.",
        "optionExplanations": {
            "A": "Correct. Omission binds routes directly to root.",
            "B": "Incorrect. It does not automatically inject the blueprint name as a prefix.",
            "C": "Incorrect. `url_prefix` is optional.",
            "D": "Incorrect. It does not use `/default`."
        },
        "practicalExample": "Useful for mounting public landing pages: `@public_bp.route('/')` maps to `http://localhost:5000/`."
    },
    {
        "id": "u6_49",
        "module": 6,
        "topic": "Cloud Deployment: Procfile Worker Count",
        "difficulty": "Hard",
        "question": "In a Gunicorn deployment command `gunicorn --workers 3 app:app`, what general formula is recommended by Gunicorn documentation to calculate the optimal number of worker processes for CPU-bound tasks?",
        "codeSnippet": None,
        "options": [
            "`(2 * number_of_cpu_cores) + 1`",
            "`100 * number_of_cpu_cores`",
            "Always exactly 1 worker regardless of CPU cores",
            "`number_of_cpu_cores / 4`"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Gunicorn's official documentation recommends the formula `(2 * CPU_cores) + 1` to balance concurrency and context switching overhead for standard I/O and CPU workloads.",
        "optionExplanations": {
            "A": "Correct. `(2 * cores) + 1` is Gunicorn's official rule of thumb.",
            "B": "Incorrect. 100 workers would overwhelm CPU context switching.",
            "C": "Incorrect. 1 worker cannot leverage multi-core CPUs.",
            "D": "Incorrect. Fractional workers are invalid."
        },
        "practicalExample": "On a 2-core server: `(2 * 2) + 1 = 5` workers (`gunicorn -w 5 app:app`)."
    },
    {
        "id": "u6_50",
        "module": 6,
        "topic": "Module 6 Summary",
        "difficulty": "Hard",
        "question": "Which of the following statements comprehensively and accurately summarizes Module 6: RESTful API and Deployment?",
        "codeSnippet": None,
        "options": [
            "REST APIs exchange structured JSON via standard HTTP methods (GET, POST, PUT, DELETE) and status codes (200, 201, 400, 404, 500); Flask uses `jsonify()` to serialize data and `request.get_json()` to parse bodies; large projects are structured using modular Blueprints; and production deployment requires pre-flight checks (`requirements.txt`, `debug=False`), environment variable security, and WSGI servers (Gunicorn/Waitress) on platforms like Render or PythonAnywhere",
            "REST APIs can only communicate with iPhone devices",
            "Flask applications must always be deployed using `app.run(debug=True)` in production",
            "Blueprints only work if you purchase an enterprise license"
        ],
        "correctAnswer": 0,
        "correctExplanation": "This accurately covers all aspects of Module 6: REST architecture, JSON input/output, HTTP status codes, Blueprints modularity, deployment pre-flight checklist, and production WSGI hosting.",
        "optionExplanations": {
            "A": "Correct. Comprehensive and technically precise summary of Module 6.",
            "B": "Incorrect. REST APIs are platform-independent.",
            "C": "Incorrect. `debug=True` in production is a critical security vulnerability.",
            "D": "Incorrect. Blueprints are free, open-source core features of Flask."
        },
        "practicalExample": "These principles govern modern cloud web service architectures."
    }
]

def generate():
    assert len(questions) == 50, f"Expected 50 questions, got {len(questions)}"
    for idx, q in enumerate(questions):
        assert q["id"] == f"u6_{idx+1:02d}", f"ID mismatch at index {idx}: {q['id']}"
        assert len(q["options"]) == 4, f"Options count not 4 at {q['id']}"
        assert 0 <= q["correctAnswer"] <= 3, f"Invalid correctAnswer at {q['id']}"
        for opt_key in ["A", "B", "C", "D"]:
            assert opt_key in q["optionExplanations"], f"Missing option explanation {opt_key} at {q['id']}"
            assert len(q["optionExplanations"][opt_key]) > 10, f"Option explanation too short {opt_key} at {q['id']}"
        assert q["module"] == 6, f"Module mismatch at {q['id']}"
        assert q["difficulty"] in ["Easy", "Medium", "Hard"], f"Invalid difficulty at {q['id']}"

    js_content = f"// Module 6: RESTful API and Deployment\n// Total Questions: {len(questions)}\n// Auto-generated & Verified Question Bank\n\nwindow.UNIT6_QUESTIONS = {json.dumps(questions, indent=2, ensure_ascii=False)};\n"
    with open("data/unit6.js", "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"Successfully generated data/unit6.js with {len(questions)} validated questions.")

if __name__ == "__main__":
    generate()
