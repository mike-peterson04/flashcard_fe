import React, {Component} from 'react';


class CardViewer extends Component{
    constructor(props){
        super(props);
        this.state = {
            card:props.card,
            renderIndex:'card',
        }
    }

    showDef(){
        this.setState({renderIndex:'def'})
    }



    render(){
        if(this.state.card != this.props.card){
            this.setState({
                card:this.props.card,
                renderIndex:'card'
            })
            return("Updating")
        }
        return(
            <table className="table">
                <tbody className="table-secondary">
                    <tr>
                        <td ClassName='table table-secondary'>Term:</td>
                        <td ClassName='table table-secondary'><button className='btn btn-secondary' onClick={()=>{this.showDef()}}>{this.state.card.term}</button></td>
                    </tr>
                    <tr>
                        <td>
                        Definition:
                        </td>
                        <td>
                            {this.state.renderIndex === 'card'&&<button className='btn btn-secondary' onClick={()=>{this.showDef()}}>Click here for Definition</button>}
                            {this.state.renderIndex === 'def'&&<div className='btn btn-secondary'>{this.state.card.definition}</div>}
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}
export default CardViewer