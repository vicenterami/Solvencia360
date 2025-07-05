from flask import Blueprint, request, jsonify
from app.models import Alerta, Presupuesto
from app import db
from flask_jwt_extended import jwt_required

alerts_bp = Blueprint('alerts', __name__, url_prefix='/api/alerts')

# 📝 GET: listar todas las alertas
@alerts_bp.route('/', methods=['GET'])
@jwt_required()
def listar_alertas():
    alertas = Alerta.query.all()
    return jsonify([{
        "id": a.id,
        "mensaje": a.mensaje,
        "nivel": a.nivel,
        "presupuesto_id": a.presupuesto_id,
        "creada_en": a.creada_en.isoformat()
    } for a in alertas])

# 📝 GET: detalle de una alerta
@alerts_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def detalle_alerta(id):
    a = Alerta.query.get_or_404(id)
    return jsonify({
        "id": a.id,
        "mensaje": a.mensaje,
        "nivel": a.nivel,
        "presupuesto_id": a.presupuesto_id,
        "creada_en": a.creada_en.isoformat()
    })

# ➕ POST: crear alerta
@alerts_bp.route('/', methods=['POST'])
@jwt_required()
def crear_alerta():
    data = request.json
    if "mensaje" not in data or "nivel" not in data or "presupuesto_id" not in data:
        return jsonify({"error": "Faltan campos obligatorios"}), 400
    # Opcional: validar que exista el presupuesto
    if not Presupuesto.query.get(data["presupuesto_id"]):
        return jsonify({"error": "Presupuesto no encontrado"}), 404

    alerta = Alerta(
        mensaje=data["mensaje"],
        nivel=data["nivel"],
        presupuesto_id=data["presupuesto_id"]
    )
    db.session.add(alerta)
    db.session.commit()
    return jsonify({"message": "Alerta creada", "id": alerta.id}), 201

# ✏️ PUT: actualizar alerta
@alerts_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def actualizar_alerta(id):
    a = Alerta.query.get_or_404(id)
    data = request.json
    if "mensaje" in data:
        a.mensaje = data["mensaje"]
    if "nivel" in data:
        a.nivel = data["nivel"]
    if "presupuesto_id" in data:
        # validar presupuesto
        if not Presupuesto.query.get(data["presupuesto_id"]):
            return jsonify({"error": "Presupuesto no encontrado"}), 404
        a.presupuesto_id = data["presupuesto_id"]
    db.session.commit()
    return jsonify({"message": "Alerta actualizada"})

# 🗑️ DELETE: eliminar alerta
@alerts_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def eliminar_alerta(id):
    a = Alerta.query.get_or_404(id)
    db.session.delete(a)
    db.session.commit()
    return jsonify({"message": "Alerta eliminada"})
