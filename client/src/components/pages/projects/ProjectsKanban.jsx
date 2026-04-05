import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { COLUMN_LABEL, COLUMN_ORDER } from "./boardState";

function priBadge(p) {
  if (p === "High") return "bg-red-100 text-red-800";
  if (p === "Med") return "bg-yellow-100 text-yellow-800";
  return "bg-gray-100 text-gray-700";
}

export default function ProjectsKanban({ columns, onDragEnd }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
        {COLUMN_ORDER.map((colId) => (
          <Droppable droppableId={colId} key={colId}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="bg-gray-100 rounded-lg border border-gray-200 p-3 min-h-[200px]">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">{COLUMN_LABEL[colId]}</h3>
                <div className="space-y-2">
                  {(columns[colId] || []).map((card, index) => (
                    <Draggable draggableId={card.id} index={index} key={card.id}>
                      {(p) => (
                        <div
                          ref={p.innerRef}
                          {...p.draggableProps}
                          {...p.dragHandleProps}
                          className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"
                        >
                          <div className="font-medium text-gray-900 text-sm">{card.name}</div>
                          <div className="text-xs text-gray-600 mt-1">Agent: {card.assignee}</div>
                          <div className="text-xs text-gray-500 mt-0.5">Due {card.due}</div>
                          <span className={`inline-flex mt-2 px-2 py-0.5 rounded text-[10px] font-medium ${priBadge(card.priority)}`}>{card.priority}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
