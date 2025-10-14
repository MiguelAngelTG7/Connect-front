export default function SeccionBasica({ data, onChange }) {
  // Obtener fecha y hora actual
  const fechaActual = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const emoticons = ['😊', '😇', '🙏', '❤️', '😔', '😌', '🤗', '💪', '🎉', '😍'];

  return (
    <div className="seccion">
      <div className="fecha-actual">
        <h3>📅 Hoy es: {fechaActual}</h3>
      </div>

      {/* NUEVO CAMPO - Título */}
      <div className="form-group titulo-principal">
        <label>📝 Título de mi entrada:</label>
        <input
          type="text"
          value={data.titulo}
          onChange={(e) => onChange('titulo', e.target.value)}
          placeholder="Ej: Un día de bendiciones, Reflexiones matutinas, etc."
          className="titulo-input"
        />
      </div>

      <div className="form-group">
        <label>📍 Lugar:</label>
        <input
          type="text"
          value={data.lugar}
          onChange={(e) => onChange('lugar', e.target.value)}
          placeholder="¿Dónde estás escribiendo esto?"
        />
      </div>

      <div className="form-group">
        <label>🌤️ Clima:</label>
        <input
          type="text"
          value={data.clima}
          onChange={(e) => onChange('clima', e.target.value)}
          placeholder="Ej: Soleado, Nublado, Lluvioso..."
        />
      </div>

      <div className="form-group">
        <label>😊 Me siento:</label>
        <div className="emoticons-grid">
          {emoticons.map(emoji => (
            <button
              key={emoji}
              type="button"
              className={`emoticon-btn ${data.estado_emocional === emoji ? 'activo' : ''}`}
              onClick={() => onChange('estado_emocional', emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <div className="gratitud-section">
        <h3>🙏 Hoy estoy agradecido por:</h3>
        <div className="form-group">
          <label>1.</label>
          <textarea
            value={data.gratitud_1}
            onChange={(e) => onChange('gratitud_1', e.target.value)}
            placeholder="Primer motivo de gratitud..."
          />
        </div>
        <div className="form-group">
          <label>2.</label>
          <textarea
            value={data.gratitud_2}
            onChange={(e) => onChange('gratitud_2', e.target.value)}
            placeholder="Segundo motivo de gratitud..."
          />
        </div>
        <div className="form-group">
          <label>3.</label>
          <textarea
            value={data.gratitud_3}
            onChange={(e) => onChange('gratitud_3', e.target.value)}
            placeholder="Tercer motivo de gratitud..."
          />
        </div>
      </div>
    </div>
  );
}