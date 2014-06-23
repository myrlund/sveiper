/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var SweeperActions = require('../actions/SweeperActions');

var cx = require('react/lib/cx');

var Square = React.createClass({

  getDefaultProps: function () {
    return {
      isOpen: false,
      isFlagged: false
    };
  },

  _onOpen: function () {
    if (this.props.isFlagged) {
      return;
    }

    if (this.props.isMine) {
      SweeperActions.explodeSquare(this.props.coordinate);
    }

    SweeperActions.openSquare(this.props.coordinate);
  },

  _onOpenTactical: function () {
    SweeperActions.openTactical(this.props.coordinate);
  },

  _onToggleFlag: function(e) {
    e.preventDefault();

    SweeperActions.toggleSquareFlag(this.props.coordinate);
  },

  /**
   * @return {object}
   */
  render: function() {
    if (this.props.isOpen) {
      if (this.props.isMine) {
        return (
          <div className={"square open mine"}>
            {this.props.exploded ? <div className="pic" /> : ''}
          </div>
        );
      }
      else {
        return (
          <div className={"square open n"+this.props.number} onClick={this._onOpenTactical}>
            {this.props.number > 0 ? this.props.number : ''}
          </div>
        );
      }
    }
    else {
      return (
        <div className={cx({
          'square': true,
          'flagged': this.props.isFlagged
        })} onClick={this._onOpen} onContextMenu={this._onToggleFlag}></div>
      );
    }
  }

});

module.exports = Square;
