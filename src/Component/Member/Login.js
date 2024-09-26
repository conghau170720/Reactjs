import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Errors from "../Errors/Errors"
import axios from "axios"

function Login(){
    const navigate = useNavigate()
    const [getData , setData] = useState({
        email:"",
        password:"",
    })  
    const [getErrors, setErrors] = useState({})
    function handleInput(e){
        const valueInput = e.target.value;
        const valueName = e.target.name;
        setData(state=> ({...state,[valueName]:valueInput}))
    }

    function handelSubmit(e){
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        if(getData.email == ""){
            errorSubmit.email = "vui lòng nhập email"
            flag = false
        }else{
            let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if(!regex.test(getData.email)){
                errorSubmit.email = "email không đúng"
                flag = false
            }
        }
        if(getData.password == ""){
            errorSubmit.password = "vui lòng nhập password"
            flag = false
        }
        if(!flag){
            setErrors(errorSubmit)
        }else{
            const data = {
                email : getData.email,
                password : getData.password,
                level : 0
            }
            axios.post("http://localhost/laravel8/laravel8/public/api/login", data)
            .then(response => {
                if (response.data.errors) {
                    setErrors(response.data.errors)
                }else{
                    const params = {
                        token : response.data.token,
                        user : response.data.Auth
                    }
                    localStorage.setItem("demo1", JSON.stringify(params))
                    const check = true
                    localStorage.setItem("demo2", JSON.stringify(check))
                    console.log(response);
                    navigate('/')
                }
            })
            .catch(function(error){
                console.log(error);
                
            })
        }


    }
    

    return(
        <div className="pp">
                    <div display="flex"  className="col-sm-4 col-sm-offset-1">
                        <div className="login-form" >{/*login form*/}
                            <h2>Login to your account</h2>
                            <Errors errors = {getErrors}/>
                            <form onSubmit={handelSubmit} action="#">
                                <input name="email" type="email" placeholder="Email Address" onChange={handleInput}/>
                                <input name="password" type="password" placeholder="Password"  onChange={handleInput} />
                                <span>
                                    <input name="checkbox" type="checkbox" className="checkbox"/> 
                                    Keep me signed in
                                </span>
                                <div className="zz">   
                                    <button type="submit" className="btn btn-default">Login</button>
                                    <button type="button" className="btn btn-default"><Link to="http://localhost:3000/signup">Signup</Link></button>
                                </div>
                            </form>
                        </div>{/*/login form*/}
                    </div>
        </div>
    )
}
export default Login