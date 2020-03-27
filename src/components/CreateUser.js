import React, { Component } from "react";
import { Form, Button, Divider, Image, Transition } from "semantic-ui-react";

export default class CreateUser extends Component {
  state = {
    username: "",
    password: "",
    pre_qurl: "",
    q_url: "",
    bio: "",
    visible: true
  };

  toggleVisibility = () =>
    this.setState(prevState => ({ visible: !prevState.visible }));

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    localStorage.removeItem("token");
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.createUser(this.state, this.props.history);
  };

  render() {
    const { value, visible } = this.state;
    return (
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                error={this.props.uniquenessError[1]}
                fluid
                label="Username"
                placeholder="Username"
                name="username"
                id="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <Form.Input
                error={this.props.uniquenessError[0]}
                fluid
                label="Password"
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                error={this.props.uniquenessError[0]}
                fluid
                label="Pre-Quarantine Photo"
                placeholder="Photo Url"
                id="pre_qurl"
                name="pre_qurl"
                value={this.state.pre_qurl}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                label="Quarantine Photo"
                placeholder="Photo Url"
                id="q_url"
                name="q_url"
                error={this.props.uniquenessError[0]}
                value={this.state.q_url}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.TextArea
              label="About"
              placeholder="Tell us more about you..."
              id="bio"
              name="bio"
              error={this.props.uniquenessError[0]}
              value={this.state.bio}
              onChange={this.handleChange}
            />
            <Button icon="angle double up" content="Submit" primary></Button>
          </Form>
    );
  }
}
