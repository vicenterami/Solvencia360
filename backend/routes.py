# backend/routes.py

from flask import jsonify, request

def register_routes(app):
    # Ruta de prueba
    @app.route('/api/test', methods=['GET'])
    def test():
        return jsonify({'message': 'API funcionando correctamente'})

    # -------------------------
    # MÓDULO: PRESUPUESTOS
    # -------------------------
    @app.route('/api/budgets', methods=['GET'])
    def get_budgets():
        return jsonify([
            {"id": 1, "name": "Marketing", "total_amount": 4000, "startDate": "2025-01-01", "endDate": "2025-12-31"},
            {"id": 2, "name": "TI", "total_amount": 8000, "startDate": "2025-03-01", "endDate": "2025-12-31"}
        ])

    @app.route('/api/budgets', methods=['POST'])
    def create_budget():
        data = request.get_json()
        return jsonify({"message": "Presupuesto creado correctamente", "data": data}), 201

    # -------------------------
    # MÓDULO: TRANSACCIONES
    # -------------------------
    @app.route('/api/transactions', methods=['GET'])
    def get_transactions():
        return jsonify([
            {"id": 101, "budgetId": 1, "amount": 250, "description": "Compra de insumos"},
            {"id": 102, "budgetId": 2, "amount": 900, "description": "Licencia software"}
        ])

    @app.route('/api/transactions', methods=['POST'])
    def create_transaction():
        data = request.get_json()
        return jsonify({"message": "Transacción registrada", "data": data}), 201

    # -------------------------
    # MÓDULO: INFORMES
    # -------------------------
    @app.route('/api/reports', methods=['GET'])
    def get_reports():
        return jsonify([
            {"id": 1, "title": "Informe mensual enero", "content": {"total": 1000, "ingresos": 1200, "egresos": 200}},
            {"id": 2, "title": "Informe trimestral", "content": {"total": 3000, "ingresos": 3500, "egresos": 500}}
        ])

    # -------------------------
    # MÓDULO: ALERTAS
    # -------------------------
    @app.route('/api/alerts', methods=['GET'])
    def get_alerts():
        return jsonify([
            {"id": 1, "budgetId": 1, "message": "Presupuesto superado", "read": False},
            {"id": 2, "budgetId": 2, "message": "Transacción inusual detectada", "read": True}
        ])

    # -------------------------
    # MÓDULO: USUARIOS Y LOGIN (simulado)
    # -------------------------
    @app.route('/api/users/login', methods=['POST'])
    def login():
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        if email == "admin@empresa.com" and password == "admin123":
            return jsonify({"message": "Login exitoso", "role": "admin"}), 200
        else:
            return jsonify({"message": "Credenciales inválidas"}), 401
