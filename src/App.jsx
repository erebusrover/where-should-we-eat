import React from 'react';

import Button from '@material-ui/core/Button';
import Preferences from '../src/Preferences.jsx'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render(){
        return (
        <div>
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