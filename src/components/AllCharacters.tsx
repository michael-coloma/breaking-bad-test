import React from "react";

import { Container } from "@material-ui/core";
import Header from "./common/Header";
import { i18n, setLanguage } from "../utils/i18n";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers/rootReducer";

const AllCharacters = () => {
  //it is neccessary for load the language correctly
  const rootState = useSelector((state: RootState) => state);
  const language = rootState.userActions.language || "es";
  setLanguage(language);

  return (
    <Container maxWidth="lg">
      <Header />
      <h2>{i18n("all characters")}</h2>

      <p>WIP</p>
    </Container>
  );
};

export default AllCharacters;
