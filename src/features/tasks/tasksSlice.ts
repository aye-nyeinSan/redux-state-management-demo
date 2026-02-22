import { createSlice, current } from '@reduxjs/toolkit';
import demo from '../../data/tasksdemo.json'


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
    name: 'tasks',
    initialState: tasksInitialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        orderTasksInColumn: (state, action) => {
            const { columnId, sourceIndex, destinationIndex } = action.payload
            const columnTasks = state.tasks.filter(t => t.status === columnId)

            if(columnTasks.length === 0) return
            const [removed] = columnTasks.splice(sourceIndex, 1)
            columnTasks.splice(destinationIndex, 0, removed)

            const otherTasks = state.tasks.filter(t => t.status !== columnId) 

            state.tasks = [...otherTasks, ...columnTasks]
        },
        updateTasksStatus: (state, action) => {
            const { taskId, newStatus} = action.payload
            const statusofTask = state.tasks.map(task => {
                console.log("Checking task:", current(task))
                if (task.id === taskId) { 
                    return {...task, status: newStatus,}
                }
                return task
            })

            state.tasks = statusofTask
        }
    }
})

export const taskActions = taskSlice.actions
export default taskSlice.reducer