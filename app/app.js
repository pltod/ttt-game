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
      newGameCanceled: false,
      resetBoard: false,
      player1Name: "",
      player2Name: "",
      winner: ""
    }
  },

  cancelNewGame: function () {
    this.setState({
      newGameCanceled: true
    })
  },

  openNewGameModal: function () {
    this.setState({
      gameInProgress: false,
      newGameCanceled: false,
      resetBoard: false
    })
  },

  startNewGame: function (player1Name, player2Name) {
    this.setState({
      gameInProgress: true,
      newGameCanceled: false,
      resetBoard: true,
      player1Name: player1Name,
      player2Name: player2Name,
      winner: ""
    })
  },

  handleGameInfo: function (winner) {
    this.setState({
      winner: winner
    })
  },

  render() {
    var currentView = (this.state.gameInProgress || this.state.newGameCanceled)
      ? <Board sendGameInfo={this.handleGameInfo} resetBoard={this.state.resetBoard} player1Name={this.state.player1Name} player2Name={this.state.player2Name}/>
      : <Modal open={true} start={this.startNewGame} cancel={this.cancelNewGame}/>
    return (
      <div>
        <AppBar
           title="Tic Tac Toe with React, Material UI, and React Flipcard"
           iconElementRight={<FlatButton label="Start New Game" onClick={this.openNewGameModal}/>}
         />
        And the winner is: {this.state.winner}
        {currentView}
      </div>
    );
  }
});

export function boot() {
  ReactDOM.render(< App />, document.getElementById('body'));
}
