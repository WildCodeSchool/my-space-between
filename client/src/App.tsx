import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import BurgerMenu from "./components/BurgerMenu";
import LoginButton from "./components/LoginButton";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <BurgerMenu />
      <LoginButton />
      <Outlet />
    </>
  );
}

export default App;
