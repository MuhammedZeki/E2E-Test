import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Success from "./Success";

function App() {
  return (
    <>
      <div>HomePage</div>
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/success"} element={<Success />} />
      </Routes>
    </>
  );
}

export default App;
