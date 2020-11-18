import React, {useState} from 'react';
import {FileUpload} from 'primereact/fileupload';
import './upload.css';

function Upload(props){

    const view = {upload:1,success:2,failure:4}

    const [state, setState] = useState({currentView:view.upload});

    const addToken = e => { e.xhr.setRequestHeader("x-access-token", props.token)}

    const onSuccess = () => setState({currentView:view.success})

    const onFailure = () => setState({currentView:view.failure})

    switch (state.currentView) {

        case view.upload:
            return (
            <div className="container-upload">
                <div>
                    <h3>Select or drag and drop images</h3>
                </div>
                <FileUpload 
                    name={props.name} 
                    url="/upload" 
                    multiple={true} 
                    accept="image/*" 
                    onBeforeSend={addToken} 
                    onUpload={onSuccess} 
                    onError={onFailure}  />
            </div>)
    
        case view.success:
            return (
            <div className="container-upload">
                <h4 className="success">Image upload successful</h4>
            </div>)

        case view.failure:
            return (
            <div className="container-upload">
                <h4 className="failure">Image upload unsuccessful. Please try again.</h4>
            </div>)
    }
}

export default Upload;