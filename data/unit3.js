// Module 3: Forms and Request Handling
// Total Questions: 50
// Auto-generated & Verified Question Bank

window.UNIT3_QUESTIONS = [
  {
    "id": "u3_01",
    "module": 3,
    "topic": "HTML Forms Anatomy",
    "difficulty": "Easy",
    "question": "In an HTML `<form>` tag, which attribute defines the target server URL where form data is submitted?",
    "codeSnippet": "<form action=\"/submit-data\" method=\"POST\">\n    ...\n</form>",
    "options": [
      "method",
      "action",
      "enctype",
      "target"
    ],
    "correctAnswer": 1,
    "correctExplanation": "The `action` attribute specifies the URL endpoint to which the browser sends the packaged form data upon submission.",
    "optionExplanations": {
      "A": "Incorrect. `method` specifies the HTTP verb (e.g. GET or POST).",
      "B": "Correct. `action` specifies the destination URL path handled by Flask.",
      "C": "Incorrect. `enctype` dictates how data is encoded (e.g. multipart/form-data).",
      "D": "Incorrect. `target` specifies where to display the response (e.g. _blank for new tab)."
    },
    "practicalExample": "If `action=\"/register\"`, clicking submit sends the request to the Flask route mapped to `/register`."
  },
  {
    "id": "u3_02",
    "module": 3,
    "topic": "HTML Forms Anatomy",
    "difficulty": "Easy",
    "question": "Why is the `name` attribute in an `<input>` field critical when working with Flask backend forms?",
    "codeSnippet": "<input type=\"text\" name=\"student_email\">",
    "options": [
      "It sets the font color in CSS",
      "It acts as the key used by Flask's `request.form` dictionary on the server to retrieve the user's submitted value",
      "It specifies the database table name in SQLite",
      "It is completely optional and ignored by both browser and server"
    ],
    "correctAnswer": 1,
    "correctExplanation": "The browser packages form elements into key-value pairs using the input's `name` attribute as the dictionary key. Without a `name` attribute, the browser will NOT submit that input's value to the server.",
    "optionExplanations": {
      "A": "Incorrect. Styling is controlled by CSS class or style attributes.",
      "B": "Correct. The `name` attribute becomes the lookup key in `request.form['student_email']` on the backend.",
      "C": "Incorrect. It does not dictate database schema tables.",
      "D": "Incorrect. If `name` is omitted, the form field is not submitted at all."
    },
    "practicalExample": "An input with `name=\"username\"` allows Python code to read `request.form.get('username')`."
  },
  {
    "id": "u3_03",
    "module": 3,
    "topic": "HTTP Methods",
    "difficulty": "Easy",
    "question": "How does the browser transport submitted form data when the form specifies `method=\"GET\"`?",
    "codeSnippet": null,
    "options": [
      "Data is encrypted and stored in the browser cache only",
      "Data is appended directly to the target URL as a visible query string (e.g. `/search?q=flask`)",
      "Data is transmitted inside the HTTP request body and hidden from the URL bar",
      "Data is written directly into an SQLite database file on the client's hard drive"
    ],
    "correctAnswer": 1,
    "correctExplanation": "In an HTTP GET request, form field values are serialized into a query string and appended to the URL after a `?` delimiter, making them visible in the address bar, browser history, and server access logs.",
    "optionExplanations": {
      "A": "Incorrect. Data is sent to the server, not just kept in cache.",
      "B": "Correct. GET appends data as key-value pairs in the URL query string.",
      "C": "Incorrect. Sending data inside the request body is the behavior of POST.",
      "D": "Incorrect. Browsers cannot write directly to server databases."
    },
    "practicalExample": "Submitting a search for 'flask' in a GET form navigates to `https://mysite.com/search?q=flask`."
  },
  {
    "id": "u3_04",
    "module": 3,
    "topic": "HTTP Methods",
    "difficulty": "Easy",
    "question": "Which of the following is a key characteristic of the HTTP POST method compared to GET?",
    "codeSnippet": null,
    "options": [
      "POST parameters are displayed openly in the browser URL bar",
      "POST data travels inside the HTTP request body, is not displayed in the URL, has no practical size limit, and is ideal for sensitive data like passwords",
      "POST requests can be bookmarked and cached by default in all web browsers",
      "POST requests cannot modify data on the server"
    ],
    "correctAnswer": 1,
    "correctExplanation": "POST packages payload data within the request body. This prevents sensitive information from leaking into URLs, eliminates URL length restrictions, and avoids browser caching.",
    "optionExplanations": {
      "A": "Incorrect. GET displays parameters in the URL, not POST.",
      "B": "Correct. POST sends data in the request body, hides it from URL bar, and supports large payloads.",
      "C": "Incorrect. Browsers do not bookmark or cache POST requests by default.",
      "D": "Incorrect. POST is the primary method used to create or alter data on the server."
    },
    "practicalExample": "User authentication forms must always use `POST` to avoid leaking passwords in browser history."
  },
  {
    "id": "u3_05",
    "module": 3,
    "topic": "Route Methods Parameter",
    "difficulty": "Medium",
    "question": "By default, what HTTP method(s) does a Flask route accept if the `methods` argument is omitted from `@app.route('/login')`?",
    "codeSnippet": null,
    "options": [
      "GET only",
      "POST only",
      "Both GET and POST",
      "All HTTP methods (GET, POST, PUT, DELETE, PATCH)"
    ],
    "correctAnswer": 0,
    "correctExplanation": "In Flask, route decorators without an explicit `methods` argument default strictly to `['GET']`. Any other HTTP method sent to that URL will be rejected.",
    "optionExplanations": {
      "A": "Correct. By default, Flask routes listen exclusively for HTTP GET requests.",
      "B": "Incorrect. POST must be explicitly listed in the `methods` argument.",
      "C": "Incorrect. You must declare `methods=['GET', 'POST']` to accept both.",
      "D": "Incorrect. Flask does not default to wildcard methods."
    },
    "practicalExample": "To handle form submissions, you must explicitly write `@app.route('/login', methods=['GET', 'POST'])`."
  },
  {
    "id": "u3_06",
    "module": 3,
    "topic": "HTTP Error 405",
    "difficulty": "Medium",
    "question": "What HTTP status code does Flask return if a client sends an HTTP POST request to a route defined as `@app.route('/contact')` without declaring `methods=['POST']`?",
    "codeSnippet": null,
    "options": [
      "400 Bad Request",
      "404 Not Found",
      "405 Method Not Allowed",
      "500 Internal Server Error"
    ],
    "correctAnswer": 2,
    "correctExplanation": "HTTP 405 Method Not Allowed indicates that the requested URL path exists on the server, but the HTTP verb used (e.g. POST) is not permitted by that route's registered configuration.",
    "optionExplanations": {
      "A": "Incorrect. 400 indicates malformed request syntax.",
      "B": "Incorrect. 404 indicates the URL path itself does not exist.",
      "C": "Correct. 405 Method Not Allowed signifies the route exists but does not support POST.",
      "D": "Incorrect. 500 indicates a server Python crash."
    },
    "practicalExample": "If you get a 405 error when submitting a form, verify that your route decorator includes `methods=['GET', 'POST']`."
  },
  {
    "id": "u3_07",
    "module": 3,
    "topic": "The request Object",
    "difficulty": "Easy",
    "question": "Where is Flask's `request` object imported from?",
    "codeSnippet": null,
    "options": [
      "from flask import request",
      "import request",
      "from urllib import request",
      "from werkzeug import request_global"
    ],
    "correctAnswer": 0,
    "correctExplanation": "The `request` object is imported directly from the top-level `flask` package: `from flask import request`.",
    "optionExplanations": {
      "A": "Correct. `from flask import request` is the official and standard import.",
      "B": "Incorrect. `import request` is not the third-party `requests` library or Flask's request proxy.",
      "C": "Incorrect. `urllib.request` is Python's standard client-side URL fetching library.",
      "D": "Incorrect. Werkzeug has `Request`, but Flask wraps it into `flask.request`."
    },
    "practicalExample": "`from flask import Flask, render_template, request` is the standard header in `app.py`."
  },
  {
    "id": "u3_08",
    "module": 3,
    "topic": "The request Object",
    "difficulty": "Hard",
    "question": "How does Flask ensure that the globally imported `request` object contains data for the current user's request without mixing up simultaneous requests from different users?",
    "codeSnippet": null,
    "options": [
      "Flask is single-threaded and forces all users across the world to wait in a single queue",
      "Flask utilizes Context Locals (thread-local / task-local proxy objects) that dynamically route lookups to the specific request context of the active thread",
      "Flask creates a separate Python file on disk for every incoming request",
      "The browser sends its Python source code along with each request"
    ],
    "correctAnswer": 1,
    "correctExplanation": "`request` is a Context Local proxy (built on Werkzeug's LocalProxy). When your code accesses `request.form`, Flask dynamically resolves the request object bound to the active thread or greenlet handling that specific connection.",
    "optionExplanations": {
      "A": "Incorrect. Flask multi-worker/threaded servers handle concurrent requests simultaneously.",
      "B": "Correct. Context locals isolate request data per thread/task, providing thread-safe global access.",
      "C": "Incorrect. No files are generated on disk for requests.",
      "D": "Incorrect. Browsers never send Python source code."
    },
    "practicalExample": "Two users submitting forms at the exact same millisecond will each read their own form data from `request.form`."
  },
  {
    "id": "u3_09",
    "module": 3,
    "topic": "Reading POST Data",
    "difficulty": "Easy",
    "question": "Which attribute of the `request` object is used to access form fields submitted via an HTTP POST request?",
    "codeSnippet": null,
    "options": [
      "request.query",
      "request.args",
      "request.form",
      "request.body_json"
    ],
    "correctAnswer": 2,
    "correctExplanation": "`request.form` contains parsed form data parsed from the POST request body.",
    "optionExplanations": {
      "A": "Incorrect. `request.query` does not exist in Flask.",
      "B": "Incorrect. `request.args` reads URL query string parameters (GET).",
      "C": "Correct. `request.form` holds submitted form field key-value pairs.",
      "D": "Incorrect. JSON payloads use `request.get_json()`."
    },
    "practicalExample": "`username = request.form['username']` retrieves the value from `<input name=\"username\">`."
  },
  {
    "id": "u3_10",
    "module": 3,
    "topic": "request.form vs request.form.get()",
    "difficulty": "Medium",
    "question": "What is the critical difference between `request.form['email']` and `request.form.get('email')`?",
    "codeSnippet": null,
    "options": [
      "`request.form['email']` works for GET requests, while `request.form.get()` works for POST requests",
      "If the 'email' field was not submitted, `request.form['email']` raises a `BadRequestKeyError` (resulting in a 400 Bad Request error), whereas `request.form.get('email')` safely returns `None` or a specified default",
      "`request.form.get('email')` encrypts the value, while square brackets do not",
      "There is no difference; both produce identical exceptions"
    ],
    "correctAnswer": 1,
    "correctExplanation": "`request.form` behaves like a Python dictionary. Accessing a missing key via `['key']` raises a `KeyError` (subclassed by Werkzeug as `BadRequestKeyError`, triggering an HTTP 400). Using `.get('key')` safely returns `None` or an optional fallback value without crashing.",
    "optionExplanations": {
      "A": "Incorrect. Both operate on POST form data.",
      "B": "Correct. Direct bracket access crashes on missing keys with 400 Bad Request; `.get()` provides safe fallback handling.",
      "C": "Incorrect. Neither method encrypts data.",
      "D": "Incorrect. The difference in error handling is fundamental in web development."
    },
    "practicalExample": "`email = request.form.get('email', '')` safely defaults to an empty string if the field was omitted."
  },
  {
    "id": "u3_11",
    "module": 3,
    "topic": "Reading Query Parameters",
    "difficulty": "Easy",
    "question": "Which `request` attribute is used to read URL query string parameters (e.g. from `/search?q=python&page=1`)?",
    "codeSnippet": null,
    "options": [
      "request.form",
      "request.args",
      "request.params",
      "request.url_vars"
    ],
    "correctAnswer": 1,
    "correctExplanation": "`request.args` parses the query string from the URL into a dictionary-like data structure.",
    "optionExplanations": {
      "A": "Incorrect. `request.form` parses the POST body, not the URL query string.",
      "B": "Correct. `request.args` contains key-value pairs from the URL query string.",
      "C": "Incorrect. `request.params` does not exist in Flask.",
      "D": "Incorrect. Not a valid Flask attribute."
    },
    "practicalExample": "For URL `/search?q=flask`, `query = request.args.get('q')` sets `query` to `'flask'`."
  },
  {
    "id": "u3_12",
    "module": 3,
    "topic": "request.args Fallback",
    "difficulty": "Medium",
    "question": "What will `query` contain if the user visits `/search` without any query string, given this code?",
    "codeSnippet": "@app.route('/search')\ndef search():\n    query = request.args.get('q', 'all')\n    return f'Searching for {query}'",
    "options": [
      "None",
      "An HTTP 400 Bad Request error",
      "'all'",
      "An empty string ''"
    ],
    "correctAnswer": 2,
    "correctExplanation": "The second parameter of `.get(key, default)` specifies the fallback value if the key is missing from the query string. Since `'q'` is absent, it returns `'all'`.",
    "optionExplanations": {
      "A": "Incorrect. `None` is only returned if no second argument is provided to `.get()`.",
      "B": "Incorrect. `.get()` prevents 400 errors.",
      "C": "Correct. The specified default `'all'` is returned.",
      "D": "Incorrect. The default was explicitly set to `'all'`."
    },
    "practicalExample": "Provides default pagination: `page = request.args.get('page', 1, type=int)` defaults to page 1."
  },
  {
    "id": "u3_13",
    "module": 3,
    "topic": "ImmutableMultiDict",
    "difficulty": "Hard",
    "question": "What Python data structure type does Flask use for `request.form` and `request.args`?",
    "codeSnippet": null,
    "options": [
      "A standard mutable Python `dict`",
      "Werkzeug's `ImmutableMultiDict`",
      "A Python `tuple`",
      "An SQLite cursor object"
    ],
    "correctAnswer": 1,
    "correctExplanation": "`request.form` and `request.args` are instances of Werkzeug's `ImmutableMultiDict`. It is a dictionary subclass that can hold multiple values for the same key (like checkboxes) and is immutable to prevent accidental tampering.",
    "optionExplanations": {
      "A": "Incorrect. A standard dict can only hold one value per key and is mutable.",
      "B": "Correct. It is an `ImmutableMultiDict`, allowing multiple values per key while preventing in-place mutations.",
      "C": "Incorrect. It has key-value mapping capabilities, unlike tuples.",
      "D": "Incorrect. It is not a database cursor."
    },
    "practicalExample": "If you try `request.form['name'] = 'New'`, Python raises `TypeError: 'ImmutableMultiDict' objects are immutable`."
  },
  {
    "id": "u3_14",
    "module": 3,
    "topic": "Checkboxes & Multi-Select",
    "difficulty": "Medium",
    "question": "If a form has multiple checkboxes sharing the exact same name attribute (e.g. `name=\"skills\"`), how should you retrieve ALL selected values as a list in Flask?",
    "codeSnippet": "<input type=\"checkbox\" name=\"skills\" value=\"Python\">\n<input type=\"checkbox\" name=\"skills\" value=\"Flask\">\n<input type=\"checkbox\" name=\"skills\" value=\"SQL\">",
    "options": [
      "request.form['skills']",
      "request.form.get('skills')",
      "request.form.getlist('skills')",
      "request.form.all('skills')"
    ],
    "correctAnswer": 2,
    "correctExplanation": "Because `request.form` is an `ImmutableMultiDict`, calling `.get('skills')` or `['skills']` returns only the last selected value. Calling `.getlist('skills')` returns a Python list of all checked values (e.g. `['Python', 'Flask']`).",
    "optionExplanations": {
      "A": "Incorrect. Returns only the last checked item.",
      "B": "Incorrect. `.get()` only returns a single value (the last one).",
      "C": "Correct. `.getlist('key')` returns all submitted values for that key as a Python list.",
      "D": "Incorrect. `.all()` is not a method on `ImmutableMultiDict`."
    },
    "practicalExample": "`selected_skills = request.form.getlist('skills')` produces `['Python', 'Flask', 'SQL']` if all three are checked."
  },
  {
    "id": "u3_15",
    "module": 3,
    "topic": "HTTP Method Branching",
    "difficulty": "Easy",
    "question": "What is the standard, idiomatic way to distinguish between displaying a blank form and processing submitted data inside a dual-method route?",
    "codeSnippet": "@app.route('/register', methods=['GET', 'POST'])\ndef register():\n    if request.method == 'POST':\n        # process form\n    return render_template('register.html')",
    "options": [
      "By checking `if request.method == 'POST':`",
      "By checking `if len(request.data) > 0:`",
      "By checking `if app.debug == True:`",
      "By creating two completely separate Python files"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Checking `if request.method == 'POST':` is the universal Flask pattern to branch execution between processing submitted data and rendering the initial GET template.",
    "optionExplanations": {
      "A": "Correct. `request.method` returns the HTTP verb as an uppercase string ('GET', 'POST', etc.).",
      "B": "Incorrect. `request.data` is not reliable for URL-encoded forms.",
      "C": "Incorrect. Debug mode is unrelated to HTTP methods.",
      "D": "Incorrect. Single routes with method branching are clean and standard."
    },
    "practicalExample": "GET renders the empty registration form; POST reads input, validates it, and saves the user."
  },
  {
    "id": "u3_16",
    "module": 3,
    "topic": "request.values",
    "difficulty": "Medium",
    "question": "What does Flask's `request.values` property contain?",
    "codeSnippet": null,
    "options": [
      "Only the cookies sent by the browser",
      "A combined `CombinedMultiDict` containing both `request.args` (query string) and `request.form` (POST body)",
      "A list of all database values in the system",
      "The HTTP response headers returned to the client"
    ],
    "correctAnswer": 1,
    "correctExplanation": "`request.values` merges both query string parameters (`args`) and form body parameters (`form`) into a single read-only combined dictionary.",
    "optionExplanations": {
      "A": "Incorrect. Cookies are accessed via `request.cookies`.",
      "B": "Correct. `request.values` combines both `args` and `form`.",
      "C": "Incorrect. It has no connection to database tables.",
      "D": "Incorrect. These are incoming request parameters, not response headers."
    },
    "practicalExample": "If an endpoint accepts parameters via either URL query or form body interchangeably, `request.values.get('id')` handles both."
  },
  {
    "id": "u3_17",
    "module": 3,
    "topic": "request Attributes",
    "difficulty": "Easy",
    "question": "Which `request` attribute provides the client IP address making the connection?",
    "codeSnippet": null,
    "options": [
      "request.remote_addr",
      "request.client_ip",
      "request.ip_address",
      "request.network_id"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`request.remote_addr` holds the IP address of the client (or the closest proxy) that sent the request.",
    "optionExplanations": {
      "A": "Correct. `request.remote_addr` is the standard attribute for client IP.",
      "B": "Incorrect. Not a Flask property.",
      "C": "Incorrect. Not a Flask property.",
      "D": "Incorrect. Fabricated name."
    },
    "practicalExample": "`print(f'Login attempt from {request.remote_addr}')` logs the client IP for security audits."
  },
  {
    "id": "u3_18",
    "module": 3,
    "topic": "File Upload Requirements",
    "difficulty": "Easy",
    "question": "Which attribute MUST be present on an HTML `<form>` tag to enable successful file uploads to a Flask backend?",
    "codeSnippet": "<form action=\"/upload\" method=\"POST\" _________>\n    <input type=\"file\" name=\"resume\">\n</form>",
    "options": [
      "enctype=\"multipart/form-data\"",
      "enctype=\"application/x-www-form-urlencoded\"",
      "upload=\"enabled\"",
      "type=\"binary\""
    ],
    "correctAnswer": 0,
    "correctExplanation": "By default, forms encode data as `application/x-www-form-urlencoded`, which cannot transmit binary file content. The attribute `enctype=\"multipart/form-data\"` is required so the browser sends binary file segments.",
    "optionExplanations": {
      "A": "Correct. `enctype=\"multipart/form-data\"` instructs the browser to package binary files properly.",
      "B": "Incorrect. `application/x-www-form-urlencoded` is the default text encoding, which breaks file uploads.",
      "C": "Incorrect. Not a valid HTML attribute.",
      "D": "Incorrect. Not a valid HTML form attribute."
    },
    "practicalExample": "If you omit `enctype=\"multipart/form-data\"`, `request.files` will be empty on the server."
  },
  {
    "id": "u3_19",
    "module": 3,
    "topic": "Handling Uploaded Files",
    "difficulty": "Easy",
    "question": "Which `request` attribute contains uploaded file objects sent via `enctype=\"multipart/form-data\"`?",
    "codeSnippet": null,
    "options": [
      "request.form",
      "request.data",
      "request.files",
      "request.attachments"
    ],
    "correctAnswer": 2,
    "correctExplanation": "Uploaded files are parsed by Flask into the `request.files` dictionary, where each key corresponds to the input field's `name` attribute.",
    "optionExplanations": {
      "A": "Incorrect. `request.form` holds text inputs, not uploaded file data.",
      "B": "Incorrect. `request.data` contains raw unparsed bytes.",
      "C": "Correct. `request.files` contains all uploaded files mapped by field name.",
      "D": "Incorrect. `request.attachments` does not exist in Flask."
    },
    "practicalExample": "For `<input type=\"file\" name=\"avatar\">`, access it via `file = request.files.get('avatar')`."
  },
  {
    "id": "u3_20",
    "module": 3,
    "topic": "FileStorage Object",
    "difficulty": "Medium",
    "question": "What type of object does `request.files['resume']` return in Flask?",
    "codeSnippet": null,
    "options": [
      "A raw Python string containing the file path on the client's PC",
      "A Werkzeug `FileStorage` object wrapper",
      "An open SQLite database connection",
      "A base64 encoded JSON string"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Flask wraps uploaded files inside Werkzeug's `FileStorage` class. It behaves like a standard Python file object with additional helper attributes (such as `filename`, `content_type`, and `save()`).",
    "optionExplanations": {
      "A": "Incorrect. Browsers never send client absolute file paths for security reasons.",
      "B": "Correct. It returns a Werkzeug `FileStorage` object.",
      "C": "Incorrect. It is not a database connection.",
      "D": "Incorrect. It is a binary stream wrapper, not base64 JSON."
    },
    "practicalExample": "`file.filename` gives the original filename, and `file.save('uploads/doc.pdf')` writes it to disk."
  },
  {
    "id": "u3_21",
    "module": 3,
    "topic": "Saving Uploaded Files",
    "difficulty": "Easy",
    "question": "Which method on a `FileStorage` object permanently writes the uploaded file to a specified path on the server disk?",
    "codeSnippet": "file = request.files['document']",
    "options": [
      "file.write_to_disk(path)",
      "file.save(destination_path)",
      "file.persist(destination_path)",
      "file.download(destination_path)"
    ],
    "correctAnswer": 1,
    "correctExplanation": "The `save()` method on the `FileStorage` object takes a target destination filesystem path and streams the file data directly onto the server disk.",
    "optionExplanations": {
      "A": "Incorrect. Method does not exist.",
      "B": "Correct. `file.save(destination_path)` is the standard Werkzeug method to store files.",
      "C": "Incorrect. Not a valid method.",
      "D": "Incorrect. Not a valid method."
    },
    "practicalExample": "`file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))`."
  },
  {
    "id": "u3_22",
    "module": 3,
    "topic": "File Upload Security",
    "difficulty": "Medium",
    "question": "Why is directly saving an uploaded file using its original `file.filename` considered a dangerous security vulnerability?",
    "codeSnippet": "# VULNERABLE CODE:\nfile.save(os.path.join('/var/www/uploads', file.filename))",
    "options": [
      "Because Python refuses to save files with lowercase extensions",
      "An attacker can craft a malicious filename like `../../../../etc/passwd` to overwrite critical system files via Directory Traversal",
      "Because original filenames automatically delete database records",
      "Because the browser crashes if original names are preserved"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Malicious users can forge filenames containing relative path traversal sequences (`../../`). If passed directly to `os.path.join()`, it can navigate outside the upload directory and overwrite system binaries, configuration files, or source code.",
    "optionExplanations": {
      "A": "Incorrect. Python handles any file casing.",
      "B": "Correct. Prevents Directory / Path Traversal attacks that overwrite sensitive server files.",
      "C": "Incorrect. Filenames do not execute SQL queries automatically.",
      "D": "Incorrect. The browser is unaffected; the server is compromised."
    },
    "practicalExample": "A filename `../../app.py` could replace your server's application code with malicious attacker code."
  },
  {
    "id": "u3_23",
    "module": 3,
    "topic": "secure_filename Utility",
    "difficulty": "Easy",
    "question": "Which utility function from Werkzeug sanitizes untrusted filenames before saving them to the server filesystem?",
    "codeSnippet": null,
    "options": [
      "clean_file_path()",
      "secure_filename()",
      "sanitize_file()",
      "safe_name()"
    ],
    "correctAnswer": 1,
    "correctExplanation": "`from werkzeug.utils import secure_filename` provides `secure_filename()`, which strips path separators (`/`, `\\`), control characters, and dangerous sequences, returning a safe ASCII-only filename.",
    "optionExplanations": {
      "A": "Incorrect. Not a Werkzeug function.",
      "B": "Correct. `from werkzeug.utils import secure_filename` is the recommended security function.",
      "C": "Incorrect. Not a Werkzeug function.",
      "D": "Incorrect. Not a Werkzeug function."
    },
    "practicalExample": "`secure_filename('../../../etc/passwd')` transforms into the safe string `'etc_passwd'`."
  },
  {
    "id": "u3_24",
    "module": 3,
    "topic": "File Extension Whitelisting",
    "difficulty": "Medium",
    "question": "What is the recommended approach to validate that an uploaded file is of an allowed type (such as PNG or PDF)?",
    "codeSnippet": "ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'pdf'}\n\ndef allowed_file(filename):\n    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS",
    "options": [
      "Trust whatever the client browser claims in the file header without checking",
      "Maintain a strict whitelist of permitted extensions and verify that the file's extension matches the whitelist",
      "Allow all file types including `.exe`, `.sh`, and `.php` without restrictions",
      "Check only the first letter of the filename"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Security best practices require maintaining a strict extension whitelist (e.g. `{'png', 'jpg', 'pdf'}`) and verifying that the submitted filename contains an allowed extension before saving.",
    "optionExplanations": {
      "A": "Incorrect. Client headers can easily be forged with tools like Postman or curl.",
      "B": "Correct. Whitelisting safe file extensions prevents executable code execution on the server.",
      "C": "Incorrect. Allowing `.exe` or `.php` enables Remote Code Execution (RCE).",
      "D": "Incorrect. First letters give no information about file format."
    },
    "practicalExample": "If someone attempts to upload `exploit.php`, `allowed_file('exploit.php')` returns `False` and rejects the upload."
  },
  {
    "id": "u3_25",
    "module": 3,
    "topic": "File Size Limitation",
    "difficulty": "Medium",
    "question": "How can you restrict the maximum allowed upload payload size in Flask to 16 Megabytes?",
    "codeSnippet": null,
    "options": [
      "app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024",
      "app.config['MAX_FILE_SIZE'] = '16MB'",
      "file.limit(16)",
      "request.set_max_bytes(16000000)"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Setting `app.config['MAX_CONTENT_LENGTH']` to the maximum number of bytes (e.g. `16 * 1024 * 1024` for 16 MB) causes Flask to automatically abort incoming requests that exceed this limit.",
    "optionExplanations": {
      "A": "Correct. `MAX_CONTENT_LENGTH` defines the maximum allowed request body size in bytes.",
      "B": "Incorrect. Flask does not use `MAX_FILE_SIZE` or string descriptors like `'16MB'`.",
      "C": "Incorrect. FileStorage has no `.limit()` method.",
      "D": "Incorrect. Not a valid method on `request`."
    },
    "practicalExample": "Protects your server against Denial of Service (DoS) attacks caused by users uploading multi-gigabyte files."
  },
  {
    "id": "u3_26",
    "module": 3,
    "topic": "HTTP Status Code 413",
    "difficulty": "Hard",
    "question": "What HTTP error code does Flask return if a client attempts to upload a file larger than `app.config['MAX_CONTENT_LENGTH']`?",
    "codeSnippet": null,
    "options": [
      "400 Bad Request",
      "404 Not Found",
      "413 Request Entity Too Large (Payload Too Large)",
      "502 Bad Gateway"
    ],
    "correctAnswer": 2,
    "correctExplanation": "When the incoming HTTP request body exceeds `MAX_CONTENT_LENGTH`, Flask automatically raises a `RequestEntityTooLarge` exception, which translates to HTTP status code 413.",
    "optionExplanations": {
      "A": "Incorrect. 400 is for malformed syntax or missing required fields.",
      "B": "Incorrect. 404 is for non-existent routes.",
      "C": "Correct. 413 Payload Too Large / Request Entity Too Large is standard when upload limits are exceeded.",
      "D": "Incorrect. 502 indicates proxy gateway communication failures."
    },
    "practicalExample": "You can register `@app.errorhandler(413)` to return a friendly user message: 'File is too large! Maximum 16 MB allowed.'"
  },
  {
    "id": "u3_27",
    "module": 3,
    "topic": "Validation Philosophy",
    "difficulty": "Medium",
    "question": "Why is client-side validation (HTML5 attributes like `required` or JS checks) NOT sufficient for securing a web application?",
    "codeSnippet": null,
    "options": [
      "Because client-side validation only works on Apple computers",
      "Because client-side validation can be effortlessly bypassed using curl, Postman, browser dev tools, or by disabling JavaScript; only server-side validation is trustworthy",
      "Because HTML5 attributes cause SQL databases to freeze",
      "Because client-side validation is slower than server-side validation"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Client-side validation provides a smooth user experience (instant alerts), but provides zero security because an attacker can bypass the browser entirely and send raw HTTP requests directly to your Flask endpoints.",
    "optionExplanations": {
      "A": "Incorrect. HTML5 attributes work across all standard modern browsers.",
      "B": "Correct. Any client check can be bypassed in seconds using command-line tools or developer consoles. Server-side validation is non-negotiable.",
      "C": "Incorrect. Browser validation attributes have no impact on SQL engines.",
      "D": "Incorrect. Client checks are instant and don't require network round-trips."
    },
    "practicalExample": "An attacker can open Postman and submit an empty string for `username` even if your HTML has `<input required>`."
  },
  {
    "id": "u3_28",
    "module": 3,
    "topic": "Server-Side Validation Workflow",
    "difficulty": "Medium",
    "question": "Examine this validation snippet:\nWhat is the purpose of `.strip()` when retrieving form values?",
    "codeSnippet": "username = request.form.get('username', '').strip()",
    "options": [
      "It converts text to uppercase",
      "It removes leading and trailing whitespace characters so inputs containing only blank spaces are treated as empty",
      "It strips away HTML stylesheets",
      "It encrypts the username"
    ],
    "correctAnswer": 1,
    "correctExplanation": "`.strip()` removes leading and trailing spaces, tabs, and newlines. This ensures that a user who submits only spaces (`\"   \"`) will be caught by `if not username:` checks as an empty field.",
    "optionExplanations": {
      "A": "Incorrect. Uppercase conversion uses `.upper()`.",
      "B": "Correct. Removes accidental or deceptive leading/trailing whitespaces.",
      "C": "Incorrect. Has nothing to do with CSS.",
      "D": "Incorrect. Stripping is not encryption."
    },
    "practicalExample": "`'  rahul  '.strip()` evaluates to `'rahul'`; `'   '.strip()` evaluates to `''`."
  },
  {
    "id": "u3_29",
    "module": 3,
    "topic": "Server-Side Validation Workflow",
    "difficulty": "Medium",
    "question": "What is the recommended way to handle validation failures when processing a form submission?",
    "codeSnippet": null,
    "options": [
      "Immediately crash the server using `sys.exit()`",
      "Collect error messages in a list or flash message, re-render the form template passing the errors and previously entered data so the user can correct their input",
      "Permanently ban the user's IP address on the first typo",
      "Delete the user's account from the database"
    ],
    "correctAnswer": 1,
    "correctExplanation": "When server validation fails, the application should aggregate the error messages and re-render the template with the error list and previous form values populated, giving the user clear guidance on how to fix their mistakes.",
    "optionExplanations": {
      "A": "Incorrect. Crashing the server brings down the application for all users.",
      "B": "Correct. Re-render the form with error feedback and preserved fields for good user experience.",
      "C": "Incorrect. Draconian and bad for usability.",
      "D": "Incorrect. Validation failures shouldn't delete existing accounts."
    },
    "practicalExample": "`return render_template('register.html', errors=errors, username=username)`."
  },
  {
    "id": "u3_30",
    "module": 3,
    "topic": "Post/Redirect/Get Pattern",
    "difficulty": "Hard",
    "question": "Why should a successful POST form submission ALWAYS redirect (`return redirect('/success')`) instead of rendering a template directly (`return render_template('success.html')`)?",
    "codeSnippet": null,
    "options": [
      "Because Flask forbids rendering templates inside POST requests",
      "To implement the Post/Redirect/Get (PRG) pattern, preventing accidental duplicate form submissions if the user clicks the browser 'Refresh' button",
      "Because redirects run 10 times faster than rendering templates",
      "Because browsers cannot display HTML after a POST request"
    ],
    "correctAnswer": 1,
    "correctExplanation": "The Post/Redirect/Get (PRG) design pattern ensures that after a successful POST request modifies server state, a 302 redirect sends the browser to a GET endpoint. If the user hits Refresh (F5), the browser re-executes the harmless GET request rather than resubmitting the form (e.g. charging a credit card twice).",
    "optionExplanations": {
      "A": "Incorrect. Flask allows rendering templates inside POST, but it causes the duplicate submission hazard.",
      "B": "Correct. The PRG pattern avoids the annoying 'Confirm Form Resubmission' popup and duplicate transactions.",
      "C": "Incorrect. Redirects require an additional network round-trip, not faster execution.",
      "D": "Incorrect. Browsers can display HTML from POST, but user experience and data safety suffer on refresh."
    },
    "practicalExample": "In an e-commerce checkout: POST `/charge` -> 302 Redirect -> GET `/order-confirmation`."
  },
  {
    "id": "u3_31",
    "module": 3,
    "topic": "redirect() Function",
    "difficulty": "Easy",
    "question": "Which Flask function is imported to redirect a client to another URL?",
    "codeSnippet": null,
    "options": [
      "from flask import redirect",
      "from flask import navigate",
      "from flask import forward",
      "from flask import switch_to"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`from flask import redirect` imports the helper that constructs an HTTP redirect response (default 302 Found).",
    "optionExplanations": {
      "A": "Correct. `redirect('/target-url')` sends an HTTP 302 redirect.",
      "B": "Incorrect. `navigate` does not exist in Flask.",
      "C": "Incorrect. `forward` is Java Servlets, not Flask.",
      "D": "Incorrect. `switch_to` is Selenium, not Flask."
    },
    "practicalExample": "`return redirect(url_for('home'))` redirects the user back to the home page."
  },
  {
    "id": "u3_32",
    "module": 3,
    "topic": "Redirect Status Codes",
    "difficulty": "Medium",
    "question": "What is the default HTTP status code returned by `redirect('/dashboard')` in Flask?",
    "codeSnippet": null,
    "options": [
      "200 OK",
      "301 Moved Permanently",
      "302 Found (Temporary Redirect)",
      "404 Not Found"
    ],
    "correctAnswer": 2,
    "correctExplanation": "Flask's `redirect(location, code=302)` defaults to HTTP status code 302 Found, indicating a temporary redirect.",
    "optionExplanations": {
      "A": "Incorrect. 200 signifies success without redirection.",
      "B": "Incorrect. 301 is permanent redirect and must be explicitly set: `redirect('/new', code=301)`.",
      "C": "Correct. 302 Found is Flask's default redirect code.",
      "D": "Incorrect. 404 is Not Found."
    },
    "practicalExample": "`return redirect('/login')` emits `HTTP/1.1 302 Found` with `Location: /login` header."
  },
  {
    "id": "u3_33",
    "module": 3,
    "topic": "request.is_json Property",
    "difficulty": "Medium",
    "question": "How can a Flask route check whether an incoming HTTP request contains a JSON payload rather than standard HTML form data?",
    "codeSnippet": null,
    "options": [
      "if request.is_json:",
      "if request.type == 'json':",
      "if json.check(request):",
      "if request.args.has_key('json'):"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`request.is_json` is a boolean property in Flask that inspects the `Content-Type` header to see if it matches `application/json`.",
    "optionExplanations": {
      "A": "Correct. `request.is_json` evaluates to True when `Content-Type` is JSON.",
      "B": "Incorrect. Not a valid Flask property.",
      "C": "Incorrect. Python's `json` module has no `check` method.",
      "D": "Incorrect. `has_key` is deprecated Python 2 and not how request content type is evaluated."
    },
    "practicalExample": "`if request.is_json: data = request.get_json()` allows dual API/Web endpoints."
  },
  {
    "id": "u3_34",
    "module": 3,
    "topic": "File Storage Filename Property",
    "difficulty": "Easy",
    "question": "If a user uploads a resume named `my_resume.pdf`, what does `request.files['resume'].filename` return?",
    "codeSnippet": null,
    "options": [
      "The full binary content of the PDF file",
      "The client-provided filename string: `'my_resume.pdf'`",
      "A randomly generated 64-character hash",
      "The word 'True'"
    ],
    "correctAnswer": 1,
    "correctExplanation": "The `filename` attribute of a `FileStorage` object contains the name of the file submitted by the client browser as a plain string.",
    "optionExplanations": {
      "A": "Incorrect. File contents are read using `.read()`.",
      "B": "Correct. `.filename` returns the name string: `'my_resume.pdf'`.",
      "C": "Incorrect. Flask does not automatically hash filenames unless you program it to.",
      "D": "Incorrect. It returns a string, not a boolean."
    },
    "practicalExample": "`if file.filename == '': flash('No file selected')` checks if the user submitted without picking a file."
  },
  {
    "id": "u3_35",
    "module": 3,
    "topic": "Empty File Upload Detection",
    "difficulty": "Medium",
    "question": "What happens if a user submits an HTML form with `<input type=\"file\" name=\"doc\">` without selecting any file on their computer?",
    "codeSnippet": null,
    "options": [
      "The browser crashes immediately",
      "Flask still receives an entry in `request.files`, but `file.filename` is an empty string `''`",
      "`request.files` is completely empty with no keys",
      "The operating system creates a 0-byte file named `None.txt`"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Browsers still submit an empty file field part when the input is present. Therefore, `request.files['doc']` exists, but its `filename` property equals the empty string `''`.",
    "optionExplanations": {
      "A": "Incorrect. Browsers submit empty multipart headers normally.",
      "B": "Correct. `file` exists but `file.filename == ''`. Always test `if file.filename == '':`.",
      "C": "Incorrect. The field key exists in `request.files`.",
      "D": "Incorrect. No file is created on the OS."
    },
    "practicalExample": "Always check: `if 'doc' not in request.files or request.files['doc'].filename == '': return 'No file selected'`."
  },
  {
    "id": "u3_36",
    "module": 3,
    "topic": "request.cookies",
    "difficulty": "Medium",
    "question": "How do you read a cookie named `theme_preference` sent by the browser in Flask?",
    "codeSnippet": null,
    "options": [
      "theme = request.cookies.get('theme_preference', 'light')",
      "theme = response.get_cookie('theme_preference')",
      "theme = session.cookies['theme_preference']",
      "theme = request.args['cookie_theme']"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`request.cookies` is a dictionary containing all cookies transmitted in the HTTP request headers. Using `.get('cookie_name', default)` safely retrieves the value.",
    "optionExplanations": {
      "A": "Correct. `request.cookies.get('name')` reads incoming cookies from the browser.",
      "B": "Incorrect. Cookies are read on `request`, not `response`.",
      "C": "Incorrect. `session` manages encrypted sessions, not raw cookies directly.",
      "D": "Incorrect. `request.args` reads the query string, not cookies."
    },
    "practicalExample": "Used to restore user interface preferences before rendering the page."
  },
  {
    "id": "u3_37",
    "module": 3,
    "topic": "Setting Cookies",
    "difficulty": "Hard",
    "question": "How do you SET a cookie on the client browser in a Flask view function?",
    "codeSnippet": null,
    "options": [
      "request.set_cookie('theme', 'dark')",
      "Create a response object first (e.g. using `make_response()`), call `resp.set_cookie('theme', 'dark')`, and return `resp`",
      "session['cookie'] = 'theme:dark'",
      "Cookies can only be set by writing JavaScript in the browser"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Cookies are delivered to the client via HTTP response headers (`Set-Cookie`). Therefore, you must create a Response object, call `.set_cookie()` on it, and return that response object.",
    "optionExplanations": {
      "A": "Incorrect. `request` is incoming and read-only; cookies are set on the outgoing `response`.",
      "B": "Correct. `resp = make_response(render_template(...)); resp.set_cookie('theme', 'dark'); return resp`.",
      "C": "Incorrect. `session` is for signed session state.",
      "D": "Incorrect. Web servers routinely set cookies via HTTP headers."
    },
    "practicalExample": "```python\nresp = make_response(redirect('/dashboard'))\nresp.set_cookie('theme', 'dark', max_age=60*60*24*30)\nreturn resp\n```"
  },
  {
    "id": "u3_38",
    "module": 3,
    "topic": "request.headers",
    "difficulty": "Medium",
    "question": "Which `request` attribute contains incoming HTTP headers like `User-Agent` and `Authorization`?",
    "codeSnippet": null,
    "options": [
      "request.headers",
      "request.meta",
      "request.http_headers",
      "request.env"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`request.headers` exposes all HTTP headers sent by the client. It is case-insensitive (e.g. `request.headers.get('User-Agent')`).",
    "optionExplanations": {
      "A": "Correct. `request.headers` contains all incoming HTTP request headers.",
      "B": "Incorrect. Django uses `request.META`; Flask uses `request.headers`.",
      "C": "Incorrect. Not a Flask attribute.",
      "D": "Incorrect. WSGI environment is in `request.environ`."
    },
    "practicalExample": "`user_agent = request.headers.get('User-Agent')` identifies the client's browser and operating system."
  },
  {
    "id": "u3_39",
    "module": 3,
    "topic": "Integer Conversion in request.args",
    "difficulty": "Medium",
    "question": "How can you read a query parameter `page` and automatically convert it to an integer, falling back to 1 if missing or non-numeric?",
    "codeSnippet": null,
    "options": [
      "page = request.args.get('page', default=1, type=int)",
      "page = int(request.args['page'])",
      "page = request.args.to_int('page', 1)",
      "page = request.get_int('page')"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Werkzeug's `.get()` accepts a `type` callable argument. Calling `request.args.get('page', default=1, type=int)` automatically converts `'2'` to `2`, and returns `default=1` if the key is missing or cannot be parsed as an int.",
    "optionExplanations": {
      "A": "Correct. `request.args.get('page', 1, type=int)` is the built-in, exception-safe conversion method.",
      "B": "Incorrect. Calling `int(...)` directly raises a `ValueError` if the value is non-numeric, and a `KeyError` if missing.",
      "C": "Incorrect. `to_int()` is not a valid method.",
      "D": "Incorrect. `request.get_int()` does not exist."
    },
    "practicalExample": "If a user visits `/products?page=abc`, `type=int` safely defaults `page` to `1` without raising a 500 error."
  },
  {
    "id": "u3_40",
    "module": 3,
    "topic": "request.path vs request.url",
    "difficulty": "Medium",
    "question": "If a client visits `http://127.0.0.1:5000/search?q=flask`, what do `request.path` and `request.url` return respectively?",
    "codeSnippet": null,
    "options": [
      "`request.path` returns `'/search'`; `request.url` returns `'http://127.0.0.1:5000/search?q=flask'`",
      "`request.path` returns `'http://127.0.0.1:5000'`; `request.url` returns `'/search'`",
      "Both return `'/search'`",
      "Both return `'http://127.0.0.1:5000/search?q=flask'`"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`request.path` contains only the endpoint path (`/search`), excluding the scheme, host, and query string. `request.url` provides the complete, reconstructed URL including protocol, host, port, path, and query parameters.",
    "optionExplanations": {
      "A": "Correct. `request.path` is the resource path (`/search`); `request.url` is the full URL string.",
      "B": "Incorrect. Inverted description.",
      "C": "Incorrect. `request.url` includes the host and query parameters.",
      "D": "Incorrect. `request.path` strips host and query string."
    },
    "practicalExample": "Useful when saving return redirect paths after user authentication."
  },
  {
    "id": "u3_41",
    "module": 3,
    "topic": "Reading Raw Request Body",
    "difficulty": "Hard",
    "question": "Which `request` attribute contains the raw unparsed bytes of the incoming HTTP request body?",
    "codeSnippet": null,
    "options": [
      "request.data",
      "request.raw_stream",
      "request.binary_content",
      "request.payload"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`request.data` contains incoming request data as raw bytes if it was not parsed as form data or files.",
    "optionExplanations": {
      "A": "Correct. `request.data` provides access to raw body byte streams (e.g. for custom webhook payloads).",
      "B": "Incorrect. Not a standard Flask property.",
      "C": "Incorrect. Not a Flask property.",
      "D": "Incorrect. Not a standard Flask property."
    },
    "practicalExample": "Used when receiving cryptographically signed webhooks from payment gateways (Stripe, Razorpay) to verify raw signatures."
  },
  {
    "id": "u3_42",
    "module": 3,
    "topic": "Form Hidden Inputs",
    "difficulty": "Medium",
    "question": "What is an HTML `<input type=\"hidden\" name=\"record_id\" value=\"42\">` commonly used for in Flask applications?",
    "codeSnippet": null,
    "options": [
      "To hide the website from search engines",
      "To pass data (such as record IDs or CSRF tokens) back to the server upon submission without showing an editable field to the user",
      "To encrypt the user's monitor screen",
      "To disable the submit button"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Hidden inputs are not rendered visually on screen by the browser, but their `name` and `value` are submitted in `request.form` like any other field. They commonly hold database primary keys, step counters, or CSRF security tokens.",
    "optionExplanations": {
      "A": "Incorrect. SEO is governed by meta tags and robots.txt.",
      "B": "Correct. Carries non-visible state or security tokens into `request.form` on submission.",
      "C": "Incorrect. No hardware encryption occurs.",
      "D": "Incorrect. Hidden inputs do not disable buttons."
    },
    "practicalExample": "In an edit profile form: `<input type=\"hidden\" name=\"user_id\" value=\"{{ user.id }}\">`."
  },
  {
    "id": "u3_43",
    "module": 3,
    "topic": "Textarea Handling",
    "difficulty": "Easy",
    "question": "How is the content of an HTML `<textarea name=\"feedback\"></textarea>` accessed inside a Flask route?",
    "codeSnippet": null,
    "options": [
      "request.text['feedback']",
      "request.form.get('feedback')",
      "request.area['feedback']",
      "request.files['feedback']"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Textareas submit multi-line text exactly like standard text inputs. Their submitted string is retrieved through `request.form` using the textarea's `name` attribute.",
    "optionExplanations": {
      "A": "Incorrect. `request.text` does not exist.",
      "B": "Correct. `request.form.get('feedback')` retrieves the multi-line string entered by the user.",
      "C": "Incorrect. Not a valid property.",
      "D": "Incorrect. Textareas submit text, not files."
    },
    "practicalExample": "`feedback = request.form.get('feedback', '')`."
  },
  {
    "id": "u3_44",
    "module": 3,
    "topic": "Input Validation Patterns",
    "difficulty": "Medium",
    "question": "Consider this email validation check in Python:\n`if '@' not in email or '.' not in email:`\nWhat type of validation is this?",
    "codeSnippet": null,
    "options": [
      "Hardware layer validation",
      "Server-side business logic validation",
      "Client-side CSS validation",
      "Database disk partition check"
    ],
    "correctAnswer": 1,
    "correctExplanation": "This is server-side validation executed in the Flask Python route to ensure the submitted string conforms to expected basic email format requirements before saving to the database.",
    "optionExplanations": {
      "A": "Incorrect. Not hardware related.",
      "B": "Correct. Server-side validation inspecting form data format in Python.",
      "C": "Incorrect. CSS does not validate data.",
      "D": "Incorrect. Not related to disk partitioning."
    },
    "practicalExample": "Prevents malformed data entries from corrupting your database tables."
  },
  {
    "id": "u3_45",
    "module": 3,
    "topic": "Dedicated Upload Directory",
    "difficulty": "Medium",
    "question": "Why should uploaded files NEVER be saved directly into the application's root directory alongside `app.py`?",
    "codeSnippet": null,
    "options": [
      "Because Flask will delete `app.py` automatically",
      "To prevent uploaded files from overwriting source files, creating directory clutter, or accidentally executing as executable scripts",
      "Because Python can only read files stored in the `C:\\Windows` directory",
      "Because operating systems limit roots to exactly 3 files"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Storing uploads in a dedicated, isolated directory (e.g. `uploads/` or a cloud bucket) prevents accidental overwriting of application code (`app.py`, `config.py`), makes backups easy, and allows web servers to disallow script execution inside upload folders.",
    "optionExplanations": {
      "A": "Incorrect. Flask doesn't auto-delete files.",
      "B": "Correct. Isolates user uploads from application source code and prevents script execution vulnerabilities.",
      "C": "Incorrect. Python can access any authorized folder.",
      "D": "Incorrect. File systems hold millions of files in directories."
    },
    "practicalExample": "Configure: `app.config['UPLOAD_FOLDER'] = os.path.join(basedir, 'uploads')`."
  },
  {
    "id": "u3_46",
    "module": 3,
    "topic": "request.form KeyError Debugging",
    "difficulty": "Medium",
    "question": "A developer runs this code:\n`username = request.form['user']`\nWhen testing with a browser form where the input is `<input name=\"username\">`, Flask crashes with `400 Bad Request: KeyError: 'user'`. What caused this error?",
    "codeSnippet": null,
    "options": [
      "The Flask server ran out of memory",
      "The key `'user'` requested in Python does not match the HTML input's `name` attribute (`'username'`)",
      "The browser is using an unsupported version of HTML",
      "Flask requires passwords to be named 'user'"
    ],
    "correctAnswer": 1,
    "correctExplanation": "The input was given `name=\"username\"`, so the browser submitted `{'username': '...'}`. Trying to access `request.form['user']` looked for a non-existent key `'user'`, raising a `KeyError` that Flask converted into a 400 Bad Request.",
    "optionExplanations": {
      "A": "Incorrect. The crash is a simple key lookup error.",
      "B": "Correct. Key mismatch: the HTML input name (`username`) must match the Python dictionary key (`request.form['username']`).",
      "C": "Incorrect. HTML versions are not the cause.",
      "D": "Incorrect. Variable and input names are developer choices."
    },
    "practicalExample": "Either change HTML to `<input name=\"user\">` or change Python to `request.form.get('username')`."
  },
  {
    "id": "u3_47",
    "module": 3,
    "topic": "File Upload Security",
    "difficulty": "Hard",
    "question": "What does `secure_filename('my photo (1) #final.jpg')` return?",
    "codeSnippet": null,
    "options": [
      "'my photo (1) #final.jpg'",
      "'my_photo_1_final.jpg'",
      "'' (empty string)",
      "None"
    ],
    "correctAnswer": 1,
    "correctExplanation": "`secure_filename()` replaces spaces with underscores and removes special characters like parentheses, hashes, and slashes, returning `'my_photo_1_final.jpg'`.",
    "optionExplanations": {
      "A": "Incorrect. Special characters and spaces are stripped/replaced.",
      "B": "Correct. Spaces become underscores, special symbols are removed, returning clean ASCII.",
      "C": "Incorrect. The filename has valid alphanumeric characters, so it is not empty.",
      "D": "Incorrect. It returns a string, never None."
    },
    "practicalExample": "Ensures the generated filename is filesystem-safe across Windows, Linux, and macOS."
  },
  {
    "id": "u3_48",
    "module": 3,
    "topic": "Client vs Server Validation UX",
    "difficulty": "Medium",
    "question": "What is the primary benefit of retaining client-side HTML5 validation (like `type=\"email\"` or `required`) if server-side validation is already implemented?",
    "codeSnippet": null,
    "options": [
      "Client-side validation protects against SQL injection attacks",
      "It provides instant visual feedback to ordinary users without waiting for a server network round-trip, improving overall User Experience (UX)",
      "It replaces the need for server-side Python code entirely",
      "It automatically logs users into their accounts"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Client-side validation is implemented for User Experience (instant field highlighting, preventing obvious empty submissions before sending requests). Server-side validation is implemented for security and data integrity.",
    "optionExplanations": {
      "A": "Incorrect. Client checks offer no security against malicious attackers.",
      "B": "Correct. Immediate client feedback saves user time and reduces unnecessary server traffic.",
      "C": "Incorrect. Server validation remains essential.",
      "D": "Incorrect. It does not perform logins."
    },
    "practicalExample": "The browser highlights the box in red instantly if you type 'john' into `<input type=\"email\">` without an '@'."
  },
  {
    "id": "u3_49",
    "module": 3,
    "topic": "Radio Button Handling",
    "difficulty": "Easy",
    "question": "How do multiple HTML radio buttons belonging to the same group ensure only ONE option can be selected at a time?",
    "codeSnippet": "<input type=\"radio\" name=\"gender\" value=\"male\">\n<input type=\"radio\" name=\"gender\" value=\"female\">",
    "options": [
      "They must share the exact same `name` attribute",
      "They must have the exact same `value` attribute",
      "They must be wrapped in separate `<form>` tags",
      "They require JavaScript to enforce exclusivity"
    ],
    "correctAnswer": 0,
    "correctExplanation": "In HTML, radio buttons that share the same `name` attribute form a mutually exclusive group. The browser ensures only one radio button in the group is checked, and Flask receives that single selected value in `request.form['gender']`.",
    "optionExplanations": {
      "A": "Correct. Sharing the same `name` attribute binds radio buttons into an exclusive group.",
      "B": "Incorrect. `value` represents the distinct option choice.",
      "C": "Incorrect. Separate forms would break submission.",
      "D": "Incorrect. Browsers handle mutual exclusion natively without JavaScript."
    },
    "practicalExample": "In Flask: `gender = request.form.get('gender')` yields `'male'` or `'female'`."
  },
  {
    "id": "u3_50",
    "module": 3,
    "topic": "Module 3 Summary",
    "difficulty": "Hard",
    "question": "Which of the following summaries accurately reflects all core concepts of Module 3: Forms and Request Handling?",
    "codeSnippet": null,
    "options": [
      "GET passes query data in the URL read via `request.args`; POST passes body data read via `request.form`; file uploads require `enctype=\"multipart/form-data\"` and are accessed via `request.files`; and robust applications must always perform server-side validation and use `secure_filename()` before saving files",
      "Flask forms can only submit data to external PHP scripts",
      "`request.form` and `request.args` can be edited and modified in-place using Python",
      "File uploads in Flask do not require any HTML encoding changes"
    ],
    "correctAnswer": 0,
    "correctExplanation": "This accurately covers the entire module: GET vs POST, `request.args` vs `request.form`, multipart file encoding, `request.files`, `secure_filename()`, and mandatory server-side validation.",
    "optionExplanations": {
      "A": "Correct. Comprehensive and technically precise summary of Module 3.",
      "B": "Incorrect. Flask routes handle form submissions directly in Python.",
      "C": "Incorrect. `request.form` and `args` are immutable.",
      "D": "Incorrect. `multipart/form-data` is mandatory."
    },
    "practicalExample": "These principles form the foundation of interactive web applications in Flask."
  }
];
