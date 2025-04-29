import { Outlet } from "react-router"
import "./App.css";
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


