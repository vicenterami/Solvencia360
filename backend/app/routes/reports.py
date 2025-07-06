from flask import Blueprint, jsonify
from app.models import Presupuesto, Transaccion
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from sqlalchemy import func

reports_bp = Blueprint('reports', __name__, url_prefix='/api/reportes')

@reports_bp.route('/presupuesto/<int:id>', methods=['GET'])
@jwt_required()
def resumen_presupuesto(id):
    ingresos = sum(t.monto for t in Transaccion.query.filter_by(presupuesto_id=id, tipo='ingreso').all())
    egresos = sum(t.monto for t in Transaccion.query.filter_by(presupuesto_id=id, tipo='gasto').all())
    return jsonify({"total_ingresos": ingresos, "total_egresos": egresos, "saldo": ingresos - egresos})


@reports_bp.route('/usuario', methods=['GET'])
@jwt_required()
def resumen_usuario_actual():
    # 1. Obtengo el ID del usuario del token
    usuario_id = get_jwt_identity()

    # 2. Sumo todos los ingresos de los presupuestos de este usuario
    ingresos = db.session.query(
        func.coalesce(func.sum(Transaccion.monto), 0.0)
    ).join(Presupuesto).filter(
        Presupuesto.usuario_id == usuario_id,
        Transaccion.tipo == 'ingreso'
    ).scalar()

    # 3. Sumo todos los egresos
    egresos = db.session.query(
        func.coalesce(func.sum(Transaccion.monto), 0.0)
    ).join(Presupuesto).filter(
        Presupuesto.usuario_id == usuario_id,
        Transaccion.tipo == 'gasto'
    ).scalar()

    # 4. Retorno JSON con totales
    return jsonify({
        "total_ingresos": ingresos or 0.0,
        "total_egresos": egresos or 0.0,
        "saldo": (ingresos or 0.0) - (egresos or 0.0)
    })