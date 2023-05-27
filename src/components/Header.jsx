import React from "react";
import styles from "./Header.module.css";

//assests

import logo from "../assets/images/logo.png";
const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="BXTrack Solutions logo" />
    </header>
  );
};

export default Header;
