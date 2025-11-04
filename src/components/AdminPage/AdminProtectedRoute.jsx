import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminProtectedRoute({ children }) {
  const [valid, setValid] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) {
      setValid(false);
      return;
    }

    fetch("http://localhost:8080/mechyam/api/admin/auth/validate-token", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setValid(res.ok))
      .catch(() => setValid(false));
  }, []);

  if (valid === null) return <p>Validating session...</p>;

  return valid ? children : <Navigate to="/admin/login" replace />;
}
