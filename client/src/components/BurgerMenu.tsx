import { useState, useRef, useEffect } from "react";
import styles from "./BurgerMenu.module.css";
import { Link } from "react-router-dom";

function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.burgerMenuWrapper} ref={menuRef}>
      <button
        onClick={toggleMenu}
        className={`${styles.menuBurger} ${isOpen ? styles.open : ""}`}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      <nav className={`${styles.navBar} ${isOpen ? styles.open : ""}`}>
        <ul className={styles.menuOpen}>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default BurgerMenu;
