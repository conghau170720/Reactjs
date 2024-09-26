import logo from './logo.svg';
import './App.css';
import Header from './Component/Layout/Header';
import Footer from './Component/Layout/Footer';
import Menuleft from './Component/Layout/Menuleft';
import Slider from './Component/Layout/Slider';
import { useLocation } from 'react-router-dom';
import MenuAccount from './Component/Layout/MenuAccount';
import { Provider } from 'react-redux'
import store from './store';

function App(props) {
  let params2 = useLocation()
  
  return (
    <div>
      <Provider store={store}>
        <Header />
        <section>
          <div class="container">
            <div class="row">
              {params2['pathname'].includes("/account") ? <MenuAccount /> : <></> }
              {params2['pathname'].includes("/cart") ||params2['pathname'].includes("/account") || params2['pathname'].includes("/blog/detail") || params2['pathname'].includes("/blog") || params2['pathname'].includes("/login") || params2['pathname'].includes("/signup") ? <></> : <Slider />}
              {params2['pathname'].includes("/cart") ||params2['pathname'].includes("/account") || params2['pathname'].includes("/login") || params2['pathname'].includes("/signup") ? <></> : <Menuleft />}
              {props.children}
            </div>
          </div>
        </section>
        <Footer />
      </Provider>
    </div>
    
    
  );
}

export default App;
