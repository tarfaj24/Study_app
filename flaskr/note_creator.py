from flask import Blueprint, redirect, request, jsonify
from flaskr.gemini_ai_service import generate_analogy
note_creator_bp = Blueprint("note_creator_bp", __name__)

@note_creator_bp.route("/api/analogy/generate", methods = ["GET", "POST"])
def get_api_analogy():
    if request.method == "POST":

        data = request.get_json()
        analogy_input = data.get("analogy_input")
        print("\n",f"analogy_input: {analogy_input}", "\n")
        analogy_output = generate_analogy(analogy_input)
        return jsonify({"analogy_output": analogy_output})
