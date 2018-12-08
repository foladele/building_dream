import React from 'react';
import PropTypes from "prop-types";
import Dropzone from 'react-dropzone';
import request from "superagent";

class ImageUploader extends React.Component {

	constructor() {
    super()
    this.state = {
      backgrounds: [],
      files: [],
      image: "",
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/api/backgrounds',
      type: 'GET',
      dataType: 'JSON',
      success: function (data) {
        console.log(data);
      },
      error: function (data) {
          console.log('Error:', data);
      }
    }).done( background => {
      this.setState({ background })
      let newState = Object.assign({}, this.state);
      // let img = `${newState.backgrounds[0].image_file_name)}`
      // console.log(newState.backgrounds[0].image_file_name);
    })
  }

  onDrop(files) {

    this.setState({
      files
    });

     files.map(img => {
	 		let name = img.name;
	 		let image = img
	 		let color = " "
 		  const fileData = new FormData();
      fileData.append("background[name]", img.name);
      fileData.append("background[color]", color);
      fileData.append("background[image]", image);
      
     //  for (var pair of fileData.entries()) {
     //       console.log(pair[0]+ ', ' + pair[1]); 
     // }
     //  console.log("name: " + name);
     //  console.log(image);

     	$.ajax({
	    url: '/api/backgrounds/',
	    type: 'POST',
	    data: fileData,
	    dataType: 'JSON',
      contentType: false,
      processData: false,
      cache: false, 
	    success: function (data) { 
	      console.log(data);  
	    },error: function (data) {  
	      console.log(data);  
	    } 
	    }).done( image => {
	       console.log(image);
	    })
     });

  }

  render () {
    return (
      <div>
        <div>csrf: {this.props.csrf}</div>
        <Dropzone onDrop={this.onDrop.bind(this)}>
          {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
            if (isDragActive) {
              return "This file is authorized";
            }
            if (isDragReject) {
              return "This file is not authorized";
            }
            return acceptedFiles.length || rejectedFiles.length
              ? `Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`
              : "Try dropping some files.";
          }}
        </Dropzone>
        
      </div>
    );
  }
}

ImageUploader.propTypes = {
  csrf: PropTypes.string,
};
export default ImageUploader;