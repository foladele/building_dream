import React from 'react';
import './Styles.css';



class Header extends React.Component {

constructor(props) {

    super(props);
};

 render() {

    return (
      <div  className="card-title headerImage">
	      <div className="nav-wrapper container-navbar">
	       <div className="topnav">
		        <a href="#" className="brand-logo right ">Logo</a>
		        <ul id="nav-mobile" className="left hide-on-med-and-down">
		          <li><a onClick={this.props.toggleIsLandingPad}>Menu</a></li>
		        </ul>		
		        <h1 className="center headerImageh1">Queen's Dream Board</h1>        
	       </div> 
	      </div>
	      <div className="">
		      <div className="text-block">
				    <h6>Keep building this dream Queen! you're almost there!!!</h6>
				  </div>
	      </div>
      </div>
    )
  }
  
}

export default Header;