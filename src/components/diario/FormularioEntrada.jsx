import { useState, useEffect } from 'react';
import SeccionBasica from './secciones/SeccionBasica';
import EstudioBiblicoForm from './secciones/EstudioBiblicoForm';
import OracionForm from './secciones/OracionForm';

export default function FormularioEntrada({ entrada, onGuardar, onCancelar, usuario, esEdicion }) {
  const [formData, setFormData] = useState({
    titulo: '',  // Asegurar que esté incluido
    lugar: '',
    clima: '',
    estado_emocional: '😊',
    gratitud_1: '',
    gratitud_2: '',
    gratitud_3: '',
    plan_accion: '',
    reflexion_oracion: '',
    cancion_relacionada: '',
    letra_cancion: '',
    
    estudio_biblico: {
      pasaje_biblico: '',
      versiculo_clave: '',
      pregunta_que: '',
      pregunta_quien: '',
      pregunta_donde: '',
      pregunta_cuando: '',
      pregunta_como: '',
      pregunta_porque: '',
      contexto_historico_cultural: '',
      tipo_mensaje: '',
      mensaje_dios: '',
      enseñanza_sobre_dios: '',
      enseñanza_sobre_hombre: '',
      enseñanza_sobre_pecado: '',
      enseñanza_sobre_salvacion: '',
      enseñanza_sobre_sanidad: '',
      enseñanza_sobre_santificacion: '',
      enseñanza_sobre_segunda_venida: '',
      aplicacion_vida: ''
    },
    
    journal_prayer: {
      motivos_generales: '',
      motivo_oracion_1: '',
      motivo_oracion_2: '',
      motivo_oracion_3: '',
      respuestas_oraciones: ''
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [seccionActual, setSeccionActual] = useState('basica');

  useEffect(() => {
    if (entrada && esEdicion) {
      setFormData({
        ...entrada,
        estudio_biblico: entrada.estudio_biblico || formData.estudio_biblico,
        journal_prayer: entrada.journal_prayer || formData.journal_prayer
      });
    }
  }, [entrada, esEdicion]);

  const manejarCambio = (campo, valor, seccion = null) => {
    if (seccion) {
      setFormData(prev => ({
        ...prev,
        [seccion]: {
          ...prev[seccion],
          [campo]: valor
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [campo]: valor
      }));
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onGuardar(formData);
    } catch (err) {
      console.error('Error completo:', err);
      setError('Error al guardar la entrada: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formulario-nuevo">
      <div className="formulario-header-nuevo">
        <h2>{esEdicion ? '✏️ Editando entrada' : '✍️ Nueva entrada devocional'}</h2>
        <div className="header-actions-nuevo">
          <button onClick={onCancelar} className="cancelar-btn-nuevo">
            ❌ Cancelar
          </button>
        </div>
      </div>

      {error && <div className="error-message-nuevo">{error}</div>}

      <div className="secciones-nav-nuevo">
        <button 
          className={`seccion-btn-nuevo ${seccionActual === 'basica' ? 'activo' : ''}`}
          onClick={() => setSeccionActual('basica')}
        >
          📝 Básica
        </button>
        <button 
          className={`seccion-btn-nuevo ${seccionActual === 'estudio' ? 'activo' : ''}`}
          onClick={() => setSeccionActual('estudio')}
        >
          📖 Estudio
        </button>
        <button 
          className={`seccion-btn-nuevo ${seccionActual === 'oracion' ? 'activo' : ''}`}
          onClick={() => setSeccionActual('oracion')}
        >
          🙏 Oración
        </button>
      </div>

      <form onSubmit={manejarEnvio} className="formulario-nuevo-form">
        {seccionActual === 'basica' && (
          <SeccionBasica 
            data={formData}
            onChange={manejarCambio}
          />
        )}

        {seccionActual === 'estudio' && (
          <EstudioBiblicoForm 
            data={formData.estudio_biblico}
            onChange={(campo, valor) => manejarCambio(campo, valor, 'estudio_biblico')}
            formData={formData}
            onChangeGeneral={manejarCambio}
          />
        )}

        {seccionActual === 'oracion' && (
          <OracionForm 
            data={formData.journal_prayer}
            onChange={(campo, valor) => manejarCambio(campo, valor, 'journal_prayer')}
            formData={formData}
            onChangeGeneral={manejarCambio}
          />
        )}

        <div className="form-actions-nuevo">
          <button type="submit" disabled={loading} className="guardar-btn-nuevo">
            {loading ? 'Guardando...' : (esEdicion ? '💾 Actualizar' : '✅ Crear Entrada')}
          </button>
        </div>
      </form>
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