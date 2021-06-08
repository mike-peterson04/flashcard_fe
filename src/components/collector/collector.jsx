import React, { useState } from 'react'

const Collector = (props) => {

    const [collections, updateCollections] = useState(props.collections);
    // debugger;
    if(props.collections !== collections){
        updateCollections(props.collections)
    }

    function tableBuilder(collection){
        if(collection===props.active){
            return(
                <div>
                    <center><button className='btn btn-secondary' onClick={(e)=>props.select(e,collection)}>{collection.name}</button></center><br/>
                </div>
            )
        }
        else{
            return(
                <div>
                    <center><button className='btn btn-dark' onClick={(e)=>props.select(e,collection)}>{collection.name}</button></center><br/>
                </div>
            )
        }

    }
    if (collections.length < 1){
        return(<div></div>)
    }

    return(
        <div className="container-fluid col-md-8 mx-auto">
            <div className="row">
            <div className="col-sm">
                <span> </span>
            </div>
            <div className="col-sm">
            {collections.map(tableBuilder)}
            </div>
            <div className="col-sm">
                <span> </span>
            </div>
                
            </div>
        </div>        
    );



}
export default Collector;