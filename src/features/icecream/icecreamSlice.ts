import { createSlice } from "@reduxjs/toolkit"

export type IceCreamSliceState = {
  numOfIceCream: number
}
const initialState: IceCreamSliceState = {
  numOfIceCream: 20,
}
export const icecreamSlice = createSlice({
  name: "icecream",
  initialState: initialState,
  reducers: {
    ordered: state => {
      state.numOfIceCream -= 1
    },
    restored: (state, action) => {
      state.numOfIceCream += action.payload
    },
  },
})

export const iceCreamActions = icecreamSlice.actions
export default icecreamSlice.reducer
