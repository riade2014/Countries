import React from 'react';
import { NavLink } from 'react-router-dom';
const Navigation = () => {
    return (
        <div className='navigation'>
            <ul>
                <NavLink to="/">
                    <li>Accueil</li>
                </NavLink>
                <NavLink to="/About">
                    <li>A propos</li>
                </NavLink>
                <NavLink to="/Blog">
                    <li>Blog</li>
                </NavLink>
            </ul>
        </div>
    );
};

export default Navigation;