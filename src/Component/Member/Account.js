import axios from "axios"
import { useEffect, useState } from "react"
import Error from "./Error";

function Account(){
    const [getFile , setFile] = useState({
        file : ""
    })
    const [getAvatar , setAvatar] = useState("")
    const [getErrors, setErrors] = useState({})
    const [getUser, setUser] = useState ({
        name : "",
        email : "",
        password : "",
        address : "",
        phone : "",
        file : ""
    });

    const listType = ["png", "jpg", "jpeg", "PNG", "JPG"]
    useEffect(() => {
        let userData = localStorage.getItem("demo2")
        if(userData){
            userData = JSON.parse(userData) 
            userData = userData.user 
            setUser({
                name : userData.name,
                email : userData.email,
                phone : userData.phone,
                address : userData.address,
                avatar : userData.avatar,
                iduser : userData.id,
                avatar : userData.avatar
            })
        }
    }, [])
    
    const handleInput = (e) => {
        const nameData = e.target.name
        const valueData =  e.target.value
        setUser(state => ({...state,[nameData]:valueData}))
    }

    function handleFile(e){
        const file = e.target.files;
        const nameFile = e.target.name;
        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result)
            setFile(file[0])
        }
        reader.readAsDataURL(file[0])
        setUser(state => ({...state,[nameFile]:file}))

    }
    
    
    function handleSubmit(e){
        e.preventDefault()
        let errorSubmit = {}
        let flag = true
        if(getUser.name == ""){
            errorSubmit.name = "vui lòng nhập tên"
            flag = false
        }
        if(getUser.phone == ""){
            errorSubmit.phone = "vui lòng nhập Sđt"
            flag = false
        }
        if(getUser.address == ""){
            errorSubmit.address = "vui lòng nhập Địa chỉ"
            flag = false
        }
        if(getFile.file == ""){
            errorSubmit.file = "vui lòng thêm ảnh"
            flag = false
          }else{
             const getName = getFile["name"];
             const getType = getFile["type"];
             const getSize = getFile["size"]
             if(getSize > 1024 * 1024){
                errorSubmit.file = "file lớn hơn 1mb"
             }else{
                let findName = getName.split(".");
                let findType = getType.split("/");
                if(!listType.includes(findName[1]) && !listType.includes(findType[1])){
                  errorSubmit.file = "file không đúng định dạng "
                }
             }
          }
        if(!flag){
            setErrors(errorSubmit)
        }else{
            let userData = localStorage.getItem("demo2")
            if(userData){
                userData = JSON.parse(userData)
                console.log(userData);
                
                let config = {
                    headers: {
                        'Authorization': 'Bearer '+ userData.token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                }
                const data = {
                    name : getUser.name,
                    email : getUser.email,
                    password : (getUser.password ? getUser.password : 0),
                    phone : getUser.phone,
                    address : getUser.address,
                    avatar : getAvatar
                }
                
                axios.post("http://localhost/laravel8/laravel8/public/api/user/update/" + userData.user.id, data, config)
                .then(response => {
                    console.log(response);
                    alert("thành công")
                    const params = {
                        token : response.data.token,
                        user : response.data.Auth
                    }
                    // console.log(params);
                    
                    let userData = JSON.stringify(params)
                    localStorage.setItem("demo2", userData)
                })
                .catch(function (error){
                    console.log(error); 
                })
                }
        }
    }
    
    function renderData(){
            return(
                
                <form onSubmit={handleSubmit} action="#">
                    <input name="name" type="name" placeholder="Name"  value={getUser.name} onChange={handleInput}/>
                    <input readOnly name="email" type="email" placeholder="Email" value={getUser.email} onChange={handleInput} />
                    <input name="password" type="password" placeholder="Password" value={getUser.password} onChange={handleInput} />
                    <input name="address" type="address" placeholder="Address" value={getUser.address} onChange={handleInput} />
                    <input name="phone" type="phone" placeholder="Phone" value={getUser.phone} onChange={handleInput} />
                    <input name="avatar" type="file" onChange={handleFile} />
                    <img width="100px" height="100px" src={"http://localhost/laravel8/laravel8/public/upload/user/avatar/" + getUser.avatar} alt="" />
                    <button type="submit" className="btn btn-default">Signup</button>
                </form>
            )
    }
    
    return (
    <>
        
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Update user</h2>
                <div className="signup-form">{/*sign up form*/}
                    <h2>Update User!</h2>
                    <Error errors = {getErrors} />
                    {renderData()}
                </div>
            </div>
      </div>
    </>
    )
   

}
export default Account