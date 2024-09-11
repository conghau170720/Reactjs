import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Myproduct(){
    

    const [getData, setData] = useState({})

    let userData = localStorage.getItem("demo2")
    if(userData){
        userData = JSON.parse(userData)
        // console.log(userData);   
    }
    
    let config = {
        headers: {
            'Authorization': 'Bearer '+ userData.token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }
    
    useEffect(() => {
        axios.get("http://localhost/laravel8/laravel8/public/api/user/my-product" , config)
        .then(res => {
            setData(res.data.data);
            
        })
        .catch(function(error){
            console.log(error);
            
        })
    },[])
    
    
    function renderTable(){
        if(Object.keys(getData).length > 0){
            return Object.keys(getData).map((key, index) => {

                let image = JSON.parse(getData[key].image)
                
                function renderDelete(){
                    const idProduct = getData[key].id;
                    axios.get("http://localhost/laravel8/laravel8/public/api/user/product/delete/" + idProduct, config )
                    .then(res =>{
                        setData(res.data.data);
                        
                    })
                    .catch(function(error){
                        console.log(error);
                        
                    })
                }
                
                
                // console.log(getData[key].id_user);
                
                return <tr>
                           <td className="cart_product">
                                <a href><img width="50px" src={"http://localhost/laravel8/laravel8/public/upload/product/" + getData[key].id_user +"/" + image[0]} alt="" /></a>
                            </td>
                            <td className="cart_description">
                                <h4><a href>{getData[key].name}</a></h4>
                            </td>
                            <td className="cart_price">
                                <p>${getData[key].price}</p>
                            </td>
                            <td className="cart_total">
                                <Link  to={"http://localhost:3000/editproduct/" + getData[key].id}>edit</Link>
                                <a onClick={renderDelete}>delete</a>
                            </td>
                        </tr>
            })
        }
    }

  
   
    
    return(
        <div className="col-sm-9">
            <div className="table-responsive cart_info">
                <table className="table table-condensed">
                    <thead>
                        <tr className="cart_menu">
                            <td className="image">image</td>
                            <td className="description">name</td>
                            <td className="price">price</td>
                            <td className="total">action</td>
                        </tr>
                    </thead>
                <tbody>
                    {renderTable()}
                </tbody>
            </table>
        </div>
      </div>
    )
}
export default Myproduct