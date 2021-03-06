import React, {Component} from 'react';
import CardEditor from './cardEditor.jsx';


class CardViewer extends Component{
    constructor(props){
        super(props);
        this.state = {
            card:props.card,
            renderIndex:'card',
        }
    }

    showDef(){
        if(this.state.renderIndex==='card'){
            this.setState({renderIndex:'def'})
        }
        else if(this.state.renderIndex==='def'){
            this.setState({renderIndex:'card'})            
        }
    }

    startEditor(event, card){
        event.preventDefault();
        if(card==='new'){
            this.setState(
                {card:{
                    id:'new',
                    term:"term",
                    definition:"definition",
                    collection:this.state.card.collection
                    },
                renderIndex:'edit'
                }
            )
        }
        this.setState({renderIndex:'edit'})
    }




    render(){
        if(this.state.renderIndex === 'edit'||this.state.card.id === 'new'){
            return(<CardEditor card={this.state.card} cardMaker={this.props.cardMaker} collection={this.state.card.collection}/>)
        }
        
        if(this.state.card !== this.props.card){
            this.setState({
                card:this.props.card,
                renderIndex:'card'
            })
            return("Updating")
        }
        return(
            
            <table className="table" key='table'>
                <tbody className="table-secondary">
                    <tr>
                        <td ClassName='table table-secondary'>Term:</td>
                        <td ClassName='table table-secondary'><button className='btn btn-secondary' onClick={()=>{this.showDef()}} key='termButton'>{this.state.card.term}</button></td>
                    </tr>
                    <tr>
                        <td>
                        Definition:
                        </td>
                        <td>
                            {this.state.renderIndex === 'card'&&<button className='btn btn-secondary' onClick={()=>{this.showDef()}} key='hiddenDef'>Click here for Definition</button>}
                            {this.state.renderIndex === 'def'&&<button className='btn btn-secondary' onClick={()=>{this.showDef()}} key='revealedDef'>{this.state.card.definition}</button>}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button className='btn btn-secondary' onClick={(e)=>{this.startEditor(e,this.state.card)}}>Edit Card</button>
                        </td>
                        <td><button className='btn btn-secondary' onClick={(e)=>{this.startEditor(e,'new')}}>Create Card</button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2'>
                            <center><button className='btn btn-danger' onClick={(e)=>this.props.delete(e, this.state.card)}>Delete Card</button></center>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}
export default CardViewer