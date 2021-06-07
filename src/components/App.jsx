import './App.css';
import React, {Component} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './navbar/navbar.jsx';
import Collector from './collector/collector.jsx';

class App extends Component{
  constructor(props){
    super(props);

    this.collectionSelection = this.collectionSelection.bind(this)
    this.state = {
      renderIndex:'home',
      collections:[],
      cards:[],
      active:''
    }
  }

  async getCollections(){
    let collections = await Axios.get('http://127.0.0.1:8000/')
    console.log(collections)
    this.setState({collections:collections.data})

  }

  async collectionSelection(e,collection){
    let cards = await Axios.get('http://127.0.0.1:8000/collection/'+collection.id+'/')
    cards=cards.data;
    this.setState({
      renderIndex:'deck',
      cards:cards,
      active:collection.name
    })
  }

  componentDidMount(){
    this.getCollections();
  }


  render(){
    console.log("RENDERING");
    console.log(this.state.collections);
    console.log(this.state.cards)
    this.state.renderIndex='home';
    return (
      <div className="text-light bg-dark">
        <Navbar render={this.state.renderIndex}/>
        <Collector collections={this.state.collections} active={this.state.active} select={this.collectionSelection}/>               
      </div>
    );
  }
}

export default App;
