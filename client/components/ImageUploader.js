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
    }).done( backgrounds => {
      this.setState({ backgrounds })
      let newState = Object.assign({}, this.state);
      let img = newState.backgrounds[1].image
      console.log(img)
      // console.log(img[1])
      this.setState({image: img});

    })
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(f => URL.revokeObjectURL(f.preview))
  }

  onDrop(files) {

    this.setState({
      files
    });

    // this.setState({
    //   files: files.map(file => Object.assign(file, {preview: URL.createObjectURL(file)}))
    // });

    console.log(this.state.files)

     files.map(img => {
	 		let name = "image";
	 		let image = img
	 		let color = "#ffffff"
 		  const fileData = new FormData();
      fileData.append("background[name]", name);
      fileData.append("background[color]", color);
      fileData.append("background[image]", image);
      
     //  for (var pair of fileData.entries()) {
     //    console.log(pair); 
     //    console.log(pair[0]+ ', ' + pair[1]); 
     // }
      let id = 47;
     	$.ajax({
	    url: `/api/backgrounds/${id}`,
	    type: 'PUT',
	    data: fileData,
	    dataType: 'JSON',
      contentType: false,
      processData: false,
      cache: false, 
	    success: function (data) { 
	      // console.log(data);  
	    },error: function (data) {  
	      console.log(data);  
	    } 
	    }).done( image => {
	       // console.log(image);
         this.props.updateBackgroundImage(image)
	    })
     });

  }

  render () {
    const {files} = this.state;
    return (
      <div>
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

export default ImageUploader;