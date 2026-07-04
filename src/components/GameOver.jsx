function GameOver({ numero, onRetry }) {
    return (
        <div className="overlay">
            <div className="overlayCard overlayCardLose">
                <div className="overlayEmoji">💀</div>
                <h2 className="overlayTitle overlayTitleLose">¡PERDISTE!</h2>
                <p className="overlayText">
                    Se generó el número <strong>{numero}</strong>, pero éste no 
                    puede colocarse ningún casillero disponible.
                </p>
                <button className="retryBtn" onClick={onRetry}>
                    ¿Otra?
                </button>
            </div>
        </div>
    );
}

export default GameOver;