/**
 * @jsx React.DOM
 */

var React = require('react');
var SweeperActions = require('../actions/SweeperActions');
var SweeperStore = require('../stores/SweeperStore');
var Board = require('./Board.react');

var Game = React.createClass({

  getInitialState: function () {
    SweeperStore.configure(this.props);

    return {
      background: this._randomBackground(),
      remainingMineCount: this.props.mineCount
    };
  },

  _randomBackground: function () {
    var backgroundCount = 3;
    return Math.floor(Math.random() * backgroundCount) + 1;
  },

  _randomizeBackground: function () {
    this.setState({
      background: this._randomBackground()
    });
  },

  componentDidMount: function() {
    SweeperStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SweeperStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    console.log(SweeperStore.remainingMineCount());
    this.setState({
      remainingMineCount: SweeperStore.remainingMineCount()
    });
  },

  render: function () {
    return (
      <section className="game" style={{width: ''+(this.props.width * 1.8)+'em'}}>
        <header>
          <h1>sindre<span className="alt">sveiper</span></h1>
          <h2 className="remaining">{this.state.remainingMineCount}</h2>
        </header>
        <Board width={this.props.width}
               height={this.props.height}
               mineCount={this.props.mineCount}
               background={this.state.background} />
      </section>
    );
  }

});

module.exports = Game;
