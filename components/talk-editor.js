import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Link from "next/link";
import { convertToRaw } from 'draft-js';
import RequestServer from './requestServer'
import Modal from 'react-modal'

class TalkEditorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  openModal = () => {
    this.setState({
      showModal: true
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false
    });
  };

  render() {
    const { showModal } = this.state;

    return (
      <div>
        <Link href="" onClick={this.openModal}><h2 className='mb-2'>Write</h2></Link>
        {showModal && (
          <Modal className="modal" 
                  isOpen={showModal}
                  // onAfterOpen={openModal}
                  // onRequestClose={closeModal}
                  style={{overlay: {
                    position: 'fixed',
                    top: 40,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.75)'
                  },
                  content: {
                    position: 'absolute',
                    top: '40px',
                    left: '40px',
                    right: '40px',
                    bottom: '40px',
                    border: '1px solid #ccc',
                    background: '#fff',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '20px',
                    backgroundColor: 'rgba(30, 41, 59, 1)'
                  }
                  }}
                  contentLabel="New Talk">

            <div className="modal-content">
              <span className="close" onClick={this.closeModal}>
                &times;
              </span>
              <NewTalkEditor currentTalkCatetory={this.props.currentTalkCatetory} />
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

class NewTalkEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      category: props.currentTalkCatetory,
      title: '',
      darkMode: false // Assuming you have a darkMode state in your application
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  };

  handleCategoryChange = (event) => {
    this.setState({
      category: event.target.value
    });
  };

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value
    });
  };

  createTalkItem = () => {
    // Handle submission logic here
    // For example, you can access the category, title, and editorState using this.state
    // You can send the data to a backend API, update the state of the parent component, etc.
    console.log('Category:', this.state.category);
    console.log('Title:', this.state.title);
    console.log('Editor State:', this.state.editorState);

    const category = this.state.category;
    const title = this.state.title;
    const jcontent = convertToRaw(this.state.editorState.getCurrentContent());
    const content = JSON.stringify(jcontent).replace(/"/g, '\\"');
    if(process.env.userInfo === undefined || 
       process.env.userInfo.USER_ID === undefined || 
       process.env.userInfo.USER_ID === ''){
      alert(`the user is not logged in. sign in first.`);
      return;
    }

    RequestServer("POST", 
    `{"commandName": "talk.createTalkItem", 
      "systemCode":"00",
      "talkCategory": "${category}",
      "title": "${title}",
      "content": "${content}",
      "userId": "${process.env.userInfo.USER_ID}"
     }`).then((result) => {
      if(result.error_code==0){
        alert("Suucessfully writed.");
        
      }else {
        alert(JSON.stringify(result.error_message));
      }
    })
  }

  render() {
    const { editorState, category, title, darkMode } = this.state;

    return (
      <div>
        <div className="flex items-center mb-2">
          <label className="w-20 mr-2 text-slate-100">
            Category
          </label>
          <input className="w-full" 
                 type="text" 
                 value={category} 
                 onChange={this.handleCategoryChange}/>
        </div>
        <div className="flex items-center mb-2">
        <label className="w-20 mr-2 text-slate-100">Title</label>
          <input className="w-full" type="text" value={title} onChange={this.handleTitleChange} />
        </div>
        <div style={{ height: '100%' }}>
          <Editor
            editorState={editorState}
            // wrapperClassName="rich-editor-wrapper"
            // editorClassName="rich-editor"
            onEditorStateChange={this.onEditorStateChange}
            toolbar={{ 
              options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'remove', 'history'],
              inline: { options: ['bold', 'italic', 'underline', 'strikethrough'] },
              blockType: { options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'] },
              fontSize: { options: [12, 14, 16, 18, 24, 30, 36, 48, 60, 72] },
              fontFamily: { options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'] }
            }}
            editorStyle={{
              padding: 0,
              // height: '100%',
              // backgroundColor: 'slate',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
            placeholder="The message goes here..."
          />
        </div>
        <button className="mb-5 text-slate-100" 
                onClick={this.createTalkItem}>
          Save
        </button>
      </div>
    );
  }
}

export { TalkEditorModal };
