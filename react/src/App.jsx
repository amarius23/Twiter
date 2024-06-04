import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./components/Home";
import PostUser from "./components/PostUser";
import GetAllUser from "./components/GetAllUser";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./components/Profile";

export default function App() {
  const [user, setUser] = useState({});
  const [jwtToken, setJwtToken] = useState('')
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setJwtToken(storedToken);
    }
  }, []);

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home user={user} />} />
          <Route path="post" element={<PostUser />} />
          <Route path="get" element={<GetAllUser />} />
          <Route path="/profile" element={<Profile user={user} setUser={setUser} jwtToken={jwtToken} setJwtToken={setJwtToken} />} />
          <Route path="/login" element={<Login updateUser={setUser} updateToken={setJwtToken}  />} />
          <Route path="/register" element={<Register/>} />
          </Route>
        </Routes>
        </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);