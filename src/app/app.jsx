import React, { PropTypes, Component } from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import EventPage from './eventPage';

class App extends Component {
  constructor(props, context){
    super(props, context); 
  }

  render(){
    return ( 
      <div>
        {this.props.children}
      </div>
    );
  }
}

(function () {

  //Needed for React Developer Tools
  window.React = React; 

  ReactDom.render((
    <Router>
      <Route path='/' component={App}>
        <IndexRoute component={EventPage} />
      </Route>
    </Router>
  ), document.getElementById('app'));

})();