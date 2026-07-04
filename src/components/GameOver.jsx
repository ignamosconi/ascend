import { useState } from "react";

function GameOver({ numero, onRetry }) {
    const [verGrilla, setVerGrilla] = useState(false);

    if (verGrilla) return null;

    return (
        <div className="overlay">
            <div className="overlayCard overlayCardLose">
                <div className="overlayEmoji">💀</div>
                <h2 className="overlayTitle overlayTitleLose">¡PERDISTE!</h2>
                <p className="overlayText">
                    Se generó el número <strong>{numero}</strong>, pero éste no
                    puede colocarse en ningún casillero disponible.
                </p>
                <button className="retryBtn" onClick={() => setVerGrilla(true)}>
                    Ver grilla
                </button>
            </div>
        </div>
    );
}

export default GameOver;