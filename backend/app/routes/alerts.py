from flask import Blueprint, request, jsonify
from app.models import Alerta
from app import db

alerts_bp = Blueprint("alerts", __name__, url_prefix="/api/alerts")

@alerts_bp.route("/")
def hello_alerts():
    return {"message": "Alertas funcionando 👀"}
