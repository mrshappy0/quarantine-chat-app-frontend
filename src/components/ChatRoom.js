import React, { Component } from "react";
import {
  Button,
  Comment,
  Form,
  Header,
  Segment,
  Icon
} from "semantic-ui-react";
// import { withTheme } from "styled-components";

export default class ChatRoom extends Component {
  state = {
    comments: [],
    textarea: "",
    sendToTextArea: "",
    chatUser: ""
  };

  renderComments = (type, number) => {
    // let type = ""
    if (type == "src") {
      return this.props.chatRoomUsers[number]
        ? this.props.chatRoomUsers[number].q_url
        : null;
    } else {
      return this.props.chatRoomUsers[number]
        ? this.props.chatRoomUsers[number].username
        : null;
    }
  };

  handleLogout = e => {
    e.stopPropagation();
    this.props.logout();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  createComment = () => {
    if (this.state.textarea.length !== 0) {
      this.setState({
        sendToTextArea: this.state.textarea
      });
    }
  };

  handleClick = (e) => {
    e.stopPropagation();
    this.props.toggleFriendBox()
    this.props.addFriendInfo(e.target.innerText)
  }

  plugNewComment = () => {
    if (this.state.sendToTextArea.length !== 0) {
      return (
        <Comment>
          <Comment.Avatar src={this.props.user.q_url} />
          <Comment.Content>
            <Comment.Author as="a">{this.props.user.username}</Comment.Author>
            <Comment.Metadata>
              <div>Just now</div>
            </Comment.Metadata>
            <Comment.Text>{this.state.sendToTextArea}</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      );
    }
  };

  render() {
    return (
      <div>
        <Comment.Group>
          <Segment>
            <Header as="h3" dividing>
              <Icon name="wechat"></Icon>
              Chat Room
            </Header>

            <Comment>
              <Comment.Avatar src={this.renderComments("src", 4)} />
              <Comment.Content>
                <Comment.Author as="a" onClick={this.handleClick}>
                  {this.renderComments("author", 4)}
                </Comment.Author>
                <Comment.Metadata>
                  <div>Today at 5:42PM</div>
                </Comment.Metadata>
                <Comment.Text>I can't wait to sing and code tonight! Who is joining?</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>

            <Comment>
              <Comment.Avatar src={this.renderComments("src", 3)} />
              <Comment.Content>
                <Comment.Author as="a" onClick={this.handleClick}>
                  {this.renderComments("author", 3)}
                </Comment.Author>
                <Comment.Metadata>
                  <div>Yesterday at 12:30AM</div>
                </Comment.Metadata>
                <Comment.Text>
                  <p>
                    I'm gonna sing every song! Can't Wait!
                  </p>
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
              <Comment.Group>
                <Comment>
                  <Comment.Avatar src={this.renderComments("src", 2)} />
                  <Comment.Content>
                    <Comment.Author as="a" onClick={this.handleClick}>
                    {this.renderComments("author", 2)}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>Just now</div>
                    </Comment.Metadata>
                    <Comment.Text>
                      {this.renderComments("author", 3)} I'm motorcycling right now. Can you dig it?
                      :)
                    </Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            </Comment>

            <Comment>
              <Comment.Avatar src={this.props.user.q_url} />
              <Comment.Content>
                <Comment.Author as="a" onClick={this.handleClick}>
                  {this.props.user.username}
                </Comment.Author>
                <Comment.Metadata>
                  <div>5 days ago</div>
                </Comment.Metadata>
                <Comment.Text>
                  No, we can't dig it bruh!
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
            {this.plugNewComment()}
          </Segment>

          <Form reply>
            <Form.TextArea
              onChange={this.handleChange}
              id="textarea"
              name="textarea"
            />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
              onClick={this.createComment}
            />
            <Button
              content="Logout"
              labelPosition="left"
              icon="window close"
              primary
              onClick={this.handleLogout}
            />
          </Form>
        </Comment.Group>
      </div>
    );
  }
}
