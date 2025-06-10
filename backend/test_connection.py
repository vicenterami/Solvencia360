# test_connection.py
from app import create_app, db
from sqlalchemy import text

app = create_app()

with app.app_context():
    result = db.session.execute(text("SELECT * FROM usuario;"))
    print([row for row in result])
