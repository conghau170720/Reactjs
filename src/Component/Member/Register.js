import { useInsertionEffect, useState} from "react";
import axios from "axios"
import Error from "./Error";




function Register() {
  const [getData, setData] = useState({
    name:"",
    email:"",
    password:"",
    phone:"",
    address:"",
    file:""
  
  })
  const [getError, setError] = useState({})
  const [getFile, setFile] = useState({
    file:""
  })
  const [getAvatar, setAvatar] = useState("")
  

  const listType = ["png", "jpg", "jpeg", "PNG", "JPG"]

  const handleInput = (e) => {
    const nameData = (e.target.name);
    const valueData = (e.target.value);
    setData(state => ({...state,[nameData]:valueData}))
  }

  
  function handleFile(e){
      const nameFile = e.target.name
      const file = e.target.files;
      let reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result)
        setFile(file[0])
      };
      reader.readAsDataURL(file[0])
      setData(state => ({...state,[nameFile]:file}))
  }
  // console.log(getAvatar);
  

  function handleForm(e){
    e.preventDefault();
    let errorSubmit = {}
    let flag = true

    if(getData.name == ""){
      errorSubmit.name = "vui lòng nhập tên"
      flag = false
    }
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
    if(getData.phone == ""){
      errorSubmit.phone = "vui lòng nhập Sđt"
      flag = false
    }
    if(getData.address == ""){
      errorSubmit.address = "vui lòng nhập địa chỉ"
      flag = false
    }
    if(getFile.file == ""){
      errorSubmit.files = "vui lòng thêm ảnh"
      flag = false
    }else{
       const getName = getFile["name"];
       const getType = getFile["type"];
       const getSize = getFile["size"]
       if(getSize > 1024 * 1024){
        errorSubmit.file = "file lớn hơn 1mb"
        flag = false
       }else{
          let findName = getName.split(".");
          let findType = getType.split("/");
          if(!listType.includes(findName[1]) && !listType.includes(findType[1])){
            errorSubmit.file = "file không đúng định dạng "
            flag = false
          }
       }
    }
    
    if(!flag){
      setError(errorSubmit)
    }else{
      
      const data = {
        name : getData.name,
        email : getData.email,
        password : getData.password,
        phone : getData.phone,
        address : getData.address,
        avatar : getAvatar,
        level : 0
      }
      axios.post("http://localhost/laravel8/laravel8/public/api/register", data)
      .then(response => {
        if(response.data.errors){
          setError(response.data.errors);
        }else{
          console.log(response);
          alert("thành công")
          
        }
      })
    }

  }
  
  
 

  return (
    <div>
              <h2>New User Signup!</h2>
              <Error errors={getError}/>
              <form onSubmit={handleForm} enctype="multipart/form-data" >
                <p>Điền tên</p>
                <input type="text" name="name" onChange={handleInput}/>
                <p className="error" >Điền Gmail</p>
                <input type="email" name="email" onChange={handleInput} />
                <p className="error">Điền mật khẩu</p>
                <input type="password" name="password" onChange={handleInput} />
                <p className="error">Điền Sđt</p>
                <input type="phone" name="phone" onChange={handleInput} />
                <p className="error">Điền Địa chỉ</p>
                <input type="address" name="address" onChange={handleInput} />
                <p className="error">Nhập ảnh</p>
                <input type="file" name="avatar" onChange={handleFile} />   
                <button type="submit" className="btn btn-default">Click</button>
              </form>
      </div>
  );
}

export default Register;
