import "./App.css";
import Home from "./pages/Home";
import Public from "./pages/Public";
import Protected from "./pages/Protected";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import RequireAuth from "./components/RequireAuth";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Available from "./pages/Available";
import Cities from "./pages/Cities";
import FindHomes from "./pages/FindHomes";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* public routes go here */}
        <Route path='/available' element={<Available/>}/>
        <Route path='/cities' element={<Cities />}/>
        <Route path='/find_homes' element={<FindHomes />}/>
        <Route path="/public" element={<Public />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          {/* protected routes go here */}
          <Route path="/" element={<Home />} />
          <Route path="/protected" element={<Protected />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
