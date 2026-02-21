import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import type { RootState } from "../../app/store"
import { iceCreamActions } from "./icecreamSlice"

export default function IceCreamView() {
    const numOfIceCream = useSelector((state: RootState) => state.icecream.numOfIceCream)
    const [numOfIceCreamToRestore, setNumOfIceCreamToRestore] = useState(0);
    const dispatch = useDispatch()
  return (
    <div>
      <h2>Number of IceCream: {numOfIceCream} </h2>
      <button onClick={() => dispatch(iceCreamActions.ordered())}>
        Order IceCream
          </button>
          <input type="number" value={numOfIceCreamToRestore} onChange={(e)=>setNumOfIceCreamToRestore(parseInt(e.target.value))} placeholder="Enter number of IceCream" id="numOfIceCream" />
    
      <button onClick={() => dispatch(iceCreamActions.restored(numOfIceCreamToRestore))}>
        Restore IceCream
      </button>
    </div>
  )
}
