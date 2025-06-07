from app import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    rol = db.Column(db.String(50), nullable=False)

    presupuestos = db.relationship("Presupuesto", backref="usuario", lazy=True)

class Presupuesto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text)
    fecha_inicio = db.Column(db.Date, nullable=False)
    fecha_fin = db.Column(db.Date, nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    transacciones = db.relationship("Transaccion", backref="presupuesto", lazy=True)

class Transaccion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tipo = db.Column(db.String(10), nullable=False)  # ingreso o gasto
    monto = db.Column(db.Float, nullable=False)
    descripcion = db.Column(db.String(255))
    fecha = db.Column(db.Date, default=datetime.utcnow)
    presupuesto_id = db.Column(db.Integer, db.ForeignKey("presupuesto.id"), nullable=False)

class Alerta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mensaje = db.Column(db.String(255), nullable=False)
    nivel = db.Column(db.String(50), nullable=False)
    presupuesto_id = db.Column(db.Integer, db.ForeignKey("presupuesto.id"))
    creada_en = db.Column(db.DateTime, default=datetime.utcnow)
