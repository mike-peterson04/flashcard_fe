
function Navbar(props){
    if(props.render === 'home'){
        return(
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="Home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="Collections" tabindex="-1">Collection Management</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="cards" tabindex="-1" aria-disabled="true">Card Management</a>
                        </li>
                    </ul>
                </div>
        </nav>
    );
  }
}

export default Navbar;