import React from 'react';
import LandingPad from '../components/LandingPad';
import Cards from '../components/Cards';
import Modal from '../components/Modal';
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
      sections: [],
      sectionCount: 0,
      lastSectionIndex: 0,
    };

  this.toggleIsLandingPad = this.toggleIsLandingPad.bind(this);
  this.toggleIsUserSelection = this.toggleIsUserSelection.bind(this);
  this.toggleIsNewCard = this.toggleIsNewCard.bind(this);
  this.addSection = this.addSection.bind(this);
  this.deleteSection = this.deleteSection.bind(this);
  this.onEditSection = this.onEditSection.bind(this);

  }

    componentWillMount() {
    $.ajax({
      url: '/api/sections',
      type: 'GET',
      dataType: 'JSON',
      success: function (data) {
        console.log(data);
      }
    }).done( sections => { 
        this.setState({ sections });
        this.state.sectionCount = sections.length;
        this.state.lastSectionIndex = sections.indexOf(sections.slice(-1)[0])
        
    })
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

  addSection(e){
     let title = this.refs.title.value;
     let color = '#dcedc8';
     let collapse = true;
     e.preventDefault();
     $.ajax({
       url: '/api/sections',
       type: 'POST',
       data: { section: { title, color , collapse}},
       dataType: 'JSON',
       success: function (data) {
        console.log(data);
      }
     }).done( section => {
       this.setState({ sections: [{...section}, ...this.state.sections ]});
       this.refs.addForm.reset();
     }).fail( errors => {
       alert(errors);
     })
    
  }

  deleteSection(id) {
    $.ajax({
      url: `/api/sections/${id}`,
      type: 'DELETE'
    }).done( section  => {
      let sections = this.state.sections;
      let index = sections.findIndex( b => b.id === section.id );
      this.setState({ 
        sections: [
          ...sections.slice(0, index),
          ...sections.slice(index + 1, sections.length)
        ] 
      });
    }).fail( msg => {
      alert(msg.errors);
    });
  }


   onEditSection(id, section){

    $.ajax({
      url: `/api/sections/${id}`,
      type: 'PUT',
      data: { section: section },
      dataType: 'JSON'
    }).done( section => {
      console.log(section);
      let sections = this.state.sections;
      let editSection = sections.find( i => i.id === section.id );
      editSection.title = section.title;
      editSection.color = section.color;
      editSection.collapse = section.collapse;
      this.setState({ sections: sections });
    }).fail( msg => {
       alert(msg.errors);
    });
    
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
      const sectionCount = this.state.sections.length;
      var lastSectionIndex = 0;
      if(this.state.sections.length != 0)
      {
        lastSectionIndex = this.state.sections.indexOf(this.state.sections.slice(-1)[0]) ;
        console.log('lastSectionIndex ' + lastSectionIndex);
      }
      
      let sections = this.state.sections.map(section => {
        console.log('reaching? ' + this.state.sections.indexOf(section))
        return(<Cards key={`section-${section.id}`} {...section} 
        toggleIsNewCard={this.toggleIsNewCard} sectionCount={sectionCount} 
        lastSectionIndex={lastSectionIndex}  yourIndex={this.state.sections.indexOf(section)} delete={this.deleteSection}
         editSection={this.onEditSection} />);
      })

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
          {
            this.state.isNewCard === true ? 
            (
              <div>
                  <h4>New Section</h4>
                  <form ref="addForm" onSubmit={this.addSection}>
                    <input placeholder="Title" ref="title" required={true} />
                    <input placeholder="Color" ref="color" />
                    <button className="btn">Add</button>
                  </form>
                </div>
              ): (null)
            }
          </div>
          <div>
            <ul>
              { sections }
            </ul>
          </div>
        </div>
      )
    }//end else
  }
}

export default App;

