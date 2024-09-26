import React from "react";
import { useSelector } from "react-redux";
function Test(props){
    const hobbyList = useSelector(state => state.hobby.list)
    console.log(hobbyList);
    
}
export default Test