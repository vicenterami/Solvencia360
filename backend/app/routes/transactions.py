from flask import Blueprint, request, jsonify
from app.models import Transaccion
from app import db
from flask_jwt_extended import jwt_required

transactions_bp = Blueprint('transactions', __name__, url_prefix='/api/transacciones')

# 🔽 GET: listar transacciones de un presupuesto
@transactions_bp.route('/presupuesto/<int:presupuesto_id>', methods=['GET'])
@jwt_required()
def listar_transacciones(presupuesto_id):
    transacciones = Transaccion.query.filter_by(presupuesto_id=presupuesto_id).all()
    return jsonify([{
        "id": t.id,
        "tipo": t.tipo,
        "monto": t.monto,
        "descripcion": t.descripcion,
        "fecha": str(t.fecha)
    } for t in transacciones])

# ➕ POST: crear nueva transacción
@transactions_bp.route('/', methods=['POST'])
@jwt_required()
def crear_transaccion():
    data = request.json

    # Validación mínima
    if data["tipo"] not in ["ingreso", "gasto"]:
        return jsonify({"error": "Tipo inválido (ingreso/gasto)"}), 400
    if data["monto"] < 0:
        return jsonify({"error": "El monto no puede ser negativo"}), 400

    transaccion = Transaccion(
        tipo=data["tipo"],
        monto=data["monto"],
        descripcion=data.get("descripcion"),
        fecha=data["fecha"],
        presupuesto_id=data["presupuesto_id"]
    )
    db.session.add(transaccion)
    db.session.commit()
    return jsonify({"message": "Transacción creada", "id": transaccion.id})

# ✏️ PUT: actualizar transacción
@transactions_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def actualizar_transaccion(id):
    t = Transaccion.query.get_or_404(id)
    data = request.json

    if "tipo" in data and data["tipo"] not in ["ingreso", "gasto"]:
        return jsonify({"error": "Tipo inválido"}), 400
    if "monto" in data and data["monto"] < 0:
        return jsonify({"error": "Monto inválido"}), 400

    t.tipo = data.get("tipo", t.tipo)
    t.monto = data.get("monto", t.monto)
    t.descripcion = data.get("descripcion", t.descripcion)
    t.fecha = data.get("fecha", t.fecha)
    db.session.commit()
    return jsonify({"message": "Transacción actualizada"})

# 🗑️ DELETE: eliminar transacción
@transactions_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def eliminar_transaccion(id):
    t = Transaccion.query.get_or_404(id)
    db.session.delete(t)
    db.session.commit()
    return jsonify({"message": "Transacción eliminada"})