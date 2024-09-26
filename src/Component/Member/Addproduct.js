import axios from "axios";
import { useEffect, useState } from "react";
import Errors from "../Errors/Errors"

function AddProduct(){

    const [getBuy , setBuy] = useState({
        name:"",
        price:"",
        category:"",
        brand:"",
        status: 1,
        sale: 0,
        company:"",
        detail:"",
        image:""
    })
    const [getCategory , setCategory] = useState([])
    const [getBrand, setBrand] = useState([])
    const [getError, setError] = useState({})
    const [getFile, setFile] = useState([])
    const listType = ["png", "jpg", "jpeg", "PNG", "JPG"]

    useEffect(()=>{
        axios.get("http://localhost/laravel8/laravel8/public/api/category-brand")
        .then(res=>{
            setCategory(res.data.category);
            setBrand(res.data.brand)
        })
        .catch(function(error){
            console.log(error);
            
        })
    },[])
    
    
    function renderCategory(e){
        if(getCategory.length > 0){
            return getCategory.map((value, key)=>{
                return <option value={value.id} key={key}>{value.category}</option>
            })
        }
    }

    function renderBrand(){
        if(getBrand.length > 0){
            return getBrand.map((value, key)=>{
                return <option  value={value.id} key={key}>{value.brand}</option>
            })
        }
    }

    function renderSale(){
        if(getBuy.status == 0){
            return  <div className="vv">
                        <input className="xx" name="sale" type="sale" placeholder="% Sale" onChange={handleInput} />
                        <p>%</p> 
                    </div>
        }
       
    }

    function handleInput(e){
        const valueInput = e.target.value;
        const nameInput = e.target.name;
        setBuy(state=>({...state,[nameInput]:valueInput}))
    }
    
    function handleFile(e){
       setFile(e.target.files);
    }
    
    function handleSubmit(e){
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        if(getBuy.name == ""){
            errorSubmit.name = "vui lòng nhập tên"
            flag = false;
        }
        if(getBuy.price == ""){
            errorSubmit.price = "vui lòng nhập giá"
            flag = false;
        }
        if(getBuy.category == ""){
            errorSubmit.category = "vui lòng chọn loại"
            flag = false;
        }
        if(getBuy.brand == ""){
            errorSubmit.brand = "vui lòng nhập chọn hiệu"
            flag = false;
        }
        if(getBuy.name == ""){
            errorSubmit.name = "vui lòng nhập tên"
            flag = false;
        }
        if(getBuy.company == ""){
            errorSubmit.company = "vui lòng nhập tên công ty"
            flag = false;
        }
        if(getBuy.detail == ""){
            errorSubmit.detail = "vui lòng nhập nội dung"
            flag = false;
        }
        if(getFile == ""){
            errorSubmit.file = "vui lòng chọn ảnh"
            flag = false
        }else{
            if(getFile.length > 3){
                errorSubmit.file = "up tối đa 3 ảnh"
                flag = false
            }else{
                const file = Array.from(getFile)
                if(file.length > 0){
                    file.map((value, key)=>{
                        const sizeFile = value.size;
                        const nameFile = value.name;
                        const typeFile = value.type;
                        if(sizeFile > 1024 * 1024){
                            errorSubmit.file = "có ảnh lớn hơn 1mb"
                            flag = false
                        }else{
                            const findName = nameFile.split(".");
                            const findType = typeFile.split("/")
                            if(!listType.includes(findName[1]) && !listType.includes(findType[1])){
                                errorSubmit.file = "file không đúng định dạng"
                                flag =false
                            }
                        }
                    })
                }
            }
        }
        if(!flag){
            setError(errorSubmit)
        }else{
            let userData = localStorage.getItem("demo1")
            if(userData){
                userData = JSON.parse(userData)
                let config = {
                    headers: {
                        'Authorization': 'Bearer '+ userData.token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                }
                let formData = new FormData();
                    formData.append('name', getBuy.name);
                    formData.append('price', getBuy.price);
                    formData.append('category', getBuy.category);
                    formData.append('brand', getBuy.brand);
                    formData.append('status', getBuy.status);
                    formData.append('sale', getBuy.sale);
                    formData.append('company', getBuy.company);
                    formData.append('detail', getBuy.detail)
                    Object.keys(getFile).map((key, index)=>{
                        formData.append('file[]',getFile[key])
                    });
                    axios.post("http://localhost/laravel8/laravel8/public/api/user/product/add", formData , config)
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
    console.log(getBuy);
    
    return(
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Add product</h2>
                <div className="signup-form">{/*sign up form*/}
                    <h2>Create product!</h2>
                    <Errors errors={getError} />
                    <form onSubmit={handleSubmit} encType="multipart/form-data"  action="#">
                        <input name="name" type="name" placeholder="Name" onChange={handleInput} />
                        <input name="price" type="price" placeholder="price" onChange={handleInput} />
                        <select name="category" onChange={handleInput} >
                            <option>Please choose category</option>
                            {renderCategory()}
                        </select>
                        <select name="brand" onChange={handleInput} >
                        <option>Please choose brand</option>
                            {renderBrand()}
                        </select>
                        <select name="status" onChange={handleInput}>
                            <option value={1}>New</option>
                            <option value={0}>Sale</option>
                        </select>
                        {renderSale()}
                        <input name="company" type="company" placeholder="Company profile" onChange={handleInput} />
                        <input name="file" type="file" onChange={handleFile} multiple />
                        <textarea name="detail" placeholder="detail" onChange={handleInput} />
                        <button type="submit" className="btn btn-default">Signup</button>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default AddProduct