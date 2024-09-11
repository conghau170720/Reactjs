import { useDispatch } from "react-redux"
import { addNewHobby } from "../actions/hobby"
import Test from "./Test";

function Index(props){
    const dispatch = useDispatch()
    const handleAddClick = () => {
        const newQty = 12;
        const action =  addNewHobby(newQty)
        dispatch(action)
    }
    return(
        <div>
            <button onClick={handleAddClick}>Add</button>
            <Test />

        </div>
        
    )
}
export default Index