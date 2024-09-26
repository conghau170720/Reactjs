import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ProductHome(){
    let params = useParams();
    // console.log(params);
    const [getData, setData] = useState({})
    const [getImage, setImage] = useState("")

    useEffect(()=>{
        axios.get("http://localhost/laravel8/laravel8/public/api/product/detail/"+ params.id)
        .then(res=>{
            setData(res.data.data);
            if(res.data.data.image){
                let imageMax = JSON.parse(res.data.data.image)
                setImage(imageMax[0])
            }
            
        })
        .catch(function(error){
            console.log(error);
        })
    },[])
    
    function renderImageMax(){
        if(Object.keys(getData).length > 0){
            return (
                <>
                    <img src={"http://localhost/laravel8/laravel8/public/upload/product/"+ getData.id_user + "/" + getImage} alt="" />
                    <a href={"http://localhost/laravel8/laravel8/public/upload/product/"+ getData.id_user + "/" + getImage} rel="prettyPhoto"><h3>ZOOM</h3></a>
                </> 
            )
        }
    }

    function renderImageMin(){
        for(let i = 1; i<=3; i++){
            let divClass = "item"
            if(i === 1){
                divClass += "active"
                return(
                    <div className="carousel-inner">
                        <div className={divClass} key={i}>
                           {renderImageMin2()}
                        </div>
                    </div>
                )
            }
          
        }
    }
console.log(getData);

    function renderImageMin2(){
           if(Object.keys(getData).length > 0){
            let image = JSON.parse(getData.image)
            return image.map((value, key)=> {
                return  <a  href><img width="100px" height="70px" onClick={handleImageMin} src={"http://localhost/laravel8/laravel8/public/upload/product/"+ getData.id_user + "/" + value} alt="" /></a>
            })
        }
    }
    
    function handleImageMin(e){
        const imageSplit = (e.target.src).split("/");
        console.log(imageSplit);
        setImage(imageSplit[9]);
    }

    function renderData(){
        if(Object.keys(getData).length > 0){
            return (
                <div className="product-details">{/*product-details*/}
                    <div className="col-sm-5">
                        <div className="view-product">
                            {renderImageMax()}
                        </div>
                        <div id="similar-product" className="carousel slide" data-ride="carousel">
                            {/* Wrapper for slides */}
                            {renderImageMin()}
                            {/* Controls */}
                            <a className="left item-control" href="#similar-product" data-slide="prev">
                            <i className="fa fa-angle-left" />
                            </a>
                            <a className="right item-control" href="#similar-product" data-slide="next">
                            <i className="fa fa-angle-right" />
                            </a>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="product-information">{/*/product-information*/}
                            <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                            <h2>{getData.name }</h2>
                            <p>{getData.web_id}</p>
                            <img src="images/product-details/rating.png" alt="" />
                            <span>
                            <span>US ${getData.price}</span>
                                <label>Quantity:</label>
                                <input type="text" defaultValue={1} />
                                <button type="button" className="btn btn-fefault cart">
                                <i className="fa fa-shopping-cart" />
                                Add to cart
                                </button>
                            </span>
                            <p><b>Availability:</b> In Stock</p>
                            <p><b>Condition:</b> New</p>
                            <p><b>Brand:</b> E-SHOPPER</p>
                            <a href><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
                        </div>{/*/product-information*/}
                    </div>
                </div>/*/product-details*/
                )
            }    
        }
        
    return(
        <div className="col-sm-9 padding-right">


            {renderData()}

          <div className="category-tab shop-details-tab">{/*category-tab*/}
            <div className="col-sm-12">
              <ul className="nav nav-tabs">
                <li><a href="#details" data-toggle="tab">Details</a></li>
                <li><a href="#companyprofile" data-toggle="tab">Company Profile</a></li>
                <li><a href="#tag" data-toggle="tab">Tag</a></li>
                <li className="active"><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>
              </ul>
            </div>
            {/* code toi day */}
            <div className="tab-content">
              <div className="tab-pane fade" id="details">
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="companyprofile">
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="tag">
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade active in" id="reviews">
                <div className="col-sm-12">
                  <ul>
                    <li><a href><i className="fa fa-user" />EUGEN</a></li>
                    <li><a href><i className="fa fa-clock-o" />12:41 PM</a></li>
                    <li><a href><i className="fa fa-calendar-o" />31 DEC 2014</a></li>
                  </ul>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                  <p><b>Write Your Review</b></p>
                  <form action="#">
                    <span>
                      <input type="text" placeholder="Your Name" />
                      <input type="email" placeholder="Email Address" />
                    </span>
                    <textarea name defaultValue={""} />
                    <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                    <button type="button" className="btn btn-default pull-right">
                      Submit
                    </button>
                  </form>
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
                          <img src="images/home/recommend1.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
export default ProductHome