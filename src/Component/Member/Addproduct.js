import axios from "axios"
import { useEffect, useState } from "react"
import Error from "./Error";
function Addproduct(){
    // tạo UseState
    const [getCategory , setCategory] = useState([])
    const [getBrand, setBrand] = useState([])
    const [showInput , setInput] = useState("")
    const [getData, setData] = useState({
        name : "",
        price :"",
        category: "",
        brand:"",
        status: 1,
        sale:0,
        company:"",
        detail: ""

    })
    const [getError, setError] = useState({})
    const listType = ["png", "jpg", "jpeg", "PNG", "JPG"]
    const [getFile , setFile] = useState([])
    const [getAvatar , setAvatar] = useState({})
    
    // 
   

    // Lấy Api
    useEffect(() => {
        axios.get("http://localhost/laravel8/laravel8/public/api/category-brand")
        .then(res => {
            setCategory(res.data.category);
            setBrand(res.data.brand)
            
            
        })
        .catch(function(error){
            console.log(error);
        })
    }, [])
    // 


    // tạo lỗi
    function handelSubmit(e){
        e.preventDefault()
        let errorSubmit = {}
        let flag = true

        if(getData.name == ""){
            errorSubmit.name = "vui lòng nhập tên"
            flag = false
        }
        if(getData.email == ""){
            errorSubmit.email = "vui lòng nhập email"
            flag = false
        }
        if(getData.category == ""){
            errorSubmit.category = "vui lòng nhập category"
            flag = false
        }
        
        if(getData.brand == ""){
            errorSubmit.brand = "vui lòng nhập brand"
            flag = false
        }
        if(getData.status == ""){
            errorSubmit.status = "vui lòng nhập trạng thái"
            flag = false
        }
        if(getData.company == ""){
            errorSubmit.company = "vui lòng nhập company"
            flag = false
        }
        if(getData.detail == ""){
            errorSubmit.detail = "vui lòng nhập detail"
            flag = false
        }
        if(getFile == ""){
            errorSubmit.file = "vui lòng chọn ảnh "
            flag = false
        }else{
            if(getFile.length > 3 ){
                errorSubmit.file = "tối đa 3 ảnh"
                flag = false
            }else{
                const file = Array.from(getFile)
                if(file.length > 0 ){
                    for(let i = 0; i < file.length; i++){
                        const nameFile = file[i].name;
                        const sizeFile = file[i].size;
                        // console.log(sizeFile);
                        const typeFile = file[i].type;
                        if(sizeFile > 1024 * 1024){
                            errorSubmit.file = "file > 1mb"
                            flag = false
                        }else{
                            const findName = nameFile.split(".")
                            const findType = typeFile.split("/");
                            if(!listType.includes(findName[1]) && !listType.includes(findType[1])){
                                errorSubmit.file = "file không đúng định dạng"
                                flag = false
                            }
                            
                        }
                    }
                }
                
                
                
            }
        }
        if(!flag){
            setError(errorSubmit)
        }else{
            let userData = localStorage.getItem("demo2")
            if(userData){
                userData = JSON.parse(userData)
                // console.log(userData.token);
                
                let config = {
                    headers: {
                        'Authorization': 'Bearer '+ userData.token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                }
                let formData = new FormData();
                formData.append('name', getData.name);
                formData.append('price', getData.price);
                formData.append('category', getData.category);
                formData.append('brand', getData.brand);
                formData.append('company', getData.company);
                formData.append('detail', getData.detail);
                formData.append('status', getData.status);
                formData.append('sale', getData.sale)

                Object.keys(getFile).map((key, index) => {
                    formData.append("file[]", getFile[key])
                })
                axios.post("http://localhost/laravel8/laravel8/public/api/user/product/add" , formData , config)
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
    }
    // phần avatar
    
    // console.log(getData);
    
    function handleFile(e){
        setFile(e.target.files)
    }
   
   
    
    // bỏ select vào category
    function renderCattegory(e){
        if(getCategory.length > 0){
            return getCategory.map((value, key) => {
                return <option key={key} value={value.id}>
                            {value.category}
                        </option>
            })
        }
    }
    // bỏ select vào brand
    function renderBrand(e){
        if(getBrand.length > 0){
            return getBrand.map((value, key) => {
                return <option key={key} value={value.id}>
                            {value.brand}
                        </option>
            })
        }
    }
    // nơi lấy value và name của All input
    function handleData(e){
        const valueInput = e.target.value;
        const nameInput = e.target.name
        setData(state => ({...state,[nameInput]:valueInput}))
    }
    // console.log(getData);
    // nơ này hide và show sale
    function renderSale(){
        if(getData.status == 0){
            return <input className="xx" name="sale" type="sale" placeholder="% sale" onChange={handleData} />
        }
    }



    
    return(
        <div className="col-sm-9">
            <div className="blog-post-area">
            <h2 className="title text-center">Create product</h2>
                <div className="signup-form">{/*sign up form*/}
                    <h2>Create product</h2>
                    <Error errors={getError}/>
                    <form onSubmit={handelSubmit} action="#">
                        <input name="name" type="name" placeholder="Name" onChange={handleData}/>
                        <input name="price" type="price" placeholder="Price" onChange={handleData}/>
                        <select name="category" onChange={handleData} >
                            <option  value="">Please  choose category</option>
                            {renderCattegory()}
                        </select>
                        <select name="brand" onChange={handleData}>
                            <option  value="">Please  choose brand</option>
                            {renderBrand()}
                        </select>
                        <select name="status" value={getData.status} onChange={handleData}  >
                            <option value="1">New</option>
                            <option value="0">Sale</option>
                        </select>
                        {renderSale()}
                        <input name="company" type="company" placeholder="Company profile" onChange={handleData}/>
                        <input name="avatar" type="file" multiple onChange={handleFile} />
                        <textarea name="detail" type="detail" placeholder="Detail" onChange={handleData}/>
                        <button type="submit" className="btn btn-default">Signup</button>
                    </form>
                </div>
            </div>
      </div>
    )
}
export default Addproduct