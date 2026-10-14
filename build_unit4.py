# -*- coding: utf-8 -*-
"""
Module 4 Question Bank Generator
Covers 50 validated MCQs on:
- Relational Database Basics & Relational Concepts
- SQLite vs MySQL / PostgreSQL in Flask
- What is an ORM & SQLAlchemy Architecture
- Flask-SQLAlchemy Configuration & Connection URIs (sqlite:/// vs mysql+pymysql://)
- SQLALCHEMY_TRACK_MODIFICATIONS = False
- Model Declarations: db.Model, __tablename__, db.Column, types (Integer, String, etc.)
- Column Constraints: primary_key, nullable, unique, default
- __repr__() method purpose
- Table Creation: db.create_all() & app.app_context()
- CRUD - Create: Instantiation, db.session.add(), db.session.commit()
- CRUD - Read: Model.query.all(), db.session.get(), filter_by(), first(), filter(), order_by()
- CRUD - Update: Python attribute mutation & dirty tracking (No db.session.add needed!)
- CRUD - Delete: Existence check, db.session.delete(), db.session.commit(), soft deletes
- Transaction Management: session.rollback() & try/except transaction safety pattern
- Database Relationships: db.relationship, db.ForeignKey, backref, One-to-Many
- Flask-Migrate & Alembic: flask db init, flask db migrate, flask db upgrade, flask db downgrade
- Hands-on Lab: Student Portal & CRUD architectures
"""

import json

questions = [
    {
        "id": "u4_01",
        "module": 4,
        "topic": "Relational Databases",
        "difficulty": "Easy",
        "question": "What is the defining characteristic of SQLite compared to MySQL or PostgreSQL?",
        "codeSnippet": None,
        "options": [
            "SQLite requires a dedicated cloud server daemon running in the background",
            "SQLite is a serverless, zero-configuration, self-contained database engine that stores all tables in a single local disk file",
            "SQLite only runs on Android devices and cannot be used in Python",
            "SQLite does not support tables, rows, or columns"
        ],
        "correctAnswer": 1,
        "correctExplanation": "SQLite is a lightweight, serverless relational database engine. It does not require a separate server process; instead, it reads and writes directly to an ordinary disk file, making it ideal for development and small-to-medium applications.",
        "optionExplanations": {
            "A": "Incorrect. SQLite is serverless; MySQL and PostgreSQL require dedicated server daemons.",
            "B": "Correct. SQLite stores data in a single local file without running a background server process.",
            "C": "Incorrect. SQLite is built into Python's standard library and works across all platforms.",
            "D": "Incorrect. SQLite is a full relational database supporting standard SQL tables, rows, and constraints."
        },
        "practicalExample": "In Flask, `sqlite:///students.db` creates a local file `students.db` in your project folder."
    },
    {
        "id": "u4_02",
        "module": 4,
        "topic": "ORM Concept",
        "difficulty": "Easy",
        "question": "What does the acronym 'ORM' stand for in modern web development?",
        "codeSnippet": None,
        "options": [
            "Online Routing Mechanism",
            "Object-Relational Mapping",
            "Operating Resource Manager",
            "Optimal Request Multiplexer"
        ],
        "correctAnswer": 1,
        "correctExplanation": "ORM stands for Object-Relational Mapping. It is a programming technique that allows developers to interact with relational databases using object-oriented code instead of writing raw SQL strings.",
        "optionExplanations": {
            "A": "Incorrect. Routing is handled by frameworks, not ORMs.",
            "B": "Correct. Object-Relational Mapping translates between Python classes and database tables.",
            "C": "Incorrect. Not an operating system resource manager.",
            "D": "Incorrect. Fabricated technical phrase."
        },
        "practicalExample": "Instead of `SELECT * FROM students`, an ORM lets you write `Student.query.all()`."
    },
    {
        "id": "u4_03",
        "module": 4,
        "topic": "ORM Benefits",
        "difficulty": "Medium",
        "question": "Which of the following is a major security advantage of using SQLAlchemy ORM over raw string concatenation in SQL queries?",
        "codeSnippet": None,
        "options": [
            "It automatically disables all passwords on the server",
            "It uses parameterized queries under the hood, protecting the application against SQL Injection attacks",
            "It prevents users from connecting via HTTPS",
            "It encrypts all HTML templates into bytecode"
        ],
        "correctAnswer": 1,
        "correctExplanation": "SQLAlchemy ORM automatically parameterizes query arguments. When you search `Student.query.filter_by(name=user_input)`, values are passed as bound parameters rather than directly interpolated into SQL strings, neutralizing SQL injection attempts.",
        "optionExplanations": {
            "A": "Incorrect. ORMs do not disable passwords.",
            "B": "Correct. Parameterization prevents malicious input like `' OR '1'='1` from altering SQL query structure.",
            "C": "Incorrect. HTTPS operates at the network transport layer, unaffected by ORMs.",
            "D": "Incorrect. Jinja2 manages templates, not SQLAlchemy."
        },
        "practicalExample": "An input like `' OR '1'='1` is treated as literal search text rather than executable SQL syntax."
    },
    {
        "id": "u4_04",
        "module": 4,
        "topic": "Flask-SQLAlchemy Setup",
        "difficulty": "Easy",
        "question": "Which command installs the Flask-SQLAlchemy extension alongside MySQL database driver support?",
        "codeSnippet": None,
        "options": [
            "pip install flask flask-sqlalchemy pymysql",
            "npm install sqlalchemy mysql",
            "python get database-orm",
            "install-db --flask"
        ],
        "correctAnswer": 0,
        "correctExplanation": "`pip install flask flask-sqlalchemy pymysql` installs the Flask framework, the Flask-SQLAlchemy bridge extension, and PyMySQL (the pure-Python MySQL client driver).",
        "optionExplanations": {
            "A": "Correct. Official pip command highlighted in course slides.",
            "B": "Incorrect. `npm` is for Node.js, not Python.",
            "C": "Incorrect. Python has no `get` package command.",
            "D": "Incorrect. Invalid syntax."
        },
        "practicalExample": "Terminal: `pip install flask-sqlalchemy pymysql`."
    },
    {
        "id": "u4_05",
        "module": 4,
        "topic": "Database Connection URI",
        "difficulty": "Medium",
        "question": "In the SQLite URI configuration `app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.db'`, what do the three forward slashes `///` signify?",
        "codeSnippet": None,
        "options": [
            "A network IP address connection",
            "A relative file path from the application's root directory",
            "An absolute file path starting at the root filesystem drive",
            "That SQLite runs on port 3"
        ],
        "correctAnswer": 1,
        "correctExplanation": "In SQLite connection URIs: three slashes (`sqlite:///filename.db`) specify a relative path relative to the project root directory. Four slashes (`sqlite:////path/to/file.db`) indicate an absolute filesystem path.",
        "optionExplanations": {
            "A": "Incorrect. SQLite has no network IP address.",
            "B": "Correct. Three slashes denote a relative path from the application root.",
            "C": "Incorrect. An absolute path requires four slashes on Unix (`sqlite:////`) or drive letter on Windows (`sqlite:///C:/...`).",
            "D": "Incorrect. SQLite is serverless and uses no network ports."
        },
        "practicalExample": "`sqlite:///students.db` places `students.db` right inside the project folder."
    },
    {
        "id": "u4_06",
        "module": 4,
        "topic": "Database Connection URI",
        "difficulty": "Medium",
        "question": "Which of the following represents the correct format for connecting Flask-SQLAlchemy to a MySQL database named `college` on `localhost` with user `root` and password `admin123`?",
        "codeSnippet": None,
        "options": [
            "mysql://root:admin123/localhost/college",
            "mysql+pymysql://root:admin123@localhost/college",
            "sqlite:///mysql:root:admin123@localhost/college",
            "db.connect('mysql', user='root', pwd='admin123')"
        ],
        "correctAnswer": 1,
        "correctExplanation": "SQLAlchemy database URIs follow the RFC-1738 format: `dialect+driver://username:password@host:port/database_name`. For MySQL using PyMySQL, it is `mysql+pymysql://root:admin123@localhost/college`.",
        "optionExplanations": {
            "A": "Incorrect. Missing `@` separator between credentials and host, and missing driver specification.",
            "B": "Correct. `mysql+pymysql://root:admin123@localhost/college` correctly defines dialect, driver, auth, host, and database.",
            "C": "Incorrect. SQLite and MySQL are two different database engines.",
            "D": "Incorrect. Flask-SQLAlchemy uses configuration strings in `app.config`, not a connect method."
        },
        "practicalExample": "`app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:pass@localhost/college'`."
    },
    {
        "id": "u4_07",
        "module": 4,
        "topic": "SQLALCHEMY_TRACK_MODIFICATIONS",
        "difficulty": "Easy",
        "question": "Why is `app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False` standard practice in Flask-SQLAlchemy applications?",
        "codeSnippet": None,
        "options": [
            "To disable the database completely",
            "To disable Flask-SQLAlchemy's event modification tracking system, which consumes significant memory overhead and is deprecated by default",
            "To prevent users from adding new rows",
            "To make SQLite run in read-only mode"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Flask-SQLAlchemy features an event system that tracks object modifications and emits signals. This system adds significant memory overhead to every request and is rarely needed, so disabling it removes warning notices and saves resources.",
        "optionExplanations": {
            "A": "Incorrect. Database operations function completely normally.",
            "B": "Correct. Disables unnecessary memory-intensive event tracking signals.",
            "C": "Incorrect. Insert, update, and delete queries are completely unaffected.",
            "D": "Incorrect. It does not place the database in read-only mode."
        },
        "practicalExample": "If omitted, Flask logs a yellow warning in terminal recommending you set it to `False`."
    },
    {
        "id": "u4_08",
        "module": 4,
        "topic": "Model Declaration",
        "difficulty": "Easy",
        "question": "Which base class must every database model inherit from in Flask-SQLAlchemy?",
        "codeSnippet": "class Student(_________):\n    id = db.Column(db.Integer, primary_key=True)",
        "options": [
            "db.Table",
            "db.Model",
            "db.Entity",
            "models.Base"
        ],
        "correctAnswer": 1,
        "correctExplanation": "In Flask-SQLAlchemy, the `db` instance provides a declarative base class `db.Model` that all user entity models inherit from.",
        "optionExplanations": {
            "A": "Incorrect. `db.Table` is used for many-to-many association tables, not model classes.",
            "B": "Correct. `db.Model` is the standard declarative base class.",
            "C": "Incorrect. `db.Entity` does not exist in Flask-SQLAlchemy.",
            "D": "Incorrect. Django models inherit from `models.Model`; Flask-SQLAlchemy uses `db.Model`."
        },
        "practicalExample": "`class User(db.Model):` creates an ORM model representing users."
    },
    {
        "id": "u4_09",
        "module": 4,
        "topic": "__tablename__ Attribute",
        "difficulty": "Medium",
        "question": "What is the purpose of the `__tablename__ = 'students'` class attribute inside an SQLAlchemy model?",
        "codeSnippet": "class Student(db.Model):\n    __tablename__ = 'students'",
        "options": [
            "It gives the name of the author who wrote the code",
            "It explicitly defines the name of the physical table created in the underlying SQL database",
            "It changes the Python class name",
            "It sets the web browser's window title"
        ],
        "correctAnswer": 1,
        "correctExplanation": "By default, SQLAlchemy generates a table name derived from the class name. Setting `__tablename__ = 'students'` explicitly specifies the exact table identifier in SQL schema.",
        "optionExplanations": {
            "A": "Incorrect. Not related to authorship metadata.",
            "B": "Correct. Explicitly names the database table in SQL schema (e.g. `CREATE TABLE students`).",
            "C": "Incorrect. The Python class name remains `Student`.",
            "D": "Incorrect. It has no effect on browser UI."
        },
        "practicalExample": "Ensures the database table is named `students` instead of the default singular `student`."
    },
    {
        "id": "u4_10",
        "module": 4,
        "topic": "Column Declarations",
        "difficulty": "Easy",
        "question": "Which method is used to declare a column field inside a model class?",
        "codeSnippet": None,
        "options": [
            "db.Field()",
            "db.Column()",
            "db.Attribute()",
            "db.Property()"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Columns are declared as attributes of the model class using `db.Column()`, passing the SQL data type as the first argument.",
        "optionExplanations": {
            "A": "Incorrect. `Field` is used in WTForms or Pydantic, not SQLAlchemy.",
            "B": "Correct. `db.Column(db.DataType, ...)` is the standard declaration.",
            "C": "Incorrect. Not an SQLAlchemy method.",
            "D": "Incorrect. Not an SQLAlchemy method."
        },
        "practicalExample": "`name = db.Column(db.String(100), nullable=False)`."
    },
    {
        "id": "u4_11",
        "module": 4,
        "topic": "Column Constraints",
        "difficulty": "Easy",
        "question": "What does the constraint `primary_key=True` specify when defining a column?",
        "codeSnippet": "id = db.Column(db.Integer, primary_key=True)",
        "options": [
            "The column stores encrypted passwords",
            "The column serves as the unique identifier index for each row in the table, cannot be null, and usually auto-increments",
            "The column must be filled out before any other column",
            "The column is only accessible by the server owner"
        ],
        "correctAnswer": 1,
        "correctExplanation": "A primary key uniquely identifies each record in a database table. In relational databases, integer primary keys automatically index and auto-increment.",
        "optionExplanations": {
            "A": "Incorrect. Primary keys do not perform password encryption.",
            "B": "Correct. Sets the unique index identifying each entity row.",
            "C": "Incorrect. Column fill order in forms is arbitrary.",
            "D": "Incorrect. Has no relationship with permissions."
        },
        "practicalExample": "Student ID 1, 2, 3 uniquely distinguish students even if two students share the name 'Rahul'."
    },
    {
        "id": "u4_12",
        "module": 4,
        "topic": "Column Constraints",
        "difficulty": "Easy",
        "question": "What does `nullable=False` enforce on a database column?",
        "codeSnippet": "email = db.Column(db.String(100), nullable=False)",
        "options": [
            "The value can be left blank or empty",
            "Enforces a `NOT NULL` constraint in SQL, rejecting attempts to insert a record without a value for this column",
            "Converts null values into the number zero",
            "Deletes the column if it is empty"
        ],
        "correctAnswer": 1,
        "correctExplanation": "`nullable=False` compiles into the SQL `NOT NULL` constraint. The database will reject transactions that attempt to insert `NULL` into this column.",
        "optionExplanations": {
            "A": "Incorrect. `nullable=True` allows empty/null values.",
            "B": "Correct. Enforces `NOT NULL` in the database schema.",
            "C": "Incorrect. It does not auto-convert nulls to zero.",
            "D": "Incorrect. It does not drop table columns."
        },
        "practicalExample": "If code executes `Student(name=None)` when `name` has `nullable=False`, the database raises an `IntegrityError`."
    },
    {
        "id": "u4_13",
        "module": 4,
        "topic": "Column Constraints",
        "difficulty": "Easy",
        "question": "What does the `unique=True` parameter prevent?",
        "codeSnippet": "email = db.Column(db.String(100), unique=True)",
        "options": [
            "Prevents duplicate values across all rows in that column",
            "Prevents the column from having uppercase letters",
            "Prevents users from updating their email",
            "Limits the table to a total of 1 row"
        ],
        "correctAnswer": 0,
        "correctExplanation": "`unique=True` generates a UNIQUE index in SQL. The database enforces that no two rows can contain the same value in that column (e.g. duplicate email addresses are rejected).",
        "optionExplanations": {
            "A": "Correct. Enforces uniqueness across rows, preventing duplicate user accounts.",
            "B": "Incorrect. It has no effect on letter casing.",
            "C": "Incorrect. Users can update values as long as the new value is not already taken.",
            "D": "Incorrect. The table can hold millions of rows, each with distinct emails."
        },
        "practicalExample": "Attempting to register with an email that already exists triggers an `IntegrityError`."
    },
    {
        "id": "u4_14",
        "module": 4,
        "topic": "__repr__() Method",
        "difficulty": "Medium",
        "question": "Why is the `__repr__(self)` method defined inside an SQLAlchemy model class?",
        "codeSnippet": "def __repr__(self):\n    return f'<Student {self.name}>'",
        "options": [
            "It is required by SQLite to insert rows",
            "It returns a readable string representation of the object when printed in Python terminal or debugging logs",
            "It compiles the class into JavaScript",
            "It automatically executes `db.session.commit()`"
        ],
        "correctAnswer": 1,
        "correctExplanation": "In Python, `__repr__` provides an unambiguous string representation of an object. Without it, printing a query result displays `<Student object at 0x7f8b9a>`; with it, it prints `<Student Rahul>`, making debugging intuitive.",
        "optionExplanations": {
            "A": "Incorrect. SQLite functions without `__repr__`.",
            "B": "Correct. Provides an informative, human-readable string representation during debugging.",
            "C": "Incorrect. It does not compile into JS.",
            "D": "Incorrect. It does not commit transactions."
        },
        "practicalExample": "In terminal: `>>> Student.query.first()` prints `<Student Rahul>` instead of an obscure memory address."
    },
    {
        "id": "u4_15",
        "module": 4,
        "topic": "Table Creation & Application Context",
        "difficulty": "Hard",
        "question": "Why must `db.create_all()` be wrapped inside `with app.app_context():` in modern Flask (Flask 2.3+)?",
        "codeSnippet": "with app.app_context():\n    db.create_all()",
        "options": [
            "Because Python 3 removed the `db` variable",
            "Because Flask-SQLAlchemy needs access to the active application context to read `app.config` (database URI) and locate registered model classes",
            "Because SQLite refuses to run unless a user is logged in",
            "Because `with` statements encrypt the database tables"
        ],
        "correctAnswer": 1,
        "correctExplanation": "In modern Flask, application configuration and extensions are bound to the application context. Calling database operations outside a request context requires pushing an explicit `app.app_context()` so SQLAlchemy can read `app.config['SQLALCHEMY_DATABASE_URI']`.",
        "optionExplanations": {
            "A": "Incorrect. Python variables work normally.",
            "B": "Correct. An active application context is required for SQLAlchemy to bind the engine to `app.config`.",
            "C": "Incorrect. Context is not user login state.",
            "D": "Incorrect. `with` is a Python context manager, not encryption."
        },
        "practicalExample": "Running `db.create_all()` without `app.app_context()` outside a view function raises `RuntimeError: Working outside of application context`."
    },
    {
        "id": "u4_16",
        "module": 4,
        "topic": "db.create_all() Limitations",
        "difficulty": "Medium",
        "question": "What is a major limitation of `db.create_all()` during the software lifecycle?",
        "codeSnippet": None,
        "options": [
            "It cannot create tables with more than 2 columns",
            "`db.create_all()` only creates missing tables that do not exist; it will NEVER alter, add, or delete columns in existing tables when model attributes change",
            "It only works on Monday mornings",
            "It can only store 5 records in total"
        ],
        "correctAnswer": 1,
        "correctExplanation": "As emphasized in the course slides: `db.create_all()` inspects the database and creates tables that are absent. If a table `students` already exists on disk, `db.create_all()` does nothing—it will NOT add new columns or update schema. For evolving schemas, Flask-Migrate is required.",
        "optionExplanations": {
            "A": "Incorrect. It can create tables with any number of columns.",
            "B": "Correct. It does not perform schema alterations on pre-existing tables.",
            "C": "Incorrect. Nonsense.",
            "D": "Incorrect. Tables can hold unlimited records."
        },
        "practicalExample": "If you add `phone = db.Column(db.String(15))` to an existing model, `db.create_all()` will NOT add the `phone` column to your database."
    },
    {
        "id": "u4_17",
        "module": 4,
        "topic": "CRUD - Create",
        "difficulty": "Medium",
        "question": "What are the three distinct steps in Flask-SQLAlchemy to insert and persist a new record into the database?",
        "codeSnippet": None,
        "options": [
            "1. Write raw SQL string -> 2. Call `os.system()` -> 3. Restart server",
            "1. Instantiate the Python Model Object -> 2. Stage object in current session (`db.session.add()`) -> 3. Commit transaction (`db.session.commit()`)",
            "1. Create template -> 2. Link CSS -> 3. Clear browser cache",
            "1. Call `db.create_all()` -> 2. Call `db.drop_all()` -> 3. Reload page"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Inserting data involves: 1) Creating an instance of the model (`s = Student(...)`), 2) Adding it to the pending session transaction (`db.session.add(s)`), and 3) Flushing and committing to disk (`db.session.commit()`).",
        "optionExplanations": {
            "A": "Incorrect. Raw SQL strings and OS execution are anti-patterns.",
            "B": "Correct. Instantiate -> `db.session.add()` -> `db.session.commit()`.",
            "C": "Incorrect. These are frontend presentation actions.",
            "D": "Incorrect. Calling `drop_all()` destroys all data."
        },
        "practicalExample": "```python\nstudent = Student(name='Rahul', email='r@gmail.com')\ndb.session.add(student)\ndb.session.commit()\n```"
    },
    {
        "id": "u4_18",
        "module": 4,
        "topic": "CRUD - Create Batching",
        "difficulty": "Medium",
        "question": "Which method is used to stage multiple model objects simultaneously inside a single transaction?",
        "codeSnippet": "s1 = Student(name='Amit')\ns2 = Student(name='Priya')",
        "options": [
            "db.session.insert_many([s1, s2])",
            "db.session.add_all([s1, s2])",
            "db.session.batch_add(s1, s2)",
            "db.session.commit_all([s1, s2])"
        ],
        "correctAnswer": 1,
        "correctExplanation": "`db.session.add_all([object1, object2, ...])` accepts a list or collection of model instances and stages all of them in the active session for the next commit.",
        "optionExplanations": {
            "A": "Incorrect. Method does not exist in SQLAlchemy.",
            "B": "Correct. `db.session.add_all([...])` stages multiple items in one call.",
            "C": "Incorrect. Not a valid method.",
            "D": "Incorrect. `db.session.commit()` takes no argument."
        },
        "practicalExample": "`db.session.add_all([s1, s2]); db.session.commit()` writes both rows in a single database transaction."
    },
    {
        "id": "u4_19",
        "module": 4,
        "topic": "CRUD - Read All",
        "difficulty": "Easy",
        "question": "How do you retrieve ALL records from the `Student` table as a Python list?",
        "codeSnippet": None,
        "options": [
            "students = Student.query.all()",
            "students = Student.select_everything()",
            "students = db.get_all('Student')",
            "students = Student.fetch_rows()"
        ],
        "correctAnswer": 0,
        "correctExplanation": "`Student.query.all()` executes a `SELECT * FROM students` query and returns all matching rows converted into a Python list of `Student` model objects.",
        "optionExplanations": {
            "A": "Correct. `Model.query.all()` returns all records as a Python list.",
            "B": "Incorrect. Method does not exist.",
            "C": "Incorrect. Not a valid Flask-SQLAlchemy method.",
            "D": "Incorrect. Not a valid method."
        },
        "practicalExample": "In view function: `students = Student.query.all(); return render_template('list.html', students=students)`."
    },
    {
        "id": "u4_20",
        "module": 4,
        "topic": "CRUD - Read by Primary Key",
        "difficulty": "Medium",
        "question": "In modern SQLAlchemy 2.0 / Flask-SQLAlchemy 3.0, what is the recommended method to retrieve a record by its primary key?",
        "codeSnippet": None,
        "options": [
            "student = db.session.get(Student, 1)",
            "student = Student.get_by_id(1)",
            "student = Student.find(1)",
            "student = db.select(Student).where(1)"
        ],
        "correctAnswer": 0,
        "correctExplanation": "SQLAlchemy 2.0 and modern Flask-SQLAlchemy establish `db.session.get(ModelClass, primary_key)` as the standard, direct method to fetch an entity by primary key (returning `None` if not found).",
        "optionExplanations": {
            "A": "Correct. `db.session.get(Student, 1)` is the official modern syntax highlighted in course slides.",
            "B": "Incorrect. `get_by_id` is not built-in.",
            "C": "Incorrect. `find()` is MongoDB syntax, not SQLAlchemy.",
            "D": "Incorrect. Incomplete statement syntax."
        },
        "practicalExample": "If student with ID 1 exists, returns `Student` object; if ID 1 does not exist, returns `None`."
    },
    {
        "id": "u4_21",
        "module": 4,
        "topic": "CRUD - Read filter_by",
        "difficulty": "Easy",
        "question": "Which query retrieves all students enrolled in the 'MCA' course using simple keyword arguments?",
        "codeSnippet": None,
        "options": [
            "Student.query.filter_by(course='MCA').all()",
            "Student.query.find('MCA')",
            "Student.query.where_course('MCA')",
            "db.search(Student, course='MCA')"
        ],
        "correctAnswer": 0,
        "correctExplanation": "`Model.query.filter_by(attribute=value).all()` uses keyword arguments to filter rows where the column equals the given value.",
        "optionExplanations": {
            "A": "Correct. `filter_by(field=value).all()` is the standard keyword equality filter.",
            "B": "Incorrect. `find()` does not exist.",
            "C": "Incorrect. Dynamic column where methods are not built-in.",
            "D": "Incorrect. Not a valid method."
        },
        "practicalExample": "`mca_students = Student.query.filter_by(course='MCA').all()`."
    },
    {
        "id": "u4_22",
        "module": 4,
        "topic": "CRUD - Read first()",
        "difficulty": "Medium",
        "question": "What is the primary difference between `.all()` and `.first()` in SQLAlchemy queries?",
        "codeSnippet": "student = Student.query.filter_by(email='rahul@gmail.com').first()",
        "options": [
            "`.all()` returns a single object, while `.first()` returns a dictionary",
            "`.all()` returns a list of all matching model instances, while `.first()` stops scanning at the first matching record and returns a single model instance (or `None`)",
            "`.first()` deletes all subsequent records",
            "`.first()` only works if the table has exactly one row"
        ],
        "correctAnswer": 1,
        "correctExplanation": "`.all()` evaluates the query and returns a Python list of all results. `.first()` appends `LIMIT 1` to the SQL query, stops scanning at the first match, and returns the single object directly (or `None` if no match was found).",
        "optionExplanations": {
            "A": "Incorrect. Inverted and incorrect data types.",
            "B": "Correct. `.all()` yields a list; `.first()` returns the first matched object or `None`.",
            "C": "Incorrect. `.first()` performs a read operation and never deletes data.",
            "D": "Incorrect. `.first()` works regardless of table row count."
        },
        "practicalExample": "Ideal when checking uniqueness: `existing_user = User.query.filter_by(email=email).first()`."
    },
    {
        "id": "u4_23",
        "module": 4,
        "topic": "CRUD - filter() with Expressions",
        "difficulty": "Medium",
        "question": "When should you use `.filter()` instead of `.filter_by()` in SQLAlchemy?",
        "codeSnippet": None,
        "options": [
            "`.filter()` is only used for SQLite, while `.filter_by()` is only used for MySQL",
            "`.filter()` accepts Python comparison expressions (like `>`, `<`, `!=`, `like()`), whereas `.filter_by()` only accepts simple keyword equality (`key=val`)",
            "`.filter_by()` runs 10 times faster than `.filter()`",
            "There is no difference between them"
        ],
        "correctAnswer": 1,
        "correctExplanation": "`.filter_by()` only handles simple keyword equality (`name='Rahul'`). `.filter()` accepts full Python column expressions and boolean clauses, such as `Student.age >= 18`, `Student.name.like('R%')`, or `Student.score != 0`.",
        "optionExplanations": {
            "A": "Incorrect. Both work on all supported databases.",
            "B": "Correct. `filter()` supports complex expressions (`>`, `<`, `in_()`, `like()`), whereas `filter_by()` only supports `attr=val`.",
            "C": "Incorrect. Performance is identical under the hood.",
            "D": "Incorrect. Their parameter syntax and capabilities differ significantly."
        },
        "practicalExample": "`Student.query.filter(Student.age >= 21).all()`."
    },
    {
        "id": "u4_24",
        "module": 4,
        "topic": "CRUD - Update & Dirty Tracking",
        "difficulty": "Medium",
        "question": "Examine this code updating a student's name:\nWhy is there NO NEED to call `db.session.add(student)` during an update?",
        "codeSnippet": "student = db.session.get(Student, 1)\nif student:\n    student.name = 'Amit Verma'\n    db.session.commit()",
        "options": [
            "Because Flask updates are saved automatically without committing",
            "Because the retrieved `student` object is ALREADY attached to the active session; SQLAlchemy tracks modified ('dirty') attributes and issues an SQL UPDATE on commit automatically",
            "Because `db.session.add()` can only be used on strings",
            "Because SQLAlchemy does not support updating existing records"
        ],
        "correctAnswer": 1,
        "correctExplanation": "This is a key Pro-Tip highlighted in course slides: when you fetch an entity via `db.session.get()`, it is already tracked by the session. When you mutate its attributes (`student.name = ...`), SQLAlchemy's identity map marks it as dirty and automatically issues `UPDATE` upon `db.session.commit()`.",
        "optionExplanations": {
            "A": "Incorrect. `db.session.commit()` is strictly required to save changes to disk.",
            "B": "Correct. The object is already attached to the session; SQLAlchemy's dirty tracking detects attribute mutations automatically.",
            "C": "Incorrect. `add()` takes model objects.",
            "D": "Incorrect. Updates are fully supported."
        },
        "practicalExample": "Just mutate attributes and commit: `user.email = new_email; db.session.commit()`."
    },
    {
        "id": "u4_25",
        "module": 4,
        "topic": "CRUD - Delete",
        "difficulty": "Medium",
        "question": "What is the correct sequence to permanently delete a record in Flask-SQLAlchemy?",
        "codeSnippet": None,
        "options": [
            "Query target object -> Verify it is not None -> Call `db.session.delete(object)` -> Call `db.session.commit()`",
            "Call `db.drop_all()`",
            "Set `object = None` in Python",
            "Delete the `.db` file from Windows Explorer"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Deleting a record requires: 1) querying the object, 2) confirming it exists (`if object:`), 3) staging it for deletion with `db.session.delete(object)`, and 4) committing the transaction via `db.session.commit()`.",
        "optionExplanations": {
            "A": "Correct. Fetch -> verify -> `db.session.delete()` -> `db.session.commit()`.",
            "B": "Incorrect. `drop_all()` wipes every table and all data in the database.",
            "C": "Incorrect. Setting a local Python variable to None does not delete database rows.",
            "D": "Incorrect. Deleting the entire database file destroys all data."
        },
        "practicalExample": "```python\nstudent = db.session.get(Student, 1)\nif student:\n    db.session.delete(student)\n    db.session.commit()\n```"
    },
    {
        "id": "u4_26",
        "module": 4,
        "topic": "Soft Deletion Concept",
        "difficulty": "Medium",
        "question": "In production applications, what is an alternative to permanent SQL DELETE called 'Soft Delete'?",
        "codeSnippet": None,
        "options": [
            "Renaming the database file to `.soft`",
            "Setting a boolean flag like `is_active = False` or `deleted_at = datetime.utcnow()` on the record instead of executing a destructive SQL DELETE",
            "Deleting only half the columns in the row",
            "Writing the record to a floppy disk"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Soft deletion marks a record as deactivated (e.g. `is_active = False`) without actually issuing an SQL DELETE statement. This preserves audit trails, historical transaction records, and allows instant recovery if a user deletes an account by mistake.",
        "optionExplanations": {
            "A": "Incorrect. File names are unchanged.",
            "B": "Correct. Setting a flag preserves historical data and avoids foreign key integrity breakage.",
            "C": "Incorrect. Columns are not partially deleted.",
            "D": "Incorrect. Not related to hardware media."
        },
        "practicalExample": "`user.is_active = False; db.session.commit()` deactivates a user while keeping their past invoice records intact."
    },
    {
        "id": "u4_27",
        "module": 4,
        "topic": "Transaction Safety & Rollback",
        "difficulty": "Hard",
        "question": "Why is the `db.session.rollback()` call inside the `except` block essential when handling database operations?",
        "codeSnippet": "try:\n    db.session.add(new_student)\n    db.session.commit()\nexcept Exception as e:\n    db.session.rollback()\n    flash('Error occurred. Transaction aborted.', 'danger')",
        "options": [
            "It turns off the computer to save electricity",
            "If an error occurs (like duplicate email), the active session becomes broken/corrupted; calling `rollback()` cancels the failed operations and restores the session to a clean, usable state for future requests",
            "It automatically retries the operation 100 times",
            "It converts SQLite into MySQL"
        ],
        "correctAnswer": 1,
        "correctExplanation": "If an operation fails during commit (e.g. unique constraint violation), the database session enters an invalid, pending transaction state. If `rollback()` is not called, all subsequent queries in that thread or request will fail with `PendingRollbackError`.",
        "optionExplanations": {
            "A": "Incorrect. No hardware effects.",
            "B": "Correct. `rollback()` cancels pending uncommitted modifications and resets the session to a clean state.",
            "C": "Incorrect. `rollback()` cancels, it does not retry.",
            "D": "Incorrect. It does not alter database engines."
        },
        "practicalExample": "Without `rollback()`, the next user attempting any database query will encounter a 500 server crash."
    },
    {
        "id": "u4_28",
        "module": 4,
        "topic": "ACID Properties",
        "difficulty": "Medium",
        "question": "What does the ACID acronym stand for in database transaction management?",
        "codeSnippet": None,
        "options": [
            "Application, Code, Interface, Data",
            "Atomicity, Consistency, Isolation, Durability",
            "Authentication, Cookies, IP, DNS",
            "Asynchronous, Concurrent, Indexed, Distributed"
        ],
        "correctAnswer": 1,
        "correctExplanation": "ACID stands for Atomicity (all or nothing), Consistency (preserves schema constraints), Isolation (concurrent transactions do not interfere), and Durability (committed data survives server crashes).",
        "optionExplanations": {
            "A": "Incorrect. Fabricated computer terms.",
            "B": "Correct. Standard computer science transaction properties.",
            "C": "Incorrect. Web networking concepts.",
            "D": "Incorrect. Database architecture styles, not ACID."
        },
        "practicalExample": "Atomicity ensures that if deducting money from Account A succeeds but crediting Account B fails, the whole transaction rolls back."
    },
    {
        "id": "u4_29",
        "module": 4,
        "topic": "Database Relationships",
        "difficulty": "Medium",
        "question": "Which construct in Flask-SQLAlchemy defines a foreign key pointing to the `id` column of a table named `departments`?",
        "codeSnippet": None,
        "options": [
            "department_id = db.Column(db.Integer, db.ForeignKey('departments.id'))",
            "department_id = db.Column(db.Integer, db.Relationship('departments'))",
            "department_id = db.Key('departments.id')",
            "department_id = db.Foreign('departments.id')"
        ],
        "correctAnswer": 0,
        "correctExplanation": "`db.ForeignKey('table_name.column_name')` creates a foreign key constraint linking a column to the primary key of another table in SQL schema.",
        "optionExplanations": {
            "A": "Correct. `db.ForeignKey('departments.id')` references the `id` column of the `departments` table.",
            "B": "Incorrect. `db.relationship` is declared separately on the model for high-level Python object navigation.",
            "C": "Incorrect. Not a valid SQLAlchemy method.",
            "D": "Incorrect. Not a valid method."
        },
        "practicalExample": "In `Student`: `dept_id = db.Column(db.Integer, db.ForeignKey('departments.id'))`."
    },
    {
        "id": "u4_30",
        "module": 4,
        "topic": "Database Relationships",
        "difficulty": "Hard",
        "question": "What is the difference between `db.ForeignKey` and `db.relationship` in Flask-SQLAlchemy?",
        "codeSnippet": None,
        "options": [
            "`db.ForeignKey` creates the actual relational constraint inside the physical SQL database table, whereas `db.relationship` creates a high-level Python property allowing intuitive object navigation like `student.department.name`",
            "`db.ForeignKey` only works in MySQL, while `db.relationship` only works in SQLite",
            "`db.ForeignKey` is used for passwords, while `db.relationship` is used for usernames",
            "There is no difference; they are exact aliases"
        ],
        "correctAnswer": 0,
        "correctExplanation": "`db.ForeignKey` instructs the database engine to enforce relational referential integrity. `db.relationship` does not modify the SQL schema; it provides convenient object-level syntax in Python to access related records (e.g. `dept.students`).",
        "optionExplanations": {
            "A": "Correct. `ForeignKey` is an SQL schema constraint; `relationship` is an ORM abstraction for Python object traversal.",
            "B": "Incorrect. Both work across all supported SQL engines.",
            "C": "Incorrect. Neither is related to user credentials.",
            "D": "Incorrect. They serve completely different roles in data modeling."
        },
        "practicalExample": "With `students = db.relationship('Student', backref='department')`, you can access `student.department.name` directly."
    },
    {
        "id": "u4_31",
        "module": 4,
        "topic": "Relationship backref",
        "difficulty": "Hard",
        "question": "What does the `backref` argument in `db.relationship()` accomplish?",
        "codeSnippet": "students = db.relationship('Student', backref='department')",
        "options": [
            "It rolls back the database when errors occur",
            "It automatically adds a reverse attribute (e.g. `department`) onto the related model (`Student`), allowing bidirectional navigation between objects",
            "It deletes all students when the department is closed",
            "It reverses the alphabetical sorting of student names"
        ],
        "correctAnswer": 1,
        "correctExplanation": "`backref='department'` creates a virtual bidirectional link. A `Department` can access `dept.students`, and any `Student` can immediately access `student.department` without explicitly defining a relationship on both models.",
        "optionExplanations": {
            "A": "Incorrect. Session rollback is `session.rollback()`.",
            "B": "Correct. Automatically establishes a reverse relationship attribute on the target model.",
            "C": "Incorrect. Cascading delete is configured using `cascade='all, delete-orphan'`.",
            "D": "Incorrect. Not related to sorting."
        },
        "practicalExample": "`student = Student.query.first(); print(student.department.name)`."
    },
    {
        "id": "u4_32",
        "module": 4,
        "topic": "Flask-Migrate Extension",
        "difficulty": "Easy",
        "question": "Which extension is used to manage and evolve database schema migrations in Flask applications?",
        "codeSnippet": None,
        "options": [
            "Flask-Migrate",
            "Flask-Evolution",
            "Flask-Schema",
            "Flask-Alchemist"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Flask-Migrate is the standard extension that integrates Alembic (SQLAlchemy's database migration tool) into Flask CLI commands.",
        "optionExplanations": {
            "A": "Correct. `Flask-Migrate` is the official migration extension highlighted in course slides.",
            "B": "Incorrect. Does not exist.",
            "C": "Incorrect. Does not exist.",
            "D": "Incorrect. Does not exist."
        },
        "practicalExample": "Installation: `pip install flask-migrate`."
    },
    {
        "id": "u4_33",
        "module": 4,
        "topic": "Flask-Migrate Initialization",
        "difficulty": "Medium",
        "question": "Which command initializes a new `migrations/` directory structure in your project root once at project creation?",
        "codeSnippet": None,
        "options": [
            "flask db init",
            "flask db migrate",
            "flask db upgrade",
            "flask db start"
        ],
        "correctAnswer": 0,
        "correctExplanation": "`flask db init` is run once per project to create the Alembic migration repository folder (`migrations/`) containing configuration and version scripts.",
        "optionExplanations": {
            "A": "Correct. `flask db init` performs the one-time initialization of the migrations folder.",
            "B": "Incorrect. `flask db migrate` generates migration scripts after schema changes.",
            "C": "Incorrect. `flask db upgrade` applies scripts to the database.",
            "D": "Incorrect. Not a valid command."
        },
        "practicalExample": "Terminal: `flask db init` creates `./migrations/`."
    },
    {
        "id": "u4_34",
        "module": 4,
        "topic": "Flask-Migrate Generation",
        "difficulty": "Medium",
        "question": "Which command inspects your Python `db.Model` classes, detects changes, and auto-generates a migration script with a descriptive comment?",
        "codeSnippet": None,
        "options": [
            "flask db init",
            "flask db migrate -m \"added phone column to student\"",
            "flask db commit",
            "flask db save"
        ],
        "correctAnswer": 1,
        "correctExplanation": "`flask db migrate -m \"message\"` compares your current model definitions with the physical database schema and generates a new Python migration script in `migrations/versions/`.",
        "optionExplanations": {
            "A": "Incorrect. `init` only runs once to create the directory.",
            "B": "Correct. `flask db migrate -m \"...\"` detects diffs and writes a migration script.",
            "C": "Incorrect. Not a valid CLI command.",
            "D": "Incorrect. Not a valid CLI command."
        },
        "practicalExample": "After adding `phone` column: `flask db migrate -m \"add phone to student\"`."
    },
    {
        "id": "u4_35",
        "module": 4,
        "topic": "Flask-Migrate Apply",
        "difficulty": "Easy",
        "question": "Which command applies pending migration scripts to the physical database tables?",
        "codeSnippet": None,
        "options": [
            "flask db upgrade",
            "flask db run",
            "flask db apply",
            "flask db push"
        ],
        "correctAnswer": 0,
        "correctExplanation": "`flask db upgrade` executes the `upgrade()` function in pending migration scripts, applying schema alterations (e.g. `ALTER TABLE`) to your live database.",
        "optionExplanations": {
            "A": "Correct. `flask db upgrade` applies migrations.",
            "B": "Incorrect. Not a valid CLI command.",
            "C": "Incorrect. Alembic uses `upgrade`, not `apply`.",
            "D": "Incorrect. Not a valid command."
        },
        "practicalExample": "Terminal: `flask db upgrade` executes the SQL alterations."
    },
    {
        "id": "u4_36",
        "module": 4,
        "topic": "Flask-Migrate Rollback",
        "difficulty": "Medium",
        "question": "How do you roll back or undo the most recently applied migration script in Flask-Migrate?",
        "codeSnippet": None,
        "options": [
            "flask db downgrade",
            "flask db undo",
            "flask db rollback",
            "flask db reset"
        ],
        "correctAnswer": 0,
        "correctExplanation": "`flask db downgrade` reverts the database schema to the previous migration revision by running the `downgrade()` function in the migration script.",
        "optionExplanations": {
            "A": "Correct. `flask db downgrade` steps backward one migration version.",
            "B": "Incorrect. Not a valid command.",
            "C": "Incorrect. Session rollback in Python is `session.rollback()`; CLI schema rollback is `flask db downgrade`.",
            "D": "Incorrect. Not a valid command."
        },
        "practicalExample": "If an upgrade breaks existing functionality: `flask db downgrade`."
    },
    {
        "id": "u4_37",
        "module": 4,
        "topic": "Query Ordering",
        "difficulty": "Easy",
        "question": "How do you sort students in alphabetical order by name using SQLAlchemy?",
        "codeSnippet": None,
        "options": [
            "Student.query.order_by(Student.name.asc()).all()",
            "Student.query.sort('name')",
            "Student.query.alphabetical()",
            "db.sort(Student.name)"
        ],
        "correctAnswer": 0,
        "correctExplanation": "`order_by(Model.column.asc())` compiles into an SQL `ORDER BY name ASC` clause.",
        "optionExplanations": {
            "A": "Correct. `order_by(Student.name.asc())` sorts ascending.",
            "B": "Incorrect. `sort()` is a Python list method, not SQLAlchemy query method.",
            "C": "Incorrect. Method does not exist.",
            "D": "Incorrect. Not a valid method."
        },
        "practicalExample": "For descending order: `Student.query.order_by(Student.name.desc()).all()`."
    },
    {
        "id": "u4_38",
        "module": 4,
        "topic": "Query Limiting",
        "difficulty": "Easy",
        "question": "How do you limit a query to return at most the first 5 students?",
        "codeSnippet": None,
        "options": [
            "Student.query.limit(5).all()",
            "Student.query.take(5)",
            "Student.query.head(5)",
            "Student.query.max_rows(5)"
        ],
        "correctAnswer": 0,
        "correctExplanation": "The `limit(n)` clause translates to SQL `LIMIT n`, capping the returned result set at `n` rows.",
        "optionExplanations": {
            "A": "Correct. `limit(5).all()` retrieves at most 5 records.",
            "B": "Incorrect. `take()` is LINQ / C#, not SQLAlchemy.",
            "C": "Incorrect. `head()` is Pandas syntax.",
            "D": "Incorrect. Not a valid method."
        },
        "practicalExample": "`top_students = Student.query.order_by(Student.gpa.desc()).limit(5).all()`."
    },
    {
        "id": "u4_39",
        "module": 4,
        "topic": "Query Counting",
        "difficulty": "Easy",
        "question": "Which method directly returns the total number of records matching a query without loading all objects into Python memory?",
        "codeSnippet": None,
        "options": [
            "Student.query.count()",
            "len(Student.query.all())",
            "Student.query.total()",
            "db.count_rows(Student)"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Calling `.count()` emits an efficient `SELECT count(*) FROM ...` directly in the database. Using `len(Student.query.all())` is inefficient because it transfers all rows over the network and instantiates thousands of Python objects just to measure length.",
        "optionExplanations": {
            "A": "Correct. `.count()` runs `SELECT count(*)` on the database server efficiently.",
            "B": "Incorrect. Inefficient anti-pattern that loads all data into RAM.",
            "C": "Incorrect. Method does not exist.",
            "D": "Incorrect. Not a valid method."
        },
        "practicalExample": "`total_students = Student.query.count()`."
    },
    {
        "id": "u4_40",
        "module": 4,
        "topic": "IntegrityError Handling",
        "difficulty": "Medium",
        "question": "What exception does SQLAlchemy raise if you attempt to insert a record with an email that already exists in a column marked `unique=True`?",
        "codeSnippet": None,
        "options": [
            "sqlalchemy.exc.IntegrityError",
            "KeyError",
            "IndexError",
            "FileNotFoundError"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Violations of relational constraints (such as UNIQUE, NOT NULL, or FOREIGN KEY checks) cause the database to reject the transaction, prompting SQLAlchemy to raise `sqlalchemy.exc.IntegrityError`.",
        "optionExplanations": {
            "A": "Correct. `IntegrityError` is raised on constraint violations.",
            "B": "Incorrect. `KeyError` is for missing dictionary keys.",
            "C": "Incorrect. `IndexError` is for out-of-range list indexing.",
            "D": "Incorrect. `FileNotFoundError` is for filesystem operations."
        },
        "practicalExample": "Catch it: `except IntegrityError: db.session.rollback(); flash('Email already taken!')`."
    },
    {
        "id": "u4_41",
        "module": 4,
        "topic": "Data Types: Text vs String",
        "difficulty": "Medium",
        "question": "What is the primary difference between `db.String(length)` and `db.Text` in SQLAlchemy?",
        "codeSnippet": None,
        "options": [
            "`db.String` stores images, while `db.Text` stores numbers",
            "`db.String` has a defined maximum length (VARCHAR in SQL) suitable for short fields like names and emails, whereas `db.Text` stores variable, unbounded long-form content suitable for blog posts or comments",
            "`db.Text` can only hold 5 characters",
            "There is no difference; both create identical database types"
        ],
        "correctAnswer": 1,
        "correctExplanation": "`db.String(100)` maps to `VARCHAR(100)` with a character limit. `db.Text` maps to SQL `TEXT`, which accommodates large, arbitrary-length text bodies without a fixed character bound.",
        "optionExplanations": {
            "A": "Incorrect. Neither stores binary images directly.",
            "B": "Correct. `String` = limited VARCHAR; `Text` = unlimited long text.",
            "C": "Incorrect. `Text` holds large amounts of data (often gigabytes).",
            "D": "Incorrect. Database schema column definitions are distinct."
        },
        "practicalExample": "Use `db.String(100)` for student names; use `db.Text` for student project descriptions."
    },
    {
        "id": "u4_42",
        "module": 4,
        "topic": "Data Types: DateTime",
        "difficulty": "Medium",
        "question": "How do you set a column to automatically record the timestamp of creation using Python's `datetime` module?",
        "codeSnippet": "from datetime import datetime\ncreated_at = db.Column(db.DateTime, default=_________)",
        "options": [
            "datetime.utcnow",
            "datetime.utcnow()",
            "'CURRENT_TIME_NOW'",
            "time.clock"
        ],
        "correctAnswer": 0,
        "correctExplanation": "You pass the callable function reference `default=datetime.utcnow` (without parentheses). If you pass `datetime.utcnow()`, the timestamp evaluates once when the server boots up, resulting in every row sharing the exact same boot timestamp.",
        "optionExplanations": {
            "A": "Correct. Passing the callable `datetime.utcnow` ensures the function is invoked anew on every record insert.",
            "B": "Incorrect. Calling the function with `()` evaluates only once at module load time.",
            "C": "Incorrect. String literal is not a valid Python datetime object.",
            "D": "Incorrect. `time.clock` is deprecated and measures CPU processor time."
        },
        "practicalExample": "`created_at = db.Column(db.DateTime, default=datetime.utcnow)`."
    },
    {
        "id": "u4_43",
        "module": 4,
        "topic": "db.drop_all() Warning",
        "difficulty": "Hard",
        "question": "What is the destructive effect of executing `db.drop_all()`?",
        "codeSnippet": "with app.app_context():\n    db.drop_all()",
        "options": [
            "It drops slow internet connections",
            "It permanently deletes all tables and all stored data defined in the models from the database",
            "It drops the user's browser session",
            "It deletes your Python code files from the hard drive"
        ],
        "correctAnswer": 1,
        "correctExplanation": "`db.drop_all()` issues `DROP TABLE` statements for every registered model, destroying physical schema tables and wiping all data irrevocably unless backups exist. It should only be used in test suites.",
        "optionExplanations": {
            "A": "Incorrect. It operates on database schemas, not network connections.",
            "B": "Correct. Permanently purges all database tables and rows.",
            "C": "Incorrect. Browser sessions are managed separately.",
            "D": "Incorrect. Source code files remain intact."
        },
        "practicalExample": "Commonly used in automated test teardown functions: `def tearDown(self): db.drop_all()`."
    },
    {
        "id": "u4_44",
        "module": 4,
        "topic": "SQLAlchemy Echo Configuration",
        "difficulty": "Medium",
        "question": "How can you configure Flask-SQLAlchemy to print every generated SQL query directly into your terminal console for debugging?",
        "codeSnippet": None,
        "options": [
            "app.config['SQLALCHEMY_ECHO'] = True",
            "app.config['SHOW_SQL'] = 'all'",
            "db.print_queries()",
            "app.debug_sql = 1"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Setting `app.config['SQLALCHEMY_ECHO'] = True` enables SQLAlchemy's underlying engine logger to log every generated SQL statement and transaction commit/rollback to stdout.",
        "optionExplanations": {
            "A": "Correct. `SQLALCHEMY_ECHO = True` logs all SQL queries to the terminal.",
            "B": "Incorrect. Not a valid configuration key.",
            "C": "Incorrect. Not a valid method.",
            "D": "Incorrect. Not a valid setting."
        },
        "practicalExample": "When testing: shows statements like `INFO:sqlalchemy.engine:INSERT INTO students (name) VALUES (?)`."
    },
    {
        "id": "u4_45",
        "module": 4,
        "topic": "Default Column Values",
        "difficulty": "Easy",
        "question": "What happens if a new `Student` instance is created without supplying the `course` attribute, given `course = db.Column(db.String(50), default='MCA')`?",
        "codeSnippet": "new_s = Student(name='Rahul', email='r@gmail.com')",
        "options": [
            "Flask raises a MissingAttributeError and crashes",
            "SQLAlchemy automatically populates `course` with the default value `'MCA'` upon insertion",
            "The `course` column is left as NULL",
            "The record is saved into a separate table"
        ],
        "correctAnswer": 1,
        "correctExplanation": "The `default='value'` parameter instructs SQLAlchemy to populate the attribute with the fallback value if omitted on object creation.",
        "optionExplanations": {
            "A": "Incorrect. Defaults prevent missing attribute errors.",
            "B": "Correct. Automatically sets `course` to `'MCA'`.",
            "C": "Incorrect. The default overrides null.",
            "D": "Incorrect. It inserts into the same table."
        },
        "practicalExample": "Inspect: `db.session.add(new_s); db.session.commit(); print(new_s.course)` outputs `'MCA'`."
    },
    {
        "id": "u4_46",
        "module": 4,
        "topic": "Database Pagination",
        "difficulty": "Hard",
        "question": "Which Flask-SQLAlchemy method enables convenient pagination of database query results?",
        "codeSnippet": None,
        "options": [
            "Student.query.paginate(page=1, per_page=10)",
            "Student.query.split(10)",
            "Student.query.chunk(1, 10)",
            "db.paginate(Student, 10)"
        ],
        "correctAnswer": 0,
        "correctExplanation": "`.paginate(page=page_num, per_page=count)` is a built-in helper that issues SQL `LIMIT` and `OFFSET` queries and returns a `Pagination` object with attributes like `.items`, `.pages`, `.has_prev`, and `.has_next`.",
        "optionExplanations": {
            "A": "Correct. `paginate(page=1, per_page=10)` is the official pagination helper.",
            "B": "Incorrect. `split` does not exist.",
            "C": "Incorrect. `chunk` is Laravel syntax, not SQLAlchemy.",
            "D": "Incorrect. Not a valid method."
        },
        "practicalExample": "In route: `pagination = Student.query.paginate(page=page, per_page=10); return render_template('list.html', pagination=pagination)`."
    },
    {
        "id": "u4_47",
        "module": 4,
        "topic": "Flask-Migrate Workflow Order",
        "difficulty": "Medium",
        "question": "What is the correct sequential workflow for modifying a database schema using Flask-Migrate after adding a column in `models.py`?",
        "codeSnippet": None,
        "options": [
            "1. Edit Python Model -> 2. Run `flask db migrate -m \"...\"` -> 3. Review migration file -> 4. Run `flask db upgrade`",
            "1. Delete database file -> 2. Run `flask db init` -> 3. Edit Python model",
            "1. Run `flask db upgrade` -> 2. Run `flask db init` -> 3. Edit Python model",
            "1. Restart computer -> 2. Run `pip install flask`"
        ],
        "correctAnswer": 0,
        "correctExplanation": "The official migration cycle is: 1) Edit model attributes in Python code, 2) Run `flask db migrate -m \"...\"` to generate the migration file, 3) Inspect the generated script, and 4) Run `flask db upgrade` to apply changes to the live database.",
        "optionExplanations": {
            "A": "Correct. Edit model -> `migrate` -> inspect -> `upgrade`.",
            "B": "Incorrect. Deleting databases destroys data.",
            "C": "Incorrect. You cannot upgrade before generating the migration.",
            "D": "Incorrect. Rebooting does not evolve database schemas."
        },
        "practicalExample": "This standard 4-step workflow is highlighted explicitly on page 16 of course slides."
    },
    {
        "id": "u4_48",
        "module": 4,
        "topic": "SQLAlchemy Session Lifecycle",
        "difficulty": "Medium",
        "question": "What happens to staged operations if `db.session.add(obj)` is called, but the view function finishes and returns WITHOUT ever calling `db.session.commit()`?",
        "codeSnippet": None,
        "options": [
            "The data is written to disk anyway",
            "The transaction is NOT committed; the changes are discarded when the request context tears down, and nothing is saved to disk",
            "The database server crashes permanently",
            "The operating system creates a backup copy"
        ],
        "correctAnswer": 1,
        "correctExplanation": "Uncommitted transactions are rolled back when the request context closes. If `db.session.commit()` is not explicitly called, pending changes in `db.session` are lost and never persisted to the physical database.",
        "optionExplanations": {
            "A": "Incorrect. Changes remain in memory buffer until committed.",
            "B": "Correct. Transactions must be committed to persist. Uncommitted changes are discarded.",
            "C": "Incorrect. The server handles uncommitted sessions safely.",
            "D": "Incorrect. No OS backup is created."
        },
        "practicalExample": "A common student bug: 'My form submitted successfully, but my database is still empty!' -> check for missing `db.session.commit()`."
    },
    {
        "id": "u4_49",
        "module": 4,
        "topic": "Relationships: Cascade Delete",
        "difficulty": "Hard",
        "question": "When configuring a one-to-many relationship (e.g. `User` to `Posts`), how can you ensure that deleting a user automatically deletes all of that user's posts?",
        "codeSnippet": None,
        "options": [
            "Setting `cascade='all, delete-orphan'` on the `db.relationship()` definition",
            "Deleting posts manually in a 100-step loop",
            "Setting `unique=True` on post titles",
            "Cascading deletes are impossible in relational databases"
        ],
        "correctAnswer": 0,
        "correctExplanation": "Adding `cascade='all, delete-orphan'` to `db.relationship()` tells SQLAlchemy that child objects (`Posts`) cannot exist without their parent (`User`), automatically deleting related posts when the user is deleted.",
        "optionExplanations": {
            "A": "Correct. `cascade='all, delete-orphan'` enforces automated child deletion on parent removal.",
            "B": "Incorrect. Manual deletion loops are error-prone and inefficient.",
            "C": "Incorrect. `unique` enforces uniqueness, not cascading.",
            "D": "Incorrect. Cascading delete is a core feature of relational databases."
        },
        "practicalExample": "`posts = db.relationship('Post', backref='author', cascade='all, delete-orphan')`."
    },
    {
        "id": "u4_50",
        "module": 4,
        "topic": "Module 4 Summary",
        "difficulty": "Hard",
        "question": "Which of the following statements comprehensively and accurately summarizes Module 4: Flask with Database Integration?",
        "codeSnippet": None,
        "options": [
            "Flask uses Flask-SQLAlchemy to map Python classes to SQL tables; CRUD operations are managed through `db.session` with `add()`, `delete()`, and `commit()`; updates require only attribute mutation because of dirty tracking; error handling requires `db.session.rollback()`; and evolving schemas over time requires Flask-Migrate rather than relying on `db.create_all()`",
            "Flask cannot connect to relational databases unless PHP is installed",
            "SQLAlchemy requires developers to write raw SQL strings for every query",
            "`db.create_all()` automatically updates columns when models change in production"
        ],
        "correctAnswer": 0,
        "correctExplanation": "This accurately covers the entire module: ORM class mapping, `db.session` CRUD lifecycle, dirty tracking on updates, transaction safety with `rollback()`, and Flask-Migrate for schema evolution.",
        "optionExplanations": {
            "A": "Correct. Thoroughly captures all foundational principles and practical requirements of Module 4.",
            "B": "Incorrect. Python/Flask connects natively to SQLite, MySQL, PostgreSQL.",
            "C": "Incorrect. SQLAlchemy's primary purpose is eliminating raw SQL strings.",
            "D": "Incorrect. `db.create_all()` never alters pre-existing tables."
        },
        "practicalExample": "These principles govern modern backend data architecture."
    }
]

def generate():
    assert len(questions) == 50, f"Expected 50 questions, got {len(questions)}"
    for idx, q in enumerate(questions):
        assert q["id"] == f"u4_{idx+1:02d}", f"ID mismatch at index {idx}: {q['id']}"
        assert len(q["options"]) == 4, f"Options count not 4 at {q['id']}"
        assert 0 <= q["correctAnswer"] <= 3, f"Invalid correctAnswer at {q['id']}"
        for opt_key in ["A", "B", "C", "D"]:
            assert opt_key in q["optionExplanations"], f"Missing option explanation {opt_key} at {q['id']}"
            assert len(q["optionExplanations"][opt_key]) > 10, f"Option explanation too short {opt_key} at {q['id']}"
        assert q["module"] == 4, f"Module mismatch at {q['id']}"
        assert q["difficulty"] in ["Easy", "Medium", "Hard"], f"Invalid difficulty at {q['id']}"

    js_content = f"// Module 4: Flask with Database Integration\n// Total Questions: {len(questions)}\n// Auto-generated & Verified Question Bank\n\nwindow.UNIT4_QUESTIONS = {json.dumps(questions, indent=2, ensure_ascii=False)};\n"
    with open("data/unit4.js", "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"Successfully generated data/unit4.js with {len(questions)} validated questions.")

if __name__ == "__main__":
    generate()
