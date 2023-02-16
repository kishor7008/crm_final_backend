import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Page from "./Page";

const App=()=>{
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/page" element={<Page/>}/>
    </Routes>
    
    </BrowserRouter>
    </>
  )
}
export default App;