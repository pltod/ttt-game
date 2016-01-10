import React from 'react';
import ReactDOM from 'react-dom';
import Board from './board';
import Modal from './modal';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';

var App = React.createClass({

  getInitialState: function() {
    return {
      gameInProgress: false,
      player1Name: "",
      player2Name: "",
      winner: ""
    }
  },

  openNewGameModal: function () {
    this.setState({
      gameInProgress: false
    })
  },

  startNewGame: function (player1Name, player2Name) {
    this.setState({
      gameInProgress: true,
      player1Name: player1Name,
      player2Name: player2Name,
      winner: ""
    })
  },

  handleGameInfo: function (winner) {
    this.setState({
      gameInProgress: false,
      winner: winner
    })
  },

  render() {
    var currentView = this.state.gameInProgress
      ? <Board sendGameInfo={this.handleGameInfo} player1Name={this.state.player1Name} player2Name={this.state.player2Name}/>
      : <Modal open={true} start={this.startNewGame} winner={this.state.winner}/>
    return (
      <div>
        <AppBar
           title="Tic Tac Toe with React, Material UI, and React Flipcard"
           iconElementRight={<FlatButton label="Start New Game" onClick={this.openNewGameModal}/>}
         />
        {currentView}
      </div>
    );
  }
});

export function boot() {
  ReactDOM.render(< App />, document.getElementById('body'));
}
