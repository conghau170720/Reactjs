import { useEffect, useState } from "react"
import Errors from "../Errors/Errors"
import axios from "axios"


function Account(){
    const [getInput, setInput] = useState({
        name:"",
        email:"",
        password:"",
        address:"",
        phone:"",
    })
    const [getFile, setFile] = useState({
        file:""
    })
    const [getAvatar, setAvatar] = useState("")
    const [getError, setError] = useState({})

    useEffect(()=>{
        let userData = localStorage.getItem("demo1")
        if(userData){
            userData = JSON.parse(userData)
            userData = userData.user
            // console.log(userData);
            
            setInput({
                name: userData.name,
                email: userData.email,
                address: userData.address,
                phone: userData.phone,
            })
            
        }
    },[])

    function handleFile(e){
        const file = e.target.files;

        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result)
            setFile(file[0])
        };
        reader.readAsDataURL(file[0])
    }

    function handleInput(e){
        const valueInput = e.target.value;
        const nameInput = e.target.name
        setInput(state => ({...state,[nameInput]:valueInput}))
    }
    
    function handleSubmit(e){
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        if(getInput.name == ""){
            errorSubmit.name = "vui lòng nhập tên"
            flag = false
        }
        if(getInput.address == ""){
            errorSubmit.address = "vui lòng nhập địa chỉ"
            flag = false
        }
        if(getInput.phone == ""){
            errorSubmit.phone = "vui lòng nhập Sđt"
            flag = false
        }
        if(!flag){
            setError(errorSubmit)
        }else{
            let userData = localStorage.getItem("demo1")
            if(userData){
                userData = JSON.parse(userData)
                console.log(userData);
                
                let config = { 
                    headers: { 
                    'Authorization': 'Bearer '+ userData.token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                    } 
                };	

                const formData = new FormData();
                    formData.append('name', getInput.name);
                    formData.append('email', getInput.email);
                    formData.append('password', getInput.password);
                    formData.append('address',getInput.address);
                    formData.append('phone', getInput.phone);
                    formData.append('avatar', getAvatar);

                axios.post("http://localhost/laravel8/laravel8/public/api/user/update/"+ userData.user.id, formData, config)
                .then(res =>{
                    alert("cập nhật thành công")
                    console.log(res.data.Auth);
                    const params = {
                        token : res.data.token ,
                        user : res.data.Auth
                    }
                    localStorage.setItem("demo1",JSON.stringify(params))
                })
                .catch(function(error){
                    console.log(error);
                    
                })
            }   
        }
    }
    
    function renderInput(){
        return  <form onSubmit={handleSubmit} action="#">
                    <input name="name" type="name" placeholder="Name" onChange={handleInput} value={getInput.name} />
                    <input name="email" type="email" placeholder="Email Address" onChange={handleInput} value={getInput.email} readOnly />
                    <input name="password" type="password" placeholder="Password" onChange={handleInput}  />
                    <input name="address" type="address" placeholder="Address" onChange={handleInput} value={getInput.address} />
                    <input name="phone" type="phone" placeholder="Phone" onChange={handleInput} value={getInput.phone} />
                    <input name="file" type="file" onChange={handleFile} />
                    <button type="submit" className="btn btn-default">Signup</button>
                </form>
    }
    
    


    return(
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Update user</h2>
                <div className="signup-form">{/*sign up form*/}
                    <h2>Update!</h2>
                    <Errors errors = {getError}/>
                    {renderInput()}
                </div>
            </div>
        </div>

    )
}
export default Account