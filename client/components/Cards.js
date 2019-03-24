import React from 'react';
import Canvas from '../components/Canvas';
import PropTypes from "prop-types";
import Dropzone from 'react-dropzone';
import request from "superagent";
import { AppRegistry, StyleSheet, Text, View } from 'react-native-web';
import FreeScrollBar from 'react-free-scrollbar';


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
    width: '300px',
    position: 'relative',
    boxSizing: 'border_box',
    listStyleType: 'none',
}

const mdc_image_list__item_new = {
    margin: '5px',
    border: '5px dashed #ccc',
    borderRadius: '8px',
    float: 'left',
    width: '300px',
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

      bStyle: {
        height: '400px',
        width: '1280px',
      },
      sectionStyle: {
        color: '#ffd600', //`${this.props.color}`,
        textColor: 'black',
      },
      sectionCount: `${this.props.sectionCount}`,
      lastSectionIndex: `${this.props.lastSectionIndex}`,
      itemCount: 0,
      sect: false,
      
    };

    this.update = this.update.bind(this);

  }

  update(id, title, color, collapse)
  {

    console.log(collapse);
    let new_collapse = !collapse;
    console.log(new_collapse);
    let section = {title: title, color: color, collapse: new_collapse};
    this.props.editSection(id, section);
    
  }
 
 render() {
    return (
      <div className="">
        <div className="">
          <div className="">
            <div className="card grey lighten-5">
             <div className="card-action black-text">
                <span className="card-title">{this.props.title}</span>
                 <a className="right" onClick={ () => this.props.delete(this.props.id) } >delete</a>
                 <a className="right" onClick={ () => this.update(this.props.id,this.props.title,this.props.color,this.props.collapse) }>
                  {Boolean(this.props.collapse) ? (<div>expand</div>): (<div>collapse</div>)}
                 </a>
              </div>
              <div className="card-content black-text white">
              {

                Boolean(this.props.collapse) ? (null):
               (<div className="" style={this.state.bStyle}>
                <FreeScrollBar>
                 <View>

                    <ul className="mdc-image-list my-image-list" >

                      <li className="mdc-image-list__item" style={mdc_image_list__item}>
                        <div className="mdc-image-list__image-aspect-container" style={mdc_image_list__image_aspect_container}>
                          <img className="mdc-image-list__image" src="/system/backgrounds/images/000/000/047/large/boat-branch-color-772429.jpg?1544662264"/>
                        </div>
                          <div className="card-content">
                            <span className="card-title black-text">Image Card</span>
                            <p>I am a very simple card. I am good at containing small bits of information.</p>
                          </div>
                      </li>

                      <li className="mdc-image-list__item" style={mdc_image_list__item_new}>
                        <div className="card-content">
                            <span className="card-title grey-text center">Add Item</span>
                        </div>
                      </li>
                     
                    </ul>
                 </View>
                </FreeScrollBar>
               </div>)
               }
               <div>
               { 

                this.state.sectionCount < 10 && this.state.lastSectionIndex < 9 ? (
                <div className="card-action ">
                 <a className="right" onClick={this.props.toggleIsNewCard}>Add Section</a>
                </div>): (null)
               }
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