
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


const mdc_image_list__image_aspect_container  = {
  position: 'relative',
  boxSizing: 'border_box',
};

const mdc_image_list__item = {
    margin: '5px',
    border: '1px solid #ccc',
    float: 'left',
    width: '300px',
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
    // height: '100px',
    position: 'relative',
    boxSizing: 'border_box',
    listStyleType: 'none',
};

class ItemImages extends React.Component {
	constructor(props) {
		super(props);

   this.addItem = this.addItem.bind(this);
	}

  addItem(e){
    e.preventDefault();
    let title = "image test"
    let kind = "image";
    let description = "hello image test!"

    
    this.props.addItem(title,kind,description);
  }

	render() {
    if(this.props.sectionItem === "false")
    {
       return(
        <div>
          <ul className="mdc-image-list my-image-list" >
            <li className="mdc-image-list__item" style={mdc_image_list__item_new}>
              <div className="card-content">
                  <span className="card-title grey-text center" onClick={this.addItem}>Add Item</span>
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
                <img className="mdc-image-list__image" src="/system/backgrounds/images/000/000/047/large/boat-branch-color-772429.jpg?1544662264"/>
              </div>
                <div className="card-content">
                  <span className="card-title black-text">{this.props.id}</span>
                  <p>{this.props.description}</p>
                </div>
            </li>
        </div>
      )


    }// end else
	
	}
}

export default ItemImages;
