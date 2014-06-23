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
  }

};

module.exports = SweeperActions;
