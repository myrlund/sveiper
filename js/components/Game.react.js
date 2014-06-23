/**
 * @jsx React.DOM
 */

var React = require('react');
var SweeperActions = require('../actions/SweeperActions');
var SweeperStore = require('../stores/SweeperStore');
var Board = require('./Board.react');

var cx = require('react/lib/cx');

var Game = React.createClass({
  _happyMessage: 'Gratulerer med dagen!',

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
    this.setState({
      remainingMineCount: SweeperStore.remainingMineCount(),
      isGameOver: SweeperStore.isGameOver()
    });

    if (!SweeperStore.isGameOver() && SweeperStore.remainingSquareCount() === 0) {
      SweeperActions.runVictoryRoutine();
    }
  },

  render: function () {
    return (
      <div>
        <section className={cx({
          game: true,
          gameover: this.state.isGameOver
        })} style={{width: ''+(this.props.width * 1.8)+'em'}}>
          <header>
            <h1><a href="">sindre<span className="alt">sveiper</span></a></h1>
            <h2 className="remaining">
              {this.state.isGameOver ? this._happyMessage : this.state.remainingMineCount}
            </h2>
          </header>
          <Board width={this.props.width}
                 height={this.props.height}
                 mineCount={this.props.mineCount}
                 background={this.state.background} />
        </section>
        <footer>
          <a href="https://github.com/myrlund/sveiper">Laget av Jonas</a>
        </footer>
      </div>
    );
  }

});

module.exports = Game;
