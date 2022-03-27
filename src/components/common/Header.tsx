import React, { useState } from "react";

import { routes } from "../../conf/routes";
import { Link } from "react-router-dom";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import LanguageIcon from "@material-ui/icons/Language";

import "./Header.css";

const options = ["Idiomas", "Español", "Inglés"];

const Header = () => {
  const [showMenu, setShowMenu] = useState<null | HTMLElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState(1);

  const handleClickLanguage = (event: React.MouseEvent<HTMLElement>) => {
    setShowMenu(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedLanguage(index);
    setShowMenu(null);
  };

  const handleCloseMenu = () => {
    setShowMenu(null);
  };

  return (
    <div className="container">
      <img
        className="image"
        alt="headerImage"
        src="/assets/images/header.jpg"
      />
      <div className="language">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          variant="outlined"
          startIcon={<LanguageIcon />}
          onClick={handleClickLanguage}
        >
          Idiomas
        </Button>

        <Menu
          id="lock-menu"
          anchorEl={showMenu}
          keepMounted
          open={Boolean(showMenu)}
          onClose={handleCloseMenu}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              disabled={index === 0}
              selected={index === selectedLanguage}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>

      <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
        <Link color="inherit" to={routes.ALL_CHARACTERS}>
          Todos los personajes
        </Link>
        <Link color="inherit" to={routes.CHARACTER}>
          pesonaje
        </Link>
      </Breadcrumbs>
    </div>
  );
};

export default Header;
