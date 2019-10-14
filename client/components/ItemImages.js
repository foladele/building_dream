
import React from 'react';
import Canvas from '../components/Canvas';
import PropTypes from "prop-types";
import Dropzone from 'react-dropzone';
import request from "superagent";
import { AppRegistry, StyleSheet, Text, View } from 'react-native-web';
import FreeScrollBar from 'react-free-scrollbar';
import M from "materialize-css";
import CardColor from '../components/CardColor';
import Modal from '../components/Modal';
import Popup from "reactjs-popup";


const mdc_image_list__image_aspect_container  = {
  position: 'relative',
  boxSizing: 'border_box',
};

const mdc_image_list__item = {
    margin: '5px',
    border: '1px solid #ccc',
    float: 'left',
    width: '280px',
    // columnWidth: 80,
    // width: 'calc((100% / 6) - ((16px * 5) / 6))',
    position: 'relative',
    boxSizing: 'border_box',
    listStyleType: 'none',
};

const mdc_image_list__item_new = {
    margin: '5px',
    border: '5px dashed #ccc',
    borderRadius: '8px',
    float: 'left',
    width: '300px',
    // columnWidth: 80,
    // width: 'calc((100% / 6) - ((16px * 5) / 6))',
    // height: '100px',
    position: 'relative',
    boxSizing: 'border_box',
    listStyleType: 'none',
};

class ItemImages extends React.Component {
	constructor(props) {
		super(props);
    this.state = { 
      open: false,
      acceptedFiles: [],


    };
   this.addItem = this.addItem.bind(this);
   this.openModal = this.openModal.bind(this);
   this.closeModal = this.closeModal.bind(this);
   this.deleteItemImages = this.deleteItemImages.bind(this);
	}

  componentWillMount(){
    if(this.props.sectionItem != "false"){

      // console.log("component Will Mount", this.props.sectionId, this.props.id, this.props.file);

      // $.ajax({
      //   url: `/api/sections/${this.props.sectionId}/items/${this.props.id}/item_images`,
      //   type: 'GET',
      //   dataType: 'JSON',
      //   success: function (data) {
      //     console.log(data);
      //   }
      // }).done( images => { 
      //     this.setState({ images });   
      //     console.log(images); 
      // })

    }

  }

  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }

  addItem(e){
    e.preventDefault();
    this.closeModal();

    let title = this.refs.imgtitle.value;;
    let description = this.refs.imagedes.value;
    let kind = this.props.sectionKind;

    this.props.addItem(title,kind,description,this.state.acceptedFiles);

  }

  deleteItemImages(){
    this.props.deleteItemImages(this.props.id);
  }

onDrop(acceptedFiles)
{
  this.setState({
      acceptedFiles
  });

  console.log("this.state.files ", this.state.acceptedFiles)
  
  var binaryStr;
  const fileList = document.getElementById("fileList");
  fileList.innerHTML = "";
  console.log("reaching -0", acceptedFiles[0])
  for (let i = 0; i < acceptedFiles.length; i++) {

    // console.log("reaching -i times", acceptedFiles[i]);

    const file = acceptedFiles[i];
    const img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;
    img.height = 150;
    fileList.appendChild(img);

    const reader = new FileReader();
    reader.onload = (function(aImg) 
    { return function(e) { 
        aImg.src = e.target.result;
      }; 
    })(img);
    
    reader.readAsDataURL(file);
    
  }

}

	render() {
    if(this.props.sectionItem === "false")
    {
       return(
        <div>
          <ul className="mdc-image-list my-image-list" >
            <li className="mdc-image-list__item" style={mdc_image_list__item_new}>
              <div className="card-content">
                <span className="card-title grey-text center" onClick={this.openModal}>
                  Add Item--Image
                </span>
                <Popup 
                  open={this.state.open}
                  closeOnDocumentClick
                  onClose={this.closeModal}
                >
                  <div>
                   <div>
                      <h4 className="center">New Image</h4>
                      <div className="modal-footer right">
                        <a href="#" className="modal-close waves-effect waves-green btn-flat" onClick={this.closeModal}>CANCEL</a>                    
                        <a href="#" className="modal-close waves-effect waves-green btn-flat" onClick={this.addItem}>OK</a>
                      </div>
                      <input placeholder="Title" ref="imgtitle" required={true} />
                      <div className="input-field col s12 m6">
                        <select className="browser-default icons" ref="image" onChange={this.handleChange}>
                          <option value={this.props.kind} disabled selected>{this.props.sectionKind}</option>
                        </select>
                      </div>
                      <div class="row">
                        <div class="input-field col s12">
                          <textarea id="textarea1" class="materialize-textarea" ref="imagedes"></textarea>
                          <label for="textarea1">Description</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col s12">
                          <div className="col s6">
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
                          <div className="col s6" id="fileList">
                            <p>No files selected!</p>
                          </div>
                        </div>
                      </div>
                      
                   </div>
                  </div>
               </Popup>
              </div>
            </li>
          </ul>
        </div>
       );
      
    }else{

      return(
        <div>
            <li className="mdc-image-list__item" style={mdc_image_list__item}>
              <div className="mdc-image-list__image-aspect-container" style={mdc_image_list__image_aspect_container}>
                <img className="mdc-image-list__image" src={this.props.itemImage}/>
              </div>
                <div className="card-content">
                  <span className="card-title black-text">{this.props.title}</span>
                  <p>{this.props.description}</p>
                  <a className="modal-close waves-effect waves-green btn-flat right" onClick={this.deleteItemImages}>Delete</a>
                  <a className="modal-close waves-effect waves-green btn-flat right">Edit</a>
                </div>
            </li>
        </div>
      )


    }// end else
	
	}
}

export default ItemImages;
