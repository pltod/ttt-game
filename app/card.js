import React from 'react';
import DOM from 'react-dom';
import FlipCard from 'react-flipcard';
import X from 'material-ui/lib/svg-icons/content/clear';
import O from 'material-ui/lib/svg-icons/image/panorama-fish-eye';
import Colors from 'material-ui/lib/styles/colors';
import Paper from 'material-ui/lib/paper';

const iconStyles = {
  width: "100px",
  height: "100px"
};
const cardFrontStyle = {
  height: 100,
  width: 100,
  backgroundColor: '#FFECB3',
  textAlign: 'center',
  display: 'inline-block'
};
const cardBackStyle = {
  height: 100,
  width: 100,
  backgroundColor: '#FFC107',
  textAlign: 'center',
  display: 'inline-block'
};

var Card = React.createClass({
  showBack() {
    this.props.callback(this);
  },

  render() {
    var flippedBy = this.props.flippedBy;
    var icon;
    if (this.props.isFlipped) {
      icon = (flippedBy === "player1")
        ? <X style={iconStyles} color={Colors.white}/>
        : <O style={iconStyles} color={Colors.white}/>
    }

    return (
      <FlipCard
        disabled={true}
        flipped={this.props.isFlipped}>

        <div>
          <Paper
            onClick={this.showBack}
            style={cardFrontStyle}
            zDepth={5}/>
        </div>

        <div>
          <Paper
            style={cardBackStyle}
            zDepth={2}>
            {icon}
          </Paper>
        </div>

      </FlipCard>
    );
  }
});

export default Card;
