import React from "react";

const Header = props => {
  return (
    <header className="header" role="banner">
      <div className="menu">
        <div className="container">
          <nav>
            <ul>
              <li><a>Home</a></li>
              <li><a>store</a></li>
              <li><a>articles</a></li>
              <li><a>cafes</a></li>
            </ul>
          </nav>
          <div className="additional-menu-buttons user-menu">
            <nav>
              <ul className="dropdown-items-list dropdown-desktop-visible">
                <li>
                  <a>English</a>
                </li>
                <li>
                  <a>Español</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="header-row">
        <div className="container">
          <div className="col-xs-8 col-md-8 col-lg-4 logo">
            <h1 className="logo">Dancing Goat</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
