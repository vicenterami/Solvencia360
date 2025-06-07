from .users import users_bp
from .transactions import transactions_bp
from .alerts import alerts_bp

# Esta es la lista de blueprints que importarás en app/__init__.py
blueprints = [users_bp, transactions_bp, alerts_bp]
