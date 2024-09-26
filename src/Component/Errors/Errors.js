function Errors(props){
    let {errors} = props
    function renderErrors(e){
        if(Object.keys(errors).length > 0 ){
            return Object.keys(errors).map((key, index)=> {
                return <li className="mm" key={index}>
                            {errors[key]}
                        </li>
            })
        }
    }
    return(
        <ul>{renderErrors()}</ul>
    )
}
export default Errors 