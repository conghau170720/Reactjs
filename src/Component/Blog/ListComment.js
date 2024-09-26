function ListComment(props){
    // console.log(props);
    
    let list = props.userData
    // console.log(list);

    function handelReplay(e){
        props.getIdcomment(e.target.id);
        
    }

    function renderComment(){
        if(list.length > 0){
            return list.map((value, key)=> {
                // console.log(value);
                if(value.id_comment == 0){
                    return  (
                                <div key={key}>
                                    <li className="media">
                                        <a className="pull-left" href="#">
                                            <img width="100px" height="100px" className="media-object" src={"http://localhost/laravel8/laravel8/public/upload/user/avatar/" + value.image_user} alt="" />
                                        </a>
                                        <div className="media-body">
                                            <ul className="sinlge-post-meta">
                                                <li><i className="fa fa-user" />{value.name_user}</li>
                                                <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                                <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                            </ul>
                                            <p>{value.comment}</p>
                                            <a onClick={handelReplay} id={value.id} className="btn btn-primary" href>Replay</a>
                                        </div>
                                    </li>
                                    {list.map((value2, key2)=>{
                                        if(value.id == value2.id_comment){
                                            return (
                                                    <li key={key2} className="media second-media">
                                                        <a className="pull-left" href="#">
                                                            <img width="100px" height="100px" className="media-object" src={"http://localhost/laravel8/laravel8/public/upload/user/avatar/" + value2.image_user} alt="" />
                                                        </a>
                                                        <div className="media-body">
                                                            <ul className="sinlge-post-meta">
                                                                <li><i className="fa fa-user" />{value2.name_user}</li>
                                                                <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                                                <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                                            </ul>
                                                            <p>{value2.comment}</p>
                                                        </div>
                                                    </li>
                                                    )   
                                        }
                                    })}
                            </div>	
                    )	
                }
                	
            })
        }
    }
    return(
        <div className="response-area">
                <h2>3 RESPONSES</h2>
                <ul className="media-list">
                    {renderComment()}	
                </ul>	
            </div>/*/Response-area*/
    )
}
export default ListComment