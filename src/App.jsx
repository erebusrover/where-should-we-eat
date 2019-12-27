import React from 'react';
//change for the sake of change
import Button from '@material-ui/core/Button';
import Preferences from '../src/Preferences.jsx';
import SignIn from './SignIn.jsx';
import Header from './Header.jsx'
import Home from './Home.jsx';

// cosnt views = ['/Preferences', '/Login', '/Home']

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view:'', 
            groups: [1,2,3,4,5],
        };

        this.HandleViewChange = this.HandleViewChange.bind(this);
    }
    
    HandleViewChange(view){
        console.log(`${view} button clicked`)
        this.setState({view:`/${view}`}, () => {
            console.log(this.state)
            console.log('done')
        })
    }
  

    render(){
        let {view, groups} = this.state
        return (
            <div>
                <Header HandleViewChange={this.HandleViewChange} />
            <Home groups={groups}/>
            <div>{view === '/login' ? <SignIn /> : <Preferences />}</div>
            <Button variant="contained" color="primary">
                Hello World
            </Button>
        </div>
)
    }
}
export default App;