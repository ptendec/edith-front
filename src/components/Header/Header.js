import React from 'react';
import classes from "./Header.module.css"
import {Link} from "react-router-dom"

const Header = () => {
  return (
    <div className={classes.header}>
      <Link to={'/'}>Edith</Link>
    </div>
  );
};

export default Header;
