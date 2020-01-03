
import React from 'react';
import axios from 'axios';
import Preferences from './Preferences.jsx';
import SignIn from './SignIn.jsx';
import Header from './Header.jsx';
import Home from './Home.jsx';
import CreateGroup from './CreateGroup.jsx';
import UserSettings from './UserSettings.jsx';
import Group from './Group.jsx';
import AddUserForm from './AddUserForm.jsx';
import Options from './Options.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: '',
      user: 'dot',
      userStatus: '',
      groups: [],
      dietaryRestriction: 'vegan',
      image: null,
      groupName: 'supercoolpeople',
      pricePoint: '',
      members: [],
      newMember: '',
      options: [{
        name: 'Four Barrel Rum',
        rating: 8,
        price: '$$',
        phone: '+14152520800',
        address: '375 Valencia St',
      },
      {
        name: 'Four Barrel Coffee',
        rating: 4,
        price: '$',
        phone: '+14152520800',
        address: '375 Amadee St',
      }],
      catagories: 'vegan',
      choser: '',
      showWinner: false,
    };
    this.handleViewChange = this.handleViewChange.bind(this);
    this.handlePreferenceChange = this.handlePreferenceChange.bind(this);
    this.handleSignInWithGoogle = this.handleSignInWithGoogle.bind(this);
    this.handleNewGroupName = this.handleNewGroupName.bind(this);
    this.handleNewGroupPricePoint = this.handleNewGroupPricePoint.bind(this);
    this.handleNewGroupSubmit = this.handleNewGroupSubmit.bind(this);
    this.handleUserSettings = this.handleUserSettings.bind(this);
    this.handleAddUserToGroup = this.handleAddUserToGroup.bind(this);
    this.handleNewGroupMember = this.handleNewGroupMember.bind(this);
    this.handleGetOptions = this.handleGetOptions.bind(this);
    this.getGroupMembers = this.getGroupMembers.bind(this);
    this.getUsersGroups = this.getUsersGroups.bind(this);
    this.handleGroupSetState = this.handleGroupSetState.bind(this);
    this.randomizer = this.randomizer.bind(this);
    this.handleSetState = this.handleSetState.bind(this);
    this.handleUserNameInput = this.handleUserNameInput.bind(this);
    this.handleUserStatusInput = this.handleUserStatusInput.bind(this);

  }

  componentDidMount() {
    this.getUsersGroups(this.state.user);
    this.getGroupMembers(this.state.groupName);
  }

  HandleViewChange(view) {
  handleViewChange(view) {
    console.log(`${view} button clicked`);
    this.setState({ view: `/${view}` });
  }


  HandleSignInWithGoogle() {
    axios.get('/api/login')
      .then(this.HandleViewChange('/userSettings'))
      .catch((err) => {
        console.error('error in handsigninwithgoogle', err);
      // TODO send error back to client
      });
    return window.open('/api/login', '_self');
    // axios.get('/api/login')
    // .then(console.log('success'))
    // .then(this.setState({ user: 'DOT' }))
    // .catch((err) => {
    //   console.log('error handling signin with google', err);
    // // send error back to client
    // });

    // TODO Being checked with Auth
//     axios.get('/api/login')
//       .then(this.handleViewChange('/userSettings'))
//       .catch((err) => {
//         console.error('error in handsigninwithgoogle', err);
//       // TODO send error back to client
//       });
  }

  hideToDo() {
    const hide = this;
    // wrapping to do in function so I can hide them and they do not stress me out
    // TODO axios.patch/groups:id/active toggles group active
    // TODO axios.get /choices  gives options of places to eat
    // TODO update group name .patch('/groups/:groupName/groupName'
    // TODO update group pricepoint '/groups/:groupName/pricePoint'

  // TODO get and post group history
  // TODO delete user from group .delete('/groups/:userName'
  // TODO create button to reset dietary restrictions axios.delete(/users/:usesrName/dietaryRestriction)
  // TODO delete group axios.delete('/groups)
  // TODO get all active groups .get('/groups/:userName/groups/active'
  // TODO get all inactive groups '/groups/:userName/groups/inactive'
  // TODO create button and write funciton to delete useraccount from db axios.delete(/users/:userName)
  }

  handleGetOptions() {
    const { catagories, pricePoint } = this.state;
    axios.get('/api/choices', {
      radius: 40000,
      categories: catagories,
      price: pricePoint,
    })
      .then((options) => this.setState({
        options,
      }));
  }

  handleSetState(k, v) {
    this.setState([k, v]);
    console.log("here", this.state);
  }

  handleUserSettings(k, v) {
    axios.post(`/api/users/${this.state.user}/${k}`, {
      k: v,
    }).then(this.handleSetState(k, v))
      .catch((err) => {
        console.error('error handleprefeerence change', err);
      });
    // TODO send error to client
  }

  getGroupMembers(group) {
    axios.get(`/api/groups/${group}/users`)
      .then((members) => {
        this.setState({
          members: members.data,
        });
      })
      .catch((err) => {
        console.error('getgroupmembers err', err);
      });
    // TODO send error to client
  }

  randomizer() {
    const { members } = this.state;
    const memberIndex = Math.floor(Math.random() * (members.length));
    this.setState({ choser: members[memberIndex].userName, showWinner: true });
  }

  handlePreferenceChange(k, v) {
    axios.patch(`/api/users/:${this.state.user}/${k}`, {
      k: v,
    })
      .then(this.handleSetState(k, v))
      .then(console.log(this.state))
      .catch((err) => {
        console.error('error handleprefeerence change', err);
      });
    // TODO send error to client
  }

  handleNewGroupPricePoint(newPricePoint) {
    this.setState({
      pricePoint: newPricePoint,
    });
  }

  handleNewGroupSubmit() {
    const {
      groupName, pricePoint, user,
    } = this.state;
    axios.post('/api/groups', {
      groupName,
      pricePoint,
      userName: user,
    })
      .catch((err) => {
        console.error('submiterr', err);
      });
    // TODO send error to client
  }

  handleNewGroupName(e) {
    this.setState({
      groupName: e.target.value,
    });
  }

  handleGroupSetState(groupName) {
    this.setState({ groupName });
  }

  getUsersGroups(user) {
    axios.get(`/api/users/${user}/groups`)
      .then((groupsList) => {
        this.setState((state) => {
          const groups = groupsList.data.map((group) => {
            state.groups.push(group);
            return {
              groups,
            };
          });
        })
          .catch((err) => {
            console.error('getusersgrouperr', err);
          });
      });
  }


  handleNewGroupMember(e) {
    this.setState({ newMember: e.target.value });
  }

  handleUserNameInput(e) {
    this.setState({ user: e.target.value });
  }

  handleUserStatusInput(e) {
    this.setState({ userStatus: e.target.value });
  }

  handleAddUserToGroup() {
    const { newMember } = this.state;
    axios.post('/api/user_group', {
      userName: newMember,
    })
      .catch((err) => {
        console.error('addusertogrouperr', err);
      });
  }

  render() {
    const {
      view, groups, group, members, options, groupName, pricePoint, choser, showWinner, user,
    } = this.state;
    const {
      randomizer, getGroupMembers, handleGroupSetState, handleGetOptions, handlePreferenceChange,
      handleNewGroupMember, handleSetState, handleAddUserToGroup, handleViewChange,
      handleSignInWithGoogle, handleNewGroupName, handleNewGroupPricePoint, handleNewGroupSubmit,
      handleUserSettings, handleUserNameInput, handleUserStatusInput
    } = this;
    let View;
    if (view === '/login') {
      View = <SignIn handleSignInWithGoogle={handleSignInWithGoogle}/>;
    } else if (view === '/profile') {
      View = <Preferences handleSetState={handleSetState} handleUserStatusInput={handleUserStatusInput}handleSetState={handleSetState} handleUserNameInput={handleUserNameInput}/>;
    } else if (view === '/createGroup') {
      View = <CreateGroup
      handleViewChange={handleViewChange}
      handleNewGroupName={handleNewGroupName}
      handlePreferenceChange={handlePreferenceChange}
      handleSetState={handleSetState}
      handleNewGroupPricePoint={handleNewGroupPricePoint}
      handleNewGroupSubmit={handleNewGroupSubmit}
      handleAddUserToGroup={handleAddUserToGroup}
      />;
    } else if (view === '/userSetting') {
      View = <UserSettings handleUserSettings={handleUserSettings} handleUserStatusInput={handleUserStatusInput} handleUserNameInput={handleUserNameInput}/>;
    } else if (view === '/group') {
      View = <Group user={user} group={group} groupName={groupName} groupMembers={members} pricePoint={pricePoint} handleGetOptions={handleGetOptions} getGroupMembers={getGroupMembers} handleViewChange={handleViewChange} randomizer={randomizer} choser={choser} showWinner={showWinner}/>;
    } else if (view === '/addUserToGroup') {
      View = <AddUserForm handleNewGroupMember={handleNewGroupMember} handleAddUserToGroup={handleAddUserToGroup} />;
    } else if (view === '/options') {
      View = <Options options={options}/>;
    } else {
      View = <Home groups={groups} getGroupMembers={getGroupMembers} handleViewChange={handleViewChange} handleGroupSetState={handleGroupSetState}/>;
    }

    return (
            <div>
                <Header handleViewChange={handleViewChange} />
                {View}
        </div>

    );
  }
}


export default App;
