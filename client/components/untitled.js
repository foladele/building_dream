


                //  { 
                //    this.state.editTitle ? (
                //     <span>
                //       <div ref={Modal => { this.Modal = Modal; }} id="modal1" className="modal"> 
                //         <div className="modal-content">
                //           <h4>Modal Header</h4>
                //           <p>A bunch of text</p>
                //         </div>
                //         <div className="modal-footer">
                //           <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                //         </div>
                //       </div>
                //     </span>) : (null) 
                // } 

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
        color:  `${this.props.color}` + '!important', //'#ffd600',
        textColor: 'black',
      },
      sectionCount: `${this.props.sectionCount}`,
      lastSectionIndex: `${this.props.lastSectionIndex}`,
      itemCount: 0,
      sect: false,
      isCardColor: false,
      kind: "",
      editTitle: false,
      
    };
    
    this.addSection = this.addSection.bind(this);
    this.editSection = this.editSection.bind(this);
    this.update = this.update.bind(this);
    this.toggleCardColor = this.toggleCardColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleEditTitle = this.toggleEditTitle.bind(this);
    //   console.log("sectionCount props: " + this.props.sectionCount);
    //   console.log("lastSectionIndex props: " + this.props.lastSectionIndex);
    //   console.log("yourIndex props: " + this.props.yourIndex);
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
     console.log("cards sess - " + title + " " +  color + " " + collapse + " " + kind)
     if(title.length !== 0 && kind.length !== 0)
     {
       this.props.addSection(title, color, collapse, kind);
     }
    
  }

  editSection(e){
     // let title = this.refs.etitle.value;
     // let color = '#dcedc8';
     // let collapse = false;
     // let kind = this.state.kind;
     e.preventDefault();
     // console.log("Kind " + kind);
     // console.log("cards sess - " + title + " " +  color + " " + collapse + " " + kind)
     // if(title.length !== 0 && kind.length !== 0)
     // {
     //   this.props.addSection(title, color, collapse, kind);
     // }
    
  }

  handleChange(e) {
     e.preventDefault();
    console.log("e.target " + e.target.value);
    this.setState({ kind: e.target.value });
  }

  toggleCardColor(){

    this.setState({ isCardColor: !this.state.isCardColor })
  }

  toggleEditTitle(){

    console.log("toggleEditTitle")
    this.setState({ editTitle: !this.state.editTitle });
    console.log("toggleEditTitle state " + this.state.editTitle);
    // alert('toggleEditTitle');
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
                 <a className="right" onClick={this.toggleEditTitle}>Edit</a>
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
                this.props.lastSectionIndex === this.props.yourIndex || this.state.editTitle ? (
                <div className="card-action ">
                { this.state.editTitle && this.props.lastSectionIndex !== this.props.yourIndex? 
                  (
                    <div>
                      <a className="right" > { <Modal />} </a>
                    </div>
                  ) : 

                  (
                    <div>
                      <a className="right modal-trigger" data-target="modal2" >Add Section</a>
                      <a className="right" > { this.state.editTitle ? <Modal /> : (null)} </a>
                      <div ref={Modal => { this.Modal = Modal; }} id="modal2" className="modal modal-fixed-footer" >
                        <div className="modal-content">
                          <div>
                            <h4>New Section</h4>
                              <input placeholder="Title" ref="title" required={true} />

                               <div className="input-field col s12 m6">
                                <select className="browser-default icons" onChange={this.handleChange}>
                                  <option value="" disabled selected>Choose Section Type</option>
                                  <option value="text" data-icon="/system/backgrounds/images/000/000/047/large/boat-branch-color-772429.jpg?1544662264">example 1</option>
                                  <option value="dream board" data-icon="/system/backgrounds/images/000/000/047/large/boat-branch-color-772429.jpg?1544662264">example 2</option>
                                  <option value="images" data-icon="/system/backgrounds/images/000/000/047/large/boat-branch-color-772429.jpg?1544662264">example 3</option>
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
                          <a href="#" className="modal-close waves-effect waves-green btn-flat">OK</a>
                        </div>
                      </div>
                    </div>
                  )
                }
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

// <hr/>
        // <h2>Dropped files</h2>
        // <ul>
        //   {
        //     files.map(file => 
        //      <div>
        //       <div>
        //         <img src={file.preview}/>
        //       </div>
        //      </div>
        //     )
        //   }
        // </ul>


        //better one

        // </Dropzone>
        // <hr/>
        // <h2>Dropped files</h2>
        //  <img src={this.state.image} />


        <!--   <body style="background-color: <%= Background.first.color%> "> -->


                <button onClick={this.showMenu}>
                                                        V
                                                </button> 
                                                {
                                                        this.state.showMenu ? (
                                                                <div className="menu">
                                                                        <button onClick={this.toggleColor}> color </button><br/>
                                                                        <button onClick={this.toggleImage}> image </button><br/>
                                                                        <button> Menu item 3 </button><br/>
                                                                </div>
                                                        ) : (null)
                                                        
                                                }       
     <div className="card grey lighten-2">
              <h5 className="row col s6">Welcome!</h5>
              <div className="card-content black-text">
                <div className="grey lighten-5" style={dStyle}>
                  <FreeScrollBar>
                   <View style={Styles.white}>
                    <p>Porttitor lacus luctus accumsan tortor posuere ac ut consequat. 
                    Volutpat est velit egestas dui id ornare arcu odio ut. Ultricies 
                    integer quis auctor elit sed vulputate mi. Aliquam etiam erat velit 
                    scelerisque in dictum. Netus et malesuada fames ac turpis egestas 
                    maecenas pharetra convallis. Magna eget est lorem ipsum dolor sit.
                     Enim ut sem viverra aliquet eget sit amet tellus. Sed viverra 
                     tellus in hac habitasse platea dictumst vestibulum. Enim lobortis 
                     scelerisque fermentum dui faucibus in ornare quam. Tristique 
                     senectus et netus et malesuada fames. Tristique nulla aliquet 
                     enim tortor at auctor urna nunc id. Nibh mauris cursus mattis 
                     molestie a iaculis at erat. Quis eleifend quam adipiscing vitae 
                     proin sagittis nisl rhoncus. Luctus venenatis lectus magna 
                     fringilla. Id diam maecenas ultricies mi eget mauris pharetra et.
                      Dictum varius duis at consectetur lorem donec massa sapien 
                      faucibus. Non nisi est sit amet facilisis magna etiam tempor orci.
                    </p>
                  </View>
                 </FreeScrollBar>
                </div>
              </div>
             </div>










                                  // <div className="input-field col s12 m6">
                     //    <select className="browser-default icons" onChange={this.handleChange}>
                     //      <option value="" disabled selected>Choose Section Type</option>
                     //      <option value="text" >Text</option>
                     //      <option value="dreamboard" >Dreamboard</option>
                     //      <option value="image" >Images</option>
                     //    </select>
                     //  </div>


       return(
          <div>
            <ul className="mdc-image-list my-image-list" >
              <li className="mdc-image-list__item" style={mdc_image_list__item_new}>
                <div className="card-content">
                    <span className="card-title grey-text center" onClick={this.addItemModal}>Add Item</span>
                </div>
              </li>
            </ul>
          </div>
       )

let items = this.state.items.map( item => {

        if(item.kind === "image")
        {
          return(
          <ItemImages key={`item-${item.id}`} {...item} deleteItem={this.deleteItem} sectionKind={this.props.sectionKind} sectionId={this.props.sectionId} sectionItem={this.state.itemPresent} addItem={this.addItem}/>);

        }else if(item.kind === "dreamboard"){

          return(<ItemDreamboard key={`item-${item.id}`} {...item} deleteItem={this.deleteItem} sectionKind={this.props.sectionKind} sectionId={this.props.sectionId} sectionItem={this.state.itemPresent} addItem={this.addItem}/>);

        }else if(item.kind === "text"){

          return(<ItemTexts key={`item-${item.id}`} {...item} deleteItem={this.deleteItem} sectionKind={this.props.sectionKind} sectionId={this.props.sectionId} sectionItem={this.state.itemPresent} addItem={this.addItem}/>);
        }

      });

      return (
        <div >
          {items}
          <ul>
            <li className="mdc-image-list__item" style={mdc_image_list__item_new}>
              <div className="card-content">
                <span className="card-title grey-text center" onClick={this.addItem}>Add Item</span>
              </div>
            </li>
          </ul>
        </div>
      );



let items = this.props.Items( item => {

        return(
          <div>
            <ul className="mdc-image-list my-image-list" >
              <li className="mdc-image-list__item" style={mdc_image_list__item}>
                <div className="mdc-image-list__image-aspect-container" style={mdc_image_list__image_aspect_container}>
                  <img className="mdc-image-list__image" src="/system/backgrounds/images/000/000/047/large/boat-branch-color-772429.jpg?1544662264"/>
                </div>
                  <div className="card-content">
                    <span className="card-title black-text">{item.id}</span>
                    <p>{item.description}</p>
                  </div>
              </li>
            </ul>
          </div>
        });

        return (
          <div >
            {items}
            <ul>
              <li className="mdc-image-list__item" style={mdc_image_list__item_new}>
                <div className="card-content">
                  <span className="card-title grey-text center" onClick={this.addItem}>Add Item</span>
                </div>
              </li>
            </ul>
          </div>
        );




const itemArray = ({ Items }) =>{ 
        return Items.map ( item =>(
          <div>
            <ul className="mdc-image-list my-image-list" >
              <li className="mdc-image-list__item" style={mdc_image_list__item}>
                <div className="mdc-image-list__image-aspect-container" style={mdc_image_list__image_aspect_container}>
                  <img className="mdc-image-list__image" src="/system/backgrounds/images/000/000/047/large/boat-branch-color-772429.jpg?1544662264"/>
                </div>
                  <div className="card-content">
                    <span className="card-title black-text">{item.id}</span>
                    <p>{item.description}</p>
                  </div>
              </li>
            </ul>
          </div>
        ));
      }

      return (
          <div >
            {itemArray}
            <ul>
              <li className="mdc-image-list__item" style={mdc_image_list__item_new}>
                <div className="card-content">
                  <span className="card-title grey-text center" onClick={this.addItem}>Add Item</span>
                </div>
              </li>
            </ul>
          </div>
        );

    }



     const itemArray = ({ Items }) => 
      {
        let items = Items.map( item => 
        {

          return(
            <div>
              <ul className="mdc-image-list my-image-list" >
                <li className="mdc-image-list__item" style={mdc_image_list__item}>
                  <div className="mdc-image-list__image-aspect-container" style={mdc_image_list__image_aspect_container}>
                    <img className="mdc-image-list__image" src="/system/backgrounds/images/000/000/047/large/boat-branch-color-772429.jpg?1544662264"/>
                  </div>
                    <div className="card-content">
                      <span className="card-title black-text">{item.id}</span>
                      <p>{item.description}</p>
                    </div>
                </li>
              </ul>
            </div>
          )

        }); 
        
    }

        return(
           <div >
              {itemArray}
              <ul>
                <li className="mdc-image-list__item" style={mdc_image_list__item_new}>
                  <div className="card-content">
                    <span className="card-title grey-text center" onClick={this.addItem}>Add Item</span>
                  </div>
                </li>
              </ul>
            </div>
        )



                 <Popup trigger ={<span className="card-title grey-text center" >Add Item</span>} modal closeOnDocumentClick>
                    {
                        <div>
                          { 
                            this.props.sectionKind === "dreamboard" ? (

                              <div><h4> hello dreamboard </h4></div>

                             ) : ( 
                                <div><h4> hello image </h4></div>
                             )
                          }
                        </div>

                      )
                    }
                  </Popup>






import './Styles.css';



class Header extends React.Component {

constructor(props) {

    super(props);
};

 render() {

    return (
      <div>
        <div className="headerImage" >
          <div className="container">
            <div className="topnav">
              <a className=" ">Logo</a>
              
              <a onClick={this.props.toggleIsLandingPad}>Menu</a>
            </div>
           </div>
           <div className="center"> <h1>Queen's Dream Board</h1></div>
        </div>
      </div>
    )
  }
  
}

export default Header;




                //   <Dropzone onDrop={this.addImage}>
                  //     {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                  //       if (isDragActive) {
                  //         return "This file is authorized";
                  //       }
                  //       if (isDragReject) {
                  //         return "This file is not authorized";
                  //       }
                  //       return acceptedFiles.length || rejectedFiles.length
                  //         ? `Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`
                  //         : "Try dropping some files.";
                  //     }}
                  //   </Dropzone>




this.state.showURLInput ? 
                (
                  <div>
                    <p>herro</p>
                    <input type="file" id="fileElem" multiple accept="image/*" style={{display: "none"}} type="file" onChange={this.handleFiles}/>
                    <a href="#" id="fileSelect" onClick={this.isClicked}>Select some files</a> 
                    <div id="fileList">
                      <p>No files selected!</p>
                    </div>
                  </div>
                ) : 
                (null)




