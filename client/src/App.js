
import './App.css';
import Home from './components/home/Home';
import Register from './components/register/Register';
import { Routes, Route } from "react-router-dom";
function App() {
  let validUser = localStorage.getItem("userTrue");
   
  return (
  <>
   <Routes>
   <Route exact path="/" element={<Register/>} />
   <Route exact path="/home" element={validUser === true ? <Register/> : <Home/> } />
   </Routes>
  </>

  );
}

export default App;
