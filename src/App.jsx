import React from 'react';
//change for the sake of change
import Button from '@material-ui/core/Button';
import Preferences from '../src/Preferences.jsx';
import SignIn from './SignIn.jsx';
import Header from './Header.jsx'
// import Home from './Home.jsx';

// cosnt views = ['/Preferences', '/Login', '/Home']

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view:'', 
            groups: [1,2,3,4,5],
        };

        this.HandleLoginView = this.HandleLoginView.bind(this);
    }
    


    HandleLoginView(){
        console.log('clicked')
        this.setState({view: '/Login'}, () => {
            console.log('error')
        })
    }
  

    render(){
        let {view} = this.state
        return (
            <div>
                <Header handleLoginClick={this.HandleLoginView} />
            {/* <Home groups={this.state.groups}/> */}
            <div>{view === '/Login' ? <SignIn /> : <Preferences />}</div>
            <Button variant="contained" color="primary">
                Hello World
            </Button>
            <Preferences />
        </div>
)
    }
}
export default App;