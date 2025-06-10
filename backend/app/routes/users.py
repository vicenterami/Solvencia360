from flask import Blueprint, request, jsonify
from app.models import Usuario
from app import db
from werkzeug.security import generate_password_hash

users_bp = Blueprint('users', __name__)

# Aquí agregas tus rutas
@users_bp.route('/users', methods=['GET'])
def get_users():
    return {"message": "Lista de usuarios"}
