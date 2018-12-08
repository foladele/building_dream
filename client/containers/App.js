import React from 'react';
import AddBackground from '../components/AddBackground';
import BackgroundList from '../components/BackgroundList';
import ImageUploader from '../components/ImageUploader';
import { PhotoshopPicker } from 'react-color';

class App extends React.Component {
	constructor(props) {
    super(props);
    this.state = { 
    	backgrounds: [], 
    	isColor: false, 
    	isImage: false,
    	showMenu: false,
    	backgroundStyle: {},

    };
    this.toggleColor = this.toggleColor.bind(this)
    this.toggleImage = this.toggleImage.bind(this)
    this.showMenu = this.showMenu.bind(this);
  }

	componentDidMount() {
    $.ajax({
      url: '/api/backgrounds',
      type: 'GET',
      dataType: 'JSON',
      success: function (data) {
        console.log(data);
      }
    }).done( backgrounds => {
      this.setState({ backgrounds })
      let newState = Object.assign({}, this.state);
      let bgColor = {
        // backgroundColor: '#fce4ec'
        backgroundColor: `${newState.backgrounds[0].name}`
      };
      this.setState({backgroundStyle: bgColor});
      console.log(newState.backgrounds[0].name)

    })
  }

   updateBackground(background) {
      let bgColor = {
        backgroundColor: `${background.name}`
      };
      this.setState({backgroundStyle: bgColor});

      this.setState({ backgrounds: [ ...this.state.backgrounds, { ...background } ] }) 
  }



  toggleColor(){
		this.setState({ isColor: !this.state.isColor })
	}

	toggleImage(){
    this.setState({ isImage: !this.state.isImage })
  }
	showMenu(event) {
	    event.preventDefault();
	    this.setState({ showMenu: !this.state.showMenu });
	  }

  render() {

  	if(this.state.isColor){

  		return(
				<div className="left-align" style={this.state.backgroundStyle}>
						<button onClick={this.toggleColor}>Back</button> 
				  	{ <AddBackground updateBackground={this.updateBackground.bind(this)}/> }
  			</div>

  			)//end return
  			

  	} //end if
    else if (this.state.isImage){

      return(
        <div className="left-align" style={this.state.backgroundStyle}>
            <button onClick={this.toggleImage}>Back</button> 
            { <ImageUploader updateBackground={this.updateBackground.bind(this)}/> }
        </div>

        )//end return
        

    } //end if
  	else{
			return(
  				
					<div style={this.state.backgroundStyle} className="left-align" >
						<button onClick={this.showMenu}>
							V
						</button> 
						{
							this.state.showMenu ? (
								<div className="menu">
									<button onClick={this.toggleColor}> color </button><br/>
									<button onClick={this.toggleImage}> image </button><br/>
									<button> Menu item 3 </button><br/>
								</div>
							) : (null)
							
						}						
	  			</div>
  		)//end return

  	}//end else
  			

  }
}

export default App;

