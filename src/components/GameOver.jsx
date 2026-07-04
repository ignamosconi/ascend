function GameOver({ numero, onRetry }) {
    return (
        <div className="overlay">
            <div className="overlayCard overlayCardLose">
                <h2 className="overlayTitle overlayTitleLose">¡PERDISTE!</h2>
                <p className="overlayText">
                    Se generó el número <strong>{numero}</strong>, pero éste
                    no puede colocarse en ninguno de los casilleros disponibles.
                </p>
                <button className="retryBtn" onClick={onRetry}>
                    Intentar de nuevo
                </button>
            </div>
        </div>
    );
}

export default GameOver;