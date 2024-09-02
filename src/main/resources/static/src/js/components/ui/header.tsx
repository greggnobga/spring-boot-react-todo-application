/** Vendor. */
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className='container mx-auto p-4'>
            <nav className='flex flex-wrap align-middle justify-between'>
                <div>
                    <NavLink className={({ isActive }) => (isActive ? 'px-2 text-rose-200' : 'px-2')} to='/'>
                        Todo Application
                    </NavLink>
                </div>
                <div>
                    <NavLink className={({ isActive }) => (isActive ? 'px-2 text-rose-200' : 'px-2')} to='/todos'>
                        Todos
                    </NavLink>
                </div>
            </nav>
        </div>
    );
};

export default Header;
