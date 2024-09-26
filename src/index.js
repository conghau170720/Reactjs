import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"
import Header from './Component/Layout/Header';
import Footer from './Component/Layout/Footer';
import Home from './Component/Blog/Home';
import Blog from './Component/Blog/Blog';
import BlogDetail from './Component/Blog/BlogDetail';
import Login from './Component/Member/Login';
import Signup from './Component/Member/Signup';
import Account from './Component/Member/Account';
import MyProduct from './Component/Member/MyProduct';
import AddProduct from './Component/Member/AddProduct';
import EditProduct from './Component/Member/EditProduct';
import ProductHome from './Component/Blog/ProductHome';
import Cart from './Component/Blog/Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
            <Route index path='/' element={<Home />}/>
            <Route path='/blog' element={<Blog />}/>
            <Route path='/blog/detail/:id' element={<BlogDetail />}/>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />}/>
            <Route path='/account' element={<Account />}/>
            <Route path='/account/myproduct' element={<MyProduct />} />
            <Route path='/account/myproduct/addproduct' element={<AddProduct />}/>
            <Route path='/account/myproduct/editproduct/:id' element={<EditProduct />}/>
            <Route path='/producthome/:id' element={<ProductHome />} />
            <Route path='/cart' element={<Cart />} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
