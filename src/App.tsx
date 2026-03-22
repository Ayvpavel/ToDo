import AddTodo from "./components/AddTodo/AddTodo";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm/LoginForm";
import ProtectedRoute from "./components/Protected";

import "./App.css";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import Homepage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Homepage />} />

      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            {" "}
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/todo"
        element={
          <ProtectedRoute>
            {" "}
            <AddTodo />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
