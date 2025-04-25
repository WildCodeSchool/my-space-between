import React from "react";
import styles from "./Header.module.css";

type Props = {
    children?: React.ReactNode;
};

const Header = ({ children }: Props) => {
    return (
        <header className={styles.headerLayout}>
            <div>{children}</div>
        </header>
    );
};

export default Header;