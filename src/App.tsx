import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import Home from "./pages/Home";
import Tracker from "./pages/Tracker";
import TrackerForm from "./components/TrackerForm";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/tracker/add" element={<TrackerForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;