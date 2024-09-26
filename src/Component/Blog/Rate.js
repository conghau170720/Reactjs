import axios from 'axios';
import { useState, useEffect } from 'react';
import { Form } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
function Rate(props){
    // console.log(props);
    
    const [rating, setRating] = useState(0)

    useEffect(()=>{
        axios.get("http://localhost/laravel8/laravel8/public/api/blog/rate/"+ props.idBlog)
        .then(res=>{
            let totalRate = res.data.data;
            if(totalRate.length > 0){
                let s = 0
                totalRate.map((value, key)=>{
                    s = s + value.rate;
                })
                let average = s / totalRate.length
                setRating(average);   
            }
        })
        .catch(function(error){
            console.log(error);
        })
    },[])
    
    function changeRating(newRating , name){
        setRating(newRating)
        let check = localStorage.getItem("demo2")
        if(!check){
            alert("vui lòng login")
        }else{
            let userData = localStorage.getItem("demo1")
            if(userData){
                userData = JSON.parse(userData)
                // console.log(userData);
                
                let config = { 
                    headers: { 
                    'Authorization': 'Bearer '+ userData.token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                    } 
                };	
                const formData = new FormData();
                    formData.append('user_id', userData.user.id);
                    formData.append('blog_id', props.idBlog);
                    formData.append('rate', newRating)
                axios.post("http://localhost/laravel8/laravel8/public/api/blog/rate/" + props.idBlog, formData, config)
                .then(res=>{
                    // console.log(res);
                })
                .catch(function(error){
                    console.log(error);
                })
            }
            
        }
    }
    return(
        <div className="rating-area">
                <ul className="ratings">
                    <li className="rate-this">Rate this item:</li>
                    <StarRatings
                        rating={rating}
                        starRatedColor="blue"
                        changeRating={changeRating}
                        numberOfStars={5}
                        name='rating'
                        />
                </ul>
                <ul className="tag">
                    <li>TAG:</li>
                    <li><a className="color" href>Pink <span>/</span></a></li>
                    <li><a className="color" href>T-Shirt <span>/</span></a></li>
                    <li><a className="color" href>Girls</a></li>
                </ul>
            </div>/*/rating-area*/
    )
}
export default Rate