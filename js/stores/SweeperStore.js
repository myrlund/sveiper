/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * TodoStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var SweeperConstants = require('../constants/SweeperConstants');
var merge = require('react/lib/merge');

var LevelUtils = require('../util/level');

var CHANGE_EVENT = 'change';

var _firstClickDone = false;

function getLevel() {
  return SweeperStore.getLevel();
}

function getLevelDimensions() {
  return {
    height: getLevel().length,
    width: getLevel()[0].length
  };
}

function getSquare(coordinate) {
  return getLevel()[coordinate[0]][coordinate[1]];
}

function openSquare(coordinate) {
  var square = getSquare(coordinate);
  square.open = true;

  if (square.number === 0) {
    openNeighborSquares(coordinate);
  }
}

function explodeSquare(coordinate) {
  var square = getSquare(coordinate);
  square.exploded = true;

  openAllSquares();
}

function openAllSquares() {
  var level = getLevel();
  for (var i = 0; i < level.length; i++) {
    for (var j = 0; j < level[j].length; j++) {
      level[i][j].open = true;
    }
  }
}

function openTactical(coordinate) {
  var square = getSquare(coordinate);

  var neighborCoordinates = LevelUtils.getNeighborCoordinates(getLevelDimensions(), coordinate);
  var flaggedNeighbors = neighborCoordinates.map(getSquare)
                                            .filter(function (s) { return s.flagged; });

  if (square.number == flaggedNeighbors.length) {
    neighborCoordinates.map(getSquare)
                       .filter(function (s) { return !s.open && !s.flagged; })
                       .map(function (s) { return s.coordinate; })
                       .forEach(openSquare);
  }
}

function openNeighborSquares(coordinate) {
  var neighborCoordinates = LevelUtils.getNeighborCoordinates(getLevelDimensions(), coordinate);
  neighborCoordinates.forEach(function (coordinate) {
    if (!getSquare(coordinate).open) {
      openSquare(coordinate);
    }
  });
}

function toggleSquareFlag(coordinate) {
  var square = getSquare(coordinate);
  if (square) {
    square.flagged = !square.flagged;
  }
}

var SweeperStore = merge(EventEmitter.prototype, {

  _config: null,
  _level: null,
  _firstClickAt: null,

  configure: function (config) {
    this._config = config;
  },

  initialLevel: function () {
    return LevelUtils.placeholderLevel(this._config);
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getLevel: function () {
    if (!this._level) {
      this._level = LevelUtils.generate(this._config, this._firstClickAt);
    }

    return this._level;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register to handle all updates
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    case SweeperConstants.OPEN_SQUARE:
      if (!SweeperStore._firstClickAt) SweeperStore._firstClickAt = action.coordinate;
      openSquare(action.coordinate);
      break;

    case SweeperConstants.EXPLODE_SQUARE:
      explodeSquare(action.coordinate);
      break;

    case SweeperConstants.OPEN_TACTICAL:
      openTactical(action.coordinate);
      break;

    case SweeperConstants.TOGGLE_SQUARE_FLAG:
      toggleSquareFlag(action.coordinate);
      break;

    default:
      return true;
  }

  SweeperStore.emitChange();

  return true; // No errors.
});

module.exports = SweeperStore;
