import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import User from "./User";




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Register />} />
  <Route path="/register" element={<Register />} />
  <Route path="/users" element={<User />} />
</Routes>

    </BrowserRouter>
  );
}
