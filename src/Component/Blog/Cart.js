import axios from "axios"
import { useEffect, useState } from "react"

function Cart(){
    const [getData, setData] = useState([])

    useEffect(()=>{
        let cart = localStorage.getItem("demo3")
        axios.post("http://localhost/laravel8/laravel8/public/api/product/cart", cart)
        .then(res=>{
            setData(res.data.data);
        })
        .catch(function(error){
            console.log(error);
        })

    },[])

    const handleUp = (e) => {
       const idProduct = e.target.id;
       let cart = localStorage.getItem("demo3")
       if(cart){
            cart = JSON.parse(cart)
            Object.keys(cart).map((key,index)=>{
                if(key == idProduct){
                    cart[key] += 1
                }
            })
            localStorage.setItem("demo3",JSON.stringify(cart))        
       }
       let newData = [...getData]
       if(newData){
            Object.keys(newData).map((key, index)=>{
                if(newData[key].id == idProduct){
                    newData[key].qty += 1
                }
            })
            setData(newData)
       } 
    }

    const handleDown = (e) => {
        let idProduct = e.target.id
        let newData = [...getData]
        if(newData){
            Object.keys(newData).map((key, index) => {
                if(newData[key].qty > 1){
                    if(newData[key].id == idProduct){
                        newData[key].qty -= 1
                        setData(newData);
                    }
                }else{
                    let newArray = newData.filter((item => item.qty > 1))
                    setData(newArray);
                }
              
            })
        }
        let cart = localStorage.getItem("demo3")
        if(cart){
            cart = JSON.parse(cart)
            Object.keys(cart).map((key, index)=> {
                if(cart[key] > 1){
                    if(key == idProduct){
                        cart[key] -= 1
                        localStorage.setItem("demo3", JSON.stringify(cart))
                    }
                }else{
                    delete cart[key]
                    localStorage.setItem("demo3", JSON.stringify(cart)) 
                }
            })
        }
    }

    const handleDelete = (e) => {
        const idProduct = e.target.id;
        let newData = {}
        let getLocal = localStorage.getItem("demo3")
        if(getLocal){
            newData = JSON.parse(getLocal)
            Object.keys(newData).map((key, index)=>{
                if(key == idProduct){
                    delete newData[key]
                }
            })
            localStorage.setItem("demo3",JSON.stringify(newData))
        }
        if(getData){
            let newArray = getData.filter(item => item.id != idProduct)
            setData(newArray);
        }
    }
    
    function renderTable(){
        if(getData.length > 0){
            return getData.map((value, key)=>{
                let image = JSON.parse(value.image)
                let s = 0
                s = value.price * value.qty

                return(
                    <tbody>
                        <tr>
                            <td className="cart_product">
                                <a href><img width="100px" height="100px" src={"http://localhost/laravel8/laravel8/public/upload/product/" + value.id_user + "/" + image[0]} alt="" /></a>
                            </td>
                            <td className="cart_description">
                                <h4><a href>{value.name}</a></h4>
                                <p>Web ID: 1089772</p>
                            </td>
                            <td className="cart_price">
                                <p>${value.price}</p>
                            </td>
                            <td className="cart_quantity">
                                <div className="cart_quantity_button">
                                    <a onClick={handleUp} id={value.id} className="cart_quantity_up" href> + </a>
                                    <input className="cart_quantity_input" type="text" name="quantity" Value={value.qty} autoComplete="off" size={2} />
                                    <a onClick={handleDown} id={value.id} className="cart_quantity_down" href> - </a>
                                </div>
                            </td>
                            <td className="cart_total">
                                <p className="cart_total_price">${s}</p>
                            </td>
                            <td className="cart_delete">
                                <a onClick={handleDelete} id={value.id} className="cart_quantity_delete" href><i onClick={handleDelete} id={value.id} className="fa fa-times" /></a>
                            </td>
                        </tr>
                    </tbody>
                )
            })
        }
    }
    
    function renderTotalMax(){
        if(getData.length > 0){
            let max = 0
            getData.map((value, key)=>{
                console.log(value);
                let s = 0
                s = value.price * value.qty
                max = max + s 
            })
            return  <>{max}</>
        }
    }
    
    return(
        <div>
        <section id="cart_items">
          <div className="container">
            <div className="breadcrumbs">
              <ol className="breadcrumb">
                <li><a href="#">Home</a></li>
                <li className="active">Shopping Cart</li>
              </ol>
            </div>
            <div className="table-responsive cart_info">
              <table className="table table-condensed">
                <thead>
                  <tr className="cart_menu">
                    <td className="image">Item</td>
                    <td className="description" />
                    <td className="price">Price</td>
                    <td className="quantity">Quantity</td>
                    <td className="total">Total</td>
                    <td />
                  </tr>
                </thead>
                    {renderTable()}
              </table>
            </div>
          </div>
        </section> {/*/#cart_items*/}
        <section id="do_action">
          <div className="container">
            <div className="heading">
              <h3>What would you like to do next?</h3>
              <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="chose_area">
                  <ul className="user_option">
                    <li>
                      <input type="checkbox" />
                      <label>Use Coupon Code</label>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <label>Use Gift Voucher</label>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <label>Estimate Shipping &amp; Taxes</label>
                    </li>
                  </ul>
                  <ul className="user_info">
                    <li className="single_field">
                      <label>Country:</label>
                      <select>
                        <option>United States</option>
                        <option>Bangladesh</option>
                        <option>UK</option>
                        <option>India</option>
                        <option>Pakistan</option>
                        <option>Ucrane</option>
                        <option>Canada</option>
                        <option>Dubai</option>
                      </select>
                    </li>
                    <li className="single_field">
                      <label>Region / State:</label>
                      <select>
                        <option>Select</option>
                        <option>Dhaka</option>
                        <option>London</option>
                        <option>Dillih</option>
                        <option>Lahore</option>
                        <option>Alaska</option>
                        <option>Canada</option>
                        <option>Dubai</option>
                      </select>
                    </li>
                    <li className="single_field zip-field">
                      <label>Zip Code:</label>
                      <input type="text" />
                    </li>
                  </ul>
                  <a className="btn btn-default update" href>Get Quotes</a>
                  <a className="btn btn-default check_out" href>Continue</a>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="total_area">
                  <ul>
                    <li>Cart Sub Total <span>$59</span></li>
                    <li>Eco Tax <span>$2</span></li>
                    <li>Shipping Cost <span>Free</span></li>
                    <li>Total <span>${renderTotalMax()}</span></li>
                  </ul>
                  <a className="btn btn-default update" href>Update</a>
                  <a className="btn btn-default check_out" href>Check Out</a>
                </div>
              </div>
            </div>
          </div>
        </section>{/*/#do_action*/}
      </div>
    )
}
export default Cart