
import React from "react";
import Header from "./Components/Header.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home.jsx";
import AddStudent from "./Components/AddStudent.jsx";
import EditStudent from "./Components/EditStudent.jsx";
import StudentDetails from "./Components/StudentDetails.jsx"; 
import Footer from "./Components/Footer.jsx";
import Students from "./Components/Students.jsx";
import MyProfile from "./Components/MyProfile.jsx";


import SignIn from "./Components/auth/SignIn.jsx";  
import SignUp from "./Components/auth/SignUp.jsx";  


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
         
        <Route path="/students" element={<Students />} />  
        <Route path="/profile" element={<MyProfile />} />


      
        <Route path="/students/add" element={<AddStudent />} />
        <Route path="/students/edit/:id" element={<EditStudent />} />
        <Route path="/students/:id" element={<StudentDetails />} />

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

       
      </Routes>
      <Footer />
    </>
  );
}

export default App;
