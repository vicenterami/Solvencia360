# backend/app.py

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/test", methods=["GET"])
def test_route():
    return jsonify({"message": "API funcionando correctamente"})

if __name__ == "__main__":
    app.run(debug=True)
