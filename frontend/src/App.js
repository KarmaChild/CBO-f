import "./App.css";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Staff from './Staff';
import Log from './Log';


function App(){


    return(
        <Router>
            <Switch>
                <Route path="/" exact component = {Login} />
                <Route path="/Home" exact component = {Home} />
                <Route path="/Staff" exact component={Staff} />
                <Route path="/Log" exact component={Log} />
            </Switch>
        </Router>
    );
}

export default App;
