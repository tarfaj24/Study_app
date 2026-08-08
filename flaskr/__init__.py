import os
from flask import Flask, render_template, session
from dotenv import load_dotenv
from flaskr.db import db,init_db
from flaskr.authorization import auth_bp
from flaskr.errors import errors_bp
from flaskr.note_creator import note_creator_bp
from datetime import timedelta
from flaskr.authorization import login_required
from flaskr.models import User
from flaskr.errors import apology

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.environ['SECRET_KEY']
    app.config["PERMANENT_SESSION_LIFETIME"] =  timedelta(days=20)
    init_db(app)
    app.register_blueprint(auth_bp)
    app.register_blueprint(errors_bp)
    app.register_blueprint(note_creator_bp)

    

    @app.route("/home")
    @app.route("/note_creator")
    @app.route("/pomodoro")
    @app.route("/")
    @login_required
    def index():
        try:
            username = db.session.execute(db.select(User.username).where(User.id == session["user_id"])).scalar()
            return render_template("index.html", username = username)
        except Exception as e:
            return apology("Cant connect to database")
        
    
    
    return app

