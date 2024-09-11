import axios from "axios";
import { useState } from "react";
import BlogDetail from "./BlogDetail";
import Blog from "./Blog";

function Comment(props){
   
    let check = localStorage.getItem("demo1")
    let formuser1 = localStorage.getItem("demo2")

    let xx  = props.getIdcomment;
    
   
    const [getData, setData]= useState("")
    
    
    function handleComment(){
       if(!check){
             alert("bạn hãy đăng nhập")
       }else{
            if(getData == ""){
                alert("hãy nhập bình luận")
            }else{
                if(formuser1){
                    let userData = JSON.parse(formuser1)
                    let config = {
                        headers: {
                            'Authorization': 'Bearer '+ userData.token,
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json'
                        }
                    }
                    const formData = new FormData();
                    formData.append('id_blog', props.idBlog.id)
                    formData.append('id_user', userData.user.id)
                    formData.append('id_comment', xx ? xx : 0);
                    formData.append('comment', getData);
                    formData.append('image_user', userData.user.avatar);
                    formData.append('name_user', userData.user.name);
                  
                    
                    axios.post("http://localhost/laravel8/laravel8/public/api/blog/comment/" + props.idBlog.id , formData, config)
                    .then(res => {
                        console.log(res)
                        props.getCmt(res.data.data)
                    })
                }
            }
       }
    }
    function handleInput(e){
        setData(e.target.value);
    }
   
    return(
        <div className="replay-box">
            <div className="row">
                 <div className="col-sm-12">
                    <h2>Leave a replay</h2>
                    <div className="text-area">
                        <div className="blank-arrow">
                            <label>Your Name</label>
                        </div>
                        <span>*</span>
                        <textarea onChange={handleInput} name="message" rows={11} defaultValue={""} />
                        <a onClick={handleComment}   className="btn btn-primary" >post comment</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Comment