import React, { Component } from "react";
import {
  Button,
  Comment,
  Form,
  Header,
  Segment,
  Icon
} from "semantic-ui-react";
import { withTheme } from "styled-components";

export default class ChatRoom extends Component {
  state = {
    comments: [],
    textarea: "",
    sendToTextArea: ""
  };


//   componentDidMount(){
//     this.setState({
//         textarea: "",
//         sendToTextArea: ""
//     })
//   }

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
              <Icon name="wechat" size="x-large"></Icon>
              Chat Room
            </Header>

            <Comment>
              <Comment.Avatar src="/images/avatar/small/matt.jpg" />
              <Comment.Content>
                <Comment.Author as="a">Matt</Comment.Author>
                <Comment.Metadata>
                  <div>Today at 5:42PM</div>
                </Comment.Metadata>
                <Comment.Text>How artistic!</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>

            <Comment>
              <Comment.Avatar src="/images/avatar/small/elliot.jpg" />
              <Comment.Content>
                <Comment.Author as="a">Elliot Fu</Comment.Author>
                <Comment.Metadata>
                  <div>Yesterday at 12:30AM</div>
                </Comment.Metadata>
                <Comment.Text>
                  <p>
                    This has been very useful for my research. Thanks as well!
                  </p>
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
              <Comment.Group>
                <Comment>
                  <Comment.Avatar src="/images/avatar/small/jenny.jpg" />
                  <Comment.Content>
                    <Comment.Author as="a">Jenny Hess</Comment.Author>
                    <Comment.Metadata>
                      <div>Just now</div>
                    </Comment.Metadata>
                    <Comment.Text>
                      Elliot you are always so right :)
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
                <Comment.Author as="a">
                  {this.props.user.username}
                </Comment.Author>
                <Comment.Metadata>
                  <div>5 days ago</div>
                </Comment.Metadata>
                <Comment.Text>
                  Dude, this is awesome. Thanks so much
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
