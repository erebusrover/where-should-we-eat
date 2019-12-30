//! dot you are working on the on change function for the group name input there seem
//! to be a problem with event.target.value, event is undefined
//! need to figure out what react magic you want
import React from 'react';
import axios from 'axios';
import Preferences from './Preferences.jsx';
import SignIn from './SignIn.jsx';
import Header from './Header.jsx';
import Home from './Home.jsx';
import CreateGroup from './CreateGroup.jsx';
import UserSettings from './UserSettings.jsx';
import Group from './Group.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: '',
      user: 'newUser',
      groups: [1, 2, 3, 4, 5],
      dietaryRestriction: 'none',
      image: null,
      group: {
        groupName: null,
        pricePoint: '',
        members: [],
      },
    };

    this.HandleViewChange = this.HandleViewChange.bind(this);
    this.HandlePreferenceChange = this.HandlePreferenceChange.bind(this);
    this.HandleSignInWithGoogle = this.HandleSignInWithGoogle.bind(this);
    this.HandleNewGroupName = this.HandleNewGroupName.bind(this);
    this.HandleNewGroupPricePoint = this.HandleNewGroupPricePoint.bind(this);
    this.HandleNewGroupSubmit = this.HandleNewGroupSubmit.bind(this);
    this.HandleUserSettings = this.HandleUserSettings.bind(this);
  }

  HandleViewChange(view) {
    console.log(`${view} button clicked`);
    this.setState({ view: `/${view}` });
  }

  HandleSignInWithGoogle() {
    // TODO Being checked with Auth
    axios.get('/api/login')
      .then(console.log('success'))
      .then(this.setState({ user: 'DOT' }))
      .then(this.HandleViewChange('/userSettings'))
      .catch((err) => {
        console.log('error in handsigninwithgoogle', err);
      // send error back to client
      });
  }

  hideToDo() {
    const hide = this;
  // wrapping to do in function so I can hide them and they do not stress me out
  // TODO add user to group axios.post(/user_group)
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

  HandleUserSettings(k, v) {
    axios.post(`/api/users/:${this.state.user}/${k}`, {
      k: v,
    }).then(
      this.setState({ [k]: v }),
    )
      .then(
        console.log('Yay'),
      )
      .catch((err) => {
        console.error('error handleprefeerence change', err);
      });
    // TODO send error to client
  }

  GetGroupMembers(group) {
    const groupMembers = [];
    axios.get(`/api/groups/:${group}/users`)
      .then((members) => {
        members.map((member) => {
          groupMembers.push(member);
        });
      })
      .then(this.setState({
        group: {
          groupName: this.state.group.groupName,
          pricePoint: this.state.group.pricePoint,
          members: groupMembers,
        },
      }));
  }

  HandlePreferenceChange(k, v) {
    axios.patch(`/api/users/:${this.state.user}/${k}`, {
      k: v,
    })
      .then(
        this.setState({ [k]: v }),
      )
      .then(
        console.log('Yay'),
      )
      .catch((err) => {
        console.error('error handleprefeerence change', err);
      });
    // TODO send error to client
  }

  HandleNewGroupPricePoint(newPricePoint) {
    this.setState({
      group: {
        groupName: this.state.group.groupName,
        pricePoint: newPricePoint,
        members: this.state.group.members,
      },
    });
    console.log(this.state);
  }

  HandleNewGroupSubmit() {
    const { groupName, pricePoint } = this.state.group;
    axios.post('/api/groups', {
      groupName,
      pricePoint,
      userName: this.state.user,
    })
      .catch((err) => {
        console.error('submiterr', err);
      });
    // TODO send error to client
  }

  HandleNewGroupName(e) {
    this.setState({
      group: {
        groupName: e.target.value,
        pricePoint: this.state.group.pricePoint,
        members: this.state.group.members,
      },
    });
  }


  render() {
    const {
      view, groups, group, members,
    } = this.state;
    const {
      HandlePreferenceChange, HandleViewChange, HandleSignInWithGoogle, HandleNewGroupName, HandleNewGroupPricePoint, HandleNewGroupSubmit, HandleUserSettings,
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
      />;
    } else if (view === '/userSetting') {
      View = <UserSettings HandleUserSettings={HandleUserSettings}/>;
    } else if (view === '/group') {
      View = <Group group={group} groupMembers={members}/>;
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
