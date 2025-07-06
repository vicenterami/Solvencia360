from flask import Blueprint, request, jsonify
from app.models import Alerta, Presupuesto
from app import db
from flask_jwt_extended import jwt_required, get_jwt_identity

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

# GET /api/alertas/usuario
@alerts_bp.route('/usuario', methods=['GET'])
@jwt_required()
def listar_alertas_usuario_actual():
    usuario_id = get_jwt_identity()

    # obtener presupuestos del usuario
    presupuestos = Presupuesto.query.filter_by(usuario_id=usuario_id).all()
    ids = [p.id for p in presupuestos]

    # traer sólo las alertas de esos presupuestos
    alertas = Alerta.query.filter(Alerta.presupuesto_id.in_(ids)).all()

    return jsonify([{
        "id":      a.id,
        "titulo":  a.titulo,
        "mensaje": a.mensaje,
        "nivel":   a.nivel,
        "leida":   a.leida,
        "fecha":   a.creada_en.isoformat(),
        "presupuesto_id": a.presupuesto_id
    } for a in alertas])


# PATCH /api/alertas/<id>/marcar-leida
@alerts_bp.route('/<int:id>/marcar-leida', methods=['PATCH'])
@jwt_required()
def marcar_alerta_leida(id):
    alerta = Alerta.query.get_or_404(id)

    # sólo el dueño del presupuesto puede marcarla
    if alerta.presupuesto.usuario_id != get_jwt_identity():
        return jsonify({"error": "No autorizado"}), 403

    alerta.leida = True
    db.session.commit()
    return jsonify({"message": "Alerta marcada como leída"}), 200