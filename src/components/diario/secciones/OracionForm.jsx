export default function OracionForm({ data, onChange, formData, onChangeGeneral }) {
  return (
    <div className="seccion journal-prayer">
      <h3>🙏 JOURNAL PRAYER</h3>
      
      <div className="form-group">
        <label>📝 Motivos de Oración Generales:</label>
        <textarea
          value={data.motivos_generales}
          onChange={(e) => onChange('motivos_generales', e.target.value)}
          placeholder="Motivos generales por los que oras..."
          rows="4"
        />
      </div>

      <div className="motivos-section">
        <h4>🎯 3 motivos por los que orar hoy:</h4>
        <div className="form-group">
          <label>1.</label>
          <textarea
            value={data.motivo_oracion_1}
            onChange={(e) => onChange('motivo_oracion_1', e.target.value)}
            placeholder="Primer motivo específico de hoy..."
            rows="2"
          />
        </div>
        <div className="form-group">
          <label>2.</label>
          <textarea
            value={data.motivo_oracion_2}
            onChange={(e) => onChange('motivo_oracion_2', e.target.value)}
            placeholder="Segundo motivo específico de hoy..."
            rows="2"
          />
        </div>
        <div className="form-group">
          <label>3.</label>
          <textarea
            value={data.motivo_oracion_3}
            onChange={(e) => onChange('motivo_oracion_3', e.target.value)}
            placeholder="Tercer motivo específico de hoy..."
            rows="2"
          />
        </div>
      </div>

      <div className="form-group">
        <label>✅ Respuestas a mis oraciones:</label>
        <textarea
          value={data.respuestas_oraciones}
          onChange={(e) => onChange('respuestas_oraciones', e.target.value)}
          placeholder="Oraciones que han sido respondidas..."
          rows="4"
        />
      </div>

      {/* Sección movida desde Básica */}
      <div className="musica-section">
        <h4>🎵 Música que me conecta con Dios</h4>
        <div className="form-group">
          <label>🎵 Canción relacionada (Spotify):</label>
          <input
            type="url"
            value={formData.cancion_relacionada}
            onChange={(e) => onChangeGeneral('cancion_relacionada', e.target.value)}
            placeholder="https://open.spotify.com/..."
          />
        </div>

        <div className="form-group">
          <label>🎼 Letra de la canción:</label>
          <textarea
            value={formData.letra_cancion}
            onChange={(e) => onChangeGeneral('letra_cancion', e.target.value)}
            placeholder="Letra o fragmento de la canción que te impactó..."
            rows="4"
          />
        </div>
      </div>
    </div>
  );
}