import React from "react";
import { graphql } from "gatsby";
import { List, Table, Checkbox } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

const calculateFields = [`traits`, `startingTechs`];
// const discardFields = [`startingTechs`];

const ItemList = ({ items, state }) => (
  <List as="ul">
    {items.map(tech => {
      const style = {};
      if (state[tech] > 0) {
        style.textDecoration = "line-through";
      }
      return (
        <List.Item key={tech} as="li" style={style}>
          {tech}
        </List.Item>
      );
    })}
  </List>
);

const AccumulatedStats = ({ state }) => (
  <List as="ul">
    {Object.keys(state).map(tech => {
      const count = state[tech];
      const style = {};
      if (count === 0) {
        style.color = "silver";
      } else if (count > 1) {
        style.color = "orange";
      }

      return (
        <List.Item as="li" key={tech} style={style}>
          {tech} x {count}
        </List.Item>
      );
    })}
  </List>
);
export default class Index extends React.Component {
  constructor(props) {
    super(props);

    const initialState = props.data.allCivLeader.edges.reduce(
      (acc, { node }) => {
        acc.selectedLeaders[node.leader] = false;
        return acc;
      },
      {
        selectedLeaders: {},
        startingTechs: {},
        traits: {}
      }
    );

    this.state = this.calculateTraitsAndTechs(initialState);
  }

  calculateTraitsAndTechs = state => {
    this.props.data.allCivLeader.edges.reduce((acc, { node }) => {
      calculateFields.forEach(field => {
        if (!(field in acc)) {
          acc[field] = {};
        }

        node[field].forEach(val => {
          if (!(val in acc[field])) {
            acc[field][val] = 0;
          }

          if (acc.selectedLeaders[node.leader]) {
            acc[field][val]++;
          }
        });
      });
      return acc;
    }, state);

    return state;
  };

  render() {
    const { data } = this.props;
    const { selectedLeaders, startingTechs, traits } = this.state;

    const selectedLeadersList = Object.keys(selectedLeaders)
      .filter(leader => selectedLeaders[leader])
      .map(leader => {
        return data.allCivLeader.edges.find(({ node }) => {
          return node.leader === leader;
        }).node;
      });

    return (
      <React.Fragment>
        <Table>
          <Table.Body>
            {data.allCivLeader.edges.map(({ node }) => {
              const isSelected = selectedLeaders[node.leader];

              let isDiscarded = {};
              calculateFields.forEach(field => {
                node[field].forEach(value => {
                  if (this.state[field][value]) {
                    isDiscarded[field] = true;
                  }
                });
              });

              const style = { cursor: "pointer" };

              return (
                <Table.Row
                  style={style}
                  key={node.leader}
                  onClick={e => {
                    this.setState(
                      this.calculateTraitsAndTechs({
                        selectedLeaders: {
                          ...selectedLeaders,
                          [node.leader]: !isSelected
                        }
                      })
                    );
                  }}
                >
                  <Table.Cell collapsing>
                    <Checkbox readOnly checked={isSelected} />
                  </Table.Cell>
                  <Table.Cell>
                    <img src={node.civImage} alt={node.civ} />
                  </Table.Cell>
                  <Table.Cell>{node.civ}</Table.Cell>
                  <Table.Cell>{node.uniqueUnit}</Table.Cell>
                  <Table.Cell>{node.uniqueBuilding}</Table.Cell>
                  <Table.Cell negative={isDiscarded.startingTechs}>
                    <ItemList
                      items={node.startingTechs}
                      state={startingTechs}
                    />
                  </Table.Cell>
                  <Table.Cell>{node.leader}</Table.Cell>
                  <Table.Cell negative={isDiscarded.traits}>
                    <ItemList items={node.traits} state={traits} />
                  </Table.Cell>
                  <Table.Cell>{node.favouriteCivic}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
        <div
          style={{
            position: "sticky",
            bottom: 0,
            background: "yellow",
            zIndex: 9999
          }}
        >
          <Table fixed>
            <Table.Body>
              <Table.Row>
                <Table.HeaderCell>Leaders:</Table.HeaderCell>
                <Table.Cell>
                  <List as="ul">
                    {selectedLeadersList.map(leader => {
                      return (
                        <List.Item key={leader.leader} as="li">
                          {leader.leader} ({leader.civ})
                        </List.Item>
                      );
                    })}
                  </List>
                </Table.Cell>
                <Table.HeaderCell>Starting techs:</Table.HeaderCell>
                <Table.Cell>
                  <AccumulatedStats state={startingTechs} />
                </Table.Cell>
                <Table.HeaderCell>Traits:</Table.HeaderCell>
                <Table.Cell>
                  <AccumulatedStats state={traits} />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </React.Fragment>
    );
  }
}

export const query = graphql`
  {
    allCivLeader(sort: { fields: [civ, leader] }) {
      edges {
        node {
          leader
          civ
          civImage
          uniqueUnit
          uniqueBuilding
          traits
          startingTechs
          leaderImage
          favouriteCivic
        }
      }
    }
  }
`;
