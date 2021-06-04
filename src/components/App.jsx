import logo from '../logo.svg';
import './App.css';
import React, {Component} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './navbar/navbar.jsx';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      renderIndex:'tbd'
    }
  }


  render(){
    return (
      <div className="text-light bg-dark">
        <Navbar/>
       HAHAHAHAHAHA
      </div>
    );
  }
}

export default App;
