# Solvencia360
Proyecto grupal para gestión de presupuestos empresariales. Curso Desarrollo de Aplicaciones Empresariales


Solvencia360

Gestión de presupuestos empresariales con frontend en React y backend en Flask/PostgreSQL.
🚀 Prerrequisitos

Node.js y npm

Python 3.x y pip

PostgreSQL

Frontend
bash
cd frontend
npm install
npm start

Abre http://localhost:3000
⚙️ Backend
bash

cd backend
pip install -r requirements.txt

Crea una base de datos en PostgreSQL y un usuario con contraseña.

Copia .env.example a .env y define las variables:

Crea este .env en la carpeta backend

DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/DB_NAME
JWT_SECRET_KEY=unaClaveSegura

Inicializa y llena las tablas:
python3 run_create_tables.py
python3 seed.py

Ejecuta la API:
flask run

Escucha en http://localhost:5000
🔐 Usuarios de prueba
Rol	Email	Contraseña
Admin	admin@solvencia.local	password123
Usuario	user@solvencia.local	password123
🌐 Deploy

La versión frontend está disponible en 

https://solvencia360.vercel.app/