import { useEffect, useState } from "react";
import axios from "axios"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";


function Blog(){
    const [getData, setData] = useState("");
    // console.log(setInput);
    useEffect(() =>{
        axios.get("http://localhost/laravel8/laravel8/public/api/blog")
        .then(res => {
            setData(res.data.blog.data)  ;
        })
        .catch(function (error){
            console.log(error); 
        })
    },[])
    // console.log(getData);

    function fetchData (){
        if(Object.keys(getData).length > 0) {
            return getData.map((value, key) => {    
                return   <div className="single-blog-post">
                            <h3>{value.title}</h3>
                            <div className="post-meta">
                                <ul>
                                    <li><i className="fa fa-user" /> Mac Doe</li>
                                    <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                    <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                </ul>
                                <span>
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-half-o" />
                                </span>
                            </div>
                            <a href>    
                                <img src={"http://localhost/laravel8/laravel8/public/upload/Blog/image/" + value.image}  alt="" />
                            </a>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            <Link className="btn btn-primary" to={"http://localhost:3000/blog/detail/" + value.id}>Read More</Link   >
                        </div>
            })
        }
    }

 
    return(
     
                    <div className="col-sm-9">
                        <div className="blog-post-area">
                            <h2 className="title text-center">Latest From our Blog</h2>
                            {fetchData()}
                            <div className="pagination-area">
                                <ul className="pagination">
                                <li><a href className="active">1</a></li>
                                <li><a href>2</a></li>
                                <li><a href>3</a></li>
                                <li><a href><i className="fa fa-angle-double-right" /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
    )
}
export default Blog;