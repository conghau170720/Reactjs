import { Link } from "react-router-dom"

function MenuAccount(){
    return (
        <div className="col-sm-3">
            <div className="left-sidebar">
                <h2>Account</h2>
                <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title"><Link to="http://localhost:3000/account">account</Link></h4>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title"><Link to="http://localhost:3000/account/myproduct">My product</Link></h4>
                        </div>
                    </div>
                </div>{/*/category-products*/}
            </div>
        </div>
    )
}
export default MenuAccount