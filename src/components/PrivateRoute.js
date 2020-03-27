import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import ChatRoom from "./ChatRoom";
import UserSideTab from "./UserSideTab";
import FriendBox from "./FriendBox";

export default function PrivateRoute(props) {
  const { logout } = props;
  function showFriendBox (){
    if(props.friendBoxShow){
      return <FriendBox user={props.user} chatRoomUsers={props.chatRoomUsers} whichFriend={props.whichFriend}/>
    } else {
      return null
    }
  }
  return (
    <Route
      {...props}
      render={() => {
        return localStorage.token ? (
          <div>
            <Grid>
              <Grid.Row>
                <Grid.Column width={6}>
                  <UserSideTab user={props.user} chatRoomUsers={props.chatRoomUsers}/>
                </Grid.Column>
                <Grid.Column width={3}>
                  <ChatRoom logout={logout} user={props.user} addFriendInfo={props.addFriendInfo} chatRoomUsers={props.chatRoomUsers} toggleFriendBox={props.toggleFriendBox}/>
                </Grid.Column>
                <Grid.Column width={4}>
                  {showFriendBox()}
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
