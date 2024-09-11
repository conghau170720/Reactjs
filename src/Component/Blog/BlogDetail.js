 import axios from "axios"
import { useEffect, useState, } from "react";
import { useParams } from "react-router-dom";
import Rate from "./Rate";
import ListComment from "./ListComment";
import Comment from "./Comment";
import StarRatings from 'react-star-ratings';

function BlogDetail(props) {
    
    let params = useParams();
    // console.log(params);
    const [getData, setData] = useState("")
    const [getComment , setComment] = useState([])
    const [getIdrely, setIdrely] = useState("")
    
    // console.log(getComment);
    
    useEffect(() => {
        axios.get("http://localhost/laravel8/laravel8/public/api/blog/detail/" + params.id)
        .then(res => {
            setData(res.data.data);
            setComment(res.data.data.comment);
        })
        .catch(function(error){
            console.log(error);
        })
    },[])
   
   

    
    // console.log(getStar);
    
     
        
    let fromUse = localStorage.getItem("demo2")
    // console.log(fromUse);
    if(fromUse){
        fromUse = JSON.parse(fromUse)
        // console.log(fromUse);
    }
   

    function renderData(){
        if(Object.keys(getData).length > 0){   
                return  <div className="single-blog-post">
                            <h3>{getData["title"]}</h3>
                            <div className="post-meta">
                                <ul>
                                    <li><i className="fa fa-user" /> Mac Doe</li>
                                    <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                    <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                </ul>
                                <StarRatings
                                    rating={1}
                                    starRatedColor="red"
                                    numberOfStars={6}
                                    name='rating'
                                />
                            </div>
                            <a href>
                            <img src={"http://localhost/laravel8/laravel8/public/upload/Blog/image/" + getData["image"]} alt="" />
                            </a>
                            <p>{getData["content"]}</p>
                        </div>
        }
    }
    
    
    function getCmt(data){
        // console.log(data);
        setComment(getComment.concat(data))
        
    }
    function getIdcomment(data1){
        setIdrely(data1);
    }
    // console.log(getIdrely);
    
    
    
    return (
                    <div className="col-sm-9">
                        <div className="blog-post-area">
                            <h2 className="title text-center">Latest From our Blog</h2>
                            {renderData()}
                            <div className="pager-area">
                                <ul className="pager pull-right">
                                    <li><a href="#">Pre</a></li>
                                    <li><a href="#">Next</a></li>
                                </ul>
                            </div>
                        </div>{/*/blog-post-area*/}
                        <Rate idBlog = {params} />
                        <div className="socials-share">
                            <a href><img src="images/blog/socials.png" alt="" /></a>
                        </div>{/*/socials-share*/}
                        <ListComment userData={getComment} getIdcomment = {getIdcomment}/>
                        <Comment idBlog = {params}  getCmt = {getCmt} getIdcomment = {getIdrely}/>
                    </div>
    );
  }
  
  export default BlogDetail;
  