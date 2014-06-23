/**
 * @jsx React.DOM
 */

var React = require('react');
var SweeperActions = require('../actions/SweeperActions');
var SweeperStore = require('../stores/SweeperStore');
var Square = require('./Square.react');

var Board = React.createClass({

  getDefaultProps: function () {
    return {
      width: 9,
      height: 9
    };
  },

  getInitialState: function () {
    return {
      level: SweeperStore.initialLevel()
    };
  },

  componentDidMount: function() {
    SweeperStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SweeperStore.removeChangeListener(this._onChange);
  },

  _onChange: function(e) {
    if (SweeperStore.hasStarted()) {
      this.setState({
        level: SweeperStore.getLevel()
      });
    }
    else {
      // Game reset
      this.replaceState(this.getInitialState());
    }
  },

  /**
   * @return {object}
   */
  render: function() {
    var level = this.state.level;
    var outputRows = [];

    for (var i = 0; i < level.length; i++) {
      var row = [];

      for (var j = 0; j < level[i].length; j++) {
        var square = level[i][j];
        row.push(
          <Square
            number={square.number}
            isOpen={square.open}
            isFlagged={square.flagged}
            isMine={square.mine}
            exploded={square.exploded}
            coordinate={[i, j]}
            key={[i, j]} />
        )
      }

      outputRows.push(
        <li key={'row-'+i}>{row}</li>
      );
    }

    return (
      <section className="board">
        <ul className="rows">{outputRows}</ul>
        <div style={{clear: 'both'}} />
      </section>
    );
  }

});

module.exports = Board;
