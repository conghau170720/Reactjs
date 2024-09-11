import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import Home from './Component/Blog/Home';
import Blog from './Component/Blog/Blog';
import BlogDetail from './Component/Blog/BlogDetail';
import Register from './Component/Member/Register';
import Login from './Component/Member/Login';
import Account from './Component/Member/Account';
import MenuAccount from './Component/Blog/MenuAccount';
import Addproduct from './Component/Member/Addproduct';
import Myproduct from './Component/Blog/Myproduct';
import Editproduct from './Component/Member/Editproduct';
import Slider from './Component/Blog/Slider';
import ProductDetail from './Component/Blog/ProductDetail';
import Cart from './Component/Blog/Cart';
import Index from './Page/Index';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <App>
            <Routes>
                <Route index path='/' element={<Home />}></Route>
                <Route path='/blog/list' element={<Blog />}></Route>
                <Route path='/blog/detail/:id' element={<BlogDetail />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/account' element={<Account />}></Route>
                <Route path='/addproduct' element={<Addproduct />}></Route>
                <Route path='/myproduct' element={<Myproduct />}></Route>
                <Route path='/editproduct/:id' element={<Editproduct />}></Route>
                <Route path='/product/detail/:id' element={<ProductDetail />}></Route>
                <Route path='/cart' element={<Cart />}></Route>
                <Route path='/index2' element={<Index />}></Route>
            </Routes>
        </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
