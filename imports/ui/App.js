import React, { Component } from 'react';
import Game from './Game'

import { withTracker } from 'meteor/react-meteor-data';
import Links from '../api/links.js'
import AccountsUIWrapper from './AccountsUIWrapper.js';

class App extends Component {

  render() {

        return (
            <div>
                <AccountsUIWrapper />
                <Game/>
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
