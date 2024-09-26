import { useState } from "react"
import Errors from "../Errors/Errors";
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Signup(){
    const navigate = useNavigate();
    const [getUser , setUser] = useState({
        name:"",
        email:"",
        password:"",
        phone:"",
        address:"",
        file:""
    })
    const [getErrors , setErrors] = useState({})
    const [getFile, setFile] = useState({
        file:""
      })
    const [getAvatar , setAvatar] = useState("")
    const listType = ["png", "jpg", "jpeg", "PNG", "JPG"]
    
    function handelValue(e){
        const valueUser = e.target.value;
        const nameUser = e.target.name;
        setUser(state => ({...state,[nameUser]:valueUser}))
    }
    function handleFile(e){
        const file = e.target.files;
        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result)
            setFile(file[0])
        };
        reader.readAsDataURL(file[0])
    }

    
    
    function handelSubmit(e){
        e.preventDefault()
        let errorSubmit = {}
        let flag = true
        if(getUser.name == ""){
            errorSubmit.name = "vui lòng nhập tên"
            flag = false
        }
        if(getUser.email == ""){
            errorSubmit.email = "vui lòng nhập email"
            flag = false
        }else{
            let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if(!regex.test(getUser.email)){
                errorSubmit.email = "email không đúng"
                flag = false
            }
        }
        if(getUser.password == ""){
            errorSubmit.password = "vui lòng nhập password"
            flag = false
        }
        if(getUser.phone == ""){
            errorSubmit.phone = "vui lòng nhập Sđt"
            flag = false
        }
        if(getUser.address == ""){
            errorSubmit.address = "vui lòng nhập địa chỉ"
            flag = false
        }
        if(getFile.file == ""){
            errorSubmit.files = "vui lòng nhập avatar"
            flag = false
        }else{
            const nameFile = getFile.name
            const sizeFile = getFile.size
            const typeFile = getFile.type
            if(sizeFile > 1024 * 1024){
                errorSubmit.files = "file lớn hơn 1mb"
                flag = false
            }else{
                const findName = nameFile.split(".")
                const findType = typeFile.split("/")
                if(!listType.includes(findName[1]) && !listType.includes(findType[1])){
                    errorSubmit.files = "file không đúng định dạng"
                    flag = false
                }
            }
        }
        if(!flag){
            setErrors(errorSubmit)
        }else{
            const data = {
                name : getUser.name,
                email : getUser.email,
                password : getUser.password,
                phone : getUser.phone,
                address : getUser.address,
                avatar : getAvatar,
                level : 0
            }
            axios.post("http://localhost/laravel8/laravel8/public/api/register", data)
            .then(response => {
                if (response.data.errors) {
                    setErrors(response.data.errors)
                }else{
                    alert("bạn đã đăng ký thành công")
                    // console.log(response);
                    navigate('/login')
                }
            })
            
        }
    }
    

  


    return(
        <div className="pp">
            <div className="col-sm-4">
                <div className="signup-form">{/*sign up form*/}
                    <h2>New User Signup!</h2>
                    <Errors errors={getErrors} />
                    <form encType="multipart/form-data" onSubmit={handelSubmit} action="#">
                        <input type="name" name="name" placeholder="Name" onChange={handelValue} />
                        <input type="email" name="email" placeholder="Email Address" onChange={handelValue} />
                        <input type="password" name="password" placeholder="Password" onChange={handelValue} />
                        <input type="phone" name="phone" placeholder="Phone" onChange={handelValue} />
                        <input type="address" name="address" placeholder="Address" onChange={handelValue} />
                        <input type="file" name="file" onChange={handleFile} />
                        <button type="submit" className="btn btn-default">Signup</button>
                    </form>
                </div>{/*/sign up form*/}
            </div>
        </div>
    )
}
export default Signup