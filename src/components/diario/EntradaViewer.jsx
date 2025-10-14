import { useState, useEffect } from 'react';
import FormularioEntrada from './FormularioEntrada';

export default function EntradaViewer({ 
  entrada, 
  modoEdicion, 
  onCrearNueva, 
  onGuardarEntrada, 
  onCancelarEdicion,
  usuario,
  loading 
}) {
  
  // MODO EDICIÓN - CON CONTENEDOR COMÚN
  if (modoEdicion) {
    return (
      <div className="entrada-container">
        <FormularioEntrada
          entrada={entrada}
          onGuardar={onGuardarEntrada}
          onCancelar={onCancelarEdicion}
          usuario={usuario}
          esEdicion={!!entrada}
        />
      </div>
    );
  }

  // SIN ENTRADA - CON CONTENEDOR COMÚN
  if (!entrada) {
    return (
      <div className="entrada-container">
        <div className="entrada-vacia">
          <div className="bienvenida">
            <h2>📖 Bienvenido a tu Diario Devocional</h2>
            <p>Comienza tu viaje espiritual creando tu primera entrada.</p>
            <button onClick={onCrearNueva} className="crear-primera-btn">
              ✍️ Crear Primera Entrada
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MODO LECTURA - CON CONTENEDOR COMÚN
  return (
    <div className="entrada-container">
      <div className="entrada-lectura">
        {loading && <div className="loading-overlay">Cargando...</div>}
        
        {/* Header de la entrada */}
        <div className="entrada-header">
          <div className="entrada-meta">
            {entrada.titulo && (
              <h1 className="entrada-titulo">{entrada.titulo}</h1>
            )}
            
            <h2 className="entrada-fecha">
              {new Date(entrada.fecha).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h2>
            <p className="entrada-tiempo">
              {new Date(entrada.fecha).toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>

        {/* Contenido de la entrada */}
        <div className="entrada-contenido">
          
          {/* Información básica */}
          <section className="seccion-lectura basica">
            <h3>📍 Información del día</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Lugar:</span>
                <span className="value">{entrada.lugar || 'No especificado'}</span>
              </div>
              {entrada.clima && (
                <div className="info-item">
                  <span className="label">Clima:</span>
                  <span className="value">{entrada.clima}</span>
                </div>
              )}
              <div className="info-item">
                <span className="label">Me sentía:</span>
                <span className="value estado">{entrada.estado_emocional}</span>
              </div>
            </div>
          </section>

          {/* Gratitud */}
          {(entrada.gratitud_1 || entrada.gratitud_2 || entrada.gratitud_3) && (
            <section className="seccion-lectura gratitud">
              <h3>🙏 Motivos de gratitud</h3>
              <div className="gratitud-lista">
                {entrada.gratitud_1 && (
                  <div className="gratitud-item">
                    <strong>1.</strong> {entrada.gratitud_1}
                  </div>
                )}
                {entrada.gratitud_2 && (
                  <div className="gratitud-item">
                    <strong>2.</strong> {entrada.gratitud_2}
                  </div>
                )}
                {entrada.gratitud_3 && (
                  <div className="gratitud-item">
                    <strong>3.</strong> {entrada.gratitud_3}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Plan de acción */}
          {entrada.plan_accion && (
            <section className="seccion-lectura accion">
              <h3>🎯 Plan de acción</h3>
              <div className="texto-contenido">
                {entrada.plan_accion}
              </div>
            </section>
          )}

          {/* Reflexión y oración */}
          {entrada.reflexion_oracion && (
            <section className="seccion-lectura reflexion">
              <h3>🤲 Reflexión y oración</h3>
              <div className="texto-destacado">
                {entrada.reflexion_oracion}
              </div>
            </section>
          )}

          {/* Canción relacionada */}
          {entrada.cancion_relacionada && (
            <section className="seccion-lectura musica">
              <h3>🎵 Canción relacionada</h3>
              <div>
                <div className="texto-contenido">
                  <strong>Canción:</strong> {entrada.cancion_relacionada}
                </div>
                {entrada.letra_cancion && (
                  <div className="texto-contenido" style={{ marginTop: '1rem', fontStyle: 'italic' }}>
                    <strong>Letra relevante:</strong><br />
                    {entrada.letra_cancion}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Estudio bíblico */}
          {entrada.estudio_biblico && entrada.estudio_biblico.pasaje_biblico && (
            <section className="seccion-lectura estudio">
              <h3>📖 Estudio bíblico</h3>
              <div>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Pasaje:</span>
                    <span className="value">{entrada.estudio_biblico.pasaje_biblico}</span>
                  </div>
                  {entrada.estudio_biblico.versiculo_clave && (
                    <div className="info-item">
                      <span className="label">Versículo clave:</span>
                      <span className="value">{entrada.estudio_biblico.versiculo_clave}</span>
                    </div>
                  )}
                </div>

                {/* Preguntas de análisis */}
                {(entrada.estudio_biblico.pregunta_que || entrada.estudio_biblico.pregunta_quien || 
                  entrada.estudio_biblico.pregunta_donde || entrada.estudio_biblico.pregunta_cuando ||
                  entrada.estudio_biblico.pregunta_como || entrada.estudio_biblico.pregunta_porque) && (
                  <div className="preguntas-grid-lectura">
                    {entrada.estudio_biblico.pregunta_que && (
                      <div><strong>¿Qué?</strong> {entrada.estudio_biblico.pregunta_que}</div>
                    )}
                    {entrada.estudio_biblico.pregunta_quien && (
                      <div><strong>¿Quién?</strong> {entrada.estudio_biblico.pregunta_quien}</div>
                    )}
                    {entrada.estudio_biblico.pregunta_donde && (
                      <div><strong>¿Dónde?</strong> {entrada.estudio_biblico.pregunta_donde}</div>
                    )}
                    {entrada.estudio_biblico.pregunta_cuando && (
                      <div><strong>¿Cuándo?</strong> {entrada.estudio_biblico.pregunta_cuando}</div>
                    )}
                    {entrada.estudio_biblico.pregunta_como && (
                      <div><strong>¿Cómo?</strong> {entrada.estudio_biblico.pregunta_como}</div>
                    )}
                    {entrada.estudio_biblico.pregunta_porque && (
                      <div><strong>¿Por qué?</strong> {entrada.estudio_biblico.pregunta_porque}</div>
                    )}
                  </div>
                )}

                {/* Contexto y mensaje */}
                {entrada.estudio_biblico.contexto_historico_cultural && (
                  <div className="texto-contenido" style={{ marginTop: '1rem' }}>
                    <strong>Contexto histórico-cultural:</strong><br />
                    {entrada.estudio_biblico.contexto_historico_cultural}
                  </div>
                )}

                {entrada.estudio_biblico.mensaje_dios && (
                  <div className="texto-destacado" style={{ marginTop: '1rem' }}>
                    <strong>Mensaje de Dios:</strong><br />
                    {entrada.estudio_biblico.mensaje_dios}
                  </div>
                )}

                {entrada.estudio_biblico.aplicacion_vida && (
                  <div className="texto-contenido" style={{ marginTop: '1rem' }}>
                    <strong>Aplicación a mi vida:</strong><br />
                    {entrada.estudio_biblico.aplicacion_vida}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Journal de oración */}
          {entrada.journal_prayer && (entrada.journal_prayer.motivos_generales || 
           entrada.journal_prayer.motivo_oracion_1 || entrada.journal_prayer.motivo_oracion_2 || 
           entrada.journal_prayer.motivo_oracion_3 || entrada.journal_prayer.respuestas_oraciones) && (
            <section className="seccion-lectura oracion">
              <h3>🙏 Journal de oración</h3>
              <div>
                {entrada.journal_prayer.motivos_generales && (
                  <div className="texto-contenido" style={{ marginBottom: '1rem' }}>
                    <strong>Motivos generales:</strong><br />
                    {entrada.journal_prayer.motivos_generales}
                  </div>
                )}

                {(entrada.journal_prayer.motivo_oracion_1 || entrada.journal_prayer.motivo_oracion_2 || 
                  entrada.journal_prayer.motivo_oracion_3) && (
                  <div className="gratitud-lista">
                    {entrada.journal_prayer.motivo_oracion_1 && (
                      <div className="gratitud-item">
                        <strong>Oración específica 1:</strong> {entrada.journal_prayer.motivo_oracion_1}
                      </div>
                    )}
                    {entrada.journal_prayer.motivo_oracion_2 && (
                      <div className="gratitud-item">
                        <strong>Oración específica 2:</strong> {entrada.journal_prayer.motivo_oracion_2}
                      </div>
                    )}
                    {entrada.journal_prayer.motivo_oracion_3 && (
                      <div className="gratitud-item">
                        <strong>Oración específica 3:</strong> {entrada.journal_prayer.motivo_oracion_3}
                      </div>
                    )}
                  </div>
                )}

                {entrada.journal_prayer.respuestas_oraciones && (
                  <div className="texto-destacado" style={{ marginTop: '1rem' }}>
                    <strong>Respuestas a oraciones:</strong><br />
                    {entrada.journal_prayer.respuestas_oraciones}
                  </div>
                )}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}