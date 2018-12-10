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
    let id = 46;
    let name = "color"
    let color = this.state.newColor
    let status = true
    console.log("AddBackground name:" + color)

    $.ajax({
      url: `/api/backgrounds/${id}`,
      type: 'PUT',
      data: { background: { name, color, status} },
      success: function (data) {  
        console.log(data);  
      }
    }).done( background => {
      this.props.updateBackgroundColor(background)
    })
  }

 // handleChangeComplete = (ncolor, event) => {
 //   event.preventDefault();

 //   this.setState({ newColor: ncolor.hex });

 //   let id = 46;
 //   let name = "color"
 //   let image = " "
 //   let color = this.state.newColor
 //   console.log("AddBackground name:" + color)


 //   const fileData = new FormData();
 //   fileData.append("background[name]", name);
 //   fileData.append("background[color]", color);
 //   fileData.append("background[image]", image);

 //    $.ajax({
 //    url: `/api/backgrounds/${id}`,
 //    type: 'PUT',
 //    data: fileData,
 //    dataType: 'JSON',
 //    contentType: false,
 //    processData: false,
 //    cache: false, 
 //    success: function (data) { 
 //      // console.log(data);  
 //    },error: function (data) {  
 //      console.log(data);  
 //    } 
 //    }).done( data => {
 //       // console.log(image);
 //       this.props.updateBackgroundColor(data)
 //    })

 // }

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
