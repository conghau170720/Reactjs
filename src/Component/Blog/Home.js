import axios from "axios";
import { useEffect, useState} from "react";
import { Link } from "react-router-dom"
import { addNewHobby } from "../../actions/hobby";
import { useDispatch } from "react-redux";

function Home(){
    const [getData, setData] = useState([])
    const dispatch = useDispatch()

    useEffect(()=>{
        axios.get("http://localhost/laravel8/laravel8/public/api/product")
        .then(response=>{
            setData(response.data.data);
        })
        .catch(function(error){
            console.log(error);
        })
    },[])
    

    const handleCart = (e) => {
        e.preventDefault();
        const qty = 1
        const idProduct = e.target.id;
        let obj = {[idProduct]:qty}
        let getLocal = localStorage.getItem("demo3")
        if(getLocal){
            obj = JSON.parse(getLocal)
            if(obj[idProduct]){
                obj[idProduct] += 1
            }else{
                obj[idProduct] = qty
            }

            let s = 0
            Object.keys(obj).map((key,index)=>{
                s += obj[key];
            })
            const action = addNewHobby(s)
            dispatch(action)   
        }
        localStorage.setItem("demo3",JSON.stringify(obj))
    }

    function renderData(){
        if(getData.length > 0){
            return getData.map((value, key)=>{
                // console.log(value);
                let image = JSON.parse(value.image)
              
                return (
                        <div className="col-sm-4">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src={"http://localhost/laravel8/laravel8/public/upload/product/"+ value.id_user + "/" + image[0]} alt="" />
                                        <h2>${value.price}</h2>
                                        <p>{value.name}</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                    <div className="product-overlay">
                                        <div className="overlay-content">
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <a onClick={handleCart} id={value.id} href="#" className="btn btn-default add-to-cart"><i style={{ pointerEvents: "none" }} className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="choose">
                                    <ul className="nav nav-pills nav-justified">
                                        <li><a href="#"><i className="fa fa-plus-square" />Add to wishlist</a></li>
                                        <li><Link to={"http://localhost:3000/producthome/"+ value.id}><i className="fa fa-plus-square" />More</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                )
            })
        }
    }

    return(
        <div className="col-sm-9 padding-right">
            <div className="features_items">{/*features_items*/}
                <h2 className="title text-center">Features Items</h2>
                {renderData()}
            </div>{/*features_items*/}
            <div className="category-tab">{/*category-tab*/}
                <div className="col-sm-12">
                    <ul className="nav nav-tabs">
                        <li className="active"><a href="#tshirt" data-toggle="tab">T-Shirt</a></li>
                        <li><a href="#blazers" data-toggle="tab">Blazers</a></li>
                        <li><a href="#sunglass" data-toggle="tab">Sunglass</a></li>
                        <li><a href="#kids" data-toggle="tab">Kids</a></li>
                        <li><a href="#poloshirt" data-toggle="tab">Polo shirt</a></li>
                    </ul>
                </div>
                <div className="tab-content">
                    <div className="tab-pane fade active in" id="tshirt">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="data:image/jpeg;base64,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" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="data:image/jpeg;base64,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" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="data:image/jpeg;base64,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" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN41XqM2RYU5xS6Xl_dM-sHSzAPG6S5cio-Q&s" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="blazers">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="sunglass">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="kids">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="poloshirt">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>{/*/category-tab*/}
            <div className="recommended_items">{/*recommended_items*/}
                <h2 className="title text-center">recommended items</h2>
                <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="item active">	
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxudHzOdfd6t_GD4Bgye1oHPwhQRun8XEnrA&s" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJbiD7UIdFI56WfSB4rnW3FFprd6nFcPydqQ&s" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsVuQaLY2hg2rc6O8fbZxML7US-ie-38XBMQ&s" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item">	
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="images/home/recommend1.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="images/home/recommend2.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="images/home/recommend3.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                        <i className="fa fa-angle-left" />
                    </a>
                    <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                        <i className="fa fa-angle-right" />
                    </a>			
                </div>
            </div>{/*/recommended_items*/}
        </div>
    )
}
export default Home
