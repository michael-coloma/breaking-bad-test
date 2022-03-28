import React, { useState } from "react";

import { routes } from "../../conf/routes";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import LanguageIcon from "@material-ui/icons/Language";

import "./Header.css";
import { changeLanguageRequest } from "../../store/actions/userActions";

import I18n from "./I18n";

enum EnumLanguage {
  SPANISH = 1,
  ENGLISH = 2,
}

const Header = () => {
  const [showMenu, setShowMenu] = useState<null | HTMLElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState(
    EnumLanguage.SPANISH
  );

  const dispatch = useDispatch();
  const options = ["languages", "spanish", "english"];

  const handleClickLanguage = (event: React.MouseEvent<HTMLElement>) => {
    setShowMenu(event.currentTarget);
  };

  const handleMenuItemClick = (
    _event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    switch (index) {
      case EnumLanguage.ENGLISH:
        dispatch(changeLanguageRequest("en"));
        break;

      default:
        dispatch(changeLanguageRequest("es"));
        break;
    }

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
          <I18n text="languages" />
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
              <I18n text={option} />
            </MenuItem>
          ))}
        </Menu>
      </div>

      <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
        <Link color="inherit" to={routes.ALL_CHARACTERS}>
          <I18n text="all characters" />
        </Link>
        <Link color="inherit" to={routes.CHARACTER}>
          <I18n text="character" />
        </Link>
      </Breadcrumbs>
    </div>
  );
};

export default Header;
