from flask import Blueprint, request, jsonify
from app.models import Transaccion
from app import db

transactions_bp = Blueprint('transactions', __name__)

@transactions_bp.route('/transacciones')
def transacciones():
    return "Hola desde transacciones"
