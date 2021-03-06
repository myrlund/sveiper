/**
 * SweeperActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var SweeperConstants = require('../constants/SweeperConstants');

var SweeperActions = {

  /**
   * @param  {string} text
   */
  openSquare: function(coordinate) {
    AppDispatcher.handleViewAction({
      actionType: SweeperConstants.OPEN_SQUARE,
      coordinate: coordinate
    });
  },

  explodeSquare: function(coordinate) {
    AppDispatcher.handleViewAction({
      actionType: SweeperConstants.EXPLODE_SQUARE,
      coordinate: coordinate
    });
  },

  openTactical: function (coordinate) {
    AppDispatcher.handleViewAction({
      actionType: SweeperConstants.OPEN_TACTICAL,
      coordinate: coordinate
    });
  },

  toggleSquareFlag: function (coordinate) {
    AppDispatcher.handleViewAction({
      actionType: SweeperConstants.TOGGLE_SQUARE_FLAG,
      coordinate: coordinate
    });
  },

  runVictoryRoutine: function () {
    AppDispatcher.handleViewAction({
      actionType: SweeperConstants.VICTORY_ROUTINE
    });
  },

  restartGame: function () {
    AppDispatcher.handleViewAction({
      actionType: SweeperConstants.RESTART_GAME
    });
  }

};

module.exports = SweeperActions;
