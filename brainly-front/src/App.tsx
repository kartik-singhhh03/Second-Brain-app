
import Dashboard from "./pages/dashboard"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { Landing } from "./pages/Landing"
import { SharedBrain } from "./pages/SharedBrain"
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {
  return <BrowserRouter>
  <Routes>

    <Route path="/" element={<Landing/>}/>
    <Route path="/Signup" element={<Signup/>}/>
    <Route path="/Signin" element={<Signin/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/share/:shareLink" element={<SharedBrain/>}/>

    
    


  
  </Routes>
  
  </BrowserRouter>
  
}

export default App
