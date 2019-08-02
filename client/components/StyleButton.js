import React from 'react';

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    // let className = 'RichEditor-styleButton waves-effect';
    // if (this.props.active) {
    //   className += ' RichEditor-activeButton waves-light';
    // }
    return (
        <span className="waves-effect waves-light btn" onMouseDown={this.onToggle}>
          {this.props.label}
        </span>
    );
  }
}

export default StyleButton;