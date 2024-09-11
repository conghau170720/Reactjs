import StarRatings from 'react-star-ratings';
import { useState, useEffect } from "react"; 
import { json } from 'react-router-dom';
import axios from "axios";



function Rate(props){
    // console.log(props);

    
    const [rating, setRating] = useState(0)

    let check = localStorage.getItem("demo1")
    let formUser1 = localStorage.getItem("demo2")

    useEffect(() => {
        axios.get("http://localhost/laravel8/laravel8/public/api/blog/rate/" + props.idBlog.id)
        .then(res => {
            const max = res.data.data;
            
            let s = 0
            // console.log(Object.keys(max).length);
            
            if(Object.keys(max).length > 0 ){
                 Object.keys(max).map((key, index) => {
    
                    s = s + max[key]["rate"]
                    
                })
                let tong = s / Object.keys(max).length
                // console.log(tong)
                setRating(tong); 
            }
         
        })
        .catch(function(error){
            console.log(error);
        })
    },[])
   

    function changeRating(newRating, name) {
        setRating(newRating)
        if(!check){
            alert("bạn hãy đăng nhập")
        }else{  
            if(formUser1){
                let userData = JSON.parse(formUser1)
                // console.log(userData.user.id);
                let config = {
                    headers: {
                        'Authorization': 'Bearer '+ userData.token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                }
                const formData = new FormData();
                formData.append('blog_id', props.idBlog.id)
                formData.append('user_id', userData.user.id)
                formData.append('rate', newRating)
  
                axios.post("http://localhost/laravel8/laravel8/public/api/blog/rate/" + props.idBlog.id , formData, config)
                .then(res => {
                    // console.log(res)
                })
             }
            
        }
    }
   
    return (    
      <StarRatings
        rating={rating} 
        starRatedColor="blue"
        changeRating={changeRating}
        numberOfStars={6}
        name='rating'
      />
    );
}
export default Rate