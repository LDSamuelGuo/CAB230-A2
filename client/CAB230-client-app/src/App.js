import React from "react"
import "./App.css"
import {
  BrowserRouter ,
 Routes,
  Route,
} from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import VolcanoData from "./pages/VolcanoData"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import MapId from "./pages/MapId"
export default function App() {

  
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/VolcanoData" element={<VolcanoData />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/MapId"  element={<MapId/>} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Header" element={<Header />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}