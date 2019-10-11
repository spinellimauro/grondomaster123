import React from "react";
import { connect } from "react-redux";
import { Actions } from "./actions";
import { bindActionCreators } from "redux";
import img from "../../assets/images/loading_spinner.gif";
import { Table } from "antd";
import firebase from 'firebase';
import { FirebaseConfiguration } from '../../config/firebase';


let styles = {
  backgroundColor: "#665EFF",
  width: "250px",
  height: "100px",
  borderRadius: "100px",
  display: "block",
  margin: "50px auto",
  fontSize: "15px",
  border: "3px solid",
  color: "white"
};

class Home extends React.Component {
  componentDidMount() {
    firebase.initializeApp(FirebaseConfiguration);
  }

  constructor(props) {
    super(props);
    this.state = {
      nombreJugador: "", 
      hover: false,
      hoverColombia : false, 
    };

    this.setNombreJugador = this.setNombreJugador.bind(this);
  }
  
  setNombreJugador (event) {
    this.setState({ nombreJugador: event.target.value });
  };

  render() {
    const { actions, reducer } = this.props;
    return (
      <div>
        <div style={{ textAlign: "center" }}>
            <label id="name">DT: {reducer.dT}</label>
            <hr />
            <label id="name">Dinero: {reducer.dinero}</label>
            <hr />
            <label id="name">Cantidad de Jugadores: {reducer.cantidadDeJugadores}</label>
        </div>

        <div style={{ textAlign: "center" }}>
            <label id ="name">Nombre jugador</label>
            <hr />
            <form>
            <input type="text" name="deporte" placeholder="Nombre jugador" value = {this.state.nombreJugador} onChange = {this.setNombreJugador}></input>
            </form>
            
        </div>

        <Table
          columns={[
            {
              title: "Nombre",
              dataIndex: "name",
          
            },
            {
              title: "Nivel",
              dataIndex: "overall_rating",
              key: "overall_rating"
            },
            {
              title: "Valor",
              dataIndex: "value",
              key: "value"
            },
          ]}
          dataSource={reducer.jugadores}
        />


        <button
          style={
            !this.state.hoverColombia
              ? styles
              : { ...styles, backgroundColor: "#FF9057" }
          }
          onMouseOut={() => {
            this.setState({ hoverColombia: false });
          }}
          onMouseOver={() => {
            this.setState({ hoverColombia: true });
          }}
          onClick={() => {
            actions.buscadorSofifa({
              nombreJugador: this.state.nombreJugador
            });
          }}
          id="buscadorSofifa"
        >
          Buscar jugador
        </button>

        <button
          style={
            !this.state.hover
              ? styles
              : { ...styles, backgroundColor: "#FF9057" }
          }
          onMouseOut={() => {
            this.setState({ hover: false });
          }}
          onMouseOver={() => {
            this.setState({ hover: true });
          }}
          onClick={() => {
            actions.getRandomName();
          }}
          id="getRandomName"
        >
          Get Random Name
        </button>
        {reducer.loading && (
          <div style={{ textAlign: "center" }}>
            <img src={img} alt="loading" />
            <h1>LOADING</h1>
          </div>
        )}
        {reducer.randomName !== null && !reducer.loading && (
          <div style={{ textAlign: "center" }}>
            <label id="name">Name: {reducer.randomName.name}</label>
            <hr />
            <label id="surname">Surname: {reducer.randomName.surname}</label>
            <hr />
            <label id="region">Region: {reducer.randomName.region}</label>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.homeReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...Actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
