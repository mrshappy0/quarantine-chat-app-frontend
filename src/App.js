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
import { Helmet } from "react-helmet";

const loginUrl = "http://localhost:3000/api/v1/login";
const profileUrl = "http://localhost:3000/api/v1/profile";
const userUrl = "http://localhost:3000/api/v1/users";
console.log(React.version)
export default class App extends Component {
  state = {
    todos: [],
    user: {},
    error: [false, null],
    uniquenessError: [false, null],
    chatRoomUsers: [],
    friendBoxShow: false,
    whichFriend: null
  };

  resetErrorCode = () => {
    this.setState({
      error: [false, null]
    });
  };

  addFriendInfo = friend => {
    let friendFound = this.state.chatRoomUsers.find(
      user => user.username == friend
    );
    this.setState({
      whichFriend: friendFound
    });
  };

  toggleFriendBox = () => {
    this.setState(prevState => ({
      friendBoxShow: !prevState.friendBoxShow
    }));
  };

  pullInUserData = () => {
    let { token } = localStorage;
    if (localStorage.token) {
      fetch(userUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(users => this.setState({ chatRoomUsers: users }));
    }
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
        .then(result => this.setState({ user: result.user }))
        .then(this.pullInUserData);
    } else {
      return <Redirect to="/login" />;
    }
  }

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ user: "", chatRoomUsers: "" });
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
      })
      .then(this.pullInUserData);
  };

  createUser = (user, history) => {
    fetch(userUrl, {
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
      })
      .then(this.pullInUserData);
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Helmet>
            <title>Quarantine Chat App</title>
            <link rel="icon" type="png" href="./logo.png" />
          </Helmet>
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
                    chatRoomUsers={this.state.chatRoomUsers}
                    friendBoxShow={this.state.friendBoxShow}
                    toggleFriendBox={this.toggleFriendBox}
                    addFriendInfo={this.addFriendInfo}
                    whichFriend={this.state.whichFriend}
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
