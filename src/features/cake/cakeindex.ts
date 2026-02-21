import  { store } from "../../app/store"
import { cakeActions } from "./cakeSlice"
import { iceCreamActions } from "../icecream/icecreamSlice"

const unsubscribe = store.subscribe(() => console.log(store.getState().cake, store.getState().icecream))

store.dispatch(cakeActions.ordered())
store.dispatch(cakeActions.ordered())
store.dispatch(cakeActions.restored(5))

store.dispatch(iceCreamActions.ordered())
store.dispatch(iceCreamActions.ordered())
store.dispatch(iceCreamActions.restored(10))

unsubscribe()
