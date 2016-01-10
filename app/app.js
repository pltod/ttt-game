import React from 'react';
import ReactDOM from 'react-dom';

var App = React.createClass({
   render() {
     return (<div>Hello Tic Tac Toe Game</div>);
   }
});


export function boot() {
  ReactDOM.render(
      <App />, document.getElementById('body')
  );  
}