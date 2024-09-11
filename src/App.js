import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Sitetab from './Component/Blog/Sitetab';
import { useLocation } from 'react-router-dom';
import MenuAccount from './Component/Blog/MenuAccount';
import Slider from './Component/Blog/Slider';
import { UserContext } from './UserContext';
import { useState } from 'react';
import { Provider } from 'react-redux'
import store from './store';
import Test from './Page/Test';


function App(props) {
    let params1 = useLocation()
    // console.log(params1['pathname']);
    const [getQty, setQty] = useState(0)
    
    function tongQty(data){
      setQty(data)
      localStorage.setItem("demo4", JSON.stringify(data))
    }

  return (
    <>
    <Provider store={store}>
      <Header />
      {params1['pathname'] === "/" && <Slider />}
      <section>
              <div className="container">
                <div className="row">
                  { params1['pathname'].includes("editproduct")  || params1['pathname'].includes("account") || params1['pathname'].includes("addproduct") || params1['pathname'].includes("myproduct")  ? <MenuAccount /> : <Sitetab /> && !params1['pathname'].includes("cart") && <Sitetab />}
                  {props.children}  
                </div>
              </div>
      </section>
      <Footer />
      </Provider>
    </>
  );
}

export default App;
