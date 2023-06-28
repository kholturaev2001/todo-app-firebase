import { Navigate, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Todos from "./pages/Todos";

function App() {
  
  const Authorized = ({children}) => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    return userInfo ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <Authorized>
              <Todos />
            </Authorized>
          }
        />
      </Routes>
    </>
  );
}

export default App;
