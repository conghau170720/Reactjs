import { useParams } from "react-router-dom"
import Blog from "./Blog"
import { useEffect, useState } from "react";
import axios from "axios";
import Rate from "./Rate";
import ListComment from "./ListComment";
import Comment from "./Comment";

function BlogDetail(){
    let params = useParams()
    const [getData , setData] = useState({})
    const [getComment, setComment] = useState([])
    const [getIdrely, setIdrely] = useState("")
    // console.log(params.id);
    
    useEffect(()=>{
        axios.get("http://localhost/laravel8/laravel8/public/api/blog/detail/" + params.id)
        .then(response => {
            setData(response.data.data);
            setComment(response.data.data.comment);
        })
        .catch(function(error){
            console.log(error);
        })
    },[])

    // console.log(getData );
    
    function renderData(){
        if(Object.keys(getData).length > 0){
            const date = getData.created_at 
            const finDate = date.split(":")
            return <div className="blog-post-area">
                    <h2 className="title text-center">Latest From our Blog</h2>
                    <div className="single-blog-post">
                        <h3>{getData.title}</h3>
                        <div className="post-meta">
                            <ul>
                                <li><i className="fa fa-user" /> Mac Doe</li>
                                <li><i className="fa fa-clock-o" /> {finDate[1]} : {finDate[2]} pm</li>
                                <li><i className="fa fa-calendar" />{finDate[0]}</li>
                            </ul>
                        </div>
                        <a href>
                            <img src={"http://localhost/laravel8/laravel8/public/upload/Blog/image/" + getData.image} alt="" />
                        </a>
                        <p>{getData.content}</p>
                        <div className="pager-area">
                            <ul className="pager pull-right">
                                <li><a href="#">Pre</a></li>
                                <li><a href="#">Next</a></li>
                            </ul>
                        </div>
                    </div>
                </div>/*/blog-post-area*/
        }
    }

    function getCmt(data){
        // console.log(data);
        setComment(getComment.concat(data))
    }
    function getIdcomment(data2){
        setIdrely(data2);
    }
    
    return(

        <div className="col-sm-9">
            {renderData()}
            <Rate idBlog={params.id}/>
            <div className="socials-share">
                <a href><img src="images/blog/socials.png" alt="" /></a>
            </div>{/*/socials-share*/}
            <ListComment userData={getComment}  getIdcomment={getIdcomment} />
            <Comment idBlog={params.id} getCmt={getCmt} idComment={getIdrely}/>
        </div>
    )
}
export default BlogDetail