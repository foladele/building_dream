import React from 'react';
import Item from '../components/Item';

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
    height: '100px',
    position: 'relative',
    boxSizing: 'border_box',
    listStyleType: 'none',
};

class Items extends React.Component {

constructor(props) {

    super(props);
    this.state = { 

    	items: [],

    						 };

    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
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
	})
}


  addItem(e){
  		e.preventDefault();
  		 console.log('reaching???');
  		// :title, :kind, :description, :file

  		let title = "test"
  		let kind = "text"
  		let description = "hello test!"


     $.ajax({
       url: `/api/sections/${this.props.sectionId}/items`,
       type: 'POST',
       data: { item: {title, kind, description}},
       dataType: 'JSON',
       success: function (data) {
        console.log(data);
      }
     }).done( section => {
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
			 )
		}
		else
		{
			let items = this.state.items.map( item => {
			return(<Item key={`item-${item.id}`} {...item} deleteItem={this.deleteItem} />);
			});

	    return (
	      <div >
	      	{items}
	      </div>
	    )

		}

  }
  
}

export default Items;