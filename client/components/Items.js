import React from 'react';
import ItemImages from '../components/ItemImages';
import ItemDreamboard from '../components/ItemDreamboard';
import ItemTexts from '../components/ItemTexts';
import TextPad from '../components/TextPad';
import M from "materialize-css";
import Popup from "reactjs-popup";
import Masonry from 'react-masonry-component';
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
    						 };

    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.addItemModal = this.addItemModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleIsNewTextPad = this.toggleIsNewTextPad.bind(this);
};

componentWillMount() {
	$.ajax({
	  url: `/api/sections/${this.props.sectionId}/items`,
	  type: 'GET',
	  dataType: 'JSON',
	  success: function (data) {
	    // console.log(data);
	  }
	}).done( items => { 
	    this.setState({ items });   
      // console.log(items); 
	})
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

  addItem(title,kind,description){
		
   $.ajax({
     url: `/api/sections/${this.props.sectionId}/items`,
     type: 'POST',
     data: { item: {title, kind, description}},
     dataType: 'JSON',
     success: function (data) {
      // console.log(data);
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
        return(<ItemImages sectionKind={this.props.sectionKind} sectionId={this.props.sectionId} sectionItem={this.state.noItem} addItem={this.addItem}/>);
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
          <ItemImages key={`item-${item.id}`} {...item} deleteItem={this.deleteItem} sectionKind={this.props.sectionKind} sectionId={this.props.sectionId} sectionItem={this.state.itemPresent} addItem={this.addItem}/>);

        }else if(item.kind === "dreamboard"){

          return(<ItemDreamboard key={`item-${item.id}`} {...item} deleteItem={this.deleteItem} sectionKind={this.props.sectionKind} sectionId={this.props.sectionId} sectionItem={this.state.itemPresent} addItem={this.addItem}/>);

        }else if(item.kind === "text"){

          return(<ItemTexts key={`item-${item.id}`} {...item} deleteItem={this.deleteItem} sectionKind={this.props.sectionKind} sectionId={this.props.sectionId} sectionItem={this.state.itemPresent} addItem={this.addItem}/>);
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
                        {
                          <Popup trigger ={<span className="card-title grey-text center" >Add Item--4</span>} modal closeOnDocumentClick>
                          {
                              <div>
                               <div><h4> hello image </h4></div>
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