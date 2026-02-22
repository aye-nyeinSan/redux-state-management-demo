
import { useDispatch,useSelector } from "react-redux"
import { taskActions } from "./tasksSlice"
import type { RootState } from "../../app/store"
import  { store } from "../../app/store"
import TaskColumn from "../../components/TaskColumn"
import { DragDropContext } from "@hello-pangea/dnd"

export default function TasksView() {
    const dispatch = useDispatch()
    const unsubscribe = store.subscribe(() => console.log("Store updated:", store.getState()))
    unsubscribe() 
    const tasks = useSelector((state:RootState) => state.taskReducer.tasks)


  const todoTasks = tasks.filter((task) => task.status === "To Do")
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress")
  const doneTasks = tasks.filter((task) => task.status === "Done")
    
    

    const handleAddTask = () => {

       dispatch(taskActions.addTask({
            id: Math.floor(Math.random() * 1000),
            title: "New Task",
            description: "This is a new task",
            status: "To Do"
       }))
        console.log("Task added to store")
        console.log(store.getState())
    }
  
  const handleDragEnd = (result: any) => {
    const { source, destination } = result

    // If the task was dropped outside of a droppable area, do nothing
    if (!destination) return

    // If the task was dropped in the same position, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return
    
    if (source.droppableId === destination.droppableId) {
      //change order of tasks in the same column
      dispatch(
        taskActions.orderTasksInColumn({
          columnId: destination.droppableId === "todo-column" ? "To Do" : destination.droppableId === "in-progress-column" ? "In Progress" : "Done",
          sourceIndex: source.index,
          destinationIndex: destination.index,
        }),
      )
    }
    // Dispatch an action to update the task's status based on the destination column
    const newStatus =
      destination.droppableId === "todo-column"
        ? "To Do"
        : destination.droppableId === "in-progress-column"
        ? "In Progress"
        : "Done"

    dispatch(taskActions.updateTasksStatus({
      taskId: parseInt(result.draggableId),
      newStatus,
      destinationIndex: destination.index
    }))
  
  }


  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mx-auto  my-5 flex items-center justify-between">
        <h2 className="mb-6 text-2xl font-bold">My Kanban Board</h2>
        <button
          onClick={handleAddTask}
          className="self-start rounded bg-primary px-3 py-1 text-sm font-medium text-white hover:bg-primary/90"
        >
          Add Task
        </button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* todo column */}
          <TaskColumn
            columnTitle="To Do"
            todoTasks={todoTasks}
            columnId="todo-column"
          />
          {/* in progress column */}
          <TaskColumn
            columnTitle="In Progress"
            todoTasks={inProgressTasks}
            columnId="in-progress-column"
          />
          {/* done column */}
          <TaskColumn
            columnTitle="Done"
            todoTasks={doneTasks}
            columnId="done-column"
          />
        </div>
      </DragDropContext>
    </div>
  )
}