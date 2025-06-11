import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/test')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error al llamar la API:', error));
  }, []);

  return (
    <div>
      <h1>Integración Flask + React</h1>
      <p>Mensaje desde el backend: {message}</p>
    </div>
  );
}

export default App;
