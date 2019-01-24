import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '/imports/redux/store/reducer';
import App from '/imports/ui/App'

const store = createStore(rootReducer, applyMiddleware(thunk));

Meteor.startup(() => {
  render(
      <Provider store={store}>
          <App />
      </Provider>,
      document.getElementById('root')
  );
});