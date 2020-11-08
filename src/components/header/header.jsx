import React from "react";
import styles from "./header.module.css";
import Login from "../login/login";
import People from "../people/people";
import Project from "../project/project";
const Header = (props) => {
  return (
    <header className={styles.header}>
      <img className={styles.logoImage} src="/images/logo.png" alt="logo" />
      <h1 className={styles.logo}>RCV</h1>
      <div className={styles.container}>
        <Login />
      </div>
    </header>
  );
};

export default Header;
