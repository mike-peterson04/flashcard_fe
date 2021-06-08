function CardEditor(props){

    function handleSubmit(event, card='new'){
        
        event.preventDefault();
        if(card.id === 'new' ||card === 'new'){
            card = {
                id:'new',
                term:event.target.term.value,
                definition:event.target.definition.value,
                collection:props.collection
            }
        }
        else{
            if(event.target.term.value !== ''){
                card.term = event.target.term.value
            }
            if(event.target.definition.value !== ''){
                card.definition = event.target.definition.value
            }
        }
        props.cardMaker(event,card)
        }
        
    

    
    return(
        <form onSubmit={(e) => handleSubmit(e,props.card)}>
            <h3>Card ID: {props.card.id}</h3>
            <label>Term:<input type='text' name='term' className="btn btn-dark" placeholder={props.card.term}/></label>
            <label>Definition:<input type='text' name='definition' className="btn btn-dark" placeholder={props.card.definition}/></label>
            <input type='submit' value='submit' className='btn btn-secondary'/>
        </form>
    )
}

export default CardEditor;