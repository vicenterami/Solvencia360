from flask import Blueprint, request, jsonify
from app.models import Presupuesto
from app import db

bp = Blueprint('budgets', __name__, url_prefix='/api/presupuestos')

@bp.route('/', methods=['POST'])
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

@bp.route('/usuario/<int:user_id>', methods=['GET'])
def listar_presupuestos(user_id):
    presupuestos = Presupuesto.query.filter_by(usuario_id=user_id).all()
    return jsonify([{
        "id": p.id,
        "nombre": p.nombre,
        "fecha_inicio": str(p.fecha_inicio),
        "fecha_fin": str(p.fecha_fin)
    } for p in presupuestos])
