# -*- coding: utf-8 -*-
"""
Module 2 Question Bank Generator
Covers 50 validated MCQs on:
- URL Routing: Static vs Dynamic Routes
- Dynamic Parameter Extraction & matching function arguments
- URL Converters: string, int, float, path, uuid
- Trailing slashes behavior & canonical URLs
- Stacking Route Decorators & Aliases
- The Danger of Hardcoding URLs
- Dynamic URL Building with url_for()
- url_for() with endpoint names, route args, query parameters, and _external=True
- HTML Templates vs Inline HTML Strings (Separation of Concerns)
- Jinja2 Template Engine & Delimiters ({{ }}, {% %}, {# #})
- render_template() and mandatory templates/ folder
- Passing Data (variables, lists, dicts) to templates
- Jinja2 Control Structures: Loops, Conditionals, and loop special variables
- Template Inheritance: base.html, {% extends %}, {% block %}, and super()
- Jinja2 Filters: upper, lower, title, length, safe, default, join, reverse, striptags
- Static Files: static/ folder structure (css, js, images)
- Linking static assets using url_for('static', filename=...)
- End-to-end Request, Routing, and Template pipeline
"""

import json

questions = [
    {
        "id": "u2_01",
        "module": 2,
        "topic": "URL Routing",
        "difficulty": "Easy",
        "question": "What is 'URL Routing' in the context of Flask?",
        "codeSnippet": None,
        "options": [
            "The physical path of optical fiber cables connecting the server to the internet",
            "The process of mapping an incoming HTTP client URL to a specific Python view function inside the Flask application",
            "A database indexing technique used exclusively by SQLite",
            "The process of compiling Jinja2 templates into CSS"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Routing is the mechanism by which Flask associates an incoming URL path from a web browser with the corresponding Python view function responsible for producing the response.",
        "optionExplanations": {
            "A": "Incorrect. Physical networking is network infrastructure, not software routing.",
            "B": "Correct. URL routing maps request paths (e.g., `/contact`) to Python functions decorated with `@app.route()`.",
            "C": "Incorrect. Database indexing is an ORM/database function.",
            "D": "Incorrect. Jinja2 generates HTML, not compiled CSS."
        },
        "practicalExample": "Visiting `localhost:5000/about` executes `def about():` because of the route `@app.route('/about')`."
    },
    {
        "id": "u2_02",
        "module": 2,
        "topic": "Dynamic Routes",
        "difficulty": "Easy",
        "question": "What syntax is used in Flask to define a dynamic variable section within a route URL?",
        "codeSnippet": None,
        "options": [
            "[variable_name]",
            "<variable_name>",
            ":variable_name",
            "${variable_name}"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Flask uses angle brackets `<variable_name>` in `@app.route('/user/<name>')` to capture dynamic variable parts of the URL and pass them as arguments to the view function.",
        "optionExplanations": {
            "A": "Incorrect. Square brackets are not used in Flask route definitions.",
            "B": "Correct. `<variable_name>` is the official syntax for capturing dynamic route segments.",
            "C": "Incorrect. Colon prefixing (`:variable`) is used in Express.js / Node.js, not Flask.",
            "D": "Incorrect. `${}` is JavaScript template literal syntax."
        },
        "practicalExample": "`@app.route('/student/<name>')` extracts whatever text is in that URL position into the `name` argument."
    },
    {
        "id": "u2_03",
        "module": 2,
        "topic": "Dynamic Routes",
        "difficulty": "Medium",
        "question": "In the following Flask route, what condition MUST be met regarding the variable name in the decorator?",
        "codeSnippet": "@app.route('/student/<student_name>')\ndef student_profile(student_name):\n    return f'Student: {student_name}'",
        "options": [
            "The parameter name inside `< >` must exactly match the view function's argument name",
            "The parameter name must be written in ALL CAPS",
            "The parameter must be named `id` in every route",
            "The function name must be identical to the route URL string"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Flask matches URL variable segments to keyword arguments in the decorated view function. If the variable is `<student_name>`, the view function definition must accept `student_name` (e.g., `def student_profile(student_name):`); otherwise a TypeError will occur.",
        "optionExplanations": {
            "A": "Correct. Flask requires that the identifier inside `<>` precisely matches the argument name expected by the view function.",
            "B": "Incorrect. Python variables follow standard naming conventions (typically snake_case).",
            "C": "Incorrect. Route variables can take any valid Python identifier name.",
            "D": "Incorrect. The function name does not have to match the URL string."
        },
        "practicalExample": "If the route is `<name>` but the function is `def profile(username):`, Flask throws a `TypeError: profile() got an unexpected keyword argument 'name'`."
    },
    {
        "id": "u2_04",
        "module": 2,
        "topic": "URL Converters",
        "difficulty": "Easy",
        "question": "What is the default converter applied to a route variable if no type converter is explicitly specified, like `<username>`?",
        "codeSnippet": None,
        "options": [
            "int",
            "float",
            "string",
            "path"
        ],
        "correctAnswer": 2,
        "correctExplanation": "If no converter is specified, Flask defaults to `string`, which accepts any text without slashes.",
        "optionExplanations": {
            "A": "Incorrect. `int` must be explicitly declared as `<int:variable>`.",
            "B": "Incorrect. `float` must be declared as `<float:variable>`.",
            "C": "Correct. `<username>` is equivalent to `<string:username>`, which matches any string containing no slashes.",
            "D": "Incorrect. `path` must be explicitly declared to accept slashes."
        },
        "practicalExample": "`@app.route('/user/<name>')` is identical in behavior to `@app.route('/user/<string:name>')`."
    },
    {
        "id": "u2_05",
        "module": 2,
        "topic": "URL Converters",
        "difficulty": "Medium",
        "question": "Consider the route `@app.route('/product/<int:item_id>')`. What happens if a user visits `/product/apple`?",
        "codeSnippet": None,
        "options": [
            "Flask converts 'apple' to 0 and executes the function",
            "Flask returns an HTTP 404 Not Found error because 'apple' fails the `int` converter validation",
            "Flask returns an HTTP 500 Internal Server Error crash",
            "Flask ignores the route and redirects to the home page"
        ],
        "correctAnswer": 1,
        "correctExplanation": "URL converters in Flask act as pattern validators. Since `'apple'` is not a valid integer, the URL does not match this route rule. If no other route matches, Flask returns an HTTP 404 Not Found error.",
        "optionExplanations": {
            "A": "Incorrect. Flask does not cast invalid strings to 0.",
            "B": "Correct. If an incoming parameter fails the converter's validation, the route does not match, returning 404.",
            "C": "Incorrect. Flask's routing engine handles type mismatch gracefully without raising a 500 server crash.",
            "D": "Incorrect. Flask does not redirect to home automatically."
        },
        "practicalExample": "Visiting `/product/101` executes the view with `item_id = 101` (type `int`), but `/product/xyz` returns 404."
    },
    {
        "id": "u2_06",
        "module": 2,
        "topic": "URL Converters",
        "difficulty": "Medium",
        "question": "Which Flask URL converter accepts forward slashes (`/`), allowing full sub-directory paths to be captured as a single variable?",
        "codeSnippet": None,
        "options": [
            "string",
            "path",
            "directory",
            "file"
        ],
        "correctAnswer": 1,
        "correctExplanation": "The `path` converter is similar to `string` but specifically accepts slashes, making it ideal for capturing hierarchical file paths or deep sub-paths (e.g. `/docs/<path:subpath>`).",
        "optionExplanations": {
            "A": "Incorrect. The default `string` converter stops matching at any forward slash.",
            "B": "Correct. The `path` converter allows slashes within the captured parameter.",
            "C": "Incorrect. `directory` is not a built-in Flask converter.",
            "D": "Incorrect. `file` is not a built-in Flask converter."
        },
        "practicalExample": "With `@app.route('/files/<path:filepath>')`, visiting `/files/docs/python/flask.pdf` captures `'docs/python/flask.pdf'` into `filepath`."
    },
    {
        "id": "u2_07",
        "module": 2,
        "topic": "URL Converters",
        "difficulty": "Medium",
        "question": "Which of the following is a complete list of standard built-in Flask URL converters?",
        "codeSnippet": None,
        "options": [
            "string, int, float, path, uuid",
            "text, number, decimal, boolean",
            "char, varchar, integer, blob",
            "str, num, list, dict"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Flask's Werkzeug routing engine provides five standard built-in converters: `string` (default, no slashes), `int` (integers), `float` (floating point values), `path` (accepts slashes), and `uuid` (UUID strings).",
        "optionExplanations": {
            "A": "Correct. The five built-in converters are `string`, `int`, `float`, `path`, and `uuid`.",
            "B": "Incorrect. These are generic data types, not Flask converters.",
            "C": "Incorrect. These are SQL data types.",
            "D": "Incorrect. `list` and `dict` are Python collections, not URL converters."
        },
        "practicalExample": "Capturing an order identifier: `@app.route('/order/<uuid:order_id>')`."
    },
    {
        "id": "u2_08",
        "module": 2,
        "topic": "Trailing Slashes",
        "difficulty": "Hard",
        "question": "Examine the following two route declarations:\nRoute 1: `@app.route('/projects/')`\nRoute 2: `@app.route('/about')`\nWhat happens if a user accesses `http://localhost:5000/about/` (with a trailing slash)?",
        "codeSnippet": None,
        "options": [
            "Flask automatically renders the `/about` view function without error",
            "Flask returns an HTTP 404 Not Found error because Route 2 does not specify a trailing slash",
            "Flask redirects with a 301 to `/projects/`",
            "Flask crashes with an HTTP 500 error"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Flask follows canonical URL rules. If a route is defined WITHOUT a trailing slash (`/about`), accessing it WITH a trailing slash (`/about/`) causes Flask to return a 404 Not Found error. Conversely, if a route is defined with a trailing slash (`/projects/`), accessing it without a slash redirects to the canonical `/projects/`.",
        "optionExplanations": {
            "A": "Incorrect. Flask does not automatically serve `/about` when `/about/` is requested if the route has no slash.",
            "B": "Correct. Accessing a non-slash route with a slash results in a 404 Not Found error.",
            "C": "Incorrect. It does not redirect to an unrelated route.",
            "D": "Incorrect. It returns a 404 client error, not a 500 crash."
        },
        "practicalExample": "Defining `@app.route('/about/')` acts like a directory and accepts both `/about` and `/about/` (via redirect); `@app.route('/about')` strictly accepts `/about` only."
    },
    {
        "id": "u2_09",
        "module": 2,
        "topic": "Binding Multiple Routes",
        "difficulty": "Easy",
        "question": "What is the primary benefit of stacking multiple `@app.route()` decorators above a single view function?",
        "codeSnippet": "@app.route('/')\n@app.route('/home')\n@app.route('/index')\ndef home():\n    return 'Welcome'",
        "options": [
            "It speeds up database query execution",
            "It allows multiple URL endpoints to be handled by the same view function, preventing code duplication (DRY principle)",
            "It automatically generates mobile apps for Android and iOS",
            "It requires users to visit all three URLs in order"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Stacking route decorators binds multiple distinct URL paths (like `/`, `/home`, and `/index`) to a single shared view function, adhering to the Don't Repeat Yourself (DRY) principle.",
        "optionExplanations": {
            "A": "Incorrect. Decorators do not alter database query speed.",
            "B": "Correct. Provides clean aliases without duplicating identical Python function logic.",
            "C": "Incorrect. It has no connection to mobile app compilation.",
            "D": "Incorrect. Each route operates independently."
        },
        "practicalExample": "Users accessing either `mysite.com/` or `mysite.com/home` see the same homepage."
    },
    {
        "id": "u2_10",
        "module": 2,
        "topic": "URL Generation with url_for()",
        "difficulty": "Medium",
        "question": "Why is hardcoding URLs like `<a href='/company-about-us'>` in HTML templates considered an anti-pattern?",
        "codeSnippet": None,
        "options": [
            "Because browsers do not understand the `<a href>` HTML tag",
            "If the URL route path in Python changes later during refactoring, every hardcoded link across all HTML files breaks and requires tedious manual updating",
            "Because hardcoding URLs uses 10 times more server memory",
            "Because Flask forbids the use of any hyperlinks"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Hardcoding URL strings couples your presentation layer directly to URL patterns. If you rename `/company-about-us` to `/about`, all hardcoded links break. `url_for('about')` looks up the route dynamically by the function name, keeping links intact.",
        "optionExplanations": {
            "A": "Incorrect. `<a href>` is standard HTML.",
            "B": "Correct. Hardcoding breaks refactoring safety. `url_for()` allows changing the route path in Python without touching templates.",
            "C": "Incorrect. Memory usage is unaffected.",
            "D": "Incorrect. Flask works with standard HTML hyperlinks."
        },
        "practicalExample": "Using `<a href=\"{{ url_for('about') }}\">` ensures the link works even if the Python route is changed from `/about` to `/company/about`."
    },
    {
        "id": "u2_11",
        "module": 2,
        "topic": "URL Generation with url_for()",
        "difficulty": "Easy",
        "question": "What is the first argument passed to Flask's `url_for()` function?",
        "codeSnippet": None,
        "options": [
            "The exact static URL path string (e.g., `'/contact'`)" ,
            "The endpoint name (which defaults to the name of the target Python view function)",
            "The user's database password",
            "The path to the CSS file"
        ],
        "correctAnswer": 1,
        "correctExplanation": "The first argument to `url_for()` is the endpoint name, which by default is the exact name of the Python view function handling that route.",
        "optionExplanations": {
            "A": "Incorrect. If you pass the static URL path, you defeat the purpose of dynamic URL generation.",
            "B": "Correct. `url_for()` takes the name of the view function as its primary endpoint argument (e.g. `url_for('home')`).",
            "C": "Incorrect. It has nothing to do with passwords.",
            "D": "Incorrect. Static files require the `'static'` endpoint with a `filename` argument."
        },
        "practicalExample": "For `@app.route('/contact-us') def contact(): ...`, you generate the URL with `url_for('contact')`."
    },
    {
        "id": "u2_12",
        "module": 2,
        "topic": "url_for() with Arguments",
        "difficulty": "Medium",
        "question": "Given the route `@app.route('/user/<username>') def profile(username): ...`, how do you generate the URL for the user 'Rahul' using `url_for()`?",
        "codeSnippet": None,
        "options": [
            "url_for('profile', username='Rahul')",
            "url_for('/user/Rahul')",
            "url_for(username='Rahul')",
            "url_for('user', 'Rahul')"
        ],
        "correctAnswer": 0,
        "correctExplanation": "You pass the function name `'profile'` as the first positional argument, followed by the keyword argument `username='Rahul'` matching the route's variable placeholder `<username>`.",
        "optionExplanations": {
            "A": "Correct. `url_for('profile', username='Rahul')` produces `/user/Rahul`.",
            "B": "Incorrect. `url_for()` expects the function name, not a hardcoded URL path.",
            "C": "Incorrect. Missing the endpoint (function name) argument.",
            "D": "Incorrect. Dynamic arguments must be passed as keyword arguments matching the variable name."
        },
        "practicalExample": "Inside a Jinja2 template: `<a href=\"{{ url_for('profile', username='Rahul') }}\">Profile</a>`."
    },
    {
        "id": "u2_13",
        "module": 2,
        "topic": "url_for() Query Parameters",
        "difficulty": "Hard",
        "question": "What is the result of calling `url_for('profile', username='Rahul', page=2, sort='asc')` when the route is `@app.route('/user/<username>') def profile(username):`?",
        "codeSnippet": None,
        "options": [
            "Flask raises a TypeError: unexpected arguments 'page' and 'sort'",
            "/user/Rahul?page=2&sort=asc",
            "/user/Rahul/2/asc",
            "/user/profile/Rahul"
        ],
        "correctAnswer": 1,
        "correctExplanation": "In `url_for()`, any keyword arguments that do NOT match dynamic variables defined in the route rule are automatically appended to the generated URL as query string parameters.",
        "optionExplanations": {
            "A": "Incorrect. `url_for()` does not crash on extra kwargs; it turns them into query parameters.",
            "B": "Correct. `username` satisfies `<username>`, while `page=2` and `sort=asc` are appended as `?page=2&sort=asc`.",
            "C": "Incorrect. They are not added as path segments unless defined in the route.",
            "D": "Incorrect. The endpoint function name does not appear in the URL path."
        },
        "practicalExample": "This is the standard pattern for pagination links: `url_for('catalog', category='books', page=3)`."
    },
    {
        "id": "u2_14",
        "module": 2,
        "topic": "url_for() External URLs",
        "difficulty": "Medium",
        "question": "How can you instruct `url_for()` to generate a full, absolute URL including the domain name and protocol (e.g., for use in an email verification link)?",
        "codeSnippet": None,
        "options": [
            "url_for('verify', token='xyz', _external=True)",
            "url_for('verify', token='xyz', absolute=True)",
            "url_for('verify', token='xyz', full_url=True)",
            "url_for('http://' + 'verify')"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Passing `_external=True` forces `url_for()` to generate an absolute URL with scheme and host (e.g. `https://example.com/verify?token=xyz`) instead of a relative path (`/verify?token=xyz`).",
        "optionExplanations": {
            "A": "Correct. `_external=True` produces an absolute URL.",
            "B": "Incorrect. `absolute` is not a valid parameter for `url_for()`.",
            "C": "Incorrect. `full_url` is not recognized.",
            "D": "Incorrect. Invalid syntax."
        },
        "practicalExample": "In password reset emails: `reset_link = url_for('reset_token', token=token, _external=True)`."
    },
    {
        "id": "u2_15",
        "module": 2,
        "topic": "HTML Templates",
        "difficulty": "Easy",
        "question": "Why is returning raw multiline HTML strings directly from Python view functions considered bad practice in production?",
        "codeSnippet": "@app.route('/')\ndef home():\n    return '<html><body><h1>Welcome ' + user + '</h1></body></html>'",
        "options": [
            "Because Python does not allow strings longer than 20 characters",
            "Because it mixes business logic with presentation markup, violates separation of concerns, and creates unmaintainable, error-prone code",
            "Because browsers refuse to display HTML generated by Python strings",
            "Because inline strings are automatically converted into PDF documents"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Mixing raw HTML inside Python files violates the Separation of Concerns principle. It makes maintenance, styling, and collaboration between designers and backend developers nearly impossible, and exposes security risks like XSS without auto-escaping.",
        "optionExplanations": {
            "A": "Incorrect. Python strings can be gigabytes in length.",
            "B": "Correct. Violates separation of concerns, makes code unreadable, and hampers maintenance.",
            "C": "Incorrect. Browsers can display it, but development and security suffer severely.",
            "D": "Incorrect. Strings remain HTML text."
        },
        "practicalExample": "Instead of string concatenation, use `render_template('home.html', user=user)`."
    },
    {
        "id": "u2_16",
        "module": 2,
        "topic": "render_template()",
        "difficulty": "Easy",
        "question": "Which Flask function is imported to render dynamic HTML template files using the Jinja2 engine?",
        "codeSnippet": None,
        "options": [
            "load_html()",
            "render_template()",
            "display_page()",
            "compile_jinja()"
        ],
        "correctAnswer": 1,
        "correctExplanation": "`from flask import render_template` imports the standard Flask helper function that takes a template filename from the `templates/` folder, passes context data, invokes Jinja2, and returns a response string.",
        "optionExplanations": {
            "A": "Incorrect. `load_html()` does not exist in Flask.",
            "B": "Correct. `render_template()` is the core template rendering function in Flask.",
            "C": "Incorrect. `display_page()` does not exist.",
            "D": "Incorrect. `compile_jinja()` is not a Flask function."
        },
        "practicalExample": "`return render_template('index.html', title='Home')` renders `templates/index.html`."
    },
    {
        "id": "u2_17",
        "module": 2,
        "topic": "Jinja2 Delimiters",
        "difficulty": "Easy",
        "question": "Which Jinja2 delimiter is used for variable interpolation (outputting the value of a Python variable into the HTML)?",
        "codeSnippet": None,
        "options": [
            "{% ... %}",
            "{{ ... }}",
            "{# ... #}",
            "<# ... #>"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Double curly braces `{{ variable_name }}` print/interpolate the evaluated expression or variable value directly into the rendered HTML document.",
        "optionExplanations": {
            "A": "Incorrect. `{% %}` is used for control statements (if/for/block).",
            "B": "Correct. `{{ }}` outputs variable expressions (e.g. `{{ username }}`).",
            "C": "Incorrect. `{# #}` is used for template comments.",
            "D": "Incorrect. Not a valid Jinja2 delimiter."
        },
        "practicalExample": "`<h1>Welcome, {{ user.name }}!</h1>` prints `<h1>Welcome, Rahul!</h1>`."
    },
    {
        "id": "u2_18",
        "module": 2,
        "topic": "Jinja2 Delimiters",
        "difficulty": "Easy",
        "question": "Which Jinja2 delimiter is used for control logic statements such as conditionals (`if`) and loops (`for`)?",
        "codeSnippet": None,
        "options": [
            "{{ ... }}",
            "{% ... %}",
            "{# ... #}",
            "[[ ... ]]"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Curly brace with percent `{% statement %}` is used for statements, tags, and control flow such as `{% if %}`, `{% for %}`, `{% extends %}`, and `{% block %}`.",
        "optionExplanations": {
            "A": "Incorrect. `{{ }}` prints variable values.",
            "B": "Correct. `{% %}` executes control statements like conditionals and loops.",
            "C": "Incorrect. `{# #}` is for comments.",
            "D": "Incorrect. `[[ ]]` is not standard Jinja2 syntax."
        },
        "practicalExample": "`{% if is_logged_in %} <a href=\"/logout\">Logout</a> {% endif %}`."
    },
    {
        "id": "u2_19",
        "module": 2,
        "topic": "Jinja2 Delimiters",
        "difficulty": "Medium",
        "question": "What is the primary difference between an HTML comment `<!-- comment -->` and a Jinja2 comment `{# comment #}`?",
        "codeSnippet": None,
        "options": [
            "HTML comments are executed by Python, while Jinja2 comments are executed by the browser",
            "Jinja2 comments are stripped out on the server and NEVER sent to the client browser source, whereas HTML comments are visible to anyone using 'View Page Source'",
            "Jinja2 comments can only contain numbers",
            "There is no difference; both are displayed identically in browser source"
        ],
        "correctAnswer": 1,
        "correctExplanation": "`{# comment #}` is evaluated on the server: Jinja2 strips it completely during template rendering so it never appears in the HTML sent to the browser. HTML comments `<!-- comment -->` are sent to the client and visible via View Source.",
        "optionExplanations": {
            "A": "Incorrect. Neither comment type is executable code.",
            "B": "Correct. Jinja2 comments remain server-side and invisible to clients; HTML comments are delivered to the browser.",
            "C": "Incorrect. Jinja2 comments can contain any text.",
            "D": "Incorrect. The security and visibility difference is significant."
        },
        "practicalExample": "`{# TODO: fix backend database credentials #}` will never be seen by website visitors."
    },
    {
        "id": "u2_20",
        "module": 2,
        "topic": "Passing Data to Templates",
        "difficulty": "Easy",
        "question": "How do you pass a variable named `student_list` from your Python view function into `students.html`?",
        "codeSnippet": "students = ['Rahul', 'Amit', 'Neha']",
        "options": [
            "return render_template('students.html', students=students)",
            "return render_template('students.html', data=window.students)",
            "return render_template('students.html') + students",
            "return students.render('students.html')"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Context variables are passed into `render_template()` as keyword arguments: `render_template('template.html', template_variable_name=python_value)`.",
        "optionExplanations": {
            "A": "Correct. `render_template('students.html', students=students)` binds the list to the template variable `students`.",
            "B": "Incorrect. `window` is a client-side JavaScript object, not valid Python.",
            "C": "Incorrect. You cannot concatenate a list to a Response object.",
            "D": "Incorrect. Python lists have no `.render()` method."
        },
        "practicalExample": "Inside `students.html`, you can then iterate: `{% for s in students %} <li>{{ s }}</li> {% endfor %}`."
    },
    {
        "id": "u2_21",
        "module": 2,
        "topic": "Jinja2 Loops",
        "difficulty": "Easy",
        "question": "How do you iterate through a list of items named `products` inside a Jinja2 template?",
        "codeSnippet": None,
        "options": [
            "for item in products { {{ item }} }",
            "{% for item in products %}\n    <p>{{ item }}</p>\n{% endfor %}",
            "<loop items='products'> {{ item }} </loop>",
            "{{ for item in products }}"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Jinja2 loop syntax requires `{% for item in collection %}` and must be closed with an explicit `{% endfor %}` tag.",
        "optionExplanations": {
            "A": "Incorrect. This resembles JavaScript/C syntax, not Jinja2.",
            "B": "Correct. Standard Jinja2 loop syntax using `{% for %}` and `{% endfor %}`.",
            "C": "Incorrect. This is not a valid Jinja2 or HTML tag.",
            "D": "Incorrect. Control statements cannot use `{{ }}`."
        },
        "practicalExample": "Iterating over users: `<ul>{% for u in users %}<li>{{ u.name }}</li>{% endfor %}</ul>`."
    },
    {
        "id": "u2_22",
        "module": 2,
        "topic": "Jinja2 Loop Variables",
        "difficulty": "Medium",
        "question": "Inside a Jinja2 `{% for %}` loop, which special variable gives the current iteration count starting at 1?",
        "codeSnippet": None,
        "options": [
            "loop.index0",
            "loop.index",
            "loop.counter1",
            "loop.step"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Jinja2 provides automatic `loop` context variables. `loop.index` is the current iteration starting at 1. `loop.index0` starts at 0.",
        "optionExplanations": {
            "A": "Incorrect. `loop.index0` is 0-indexed (starts at 0).",
            "B": "Correct. `loop.index` is 1-indexed (starts at 1).",
            "C": "Incorrect. `loop.counter1` is not a valid Jinja2 property.",
            "D": "Incorrect. `loop.step` does not exist."
        },
        "practicalExample": "`{% for s in students %} {{ loop.index }}. {{ s }} {% endfor %}` outputs `1. Rahul  2. Amit`."
    },
    {
        "id": "u2_23",
        "module": 2,
        "topic": "Jinja2 Loop Variables",
        "difficulty": "Medium",
        "question": "How can you check whether the current iteration is the very first item of a loop in Jinja2?",
        "codeSnippet": None,
        "options": [
            "{% if loop.first %}",
            "{% if loop.is_start == 1 %}",
            "{% if loop.index == 0 %}",
            "{% if loop.top() %}"
        ],
        "correctAnswer": 0,
        "correctExplanation": "`loop.first` evaluates to `True` on the first iteration of the loop, and `False` on all subsequent iterations.",
        "optionExplanations": {
            "A": "Correct. `loop.first` is a built-in boolean property.",
            "B": "Incorrect. Property does not exist.",
            "C": "Incorrect. `loop.index` starts at 1, so it is never 0.",
            "D": "Incorrect. Not a valid method."
        },
        "practicalExample": "`<li class=\"{% if loop.first %}active{% endif %}\">` sets the first tab as active."
    },
    {
        "id": "u2_24",
        "module": 2,
        "topic": "Jinja2 Conditionals",
        "difficulty": "Easy",
        "question": "What is the proper syntax for an if-else statement in a Jinja2 template?",
        "codeSnippet": None,
        "options": [
            "if (user) { Welcome } else { Login }",
            "{% if user %}\n    <p>Welcome!</p>\n{% else %}\n    <p>Please login</p>\n{% endif %}",
            "{{ if user }} Welcome {{ else }} Login {{ endif }}",
            "<if condition='user'> Welcome </if>"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Jinja2 conditionals use `{% if condition %}`, optional `{% elif condition %}`, optional `{% else %}`, and MUST terminate with `{% endif %}`.",
        "optionExplanations": {
            "A": "Incorrect. C-style braces are not used in Jinja2.",
            "B": "Correct. Valid syntax: `{% if %}` ... `{% else %}` ... `{% endif %}`.",
            "C": "Incorrect. `{{ }}` is for outputting expressions, not flow control.",
            "D": "Incorrect. Invalid XML syntax."
        },
        "practicalExample": "Displaying admin links: `{% if user.is_admin %} <a href=\"/admin\">Admin</a> {% endif %}`."
    },
    {
        "id": "u2_25",
        "module": 2,
        "topic": "Template Inheritance",
        "difficulty": "Medium",
        "question": "What core problem in web layout design does Template Inheritance solve?",
        "codeSnippet": None,
        "options": [
            "It prevents Python from creating too many SQL databases",
            "It eliminates duplicated boilerplate code (such as `<head>`, navbars, and footers) by defining a shared base layout that child pages extend",
            "It automatically translates HTML pages into 50 foreign languages",
            "It replaces the need for CSS stylesheets"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Template inheritance implements the DRY (Don't Repeat Yourself) principle for UI. You define a master `base.html` containing common markup, and child templates merely override designated blocks.",
        "optionExplanations": {
            "A": "Incorrect. Template inheritance operates on HTML templates, not databases.",
            "B": "Correct. Centralizes headers, navbars, and footers so layout updates only need to be edited once in `base.html`.",
            "C": "Incorrect. It does not perform language translation.",
            "D": "Incorrect. CSS is still required for visual styling."
        },
        "practicalExample": "Updating a company logo in `base.html` instantly updates every page across the entire website."
    },
    {
        "id": "u2_26",
        "module": 2,
        "topic": "Template Inheritance",
        "difficulty": "Easy",
        "question": "Which tag must appear as the very first line of a child template inheriting from `base.html`?",
        "codeSnippet": None,
        "options": [
            "{% include 'base.html' %}",
            "{% extends 'base.html' %}",
            "{% inherit 'base.html' %}",
            "<extends src='base.html'>"
        ],
        "correctAnswer": 1,
        "correctExplanation": "The `{% extends 'base.html' %}` tag tells Jinja2 that the current template extends a parent template. It must be the first tag in the child file.",
        "optionExplanations": {
            "A": "Incorrect. `{% include %}` pastes a snippet into the current position; it is not inheritance.",
            "B": "Correct. `{% extends 'filename' %}` establishes template inheritance.",
            "C": "Incorrect. `{% inherit %}` is not a Jinja2 tag.",
            "D": "Incorrect. HTML does not have an `<extends>` tag."
        },
        "practicalExample": "At top of `about.html`: `{% extends 'base.html' %}`."
    },
    {
        "id": "u2_27",
        "module": 2,
        "topic": "Template Inheritance",
        "difficulty": "Medium",
        "question": "What is the function of the `{% block content %}{% endblock %}` directive in `base.html`?",
        "codeSnippet": None,
        "options": [
            "It blocks unauthorized users from viewing the website",
            "It acts as a placeholder that child templates can populate and override with their own unique page content",
            "It encrypts the HTML inside a cryptographic block",
            "It blocks CSS stylesheets from loading"
        ],
        "correctAnswer": 1,
        "correctExplanation": "A `{% block name %}` defines a named hook or placeholder in the parent template that child templates can override to inject page-specific content.",
        "optionExplanations": {
            "A": "Incorrect. It is not an authorization firewall.",
            "B": "Correct. Defines a replaceable placeholder block in the base layout.",
            "C": "Incorrect. No cryptographic operations are involved.",
            "D": "Incorrect. It does not block styling."
        },
        "practicalExample": "In `base.html`: `<main>{% block content %}{% endblock %}</main>`. In `contact.html`: `{% block content %}<h1>Contact</h1>{% endblock %}`."
    },
    {
        "id": "u2_28",
        "module": 2,
        "topic": "Template Inheritance",
        "difficulty": "Hard",
        "question": "If a child template wants to keep the default content of a parent block and simply append new content to it, which Jinja2 function is called?",
        "codeSnippet": None,
        "options": [
            "parent()",
            "super()",
            "base()",
            "append()"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Calling `{{ super() }}` inside an overridden block in a child template renders the contents of the parent template's block, allowing you to augment rather than completely overwrite it.",
        "optionExplanations": {
            "A": "Incorrect. `parent()` is not a valid Jinja2 function.",
            "B": "Correct. `{{ super() }}` pulls in the parent block's content (analogous to `super()` in Python OOP).",
            "C": "Incorrect. `base()` is not valid.",
            "D": "Incorrect. `append()` is not valid."
        },
        "practicalExample": "In a child template's scripts block: `{% block scripts %}{{ super() }}<script src=\"page.js\"></script>{% endblock %}` retains global scripts."
    },
    {
        "id": "u2_29",
        "module": 2,
        "topic": "Jinja2 Filters",
        "difficulty": "Easy",
        "question": "What symbol is used to apply a filter to a variable expression in Jinja2?",
        "codeSnippet": None,
        "options": [
            "The pipe character `|`",
            "The ampersand `&`",
            "The hash `#`",
            "The tilde `~`"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Filters are separated from variables by the pipe symbol `|`, following the syntax `{{ variable | filter_name }}`.",
        "optionExplanations": {
            "A": "Correct. The pipe symbol `|` applies filters (e.g. `{{ name | upper }}`).",
            "B": "Incorrect. Ampersand is not a filter delimiter.",
            "C": "Incorrect. Hash is used in comments `{# #}`.",
            "D": "Incorrect. Tilde `~` is Jinja2's string concatenation operator."
        },
        "practicalExample": "`{{ student_name | title }}` converts 'rahul sharma' into 'Rahul Sharma'."
    },
    {
        "id": "u2_30",
        "module": 2,
        "topic": "Jinja2 Filters",
        "difficulty": "Easy",
        "question": "If `name = 'rahul'`, what is the output of `{{ name | upper }}`?",
        "codeSnippet": None,
        "options": [
            "rahul",
            "Rahul",
            "RAHUL",
            "rAHUL"
        ],
        "correctAnswer": 2,
        "correctExplanation": "The `upper` filter converts all characters in a string to uppercase, producing `'RAHUL'`.",
        "optionExplanations": {
            "A": "Incorrect. This is lowercase.",
            "B": "Incorrect. This is produced by the `capitalize` filter.",
            "C": "Correct. `upper` transforms all letters to uppercase: `RAHUL`.",
            "D": "Incorrect. Inverted case is not produced."
        },
        "practicalExample": "`<h1>{{ page_title | upper }}</h1>`."
    },
    {
        "id": "u2_31",
        "module": 2,
        "topic": "Jinja2 Filters",
        "difficulty": "Medium",
        "question": "If `students = ['Rahul', 'Amit', 'Neha']`, what is the output of `{{ students | length }}`?",
        "codeSnippet": None,
        "options": [
            "['Rahul', 'Amit', 'Neha']",
            "3",
            "15",
            "True"
        ],
        "correctAnswer": 1,
        "correctExplanation": "The `length` filter returns the number of items in a sequence or collection (equivalent to Python's `len()`). For a list with 3 elements, it outputs `3`.",
        "optionExplanations": {
            "A": "Incorrect. This is the raw list.",
            "B": "Correct. The list contains 3 elements, so `{{ students | length }}` returns 3.",
            "C": "Incorrect. 15 might be character count, but `length` on a list counts items.",
            "D": "Incorrect. It returns an integer, not a boolean."
        },
        "practicalExample": "`<p>Total Enrolled: {{ students | length }}</p>` outputs `<p>Total Enrolled: 3</p>`."
    },
    {
        "id": "u2_32",
        "module": 2,
        "topic": "Jinja2 Filters",
        "difficulty": "Medium",
        "question": "What is the purpose of the `default` filter in Jinja2?",
        "codeSnippet": "{{ bio | default('No bio provided.', true) }}",
        "options": [
            "It permanently deletes the `bio` variable from the database",
            "It provides a fallback default value to display if the variable is undefined, None, or empty",
            "It sets the database column to DEFAULT in MySQL",
            "It formats the text as a default system font"
        ],
        "correctAnswer": 1,
        "correctExplanation": "The `default` filter specifies fallback content if the variable does not exist or evaluates to false/empty when `true` is passed as second argument.",
        "optionExplanations": {
            "A": "Incorrect. Filters do not modify databases.",
            "B": "Correct. Supplies a fallback value when the variable is missing or empty.",
            "C": "Incorrect. This is template display logic, not SQL DDL.",
            "D": "Incorrect. It has no effect on fonts."
        },
        "practicalExample": "If a user has no profile photo: `<img src=\"{{ user.avatar | default('default_avatar.png') }}\">`."
    },
    {
        "id": "u2_33",
        "module": 2,
        "topic": "Jinja2 Filters & Security",
        "difficulty": "Hard",
        "question": "What does the `safe` filter do in Jinja2, and why must it be used with extreme caution?",
        "codeSnippet": "{{ user_input | safe }}",
        "options": [
            "It encrypts the variable with AES-256 before sending it to the browser",
            "It disables Jinja2's automatic HTML escaping, rendering raw HTML tags directly; if used on untrusted user input, it introduces critical Cross-Site Scripting (XSS) vulnerabilities",
            "It scans the variable for viruses and removes malware",
            "It restricts viewing of the variable to logged-in users only"
        ],
        "correctAnswer": 1,
        "correctExplanation": "By default, Jinja2 auto-escapes HTML characters (e.g. `<` becomes `&lt;`) to prevent Cross-Site Scripting (XSS). The `safe` filter marks a string as safe to render as raw HTML. If applied to untrusted user input, malicious `<script>` tags will execute in users' browsers.",
        "optionExplanations": {
            "A": "Incorrect. `safe` does not perform encryption.",
            "B": "Correct. `safe` bypasses auto-escaping to render raw HTML. Using it on user input opens the door to XSS attacks.",
            "C": "Incorrect. It does not scan for viruses.",
            "D": "Incorrect. It does not manage authentication permissions."
        },
        "practicalExample": "Use `safe` for verified admin HTML (like Markdown converted HTML), never for raw user comments: `{{ comment | safe }}` is dangerous!"
    },
    {
        "id": "u2_34",
        "module": 2,
        "topic": "Jinja2 Filters",
        "difficulty": "Medium",
        "question": "Which filter joins list elements into a single comma-separated string?",
        "codeSnippet": "tags = ['python', 'flask', 'web']",
        "options": [
            "{{ tags | join(', ') }}",
            "{{ tags | concat(', ') }}",
            "{{ tags | merge(', ') }}",
            "{{ tags | implode(', ') }}"
        ],
        "correctAnswer": 0,
        "correctExplanation": "The `join` filter concatenates sequence items into a single string separated by the delimiter string passed as argument: `{{ tags | join(', ') }}` produces `'python, flask, web'`.",
        "optionExplanations": {
            "A": "Correct. `join` concatenates elements with the given separator.",
            "B": "Incorrect. `concat` is not a Jinja2 filter.",
            "C": "Incorrect. `merge` does not exist in Jinja2.",
            "D": "Incorrect. `implode` is a PHP function, not Jinja2."
        },
        "practicalExample": "Displaying student skills: `Skills: {{ skills | join(' | ') }}`."
    },
    {
        "id": "u2_35",
        "module": 2,
        "topic": "Serving Static Assets",
        "difficulty": "Easy",
        "question": "What is the defining characteristic of 'static files' compared to template files in Flask?",
        "codeSnippet": None,
        "options": [
            "Static files are stored in the database, while templates are stored on disk",
            "Static files (CSS, JS, images) are served directly to the client browser without any Python server-side execution or Jinja compilation",
            "Static files are rewritten every time a user refreshes the page",
            "Static files can only be accessed by the server administrator"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Static files are delivered to the browser byte-for-byte as they exist on disk without dynamic server execution or template variable replacement.",
        "optionExplanations": {
            "A": "Incorrect. Both static files and templates reside on the server disk.",
            "B": "Correct. Static assets are served directly without backend Python interpretation.",
            "C": "Incorrect. Static files remain unchanged unless edited by developers.",
            "D": "Incorrect. Static files are publicly accessible to clients."
        },
        "practicalExample": "A PNG logo `logo.png` is sent directly to the browser to display."
    },
    {
        "id": "u2_36",
        "module": 2,
        "topic": "Linking Static CSS",
        "difficulty": "Easy",
        "question": "What is the recommended, best-practice way to link an external stylesheet located at `static/css/style.css` inside a Flask Jinja2 template?",
        "codeSnippet": None,
        "options": [
            "<link rel='stylesheet' href='/static/css/style.css'>",
            "<link rel='stylesheet' href=\"{{ url_for('static', filename='css/style.css') }}\">",
            "<style src='css/style.css'>",
            "<link rel='stylesheet' href='../css/style.css'>"
        ],
        "correctAnswer": 1,
        "correctExplanation": "`{{ url_for('static', filename='css/style.css') }}` dynamically generates the correct path to the static asset relative to the application's root context, ensuring it works even behind sub-paths or reverse proxies.",
        "optionExplanations": {
            "A": "Incorrect. Hardcoding `/static/css/style.css` breaks if the application is mounted under a URL prefix.",
            "B": "Correct. `url_for('static', filename='...')` is the standard Flask best practice.",
            "C": "Incorrect. `<style>` tags do not take a `src` attribute.",
            "D": "Incorrect. Relative dot paths break on nested routes like `/user/101/edit`."
        },
        "practicalExample": "In `base.html`: `<link rel=\"stylesheet\" href=\"{{ url_for('static', filename='css/style.css') }}\">`."
    },
    {
        "id": "u2_37",
        "module": 2,
        "topic": "Linking Static JavaScript",
        "difficulty": "Easy",
        "question": "How do you include a client-side JavaScript file located at `static/js/main.js` inside an HTML template?",
        "codeSnippet": None,
        "options": [
            "<script src=\"{{ url_for('static', filename='js/main.js') }}\"></script>",
            "<javascript file='js/main.js'>",
            "<script link='/static/main.js'>",
            "<script code=\"{{ load('js/main.js') }}\">"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Using `<script src=\"{{ url_for('static', filename='js/main.js') }}\"></script>` properly resolves the URL for the script from Flask's static endpoint.",
        "optionExplanations": {
            "A": "Correct. Standard `<script src=\"{{ url_for('static', filename='...') }}\"></script>` syntax.",
            "B": "Incorrect. There is no `<javascript>` HTML tag.",
            "C": "Incorrect. `<script>` uses `src`, not `link`.",
            "D": "Incorrect. Invalid syntax."
        },
        "practicalExample": "Adding interactive logic: `<script src=\"{{ url_for('static', filename='js/app.js') }}\"></script>`."
    },
    {
        "id": "u2_38",
        "module": 2,
        "topic": "Displaying Images",
        "difficulty": "Easy",
        "question": "How do you render an image located at `static/images/banner.png` in an HTML template?",
        "codeSnippet": None,
        "options": [
            "<img src=\"{{ url_for('static', filename='images/banner.png') }}\" alt=\"Banner\">",
            "<image path='static/images/banner.png'>",
            "<picture href=\"{{ static('images/banner.png') }}\">",
            "<img source='images/banner.png'>"
        ],
        "correctAnswer": 0,
        "correctExplanation": "In HTML, images use the `<img>` tag with `src` pointing to the dynamically generated static URL via `{{ url_for('static', filename='images/banner.png') }}`.",
        "optionExplanations": {
            "A": "Correct. Standard `<img>` tag with `url_for('static', filename=...)`.",
            "B": "Incorrect. `<image path=>` is not valid HTML.",
            "C": "Incorrect. `static()` is not a default Jinja global function.",
            "D": "Incorrect. `<img>` requires `src`, not `source`."
        },
        "practicalExample": "`<img src=\"{{ url_for('static', filename='images/logo.png') }}\" alt=\"College Logo\">`."
    },
    {
        "id": "u2_39",
        "module": 2,
        "topic": "Jinja2 Auto-escaping",
        "difficulty": "Medium",
        "question": "If a user enters `<script>alert('hacked')</script>` in a contact form and it is rendered in a template as `{{ message }}`, what does Jinja2 render?",
        "codeSnippet": None,
        "options": [
            "It executes the JavaScript alert popup in the browser",
            "It safely escapes the characters to `&lt;script&gt;alert('hacked')&lt;/script&gt;`, displaying the text harmlessly without executing it",
            "It deletes the entire HTML document",
            "It crashes the Flask server with an HTTP 500 error"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Jinja2 automatically escapes HTML special characters (`<`, `>`, `&`, `'`, `\"`) in `.html` templates by default, converting `<` into `&lt;` so the browser displays the literal text rather than executing it as JavaScript.",
        "optionExplanations": {
            "A": "Incorrect. Auto-escaping explicitly prevents the script from executing.",
            "B": "Correct. Special HTML characters are converted to harmless HTML entities, preventing Cross-Site Scripting (XSS).",
            "C": "Incorrect. The document is not deleted.",
            "D": "Incorrect. Auto-escaping happens seamlessly without errors."
        },
        "practicalExample": "This automatic behavior protects Flask applications against basic XSS injection attacks out of the box."
    },
    {
        "id": "u2_40",
        "module": 2,
        "topic": "Jinja2 striptags Filter",
        "difficulty": "Medium",
        "question": "What is the output of `{{ '<h1>Hello <b>World</b></h1>' | striptags }}` in a Jinja2 template?",
        "codeSnippet": None,
        "options": [
            "<h1>Hello <b>World</b></h1>",
            "Hello World",
            "&lt;h1&gt;Hello&lt;/h1&gt;",
            "HELLO WORLD"
        ],
        "correctAnswer": 1,
        "correctExplanation": "The `striptags` filter strips SGML/XML/HTML tags from the string, leaving only the inner plain text content: `'Hello World'`.",
        "optionExplanations": {
            "A": "Incorrect. The HTML tags are stripped.",
            "B": "Correct. `striptags` removes `<h1>`, `</h1>`, `<b>`, and `</b>`, yielding `'Hello World'`.",
            "C": "Incorrect. That would be the result of escaping, not stripping.",
            "D": "Incorrect. `striptags` does not convert text to uppercase."
        },
        "practicalExample": "Useful for generating plain text previews or email subject lines from rich HTML blog posts."
    },
    {
        "id": "u2_41",
        "module": 2,
        "topic": "Custom Jinja Filters",
        "difficulty": "Hard",
        "question": "How can a developer register a custom filter named `reverse_str` in Flask?",
        "codeSnippet": "def reverse_str(s):\n    return s[::-1]",
        "options": [
            "Using `@app.template_filter('reverse_str')` decorator above the function",
            "Using `@app.route('/reverse_str')`",
            "Adding `reverse_str` to the `venv/Scripts/` folder",
            "By writing a MySQL stored procedure"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Flask provides the `@app.template_filter('filter_name')` decorator to register custom Python functions as Jinja2 template filters.",
        "optionExplanations": {
            "A": "Correct. `@app.template_filter()` registers custom template filters in Flask.",
            "B": "Incorrect. `@app.route()` creates URL routes, not template filters.",
            "C": "Incorrect. Virtual environments manage packages, not Jinja filters.",
            "D": "Incorrect. Database stored procedures cannot be called as Jinja filters."
        },
        "practicalExample": "```python\n@app.template_filter('reverse')\ndef rev_filter(s):\n    return s[::-1]\n```\nIn template: `{{ 'Flask' | reverse }}` outputs `ksalF`."
    },
    {
        "id": "u2_42",
        "module": 2,
        "topic": "Directory Conventions",
        "difficulty": "Easy",
        "question": "What error occurs if you call `render_template('missing.html')` and `missing.html` does not exist inside the `templates/` folder?",
        "codeSnippet": None,
        "options": [
            "404 Not Found returned to the browser silently",
            "jinja2.exceptions.TemplateNotFound: missing.html",
            "sqlite3.OperationalError: no such table",
            "The browser crashes and closes immediately"
        ],
        "correctAnswer": 1,
        "correctExplanation": "If the requested template file cannot be found in Flask's template search paths, Jinja2 raises a `TemplateNotFound` exception, resulting in a 500 server error in production or a detailed traceback in debug mode.",
        "optionExplanations": {
            "A": "Incorrect. It raises a server-side exception, not a 404 response.",
            "B": "Correct. Jinja2 raises `jinja2.exceptions.TemplateNotFound: <filename>`.",
            "C": "Incorrect. This is not a database error.",
            "D": "Incorrect. The browser receives an HTTP 500 error response."
        },
        "practicalExample": "Check your file spelling or ensure `missing.html` is inside `templates/` and not project root."
    },
    {
        "id": "u2_43",
        "module": 2,
        "topic": "Jinja2 Dictionary Access",
        "difficulty": "Medium",
        "question": "Given the dictionary `user = {'name': 'Rahul', 'age': 20}`, how can you display the user's name in a Jinja2 template?",
        "codeSnippet": None,
        "options": [
            "Both `{{ user.name }}` and `{{ user['name'] }}` are valid",
            "Only `{{ user->name }}` is permitted",
            "Only `{{ get(user, 'name') }}` is permitted",
            "Dictionaries cannot be passed to Jinja2 templates"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Jinja2 supports both dot notation `{{ user.name }}` and Python-style bracket notation `{{ user['name'] }}` for accessing dictionary keys.",
        "optionExplanations": {
            "A": "Correct. Jinja2 seamlessly handles both dot notation (`user.name`) and bracket indexing (`user['name']`).",
            "B": "Incorrect. `->` is PHP object operator syntax, invalid in Jinja2.",
            "C": "Incorrect. `get()` is not mandatory in Jinja2 expressions.",
            "D": "Incorrect. Dictionaries are passed and accessed constantly in Flask."
        },
        "practicalExample": "`<h3>{{ user.name }} (Age: {{ user.age }})</h3>` renders `<h3>Rahul (Age: 20)</h3>`."
    },
    {
        "id": "u2_44",
        "module": 2,
        "topic": "Jinja2 Macros",
        "difficulty": "Hard",
        "question": "What is a 'Macro' in Jinja2?",
        "codeSnippet": "{% macro render_input(name, type='text') %}\n    <input type=\"{{ type }}\" name=\"{{ name }}\" class=\"form-control\">\n{% endmacro %}",
        "options": [
            "A malicious script that attacks the client computer",
            "A reusable template component analogous to a Python function that generates repetitive HTML snippets with parameters",
            "A database stored procedure executed on MySQL",
            "A CSS media query that adjusts screen resolution"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Macros in Jinja2 behave like Python functions. They take arguments and return reusable HTML markup, adhering to DRY principles for recurring UI components such as form inputs or pagination bars.",
        "optionExplanations": {
            "A": "Incorrect. Macros in Jinja2 are benign templating functions.",
            "B": "Correct. Jinja2 macros define reusable, parameterized snippets of HTML markup.",
            "C": "Incorrect. Macros run in Jinja2, not in the database.",
            "D": "Incorrect. Macros are not CSS rules."
        },
        "practicalExample": "Calling `{{ render_input('username') }}` outputs `<input type=\"text\" name=\"username\" class=\"form-control\">`."
    },
    {
        "id": "u2_45",
        "module": 2,
        "topic": "Jinja2 Include Tag",
        "difficulty": "Medium",
        "question": "What is the difference between `{% extends %}` and `{% include %}` in Jinja2?",
        "codeSnippet": None,
        "options": [
            "`{% extends %}` establishes top-down layout inheritance by extending a base template and overriding blocks, while `{% include %}` renders and inlines an external snippet directly into the current template",
            "`{% include %}` is used for Python code, while `{% extends %}` is used for CSS",
            "`{% extends %}` only works on mobile devices",
            "There is no difference; they are exact aliases"
        ],
        "correctAnswer": 0,
        "correctExplanation": "`{% extends %}` is for template inheritance (child pages extending a master `base.html`). `{% include %}` is for modular composition, pulling in a static reusable partial snippet (like `_navbar.html` or `_footer.html`) at a specific point.",
        "optionExplanations": {
            "A": "Correct. `extends` = structural inheritance; `include` = snippet composition.",
            "B": "Incorrect. Neither tag executes raw Python or CSS directly.",
            "C": "Incorrect. Jinja2 runs on the server regardless of client device.",
            "D": "Incorrect. Their behavioral architecture is completely different."
        },
        "practicalExample": "`{% include '_alerts.html' %}` inserts the flash message alert box snippet into the navbar."
    },
    {
        "id": "u2_46",
        "module": 2,
        "topic": "Dynamic Route Converter Matching",
        "difficulty": "Medium",
        "question": "Consider the route: `@app.route('/price/<float:amount>')`. Which of the following URLs will successfully trigger this route?",
        "codeSnippet": None,
        "options": [
            "/price/99.95",
            "/price/free",
            "/price/100,50",
            "/price/ten"
        ],
        "correctAnswer": 0,
        "correctExplanation": "The `float` converter matches positive floating-point numbers formatted with a decimal point. `99.95` is a valid floating point number.",
        "optionExplanations": {
            "A": "Correct. `99.95` is a valid positive float, so it matches and passes `amount=99.95` as a Python `float`.",
            "B": "Incorrect. `'free'` is a string and fails the float converter.",
            "C": "Incorrect. Commas are not valid decimal separators in Python floats.",
            "D": "Incorrect. `'ten'` is non-numeric."
        },
        "practicalExample": "Visiting `/price/99.95` results in `amount = 99.95` with `type(amount) == float`."
    },
    {
        "id": "u2_47",
        "module": 2,
        "topic": "Passing Context Unpacking",
        "difficulty": "Hard",
        "question": "What is the effect of using Python's dictionary unpacking operator `**` in `render_template()`?",
        "codeSnippet": "context = {'title': 'Home', 'user': 'Rahul', 'role': 'Admin'}\nreturn render_template('index.html', **context)",
        "options": [
            "It raises a SyntaxError because `render_template` only accepts strings",
            "It passes each key-value pair of the dictionary as individual keyword arguments into the template, allowing direct access via `{{ title }}`, `{{ user }}`, and `{{ role }}`",
            "It converts the dictionary into an encrypted binary file",
            "It deletes the variables from memory after rendering"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Using `**context` unpacks dictionary keys into keyword arguments (`title='Home', user='Rahul', role='Admin'`), allowing template authors to access variables directly as `{{ title }}` rather than `{{ context.title }}`.",
        "optionExplanations": {
            "A": "Incorrect. Dictionary unpacking is standard, idiomatic Python.",
            "B": "Correct. Keys are unpacked into top-level template context variables.",
            "C": "Incorrect. No encryption occurs.",
            "D": "Incorrect. Python garbage collection handles memory normally."
        },
        "practicalExample": "Instead of typing `render_template('page.html', a=a, b=b, c=c)`, you can write `render_template('page.html', **locals())` or `**context`."
    },
    {
        "id": "u2_48",
        "module": 2,
        "topic": "Jinja2 Whitespace Control",
        "difficulty": "Hard",
        "question": "What is the purpose of adding a minus sign `-` to Jinja2 tags, such as `{%- if condition -%}`?",
        "codeSnippet": None,
        "options": [
            "It subtracts 1 from the condition",
            "It strips whitespace (spaces, tabs, newlines) before or after the tag in the rendered HTML output",
            "It inverts the boolean condition from True to False",
            "It marks the condition as a negative number"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Adding a minus sign to the start or end of a tag (`{%-` or `-%}`) strips leading or trailing whitespace and newlines from the generated HTML output, preventing blank lines.",
        "optionExplanations": {
            "A": "Incorrect. It does not perform mathematical subtraction.",
            "B": "Correct. `{%-` strips leading whitespace; `-%}` strips trailing whitespace.",
            "C": "Incorrect. Inverting conditions uses the `not` keyword.",
            "D": "Incorrect. It has no effect on numeric values."
        },
        "practicalExample": "Prevents dozens of unnecessary blank lines when looping through tabular data in HTML."
    },
    {
        "id": "u2_49",
        "module": 2,
        "topic": "Static File Caching",
        "difficulty": "Medium",
        "question": "When developing a Flask web application, why do changes to `static/css/style.css` sometimes fail to show up in the browser after reloading?",
        "codeSnippet": None,
        "options": [
            "Flask deletes all CSS changes automatically",
            "Web browsers aggressively cache static assets like CSS and JS locally; a hard refresh (Ctrl+F5) or clearing browser cache is required to fetch the updated file",
            "CSS files cannot be edited once created",
            "Flask only supports inline styles in HTML"
        ],
        "correctAnswer": 1,
        "correctExplanation": "To optimize performance, browsers store copies of static files in local cache. If the URL `/static/css/style.css` does not change, the browser often reuses the cached version rather than re-downloading it from the server.",
        "optionExplanations": {
            "A": "Incorrect. Flask never deletes user CSS files.",
            "B": "Correct. Browser caching retains the previous static file version; a hard refresh (Ctrl+F5 or Cmd+Shift+R) forces a fresh fetch.",
            "C": "Incorrect. CSS files are plain text and easily edited.",
            "D": "Incorrect. Flask serves external static CSS seamlessly."
        },
        "practicalExample": "Developers often append a query parameter like `{{ url_for('static', filename='css/style.css', v='1.1') }}` for cache busting."
    },
    {
        "id": "u2_50",
        "module": 2,
        "topic": "End-to-End Pipeline Summary",
        "difficulty": "Hard",
        "question": "Which of the following statements accurately summarizes the complete Flask request-to-render pipeline for Module 2?",
        "codeSnippet": None,
        "options": [
            "The browser sends an HTTP request; Werkzeug's routing map matches the URL to a view function; the function executes and calls `render_template()`; Jinja2 interpolates variables, executes loops/inheritance, and outputs pure HTML; the server responds with 200 OK, and the browser then fetches static assets via dedicated static routes",
            "Flask compiles Python into machine assembly; the client downloads the Python runtime; the browser executes the Python view function locally inside Chrome V8",
            "Templates are stored inside SQLite and queried using SQL SELECT statements before being converted into static JPEG images",
            "Dynamic URL building with `url_for()` only works if the server is hosted on Amazon Web Services"
        ],
        "correctAnswer": 0,
        "correctExplanation": "This accurately reflects the complete pipeline: Browser HTTP request -> Werkzeug URL Map matching -> View execution -> `render_template()` data passing -> Jinja2 HTML rendering -> 200 OK response payload -> Browser requests linked static assets (`/static/...`).",
        "optionExplanations": {
            "A": "Correct. Thoroughly captures the end-to-end request, view, Jinja2 rendering, and static file resolution pipeline.",
            "B": "Incorrect. Browsers never run Python or download Python runtimes in standard Flask applications.",
            "C": "Incorrect. Templates are text files on disk, not SQLite database images.",
            "D": "Incorrect. `url_for()` is a core Flask feature that works in any environment."
        },
        "practicalExample": "Visiting a website triggers this exact multi-step pipeline for every single dynamic page view."
    }
]

def generate():
    assert len(questions) == 50, f"Expected 50 questions, got {len(questions)}"
    for idx, q in enumerate(questions):
        assert q["id"] == f"u2_{idx+1:02d}", f"ID mismatch at index {idx}: {q['id']}"
        assert len(q["options"]) == 4, f"Options count not 4 at {q['id']}"
        assert 0 <= q["correctAnswer"] <= 3, f"Invalid correctAnswer at {q['id']}"
        for opt_key in ["A", "B", "C", "D"]:
            assert opt_key in q["optionExplanations"], f"Missing option explanation {opt_key} at {q['id']}"
            assert len(q["optionExplanations"][opt_key]) > 10, f"Option explanation too short {opt_key} at {q['id']}"
        assert q["module"] == 2, f"Module mismatch at {q['id']}"
        assert q["difficulty"] in ["Easy", "Medium", "Hard"], f"Invalid difficulty at {q['id']}"

    js_content = f"// Module 2: Routing, Templating and Static Files\n// Total Questions: {len(questions)}\n// Auto-generated & Verified Question Bank\n\nwindow.UNIT2_QUESTIONS = {json.dumps(questions, indent=2, ensure_ascii=False)};\n"
    with open("data/unit2.js", "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"Successfully generated data/unit2.js with {len(questions)} validated questions.")

if __name__ == "__main__":
    generate()
