
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
      groups: [{
        groupp_id: 1, groupName: 'supercoolpeople', active: 1, choice: null, pricePoint: '$',
      }],
      dietaryRestriction: 'vegan',
      image: null,
      groupName: 'supercoolpeople',
      pricePoint: '',
      members: [],
      newMember: '',
      options: [],
      catagories: 'vegan',
    };

    this.HandleViewChange = this.HandleViewChange.bind(this);
    this.HandlePreferenceChange = this.HandlePreferenceChange.bind(this);
    // this.HandleSignInWithGoogle = this.HandleSignInWithGoogle.bind(this);
    this.HandleNewGroupName = this.HandleNewGroupName.bind(this);
    this.HandleNewGroupPricePoint = this.HandleNewGroupPricePoint.bind(this);
    this.HandleNewGroupSubmit = this.HandleNewGroupSubmit.bind(this);
    this.HandleUserSettings = this.HandleUserSettings.bind(this);
    this.HandleAddUserToGroup = this.HandleAddUserToGroup.bind(this);
    this.HandleNewGroupMember = this.HandleNewGroupMember.bind(this);
    this.HandleGetOptions = this.HandleGetOptions.bind(this);
    this.GetGroupMembers = this.GetGroupMembers.bind(this);
    this.GetUsersGroups = this.GetUsersGroups.bind(this);
  }

  componentDidMount() {
    this.GetUsersGroups(this.state.user);
    this.GetGroupMembers(this.state.groupName);
  }

  HandleViewChange(view) {
    console.log(`${view} button clicked`);
    this.setState({ view: `/${view}` });
  }

  HandleSignInWithGoogle() {
    return window.open('/api/login', '_self');
    // axios.get('/api/login')
    // .then(console.log('success'))
    // .then(this.setState({ user: 'DOT' }))
    // .catch((err) => {
    //   console.log('error handling signin with google', err);
    // // send error back to client
    // });
    // TODO Being checked with Auth
    axios.get('/api/login')
      .then(this.HandleViewChange('/userSettings'))
      .catch((err) => {
        console.error('error in handsigninwithgoogle', err);
      // TODO send error back to client
      });
  }

  hideToDo() {
    const hide = this;
  // wrapping to do in function so I can hide them and they do not stress me out
  // TODO get all members from given group axios.get(/groups/:groupName/users)
  // TODO get all groups from given user axios.get(/groups/:userName/groups)
  // TODO get all active groups .get('/groups/:userName/groups/active'
  // TODO get all inactive groups '/groups/:userName/groups/inactive'
  // TODO axios.patch/groups:id/active toggles group active
  // TODO axios.get /choices  gives options of places to eat
  // TODO update group name .patch('/groups/:groupName/groupName'
  // TODO update group pricepoint '/groups/:groupName/pricePoint'
  // TODO get and post group history
  // TODO delete user from group .delete('/groups/:userName'
  // TODO create button to reset dietary restrictions axios.delete(/users/:usesrName/dietaryRestriction)
  // TODO delete group axios.delete('/groups)
  // TODO create button and write funciton to delete useraccount from db axios.delete(/users/:userName)
  }

  HandleGetOptions() {
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

  HandleUserSettings(k, v) {
    axios.post(`/api/users/${this.state.user}/${k}`, {
      k: v,
    }).then(
      this.setState({ [k]: v }),
    )
      .catch((err) => {
        console.error('error handleprefeerence change', err);
      });
    // TODO send error to client
  }

  GetGroupMembers(group) {
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

  HandlePreferenceChange(k, v) {
    axios.patch(`/api/users/:${this.state.user}/${k}`, {
      k: v,
    })
      .then(
        this.setState({ [k]: v }),
      )
      .catch((err) => {
        console.error('error handleprefeerence change', err);
      });
    // TODO send error to client
  }

  HandleNewGroupPricePoint(newPricePoint) {
    this.setState({
      pricePoint: newPricePoint,
    });
  }

  HandleNewGroupSubmit() {
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

  HandleNewGroupName(e) {
    this.setState({
      groupName: e.target.value,
    });
  }

  GetUsersGroups(user) {
    axios.get(`/api/users/${user}/groups`)
      .then((groupsList) => {
        this.setState((state) => {
          const groups = groupsList.data.map((group) => {
            state.groups.push(group);
            return {
              groups,
            };
          })
        })
          .catch((err) => {
            console.error('getusersgrouperr', err);
          });
      });
  }


  HandleNewGroupMember(e) {
    this.setState({ newMember: e.target.value });
  }

  HandleAddUserToGroup() {
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
      view, groups, group, members, options, groupName, pricePoint,
    } = this.state;
    const {
      GetGroupMembers, HandleGetOptions, HandlePreferenceChange, HandleNewGroupMember, HandleAddUserToGroup, HandleViewChange, HandleSignInWithGoogle, HandleNewGroupName, HandleNewGroupPricePoint, HandleNewGroupSubmit, HandleUserSettings,
    } = this;
    let View;
    if (view === '/login') {
      View = <SignIn HandleSignInWithGoogle={HandleSignInWithGoogle}/>;
    } else if (view === '/profile') {
      View = <Preferences PreferenceChange={HandlePreferenceChange}/>;
    } else if (view === '/createGroup') {
      View = <CreateGroup
      HandleViewChange={HandleViewChange}
      HandleNewGroupName={HandleNewGroupName}
      HandlePreferenceChange={HandlePreferenceChange}
      HandleNewGroupPricePoint={HandleNewGroupPricePoint}
      HandleNewGroupSubmit={HandleNewGroupSubmit}
      HandleAddUserToGroup={HandleAddUserToGroup}
      />;
    } else if (view === '/userSetting') {
      View = <UserSettings HandleUserSettings={HandleUserSettings}/>;
    } else if (view === '/group') {
      View = <Group group={group} groupName={groupName} groupMembers={members} pricePoint={pricePoint} HandleGetOptions={HandleGetOptions} GetGroupMembers={GetGroupMembers} HandleViewChange={HandleViewChange}/>;
    } else if (view === '/addUserToGroup') {
      View = <AddUserForm HandleNewGroupMember={HandleNewGroupMember} HandleAddUserToGroup={HandleAddUserToGroup} />;
    } else if (view === '/options') {
      View = <Options options={options}/>;
    } else {
      View = <Home groups={groups} HandleViewChange={HandleViewChange}/>;
    }

    return (
            <div>
                <Header HandleViewChange={HandleViewChange} />
                {View}
        </div>

    );
  }
}


export default App;
