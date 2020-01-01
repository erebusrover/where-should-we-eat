
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
      user: null,
      groups: [1, 2, 3, 4, 5],
      dietaryRestriction: null,
      image: null,
      group: {
        groupName: null,
        pricePoint: '',
      },
    };

    this.HandleViewChange = this.HandleViewChange.bind(this);
    this.HandlePreferenceChange = this.HandlePreferenceChange.bind(this);
    this.HandleSignInWithGoogle = this.HandleSignInWithGoogle.bind(this);
  }

  HandleViewChange(view) {
    console.log(`${view} button clicked`);
    this.setState({ view: `/${view}` }, () => {
      console.log(this.state);
      console.log('done');
    });
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
  }

  HandlePreferenceChange(k, v) {
    this.setState({ [k]: v }, () => {
      console.log(this.state);
    });
  }

  render() {
    const { view, groups } = this.state;
    const { HandlePreferenceChange, HandleViewChange, HandleSignInWithGoogle } = this;
    let View;
    if (view === '/login') {
      View = <SignIn HandleSignInWithGoogle={HandleSignInWithGoogle}/>;
    } else if (view === '/profile') {
      View = <Preferences PreferenceChange={HandlePreferenceChange}/>;
    } else if (view === '/createGroup') {
      View = <CreateGroup HandleViewChange={HandleViewChange}/>;
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
