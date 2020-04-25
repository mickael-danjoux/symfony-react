import React, {useState} from 'react';


const Navbar = (props) => {

    const [active, setActive] = useState('people');

    const handleClick =  item  => {
        setActive(item);
    }


    return (<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">Symfony React</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
                <li className={"nav-item "  + (active === 'home' && " active") }>
                    <a className="nav-link" href="#" onClick={()=>handleClick('home')}>Home <span className="sr-only" >(current)</span></a>
                </li>
                <li className={"nav-item "  + (active === 'people' && " active") }>
                    <a className="nav-link" href="#/people" onClick={()=>handleClick('people')}>People</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Pricing</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">About</a>
                </li>
            </ul>

        </div>
    </nav> );
};

export default Navbar;