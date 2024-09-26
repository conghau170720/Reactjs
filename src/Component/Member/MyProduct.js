import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios  from "axios"
function MyProduct(){
    
    const [getBuy, setBuy] = useState({})

    useEffect(()=>{
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
            axios.get("http://localhost/laravel8/laravel8/public/api/user/my-product", config)
            .then(res=>{
                setBuy(res.data.data);
            })
            .catch(function(error){
                console.log(error);
            })
        }
    },[])

    function renderTable(){
        if(Object.keys(getBuy).length > 0){
            return Object.keys(getBuy).map((key, index)=>{

                function handelDelete(){
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
                        axios.get("http://localhost/laravel8/laravel8/public/api/user/product/delete/" + getBuy[key].id, config)
                        .then(res=>{
                            setBuy(res.data.data);
                        })
                        .catch(function(error){
                            console.log(error);
                        })
                    }
                }
                
                let image = JSON.parse(getBuy[key].image)
                return  <tr>
                            <td className="cart_product">
                                <a href><img margin="0px 0px 1px 1px;" width="80px" height="80px" src={"http://localhost/laravel8/laravel8/public/upload/product/" + getBuy[key].id_user + "/" + image[0]} alt="" /></a>
                            </td>
                            <td className="cart_description">
                                <h4><a href>{getBuy[key].name}</a></h4>
                            </td>
                            <td className="cart_price">
                                <p>${getBuy[key].price}</p>
                            </td>
                            <td className="cart_total EDDL">
                                <Link to={"http://localhost:3000/account/myproduct/editproduct/"+ getBuy[key].id }><button>edit</button></Link >
                                <span onClick={handelDelete} ><button>&#215;</button></span>
                            </td>
                        </tr>
            })
        }
    }
    
    return(
        <div className="col-sm-9">
            <div className="table-responsive cart_info">
                <table className="table table-condensed tt">
                    <thead >
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
                <h4 className="fontAddNew"><Link to="http://localhost:3000/account/myproduct/addproduct">Add New</Link></h4>
            </div>
        </div>
    )
}
export default MyProduct