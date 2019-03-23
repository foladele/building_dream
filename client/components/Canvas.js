import React from 'react';
import PropTypes from "prop-types";
import Dropzone from 'react-dropzone';
import request from "superagent";

const sStyle = {
  border:'1px solid #d3d3d3',
};

class Canvas extends React.Component {

	componentDidMount(){

		const canvas = this.refs.canvas;
		const ctx = canvas.getContext("2d");

		//Red rectangle
		ctx.beginPath();
		ctx.lineWidth = "6";
		ctx.strokeStyle = "red";
		ctx.rect(5, 5, 290, 140);  
		ctx.stroke();

		// Green rectangle
		ctx.beginPath();
		ctx.lineWidth = "4";
		ctx.strokeStyle = "green";
		ctx.rect(30, 30, 50, 50);
		ctx.stroke();

		// Blue rectangle
		ctx.beginPath();
		ctx.lineWidth = "10";
		ctx.strokeStyle = "blue";
		ctx.rect(50, 50, 150, 80);
		ctx.stroke();
	}

 
 render() {
    return (
      <div className="container">
        <div>
        	<canvas ref="canvas" width={300} heigth={150} />
        </div>
      </div>
    )
  }
}

export default Canvas;