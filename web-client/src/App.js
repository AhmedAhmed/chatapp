import {useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import SideBar from './components/Sidebar';

import CreateChannel from './pages/create-channel';
import JoinPage from './pages/join';

import {createChannel, createMessage, clearMessages} from './store/channels/actions';
import {createUser} from './store/users/actions';

import './App.scss';

import io from "socket.io-client";
import ChatBox from './components/ChatBox';

const socket = io.connect("http://127.0.0.1:8000/");
function App(props) {
  const {
      users,
      channels,
      createMessage,
      createChannel,
      clearMessages,
      createUser
  } = props;

  const [viewer, setViewer] = useState({});
  const [currentChannel, setCurrentChannel] = useState({});

  socket.emit("message", "Hello from the client");
  socket.on('message', data => {
    console.log(data);
  });

  const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const create = () => createMessage(1, {name: 'ahmedabdihd | PABC', color: 'orange'}, 'hello');

  const handleCreateChannel = (channel) => {
    createChannel(channel);
  }

  const handleChannelSelect = (channel) => {
    setCurrentChannel(channel);
  }

  const handleCreateMessage = (message) => {
    createMessage(1, {name: 'ahmedabdihd | PABC', color: 'orange'}, message);
  }

  const handleCreateUser = ({user}) => {
    const viewer = {
      name: user,
      color: getRandomColor(),
    }
    createUser(viewer);
  }

  const getCurrentChannel = () => {
    return channels.find(channel => channel.name === props.match.params.room);
  }

  // const users = [{
  //   name: 'ahmedabdihd | PABC',
  //   color: 'orange'
  // }, {
  //   name: 'fabbrogas',
  //   color: 'magenta',
  // }, {
  //   name: '@veebo',
  //   color: 'aqua',
  // }];

  // const messages = [{
  //   text: '👋',
  //   user: users[0]
  // }, {
  //   text: 'Hi',
  //   user: users[1]
  // }, {
  //   text: 'How are you?',
  //   user: users[2]
  // }, {
  //   text: 'Good 🚀',
  //   user: users[0]
  // }];

  const userExists = () => {
    return users.length > 0;
  }

  const renderRoutes = () => {
    return userExists() ? (
      <Switch>
        <Route exact path="/" render={() => <Redirect to='/channel/general' />}/>
        <Route exact path="/channel/:room" render={props => (
          <ChatBox {...props}
            onChannelSelect={handleChannelSelect}
            onSubmit={handleCreateMessage}
            users={users}
            messages={[]}
          />
        )}/>
        <Route exact path="/create-channel" render={props => (
          <CreateChannel
            {...props} 
            onSubmit={handleCreateChannel}/>
        )}/>
      </Switch>
    ) : (
      <Switch>
        <Route exact path="/join" render={props => (
          <JoinPage
            {...props} 
            onSubmit={handleCreateUser}/>
        )}/>
        <Route path="*" render={() => <Redirect to='/join' />}/>
      </Switch>
    );
  }

  return (
    <div className="app">
      <Router>
        {userExists() && <SideBar channels={channels} onCreateChannel={() => null}/>}
        <div className="content">
            {renderRoutes()}
        </div>
      </Router>
    </div>
  );
}

const mapStateToProps = state => ({
  channels: state.channels,
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  createMessage: (channelId, user, message) => dispatch(createMessage(channelId, user, message)),
  clearMessages: () => dispatch(clearMessages()),
  createChannel: (channel) => dispatch(createChannel(channel)),
  createUser: (user) => dispatch(createUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
