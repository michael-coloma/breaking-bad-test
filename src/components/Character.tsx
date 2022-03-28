import React from "react";

import { Container } from "@material-ui/core";

import Header from "./common/Header";
import I18n from "./common/I18n";

const Character = () => {
  return (
    <Container maxWidth="lg">
      <Header />
      <h2>
        <I18n text="character" />
      </h2>

      <p>WIP</p>
    </Container>
  );
};

export default Character;
