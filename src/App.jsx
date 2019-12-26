import React from 'react';

import Button from '@material-ui/core/Button';
import Preferences from '../src/Preferences.jsx'

import Home from './Home'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view:'', 
            groups: [1,2,3,4,5],
        };
    }
    
    render(){
        return (
            <div>
            <Home groups={this.state.groups}/>
            <h1>HI DOT</h1>
            <Button variant="contained" color="primary">
                Hello World
            </Button>
            <Preferences />
        </div>
)
    }
}
export default App;