from flask import Blueprint, jsonify
from app.models import Presupuesto, Transaccion

bp = Blueprint('reports', __name__, url_prefix='/api/reportes')

@bp.route('/presupuesto/<int:id>', methods=['GET'])
def resumen_presupuesto(id):
    ingresos = sum(t.monto for t in Transaccion.query.filter_by(presupuesto_id=id, tipo='ingreso').all())
    egresos = sum(t.monto for t in Transaccion.query.filter_by(presupuesto_id=id, tipo='gasto').all())
    return jsonify({"total_ingresos": ingresos, "total_egresos": egresos, "saldo": ingresos - egresos})
