import { createSlice } from '@reduxjs/toolkit';
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
        updateTaskStatus: (state, action) => {
            const { id, status } = action.payload
            const task = state.tasks.find(task => task.id === id)
            if (task) {
                task.status = status
            }
            else {
                console.warn(`Task with id ${id} not found`)
                return 
            }
        }
    }
})

export const taskActions = taskSlice.actions
export default taskSlice.reducer