import React from 'react';
import M from "materialize-css";
// import "materialize-css/dist/css/materialize.min.css";


class Modal extends React.Component {

  constructor(props) {

      super(props);
  };

  componentDidMount() {
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
        this.props.toggleEditTitle
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
    return (
      <div>
        <a className="waves-effect waves-light btn modal-trigger" data-target="modal1" >Edit</a>
        <div ref={Modal => { this.Modal = Modal; }} id="modal1" className="modal modal-fixed-footer" >
          <div className="modal-content">
            <h4>Modal Header</h4>
            <p>A bunch of text</p>
          </div>
          <div className="modal-footer">
            <a href="#" className="modal-close waves-effect waves-red btn-flat" onClick={this.props.toggleEditTitle}> Disagree </a>
            <a href="#" className="modal-close waves-effect waves-green btn-flat" onClick={this.props.toggleEditTitle}> Agree</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;