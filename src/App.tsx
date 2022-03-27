import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllCharacters from "./components/AllCharacters";
import Character from "./components/Character";

import { routes } from "./conf/routes";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={routes.ALL_CHARACTERS} element={<AllCharacters />}></Route>
        <Route path={routes.CHARACTER} element={<Character />}></Route>
        <Route path="*" element={<AllCharacters />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
