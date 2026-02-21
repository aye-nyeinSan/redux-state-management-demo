import { useSelector } from "react-redux"
import type { RootState } from "../../app/store"

export default function CakeView() {
    const numOfCakes = useSelector((state: RootState) => state.cake.numOfCakes)
    return (
        <div>
            <h2>Number of cakes: {numOfCakes}</h2>
            <button>Order cake</button>
            <button>Restore cake</button>
        </div>
    )
}