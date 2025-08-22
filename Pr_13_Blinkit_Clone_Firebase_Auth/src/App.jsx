// import './App.css'
import { Route, Routes } from "react-router";
import Header from './Components/Header'
import Home from "./Components/Home";
import AddProduct from './Components/AddProduct'
import EditProduct from "./Components/EditProduct";
import CategoryProducts from "./Components/CategoryProducts";

import ProductDetails from "./Components/ProductDetails";
import SignIn from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";
import Profile from "./Components/Profile";
// import Footer from "./Components/Footer";


function App() {
  return (
    <>
       <Header />
       <Routes>
        <Route path="/" element={<Home />} />
       
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/category/:categoryName" element={<CategoryProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/signIn" element={<SignIn/>} />
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="/profile" element={<Profile />} />


        
      </Routes>
       {/* <Footer/> */}
    </>
  )
}

export default App
