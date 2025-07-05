from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
import os

# Carga las variables de entorno al iniciar
load_dotenv()

# Instancias globales de SQLAlchemy y Migrate
db = SQLAlchemy()
migrate = Migrate()

jwt = JWTManager()

def create_app():
    app = Flask(__name__)

    # Configuración de la app
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    if not app.config['SQLALCHEMY_DATABASE_URI']:
        raise ValueError("🚨 DATABASE_URL no está definido en el entorno o en el .env")

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

    # Inicializar extensiones
    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Importar y registrar blueprints
    from .routes import blueprints
    for bp in blueprints:
        app.register_blueprint(bp)

    return app
