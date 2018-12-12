import React from 'react';
import LandingPad from '../components/LandingPad';


class App extends React.Component {
	constructor(props) {
    super(props);

    this.state = { 
      isLandingPad: false,
    };
  this.toggleIsLandingPad = this.toggleIsLandingPad.bind(this);
  }

  toggleIsLandingPad(){
    this.setState({ isLandingPad: !this.state.isLandingPad })
  }

  render() {

    if(this.state.isLandingPad)
    {
      return (
      <div className="center">
        <LandingPad toggleIsLandingPad={this.toggleIsLandingPad}/>
      </div>
      )

    }else
    {
      return (
        <div >
          <nav>
            <div className="nav-wrapper">
              <a href="#" className="brand-logo right">Logo</a>
              <ul id="nav-mobile" className="left hide-on-med-and-down">
                <li><a onClick={this.toggleIsLandingPad}>Menu</a></li>
              </ul>
            </div>
          </nav>

          <div className="Queen-Heading center">
           <h3>Queen's Dream Board</h3>
         </div>
        </div>
      )
    }//end else
  }
}

export default App;

