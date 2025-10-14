import { useState } from 'react';

export default function SidebarEntradas({ 
  entradas, 
  entradaActual, 
  onSeleccionarEntrada, 
  onCrearNueva, 
  onEliminarEntrada,
  onEditarEntrada 
}) {
  
  return (
    <div className="sidebar-container">
      {/* Header del sidebar */}
      <div className="sidebar-header">
        <h3>📖 Mis Entradas</h3>
        <button onClick={onCrearNueva} className="nueva-entrada-sidebar-btn">
          ✍️ Nueva
        </button>
      </div>

      {/* Lista de entradas */}
      <div className="entradas-timeline">
        {entradas.length === 0 ? (
          <div className="no-entradas-sidebar">
            <p>No tienes entradas aún</p>
            <button onClick={onCrearNueva} className="crear-primera-sidebar">
              Crear primera entrada
            </button>
          </div>
        ) : (
          entradas.map(entrada => (
            <EntradaTimelineItem
              key={entrada.id}
              entrada={entrada}
              esActiva={entradaActual && entradaActual.id === entrada.id}
              onSeleccionar={() => onSeleccionarEntrada(entrada.id)}
              onEditar={() => onEditarEntrada(entrada.id)}
              onEliminar={() => onEliminarEntrada(entrada.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Componente individual para cada entrada en el timeline
function EntradaTimelineItem({ entrada, esActiva, onSeleccionar, onEditar, onEliminar }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const fecha = new Date(entrada.fecha);
  const fechaFormateada = fecha.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const tiempoFormateado = fecha.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Funciones de manejo...
  const manejarAccion = (accion, e) => {
    e.stopPropagation();
    setMenuAbierto(false);
    
    switch(accion) {
      case 'ver':
        onSeleccionar();
        break;
      case 'editar':
        onEditar();
        break;
      case 'eliminar':
        onEliminar();
        break;
    }
  };

  return (
    <div className={`timeline-item ${esActiva ? 'activa' : ''}`}>
      <div className="timeline-content" onClick={onSeleccionar}>
        {/* NUEVO DISEÑO - Solo título, fecha, ubicación y clima */}
        <div className="timeline-titulo">
          {entrada.titulo || 'Sin título'}
        </div>
        
        <div className="timeline-meta">
          <div className="timeline-fecha-completa">
            📅 {fechaFormateada} • {tiempoFormateado}
          </div>
          
          <div className="timeline-detalles">
            {entrada.lugar && (
              <div className="timeline-ubicacion">
                📍 {entrada.lugar}
              </div>
            )}
            {entrada.clima && (
              <div className="timeline-clima">
                🌤️ {entrada.clima}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menú de acciones - sin cambios */}
      <div className="timeline-menu">
        <button 
          className="menu-toggle-btn"
          onClick={(e) => {
            e.stopPropagation();
            setMenuAbierto(!menuAbierto);
          }}
          title="Opciones"
        >
          ⋮
        </button>

        {menuAbierto && (
          <>
            <div 
              className="menu-overlay-close"
              onClick={() => setMenuAbierto(false)}
            />
            
            <div className="menu-dropdown">
              <button 
                className="menu-item ver"
                onClick={(e) => manejarAccion('ver', e)}
              >
                👁️ Ver
              </button>
              <button 
                className="menu-item editar"
                onClick={(e) => manejarAccion('editar', e)}
              >
                ✏️ Editar
              </button>
              <button 
                className="menu-item eliminar"
                onClick={(e) => manejarAccion('eliminar', e)}
              >
                🗑️ Eliminar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}