import React, { useEffect, useState } from "react";

import { Container } from "@material-ui/core";
import Header from "./common/Header";
import axios from "axios";
import isEmpty from "lodash/isEmpty";
import CustomTable from "./CustomTable";
import I18n from "./common/I18n";

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
      <h2>
        <I18n text="all characters" />
      </h2>

      {!isEmpty(data) ? (
        <CustomTable data={data} totalData={data.length} pagination={true} />
      ) : (
        <p>
          <I18n text="no exist data" />
        </p>
      )}
    </Container>
  );
};

export default AllCharacters;
