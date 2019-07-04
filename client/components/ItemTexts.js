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
};

	componentDidMount() 
	{

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

 render() {

 	  if(this.props.sectionItem === "false")
    {
       return(
        <div>
            <li className="mdc-image-list__item" style={mdc_image_list__item_new}>
              <div className="card-content">
                  <span className="card-title grey-text center">Add Item</span>
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