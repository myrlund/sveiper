/**
 * @jsx React.DOM
 */

var React = require('react');

var Game = require('./components/Game.react');

React.renderComponent(
  <Game width={15} height={21} mineCount={60} />,
  document.getElementById('sweeperapp')
);
