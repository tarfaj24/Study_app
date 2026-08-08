from flask import Blueprint, request, render_template, jsonify, session, redirect, current_app
from functools import wraps
from flaskr.validate import validate_password, validate_username
from flaskr.errors import apology
from flaskr.db import db
from flaskr.models import User
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import exc, exists
 
auth_bp = Blueprint("auth", __name__)

def login_required(f):
    @wraps(f)
    def inner(*args, **kwargs):
        if "user_id" in session:
            return f(*args, **kwargs)
        return redirect("/login")
    return inner

def find_user_by_username(username):
    try: 
        row = db.session.execute(db.select(User).where(User.username == username)).scalar()
        return row if row else None
    except exc.OperationalError as e:
        current_app.logger.exception(f"EXCEPTION OCCURED: {e}")
        raise

def username_exists(username):
    try:
        result = db.session.execute(db.select(exists().where(User.username == username))).scalar()
        print(f"result is {result}")
        return result
    except exc.OperationalError:
        raise

def validate_credentials(username, password, pass_confirm):
    if not username:
        return apology("Please insert a valid username.")
    
    if not (password and pass_confirm):
        return apology("Password field can't be empty.")

    if not (validate_password(password) and validate_username(username)):
        return apology("Invalid username or password.")
    
    if password != pass_confirm:
        return apology("The passwords do not match")
    
    return None


@auth_bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        try:
            user = find_user_by_username(username)
        except exc.OperationalError:
            return jsonify({"error_message": "Couldnt load data.", "user_logged_in": False})

        if not user:
            return jsonify({"error_message": "Invalid username.", "user_logged_in": False}) 

        print(f"password_hash: {user.password_hash}")
        if not check_password_hash(user.password_hash, password):
            return jsonify({"error_message": "Invalid password.", "user_logged_in": False})

        session.permanent = True
        session["user_id"] = user.id
        return jsonify({"user_logged_in": True})
    return render_template("login.html")

@auth_bp.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        pass_confirm = request.form.get("pass_confirm")

        invalid_credential = validate_credentials(username, password, pass_confirm)
        if (invalid_credential):
            return invalid_credential
        
        try:
            db.session.add(User(username = username, password_hash = generate_password_hash(password)))
            db.session.commit()
        except exc.IntegrityError:
            return apology("Duplicate username.")
        return render_template("login.html")

    arg_username = request.args.get("username")
    if (arg_username):
        try:
            return jsonify({"username_status": username_exists(arg_username)})
        except exc.OperationalError:
            raise
        
    return render_template("register.html")

@auth_bp.route("/logout")
def logout():
    session.pop("user_id", None)
    return redirect("/login")


        
    

