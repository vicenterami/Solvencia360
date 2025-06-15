# backend/app.py

from flask import Flask
from flask_cors import CORS
from routes import register_routes

app = Flask(__name__)
CORS(app)

# Registrar todas las rutas
register_routes(app)

if __name__ == '__main__':
    app.run(debug=True)
