import { Route, Routes } from "react-router";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/todos' element={<div>This is a todo page</div>} />
      </Routes>

    </>
  );
}

export default App;
