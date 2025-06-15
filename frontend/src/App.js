import React, { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [reports, setReports] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/budgets").then((res) => res.json()).then(setBudgets);
    fetch("http://localhost:5000/api/transactions").then((res) => res.json()).then(setTransactions);
    fetch("http://localhost:5000/api/reports").then((res) => res.json()).then(setReports);
    fetch("http://localhost:5000/api/alerts").then((res) => res.json()).then(setAlerts);
  }, []);

  return (
    <div className="container">
      <h1>Solvencia360: Panel de Integración</h1>

      <section>
        <h2 className="section-title">Presupuestos</h2>
        {budgets.map((b) => (
          <div key={b.id} className="card">
            <h3>{b.name}</h3>
            <p>Monto: ${b.total_amount}</p>
            <p>Inicio: {b.startDate}</p>
            <p>Fin: {b.endDate}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="section-title">Transacciones</h2>
        {transactions.map((t) => (
          <div key={t.id} className="card">
            <p><strong>Presupuesto:</strong> #{t.budgetId}</p>
            <p><strong>Monto:</strong> ${t.amount}</p>
            <p><strong>Descripción:</strong> {t.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="section-title">Informes</h2>
        {reports.map((r) => (
          <div key={r.id} className="card">
            <h3>{r.title}</h3>
            <pre>{JSON.stringify(r.content, null, 2)}</pre>
          </div>
        ))}
      </section>

      <section>
        <h2 className="section-title">Alertas</h2>
        {alerts.map((a) => (
          <div key={a.id} className="card" style={{ backgroundColor: "#8b0000" }}>
            <p><strong>Presupuesto:</strong> #{a.budgetId}</p>
            <p><strong>Mensaje:</strong> {a.message}</p>
            <p><strong>Leída:</strong> {a.read ? "Sí" : "No"}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
