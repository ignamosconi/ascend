import { useDraggable } from "@dnd-kit/core";

function Card({ numero, dragging }) {
    const { attributes, listeners, setNodeRef } = useDraggable({ id: "card" });

    const className = dragging ? "card card-small" : "card";

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={className}
        >
            {numero}
        </div>
    );
}

export default Card;