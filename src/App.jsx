import "./App.css";
import { useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Board from "./components/Board";
import Card from "./components/Card";
import WinScreen from "./components/WinScreen";
import GameOver from "./components/GameOver";
import { generarNumero, hayLugarParaNumero, checkWin, puedeColocar } from "./game";

function App() {
    const [numero, setNumero] = useState(generarNumero());
    const [board, setBoard] = useState(Array(20).fill(null));
    const [dragging, setDragging] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [numeroSinLugar, setNumeroSinLugar] = useState(null);
    const [win, setWin] = useState(false);
    const [saliendo, setSaliendo] = useState(false);
    const [colocado, setColocado] = useState(false);
    const [mostrarBotonOtra, setMostrarBotonOtra] = useState(false);

    function handleDragStart() {
        setDragging(true);
        setColocado(false);
    }

    function handleDragEnd(event) {
        setDragging(false);
        if (!event.over || gameOver || win) return;
        const posicion = event.over.id - 1;
        if (!puedeColocar(board, posicion, numero)) return;

        setColocado(true);
        const nuevoTablero = [...board];
        nuevoTablero[posicion] = numero;
        setBoard(nuevoTablero);

        if (checkWin(nuevoTablero)) { 
            setWin(true); 
            setTimeout(() => setMostrarBotonOtra(true), 300);
            return; 
        }

        const siguiente = generarNumero();
        const hayLugar = hayLugarParaNumero(nuevoTablero, siguiente);

        setSaliendo(true);
        setTimeout(() => {
            if (!hayLugar) {
                setNumeroSinLugar(siguiente);
                setGameOver(true);
                setTimeout(() => setMostrarBotonOtra(true), 300);
                return;
            }
            setNumero(siguiente);
        }, 50);
        setTimeout(() => {
            setSaliendo(false);
            setColocado(false);
        }, 80);
    }

    function retry() {
        setNumero(generarNumero());
        setBoard(Array(20).fill(null));
        setDragging(false);
        setGameOver(false);
        setWin(false);
        setSaliendo(false);
        setColocado(false);
        setNumeroSinLugar(null);
        setMostrarBotonOtra(false);
    }

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="app">
                <h1>ASCEND</h1>
                <p className="subtitle">Colocá cada número en orden ascendente. Sin espacio para errores.</p>
                <div className="cardSlot">
                    {!dragging && !saliendo && !gameOver && !win && (
                        <Card key={numero} numero={numero} />
                    )}
                    {mostrarBotonOtra && (
                        <button className="retryBtn retryBtnSlot" onClick={retry}>
                            ¿Otra?
                        </button>
                    )}
                </div>
                <Board board={board} />
                <DragOverlay dropAnimation={null}>
                    {dragging && <Card numero={numero} dragging={true} />}
                </DragOverlay>
                {win && <WinScreen board={board} onRetry={retry} />}
                {gameOver && <GameOver numero={numeroSinLugar} onRetry={retry} />}
            </div>
        </DndContext>
    );
}

export default App;