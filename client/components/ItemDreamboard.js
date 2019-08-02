import React from 'react';
import M from "materialize-css";

import Masonry from 'react-masonry-component';
 
const masonryOptions = {
    transitionDuration: 0
};
 
const imagesLoadedOptions = { background: '.my-bg-image-el' }
 
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

class ItemDreamboard extends React.Component {

constructor(props) {

    super(props);

    this.addItem = this.addItem.bind(this);
}

  addItem(e){
    e.preventDefault();
    let title = "dreamboard test"
    let kind = "dreamboard";
    let description = "hello dreamboard test!"

    
    this.props.addItem(title,kind,description);
  }
  
 render() {

 	 	if(this.props.sectionItem === "false")
    {
       return(
        <div>
            <li className="mdc-image-list__item" style={mdc_image_list__item_new}>
              <div className="card-content">
                  <span className="card-title grey-text center" onClick={this.addItem}>Add Item</span>
              </div>
            </li>
        </div>
       );
      
    }else{

		    return (
		      <div  >
		      	<div>
		      		<h1> HELLO Dreamboard!!!!!</h1>
		      	</div>
		      </div>
		    )
    }
}
  
}

export default ItemDreamboard;