import './App.css'
import { Route, Routes } from "react-router";
import Header from './Components/Header'
import Home from "./Components/Home";
import AddProduct from './Components/AddProduct'
import EditProduct from "./Components/EditProduct";
import ProductDetails from "./Components/ProductDetails";


function App() {
  return (
    <>
       <Header />
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </>
  )
}

export default App
