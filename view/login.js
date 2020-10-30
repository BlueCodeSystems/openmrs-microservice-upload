import React, {useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';
import './login.css';
import axios from "axios";
import Upload from "./upload";



 function Login(){
   
  const [state, setState] = useState({username:"", password:"", authorized: false, name:"", incorrectCredentials:false, token:""});

  const emitUsername = username => setState({ ...state,username })

  const emitPassword = password => setState({ ...state,password })

    const submit = async() => {
      console.log(`Sending request: ${state.username}, ${state.password}`);
      let token;
      try{
         
         let result = await axios.get("https://cors-anywhere.herokuapp.com/https://openmrs.bluecodeltd.com/middleware/rest/session/", {auth:{ username:state.username, password:state.password}});
         token = result.data.token;
         
         console.log(`Result: ${result.data}`);
         
         let facilityId = result.data.user.location[0]["location_id"];

         if(token != undefined && facilityId != undefined)
            setState({...state, authorized:true, name:facilityId.toString(),token})
      }catch(e){
         console.log('error');
         setState({...state, authorized:false, incorrectCredentials:true})
      }

    }

    return (!state.authorized)?(

    <div className="card">
          <h3>Enter your Smartcerv credentials</h3>
          <InputText placeholder="Username" className="inputs"  onChange={(e) => emitUsername(e.target.value)}/>
          <Password  placeholder="Password" className="inputs"  onChange={(e) => emitPassword(e.target.value)} />      
          <Button  className="inputs" label="Login" onClick={submit}/>
          {(state.incorrectCredentials)?<p className="login-error-messege">Username or password is incorrect</p>:<span></span>}
    </div>
  )
  :
  (<Upload name={state.name} token={state.token} />)
}
export default Login;