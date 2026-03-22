import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("accessToken");
  if (!token) return <Navigate to="/" replace />;
  return children;
}

export default ProtectedRoute;
