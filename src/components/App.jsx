import './App.css';
import React, {Component} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './navbar/navbar.jsx';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      renderIndex:'home',
      collections:[]
    }
  }

  async getCollections(){
    let collections = await Axios.get('http://127.0.0.1:8000/')
    console.log(collections)
    this.setState({collections:collections})

  }

  componentDidMount(){
    this.getCollections();
  }


  render(){
    console.log("RENDERING")
    console.log(this.state.collections)
    return (
      <div className="text-light bg-dark">
        <Navbar render={this.state.renderIndex}/>
       HAHAHAHAHAHA
      </div>
    );
  }
}

export default App;
