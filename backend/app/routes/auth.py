from flask import Blueprint, request, jsonify
from app.models import Usuario
from app import db
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = Usuario.query.filter_by(email=data["email"]).first()
    if user and check_password_hash(user.password_hash, data["password"]):
        token = create_access_token(identity=str(user.id))
        return jsonify({
            "token": token,
            "rol": user.rol,   # 👈 AÑADIR ESTO
            "usuario_id": user.id
        })
    return jsonify({"error": "Credenciales inválidas"}), 401

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = Usuario.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify({
        "id": user.id,
        "nombre": user.nombre,
        "email": user.email,
        "rol": user.rol
    })