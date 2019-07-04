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
import Items from '../components/Items';

 const my_image_list  = {
  // @include mdc_image_list_standard_columns(5);toggleIsLandingPad
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
    // height: '100px',
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
        backgroundColor: `${this.props.color}`,
      },
      sectionStyle: {
        color:  `${this.props.color}` + '!important', //'#ffd600',
        textColor: 'black',
      },
      sectionCount: `${this.props.sectionCount}`,
      lastSectionIndex: `${this.props.lastSectionIndex}`,
      itemCount: 0,
      sect: false,
      isCardColor: false,
      kind: "",
      editSection: false,
      id: this.props.id, 
      // title: "", 
      // color: "", 
      // collapse: false, 
      
    };
    
    this.addSection = this.addSection.bind(this);
    this.editSection = this.editSection.bind(this);
    this.update = this.update.bind(this);
    this.toggleCardColor = this.toggleCardColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleEditSection = this.toggleEditSection.bind(this);
  }

  componentDidMount() {
    const options = {
      onOpenStart: () => {
        console.log("Open Start");
       
      },
      onOpenEnd: () => {
        console.log("Open End");
         
      },
      onCloseStart: () => {
        console.log("Close Start");
      },
      onCloseEnd: () => {
       if(this.state.isCardColor)
       {

        this.setState({ isCardColor: !this.state.isCardColor });

       }
        console.log("Close End");
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };

    // const oneseas = {
    //     onOpenEnd: () => {
    //     console.log("Open End " + this.props.title);

    //   },
    //   };

    //M.Modal.init(this.ModalTwo,  options);
    M.Modal.init(this.Modal, options);
    

  }

  update(id, title, color, collapse, kind)
  {

    console.log(collapse);
    let new_collapse = !collapse;
    console.log(new_collapse);
    let section = {title: title, color: color, collapse: new_collapse, kind: kind};
    this.props.editSection(id, section);
    
  }

  addSection(e){
     let title = this.refs.title.value;
     let color = '#dcedc8';
     let collapse = false;
     let kind = this.state.kind;
     e.preventDefault();
     console.log("Kind " + kind);
     // console.log("cards sess - " + title + " " +  color + " " + collapse + " " + kind)
     if(title.length !== 0 && kind.length !== 0)
     {
       this.props.addSection(title, color, collapse, kind);
     }
    
  }

  editSection(e){
     
     e.preventDefault();
     let id = this.state.id;
     // console.log(id + "ididididid")
     if (this.state.editSection === true)
     {
       this.setState({ editSection: !this.state.editSection });
     }
     let title = this.refs.newTitle.value;
     let color = '#dcedc8';
     let collapse = false;
     let kind = this.props.kind;
     let section = {title: title, color: color, collapse: collapse, kind: kind};
     if(title.length !== 0)
     {
      this.props.editSection(id, section);
     }
     
  }

  handleChange(e) {
    e.preventDefault();
    console.log("e.target " + e.target.value);
    this.setState({ kind: e.target.value });
  }

  

  toggleCardColor(){

    this.setState({ isCardColor: !this.state.isCardColor })
  }

  toggleEditSection(){

     this.setState({ editSection: !this.state.editSection });
     this.setState({ id: this.props.id }, () => {
       console.log(this.state.id, 'this.props.id');
     }); 
     // console.log("editSection: " + this.state.editSection + " " + this.state.id);
   
  }

 
 render() {
    return (
      <div className="">
        <div className="">
          <div className="">
            <div className="card grey lighten-5" style={this.state.sectionStyle}>
             <div className="card-action black-text">
                <span className="card-title">{this.props.title}</span>
                 <a className="right" onClick={ () => this.props.delete(this.props.id) } >delete</a>
                 <a className=" right" onClick={this.toggleEditSection}>Edit</a>
                 <a className="right" onClick={ () => this.update(this.props.id,this.props.title,this.props.color,this.props.collapse) }>
                  {Boolean(this.props.collapse) ? (<div>expand</div>): (<div>collapse</div>)}
                 </a>

                 { Boolean(this.state.editSection) ?
                  (<div> 
                     <input placeholder={this.props.title} ref="newTitle" required={true} />
                     <div className="input-field col s12 m6">
                        <select className="browser-default icons" onChange={this.handleChange}>
                          <option value={this.props.kind} disabled selected>{this.props.kind}</option>
                        </select>
                      </div>
                       <a href="#" className="waves-effect waves-green btn-flat black" onClick={this.toggleCardColor}>Choose Color</a>  
                        {
                          this.state.isCardColor ? (

                            <div>
                              { <CardColor /> }
                            </div>

                          ): (null)
                        }
                        <div className=" right">
                         <a href="#" className="modal-close waves-effect waves-green btn-flat" onClick={this.editSection}>SAVE</a>
                        </div>
                    </div>): (null)
                  } 

              </div>
              <div className="card-content black-text white">
              {

                Boolean(this.props.collapse) ? (null):
               (<div className="" style={this.state.bStyle}>
                <FreeScrollBar>
                 <View>

                   <Items sectionId={this.props.id} sectionKind={this.props.kind}/>

                 </View>
                </FreeScrollBar>
               </div>)
               }
               <div>
               { 
                this.props.lastSectionIndex === this.props.yourIndex ? (
                <div className="card-action " >     
                    <div>
                      <a className="right" >XXXX</a>
                      <div ref={Modal => { this.Modal = Modal; }} id="modal2" className="modal modal-fixed-footer" >
                        <div className="modal-content">
                          <div>
                            <h4>New Section</h4>
                              <input placeholder="Title" ref="title" required={true} />

                               <div className="input-field col s12 m6">
                                <select className="browser-default icons" onChange={this.handleChange}>
                                  <option value="" disabled selected>Choose Section Type</option>
                                  <option value="text" data-icon="/system/backgrounds/images/000/000/047/large/boat-branch-color-772429.jpg?1544662264">Text</option>
                                  <option value="dreamboard" data-icon="/system/backgrounds/images/000/000/047/large/boat-branch-color-772429.jpg?1544662264">Dreamboard</option>
                                  <option value="image" data-icon="/system/backgrounds/images/000/000/047/large/boat-branch-color-772429.jpg?1544662264">Images</option>
                                </select>
                              </div>


                              <a href="#" className="waves-effect waves-green btn-flat black" onClick={this.toggleCardColor}>Choose Color</a>  
                              {
                                this.state.isCardColor ? (

                                  <div>
                                    { <CardColor /> }
                                  </div>

                                ): (null)
                              }                  
                          </div>
                        </div>
                        <div className="modal-footer">
                          <a href="#" className="modal-close waves-effect waves-green btn-flat">CANCEL</a>                    
                          <a href="#" className="modal-close waves-effect waves-green btn-flat" onClick={this.addSection}>OK</a>
                        </div>
                      </div>
                    </div>
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