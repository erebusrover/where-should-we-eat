
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
    };

    this.HandleViewChange = this.HandleViewChange.bind(this);
  }

  HandleViewChange(view) {
    console.log(`${view} button clicked`);
    this.setState({ view: `/${view}` }, () => {
      console.log(this.state);
      console.log('done');
    });
  }


  render() {
    const { view, groups } = this.state;
    let View;
    if (view === '/login') {
      View = <SignIn />;
    } else if (view === '/profile') {
      View = <Preferences />;
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
