import React, { useEffect, useState } from "react";

import { Container } from "@material-ui/core";
import Header from "./common/Header";
import { i18n, setLanguage } from "../utils/i18n";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers/rootReducer";
import axios from "axios";
import isEmpty from "lodash/isEmpty";
import CustomTable from "./CustomTable";

export interface DataAllCharacters {
  appearance: number[];
  better_call_saul_appearance: any[];
  birthday: string;
  category: string;
  char_id: number;
  img: string;
  name: string;
  nickname: string;
  occupation: string[];
  portrayed: string;
  status: string;
}

const AllCharacters = () => {
  const [data, setData] = useState<DataAllCharacters[]>([]);

  //it is neccessary for load the language correctly
  const rootState = useSelector((state: RootState) => state);
  const language = rootState.userActions.language || "es";
  setLanguage(language);

  useEffect(() => {
    axios
      .get("https://www.breakingbadapi.com/api/characters")
      .then((request) => {
        setData(request.data);
      })
      .catch((e: any) => {});
  }, []);

  return (
    <Container maxWidth="lg">
      <Header />
      <h2>{i18n("all characters")}</h2>

      {!isEmpty(data) ? (
        <CustomTable data={data} totalData={data.length} pagination={true} />
      ) : (
        <p>{i18n("no exist data")}</p>
      )}
    </Container>
  );
};

export default AllCharacters;
