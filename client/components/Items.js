import React from 'react';
import ItemImages from '../components/ItemImages';
import ItemDreamboard from '../components/ItemDreamboard';
import ItemTexts from '../components/ItemTexts';
import TextPad from '../components/TextPad';
import M from "materialize-css";
import Popup from "reactjs-popup";
import Masonry from 'react-masonry-component';
import Dropzone from 'react-dropzone';
import request from "superagent";
// import { Redirect } from 'react-router-dom'

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

class Items extends React.Component {

constructor(props) {

    super(props);
    this.state = { 

    	items: [],
      noItem: "false",
      itemPresent: "true",
      open: false,
      itemId: 0,
      files: [],
      nextItemId: 0,

    };

    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.addItemModal = this.addItemModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleIsNewTextPad = this.toggleIsNewTextPad.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.itemImages = this.itemImages.bind(this);
    this.deleteItemImages = this.deleteItemImages.bind(this);
};

componentWillMount() {

  if(this.props.sectionKind == "image"){

      $.ajax({
        url: `/api/sections/${this.props.sectionId}/item_images`,
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
          console.log(data);
        }
      }).done( items => { 
          this.setState({ items }); 
          // if (this.state.items != undefined || this.state.items.length != 0){
          //   let lastItemIndex = items.indexOf(items.slice(-1)[0]);
          //   let lastNextID = items[lastItemIndex].id + 1;
          //   this.state.nextItemId = lastNextID;
          //   console.log(lastNextID);
          //   console.log(this.state.nextItemId);
          //   // console.log(items[this.state.lastItemIndex].id); 
          // }  
          
      })

  }
  else{

    $.ajax({
        url: `/api/sections/${this.props.sectionId}/items`,
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
          // console.log(data);
        }
      }).done( items => { 
          this.setState({ items });     
      })

  }

}

  addItemModal(e)
  {
    e.preventDefault();
    let title = "test"
    let kind = this.props.sectionKind;
    let description = "hello test!"

    // console.log("kind :::"+kind);
    this.addItem(title,kind,description);
  }

  toggleIsNewTextPad()
  {
    this.props.toggleIsNewTextPad(this.props.sectionId, this.props.sectionKind);
  }

  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }

addImageItem(acceptedFiles)
{
  this.setState({
      files: acceptedFiles
  });
  
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

saveImage(e){
  e.preventDefault();
  // next to save it as a file to DB
  this.closeModal();

  let title = this.refs.imgtitle.value;;
  let description = this.refs.imagedes.value;
  let kind = this.props.sectionKind;
  // let image = img;
   console.log(kind);
  if(kind === "image"){
    
    //this.addItem(title,kind,description, this.state.files);
    this.itemImages(title,kind,description, this.state.files); 
  }
    
}

itemImages(title,kind,description, acceptedFiles){

  // console.log("item Images ", this.state.nextItemId, this.state.files[0]);
  console.log("item Images::: ", title,kind,description );
  //make another ajax call
  // /api/sections/:section_id/items/:item_id/item_images
  acceptedFiles.map(img => {

    const fileData = new FormData();
    let image = img;
    fileData.append("item_image[image]", image);
    fileData.append("item_image[title]", title);
    fileData.append("item_image[description]", description);
    fileData.append("item_image[kind]", kind);

    $.ajax({
       // url: `/api/sections/${this.props.sectionId}/items/30/item_images`,
       url: `/api/sections/${this.props.sectionId}/item_images`,
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
     }).done(image => {
        console.log(image);
     })//end done
    })//end maping
  


}

deleteItemImages(id){
  //console.log("reaching", id);
  $.ajax({
      url: `/api/sections/${this.props.sectionId}/item_images/${id}`,
      type: 'DELETE'
    }).done( item  => {
      let items = this.state.items;
      let index = items.findIndex( b => b.id === item.id );
      this.setState({ 
        items: [
          ...items.slice(0, index),
          ...items.slice(index + 1, items.length)
        ] 
      });
    }).fail( msg => {
      alert(msg.errors);
    });
}


  addItem(title,kind,description, image){

    this.setState({
      files: image
    });

		console.log("errthing-3: ", title + " " + description + " " + this.props.sectionId);
   $.ajax({
     url: `/api/sections/${this.props.sectionId}/items`,
     type: 'POST',
     data: { item: {title, kind, description}},
     dataType: 'JSON',
     success: function (data) {
      // console.log(data.id);      
    }
   }).done( item => {
     this.setState({ items: [...this.state.items, {...item}]});
  
   }).fail( errors => {
     alert(errors);
   })
  }

deleteItem()
{

}

 handleChange(e) {
    e.preventDefault();
    // console.log("e.target " + e.target.value);
    // this.setState({ kind: e.target.value });
  }

 render() {

 		if (this.state.items === undefined || this.state.items.length == 0) {

        if(this.props.sectionKind === "image"){
        return(<ItemImages sectionKind={this.props.sectionKind} sectionId={this.props.sectionId} sectionItem={this.state.noItem} addItem={this.itemImages}/>);
        }else if(this.props.sectionKind === "dreamboard"){
          return(<ItemDreamboard sectionKind={this.props.sectionKind} sectionId={this.props.sectionId} sectionItem={this.state.noItem} addItem={this.addItem}/>);
        }else if(this.props.sectionKind === "text"){
          return( <div>
              <li className="mdc-image-list__item" style={mdc_image_list__item_new}>
                <div className="card-content">
                    <span className="card-title grey-text center" onClick={this.toggleIsNewTextPad}>Add Item--5</span>
                </div>
              </li>
          </div>);        }

		}
    // else if(this.state.isNewTextPad){
    //   return (
    //     <div className="center">
    //       <TextPad toggleIsNewTextPad={this.toggleIsNewTextPad}/>
    //     </div>
    //   )
    // }
		else
		{
      let items = this.state.items.map( item => {

        if(item.kind === "image")
        {
          return(
          <ItemImages key={`item-${item.id}`} {...item} 
          deleteItem={this.deleteItem} 
          sectionKind={this.props.sectionKind} 
          sectionId={this.props.sectionId} 
          itemId={item.id}
          itemImage={item.image}  
          sectionItem={this.state.itemPresent} 
          addItem={this.itemImages}
          deleteItemImages={this.deleteItemImages}/>);

        }else if(item.kind === "dreamboard"){

          return(<ItemDreamboard key={`item-${item.id}`} {...item} 
          deleteItem={this.deleteItem} 
          sectionKind={this.props.sectionKind} 
          sectionId={this.props.sectionId} 
          sectionItem={this.state.itemPresent} 
          addItem={this.addItem}/>);

        }else if(item.kind === "text"){

          return(<ItemTexts key={`item-${item.id}`} {...item} 
          deleteItem={this.deleteItem} 
          sectionKind={this.props.sectionKind} 
          sectionId={this.props.sectionId} 
          sectionItem={this.state.itemPresent} 
          addItem={this.addItem}/>);
        }

      });

      return(
        <div>
            <ul className="mdc-image-list my-image-list" >
              {items}
               <li className="mdc-image-list__item image-element-class" style={mdc_image_list__item_new}>
                <div className="card-content">
                {
                  this.props.sectionKind === "text" ? (<div> 
                      <span className="card-title grey-text center" onClick={this.toggleIsNewTextPad}>Add Item--1</span>
                    </div>): (<div>
                      {
                        this.props.sectionKind === "dreamboard" ? (<div>

                        <Popup trigger ={<span className="card-title grey-text center" >Add Item--3</span>} modal closeOnDocumentClick>
                        { close => (
                            <div>
                             <div className=""><h4> New Dreamboard </h4></div>
                             <a className="right" >Tutorials</a>
                             <input className="modal-content" placeholder="Dreamboard Name" ref="title" required={true} />
                             <Popup trigger ={<button className="waves-effect waves-green btn-flat black orange-text">Choose a template</button>} modal closeOnDocumentClick>
                              <span> Popup content </span>
                             </Popup>
                              <hr className="grey lighten-5"/>
                              <div className="modal-footer right">
                                <a href="#" className="modal-close waves-effect waves-green btn-flat" onClick={close}>CANCEL</a>                    
                                <a href="#" className="modal-close waves-effect waves-green btn-flat">OK</a>
                              </div>
                            </div>
                        )}
                       </Popup>

                        </div>) : (<div>
                          <span className="card-title grey-text center" onClick={this.openModal}>
                            Add Item--4
                          </span>
                        {

                          <Popup 
                            open={this.state.open}
                            closeOnDocumentClick
                            onClose={this.closeModal}
                          >
                          {
                              <div>
                               <div>
                                  <h4 className="center">New Image</h4>
                                  <div className="modal-footer right">
                                    <a href="#" className="modal-close waves-effect waves-green btn-flat" onClick={this.closeModal}>CANCEL</a>                    
                                    <a href="#" className="modal-close waves-effect waves-green btn-flat" onClick={this.saveImage.bind(this)}>OK</a>
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
                                        <Dropzone onDrop={this.addImageItem.bind(this)}>
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
                          }
                         </Popup>
                        }
                        </div>)
                        }
                    </div>)
                }
                </div>
               </li>
            </ul>
        </div>
      );

		}

  }
  
}

export default Items;