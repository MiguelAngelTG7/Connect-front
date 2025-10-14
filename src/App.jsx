import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import DiarioDevocional from './components/diario/DiarioDevocional'

function App() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUsuario(JSON.parse(userData));
      } catch (e) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const manejarLogin = (userData) => {
    setUsuario(userData);
  };

  const manejarLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUsuario(null);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <h1>Connect App</h1>
      {usuario ? (
        <DiarioDevocional 
          usuario={usuario} 
          onLogout={manejarLogout}
        />
      ) : (
        <Login onLogin={manejarLogin} />
      )}
    </>
  )
}

export default App
