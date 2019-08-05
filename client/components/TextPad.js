import React from 'react';
import { AtomicBlockUtils, convertToRaw, convertFromRaw, EditorState, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import BlockStyleControls from '../components/BlockStyleControls';
import InlineStyleControls from '../components/InlineStyleControls';


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
	};

	this.onChange = this.onChange.bind(this);
	this.focus = () => this.refs.editor.focus();
	this.handleKeyCommand = this.handleKeyCommand.bind(this);
	this.saveContent = this.saveContent.bind(this);
	this.getBlockStyle = this.getBlockStyle.bind(this);
	this.onTab = e => this._onTab(e);
  this.eidtTitle = this.eidtTitle.bind(this);

//session - component did mount
	const content = window.sessionStorage.getItem('content');

  if (content) {
    this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
    console.log('content-2 state', convertFromRaw(JSON.parse(content)));
  } else {
    this.state.editorState = EditorState.createEmpty();
  }
	
}

	onChange = (editorState) => {
		const contentState = editorState.getCurrentContent();
		console.log('content state', convertToRaw(contentState));
		this.saveContent(contentState);
		this.setState({editorState});
	}

handleKeyCommand(command, editorState){

	// const contentState = editorState.getCurrentContent();
	// console.log('content state', convertToRaw(contentState));

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
  // fileData.append("background[title]", title);
  // fileData.append("background[description]", description);
  // fileData.append("background[kind]", kind);
  // fileData.append("background[file]", JSON.stringify(convertToRaw(content)));

   // for (var pair of fileData.entries()) {
   //      console.log(pair); 
   //      console.log(pair[0]+ ', ' + pair[1]); 
   //   }
}


_onTab(e) {
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
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

eidtTitle()
{
   this.setState({ eidtTitle: !this.state.eidtTitle });
}

 render() {
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
            	<div className = 'RichEditor-editor' style={{ padding: "10px", border: "1px solid #030a05"}}>
		        		<Editor
		        			editorState={this.state.editorState}
		        			blockStyleFn={this.getBlockStyle}
		        			customStyleMap={styleMap}
		        			onChange={this.onChange}
		        			handleKeyCommand={this.handleKeyCommand}
		        			ref="editor"
              		spellCheck={true}
		        		/>
		        	</div>
        </div>
      </div>
    )
  }
}

export default TextPad;