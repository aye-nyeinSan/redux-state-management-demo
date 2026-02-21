import TaskCard from "./TaskCard"
import {  Draggable, Droppable } from "@hello-pangea/dnd"
export default function TaskColumn({ columnTitle, todoTasks, columnId }   : { columnTitle: string, todoTasks: any[] , columnId: string}) { 
    return (
      <Droppable droppableId={columnId}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            id={columnId}
            className="flex flex-col gap-3 rounded-lg bg-muted/50 p-4"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {columnTitle}
            </h3>

            {todoTasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard
                      id={task.id}
                      title={task.title}
                      description={task.description}
                      isDragging={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    ) 


}