import os
from flask import Flask, render_template
from dotenv import load_dotenv
from flaskr.db import init_db
from flaskr.authorization import auth_bp
from flaskr.errors import errors_bp
from datetime import timedelta
from flaskr.authorization import login_required

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.environ['SECRET_KEY']
    app.config["PERMANENT_SESSION_LIFETIME"] =  timedelta(days=20)
    init_db(app)
    app.register_blueprint(auth_bp)
    app.register_blueprint(errors_bp)

    

    @app.route("/home")
    @app.route("/page_1")
    @app.route("/page_2")
    @app.route("/")
    @login_required
    def index(): 
        return render_template("index.html")
    
    
    return app

