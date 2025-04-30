import { useState } from "react";
import styles from "./BurgerMenu.module.css";

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
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default BurgerMenu;
