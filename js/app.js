/**
 * @jsx React.DOM
 */

var React = require('react');

// var TodoApp = require('./components/Square.react');
// var Square = require('./components/Square.react');
var Board = require('./components/Board.react');

var backgroundCount = 3;
var selectedBackground = Math.floor(Math.random() * backgroundCount) + 1;

// <Board />,
React.renderComponent(
  // <Square mine={false} isFlagged={true} isOpen={false} />,
  <Board width={15} height={21} mineCount={99} background={selectedBackground} />,
  document.getElementById('sweeperapp')
);
