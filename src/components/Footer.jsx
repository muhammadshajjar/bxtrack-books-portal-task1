import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.attribution}>
        <span> Challenge by </span>
        <a href="https://bxtrack.com/" target="_blank">
          BXTrack Solutions{" "}
        </a>

        <span> Coded By </span>
        <a href="https://www.linkedin.com/in/muhammad-shajjar" target="_blank">
          Muhammad Shajjar
        </a>
      </p>
    </footer>
  );
};

export default Footer;
