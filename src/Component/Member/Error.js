function Error(props){
    // console.log(props);
    function renderErrror(){
        let{errors} = props

            if(Object.keys(errors).length > 0){
                return Object.keys(errors).map((key,index) => {
                    return (
                        <li key={index}>    
                            {errors[key]}
                        </li>
                    )
    
                })
            }
    }
    return(
        <ul>
            {renderErrror()}
        </ul>
    )
}   
export default Error