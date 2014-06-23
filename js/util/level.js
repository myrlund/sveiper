
function coordinateEncoder(config) {
  return function (coordinate) {
    return coordinate[0] * config.width + coordinate[1];
  };
}
function coordinateDecoder(config) {
  return function (encodedCoordinate) {
    return [Math.floor(encodedCoordinate / config.width), (encodedCoordinate % config.width)];
  };
}

function mineTester(config, mines) {
  var encodeCoordinate = coordinateEncoder(config);

  return function (coordinate) {
    return mines.indexOf(encodeCoordinate(coordinate)) !== -1;
  };
}

function hasCoordinate(arr, c) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][0] === c[0] && arr[i][1] === c[1]) {
      return true;
    }
  }
  return false;
}

function remainingMineCount(level) {
  var flatLevel = level.reduce(function (a, b) {
    return a.concat(b);
  });

  var flagCount = flatLevel.filter(function (s) {
    return s.flagged;
  }).length;
  var totalMineCount = flatLevel.filter(function (s) {
    return s.mine;
  }).length;

  return totalMineCount - flagCount;
}

function randomizedMines(config, blankCoordinate) {
  var tileCount = config.height * config.width;
  var decodeCoordinate = coordinateDecoder(config);
  var freeCoordinates = getNeighborCoordinates(config, blankCoordinate);

  var mines = [];
  while (mines.length < config.mineCount) {
    var mine = Math.floor(Math.random() * tileCount);

    var mineCoordinate = decodeCoordinate(mine);

    if (mines.indexOf(mine) === -1 &&
        !hasCoordinate(freeCoordinates, mineCoordinate)) {
      mines.push(mine);
    }
  }
  return mines;
}

function isNotCoordinateTester(referenceCoordinate) {
  return function (coordinate) {
    return referenceCoordinate[0] !== coordinate[0] ||
           referenceCoordinate[1] !== coordinate[1];
  };
}

function generateNewLevel(config, blankCoordinate) {
  var mines = randomizedMines(config, blankCoordinate);
  var coordinateHasMine = mineTester(config, mines);

  var level = [];
  for (var i = 0; i < config.height; i++) {
    var row = [];
    for (var j = 0; j < config.width; j++) {
      var isMine = coordinateHasMine([i, j]);
      var number = null;

      if (!isMine) {
        var neighborCoordinates = getNeighborCoordinates(config, [i, j])
                                    .filter(isNotCoordinateTester([i, j]));
        number = neighborCoordinates.filter(coordinateHasMine)
                                    .length;
      }

      row.push({
        coordinate: [i, j],
        mine: isMine,
        number: number,
        open: false,
        flagged: false
      });
    }

    level.push(row);
  }

  return level;
}

function placeholderLevel(config) {
  var level = [];
  for (var i = 0; i < config.height; i++) {
    var row = [];
    for (var j = 0; j < config.width; j++) {
      row.push({coordinate: [i, j]});
    }
    level.push(row);
  }
  return level;
}

function getNeighborCoordinates(config, coordinate) {
  var relativeIndices = [-1, 0, 1];

  // Returns a function to use for filtering.
  var isWithin = function (low, high) {
    return function (n) {
      return n >= low && n <= high;
    };
  };

  var relevantRows = relativeIndices.map(function (ri) { return coordinate[0] + ri; })
                                    .filter(isWithin(0, config.height - 1));
      relevantCols = relativeIndices.map(function (ri) { return coordinate[1] + ri; })
                                    .filter(isWithin(0, config.width - 1));

  var coords = relevantRows.reduce(function (rels, rowIndex) {
    return rels.concat(relevantCols.map(function (colIndex) { return [rowIndex, colIndex] }));
  }, []);

  return coords;
}


module.exports = {
  generate: generateNewLevel,
  placeholderLevel: placeholderLevel,
  getNeighborCoordinates: getNeighborCoordinates,
  remainingMineCount: remainingMineCount
};
