import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import AppBar from 'material-ui/lib/app-bar';


var Modal = React.createClass({

  getInitialState: function() {
    return {
      field1Error: "player 1 nickname is required.",
      field2Error: "player 2 nickname is required.",
      player1Name: "",
      player2Name: ""
    }
  },

  handleConfirm: function () {
    if (this.state.player1Name && this.state.player2Name) {
      this.props.start(this.state.player1Name, this.state.player2Name)
    }
  },

  setPlayer1Name: function() {
    this.setState({
      field1Error: "",
      player1Name: this.refs.t1.getValue()
    })
  },
  setPlayer2Name: function() {
    this.setState({
      field2Error: "",
      player2Name: this.refs.t2.getValue()
    })
  },


  render() {
    const actions = [
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleConfirm} />
    ];

    var title = this.props.winner ? "Last winner is " + this.props.winner + ". Starting New Game..." : "New Game";
    return (
      <Dialog
        title={<AppBar title={title}/>}
        actions={actions}
        modal={false}
        open={this.props.open}>
        <TextField
          ref="t1"
          hintText="nickname"
          errorText={this.state.field1Error}
          floatingLabelText="Player 1"
          onChange={this.setPlayer1Name} />
        <br/>
        <TextField
          ref="t2"
          hintText="nickname"
          errorText={this.state.field2Error}
          floatingLabelText="Player 2"
          onChange={this.setPlayer2Name} />
      </Dialog>
  );
 }
});

export default Modal;
