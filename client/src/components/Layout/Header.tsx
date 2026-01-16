import "./header.css";
import React from "react";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <h1>Learning cards</h1>
      </div>
      <div className="menu">
        <div className="menu-text">
          <p>Home</p>
        </div>
        <div className="menu-text">
          <p>Cards</p>
        </div>
        <div className="menu-text">
          <p>About</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
