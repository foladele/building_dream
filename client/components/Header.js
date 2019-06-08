import React from 'react';




class Header extends React.Component {

constructor(props) {

    super(props);
};

 render() {

    return (
      <div  >
	      <div className="nav-wrapper">
	        <a href="#" className="brand-logo right">Logo</a>
	        <a href="#" className="brand-logo center">Queen's Dream Board</a>
	        <ul id="nav-mobile" className="left hide-on-med-and-down">
	          <li><a onClick={this.props.toggleIsLandingPad}>Menu</a></li>
	        </ul>
	      </div>
      </div>
    )
  }
  
}

export default Header;