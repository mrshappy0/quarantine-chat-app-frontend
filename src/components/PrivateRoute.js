import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import ChatRoom from "./ChatRoom";
import UserSideTab from "./UserSideTab";

export default function PrivateRoute(props) {
  const { logout } = props;
  return (
    <Route
      {...props}
      render={() => {
        return localStorage.token ? (
          <div>
            <Grid>
              <Grid.Row>
                <Grid.Column width={6}>
                  <UserSideTab user={props.user} />
                </Grid.Column>
                <Grid.Column width={6}>
                  <ChatRoom logout={logout} user={props.user} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}
