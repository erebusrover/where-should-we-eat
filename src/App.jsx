
import React from 'react';
import Preferences from './Preferences.jsx';
import SignIn from './SignIn.jsx';
import Header from './Header.jsx';
import Home from './Home.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: '',
      groups: [1, 2, 3, 4, 5],
      dietaryRestriction: null,
      image: null,
    };

    this.HandleViewChange = this.HandleViewChange.bind(this);
    this.HandlePreferenceChange = this.HandlePreferenceChange.bind(this);
  }

  HandleViewChange(view) {
    console.log(`${view} button clicked`);
    this.setState({ view: `/${view}` }, () => {
      console.log(this.state);
      console.log('done');
    });
  }

  HandlePreferenceChange(k, v) {
   
    this.setState({ [k]: v }, () => {
      console.log(this.state);
    });
  }

  render() {
    const { view, groups } = this.state;
    const { HandlePreferenceChange } = this;
    let View;
    if (view === '/login') {
      View = <SignIn />;
    } else if (view === '/profile') {
      View = <Preferences PreferenceChange={HandlePreferenceChange}/>;
    } else {
      View = <Home groups={groups}/>;
    }

    return (
            <div>
                <Header HandleViewChange={this.HandleViewChange} />
                {View}
        </div>

    );
  }
}


export default App;
