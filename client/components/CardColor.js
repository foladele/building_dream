import React from 'react';
import { ChromePicker } from 'react-color';

class CardColor extends React.Component {

  state = {
    newColor: '#fff',
    // showPicker: false
  };
 
 handleChangeComplete = (ncolor, event) => {
    // event.preventDefault();

    console.log(this.state.newColor);
    this.setState({ newColor: ncolor.hex });
    
  }


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

export default CardColor;
