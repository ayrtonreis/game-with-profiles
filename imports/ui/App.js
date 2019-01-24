import React, { Component } from 'react';
import Game from './Game'
import {Meteor} from 'meteor/meteor'

import { withTracker } from 'meteor/react-meteor-data';
import Links from '../api/bots.js'

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Profile from "./Profile";

const Header = () => (
    <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/another">Another</Link>
        </li>
    </ul>
);

class App extends Component {

  render() {
        return (
            <div>
                <Router>
                    <div>
                        {/*<Header />*/}

                        <Switch>
                            <Route exact path="/" component={Game} />
                            <Route path="/profile" component={Profile} />
                        </Switch>

                    </div>
                </Router>

            </div>

        );
      }
}

App = withTracker(() => {
    return {
        links: Links.find({}).fetch(),
    };
})(App);

export default App;
