import axios from "axios";
import { useEffect, useState } from "react";
import Errors from "../Errors/Errors"
import { useParams } from "react-router-dom";

function EditProduct(){

     // tạo UseState
     const [getCategory , setCategory] = useState([])
     const [getBrand, setBrand] = useState([])
     const [getData, setData] = useState({
         name : "",
         price :"",
         category: "",
         brand:"",
         status: 1,
         sale:0,
         company:"",
         detail: "",
         image:""

     })
     const [getError, setError] = useState({})
     const listType = ["png", "jpg", "jpeg", "PNG", "JPG"]
     const [getFile , setFile] = useState([])
     const [avatarCheckbox , setAvatarCheckbox] = useState([])
     let params = useParams();

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
    
     useEffect(() => {
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
                 }
                 axios.get("http://localhost/laravel8/laravel8/public/api/user/product/" + params.id , config)
                 .then(res => {
                     setData(res.data.data);
                         
                 })
                 .catch(function(error){
                     console.log(error);
                         
                 })  
             }    
     },[])
 
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
    function renderSale(){
         if(getData.status == 0){
            return <div className="vv">
                        <input className="xx" name="sale" type="sale" placeholder="% Sale" onChange={handleData} value={getData.sale}/>
                        <p>%</p> 
                    </div>
         }
         
     }
      
    function handleData(e){
         const valueInput = e.target.value;
         const nameInput = e.target.name
         setData(state => ({...state,[nameInput]:valueInput}))
     }
    
    function handleFile(e){
         setFile(e.target.files)
     }
     function renderImage(){
         if(getData.image != "" ){
             let imageCheckbox = getData.image
                return imageCheckbox.map((value, key)=> {
                     return  (
                         <div className="yy">
                             <img  width="100px" height="100px" src={"http://localhost/laravel8/laravel8/public/upload/product/"+ getData.id_user + "/" + value} alt="" />
                             <input className="fontCheckbox" type="checkbox" name="checkbox" value={value} onClick={handelCheckbox} />
                         </div>
                     )
                 })  
         }
     }
    
     function handelCheckbox(e){
         let valueCheckbox = e.target.value;
         const checked = e.target.checked;
         if(checked == true){
             setAvatarCheckbox(state => [...state,valueCheckbox])
         }else{
             setAvatarCheckbox(state => state.filter(item => item !== valueCheckbox))
         }
     }

     function renderEdit(){
         return(
             <form onSubmit={handelSubmit} action="#">
                             <input name="name" type="name" placeholder="Name" value={getData.name} onChange={handleData}/>
                             <input name="price" type="price" placeholder="Price" value={getData.price} onChange={handleData}/>
                             <select name="category" value={getData.id_category} onChange={handleData} >
                                 <option  value="">Please  choose category</option>
                                 {renderCattegory()}
                             </select>
                             <select name="brand" value={getData.id_brand}  onChange={handleData}>
                                 <option  value="">Please  choose brand</option>
                                 {renderBrand()}
                             </select>
                             <select name="status" value={getData.status} onChange={handleData}  >  
                                 <option value="1">New</option>
                                 <option value="0">Sale</option>
                             </select>
                             {renderSale()}
                             <input name="company" type="company" placeholder="Company profile" value={getData.company_profile} onChange={handleData}/>
                             <input name="avatar" type="file" multiple onChange={handleFile} />
                             {renderImage()}
                             <textarea name="detail" type="detail" placeholder="Detail" value={getData.detail} onChange={handleData}/>
                             <button type="submit" className="btn btn-default">Signup</button>
                         </form>
         )
     }
     
     function handelSubmit(e){
         e.preventDefault()
         let errorSubmit = {}
         let flag = true

         if(getData.name == ""){
             errorSubmit.name = "vui lòng nhập tên"
             flag = false
         }
         if(getData.price == ""){
             errorSubmit.price = "vui lòng nhập giá"
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
             if(getFile.length + getData.image.length > 3 ){
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
             let userData = localStorage.getItem("demo1")
             if(userData){
                 userData = JSON.parse(userData)
                 console.log(userData.token);
                 
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
                 formData.append('category', getData.id_category);
                 formData.append('brand', getData.id_brand);
                 formData.append('company', getData.company_profile);
                 formData.append('detail', getData.detail);
                 formData.append('status', getData.status);
                 formData.append('sale', getData.sale)
                 
                 Object.keys(getFile).map((key, index) => {
                     formData.append("file[]", getFile[key])
                 })
                 avatarCheckbox.map((value, key)=> {
                     formData.append("avatarCheckBox[]", value)
                 })
                 let idProduct = getData.id
                 axios.post("http://localhost/laravel8/laravel8/public/api/user/product/update/" + idProduct , formData , config)
                 .then(response => {
                     if(response.data.errors){
                         setError(response.data.errors);
                     }else{
                         console.log(response);
                         alert("thành công") 
                     }
                 })
                 for (let pair of formData.entries()) {
                    console.log(pair[0] + ": " + pair[1]);
                }
             }
         }
     }
     
     return(
         <div className="col-sm-9">
             <div className="blog-post-area">
                 <h2 className="title text-center">Edit product</h2>
                 <div className="signup-form">{/*sign up form*/}
                     <h2>Edit!</h2>
                     <Errors errors = {getError} />
                     {renderEdit()}
                 </div>
             </div>
         </div>
     )
 }
export default EditProduct