/**
 * Module dependencies
 */

var React = require('react')
var classNames = require('classnames')


var noop = function(){}

/**
 * Make a contenteditable element
 */

var ContentEditable = React.createClass({

  propTypes: {
    editing: React.PropTypes.bool,
    html: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.bool,
    placeholderText: React.PropTypes.string,
    tagName: React.PropTypes.string,
    onEnterKey: React.PropTypes.func,
    onEscapeKey: React.PropTypes.func,
    preventStyling: React.PropTypes.bool,
    noLinebreaks: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBold: React.PropTypes.func,
    onItalic: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onKeyPress: React.PropTypes.func,
    placeholderStyle: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      html: '',
      placeholder: false,
      placeholderText: '',
      onBold: noop,
      onItalic: noop,
      onKeyDown: noop,
      onKeyPress: noop
    };
  },

  getInitialState: function(){
    return {};
  },


  render: function() {

    let {editing: editing, className: className, tagName: tagName} = this.props;

    // setup our classes
    const classes = {
      ContentEditable: true
    };

    const placeholderStyle = this.props.placeholderStyle || {
        color: '#bbbbbb'
      };

    if (className) {
      classes[className] = true;
    }

    // set 'div' as our default tagname
    tagName = tagName || 'div';

    const content = this.props.html;

    // return our newly created element
    return React.createElement(tagName, {
      tabIndex: 0,
      key: '0',
      className: classNames(classes),
      contentEditable: editing,
      onBlur: this.onBlur,
      onFocus: this.onFocus,
      onKeyDown: this.onKeyDown,
      onPaste: this.onPaste,
      onMouseDown: this.onMouseDown,
      'aria-label': this.props.placeholderText,
      onTouchStart: this.onMouseDown,
      style: this.props.placeholder ? placeholderStyle : this.props.style || {},
      onKeyPress: this.onKeyPress,
      onInput: this.onInput,
      onKeyUp: this.onKeyUp,
      dangerouslySetInnerHTML: {
        __html : this.props.placeholder ? this.props.placeholderText : content
      }
    });
  },

  unsetPlaceholder: function(){

  },

  setCursorToStart: function(){

  },

  contentIsEmpty: function (content) {

    if (this.state.placeholder) {
      return true
    }

    if (!content) {
      return true
    }

    if (content === '<br />') {
      return true
    }

    if (!content.trim().length) {
      return true
    }

    return false
  },


  onMouseDown: function(e) {

  },

  onKeyDown: function(e) {

  },

  _replaceCurrentSelection: function(data) {

  },

  onPaste: function(e){

  },

  onKeyPress: function(e){
  },

  onKeyUp: function(e) {


  },

  onInput: function(e) {

  },

  onBlur: function(e) {

  },

  onFocus: function(e) {

  }

});

module.exports = ContentEditable;
