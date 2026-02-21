import { createSlice } from "@reduxjs/toolkit";

export type CakeSliceState = {

    numOfCakes: number
}
const initialState: CakeSliceState = {
    numOfCakes: 10
}
export const cakeSlice = createSlice({
    name: 'cake',
    initialState: initialState,
    reducers: {
        ordered: state => {
            state.numOfCakes -= 1
        },
        restored: (state, action) => {
            state.numOfCakes += action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase("icecream/ordered", state => {
            state.numOfCakes -= 1
        })
    }
})

export  const  cakeActions = cakeSlice.actions
export default cakeSlice.reducer