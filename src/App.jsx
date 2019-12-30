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
      },
    };

    this.HandleViewChange = this.HandleViewChange.bind(this);
    this.HandlePreferenceChange = this.HandlePreferenceChange.bind(this);
    this.HandleSignInWithGoogle = this.HandleSignInWithGoogle.bind(this);
    this.HandleNewGroupName = this.HandleNewGroupName.bind(this);
  }

  HandleViewChange(view) {
    console.log(`${view} button clicked`);
    this.setState({ view: `/${view}` }, () => {
    });
  }

  HandleSignInWithGoogle() {
    //! Being checked with Auth Dec 29
    axios.get('/api/login')
      .then(console.log('success'))
      .then(this.setState({ user: 'DOT' }))
      .then(console.log(this.state))
      .catch((err) => {
        console.log('error in handsigninwithgoogle', err);
      // send error back to client
      });
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
  }

  HandleNewGroupName(e) {
    this.setState({
      group: {
        groupName: e.target.value,
        pricePoint: this.state.group.pricePoint,
      },
    });
  }


  render() {
    const { view, groups } = this.state;
    const {
      HandlePreferenceChange, HandleViewChange, HandleSignInWithGoogle, HandleNewGroupName,
    } = this;
    let View;
    if (view === '/login') {
      View = <SignIn HandleSignInWithGoogle={HandleSignInWithGoogle}/>;
    } else if (view === '/profile') {
      View = <Preferences PreferenceChange={HandlePreferenceChange}/>;
    } else if (view === '/createGroup') {
      View = <CreateGroup HandleViewChange={HandleViewChange} HandleNewGroupName={HandleNewGroupName}/>;
    } else {
      View = <Home groups={groups}/>;
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
