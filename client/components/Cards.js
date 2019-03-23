import React from 'react';
import Canvas from '../components/Canvas';
import PropTypes from "prop-types";
import Dropzone from 'react-dropzone';
import request from "superagent";
import { AppRegistry, StyleSheet, Text, View } from 'react-native-web';
import FreeScrollBar from 'react-free-scrollbar';


const bStyle = {
  height: '400px',
  width: '1280px'
};

 const my_image_list  = {
  // @include mdc_image_list_standard_columns(5);
  maxWidth: '960px',
  /*background_color:#f4427a, */  
}


const mdc_image_list  = {
 
  display: 'flex',
  flexWrap: 'wrap',
  margin: '0 auto',
  padding: '0',
 
}

const mdc_image_list__image_aspect_container  = {
  position: 'relative',
  boxSizing: 'border_box',
}

const mdc_image_list__item = {
    margin: '5px',
    border: '1px solid #ccc',
    float: 'left',
    width: '176.5px',
    position: 'relative',
    boxSizing: 'border_box',
    listStyleType: 'none',
}

const mdc_image_list__image  = {
    width: 100,
    height: '130px',
}

const mdc_image_list__supporting = {
    padding: '15px',
    textAlign: 'center',
}


class Cards extends React.Component {

	constructor(props) {

    super(props);

    this.state = { 
      isAdd: false,
    };


  }
 
 render() {
    return (
      <div className="">
        <div className="">
          <div className="">
            <div className="card grey lighten-5">
             <div className="card-action">
                <span className="card-title">Welcome!</span>
                 <a className="right" href="#">delete</a>
                 <a className="right" href="#">collapse</a>
              </div>
              <div className="card-content black-text white">
               <div className="" style={bStyle}>
                <FreeScrollBar>
                 <View>

                    <ul className="mdc-image-list my-image-list" style={mdc_image_list, my_image_list}>

                      <li className="mdc-image-list__item" style={mdc_image_list__item}>
                        <div className="mdc-image-list__image-aspect-container" style={mdc_image_list__image_aspect_container}>
                          <img className="mdc-image-list__image" src="/system/backgrounds/images/000/000/047/large/boat-branch-color-772429.jpg?1544662264"/>
                        </div>
                        <div className="mdc-image-list__supporting" style={mdc_image_list__supporting}>
                          <span className="mdc-image-list__label">Text label3</span>
                        </div>
                      </li>

                      <li className="mdc-image-list__item" style={mdc_image_list__item}>
                        <div className="mdc-image-list__image-aspect-container" style={mdc_image_list__image_aspect_container}>
                          <img className="mdc-image-list__image" src="/system/backgrounds/images/000/000/047/large/boat-branch-color-772429.jpg?1544662264"/>
                        </div>
                        <div className="mdc-image-list__supporting" style={mdc_image_list__supporting}>
                          <span className="mdc-image-list__label">Text label1</span>
                        </div>
                      </li>
                     

                       <li className="mdc-image-list__item" style={mdc_image_list__item}>
                        <div className="mdc-image-list__image-aspect-container" style={mdc_image_list__image_aspect_container}>
                          <img className="mdc-image-list__image" src="/system/backgrounds/images/000/000/047/large/boat-branch-color-772429.jpg?1544662264"/>
                        </div>
                        <div className="mdc-image-list__supporting" style={mdc_image_list__supporting}>
                          <span className="mdc-image-list__label">Text label2</span>
                        </div>
                      </li>


                       <li className="mdc-image-list__item" style={mdc_image_list__item}>
                        <div className="mdc-image-list__image-aspect-container" style={mdc_image_list__image_aspect_container}>
                          <img className="mdc-image-list__image" src="/system/backgrounds/images/000/000/047/large/boat-branch-color-772429.jpg?1544662264"/>
                        </div>
                        <div className="mdc-image-list__supporting" style={mdc_image_list__supporting}>
                          <span className="mdc-image-list__label">Text label3</span>
                        </div>
                      </li>

                      <li className="mdc-image-list__item" style={mdc_image_list__item}>
                        <div className="mdc-image-list__image-aspect-container" style={mdc_image_list__image_aspect_container}>
                          <img className="mdc-image-list__image" src="/system/backgrounds/images/000/000/047/large/boat-branch-color-772429.jpg?1544662264"/>
                        </div>
                        <div className="mdc-image-list__supporting" style={mdc_image_list__supporting}>
                          <span className="mdc-image-list__label">Text label1</span>
                        </div>
                      </li>
                     

                       <li className="mdc-image-list__item" style={mdc_image_list__item}>
                        <div className="mdc-image-list__image-aspect-container" style={mdc_image_list__image_aspect_container}>
                          <img className="mdc-image-list__image" src="/system/backgrounds/images/000/000/047/large/boat-branch-color-772429.jpg?1544662264"/>
                        </div>
                        <div className="mdc-image-list__supporting" style={mdc_image_list__supporting}>
                          <span className="mdc-image-list__label">Text label2</span>
                        </div>
                      </li>


                       <li className="mdc-image-list__item" style={mdc_image_list__item}>
                        <div className="mdc-image-list__image-aspect-container" style={mdc_image_list__image_aspect_container}>
                          <img className="mdc-image-list__image" src="/system/backgrounds/images/000/000/047/large/boat-branch-color-772429.jpg?1544662264"/>
                        </div>
                        <div className="mdc-image-list__supporting" style={mdc_image_list__supporting}>
                          <span className="mdc-image-list__label">Text label3</span>
                        </div>
                      </li>

                       <li className="mdc-image-list__item" style={mdc_image_list__item}>
                        <div className="mdc-image-list__image-aspect-container" style={mdc_image_list__image_aspect_container}>
                          <img className="mdc-image-list__image" src="/system/backgrounds/images/000/000/047/large/boat-branch-color-772429.jpg?1544662264"/>
                        </div>
                        <div className="mdc-image-list__supporting" style={mdc_image_list__supporting}>
                          <span className="mdc-image-list__label">Text label1</span>
                        </div>
                      </li>
                     

                       <li className="mdc-image-list__item" style={mdc_image_list__item}>
                        <div className="mdc-image-list__image-aspect-container" style={mdc_image_list__image_aspect_container}>
                          <img className="mdc-image-list__image" src="/system/backgrounds/images/000/000/047/large/boat-branch-color-772429.jpg?1544662264"/>
                        </div>
                        <div className="mdc-image-list__supporting" style={mdc_image_list__supporting}>
                          <span className="mdc-image-list__label">Text label2</span>
                        </div>
                      </li>


                       <li className="mdc-image-list__item" style={mdc_image_list__item}>
                        <div className="mdc-image-list__image-aspect-container" style={mdc_image_list__image_aspect_container}>
                          <img className="mdc-image-list__image" src="/system/backgrounds/images/000/000/047/large/boat-branch-color-772429.jpg?1544662264"/>
                        </div>
                        <div className="mdc-image-list__supporting" style={mdc_image_list__supporting}>
                          <span className="mdc-image-list__label">Text label3</span>
                        </div>
                      </li>
                     
                    </ul>
                 </View>
                </FreeScrollBar>
               </div>
                <div className="card-action ">
                 <a className="right" onClick={this.props.toggleIsNewCard}>Add Section</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Cards;