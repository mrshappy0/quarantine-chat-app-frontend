import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import CreateUser from "./components/CreateUser";
import { Header, Segment } from "semantic-ui-react";

const loginUrl = "http://localhost:3000/api/v1/login";
const profileUrl = "http://localhost:3000/api/v1/profile";
const createUserUrl = "http://localhost:3000/api/v1/users";

export default class App extends Component {
  state = {
    todos: [],
    user: {},
    error: [false, null],
    uniquenessError: [false, null]
  };

  resetErrorCode = () => {
    this.setState({
      error: [false, null]
    });
  };

  componentDidMount() {
    let { token } = localStorage;
    if (localStorage.token) {
      fetch(profileUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(result => this.setState({ user: result.user }));
    } else {
      return <Redirect to="/login" />;
    }
  }

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ user: "" });
  };

  login = (user, history) => {
    fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user })
    })
      .then(response => response.json())
      .then(r => {
        if (r.jwt) {
          localStorage.setItem("token", r.jwt);
          history.push("/");
          this.setState({
            user: r.user
          });
        } else {
          this.setState({
            error: [true, "Invalid Password or Email"]
          });
        }
      });
  };

  createUser = (user, history) => {
    fetch(createUserUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user })
    })
      .then(r => r.json())
      .then(r => {
        console.log();
        if (r.jwt) {
          localStorage.setItem("token", r.jwt);
          history.push("/");
          this.setState({
            user: r.user
          });
        } else {
          this.setState({
            uniquenessError: [true, "Username already taken!"]
          });
        }
      });
  };

  // addTodo = newTodo => {
  //   this.setState({
  //     todos: [...this.state.todos, newTodo]
  //   });
  // };

  // deleteTodo = id => {
  //   const todos = this.state.todos.filter(todo => {
  //     return todo.id !== id;
  //   });
  //   this.setState({ todos });
  // };

  render() {
    return (
      <Router>
        <div className="App">
          <Segment.Group>
            <Segment>
              <Header
                as="h2"
                block
                color="purple"
                textAlign="left"
                attached="top"
              >
                Quarantine Chat Room
              </Header>
              <Segment attached>
                This chat room was built to allow folks stuck in Quarantine to
                socialize. Create a user profile and get connected!
              </Segment>
            </Segment>
            <Segment.Group horizontal>
              <Segment>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/"
                    user={this.state.user}
                    deleteTodo={this.deleteTodo}
                    todoAction={this.addTodo}
                    logout={this.logout}
                  />
                  <Route
                    path="/login"
                    render={props => (
                      <Login
                        {...props}
                        login={this.login}
                        error={this.state.error}
                        resetErrorCode={this.resetErrorCode}
                      />
                    )}
                  />
                  <Route
                    path="/createuser"
                    render={props => (
                      <CreateUser
                        {...props}
                        createUser={this.createUser}
                        createUser={this.createUser}
                        uniquenessError={this.state.uniquenessError}
                      />
                    )}
                  />
                </Switch>
              </Segment>
            </Segment.Group>
            {/* <Segment>Coming Soon!!!!</Segment> */}
          </Segment.Group>
        </div>
      </Router>
    );
  }
}
