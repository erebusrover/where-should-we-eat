
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
      user: 'default',
      groups: [1, 2, 3, 4, 5],
      dietaryRestriction: 'vegan',
      image: null,
      group: {
        groupName: 'supercoolpeople',
        pricePoint: '',
        members: [],
        newMember: '',
        options: [],
        catagories: 'vegan',
      },
    };

    this.HandleViewChange = this.HandleViewChange.bind(this);
    this.HandlePreferenceChange = this.HandlePreferenceChange.bind(this);
    this.HandleSignInWithGoogle = this.HandleSignInWithGoogle.bind(this);
    this.HandleNewGroupName = this.HandleNewGroupName.bind(this);
    this.HandleNewGroupPricePoint = this.HandleNewGroupPricePoint.bind(this);
    this.HandleNewGroupSubmit = this.HandleNewGroupSubmit.bind(this);
    this.HandleUserSettings = this.HandleUserSettings.bind(this);
    this.HandleAddUserToGroup = this.HandleAddUserToGroup.bind(this);
    this.HandleNewGroupMember = this.HandleNewGroupMember.bind(this);
    this.HandleGetOptions = this.HandleGetOptions.bind(this);
    this.GetGroupMembers = this.GetGroupMembers.bind(this);
  }

  componentDidMount() {
    this.GetGroupMembers(this.state.group.groupName);
  }

  HandleViewChange(view) {
    console.log(`${view} button clicked`);
    this.setState({ view: `/${view}` });
  }

  HandleSignInWithGoogle() {
    // TODO Being checked with Auth
    axios.get('/api/login')
      // .then(this.setState({ user: 'DOT' })).then(console.log('success'))
      .then(this.HandleViewChange('/userSettings'))
      .catch((err) => {
        console.log('error in handsigninwithgoogle', err);
      // send error back to client
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
    const {
      groupName, pricePoint, members, newMember, catagories,
    } = this.state.group;
    axios.get('/api/choices', {
      radius: 40000,
      categories: catagories,
      price: pricePoint,
    })
      .then((options) => this.setState({
        group: {
          groupName,
          pricePoint,
          members,
          options,
          newMember,
          catagories,
        },
      }))
      .then(console.log(this.state));
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
    const { groupName, pricePoint } = this.state.group;
     axios.get(`/api/groups/${group}/users`)
.then(response => {
  console.log(response)
})
      .then((members) => {
        this.setState({
          group: {
            groupName,
            pricePoint,
            members,
          },
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
      .then(
        console.log('Yay'),
      )
      .catch((err) => {
        console.error('error handleprefeerence change', err);
      });
    // TODO send error to client
  }

  HandleNewGroupPricePoint(newPricePoint) {
    const {
      groupName, members, newMember, options, catagories,
    } = this.state.group;
    this.setState({
      group: {
        groupName,
        pricePoint: newPricePoint,
        members,
        newMember,
        options,
        catagories,
      },
    });
  }

  HandleNewGroupSubmit() {
    const {
      groupName, pricePoint, members, newMember, options, catagories,
    } = this.state.group;
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
    const {
      pricePoint, members, newMember, options, catagories,
    } = this.state.group;
    this.setState({
      group: {
        groupName: e.target.value,
        pricePoint,
        members,
        newMember,
        options,
        catagories,
      },
    });
  }

  HandleNewGroupMember(e) {
    const { groupName, pricePoint, members } = this.state.group;
    this.setState({
      group: {
        groupName,
        pricePoint,
        members,
        newMember: e.target.value,
      },
    });
  }

  HandleAddUserToGroup() {
    const { groupName, newMember } = this.state.group;
    axios.post('/api/user_group', {
      userName: newMember,
      groupName,
    })
      .catch((err) => {
        console.error('addusertogrouperr', err);
      });
  }

  render() {
    const {
      view, groups, group,
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
      View = <Group group={group} HandleGetOptions={HandleGetOptions} GetGroupMembers={GetGroupMembers} HandleViewChange={HandleViewChange} HandleGetOptions={HandleGetOptions}/>;
    } else if (view === '/addUserToGroup') {
      View = <AddUserForm HandleNewGroupMember={HandleNewGroupMember} HandleAddUserToGroup={HandleAddUserToGroup} />;
    } else if (view === '/options') {
      View = <Options options={this.state.group.options}/>;
    } else {
      View = <Home groups={groups} HandleViewChange={HandleViewChange} GetGroupMembers={GetGroupMembers}/>;
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
