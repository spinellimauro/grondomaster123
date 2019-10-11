import React from "react";
import { connect } from "react-redux";
import { Actions } from "./actions";
import { bindActionCreators } from "redux";
import { Table, Row, Col, Card, Button, Icon, Input, Modal } from "antd";
import firebase from "firebase";
import { FirebaseConfiguration } from "../../config/firebase";
import { rowStyle, colStyle, gutter } from "./styles";
import LayoutWrapper from "../../components/layoutWrapper";
import PageHeader from "../../components/pageHeader";

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: "20px",
      marginBottom: 7,
      color: "rgba(0,0,0,0.65)"
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: "inline-block",
        color: "rgba(0,0,0,0.85)"
      }}
    >
      {title}:
    </p>
    {content != "" ? content : "-"}
  </div>
);

class Home extends React.Component {
  componentDidMount() {
    firebase.initializeApp(FirebaseConfiguration);
  }

  constructor(props) {
    super(props);
    this.state = {
      addPlayerModalVisible: false,
      actualPlayer: undefined
    };
  }

  addPlayerModal(player) {
    return (
      <Modal
        title={player.name}
        visible={this.state.addPlayerModalVisible}
        onCancel={e => {
          this.setState({
            addPlayerModalVisible: false
          });
        }}
        width={700}
        footer={null}
      >
        <Row>
          <Col md={24} style={colStyle}>
            <Row style={rowStyle}>
              <Col md={12} style={colStyle}>
                <DescriptionItem
                  title="Nivel"
                  content={player.overall_rating}
                />
                <DescriptionItem title="ID" content={player.id} />
              </Col>
              <Col md={12} style={colStyle}>
                <DescriptionItem title="Valor" content={player.value} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    );
  }

  render() {
    const { actions, reducer } = this.props;
    return (
      <LayoutWrapper>
        <PageHeader>JUGADORES</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} style={colStyle}>
            <Card>
              <Input.Search
                placeholder="Filtrar"
                onSearch={value =>
                  actions.buscadorSofifa({
                    nombreJugador: value
                  })
                }
                style={{ marginBottom: 16 }}
                enterButton
              />
              <Table
                rowKey={record => record.id}
                columns={[
                  {
                    title: "Nombre",
                    dataIndex: "name",
                    key: "name"
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
                  {
                    title: "",
                    key: "action",
                    render: (text, record) => (
                      <Button
                        onClick={() =>
                          this.setState({
                            addPlayerModalVisible: true,
                            actualPlayer: record
                          })
                        }
                      >
                        Guardar jugador <Icon type="save" />
                      </Button>
                    )
                  }
                ]}
                pagination={{ pageSize: 100 }}
                dataSource={reducer.jugadores}
              />
            </Card>
          </Col>
        </Row>
        {this.state.actualPlayer != undefined &&
          this.addPlayerModal(this.state.actualPlayer)}
      </LayoutWrapper>
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
