import React from 'react';
import Card from './card';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';

//Combinations of card indexes that denotes win
//Win happens when the user has all of the indexes part of particular combination in its attempts
var winingCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
var boardCards = 9;

var Board = React.createClass({

  player1Attempts: [],

  player2Attempts: [],

  player1Turn: true,

  winnerExist: false,

  reset: function () {
    this.player1Attempts = [];
    this.player2Attempts = [];
    this.player1Turn = true;
    this.winnerExist = false;
  },

  getInitialState: function() {
    return {
      needToReset: true,
      player1Turn: true
    }
  },

  getCards: function() {
    var cards = [];
    var cardIndex;
    for (var i = 0; i < boardCards; i++) {
      cardIndex = i + 1;
      if (this.player1Attempts.indexOf(cardIndex) !== -1) {
        cards.push(
          <Card
            key = {i}
            flippedBy = "player1"
            isFlipped = {true}
            cardIndex = {cardIndex}
            callback = {this.handleCardFlip} />
        )
      } else if (this.player2Attempts.indexOf(cardIndex) !== -1) {
        cards.push(
          <Card
            key = {i}
            flippedBy = "player2"
            isFlipped = {true}
            cardIndex = {cardIndex}
            callback = {this.handleCardFlip} />
        )
      } else {
        cards.push(
          <Card
            key = {i}
            isFlipped = {false}
            cardIndex = {cardIndex}
            callback = {this.handleCardFlip} />
        )
      }

    }
    return cards;
  },

  handleCardFlip: function(cardIndex) {
    this.registerAttempt(cardIndex);
    this.checkGameStatus()
  },

  //Adds attempt to the list with current player's attempts
  //Each attempt is marked with the card index
  registerAttempt: function(cardIndex) {
    this.player1Turn ? this.player1Attempts.push(cardIndex) : this.player2Attempts.push(cardIndex);
    this.setState({needToReset: false, player1Turn: !this.state.player1Turn})
  },

  checkGameStatus: function() {
    this.gameOver() ? this.props.sendGameInfo(this.getWinnerName()) : this.changeTurn();
  },

  getWinnerName: function () {
    if (this.winnerExist) {
      return (this.player1Turn) ? this.props.player1Name : this.props.player2Name
    } else {
      return "Draw";
    }
  },

  gameOver: function(cardIndex) {
    var attemptsToCheck = this.player1Turn ? this.player1Attempts : this.player2Attempts;
    if (attemptsToCheck.length < 3) {
      return false;
    } else {
      this.winnerExist = this.hasWinner();
      return (this.winnerExist || (attemptsToCheck.length > 4 && !this.winnerExist));
    }
  },

  hasWinner: function () {
    return winingCombinations.some(this.combinationFound);
  },

  //Returns true if the user has all the indexes in its attempts
  combinationFound: function(winingCombination) {
    var attempts = this.player1Turn ? this.player1Attempts : this.player2Attempts;
    return !winingCombination.some(function(cardIndex) {
      return !(attempts.indexOf(cardIndex) !== -1);
    });
  },

  //Change the current player
  changeTurn: function() {
    this.player1Turn = !this.player1Turn;
    this.setState({
      turn: this.player1Turn
    })
  },

  render() {
    if (this.state.needToReset) {
      this.reset();
    }
    var cards = this.getCards();
    var a1, a2;
    if (this.state.player1Turn) {
      a1 = <Avatar color={Colors.amber100} backgroundColor={Colors.cyan500}>P1</Avatar>;
      a2 = <Avatar>P2</Avatar>;
    } else {
      a1 = <Avatar>P1</Avatar>;
      a2 = <Avatar color={Colors.amber100} backgroundColor={Colors.cyan500}>P2</Avatar>;
    }
    return (
      <div className="board">
        <List>
          <ListItem leftAvatar={a1}>{this.props.player1Name}</ListItem>
          <ListItem leftAvatar={a2}>{this.props.player2Name}</ListItem>
        </List>
        <div>{cards.slice(0, 3)}</div>
        <div>{cards.slice(3, 6)}</div>
        <div>{cards.slice(6, 9)}</div>
      </div>
    );
  }
});

export default Board;
