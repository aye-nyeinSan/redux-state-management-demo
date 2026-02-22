import { createSlice, current } from "@reduxjs/toolkit"
import demo from "../../data/tasksdemo.json"

export type Task = {
  id: number
  title: string
  description?: string
  status: "To Do" | "In Progress" | "Done"
}

export type TaskSliceState = {
  tasks: Task[]
}

const tasksInitialState: TaskSliceState = {
  tasks: demo as Task[],
}
export const taskSlice = createSlice({
  name: "tasks",
  initialState: tasksInitialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    },
    orderTasksInColumn: (state, action) => {
      const { columnId, sourceIndex, destinationIndex } = action.payload
      const columnTasks = state.tasks.filter(t => t.status === columnId)

      if (columnTasks.length === 0) return
      const [removed] = columnTasks.splice(sourceIndex, 1)
      columnTasks.splice(destinationIndex, 0, removed)

      const otherTasks = state.tasks.filter(t => t.status !== columnId)

      state.tasks = [...otherTasks, ...columnTasks]
    },
    updateTasksStatus: (state, action) => {
      const { taskId, newStatus, destinationIndex } =
        action.payload
      
      const taskToUpdate = state.tasks.find(task => task.id === taskId)
      if (!taskToUpdate) return

      const remainingTasks = state.tasks.filter(t => t.id !== taskId)
      const tasksInDestinationColumn = remainingTasks.filter(
        t => t.status === newStatus,
      )
      //cut the tasks in the destination column at the destination index and insert the updated task in that position
      const updatedTask = { ...taskToUpdate, status: newStatus }
      tasksInDestinationColumn.splice(destinationIndex, 0, updatedTask)
      state.tasks = [
        ...remainingTasks.filter(t => t.status !== newStatus),
        ...tasksInDestinationColumn,
      ]
      },
    updateTaskTitleAndDescription: (state, action) => {
        const { taskId, newTitle, newDescription , columnId } = action.payload
        const currentState = current(state)
        console.log("Current state in reducer:", currentState)

        const columnTasks = state.tasks.filter(t => t.status === columnId)
        const taskToUpdate = columnTasks.find(task => {
            return task.id === taskId
        })
      
      if (!taskToUpdate) return
        taskToUpdate.title = newTitle
        taskToUpdate.description = newDescription
    }
  },
})

export const taskActions = taskSlice.actions
export default taskSlice.reducer
