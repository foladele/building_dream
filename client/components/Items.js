import React from 'react';
import ItemImages from '../components/ItemImages';
import ItemDreamboard from '../components/ItemDreamboard';
import ItemTexts from '../components/ItemTexts';
import M from "materialize-css";


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
    // this.ModalMaking = this.ModalMaking.bind(this);

};

componentWillMount() {
	$.ajax({
	  url: `/api/sections/${this.props.sectionId}/items`,
	  type: 'GET',
	  dataType: 'JSON',
	  success: function (data) {
	    console.log(data);
	  }
	}).done( items => { 
	    this.setState({ items });   
      console.log(items); 
	})
}

  addItemModal(e)
  {
    e.preventDefault();
    let title = "test"
    let kind = this.props.sectionKind;
    let description = "hello test!"

    console.log("kind :::"+kind);
    this.addItem(title,kind,description);

  }

  addItem(title,kind,description){
		
   $.ajax({
     url: `/api/sections/${this.props.sectionId}/items`,
     type: 'POST',
     data: { item: {title, kind, description}},
     dataType: 'JSON',
     success: function (data) {
      console.log(data);
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

 render() {

 		if (this.state.items === undefined || this.state.items.length == 0) {

        if(this.props.sectionKind === "image"){
        return(<ItemImages sectionKind={this.props.sectionKind} sectionId={this.props.sectionId} sectionItem={this.state.noItem} addItem={this.addItem}/>);
        }else if(this.props.sectionKind === "dreamboard"){
          return(<ItemDreamboard sectionKind={this.props.sectionKind} sectionId={this.props.sectionId} sectionItem={this.state.noItem} addItem={this.addItem}/>);
        }else if(this.props.sectionKind === "text"){
          return(<ItemTexts sectionKind={this.props.sectionKind} sectionId={this.props.sectionId} sectionItem={this.state.noItem} addItem={this.addItem}/>);
        }

		}
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
             <li className="mdc-image-list__item" style={mdc_image_list__item_new}>
              <div className="card-content">
                <span className="card-title grey-text center" onClick={this.addItemModal}>Add Item</span>
              </div>
             </li>
          </ul>
        </div>
      );

		}

  }
  
}

export default Items;