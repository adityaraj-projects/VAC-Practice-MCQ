// Module 5: User Authentication and Sessions
// Total Questions: 50
// Auto-generated & Verified Question Bank

window.UNIT5_QUESTIONS = [
  {
    "id": "u5_01",
    "module": 5,
    "topic": "Authentication vs Authorization",
    "difficulty": "Easy",
    "question": "What is the primary difference between Authentication and Authorization?",
    "codeSnippet": null,
    "options": [
      "Authentication verifies WHO the user is (identity), while Authorization verifies WHAT the user is permitted to do (permissions/roles)",
      "Authentication runs on MySQL, while Authorization runs on SQLite",
      "Authentication is for CSS styling, while Authorization is for JavaScript",
      "There is no difference; they are exact synonyms"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Authentication (AuthN) proves user identity (e.g. logging in with username and password). Authorization (AuthZ) verifies access rights and privileges (e.g. checking if a logged-in user has permission to access `/admin`).",
    "optionExplanations": {
      "A": "Correct. Authentication = verifying identity; Authorization = checking permissions and roles.",
      "B": "Incorrect. Both are application-level security concepts independent of database vendor.",
      "C": "Incorrect. Neither is related to frontend styling.",
      "D": "Incorrect. Confusing identity with permissions is a critical security misunderstanding."
    },
    "practicalExample": "Logging in with your student credentials is Authentication; checking if you can edit another student's grade is Authorization."
  },
  {
    "id": "u5_02",
    "module": 5,
    "topic": "Password Security",
    "difficulty": "Easy",
    "question": "Why must user passwords NEVER be stored in plain text in a database table?",
    "codeSnippet": null,
    "options": [
      "Because plain text passwords take up too much disk space in SQLite",
      "If the database is leaked or breached, all user accounts across multiple services are instantly compromised; passwords must be irreversibly hashed with salt",
      "Because Flask raises an automatic SyntaxError if text passwords are saved",
      "Because web browsers refuse to send text passwords to servers"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Storing plaintext passwords is a catastrophic security violation. If the database is compromised via SQL injection, backup leakage, or rogue insider access, attacker access is immediate. Passwords must be hashed using one-way cryptographic algorithms with unique salts.",
    "optionExplanations": {
      "A": "Incorrect. Plain text strings consume very little space; security is the reason.",
      "B": "Correct. One-way hashing ensures leaked database dumps cannot expose raw passwords.",
      "C": "Incorrect. Python does not automatically inspect table values for password syntax.",
      "D": "Incorrect. Browsers submit whatever input the user enters."
    },
    "practicalExample": "A database breach should only expose hashes like `scrypt:32768:8:1$...`, not `mypassword123`."
  },
  {
    "id": "u5_03",
    "module": 5,
    "topic": "Password Hashing with Werkzeug",
    "difficulty": "Easy",
    "question": "Which Werkzeug utility function is used to create a secure cryptographic password hash before saving a user to the database?",
    "codeSnippet": null,
    "options": [
      "from werkzeug.security import generate_password_hash",
      "from flask import make_hash",
      "from hashlib import md5_hash",
      "from auth import encrypt_password"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`generate_password_hash(password)` from `werkzeug.security` securely hashes passwords using modern algorithms (such as scrypt or pbkdf2:sha256) combined with a random cryptographic salt.",
    "optionExplanations": {
      "A": "Correct. `from werkzeug.security import generate_password_hash` is the standard helper in Flask.",
      "B": "Incorrect. `make_hash` does not exist in Flask.",
      "C": "Incorrect. MD5 is cryptographically broken and insecure for passwords.",
      "D": "Incorrect. Not a standard Flask library."
    },
    "practicalExample": "`hashed_pwd = generate_password_hash(form_password)` produces a salted hash string."
  },
  {
    "id": "u5_04",
    "module": 5,
    "topic": "Password Verification with Werkzeug",
    "difficulty": "Easy",
    "question": "Which function compares a plaintext password entered in a login form with the stored hash in the database?",
    "codeSnippet": null,
    "options": [
      "from werkzeug.security import check_password_hash",
      "password == user.password_hash",
      "compare_hash(password, user.password_hash)",
      "user.validate_password(password)"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`check_password_hash(stored_hash, candidate_password)` hashes the candidate password using the same salt and algorithm stored in the hash and safely compares the results in constant time.",
    "optionExplanations": {
      "A": "Correct. `check_password_hash(user.password_hash, password)` returns `True` if valid, `False` otherwise.",
      "B": "Incorrect. Hashes are one-way; comparing raw password directly to hash will always evaluate to `False`.",
      "C": "Incorrect. Not a standard Werkzeug function name.",
      "D": "Incorrect. Not a built-in method unless manually written."
    },
    "practicalExample": "`if check_password_hash(user.password_hash, entered_password): login_user(user)`."
  },
  {
    "id": "u5_05",
    "module": 5,
    "topic": "Cryptographic Salt",
    "difficulty": "Medium",
    "question": "What is the primary role of a 'salt' in password hashing functions?",
    "codeSnippet": null,
    "options": [
      "It makes the database file smaller",
      "It adds a unique random string to the password before hashing, ensuring that two users with identical passwords have completely different hashes, neutralizing Rainbow Table attacks",
      "It allows the administrator to decrypt the password back to plain text",
      "It automatically emails the password to the user"
    ],
    "correctAnswer": 1,
    "correctExplanation": "A cryptographic salt is unique random data appended to passwords before hashing. It prevents attackers from using precomputed lookup tables (Rainbow Tables) to crack passwords and ensures two users with 'password123' generate distinct hashes.",
    "optionExplanations": {
      "A": "Incorrect. Hashes are fixed-length strings.",
      "B": "Correct. Salts defeat precomputed Rainbow Table lookup dictionaries.",
      "C": "Incorrect. Hashes are one-way and cannot be decrypted even with the salt.",
      "D": "Incorrect. Salts do not send emails."
    },
    "practicalExample": "Even if Rahul and Amit both pick `secret123`, their salted hashes will look completely different in the database."
  },
  {
    "id": "u5_06",
    "module": 5,
    "topic": "Flask Sessions",
    "difficulty": "Easy",
    "question": "Why are sessions necessary in web applications?",
    "codeSnippet": null,
    "options": [
      "Because HTTP is a stateless protocol that treats every request as completely independent; sessions allow the server to remember user state across multiple page views",
      "Because computers cannot connect to the internet without a session",
      "Because databases delete all data after every click",
      "Because Python functions cannot return values without a session"
    ],
    "correctAnswer": 0,
    "correctExplanation": "HTTP is stateless: each request has no memory of previous requests. Sessions bridge this gap by persisting client identity, authentication status, and shopping cart items across successive HTTP transactions.",
    "optionExplanations": {
      "A": "Correct. HTTP is stateless; sessions provide persistent conversational state.",
      "B": "Incorrect. Stateless HTTP requests function without sessions.",
      "C": "Incorrect. Databases maintain persistent disk storage.",
      "D": "Incorrect. Python functions return standard objects."
    },
    "practicalExample": "After logging in on `/login`, session data ensures `/dashboard` knows who you are without asking for your password again."
  },
  {
    "id": "u5_07",
    "module": 5,
    "topic": "Flask session Object",
    "difficulty": "Easy",
    "question": "How do you store a value in Flask's session object?",
    "codeSnippet": "from flask import session",
    "options": [
      "session['username'] = 'Nilesh'",
      "session.save_data('username', 'Nilesh')",
      "session.push('Nilesh')",
      "session.write('username=Nilesh')"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Flask's `session` object acts like a standard Python dictionary. Setting `session['key'] = value` stores the value in the active user session.",
    "optionExplanations": {
      "A": "Correct. `session['username'] = 'Nilesh'` is standard dictionary-style assignment.",
      "B": "Incorrect. Method does not exist on `session`.",
      "C": "Incorrect. Not a valid method.",
      "D": "Incorrect. Not a valid method."
    },
    "practicalExample": "In login route: `session['user_id'] = user.id`."
  },
  {
    "id": "u5_08",
    "module": 5,
    "topic": "Removing Session Data",
    "difficulty": "Medium",
    "question": "How do you safely remove a specific key from the session without raising a KeyError if it doesn't exist?",
    "codeSnippet": null,
    "options": [
      "session.delete('username')",
      "session.pop('username', None)",
      "session['username'] = None",
      "del session.username"
    ],
    "correctAnswer": 1,
    "correctExplanation": "`session.pop('username', None)` removes the key if present and safely returns `None` without crashing if the key is already absent.",
    "optionExplanations": {
      "A": "Incorrect. `session.delete()` does not exist.",
      "B": "Correct. `session.pop('key', None)` is the safe, standard Python dictionary removal pattern.",
      "C": "Incorrect. Setting value to None leaves the key present in the session.",
      "D": "Incorrect. Direct `del` raises a KeyError if the key is missing."
    },
    "practicalExample": "In logout route: `session.pop('user_id', None)`."
  },
  {
    "id": "u5_09",
    "module": 5,
    "topic": "app.secret_key",
    "difficulty": "Hard",
    "question": "What happens if a Flask application attempts to use `session['user'] = 'Rahul'` without setting `app.secret_key`?",
    "codeSnippet": "app = Flask(__name__)\n# secret_key omitted\n\n@app.route('/')\ndef index():\n    session['user'] = 'Rahul'",
    "options": [
      "The data is saved into a public text file",
      "Flask raises a `RuntimeError: The session is unavailable because no secret key was set. Set the secret_key on the application to something unique and secret.`",
      "Flask uses the password 'password' automatically",
      "The browser crashes immediately"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Flask requires a secret key to cryptographically sign session cookies. If `app.secret_key` is not configured, attempting to read or write session data raises a `RuntimeError` halting execution.",
    "optionExplanations": {
      "A": "Incorrect. Flask refuses to operate without a secret key.",
      "B": "Correct. Explicit `RuntimeError` is raised warning that no secret key was set.",
      "C": "Incorrect. Flask never guesses or defaults secret keys in production.",
      "D": "Incorrect. Server-side exception occurs; browser receives 500 error."
    },
    "practicalExample": "Always configure: `app.secret_key = 'your-super-secret-key'` or load from environment variables."
  },
  {
    "id": "u5_10",
    "module": 5,
    "topic": "Session Signing vs Encryption",
    "difficulty": "Hard",
    "question": "By default in Flask, how does client-side cookie session storage work under the hood?",
    "codeSnippet": null,
    "options": [
      "Session cookies are encrypted with RSA so nobody can view their text",
      "Session cookies are cryptographically SIGNED using `itsdangerous`, not encrypted; the client can decode and view the payload, but cannot tamper with or modify values without invalidating the cryptographic signature",
      "Sessions are stored in SQLite automatically without cookies",
      "Session data is transmitted via email"
    ],
    "correctAnswer": 1,
    "correctExplanation": "This is a critical Flask concept: default Flask sessions are client-side signed cookies. The data is serialized into base64 JSON and signed with `app.secret_key`. Anyone can inspect the cookie and read `{'username': 'Nilesh'}`, but if they try to tamper with it to become `{'username': 'Admin'}`, the signature check fails and Flask discards it.",
    "optionExplanations": {
      "A": "Incorrect. Flask sessions are signed, not encrypted by default.",
      "B": "Correct. Data is readable by the client, but tampering is prevented by cryptographic signing.",
      "C": "Incorrect. Default sessions are cookie-based, not database-backed.",
      "D": "Incorrect. Sessions travel via HTTP cookie headers."
    },
    "practicalExample": "Never store sensitive secrets like credit card numbers or raw passwords inside Flask's default session cookie, because clients can decode it."
  },
  {
    "id": "u5_11",
    "module": 5,
    "topic": "Session Lifetime",
    "difficulty": "Medium",
    "question": "By default, when does a standard Flask session expire if `session.permanent` is not set to `True`?",
    "codeSnippet": null,
    "options": [
      "After exactly 1 minute",
      "When the user closes their web browser window/process",
      "Never; it remains forever on the client",
      "After every page refresh"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Non-permanent sessions are 'browser session cookies'. The browser deletes them when the browser application is completely closed.",
    "optionExplanations": {
      "A": "Incorrect. Time-based expiration requires permanent session configuration.",
      "B": "Correct. Standard session cookies expire upon browser process termination.",
      "C": "Incorrect. Non-permanent cookies are wiped on browser close.",
      "D": "Incorrect. Sessions persist across page reloads during the active browsing session."
    },
    "practicalExample": "Closing Chrome wipes standard session cookies."
  },
  {
    "id": "u5_12",
    "module": 5,
    "topic": "Permanent Sessions",
    "difficulty": "Medium",
    "question": "How do you make a user's session persist even after they close and re-open their browser for 7 days?",
    "codeSnippet": null,
    "options": [
      "Set `session.permanent = True` and configure `app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)`",
      "Set `session['infinite'] = True`",
      "Ask the user to never shut down their computer",
      "Run a cron job that refreshes the page"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Setting `session.permanent = True` tells Flask to set an explicit expiration date on the session cookie, governed by `app.config['PERMANENT_SESSION_LIFETIME']` (default is 31 days).",
    "optionExplanations": {
      "A": "Correct. `session.permanent = True` combined with `PERMANENT_SESSION_LIFETIME` configures persistent login cookies.",
      "B": "Incorrect. Not a valid Flask configuration.",
      "C": "Incorrect. Unrealistic.",
      "D": "Incorrect. Client-side cron is not a session mechanism."
    },
    "practicalExample": "Used for 'Remember Me' checkboxes during login."
  },
  {
    "id": "u5_13",
    "module": 5,
    "topic": "Cookies vs Sessions",
    "difficulty": "Medium",
    "question": "Which of the following comparisons between Cookies and Sessions is accurate according to the course syllabus?",
    "codeSnippet": null,
    "options": [
      "Cookies: Client storage, managed by browser, useful for UI preferences; Sessions: Server-managed signed state, useful for authentication",
      "Cookies can only hold 5 bytes, while sessions hold 1 Terabyte",
      "Cookies run only on Linux, while sessions run only on Windows",
      "Sessions are publicly editable by users, while cookies cannot be viewed"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Cookies reside directly on the client browser and are suitable for lightweight preferences (e.g. `dark_mode=true`). Sessions represent server-managed authenticated state cryptographically verified by the backend.",
    "optionExplanations": {
      "A": "Correct. Accurately contrasts storage location, purpose, and management.",
      "B": "Incorrect. Standard cookies hold up to 4 KB; sessions depend on storage backend.",
      "C": "Incorrect. Both are OS-agnostic web standards.",
      "D": "Incorrect. Inverted: users cannot modify signed sessions without breaking signatures."
    },
    "practicalExample": "Theme toggle in cookie; logged-in user ID in session."
  },
  {
    "id": "u5_14",
    "module": 5,
    "topic": "Setting Cookies",
    "difficulty": "Medium",
    "question": "Why does setting a cookie in Flask require a response object via `make_response()`?",
    "codeSnippet": "resp = make_response(render_template('index.html'))\nresp.set_cookie('user_pref', 'compact')\nreturn resp",
    "options": [
      "Because cookies travel in HTTP response headers (`Set-Cookie`) from server to browser",
      "Because Flask cannot create HTML without `make_response()`",
      "Because cookies can only be set inside SQLite databases",
      "Because `set_cookie()` is a JavaScript function"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Cookies are instructed to the browser via the HTTP `Set-Cookie` response header. You must attach headers to an outgoing `Response` object before returning it to the client.",
    "optionExplanations": {
      "A": "Correct. Cookies are sent via the HTTP `Set-Cookie` response header.",
      "B": "Incorrect. `render_template()` normally returns a string or response directly.",
      "C": "Incorrect. Cookies are browser artifacts, not SQL records.",
      "D": "Incorrect. `resp.set_cookie()` is a Werkzeug/Python method."
    },
    "practicalExample": "`resp.set_cookie('theme', 'dark', max_age=60*60*24*30)` persists theme for 30 days."
  },
  {
    "id": "u5_15",
    "module": 5,
    "topic": "Flash Messaging",
    "difficulty": "Easy",
    "question": "What is the primary purpose of Flask's 'Flash Messaging' system?",
    "codeSnippet": null,
    "options": [
      "To send high-speed emails to administrators",
      "To provide temporary, one-time notification feedback messages (like 'Login successful!' or 'Invalid password') that appear on the next rendered page and disappear upon subsequent refresh",
      "To run Adobe Flash Player animations in the browser",
      "To flash the computer screen white"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Flash messaging records temporary feedback messages in the session, renders them on the immediate next response, and automatically removes them so they are not displayed again.",
    "optionExplanations": {
      "A": "Incorrect. Emailing requires tools like Flask-Mail.",
      "B": "Correct. Provides ephemeral user feedback messages between HTTP redirects.",
      "C": "Incorrect. Adobe Flash is an obsolete multimedia plugin unrelated to Flask.",
      "D": "Incorrect. No hardware display flashing."
    },
    "practicalExample": "After updating a profile: `flash('Profile updated successfully!', 'success'); return redirect('/profile')`."
  },
  {
    "id": "u5_16",
    "module": 5,
    "topic": "Flash Message Categories",
    "difficulty": "Easy",
    "question": "How do you attach a category such as 'error' or 'danger' when flashing a message?",
    "codeSnippet": null,
    "options": [
      "flash('Invalid password!', category='error')",
      "flash('Invalid password!', 'error')",
      "flash(message='Invalid password!', type='error')",
      "Both A and B are valid"
    ],
    "correctAnswer": 3,
    "correctExplanation": "`flash(message, category)` accepts the category string either positionally as the second argument or as a keyword argument `category='error'`.",
    "optionExplanations": {
      "A": "Valid. Keyword argument syntax is supported.",
      "B": "Valid. Positional argument `flash('msg', 'error')` is standard in course slides.",
      "C": "Incorrect. The parameter name is `category`, not `type`.",
      "D": "Correct. Both A and B are completely valid in Flask."
    },
    "practicalExample": "`flash('Account created successfully!', 'success')`."
  },
  {
    "id": "u5_17",
    "module": 5,
    "topic": "Rendering Flash Messages in Jinja2",
    "difficulty": "Medium",
    "question": "Which Jinja2 function is called in templates to retrieve and iterate through flashed messages with their categories?",
    "codeSnippet": "{% with messages = ________________________ %}\n    {% for category, message in messages %}\n        <div class=\"alert alert-{{ category }}\">{{ message }}</div>\n    {% endfor %}\n{% endwith %}",
    "options": [
      "get_flashed_messages(with_categories=True)",
      "read_flash_messages()",
      "session.get_messages()",
      "flash.all(categories=True)"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`get_flashed_messages(with_categories=True)` pulls the queued messages from the session and returns a list of `(category, message)` tuples.",
    "optionExplanations": {
      "A": "Correct. `get_flashed_messages(with_categories=True)` is the standard Jinja2 helper.",
      "B": "Incorrect. Function does not exist.",
      "C": "Incorrect. Not a valid session method.",
      "D": "Incorrect. Not a valid function."
    },
    "practicalExample": "This standard pattern renders Bootstrap alert banners: `<div class=\"alert alert-{{ category }}\">`."
  },
  {
    "id": "u5_18",
    "module": 5,
    "topic": "Flask-Login Extension",
    "difficulty": "Easy",
    "question": "Which popular Flask extension handles user session management, tracking logged-in users, and logging users in/out?",
    "codeSnippet": null,
    "options": [
      "Flask-Login",
      "Flask-AuthX",
      "Flask-Security-Minimal",
      "Flask-UserPass"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Flask-Login is the de-facto standard authentication management extension for Flask, providing `LoginManager`, `current_user`, `login_user()`, and `@login_required`.",
    "optionExplanations": {
      "A": "Correct. `Flask-Login` is the official extension covered in Module 5.",
      "B": "Incorrect. Not a standard extension.",
      "C": "Incorrect. Not standard.",
      "D": "Incorrect. Fabricated name."
    },
    "practicalExample": "Installation: `pip install flask-login`."
  },
  {
    "id": "u5_19",
    "module": 5,
    "topic": "LoginManager Initialization",
    "difficulty": "Easy",
    "question": "How is Flask-Login initialized and bound to the Flask application object?",
    "codeSnippet": null,
    "options": [
      "login_manager = LoginManager(); login_manager.init_app(app)",
      "app.use(LoginManager)",
      "login = LoginManager.start(app)",
      "Flask.bind(LoginManager)"
    ],
    "correctAnswer": 0,
    "correctExplanation": "You instantiate `LoginManager()` and bind it using either `login_manager.init_app(app)` or `LoginManager(app)`.",
    "optionExplanations": {
      "A": "Correct. Standard extension initialization pattern: `login_manager.init_app(app)`.",
      "B": "Incorrect. `app.use` is Express.js (Node.js) syntax.",
      "C": "Incorrect. Method does not exist.",
      "D": "Incorrect. Invalid syntax."
    },
    "practicalExample": "```python\nlogin_manager = LoginManager()\nlogin_manager.init_app(app)\nlogin_manager.login_view = 'login'\n```"
  },
  {
    "id": "u5_20",
    "module": 5,
    "topic": "login_manager.login_view",
    "difficulty": "Medium",
    "question": "What is the purpose of setting `login_manager.login_view = 'login'`?",
    "codeSnippet": "login_manager.login_view = 'login'",
    "options": [
      "It names the HTML file where login buttons are drawn",
      "It tells Flask-Login which endpoint/view function to redirect unauthorized users to when they try to access a `@login_required` route",
      "It deletes unauthenticated users from the database",
      "It changes the website's default font"
    ],
    "correctAnswer": 1,
    "correctExplanation": "When a guest tries to access a protected route, Flask-Login intercepts the request and redirects them to the endpoint designated by `login_view` (e.g. the view function `def login():`).",
    "optionExplanations": {
      "A": "Incorrect. It designates an endpoint function name, not an HTML file directly.",
      "B": "Correct. Specifies the redirection target for unauthenticated users accessing protected views.",
      "C": "Incorrect. It does not perform deletions.",
      "D": "Incorrect. It has no effect on fonts."
    },
    "practicalExample": "If an anonymous user visits `/dashboard`, Flask-Login redirects them to `url_for('login')` with a `?next=/dashboard` query parameter."
  },
  {
    "id": "u5_21",
    "module": 5,
    "topic": "UserMixin Class",
    "difficulty": "Medium",
    "question": "Why does a User model class in Flask-Login inherit from `UserMixin`?",
    "codeSnippet": "from flask_login import UserMixin\n\nclass User(UserMixin, db.Model):\n    id = db.Column(db.Integer, primary_key=True)",
    "options": [
      "It automatically writes SQL queries for all databases",
      "It provides default implementations for the four mandatory properties required by Flask-Login: `is_authenticated`, `is_active`, `is_anonymous`, and `get_id()`",
      "It encrypts the model's attributes with SSL",
      "It disables all other model classes"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Flask-Login expects user objects to implement four specific methods and properties. Inheriting from `UserMixin` provides ready-to-use implementations of all four, saving you from writing boilerplate code.",
    "optionExplanations": {
      "A": "Incorrect. SQLAlchemy handles SQL, not UserMixin.",
      "B": "Correct. Supplies `is_authenticated`, `is_active`, `is_anonymous`, and `get_id()` out of the box.",
      "C": "Incorrect. It does not perform SSL encryption.",
      "D": "Incorrect. It is a mixin class that works alongside other models."
    },
    "practicalExample": "Without `UserMixin`, you would have to define `def is_authenticated(self): return True` and three other methods manually."
  },
  {
    "id": "u5_22",
    "module": 5,
    "topic": "UserMixin Properties",
    "difficulty": "Medium",
    "question": "What does `current_user.is_authenticated` return for an anonymous visitor who has NOT logged in?",
    "codeSnippet": null,
    "options": [
      "True",
      "False",
      "None",
      "An HTTP 403 error"
    ],
    "correctAnswer": 1,
    "correctExplanation": "For unauthenticated guest visitors, Flask-Login provides an `AnonymousUserMixin` where `is_authenticated` evaluates to `False` (and `is_anonymous` evaluates to `True`).",
    "optionExplanations": {
      "A": "Incorrect. `True` is only returned for logged-in users.",
      "B": "Correct. Evaluates to `False` for anonymous visitors.",
      "C": "Incorrect. It returns a boolean, not None.",
      "D": "Incorrect. It does not raise an HTTP error."
    },
    "practicalExample": "In navbar template: `{% if current_user.is_authenticated %} <a href=\"/logout\">Logout</a> {% else %} <a href=\"/login\">Login</a> {% endif %}`."
  },
  {
    "id": "u5_23",
    "module": 5,
    "topic": "user_loader Callback",
    "difficulty": "Hard",
    "question": "What is the role of the `@login_manager.user_loader` callback function in a Flask application?",
    "codeSnippet": "@login_manager.user_loader\ndef load_user(user_id):\n    return db.session.get(User, int(user_id))",
    "options": [
      "It displays a loading spinner on the screen",
      "It is called by Flask-Login on every request to reload the active user object from the database using the user ID stored in the session",
      "It deletes inactive users from disk",
      "It generates a new password for the user on every page click"
    ],
    "correctAnswer": 1,
    "correctExplanation": "The session only stores the user ID string. On every incoming request, Flask-Login invokes this `@login_manager.user_loader` function with that ID to query the database and populate the `current_user` object.",
    "optionExplanations": {
      "A": "Incorrect. It is a backend data retrieval callback, not a UI spinner.",
      "B": "Correct. Reloads the user model instance from the database using the session's stored user ID.",
      "C": "Incorrect. It does not delete users.",
      "D": "Incorrect. It performs read queries only."
    },
    "practicalExample": "If `user_id` is 42, `load_user('42')` queries `User` table for ID 42 and attaches it to `current_user`."
  },
  {
    "id": "u5_24",
    "module": 5,
    "topic": "login_user() Function",
    "difficulty": "Easy",
    "question": "Which Flask-Login function is called when a user submits valid credentials to officially log them into the active session?",
    "codeSnippet": null,
    "options": [
      "login_user(user)",
      "session.login(user)",
      "user.authenticate()",
      "auth.sign_in(user)"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`login_user(user, remember=False)` is imported from `flask_login`. It sets the user ID in the session and marks the user as authenticated.",
    "optionExplanations": {
      "A": "Correct. `login_user(user)` records the user's ID into the session.",
      "B": "Incorrect. Not a valid session method.",
      "C": "Incorrect. Not a built-in method.",
      "D": "Incorrect. Not a Flask-Login function."
    },
    "practicalExample": "```python\nif check_password_hash(user.password_hash, password):\n    login_user(user, remember=True)\n    return redirect('/dashboard')\n```"
  },
  {
    "id": "u5_25",
    "module": 5,
    "topic": "logout_user() Function",
    "difficulty": "Easy",
    "question": "Which function terminates a user's authenticated session in Flask-Login?",
    "codeSnippet": null,
    "options": [
      "logout_user()",
      "session.destroy()",
      "user.sign_out()",
      "login_manager.exit()"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`logout_user()` from `flask_login` clears the user session and remember-me cookies, returning the user to anonymous status.",
    "optionExplanations": {
      "A": "Correct. `logout_user()` logs out the currently logged-in user.",
      "B": "Incorrect. `session.destroy()` does not exist in Flask.",
      "C": "Incorrect. Not a valid method.",
      "D": "Incorrect. Not a valid method."
    },
    "practicalExample": "```python\n@app.route('/logout')\n@login_required\ndef logout():\n    logout_user()\n    flash('You have been logged out.')\n    return redirect('/login')\n```"
  },
  {
    "id": "u5_26",
    "module": 5,
    "topic": "@login_required Decorator",
    "difficulty": "Easy",
    "question": "Which decorator is placed above a view function to restrict access strictly to authenticated users?",
    "codeSnippet": "from flask_login import login_required\n\n@app.route('/dashboard')\n___________________\ndef dashboard():\n    return 'Welcome to Dashboard'",
    "options": [
      "@login_required",
      "@authenticated_only",
      "@require_user",
      "@protect_route"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`@login_required` is the official decorator provided by Flask-Login. It checks if `current_user.is_authenticated` is True; if not, it intercepts and redirects to `login_view`.",
    "optionExplanations": {
      "A": "Correct. `@login_required` protects routes from unauthenticated access.",
      "B": "Incorrect. Not a valid decorator.",
      "C": "Incorrect. Not a valid decorator.",
      "D": "Incorrect. Fabricated name."
    },
    "practicalExample": "Visiting `/dashboard` while logged out automatically redirects to `/login`."
  },
  {
    "id": "u5_27",
    "module": 5,
    "topic": "current_user Proxy",
    "difficulty": "Medium",
    "question": "How do you access the username of the currently logged-in user inside a protected view function or Jinja template?",
    "codeSnippet": null,
    "options": [
      "current_user.username",
      "session.get_user().username",
      "User.query.current().username",
      "request.auth.username"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Flask-Login exposes the `current_user` proxy object everywhere (in view functions and automatically in Jinja templates). You can access any column on your User model directly as `current_user.username`.",
    "optionExplanations": {
      "A": "Correct. `current_user.username` directly accesses model attributes of the active user.",
      "B": "Incorrect. Not a valid session method.",
      "C": "Incorrect. `current()` is not an SQLAlchemy query method.",
      "D": "Incorrect. Not a valid request property."
    },
    "practicalExample": "In `dashboard.html`: `<h1>Welcome back, {{ current_user.username }}!</h1>`."
  },
  {
    "id": "u5_28",
    "module": 5,
    "topic": "Post-Login Next Redirection",
    "difficulty": "Hard",
    "question": "When an unauthenticated user is redirected to the login page from `/profile`, Flask-Login appends `?next=%2Fprofile` to the URL. Why?",
    "codeSnippet": null,
    "options": [
      "To permanently delete the `/profile` page",
      "So that after successful login, the application can redirect the user directly to the page they originally intended to visit (`request.args.get('next')`) instead of defaulting to a generic homepage",
      "To log the user's IP address with the FBI",
      "To test the client's monitor refresh rate"
    ],
    "correctAnswer": 1,
    "correctExplanation": "The `next` query parameter preserves the user's destination URL so they can be smoothly redirected back to their requested page immediately after authenticating, providing seamless user experience.",
    "optionExplanations": {
      "A": "Incorrect. It has no effect on page deletion.",
      "B": "Correct. Preserves target destination: `next_page = request.args.get('next'); return redirect(next_page or '/dashboard')`.",
      "C": "Incorrect. Nonsense.",
      "D": "Incorrect. Unrelated to hardware."
    },
    "practicalExample": "Clicking an email link to a protected order summary brings you to login and then directly to that order summary after login."
  },
  {
    "id": "u5_29",
    "module": 5,
    "topic": "Next URL Open Redirect Hazard",
    "difficulty": "Hard",
    "question": "Why must you validate the `next` parameter before redirecting to it after login?",
    "codeSnippet": "next_page = request.args.get('next')",
    "options": [
      "Because browsers crash if URLs have more than 5 letters",
      "To prevent 'Open Redirect' phishing attacks, where an attacker crafts a malicious link like `login?next=http://hacker-phishing.com` to trick users into leaving the site",
      "Because Python does not support redirects",
      "Because SQLite will delete users if the URL is invalid"
    ],
    "correctAnswer": 1,
    "correctExplanation": "If you blindly redirect to `next_page` without verifying that the URL is a relative path or belongs to the same domain (e.g. using `url_parse(next_page).netloc == ''`), an attacker can redirect authenticated victims to a spoofed phishing page.",
    "optionExplanations": {
      "A": "Incorrect. Browsers support URLs of thousands of characters.",
      "B": "Correct. Prevents Open Redirect vulnerabilities where users are redirected to external malicious domains.",
      "C": "Incorrect. Python redirects seamlessly.",
      "D": "Incorrect. SQLite is unaffected by redirect parameters."
    },
    "practicalExample": "Always check: `if not next_page or url_parse(next_page).netloc != '': next_page = url_for('dashboard')`."
  },
  {
    "id": "u5_30",
    "module": 5,
    "topic": "Registration Validation",
    "difficulty": "Medium",
    "question": "What is the correct sequence of server-side checks in a secure registration flow?",
    "codeSnippet": null,
    "options": [
      "1. Validate required fields not empty -> 2. Verify passwords match -> 3. Check if username/email already exists in database -> 4. Hash password with salt -> 5. Save to database",
      "1. Save plaintext password -> 2. Delete database -> 3. Send email",
      "1. Redirect to dashboard -> 2. Ask user for password later",
      "1. Check if user has an iPhone -> 2. Generate hash"
    ],
    "correctAnswer": 0,
    "correctExplanation": "A secure registration flow requires: 1) confirming non-empty inputs, 2) verifying password confirmation match, 3) querying the database to ensure the username/email is not already taken, 4) generating a cryptographic password hash, and 5) saving the record to the database.",
    "optionExplanations": {
      "A": "Correct. Official registration workflow highlighted in course slides (Page 9).",
      "B": "Incorrect. Insecure and destructive.",
      "C": "Incorrect. Unauthenticated access violates security.",
      "D": "Incorrect. Hardware checks are irrelevant."
    },
    "practicalExample": "Matches the 5-step registration pipeline from the course syllabus."
  },
  {
    "id": "u5_31",
    "module": 5,
    "topic": "Duplicate User Checking",
    "difficulty": "Medium",
    "question": "Which query correctly checks if a username is already taken during registration?",
    "codeSnippet": null,
    "options": [
      "existing = User.query.filter_by(username=username).first()",
      "existing = User.query.get(username)",
      "existing = db.session.find(username)",
      "existing = User.all().has(username)"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`User.query.filter_by(username=username).first()` looks for an existing record with that username and returns the model if found, or `None` if the username is available.",
    "optionExplanations": {
      "A": "Correct. `filter_by(username=username).first()` efficiently checks for existing rows.",
      "B": "Incorrect. `get()` queries by integer primary key, not string username.",
      "C": "Incorrect. `find()` is not an SQLAlchemy method.",
      "D": "Incorrect. Inefficient and invalid syntax."
    },
    "practicalExample": "`if existing: flash('Username already exists!', 'error'); return redirect('/register')`."
  },
  {
    "id": "u5_32",
    "module": 5,
    "topic": "Profile Updates Workflow",
    "difficulty": "Medium",
    "question": "Examine this profile update route from the course slides:\nWhat ensures that only the logged-in user can update their profile information?",
    "codeSnippet": "@app.route('/profile', methods=['GET', 'POST'])\n@login_required\ndef profile():\n    if request.method == 'POST':\n        current_user.username = request.form['username']\n        current_user.email = request.form['email']\n        db.session.commit()\n        flash('Profile updated!', 'success')\n        return redirect('/profile')\n    return render_template('profile.html')",
    "options": [
      "The browser encrypts the computer screen",
      "`@login_required` enforces authentication, and updating `current_user` directly ensures the changes apply strictly to the authenticated user's record without touching other users",
      "The SQLite database only has one row",
      "The user must enter their credit card number"
    ],
    "correctAnswer": 1,
    "correctExplanation": "`@login_required` blocks anonymous visitors. Mutating attributes directly on `current_user` ensures the application updates only the database record belonging to the authenticated user attached to the session.",
    "optionExplanations": {
      "A": "Incorrect. Screen encryption does not occur.",
      "B": "Correct. `@login_required` + `current_user` guarantees that users can only mutate their own account.",
      "C": "Incorrect. Databases handle many user rows.",
      "D": "Incorrect. Not required."
    },
    "practicalExample": "Prevents Insecure Direct Object References (IDOR) because the route doesn't accept an arbitrary `user_id` parameter."
  },
  {
    "id": "u5_33",
    "module": 5,
    "topic": "Role-Based Access Control (RBAC)",
    "difficulty": "Easy",
    "question": "What is Role-Based Access Control (RBAC)?",
    "codeSnippet": null,
    "options": [
      "A system that controls access to resources based on assigned user roles (e.g. Student, Faculty, Admin) rather than configuring permissions individually for every single person",
      "A database tool that automatically restarts servers",
      "A CSS library for styling buttons",
      "A network firewall that blocks all traffic from India"
    ],
    "correctAnswer": 0,
    "correctExplanation": "RBAC organizes permissions by roles (Admin, Faculty, Student). Users are assigned one or more roles, and the application authorizes access by checking the role attribute.",
    "optionExplanations": {
      "A": "Correct. Authorizes access based on assigned functional roles.",
      "B": "Incorrect. RBAC is an authorization pattern, not a server manager.",
      "C": "Incorrect. Not a CSS styling library.",
      "D": "Incorrect. Not a geographic firewall."
    },
    "practicalExample": "An Admin can delete student records; a Student can only view their own courses."
  },
  {
    "id": "u5_34",
    "module": 5,
    "topic": "RBAC Route Verification",
    "difficulty": "Medium",
    "question": "Examine this admin route from course slides:\nWhat HTTP status code should be returned if a non-admin tries to access an administrative dashboard?",
    "codeSnippet": "@app.route('/admin')\n@login_required\ndef admin():\n    if current_user.role != 'admin':\n        return 'Access Denied', 403\n    return 'Admin Dashboard'",
    "options": [
      "200 OK",
      "403 Forbidden",
      "404 Not Found",
      "500 Internal Server Error"
    ],
    "correctAnswer": 1,
    "correctExplanation": "HTTP 403 Forbidden indicates that the server understands who the user is (they are authenticated), but refuses to authorize access because they lack the required permissions/role.",
    "optionExplanations": {
      "A": "Incorrect. 200 would mean access was granted.",
      "B": "Correct. 403 Forbidden is the standard HTTP response for permission/authorization denials.",
      "C": "Incorrect. 404 is for missing URLs.",
      "D": "Incorrect. 500 is for server crashes."
    },
    "practicalExample": "A logged-in student visiting `/admin` receives an HTTP 403 Forbidden error."
  },
  {
    "id": "u5_35",
    "module": 5,
    "topic": "Custom Role Decorators",
    "difficulty": "Hard",
    "question": "How can developers create a reusable `@admin_required` decorator in Flask?",
    "codeSnippet": "from functools import wraps\nfrom flask import abort\nfrom flask_login import current_user\n\ndef admin_required(f):\n    @wraps(f)\n    def decorated_function(*args, **kwargs):\n        if not current_user.is_authenticated or current_user.role != 'admin':\n            abort(403)\n        return f(*args, **kwargs)\n    return decorated_function",
    "options": [
      "Using Python's `functools.wraps` to wrap the view function, checking `current_user.role == 'admin'`, and calling `abort(403)` if unauthorized",
      "By renaming the route to `@app.route('/admin_required')`",
      "By setting `app.secret_key = 'admin'`",
      "Decorators cannot be customized in Flask"
    ],
    "correctAnswer": 0,
    "correctExplanation": "Using `functools.wraps` allows writing clean custom decorators that inspect `current_user.role` before executing the decorated view function, raising `abort(403)` if unauthorized.",
    "optionExplanations": {
      "A": "Correct. Standard Python decorator pattern using `functools.wraps` and `abort(403)`.",
      "B": "Incorrect. Changing route paths does not enforce authorization.",
      "C": "Incorrect. Secret key is for session signing, not role authorization.",
      "D": "Incorrect. Python decorators are completely customizable."
    },
    "practicalExample": "`@app.route('/admin')` followed by `@admin_required` cleanly secures any administrative endpoint."
  },
  {
    "id": "u5_36",
    "module": 5,
    "topic": "Cookie Attributes: HttpOnly",
    "difficulty": "Hard",
    "question": "What is the security purpose of the `httponly=True` flag when setting a cookie in Flask?",
    "codeSnippet": "response.set_cookie('session_id', token, httponly=True)",
    "options": [
      "It forces the cookie to only work on HTTP and breaks on HTTPS",
      "It prevents client-side JavaScript (via `document.cookie`) from reading the cookie, mitigating the risk of session hijacking via Cross-Site Scripting (XSS)",
      "It translates the cookie into HTML",
      "It deletes the cookie after 1 millisecond"
    ],
    "correctAnswer": 1,
    "correctExplanation": "The `HttpOnly` flag instructs the browser that the cookie should not be accessible through client-side scripts like `document.cookie`. Even if an attacker injects malicious JavaScript (XSS), they cannot steal an `HttpOnly` session cookie.",
    "optionExplanations": {
      "A": "Incorrect. `HttpOnly` works on both HTTP and HTTPS.",
      "B": "Correct. Defends session tokens against client-side JavaScript theft via XSS vulnerabilities.",
      "C": "Incorrect. Does not translate cookies to HTML.",
      "D": "Incorrect. Does not affect expiration duration."
    },
    "practicalExample": "Flask automatically marks its session cookies with `HttpOnly=True` for security."
  },
  {
    "id": "u5_37",
    "module": 5,
    "topic": "Cookie Attributes: Secure",
    "difficulty": "Medium",
    "question": "What does the `secure=True` flag enforce when setting a cookie in Flask?",
    "codeSnippet": "response.set_cookie('auth_token', token, secure=True)",
    "options": [
      "The browser will ONLY transmit the cookie over encrypted HTTPS connections, never over unencrypted HTTP",
      "The cookie can only be opened with a security pin",
      "The cookie is stored in a physical safe on the server",
      "The user must answer a security question"
    ],
    "correctAnswer": 0,
    "correctExplanation": "The `Secure` cookie flag instructs the browser that the cookie may only be sent to the server over encrypted HTTPS connections, preventing man-in-the-middle packet sniffing on unencrypted networks.",
    "optionExplanations": {
      "A": "Correct. Enforces transmission strictly over encrypted HTTPS channels.",
      "B": "Incorrect. Browsers manage cookies automatically without user pins.",
      "C": "Incorrect. Physical safes are not used for software cookies.",
      "D": "Incorrect. Does not prompt for security questions."
    },
    "practicalExample": "In production: `app.config['SESSION_COOKIE_SECURE'] = True`."
  },
  {
    "id": "u5_38",
    "module": 5,
    "topic": "Cookie Attributes: SameSite",
    "difficulty": "Hard",
    "question": "What attack does configuring `samesite='Lax'` or `samesite='Strict'` on cookies primarily defend against?",
    "codeSnippet": null,
    "options": [
      "SQL Injection",
      "Cross-Site Request Forgery (CSRF)",
      "Buffer Overflow",
      "Phishing emails"
    ],
    "correctAnswer": 1,
    "correctExplanation": "The `SameSite` cookie attribute controls whether cookies are sent with cross-site requests. Setting it to `Lax` or `Strict` prevents external third-party websites from attaching your session cookies to unauthorized requests, mitigating Cross-Site Request Forgery (CSRF).",
    "optionExplanations": {
      "A": "Incorrect. SQL injection is mitigated by parameterized queries and ORMs.",
      "B": "Correct. `SameSite` defends cookies against CSRF attacks.",
      "C": "Incorrect. Buffer overflows are low-level memory issues.",
      "D": "Incorrect. Cannot stop deceptive emails."
    },
    "practicalExample": "A malicious site trying to submit a forged transfer request cannot piggyback on your bank session cookie if `SameSite=Lax` is enabled."
  },
  {
    "id": "u5_39",
    "module": 5,
    "topic": "Session Clearing on Logout",
    "difficulty": "Medium",
    "question": "How do you completely wipe and clear all keys stored in the user's session during logout?",
    "codeSnippet": null,
    "options": [
      "session.clear()",
      "session = {}",
      "del session",
      "session.wipe_all()"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`session.clear()` removes all keys and data stored within the active session object, resetting it completely.",
    "optionExplanations": {
      "A": "Correct. `session.clear()` empties all session keys.",
      "B": "Incorrect. Rebinding the local variable name does not clear the underlying session proxy.",
      "C": "Incorrect. Deleting the proxy object causes errors in subsequent lookups.",
      "D": "Incorrect. Method does not exist."
    },
    "practicalExample": "```python\n@app.route('/logout')\ndef logout():\n    session.clear()\n    return redirect('/')\n```"
  },
  {
    "id": "u5_40",
    "module": 5,
    "topic": "Password Hash Method Algorithms",
    "difficulty": "Hard",
    "question": "Which cryptographic hashing algorithm is recommended and used by default in modern Werkzeug 3.0+?",
    "codeSnippet": null,
    "options": [
      "MD5",
      "scrypt",
      "ROT13",
      "DES"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Werkzeug 3.0+ defaults to `scrypt`, a memory-hard key derivation function designed to be highly resistant to GPU and ASIC hardware-accelerated brute-force attacks.",
    "optionExplanations": {
      "A": "Incorrect. MD5 is deprecated and insecure.",
      "B": "Correct. Modern Werkzeug defaults to `scrypt`.",
      "C": "Incorrect. ROT13 is a simple Caesar cipher, not a hash.",
      "D": "Incorrect. DES is an obsolete 56-bit encryption standard."
    },
    "practicalExample": "Generated hash format: `scrypt:32768:8:1$salt$hash`."
  },
  {
    "id": "u5_41",
    "module": 5,
    "topic": "Flask-Login Remember Me",
    "difficulty": "Medium",
    "question": "When `login_user(user, remember=True)` is called, how does Flask-Login remember the user across browser sessions?",
    "codeSnippet": null,
    "options": [
      "By taking a webcam screenshot of the user",
      "By generating a secure, persistent 'remember_token' cookie that is saved in the browser and checked whenever the regular session cookie expires",
      "By saving the user's password in plain text inside `localStorage`",
      "By preventing the computer from rebooting"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Setting `remember=True` issues a dedicated, long-lived `remember_token` cookie. When the user returns after closing their browser, Flask-Login validates this token and automatically restores their authenticated session.",
    "optionExplanations": {
      "A": "Incorrect. No hardware webcam operations.",
      "B": "Correct. Flask-Login generates a secure remember-me token stored in a persistent cookie.",
      "C": "Incorrect. Plaintext passwords are never stored in client cookies or localStorage.",
      "D": "Incorrect. Nonsense."
    },
    "practicalExample": "Allows users to stay logged in on personal computers for weeks."
  },
  {
    "id": "u5_42",
    "module": 5,
    "topic": "Anonymous User Representation",
    "difficulty": "Medium",
    "question": "What is `current_user` before any user has logged into the application?",
    "codeSnippet": null,
    "options": [
      "None",
      "An instance of Flask-Login's `AnonymousUserMixin`",
      "A dictionary with `{'username': 'guest'}`",
      "The string `'nobody'`"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Flask-Login does not set `current_user` to `None`. Instead, it provides an instance of `AnonymousUserMixin`, which has `is_authenticated = False` and `is_anonymous = True`. This prevents `AttributeError` crashes when checking `current_user.is_authenticated`.",
    "optionExplanations": {
      "A": "Incorrect. If it were `None`, calling `current_user.is_authenticated` would raise an `AttributeError`.",
      "B": "Correct. It is an `AnonymousUserMixin` instance.",
      "C": "Incorrect. It is a class object, not a raw dictionary.",
      "D": "Incorrect. It is not a string."
    },
    "practicalExample": "Allows safely checking `if current_user.is_authenticated:` anywhere without needing `if current_user is not None:` first."
  },
  {
    "id": "u5_43",
    "module": 5,
    "topic": "Flash Messages in Views",
    "difficulty": "Easy",
    "question": "Can you flash multiple messages during the processing of a single request?",
    "codeSnippet": "flash('Username updated!', 'info')\nflash('Email updated!', 'success')",
    "options": [
      "No, Flask only allows a single flashed message per request",
      "Yes, multiple messages can be flashed in sequence; they are stored in a list and will all be rendered in the template",
      "No, subsequent flashes overwrite the first one",
      "Only if the user is an administrator"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Flask appends each flashed message into a session list `_flashes`. Calling `get_flashed_messages()` returns all flashed messages in the order they were queued.",
    "optionExplanations": {
      "A": "Incorrect. Multiple flashes are fully supported.",
      "B": "Correct. Flashes are queued into a list and all rendered in the template loop.",
      "C": "Incorrect. They do not overwrite each other.",
      "D": "Incorrect. Available to all user levels."
    },
    "practicalExample": "Allows giving multiple status updates (e.g. 'Photo uploaded', 'Thumbnail created')."
  },
  {
    "id": "u5_44",
    "module": 5,
    "topic": "Cookie Expiration with max_age",
    "difficulty": "Medium",
    "question": "When setting a cookie using `response.set_cookie('key', 'val', max_age=3600)`, how long will the browser keep the cookie?",
    "codeSnippet": null,
    "options": [
      "3600 milliseconds (3.6 seconds)",
      "3600 seconds (1 hour)",
      "3600 minutes (60 hours)",
      "3600 days"
    ],
    "correctAnswer": 1,
    "correctExplanation": "In HTTP standards and Werkzeug's `set_cookie()`, `max_age` is measured in seconds. `3600` seconds equals exactly 1 hour.",
    "optionExplanations": {
      "A": "Incorrect. `max_age` is seconds, not milliseconds.",
      "B": "Correct. 3600 seconds = 60 minutes = 1 hour.",
      "C": "Incorrect. Not minutes.",
      "D": "Incorrect. Not days."
    },
    "practicalExample": "For a 30-day cookie: `max_age = 60 * 60 * 24 * 30` (2,592,000 seconds)."
  },
  {
    "id": "u5_45",
    "module": 5,
    "topic": "Deleting Cookies",
    "difficulty": "Easy",
    "question": "How do you delete a cookie named `user_theme` from the client's browser?",
    "codeSnippet": null,
    "options": [
      "response.delete_cookie('user_theme')",
      "request.cookies.pop('user_theme')",
      "cookie.remove('user_theme')",
      "session.delete_cookie('user_theme')"
    ],
    "correctAnswer": 0,
    "correctExplanation": "`response.delete_cookie('name')` sets the cookie's expiration date in the past (`expires=0` / `max_age=0`), instructing the browser to immediately discard it.",
    "optionExplanations": {
      "A": "Correct. `response.delete_cookie('name')` instructs the browser to purge the cookie.",
      "B": "Incorrect. Popping from `request.cookies` only alters the incoming dictionary, not the browser.",
      "C": "Incorrect. Invalid syntax.",
      "D": "Incorrect. `session` does not delete custom cookies."
    },
    "practicalExample": "```python\nresp = make_response(redirect('/'))\nresp.delete_cookie('user_theme')\nreturn resp\n```"
  },
  {
    "id": "u5_46",
    "module": 5,
    "topic": "Session Size Limit",
    "difficulty": "Hard",
    "question": "Why is storing massive datasets (like large lists or binary images) directly in Flask's default session considered a bad architecture?",
    "codeSnippet": null,
    "options": [
      "Because Python crashes if sessions exceed 10 items",
      "Because default sessions are stored in HTTP cookies, which are limited to approximately 4 KB by browser specifications and sent with EVERY single HTTP request, bloating network traffic",
      "Because cookies can only store integers",
      "Because SQLite will delete the database if cookies are large"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Standard browser cookies have a hard limit around 4096 bytes (4 KB). Furthermore, cookies are transmitted back and forth in headers on every HTTP request and asset fetch, so large session payloads severely degrade network performance.",
    "optionExplanations": {
      "A": "Incorrect. Python dictionaries handle millions of items.",
      "B": "Correct. 4 KB browser limit and excessive network header overhead make storing large data in cookies poor design.",
      "C": "Incorrect. Cookies store encoded strings.",
      "D": "Incorrect. SQLite is unaffected."
    },
    "practicalExample": "Store only user IDs in sessions; query the full user record and images from the database or filesystem."
  },
  {
    "id": "u5_47",
    "module": 5,
    "topic": "Password Hash Uniqueness",
    "difficulty": "Medium",
    "question": "What happens if you run `generate_password_hash('password123')` twice in a row in Python?",
    "codeSnippet": "h1 = generate_password_hash('password123')\nh2 = generate_password_hash('password123')",
    "options": [
      "`h1` and `h2` are identical strings",
      "`h1` and `h2` are completely different strings because a new random salt is generated on every call",
      "Python throws a DuplicateHashError",
      "The second call returns an empty string"
    ],
    "correctAnswer": 1,
    "correctExplanation": "Because `generate_password_hash` generates a fresh, random salt on each execution, hashing the same password twice produces two completely distinct hash strings. However, `check_password_hash` validates both successfully.",
    "optionExplanations": {
      "A": "Incorrect. Identical hashes would mean no random salt was used (vulnerable).",
      "B": "Correct. A fresh cryptographic salt ensures unique hashes for the same plaintext.",
      "C": "Incorrect. No exception is raised.",
      "D": "Incorrect. It returns a valid hash string."
    },
    "practicalExample": "Try in terminal: `h1 != h2` is `True`, but `check_password_hash(h1, 'password123')` and `check_password_hash(h2, 'password123')` both return `True`."
  },
  {
    "id": "u5_48",
    "module": 5,
    "topic": "CSRF in Forms",
    "difficulty": "Medium",
    "question": "In production authentication forms, what is the purpose of adding a CSRF (Cross-Site Request Forgery) token?",
    "codeSnippet": null,
    "options": [
      "To speed up database transactions",
      "To ensure that the form submission originated from your own trusted website and was not forged by a malicious third-party site tricking an authenticated user's browser",
      "To convert passwords into uppercase",
      "To allow users to login without entering a password"
    ],
    "correctAnswer": 1,
    "correctExplanation": "A CSRF token is a unique, unpredictable secret generated by the server and validated upon form submission. It guarantees that the submission came intentionally from the legitimate user on your application.",
    "optionExplanations": {
      "A": "Incorrect. CSRF tokens are security controls, not database accelerators.",
      "B": "Correct. Verifies form submission legitimacy and prevents unauthorized cross-origin forged requests.",
      "C": "Incorrect. It does not alter password casing.",
      "D": "Incorrect. It is independent of user credentials."
    },
    "practicalExample": "Flask-WTF provides `{{ form.csrf_token }}` or `csrf_token()` to secure POST forms."
  },
  {
    "id": "u5_49",
    "module": 5,
    "topic": "Login State Preservation",
    "difficulty": "Easy",
    "question": "Which decorator from Flask-Login should be placed above the `/login` route to prevent already logged-in users from accessing the login page again?",
    "codeSnippet": null,
    "options": [
      "Check `if current_user.is_authenticated: return redirect(url_for('dashboard'))` inside the view",
      "@logout_required",
      "@no_auth_allowed",
      "@guest_only"
    ],
    "correctAnswer": 0,
    "correctExplanation": "The standard Flask pattern is checking `if current_user.is_authenticated:` at the top of the login/register view functions and redirecting already logged-in users to the dashboard.",
    "optionExplanations": {
      "A": "Correct. Standard check to redirect logged-in users away from authentication pages.",
      "B": "Incorrect. Not a built-in Flask-Login decorator.",
      "C": "Incorrect. Not a standard decorator.",
      "D": "Incorrect. Not built-in."
    },
    "practicalExample": "If an authenticated user navigates to `/login`, redirecting them to `/dashboard` provides clean UX."
  },
  {
    "id": "u5_50",
    "module": 5,
    "topic": "Module 5 Summary",
    "difficulty": "Hard",
    "question": "Which statement accurately summarizes the core principles of Module 5: User Authentication and Sessions?",
    "codeSnippet": null,
    "options": [
      "Passwords must be irreversibly hashed using Werkzeug (`generate_password_hash`); user sessions are cryptographically signed using `app.secret_key`; Flask-Login manages authentication state via `LoginManager`, `UserMixin`, `login_user()`, and `@login_required`; and access permissions are enforced via Role-Based Access Control (RBAC)",
      "Authentication in Flask requires Apache HTTP Server modules and cannot be built using Python libraries",
      "Flask sessions store data permanently in plaintext inside client cookies that anyone can edit to become administrator",
      "Flask-Login requires users to write raw SQL queries for authentication"
    ],
    "correctAnswer": 0,
    "correctExplanation": "This comprehensively covers all the core pillars of Module 5: secure password hashing, signed sessions with secret key, Flask-Login user tracking and route protection, and RBAC authorization.",
    "optionExplanations": {
      "A": "Correct. Comprehensive and technically precise summary of Module 5.",
      "B": "Incorrect. Handled natively in Python/Flask.",
      "C": "Incorrect. Cryptographic signatures prevent client-side tampering.",
      "D": "Incorrect. Flask-Login works with ORM models without raw SQL."
    },
    "practicalExample": "These concepts form the security backbone of modern web applications."
  }
];
