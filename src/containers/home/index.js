import React from "react";
import { connect } from "react-redux";
import { Actions } from "./actions";
import { bindActionCreators } from "redux";
import Modal from "@material-ui/core/Modal";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import { SimpleContainer } from "../../components/container";
import { Container } from "@material-ui/core";
import { Redirect } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addPlayerModalVisible: false,
      actualPlayer: { name: "", overall_rating: "" },
      player: "",
      trainer: "",
      columns: [
        { title: "Nombre", field: "name" },
        { title: "Valor", field: "value" },
        { title: "Rating", field: "overall_rating" }
      ]
    };
  }

  searchPlayer = player => {
    this.props.actions.buscadorSofifa({
      nombreJugador: player
    });
  };

  savePlayer = request => {
    this.props.actions.savePlayer(request);
  };

  playersTable() {
    const { reducer } = this.props;
    const { columns } = this.state;
    return (
      <MaterialTable
        isLoading={reducer.loading}
        title="Jugadores"
        columns={columns}
        data={reducer.jugadores}
        actions={[
          {
            icon: "save_alt",
            tooltip: "Guardar jugador",
            onClick: (event, rowData) => {
              this.setState({
                addPlayerModalVisible: true,
                actualPlayer: rowData
              });
            }
          }
        ]}
        localization={{
          pagination: {
            labelDisplayedRows: "{from}-{to} de {count}",
            labelRowsSelect: "filas"
          },
          toolbar: {
            nRowsSelected: "{0} fila(s) seleccionadas",
            searchTooltip: "Filtrar",
            searchPlaceholder: "Filtrar"
          },
          header: {
            actions: "Acciones"
          },
          body: {
            emptyDataSourceMessage: "No se encontraron resultados.",
            filterRow: {
              filterTooltip: "Filtrar"
            }
          }
        }}
      />
    );
  }

  addPlayerModal() {
    const { addPlayerModalVisible, actualPlayer, trainer } = this.state;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={addPlayerModalVisible}
        onClose={() => this.setState({ addPlayerModalVisible: false })}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div style={{ backgroundColor: "white" }}>
          <h2 id="simple-modal-title">{actualPlayer.name}</h2>
          <p id="simple-modal-description">{actualPlayer.overall_rating}</p>
          <TextField
            id="trainerName"
            label="Nombre del DT"
            onChange={event => this.setState({ trainer: event.target.value })}
            value={trainer}
            onKeyDown={e => {
              e.keyCode === 13 &&
                this.savePlayer({ player: actualPlayer, trainerName: trainer });
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.savePlayer({ player: actualPlayer, trainerName: trainer });
              this.setState({
                addPlayerModalVisible: false,
                actualPlayer: { name: "", overall_rating: "" },
                trainer: ""
              });
            }}
          >
            Guardar jugador
          </Button>
        </div>
      </Modal>
    );
  }

  render() {
    const { player } = this.state;
    const { reducer } = this.props;
    return (
      <SimpleContainer>
        <CardActions
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <TextField
            id="playerNameInput"
            label="Nombre del jugador"
            onChange={event => this.setState({ player: event.target.value })}
            value={player}
            onKeyDown={e => {
              e.keyCode === 13 && this.searchPlayer(player);
            }}
          />
          <Button
            id="searchPlayersButton"
            variant="contained"
            color="primary"
            onClick={() => this.searchPlayer(player)}
            size="small"
          >
            Buscar jugadores
          </Button>
        </CardActions>
        {this.playersTable()}
        {this.addPlayerModal()}
        <CardActions
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button
            id="logOutButton"
            variant="contained"
            color="primary"
            onClick={() => this.props.actions.signOutRequest()}
            size="small"
          >
            Desloguearse
          </Button>
        </CardActions>
        {reducer.signOutSuccess && <Redirect to={{ pathname: "/login" }} />}
      </SimpleContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
