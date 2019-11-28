import React from "react";
import { connect } from "react-redux";
import { Actions } from "./actions";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { SimpleContainer } from "../../components/container";
import { Container } from "@material-ui/core";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  loginRequest = request => {
    this.props.actions.userLoginRequest(request);
  };

  render() {
    const { email, password } = this.state;
    const { reducer } = this.props;
    return (
      <SimpleContainer>
        <Container
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <TextField
            id="emailInput"
            label="Email"
            maxLength={50}
            onChange={event => this.setState({ email: event.target.value })}
            value={email}
            style={{
              width: 200,
              height: 50,
              borderRadius: 15,
              fontSize: 15,
              elevation: 7,
              marginBottom: 20,
              marginTop: 15
            }}
          />
        </Container>
        <Container
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <TextField
            id="passwordInput"
            label="Contraseña"
            onChange={event => this.setState({ password: event.target.value })}
            maxLength={50}
            value={password}
            type="password"
            onKeyDown={e => {
              e.keyCode === 13 && this.loginRequest({ email, password });
            }}
            style={{
              width: 200,
              height: 50,
              borderRadius: 15,
              fontSize: 15,
              elevation: 7,
              marginBottom: 30
            }}
          />
        </Container>
        <Container
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button
            id="loginRequestButton"
            variant="contained"
            color="primary"
            onClick={() => this.loginRequest({ email, password })}
            size="large"
            style={{ marginBottom: 30 }}
          >
            Ingresar
          </Button>
          {reducer.loginSuccess && <Redirect to={{ pathname: "/home" }} />}
        </Container>
      </SimpleContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.loginReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...Actions }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
