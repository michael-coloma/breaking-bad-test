import React, { useEffect, useState } from "react";

import { routes } from "../../conf/routes";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import LanguageIcon from "@material-ui/icons/Language";

import "./Header.css";
import { changeLanguageRequest } from "../../store/actions/userActions";

import { i18n, setLanguage } from "../../utils/i18n";
import { RootState } from "../../store/reducers/rootReducer";

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
  const options = [i18n("languages"), i18n("spanish"), i18n("english")];

  //it is neccessary for load the language correctly
  const rootState = useSelector((state: RootState) => state);
  const language = rootState.userActions.language || "es";
  setLanguage(language);

  useEffect(() => {
    //it is neccessary for load the language correctly
    const language = rootState.userActions.language || "es";
    dispatch(changeLanguageRequest(language));
    setLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //To get language when the page is reload

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
          {i18n("languages")}
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
          {i18n("all characters")}
        </Link>
        <Link color="inherit" to={routes.CHARACTER}>
          {i18n("character")}
        </Link>
      </Breadcrumbs>
    </div>
  );
};

export default Header;
