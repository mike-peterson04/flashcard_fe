
function Navbar(props){
    if(props.render === 'home'){
        return(
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="Home" onClick={(e)=>props.reload(e)}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="Collections" tabIndex="-1" onClick={(e)=>props.collectionManagement(e)}>Collection Management</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
  else if(props.render==='collection'){
    return(
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="Home" onClick={(e)=>props.reload(e)}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="Collections" tabindex="-1" onClick={(e)=>props.collectionManagement(e)}>Collection Management</a>
                    </li>
                </ul>
            </div>
        </nav>
    );

  }
  return(
    <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container-fluid">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="Home" onClick={(e)=>props.reload(e)}>Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="Collections" tabindex="-1" onClick={(e)=>props.collectionManagement(e)}>Collection Management</a>
                </li>
            </ul>
        </div>
    </nav>
);
}

export default Navbar;