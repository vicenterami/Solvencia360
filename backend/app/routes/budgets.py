from flask import Blueprint, request, jsonify
from app.models import Presupuesto
from app import db
from flask_jwt_extended import jwt_required

presupuestos_bp = Blueprint('presupuestos', __name__, url_prefix='/api/presupuestos')

@presupuestos_bp.route('/', methods=['POST'])
@jwt_required()
def crear_presupuesto():
    data = request.json
    presupuesto = Presupuesto(
        nombre=data["nombre"],
        descripcion=data.get("descripcion"),
        fecha_inicio=data["fecha_inicio"],
        fecha_fin=data["fecha_fin"],
        usuario_id=data["usuario_id"]
    )
    db.session.add(presupuesto)
    db.session.commit()
    return jsonify({"message": "Presupuesto creado", "id": presupuesto.id})

@presupuestos_bp.route('/usuario/<int:user_id>', methods=['GET'])
@jwt_required()
def listar_presupuestos(user_id):
    presupuestos = Presupuesto.query.filter_by(usuario_id=user_id).all()
    return jsonify([{
        "id": p.id,
        "nombre": p.nombre,
        "descripcion": p.descripcion,
        "fecha_inicio": str(p.fecha_inicio),
        "fecha_fin": str(p.fecha_fin)
    } for p in presupuestos])

@presupuestos_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def actualizar_presupuesto(id):
    p = Presupuesto.query.get_or_404(id)
    data = request.json
    p.nombre = data.get("nombre", p.nombre)
    p.descripcion = data.get("descripcion", p.descripcion)
    p.fecha_inicio = data.get("fecha_inicio", p.fecha_inicio)
    p.fecha_fin = data.get("fecha_fin", p.fecha_fin)
    db.session.commit()
    return jsonify({"message": "Presupuesto actualizado"})

@presupuestos_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def eliminar_presupuesto(id):
    p = Presupuesto.query.get_or_404(id)
    db.session.delete(p)
    db.session.commit()
    return jsonify({"message": "Presupuesto eliminado"})
