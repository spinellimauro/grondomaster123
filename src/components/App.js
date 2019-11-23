import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Home from "../containers/home";
import firebase from "firebase";
import { FirebaseConfiguration } from "../config/firebase";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://google.com.ar/">
        GrondoMaster
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default class App extends Component {
  UNSAFE_componentWillMount() {
    firebase.initializeApp(FirebaseConfiguration);
  }
  render() {
    return (
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Grondo Master
          </Typography>
          <Home />
          <Copyright />
        </Box>
      </Container>
    );
  }
}
