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

  getInitialState: function() {
    return {
      cards: this.getInitialCards(),
      turn: this.props.resetBoard ? true : this.player1Turn
    }
  },

  getInitialCards: function () {
    var cards = [];
    var cardIndex;
    if (this.props.resetBoard) {
      this.player1Attempts = [];
      this.player2Attempts = [];
      this.player1Turn = true;
      this.winnerExist = false;
      for (var i = 0; i < boardCards; i++) {
        cardIndex = i + 1;
          cards.push(
            <Card
              key = {i}
              isFlipped = {false}
              cardIndex = {cardIndex}
              callback = {this.handleCard} />
          )
      }
      return cards;
    } else {
      return this.getCards();
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
            callback = {this.handleCard} />
        )
      } else if (this.player2Attempts.indexOf(cardIndex) !== -1) {
        cards.push(
          <Card
            key = {i}
            flippedBy = "player2"
            isFlipped = {true}
            cardIndex = {cardIndex}
            callback = {this.handleCard} />
        )
      } else {
        cards.push(
          <Card
            key = {i}
            isFlipped = {false}
            cardIndex = {cardIndex}
            callback = {this.handleCard} />
        )
      }

    }
    return cards;
  },

  //Adds attempt to the list with current player's attempts
  //Each attempt is marked with the card index
  registerAttempt: function(cardIndex) {
    this.player1Turn
      ? this.player1Attempts.push(cardIndex)
      : this.player2Attempts.push(cardIndex);
  },

  gameOver: function(cardIndex) {
    var attemptsToCheck = this.player1Turn
      ? this.player1Attempts
      : this.player2Attempts;
    if (attemptsToCheck.length < 3) {
      return false;
    } else {
      this.winnerExist = this.hasWinner();
      if (this.winnerExist || (attemptsToCheck.length > 4 && !this.winnerExist)) {
        return true;
      } else {
        return false;
      }
    }
  },

  hasWinner: function () {
    return winingCombinations.some(this.combinationFound);
  },

  //Returns true if the user has all the indexes in its attempts
  combinationFound: function(winingCombination) {
    var attempts = this.player1Turn
      ? this.player1Attempts
      : this.player2Attempts;
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

  handleCard: function(card) {
    this.registerAttempt(card.props.cardIndex);
    this.setState({cards: this.getCards()})
    this.checkGameStatus(card)
  },

  checkGameStatus: function(card) {
    var winnerName;
    if (!this.gameOver()) {
      this.changeTurn();
    } else {
      if (!this.winnerExist) {
        winnerName = "Draw";
      } else {
        winnerName = (this.player1Turn) ? this.props.player1Name : this.props.player2Name
      }
      this.props.sendGameInfo(winnerName);
    }
  },

  render() {
    var a1, a2;
    if (this.state.turn) {
      a1 = <Avatar color={Colors.deepOrange300} backgroundColor={Colors.purple500}>P1</Avatar>;
      a2 = <Avatar>P2</Avatar>;
    } else {
      a1 = <Avatar>P1</Avatar>;
      a2 = <Avatar color={Colors.deepOrange300} backgroundColor={Colors.purple500}>P2</Avatar>;
    }
    return (
      <div className="board">
        <List>
          <ListItem leftAvatar={a1}>{this.props.player1Name}</ListItem>
          <ListItem leftAvatar={a2}>{this.props.player2Name}</ListItem>
        </List>
        <div>{this.state.cards.slice(0, 3)}</div>
        <div>{this.state.cards.slice(3, 6)}</div>
        <div>{this.state.cards.slice(6, 9)}</div>
      </div>
    );
  }
});

export default Board;
