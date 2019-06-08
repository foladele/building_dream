import React from 'react';


const footerStyle = {

 	  height:'60px', // Replace with the height your footer should be
    width: "100%", // Don't change
    backgroundRepeat: "repeat",
    backgroundAttachment: "scroll",
    backgroundPosition:" 0% 0%",
    position: "fixed",
    bottom: '0pt',
    left: '0pt',
 }

class Footer extends React.Component {

 render() {

    return (
      <div>
        <div>
	        <footer className="page-footer" style={footerStyle}>
		        	<div className="footer-copyright">
		            <div className="container">
		            © 2014 Copyright Text
		            <a className="right modal-trigger grey-text text-lighten-4" data-target="modal2" >ADD SECTION</a>
		            </div>
	          	</div>
	        </footer>
        </div>
      </div>
    )
  }

}

export default Footer;