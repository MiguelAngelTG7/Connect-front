import { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import EntradaViewer from './EntradaViewer';
import SidebarEntradas from './SidebarEntradas';

export default function DiarioDevocional({ usuario, onLogout }) {
  // Debug temporal - puedes quitar esto después
  console.log('Usuario recibido:', usuario);
  
  const [entradas, setEntradas] = useState([]);
  const [entradaActual, setEntradaActual] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarEntradas();
  }, []);

  // Al cargar entradas, seleccionar automáticamente la más reciente
  const cargarEntradas = async () => {
    try {
      setLoading(true);
      const data = await api.diario.getEntradas();
      setEntradas(data);
      
      // Seleccionar automáticamente la entrada más reciente
      if (data.length > 0 && !entradaActual) {
        setEntradaActual(data[0]); // La más reciente (ya vienen ordenadas por fecha desc)
      }
    } catch (err) {
      setError('Error al cargar las entradas: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const seleccionarEntrada = async (id) => {
    try {
      setLoading(true);
      const entrada = await api.diario.getEntrada(id);
      setEntradaActual(entrada);
      setModoEdicion(false);
    } catch (err) {
      setError('Error al cargar la entrada: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const crearNuevaEntrada = () => {
    setEntradaActual(null);
    setModoEdicion(true);
  };

  // FUNCIÓN PARA EDITAR UNA ENTRADA POR ID (desde el sidebar)
  const editarEntradaPorId = async (id) => {
    try {
      setLoading(true);
      const entrada = await api.diario.getEntrada(id);
      setEntradaActual(entrada);
      setModoEdicion(true);
    } catch (err) {
      setError('Error al cargar la entrada: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const guardarEntrada = async (datosEntrada) => {
    try {
      setLoading(true);
      
      if (entradaActual) {
        // Actualizar entrada existente
        await api.diario.actualizarEntrada(entradaActual.id, datosEntrada);
        const entradaActualizada = await api.diario.getEntrada(entradaActual.id);
        setEntradaActual(entradaActualizada);
      } else {
        // Crear nueva entrada
        const nuevaEntrada = await api.diario.crearEntrada({
          ...datosEntrada,
          usuario: usuario.id
        });
        const entradaCompleta = await api.diario.getEntrada(nuevaEntrada.id);
        setEntradaActual(entradaCompleta);
      }
      
      setModoEdicion(false);
      cargarEntradas(); // Recargar la lista
    } catch (err) {
      setError('Error al guardar: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const eliminarEntrada = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta entrada?')) {
      try {
        await api.diario.eliminarEntrada(id);
        cargarEntradas();
        
        // Si eliminamos la entrada actual, seleccionar la más reciente
        if (entradaActual && entradaActual.id === id) {
          const entradasRestantes = entradas.filter(e => e.id !== id);
          setEntradaActual(entradasRestantes.length > 0 ? entradasRestantes[0] : null);
        }
      } catch (err) {
        setError('Error al eliminar: ' + err.message);
      }
    }
  };

  if (loading && entradas.length === 0) {
    return <div className="loading">Cargando tu diario...</div>;
  }

  return (
    <div className="diario-layout">
      {/* Header */}
      <header className="diario-header-new">
        <div className="header-content">
          <h1>📖 Mi Diario Devocional</h1>
          <div className="header-actions">
            <span className="welcome-text">
              Hola, {usuario?.username || usuario?.name || 'Usuario'}
            </span>
            <button onClick={onLogout} className="logout-btn-new">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {error && <div className="error-banner">{error}</div>}

      {/* Layout principal */}
      <div className="main-layout">
        {/* Contenido principal - Entrada actual */}
        <main className="content-area">
          <EntradaViewer
            entrada={entradaActual}
            modoEdicion={modoEdicion}
            onCrearNueva={crearNuevaEntrada}
            onGuardarEntrada={guardarEntrada}
            onCancelarEdicion={() => setModoEdicion(false)}
            usuario={usuario}
            loading={loading}
          />
        </main>

        {/* Sidebar derecho */}
        <aside className="sidebar-entradas">
          <SidebarEntradas
            entradas={entradas}
            entradaActual={entradaActual}
            onSeleccionarEntrada={seleccionarEntrada}
            onCrearNueva={crearNuevaEntrada}
            onEliminarEntrada={eliminarEntrada}
            onEditarEntrada={editarEntradaPorId}  // Usar la función correcta
          />
        </aside>
      </div>
    </div>
  );
}