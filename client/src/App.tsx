import "./App.css";
import { Outlet } from "react-router";
import BurgerMenu from "./components/BurgerMenu";

function App() {
  return (
    <>
      <BurgerMenu />
      <Outlet />
    </>
  );
}

export default App;


