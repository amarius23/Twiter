import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./components/Home";
import PostUser from "./components/PostUser";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import { AuthProvider,useAuth } from "./components/AuthContext"; 
import Profile from "./pages/Profile/Profile";

export default function App() {
  const [user, setUser] = useState({});
  const [jwtToken, setJwtToken] = useState('')
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(storedUser);
      setJwtToken(storedToken);
    }

  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={user}/>}>
          <Route index element={<Home/>} />
          <Route path="post" element={<PostUser />} />
            <Route path="/login" element={<Login  />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login updateUser={setUser} updateToken={setJwtToken}  />} />
          <Route path="/register" element={<Register/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>  
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);