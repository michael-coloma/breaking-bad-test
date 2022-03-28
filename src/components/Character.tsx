import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Container, Grid } from "@material-ui/core";

import Header from "./common/Header";
import I18n from "./common/I18n";
import axios from "axios";
import { DataAllCharacters } from "./AllCharacters";
import isEmpty from "lodash/isEmpty";

const TOP_IMAGE_HEIGHT = 400;

const Character = () => {
  const { id } = useParams();

  const [data, setData] = useState<DataAllCharacters[]>([]);

  useEffect(() => {
    axios
      .get(`https://www.breakingbadapi.com/api/characters/${id}`)
      .then((request) => {
        setData(request.data);
        console.log("log_Data: ", request);
      })
      .catch((e: any) => {});
  }, [id]);

  return (
    <Container maxWidth="lg">
      <Header />
      <h2>
        <I18n text="character" />
      </h2>
      {!isEmpty(data) ? (
        <Grid
          container
          direction="row"
          // justifyContent="center"
          alignItems="center"
          spacing={2}
          style={{ textAlign: "center" }}
        >
          <Grid item xs={12} sm={4}>
            <img
              alt="CharaterImage"
              src={data[0].img}
              height={TOP_IMAGE_HEIGHT}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <div>
              <label style={{ fontWeight: 800, marginRight: 20 }}>name:</label>
              <span>{data[0].name}</span>
            </div>

            <div>
              <label style={{ fontWeight: 800, marginRight: 20 }}>
                nickname:
              </label>
              <span>{data[0].nickname}</span>
            </div>

            <div>
              <label style={{ fontWeight: 800, marginRight: 20 }}>
                category:
              </label>
              <span>{data[0].category}</span>
            </div>

            <div>
              <label style={{ fontWeight: 800, marginRight: 20 }}>
                appeearance:
              </label>
              <span>{data[0].appearance.map((item) => item).join(",")}</span>
            </div>

            <div>
              <label style={{ fontWeight: 800, marginRight: 20 }}>
                birthday:
              </label>
              <span>{data[0].birthday}</span>
            </div>

            <div>
              <label style={{ fontWeight: 800, marginRight: 20 }}>
                occupation:
              </label>
              <span>{data[0].occupation.map((item) => item).join(",")}</span>
            </div>

            <div>
              <label style={{ fontWeight: 800, marginRight: 20 }}>
                better_call_saul_appearance:
              </label>
              <span>
                {data[0].better_call_saul_appearance
                  .map((item) => item)
                  .join(",")}
              </span>
            </div>

            <div>
              <label style={{ fontWeight: 800, marginRight: 20 }}>
                portrayed:
              </label>
              <span>{data[0].portrayed}</span>
            </div>

            <div>
              <label style={{ fontWeight: 800, marginRight: 20 }}>
                status:
              </label>
              <span>{data[0].status}</span>
            </div>
          </Grid>
        </Grid>
      ) : (
        <I18n text="no exist data" />
      )}
    </Container>
  );
};
export default Character;
