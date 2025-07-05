from .auth import auth_bp
from .users import users_bp
from .transactions import transactions_bp
from .alerts import alerts_bp
from .ping import ping_bp
from .budgets import presupuestos_bp

# Esta es la lista de blueprints que importarás en app/__init__.py
blueprints = [users_bp, transactions_bp, alerts_bp, ping_bp, auth_bp, presupuestos_bp]
