from flask import Blueprint, request, render_template, jsonify, session, redirect
from functools import wraps
from flaskr.validate import validate_password, validate_username
from flaskr.errors import apology
from flaskr.db import db
from flaskr.models import User
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import exc

auth_bp = Blueprint("auth", __name__)

def login_required(f):
    @wraps(f)
    def inner(*args, **kwargs):
        if "user_id" in session:
            return f(*args, **kwargs)
        return redirect("/login")
    return inner

@auth_bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        data = request.get_json()

        username = data.get("username")
        password = data.get("password")

        try: 
            row = db.session.execute(db.select(User.password_hash, User.id).where(User.username == username)).first()
            
            
            if row:
                password_hash = row.password_hash
                user_id = row.id
                if not check_password_hash(password_hash, password):
                    return jsonify({"error_message": "Invalid password.", "user_logged_in": False})
                session.permanent = True
                session["user_id"] = user_id
                return jsonify({"user_logged_in": True})
            else:
                print("returning login.html")
                return jsonify({"error_message": "Invalid username.", "user_logged_in": False})
        except Exception as e:
            print(e)
            print("EXCEPTION OCCURED")
            return jsonify({"error_message": "Couldnt load data.", "user_logged_in": False})
            


    return render_template("login.html")

@auth_bp.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        pass_confirm = request.form.get("pass_confirm")

        if not username:
            return apology("Please insert a valid username.")

        if not (password and pass_confirm):
            return apology("Password field can't be empty.")

        if not (validate_password(password) and validate_username(username)):
            return apology("Invalid username or password.")
        
        if password != pass_confirm:
            return apology("The passwords do not match")

        user = User(username = username, password_hash = generate_password_hash(password))

        try:
            db.session.add(user)
            db.session.commit()
        except exc.IntegrityError:
            return apology("Duplicate username.")
        return render_template("login.html")
    
    if (request.args.get("username")):
        try:
            get_username = request.args.get("username")
            result = db.session.execute(db.select(User.username).where(User.username == get_username)).first()
            username_status = True if result else False
            return jsonify({"username_status": username_status})
        except exc.OperationalError:
            raise Exception("Couldnt connect to database.")
    return render_template("register.html")



        
    

