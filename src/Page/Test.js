import { useSelector } from "react-redux"

function Test(props){
    const hobbylist = useSelector(state => state.hobby.list)
    console.log(hobbylist);
    return (
        <p>téh</p>
    )
}
export default Test