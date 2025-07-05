# app/routes/ping.py
from flask import Blueprint, jsonify

ping_bp = Blueprint('ping', __name__, url_prefix='/api')

@ping_bp.route('/ping')
def ping():
    return jsonify({"message": "pong desde el backend Flask!"})
