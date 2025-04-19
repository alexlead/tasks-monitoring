import React from 'react';
import { Link } from 'react-router-dom';


interface IHeaderMenuProps {
}

const HeaderMenu: React.FunctionComponent<IHeaderMenuProps> = () => {
    return (
        <>
            <nav className="navbar bg-success ">
                <div className="container-fluid">
                <Link to='/' className='text-white text-decoration-none'><span className='fs-4 decoration-none'>Main</span></Link>
                </div>
            </nav>
        </>
    );
}
export default HeaderMenu;