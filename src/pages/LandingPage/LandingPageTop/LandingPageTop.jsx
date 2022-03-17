import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/UI/Button/button";
import * as Styles from "./landingPageTop";

function LandingPageTop() {
  return (
    <Styles.LandingTopRoot>
      <Styles.Container>
        <h1>Mint Engine</h1>
        <h2>
          Seamless Connection & Interaction with Multiple Distributed Ledgers
        </h2>
        <Grid container className="gridContainer" alignItems="center">
          <Grid item xs={12} md={6}>
            <p>A gateway that connects next generation distributed ledgers.</p>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            className="arrowBoundary"
            style={{ overflow: "hidden" }}
          >
            <Styles.Arrow>
              <div className="point" />
              <div className="block" />
            </Styles.Arrow>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            className="arrowBoundary"
            style={{ overflow: "hidden", paddingBottom: "20px" }}
          >
            <Styles.LeftArrowContainer>
              <Styles.LeftArrow>
                <div className="point" />
                <div className="block" />
              </Styles.LeftArrow>
            </Styles.LeftArrowContainer>
          </Grid>
          <Grid item xs={12} md={6}>
            <p>
              Enabling interoperability between next generations distributed
              ledgers with the aid of a user friendly and streamlined interface.
            </p>
          </Grid>
        </Grid>
        <div className="buttonsContainer">
          <a href="https://app.mintengine.org/signup/" target="_blank">
            <Button style={{ marginRight: "20px" }}>get started</Button>
          </a>
          <a href="https://app.mintengine.org/login/" target="_blank">
            <Button outlined>login</Button>
          </a>
        </div>
      </Styles.Container>
    </Styles.LandingTopRoot>
  );
}
// To deploy again

export default LandingPageTop;
