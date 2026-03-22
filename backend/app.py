from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

def analyze_text(text):
    score = 0
    triggers = []

    # Emotional manipulation
    if re.search(r"\b(disaster|crisis|danger|threat|destroy)\b", text.lower()):
        score += 20
        triggers.append("Emotional manipulation")

    # Authority appeal
    if re.search(r"\b(experts|scientists|officials say)\b", text.lower()):
        score += 15
        triggers.append("Authority appeal")

    # False equivalence
    if "just as" in text.lower() or "equally" in text.lower():
        score += 15
        triggers.append("False equivalence")

    # Cherry picking
    if re.search(r"\b(study shows|data proves)\b", text.lower()):
        score += 20
        triggers.append("Cherry-picking")

    # Omission (very basic)
    if len(text.split()) < 12:
        score += 10
        triggers.append("Possible lack of context")

    return {
        "score": min(score, 100),
        "triggers": triggers
    }

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    text = data.get("text", "")

    result = analyze_text(text)

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
