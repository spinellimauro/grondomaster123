import React, { Component } from "react";
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

class Router extends Component {
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
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={() => <Login />} />
          <Route
            path={this.state.isAuthenticated ? "/home" : "/login"}
            exact
            component={() => <Home />}
          />
          {this.state.loading ? (
            <CircularProgress />
          ) : !this.state.isAuthenticated ? (
            <Redirect to={{ pathname: "/login" }} />
          ) : (
            <Redirect to={{ pathname: "/home" }} />
          )}
        </Switch>
      </BrowserRouter>
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

export default connect(mapStateToProps, mapDispatchToProps)(Router);
