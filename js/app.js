/**
 * @jsx React.DOM
 */

var React = require('react');

// var TodoApp = require('./components/Square.react');
// var Square = require('./components/Square.react');
var Board = require('./components/Board.react');

// <Board />,
React.renderComponent(
  // <Square mine={false} isFlagged={true} isOpen={false} />,
  <Board width={30} height={16} mineCount={99} />,
  document.getElementById('sweeperapp')
);
