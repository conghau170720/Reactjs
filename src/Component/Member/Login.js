import { useState } from "react"
import Error from "./Error";
import axios from "axios";
import { json, useNavigate } from "react-router-dom";

function Login(){
    const navigate = useNavigate();
    const [getData, setData] = useState({
        email:"",
        password:"",
    })
    const [getError, setError] = useState({})

    const handleInput = (e) => {
        const getName = e.target.name;
        const getValue = e.target.value;
        setData(state => ({...state,[getName]:getValue}))
    }
    
    function hadleSubmit(e){
        e.preventDefault();
        let errorSubmit = {}
        let flag = true
        if(getData.email == ""){
            errorSubmit.email = "vui lòng nhập email"
            flag = false
        }else{
            let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if(!regex.test(getData.email)){
                errorSubmit.email = " email k dung dinh dang"
                flag = false
            }
        }
        if(getData.password == ""){
            errorSubmit.password = "vui lòng nhập password"
            flag = false
        }
        if(!flag){
            setError(errorSubmit)
        }else{
            const data ={
                email : getData.email,
                password : getData.password,
                level : 0
            }
            axios.post("http://localhost/laravel8/laravel8/public/api/login", data)
            .then(response => {
                if(response.data.errors){
                  setError(response.data.errors);
                }else{
                    console.log(response);
                    const params ={
                        token : response.data.token,
                        user : response.data.Auth
                       
                    }
                    let fromUse = JSON.stringify(params)
                    localStorage.setItem("demo2", fromUse)
                    navigate("/")

                    
                }
            })
            let xx = true
            let check = JSON.stringify(xx)
            localStorage.setItem("demo1", check)
        }
    }
   
    return(
                    <div className="col-sm-4 col-sm-offset-1">
                        <div className="login-form">{/*login form*/}
                            <h2>Login to your account</h2>
                            <Error errors = {getError}/>
                            <form action="#" onSubmit={hadleSubmit}>
                                <input type="email" placeholder="email"  name="email" onChange={handleInput}/>
                                <input type="password" placeholder="password" name="password" onChange={handleInput}/>
                                <span>
                                <input type="checkbox" className="checkbox" /> 
                                 Keep me signed in
                                </span>
                                <button type="submit" className="btn btn-default">Login</button>
                            </form>
                        </div>
                    </div>
        )
}
export default Login