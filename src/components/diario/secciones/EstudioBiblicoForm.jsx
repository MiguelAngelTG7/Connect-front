export default function EstudioBiblicoForm({ data, onChange, formData, onChangeGeneral }) {
  const tiposMensaje = [
    { value: 'promesa', label: 'Promesa' },
    { value: 'mandamiento', label: 'Mandamiento' },
    { value: 'advertencia', label: 'Advertencia' },
    { value: 'ejemplo', label: 'Ejemplo' }
  ];

  return (
    <div className="seccion estudio-biblico">
      <h3>📖 ESTUDIO BÍBLICO</h3>
      
      <div className="form-group">
        <label>📜 Pasaje bíblico:</label>
        <input
          type="text"
          value={data.pasaje_biblico}
          onChange={(e) => onChange('pasaje_biblico', e.target.value)}
          placeholder="Ej: Juan 3:16-21"
        />
      </div>

      <div className="form-group">
        <label>⭐ Versículo clave:</label>
        <textarea
          value={data.versiculo_clave}
          onChange={(e) => onChange('versiculo_clave', e.target.value)}
          placeholder="Escribe el versículo principal..."
          rows="3"
        />
      </div>

      <div className="preguntas-section">
        <h4>❓ Preguntas clave:</h4>
        <div className="preguntas-grid">
          <div className="form-group">
            <label>¿Qué?</label>
            <textarea
              value={data.pregunta_que}
              onChange={(e) => onChange('pregunta_que', e.target.value)}
              placeholder="¿Qué dice el pasaje?"
            />
          </div>
          <div className="form-group">
            <label>¿Quién?</label>
            <textarea
              value={data.pregunta_quien}
              onChange={(e) => onChange('pregunta_quien', e.target.value)}
              placeholder="¿Quién aparece en el pasaje?"
            />
          </div>
          <div className="form-group">
            <label>¿Dónde?</label>
            <textarea
              value={data.pregunta_donde}
              onChange={(e) => onChange('pregunta_donde', e.target.value)}
              placeholder="¿Dónde ocurre?"
            />
          </div>
          <div className="form-group">
            <label>¿Cuándo?</label>
            <textarea
              value={data.pregunta_cuando}
              onChange={(e) => onChange('pregunta_cuando', e.target.value)}
              placeholder="¿Cuándo sucede?"
            />
          </div>
          <div className="form-group">
            <label>¿Cómo?</label>
            <textarea
              value={data.pregunta_como}
              onChange={(e) => onChange('pregunta_como', e.target.value)}
              placeholder="¿Cómo ocurre?"
            />
          </div>
          <div className="form-group">
            <label>¿Por qué?</label>
            <textarea
              value={data.pregunta_porque}
              onChange={(e) => onChange('pregunta_porque', e.target.value)}
              placeholder="¿Por qué es importante?"
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>🏛️ Contexto histórico-cultural:</label>
        <textarea
          value={data.contexto_historico_cultural}
          onChange={(e) => onChange('contexto_historico_cultural', e.target.value)}
          placeholder="Contexto de la época..."
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>💝 ¿Qué tiene Dios para mí?</label>
        <select
          value={data.tipo_mensaje}
          onChange={(e) => onChange('tipo_mensaje', e.target.value)}
        >
          <option value="">Selecciona el tipo...</option>
          {tiposMensaje.map(tipo => (
            <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
          ))}
        </select>
        <textarea
          value={data.mensaje_dios}
          onChange={(e) => onChange('mensaje_dios', e.target.value)}
          placeholder="Explica el mensaje..."
          rows="3"
        />
      </div>

      <div className="enseñanzas-section">
        <h4>📚 ¿Qué enseñanza he encontrado?</h4>
        <div className="enseñanzas-grid">
          <div className="form-group">
            <label>Sobre Dios:</label>
            <textarea
              value={data.enseñanza_sobre_dios}
              onChange={(e) => onChange('enseñanza_sobre_dios', e.target.value)}
              placeholder="¿Qué aprendí sobre Dios?"
            />
          </div>
          <div className="form-group">
            <label>Sobre el hombre:</label>
            <textarea
              value={data.enseñanza_sobre_hombre}
              onChange={(e) => onChange('enseñanza_sobre_hombre', e.target.value)}
              placeholder="¿Qué aprendí sobre el ser humano?"
            />
          </div>
          <div className="form-group">
            <label>Sobre el pecado:</label>
            <textarea
              value={data.enseñanza_sobre_pecado}
              onChange={(e) => onChange('enseñanza_sobre_pecado', e.target.value)}
              placeholder="¿Qué aprendí sobre el pecado?"
            />
          </div>
          <div className="form-group">
            <label>Sobre la salvación:</label>
            <textarea
              value={data.enseñanza_sobre_salvacion}
              onChange={(e) => onChange('enseñanza_sobre_salvacion', e.target.value)}
              placeholder="¿Qué aprendí sobre la salvación?"
            />
          </div>
          <div className="form-group">
            <label>Sobre la sanidad:</label>
            <textarea
              value={data.enseñanza_sobre_sanidad}
              onChange={(e) => onChange('enseñanza_sobre_sanidad', e.target.value)}
              placeholder="¿Qué aprendí sobre la sanidad?"
            />
          </div>
          <div className="form-group">
            <label>Sobre la santificación:</label>
            <textarea
              value={data.enseñanza_sobre_santificacion}
              onChange={(e) => onChange('enseñanza_sobre_santificacion', e.target.value)}
              placeholder="¿Qué aprendí sobre la santificación?"
            />
          </div>
          <div className="form-group">
            <label>Sobre la segunda venida:</label>
            <textarea
              value={data.enseñanza_sobre_segunda_venida}
              onChange={(e) => onChange('enseñanza_sobre_segunda_venida', e.target.value)}
              placeholder="¿Qué aprendí sobre la segunda venida?"
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>🎯 ¿Cómo puedo aplicar esta enseñanza en mi vida?</label>
        <textarea
          value={data.aplicacion_vida}
          onChange={(e) => onChange('aplicacion_vida', e.target.value)}
          placeholder="Aplicación práctica..."
          rows="4"
        />
      </div>

      {/* Sección movida desde Básica */}
      <div className="aplicacion-section">
        <h4>💡 Aplicación Personal</h4>
        <div className="form-group">
          <label>🎯 Plan de acción del día:</label>
          <textarea
            value={formData.plan_accion}
            onChange={(e) => onChangeGeneral('plan_accion', e.target.value)}
            placeholder="Basado en lo estudiado, ¿qué planeas hacer hoy?"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>💭 Reflexión y Oración:</label>
          <textarea
            value={formData.reflexion_oracion}
            onChange={(e) => onChangeGeneral('reflexion_oracion', e.target.value)}
            placeholder="Tus reflexiones y oraciones basadas en el estudio..."
            rows="4"
          />
        </div>
      </div>
    </div>
  );
}