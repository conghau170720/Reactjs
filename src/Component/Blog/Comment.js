import axios from "axios";
import { useState } from "react"

function Comment(props){
    // console.log(props);
    
    const [getComment, setComment] = useState("")
    
    function handelComment(e){
       setComment(e.target.value);
    }

   function handelCheck(){
        let check = localStorage.getItem("demo2")
        if(!check){
            alert("vui lòng login")
        }else{
            if(getComment == ""){
                alert('vui lòng nhập bình luận')
            }else{
                let useData = localStorage.getItem("demo1")
                if(useData){
                    useData = JSON.parse(useData)
                    let config = { 
                        headers: { 
                        'Authorization': 'Bearer '+ useData.token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                        } 
                    };	
                    const formData = new FormData();
                        formData.append('id_blog', props.idBlog);
                        formData.append('id_user', useData.user.id);
                        formData.append('id_comment', props.idComment ? props.idComment : 0)
                        formData.append('comment', getComment);
                        formData.append('image_user', useData.user.avatar)
                        formData.append('name_user', useData.user.name)
                    axios.post("http://localhost/laravel8/laravel8/public/api/blog/comment/"+ props.idBlog, formData, config)
                    .then(response => {
                        console.log(response);
                        props.getCmt(response.data.data)
                    })
                    .catch(function(error){
                        console.log(error);
                    }) 
                }
            }
        }
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
                            <textarea name="comment" rows={11} Value={""} onChange={handelComment} />
                            <a onClick={handelCheck} className="btn btn-primary" href>post comment</a>
                        </div>
                    </div>
                </div>
            </div>/*/Repaly Box*/
    )
}
export default Comment