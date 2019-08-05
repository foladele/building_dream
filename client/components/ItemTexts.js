import React from 'react';
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
    height: '100px',
    position: 'relative',
    boxSizing: 'border_box',
    listStyleType: 'none',
};


class ItemTexts extends React.Component {

constructor(props) {

    super(props);
    this.addItem = this.addItem.bind(this);
}

addItem(e){
  e.preventDefault();
  let title = "Texts test"
  let kind = "text";
  let description = "hello Texts test!"
  this.props.addItem(title,kind,description);
 }

 render() {

 	  if(this.props.sectionItem === "false")
    {
       return(
        <div>
            <li className="mdc-image-list__item" style={mdc_image_list__item_new}>
              <div className="card-content">
                  <span className="card-title grey-text center" onClick={this.props.toggleIsNewTextPad}>Add Item--2</span>
              </div>
            </li>
        </div>
       );
      
    }else{

		    return (
		      <div  >
		      	<div>
		      		<h1> HELLO Texts</h1>
		      	</div>
		      </div>
		    )
		  }
    }
  
}

export default ItemTexts;