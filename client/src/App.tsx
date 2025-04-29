import "./App.css";
import { Outlet } from "react-router";
import BurgerMenu from "./components/BurgerMenu";
import LoginButton from "./components/LoginButton";

function App() {
  return (
    <>
      <BurgerMenu />
      <LoginButton />
      <Outlet />
    </>
  );
}

export default App;
