import React, { Component } from "react";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";
// import { Route, Redirect, Link } from "react-router-dom";

export default class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  componentDidMount() {
    localStorage.removeItem("token");
    this.props.resetErrorCode();
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.login(this.state, this.props.history);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  signUpButtonClick = () => {
    this.props.history.push("/createuser");
  };

  render() {
    return (
      <>
        <Segment placeholder>
          <Grid columns={2} relaxed="very" stackable>
            <Grid.Column>
              <Form className="login-form" onSubmit={this.handleSubmit}>
                <h1>Login</h1>
                <Form.Input
                  error={this.props.error[1]}
                  label="Username"
                  icon="user"
                  name="username"
                  id="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <Form.Input
                  error={this.props.error[0]}
                  label="Password"
                  icon="lock"
                  type="password"
                  id="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <Button content="Login" primary className="button" />
              </Form>
            </Grid.Column>

            <Grid.Column verticalAlign="middle">
              <Button
                content="Sign up"
                icon="signup"
                size="big"
                className="signupButton"
                onClick={this.signUpButtonClick}
                primary
              />
            </Grid.Column>
          </Grid>

          <Divider vertical>Or</Divider>
        </Segment>
      </>
    );
  }
}
