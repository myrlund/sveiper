/**
 * @jsx React.DOM
 */

var React = require('react');
var SweeperActions = require('../actions/SweeperActions');
var SweeperStore = require('../stores/SweeperStore');
var Board = require('./Board.react');

var cx = require('react/lib/cx');

var Game = React.createClass({
  _happyMessage: 'Hurra!',
  _title: 'minesveiper',

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
    if (SweeperStore.hasStarted()) {
      this.setState({
        remainingMineCount: SweeperStore.remainingMineCount(),
        isGameOver: SweeperStore.isGameOver()
      });

      if (!SweeperStore.isGameOver() && SweeperStore.remainingSquareCount() === 0) {
        SweeperActions.runVictoryRoutine();
      }
    }
    else {
      // Restart game
      this.replaceState(this.getInitialState());
    }
  },

  _onRestart: function () {
    SweeperActions.restartGame();
  },

  render: function () {
    return (
      <div>
        <section className={cx({
          game: true,
          gameover: this.state.isGameOver
        })} style={{width: ''+(this.props.width * 1.8)+'em'}}>
          <header>
            <aside className="mines">
              {this.state.isGameOver ? this._happyMessage : this.state.remainingMineCount}
            </aside>
            <button onClick={this._onRestart}>:)</button>
            <aside className="timer">
              00
            </aside>
          </header>
          <Board width={this.props.width}
                 height={this.props.height}
                 mineCount={this.props.mineCount} />
        </section>
        <footer>
          <a href="https://github.com/myrlund/sveiper">Laget</a> av <a href="https://twitter.com/danseku">@danseku</a>
        </footer>
      </div>
    );
  }

});

module.exports = Game;
