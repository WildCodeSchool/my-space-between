import { useState } from "react";
import styles from "./BurgerMenu.module.css";
import { Link } from "react-router-dom";

function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={styles.burgerMenuWrapper}>
      <button
        onClick={toggleMenu}
        className={`${styles.menuBurger} ${isOpen ? styles.open : ""}`}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      <nav className={`${styles.navBar} ${isOpen ? styles.open : ""}`}>
        <ul className={styles.menuOpen}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default BurgerMenu;
