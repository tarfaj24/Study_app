from flask import render_template
from flask import Blueprint

errors_bp = Blueprint("errors_bp", __name__)

def apology(message, code=400):
    def escape(s):
        for old, new in [
            ("-", "--"),
            (" ", "-"),
            ("_", "__"),
            ("?", "~q"),
            ("%", "~p"),
            ("#", "~h"),
            ("/", "~s"),
            ('"', "''"),
        ]:
            s = s.replace(old, new)
        return s

    return render_template("apology.html", code=code, message=escape(message)), code

@errors_bp.route("/error/database/connection")     
def database_connection_error():
    return apology("Database error couldn't connect to database.")