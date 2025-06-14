from app import create_app, db
from app.models import Usuario, Presupuesto, Transaccion, Alerta
from datetime import date
from werkzeug.security import generate_password_hash

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()

    # 👤 Usuarios (con contraseñas hasheadas reales)
    user1 = Usuario(nombre="Camilo Parada", email="camilo@empresa.com", password_hash=generate_password_hash("hash1"), rol="admin")
    user2 = Usuario(nombre="Javier Monsalvez", email="javier@empresa.com", password_hash=generate_password_hash("hash2"), rol="analista")
    user3 = Usuario(nombre="Vicente Bravo", email="vicente@empresa.com", password_hash=generate_password_hash("hash3"), rol="admin")

    db.session.add_all([user1, user2, user3])
    db.session.flush()

    # 📊 Presupuestos
    presupuesto1 = Presupuesto(
        nombre="Marketing Q2",
        descripcion="Presupuesto para campañas de marketing segundo trimestre",
        fecha_inicio=date(2025, 4, 1),
        fecha_fin=date(2025, 6, 30),
        usuario_id=user1.id
    )
    presupuesto2 = Presupuesto(
        nombre="Operaciones 2025",
        descripcion="Costos operacionales anuales",
        fecha_inicio=date(2025, 1, 1),
        fecha_fin=date(2025, 12, 31),
        usuario_id=user2.id
    )
    presupuesto3 = Presupuesto(
        nombre="Proyecto Solvencia360",
        descripcion="Presupuesto asignado al desarrollo del sistema",
        fecha_inicio=date(2025, 3, 1),
        fecha_fin=date(2025, 8, 30),
        usuario_id=user3.id
    )

    db.session.add_all([presupuesto1, presupuesto2, presupuesto3])
    db.session.flush()

    # 💸 Transacciones
    transacciones = [
        Transaccion(tipo="gasto", monto=1500.0, descripcion="Publicidad en Instagram", fecha=date(2025, 4, 5), presupuesto_id=presupuesto1.id),
        Transaccion(tipo="gasto", monto=900.0, descripcion="Google Ads", fecha=date(2025, 4, 10), presupuesto_id=presupuesto1.id),
        Transaccion(tipo="ingreso", monto=20000.0, descripcion="Financiamiento anual", fecha=date(2025, 1, 15), presupuesto_id=presupuesto2.id),
        Transaccion(tipo="gasto", monto=5000.0, descripcion="Sueldo desarrolladores", fecha=date(2025, 3, 20), presupuesto_id=presupuesto3.id),
        Transaccion(tipo="gasto", monto=3000.0, descripcion="Servidores y hosting", fecha=date(2025, 5, 3), presupuesto_id=presupuesto3.id),
    ]

    db.session.add_all(transacciones)

    # 🚨 Alertas
    alertas = [
        Alerta(mensaje="¡Presupuesto Marketing alcanzó el 80%!", nivel="alto", presupuesto_id=presupuesto1.id),
        Alerta(mensaje="Ingreso importante registrado", nivel="informativo", presupuesto_id=presupuesto2.id),
        Alerta(mensaje="Solvencia360 superó los gastos esperados", nivel="crítico", presupuesto_id=presupuesto3.id),
    ]

    db.session.add_all(alertas)

    db.session.commit()

    usuarios = Usuario.query.all()
    print(f"Usuarios guardados: {[u.nombre for u in usuarios]}")
    print("✅ Base de datos poblada con contraseñas hasheadas.")
