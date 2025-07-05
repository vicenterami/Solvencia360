from flask import Blueprint, request, jsonify
from app.models import Usuario
from app import db
from werkzeug.security import generate_password_hash
from flask_jwt_extended import jwt_required

users_bp = Blueprint('users', __name__, url_prefix="/api/usuarios")

# GET /api/usuarios
@users_bp.route('/', methods=['GET'])
@jwt_required() # Requiere autenticación JWT
def get_usuarios():
    usuarios = Usuario.query.all()
    return jsonify([{
        "id": u.id,
        "nombre": u.nombre,
        "email": u.email,
        "rol": u.rol
    } for u in usuarios])

# POST /api/usuarios
@users_bp.route('/', methods=['POST'])
def crear_usuario():
    data = request.json
    nuevo_usuario = Usuario(
        nombre=data['nombre'],
        email=data['email'],
        password_hash=generate_password_hash(data['password']),
        rol=data['rol']
    )
    db.session.add(nuevo_usuario)
    db.session.commit()
    return jsonify({"message": "Usuario creado", "id": nuevo_usuario.id}), 201

# PUT /api/usuarios/<id>
@users_bp.route('/<int:id>', methods=['PUT'])
def actualizar_usuario(id):
    usuario = Usuario.query.get_or_404(id)
    data = request.json
    usuario.nombre = data.get('nombre', usuario.nombre)
    usuario.email = data.get('email', usuario.email)
    if 'password' in data:
        usuario.password_hash = generate_password_hash(data['password'])
    usuario.rol = data.get('rol', usuario.rol)
    db.session.commit()
    return jsonify({"message": "Usuario actualizado"})

# DELETE /api/usuarios/<id>
@users_bp.route('/<int:id>', methods=['DELETE'])
def eliminar_usuario(id):
    usuario = Usuario.query.get_or_404(id)
    db.session.delete(usuario)
    db.session.commit()
    return jsonify({"message": "Usuario eliminado"})
