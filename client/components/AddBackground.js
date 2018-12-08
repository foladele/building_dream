import React from 'react';
import { ChromePicker } from 'react-color';

class AddBackground extends React.Component {

  state = {
    newColor: '#fff',
    // showPicker: false
  };
 
 handleChangeComplete = (ncolor, event) => {
    // event.preventDefault();
    this.setState({ newColor: ncolor.hex });
    console.log(this.state.newColor);
    // alert('Your favorite flavor is: ' + this.state.newColor);
    let id = 16;
    let name = this.state.newColor
    let color = this.state.newColor
    console.log("AddBackground name:" + color)

    $.ajax({
      url: `/api/backgrounds/${id}`,
      type: 'PUT',
      data: { background: { name, color} },
      success: function (data) {  
        console.log(data);  
      }
    }).done( background => {
      this.props.updateBackground(background)
    })

  };

  render() {
    return (
      <div className="row right-align">
        <div className="col s2">
         <ChromePicker 
           color={ this.state.newColor }
           onChangeComplete= { this.handleChangeComplete } 
          />
        </div>
      </div>

    );
  }
}

export default AddBackground;
