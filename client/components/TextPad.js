import React from 'react';
import { AtomicBlockUtils, convertToRaw, convertFromRaw, EditorState, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import BlockStyleControls from '../components/BlockStyleControls';
import InlineStyleControls from '../components/InlineStyleControls';
import PropTypes from "prop-types";
import Dropzone from 'react-dropzone';
import request from "superagent";

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};


class TextPad extends React.Component {

constructor(props) {
	super(props);
	this.state ={
		editorState: EditorState.createEmpty(),
    eidtTitle: false,
    showURLInput: false,
    url: '',
    urlType: '',
    files: [],
	};

	this.onChange = this.onChange.bind(this);
	this.focus = () => this.refs.editor.focus();
	this.handleKeyCommand = this.handleKeyCommand.bind(this);
	this.saveContent = this.saveContent.bind(this);
	this.getBlockStyle = this.getBlockStyle.bind(this);
	this.onTab = this.onTab.bind(this);
  this.eidtTitle = this.eidtTitle.bind(this);
  this.addImage = this.addImage.bind(this);

//session - component did mount
	const content = window.sessionStorage.getItem('content');

  if (content) {
    this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
    // console.log('content-2 state', convertFromRaw(JSON.parse(content)));
  } else {
    this.state.editorState = EditorState.createEmpty();
  }
	
}

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(f => URL.revokeObjectURL(f.preview))
  }

  componentDidMount()
  {

  }

	onChange = (editorState) => {
		const contentState = editorState.getCurrentContent();
		console.log('content state', convertToRaw(contentState));

    // if (contentState.hasText()) {

      // console.log('content.first: ', contentState.getBlockMap().first().getText());
      // convertToRaw(contentState).blocks.map(el=>
      //   console.log(el.inlineStyleRanges));
        // el.inlineStyleRanges.map(r => 
        //   console.log(r.style));
        //   );
        

      // if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        
      // }
    // }


		this.saveContent(contentState);
		this.setState({editorState});
	}

handleKeyCommand(command, editorState){

	// const contentState = editorState.getCurrentContent();
	// console.log('content state', convertToRaw(contentState));
  console.log('command: ', command);
	const newState = RichUtils.handleKeyCommand(editorState, command);

	if(newState){
		this.onChange(newState);
		return "handled"
	}

	return "non-handled"
}

saveContent(content){
  window.sessionStorage.setItem('content', JSON.stringify(convertToRaw(content)));
  const fileData = new FormData();

  // next to save it as a file to DB
  // fileData.append("background[title]", title);
  // fileData.append("background[description]", description);
  // fileData.append("background[kind]", kind);
  // fileData.append("background[file]", JSON.stringify(convertToRaw(content)));

   // for (var pair of fileData.entries()) {
   //      console.log(pair); 
   //      console.log(pair[0]+ ', ' + pair[1]); 
   //   }
}


onTab(e) {
	  // e.preventDefault();
	  alert("reaching onTab!!!")
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

 toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

toggleInlineStyle(inlineStyle) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }

getBlockStyle(block) {
  // console.log("block: ", block.getType());
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    case 'code-block':
      return 'card card-title card-content';
    default:
      return null;
  }
}

promptForMedia(type){

  this.setState({
      showURLInput: true,
      urlValue: '',
      urlType: type
    }, () => {
      setTimeout(() => this.refs.url.focus(), 0);
    });

}

toggleShowURLInput()
{
  this.setState({
    showURLInput: !this.state.showURLInput,
  });
}

addImage(acceptedFiles)
{
  this.setState({
      files: acceptedFiles
  });
  
  var binaryStr;
  const fileList = document.getElementById("fileList");
  fileList.innerHTML = "";
  console.log("reaching -0", acceptedFiles[0])
  for (let i = 0; i < acceptedFiles.length; i++) {

    console.log("reaching -i times", acceptedFiles[i]);

    const file = acceptedFiles[i];
    const img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;
    img.height = 250;
    console.log("img ", img.src);
    fileList.appendChild(img);

    const reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
  }
}

eidtTitle()
{
   this.setState({ eidtTitle: !this.state.eidtTitle });
}

 render() {
  const {files} = this.state;
    return (
      <div className="container">
        <div className="RichEditor-root">
        	<button className="left" onClick={this.props.toggleIsNewTextPad}>back</button><br/>
          {
            this.state.eidtTitle ? 
            (<div>
              <button className="right" onClick={this.eidtTitle}>Save</button>
              <h1 className="center" style={{ padding: "10px", border: "1px solid #ddd"}}>
                <input placeholder="Title" ref="title" required={true} />
              </h1>

            </div>) 
            : 
            (<div>
              <h1 className="center" style={{ padding: "10px", border: "1px solid #ddd"}} onClick={this.eidtTitle}>Hello TextPad {this.props.sectionId}</h1>
            </div>)
          }
        			<BlockStyleControls
		            editorState={this.state.editorState}
		            onToggle={this.toggleBlockType.bind(this)}
		          />
		          <InlineStyleControls
		            editorState={this.state.editorState}
		            onToggle={this.toggleInlineStyle.bind(this)}
		          />
              <button 
                onMouseDown={this.toggleShowURLInput.bind(this)}
                className="waves-effect waves-light btn">Add Image
              </button>
              {
                this.state.showURLInput ? 
                (
                  <div>
 
                  <Dropzone onDrop={this.addImage}>
                      {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                        if (isDragActive) {
                          return "This file is authorized";
                        }
                        if (isDragReject) {
                          return "This file is not authorized";
                        }
                        return acceptedFiles.length || rejectedFiles.length
                          ? `Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`
                          : "Try dropping some files.";
                      }}
                    </Dropzone>
                    <div id="fileList">
                      <p>No files selected!</p>
                    </div>
                  </div>
                ) : 
                (null)
              }

            	<div className = 'RichEditor-editor' style={{ padding: "10px", border: "1px solid #030a05"}}>
		        		<Editor
		        			editorState={this.state.editorState}
		        			blockStyleFn={this.getBlockStyle}
		        			customStyleMap={styleMap}
		        			onChange={this.onChange}
		        			handleKeyCommand={this.handleKeyCommand}
                  onTab={this.onTab}
		        			ref="editor"
                  placeholder="Enter some text..."
              		spellCheck={true}
		        		/>
		        	</div>
        </div>
      </div>
    )
  }
}

export default TextPad;