from flask import Blueprint, request, jsonify
from app.models import User
from app import db
from werkzeug.security import check_password_hash

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data["email"]).first()
    if user and check_password_hash(user.password_hash, data["password"]):
        return jsonify({"message": "Login exitoso", "user_id": user.id, "rol": user.rol})
    return jsonify({"error": "Credenciales inválidas"}), 401
