import React, { Component } from "react";
import {
  //   Header,
  Divider,
  Image,
  Label,
  Table,
  Segment,
  Icon,
  Transition,
  Button
} from "semantic-ui-react";
import styled from "styled-components";

const Header = styled.h2`
  color: #a333c8;
`;

const src = "/images/wireframe/image.png";

export default class UserSideTab extends Component {
  state = {
    visible: true,
  };
  toggleVisibility = () => 
      this.setState(prevState => ({visible: !prevState.visible}));

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Table celled>
          <Transition visible={visible} animation="fly down" duration={1000}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Segment.Group horizontal>
                    <Segment.Group vertical>
                      <Header>Pre-Quarantine Photo: </Header>
                      <Image
                        src={this.props.user.pre_qurl}
                        centered
                        size="medium"
                      />
                      <Divider hidden />
                    </Segment.Group>
                    <Segment.Group vertical>
                      <Header>Current-Quarantine Photo: </Header>
                      <Image
                        src={this.props.user.q_url}
                        centered
                        size="medium"
                      />
                      <Divider hidden />
                    </Segment.Group>
                  </Segment.Group>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Transition>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Label>
                  <Icon name="info circle" size="large"></Icon>User Bio:{" "}
                </Label>{" "}
                "{this.props.user.bio}"
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Button
          icon={visible ? "angle double up" : "angle double down"}
          content={visible ? "Hide" : "Show"}
          onClick={this.toggleVisibility}
          primary
        />
      </div>
    );
  }
}
