const initialState = {
    list: 10
}
const hobbyReducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_Qty":{
                console.log(action.payload)
                return{
                    list:action.payload
                }
        }
        default:
            return state;
    }
}

export default hobbyReducer;