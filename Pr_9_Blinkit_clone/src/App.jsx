import { Route, Routes } from "react-router-dom"; // FIXED HERE
// import "./App.css";
import Home from "./Components/Home";
import Header from "./Components/Header";
import AddProduct from "./Components/AddProduct";
import EditProduct from "./Components/EditProduct";


function App() {
  
  return (
    <>
      <Header />
      {/* <BannerSection/>
      <CategoryCards/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes>
    </>
  );
}

export default App;
