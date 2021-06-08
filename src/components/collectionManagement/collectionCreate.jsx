function CollectionCreate(props){

    function handleSubmit(event){
        
        event.preventDefault();
        if(event.target.name.value===''){
            alert('Please name this collection')
        }
        else{    
            let collection = {
                name:event.target.name.value
            }
        
            props.newCollection(event,collection)
        }
    }
        
    

    
    return(
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>Name:<input type='text' name='name' className="btn btn-dark" placeholder='Collection name'/></label>
            <input type='submit' value='submit' className='btn btn-secondary'/>
        </form>
    )
}

export default CollectionCreate;