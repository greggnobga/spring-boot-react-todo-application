/** Vendor. */
import { NavLink } from 'react-router-dom';

/** Hooks. */
import { useAppSelector } from '$hooks/use-rtk';

const Header = () => {
    /** Use selector. */
    const authLogin = useAppSelector((state) => state.authLogin);
    const { isLogged } = authLogin;

    return (
        <div className='container mx-auto p-4'>
            <nav className='flex flex-wrap align-middle justify-between'>
                <div>
                    <NavLink className={({ isActive }) => (isActive ? 'px-2 text-rose-200' : 'px-2')} to='/'>
                        Todo Application
                    </NavLink>
                </div>
                <div>
                    {isLogged ? (
                        <>
                            <NavLink className={({ isActive }) => (isActive ? 'px-2 text-rose-200' : 'px-2')} to='/todos'>
                                Todos
                            </NavLink>
                            <NavLink className={({ isActive }) => (isActive ? 'px-2 text-rose-200' : 'px-2')} to='/logout'>
                                Logout
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink className={({ isActive }) => (isActive ? 'px-2 text-rose-200' : 'px-2')} to='/register'>
                                Register
                            </NavLink>

                            <NavLink className={({ isActive }) => (isActive ? 'px-2 text-rose-200' : 'px-2')} to='/login'>
                                Login
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Header;
