import React from 'react';
import LandingPad from '../components/LandingPad';
import Cards from '../components/Cards';
import BackgroundList from '../components/BackgroundList';
import { AppRegistry, StyleSheet, Text, View } from 'react-native-web';
import FreeScrollBar from 'react-free-scrollbar';
//import Styles from '../components/Styles';

// import MaterialIcon, {colorPalette} from 'material-icons-react';

const Styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  white: {
    backgroundColor: 'white',
    overflow: 'scroll',
  },

});

const bStyle = {
  height: '700px',
  width: '1280px'
};

const dStyle = {
  height: '200px',
  width: '1225px',
  overflow:'wrap',
  padding: '3px',
};

//class starts here

class App extends React.Component {

	constructor(props) {

    super(props);

    this.state = { 
      isLandingPad: false,
      isUserSelection: false,
      isNewCard: false,
    };

  this.toggleIsLandingPad = this.toggleIsLandingPad.bind(this);
  this.toggleIsUserSelection = this.toggleIsUserSelection.bind(this);
  this.toggleIsNewCard = this.toggleIsNewCard.bind(this);

  }

  toggleIsLandingPad(){
    this.setState({ isLandingPad: !this.state.isLandingPad })
  }

  toggleIsUserSelection(){
    this.setState({ isUserSelection: !this.state.isUserSelection })
  }

  toggleIsNewCard(){
    this.setState({ isNewCard: !this.state.isNewCard })
  }

  render() {

    if(this.state.isLandingPad)
    {
      return (
      <div className="center">
        <LandingPad toggleIsLandingPad={this.toggleIsLandingPad}/>
      </div>
      )

    }else if(this.state.isUserSelection){
      return(
        <div>
          <BackgroundList />
        </div>
      )
    }else
    {
      const elements = [1, 2];

      return (
        <div >
          <nav>
            <div className="nav-wrapper">
              <a href="#" className="brand-logo right">Logo</a>
              <a href="#" className="brand-logo center">Queen's Dream Board</a>
              <ul id="nav-mobile" className="left hide-on-med-and-down">
                <li><a onClick={this.toggleIsLandingPad}>Menu</a></li>
              </ul>
            </div>
          </nav>
          <div>
            <ul>
              {elements.map((value, index) => {
                return <Cards /> 
              })}
            </ul>
          </div>
        </div>
      )
    }//end else
  }
}

export default App;

