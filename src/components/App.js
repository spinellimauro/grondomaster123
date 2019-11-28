import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Home from "../containers/home";
import Login from "../containers/login";
import firebase from "firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FirebaseConfiguration } from "../config/firebase";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { getUser } from "../services/loginService";
import { Actions } from "../redux/global/actions";

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

const isAuthenticated = () => {
  const listener = firebase.auth().onAuthStateChanged(user => {
    if (user) {
      return true;
    }
    return false;
  });
};

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated() ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
      }
    />
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isAuthenticated: false
    };
  }

  setUser = async uid => {
    const { actions } = this.props;
    const user = await getUser(uid);
    actions.setUser(user);
  };

  UNSAFE_componentWillMount() {
    firebase.initializeApp(FirebaseConfiguration);

    const listener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setUser(user.uid);
        this.setState({ isAuthenticated: true });
      } else {
        this.setState({ isAuthenticated: false });
      }
      this.props.actions.setVerifyAuthListener(listener);
      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Grondo Master
          </Typography>
          <BrowserRouter>
            <Switch>
              <Route path="/login" exact component={() => <Login />} />
              <Route path="/home" exact component={() => <Home />} />
              {this.state.loading ? (
                <CircularProgress />
              ) : !this.state.isAuthenticated ? (
                <Redirect to={{ pathname: "/login" }} />
              ) : (
                <Redirect to={{ pathname: "/home" }} />
              )}
            </Switch>
          </BrowserRouter>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.globalReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...Actions }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
