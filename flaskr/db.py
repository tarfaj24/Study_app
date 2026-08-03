import os
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

def init_db(app):
    db_user = os.environ['DB_USER']
    db_password = os.environ['DB_PASSWORD']
    db_name = os.environ['DB_NAME']

    app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+pymysql://{db_user}:{db_password}@localhost/{db_name}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'echo': True}

    db.init_app(app)