import './App.css';
import React, {Component} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './navbar/navbar.jsx';
import Collector from './collector/collector.jsx';
import CardViewer from './cardViewer/cardViewer.jsx';
import CollectionCreate from './collectionManagement/collectionCreate.jsx'

class App extends Component{
  constructor(props){
    super(props);

    this.collectionSelection = this.collectionSelection.bind(this)
    this.newCollection = this.newCollection.bind(this)
    this.cardMaker = this.cardMaker.bind(this)
    this.delete = this.delete.bind(this)
    this.state = {
      renderIndex:'home',
      collections:[],
      cards:[],
      activeCard:'needCard',
      active:'',
      checkCollections:false
    }
  }

  async getCollections(){
    let collections = await Axios.get('http://127.0.0.1:8000/')
    this.setState({collections:collections.data})

  }

  async cardMaker(event,card){
    
    event.preventDefault();
    let details =''
    try{
      
      if (card.id==='new'){
        details = await Axios.post('http://127.0.0.1:8000/collection/'+this.state.active.id+'/',{
          term:card.term,
          definition:card.definition,
          collection:this.state.active.id
        })
      }
      else{
        details = await Axios.put('http://127.0.0.1:8000/collection/'+this.state.active.id+'/card/'+card.id+'/',card)
      }
      this.collectionSelection(event,this.state.active)
      this.purge(event)


    }
    catch(e){
      console.log(e, card, details)
    }
  }

  async delete(event,card){
    let deleted = await Axios.delete('http://127.0.0.1:8000/collection/'+card.collection+'/card/'+card.id)
    console.log(deleted)
    this.purge(event)
  }

  purge = (event) =>{
    event.preventDefault();
    this.setState({
      renderIndex:'home',
      activeCard:'needCard'
    });
  }

  nextCard(card){
    if(card === 'needCard'){
      this.setState(
        {activeCard:this.state.cards[0]}
      )
    }
    else if(card === 'previous'){
      let index = this.state.cards.indexOf(this.state.activeCard)
      if (index <= 0){
        index = this.state.cards.length;
      }
      this.setState(
        {activeCard:this.state.cards[index-1]}
      )

    }
    else{
      let index = this.state.cards.indexOf(card)+1;
      if (index===this.state.cards.length){
        index = 0;
      }
      this.setState(
        {activeCard:this.state.cards[index]}
      )
    }
  }

  async newCollection(event,collection){
    try{
      let newColl = await Axios.post('http://127.0.0.1:8000',collection)
      await this.getCollections();
      this.purge(event)
    }
    catch(e){
      console.log(e)
    }

  }


  async collectionSelection(e,collection){
    let cards = await Axios.get('http://127.0.0.1:8000/collection/'+collection.id+'/')
    cards=cards.data;
    if(cards.length===0){
      alert('The collection you selected is empty redirecting to card creator')
      this.setState(
        {
          renderIndex:'card',
          activeCard:{
            id:'new',
            term:'term',
            definition:'definition',
            collection:this.state.active          
          },
          active:collection
        }
      )
    }
    else{
    this.setState({ 
      renderIndex:'card',
      cards:cards,
      active:collection,
      activeCard:'needCard'
    })}
  }

  collectionManagement = (event) =>{
    event.preventDefault();
    this.setState({renderIndex:'collection'})
  }

  randomCard(max){
    let index = Math.floor(Math.random()*max)
    this.setState(
      {activeCard:this.state.cards[index]}
    )
  }

  componentDidMount(){
    this.getCollections();
  }

  collectionCheck(event){
    event.preventDefault();
    if(this.state.active===''){
      alert('You must select a collection before you can create a card');
    }
    else{
      this.setState(
        {
          renderIndex:'card',
          activeCard:{
            id:'new',
            term:'term',
            definition:'definition',
            collection:this.state.active          
          }
        }
      )
    }
  }

  collectionEditStart(event){
    event.preventDefault();
    this.setState({renderIndex:'newCollection'});
  }


  render(){
    if(this.state.activeCard === 'needCard' && this.state.renderIndex === 'card'){
      this.nextCard(this.state.activeCard)
    }
    return (
      <div className="text-light bg-dark">
        <Navbar render={this.state.renderIndex} reload={this.purge} collectionManagement={this.collectionManagement}/>
        <div className="container-fluid col-md-8 vertical-center">
            <div className="row">
            <div className="col-sm">
              {this.state.renderIndex === 'collection' && <span><button className='btn btn-dark vertical-center' onClick={(e)=>{this.collectionEditStart(e)}}>Create New Collection</button><br/></span>}
              {this.state.renderIndex === 'collection' && <button className='btn btn-dark vertical-center' onClick={(e)=>{this.collectionCheck(e)}}>Create New Card</button>}            
                <span>{this.state.renderIndex === 'card' && <button className='btn btn-dark manual-center' onClick={()=>{this.nextCard('previous')}}>Previous</button>}</span>
            </div>
            <div className="col-sm">
              {this.state.renderIndex !=='card'&& 
                <div>
                {this.state.renderIndex !=='newCollection'&&<Collector collections={this.state.collections} active={this.state.active} select={this.collectionSelection}/>}
                {this.state.renderIndex ==='newCollection'&&<CollectionCreate newCollection={this.newCollection}/>}
                </div>
                }
              {this.state.renderIndex === 'card'&&
                <span>
                  <CardViewer card={this.state.activeCard} cardMaker={this.cardMaker} delete={this.delete}/>
                </span>}
            
            
            </div>
            <div className="col-sm">
                <span>{this.state.renderIndex === 'card' && <button className='btn btn-dark manual-center' onClick={()=>{this.nextCard(this.state.activeCard)}}>Next</button>}</span>
            </div>
                
            </div>
            <div className='row'>
              <div className="col-sm">
                <span>
                </span>
              </div>
              <div className="col-sm">
                {this.state.activeCard !== 'needCard' &&
                  <span>
                    {this.state.renderIndex === 'card'&& 
                      <div className='container-fluid col-sm'>
                        <span className='manual-center'>
                          <div className='h-center'><button className='btn btn-dark' onClick={()=>this.randomCard(this.state.cards.length)}>{this.state.cards.indexOf(this.state.activeCard)+1} of {this.state.cards.length}</button></div>
                          </span>
                        </div>}
                    </span>} 
              </div>
              <div className="col-sm">
                <span>
                </span>
              </div>
            </div>
        </div>       
      </div>
    );
  }
}

export default App;
