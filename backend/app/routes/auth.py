from flask import Blueprint, request, jsonify
from app.models import Usuario
from app import db
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = Usuario.query.filter_by(email=data["email"]).first()
    if user and check_password_hash(user.password_hash, data["password"]):
        token = create_access_token(identity=str(user.id))  # 👈 debe ser string
        return jsonify({"token": token})
    return jsonify({"error": "Credenciales inválidas"}), 401

