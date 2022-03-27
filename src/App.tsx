import React from "react";

import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AllCharacters from "./components/AllCharacters";
import Character from "./components/Character";

import { routes } from "./conf/routes";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path={routes.ALL_CHARACTERS}
            element={<AllCharacters />}
          ></Route>
          <Route path={routes.CHARACTER} element={<Character />}></Route>
          <Route path="*" element={<AllCharacters />}></Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
