import Cell from "./Cell";

function Board({ board, colores, dragging }) {
    return (
        <div className={`board ${dragging ? "board-dragging" : ""}`}>
            {board.map((valor, index) => (
                <Cell
                    key={index}
                    posicion={index + 1}
                    valor={valor}
                    color={colores[index]}
                />
            ))}
        </div>
    );
}

export default Board;