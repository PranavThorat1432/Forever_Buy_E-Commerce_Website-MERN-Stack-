import React, { useContext } from 'react'
import {assets} from '../assets/frontend_assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext';

const Navbar = () => {

    const [visible, setVisible] = React.useState(false);
    const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext);
    const adminURL = import.meta.env.VITE_ADMIN_URL;

    // Lock body scroll and handle ESC to close when menu is open
    React.useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Escape') setVisible(false);
        };
        if (visible) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', onKeyDown);
        } else {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
        }
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
        }
    }, [visible]);

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    }


  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      
        <Link to="/" className='relative'>
            <img className='w-36 cursor-pointer' src={assets.logo} alt="" />
        </Link>
        

        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to="/" className="flex flex-col items-center gap-1">
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to="/collection" className="flex flex-col items-center gap-1">
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to="/about" className="flex flex-col items-center gap-1">
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to="/contact" className="flex flex-col items-center gap-1">
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
        </ul>

        {/* Desktop Admin Button (visible when logged in) */}
        {token && adminURL && (
            <button
                onClick={() => { window.location.href = adminURL; }}
                className='hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm text-gray-800 transition'
            >
                Admin Panel
            </button>
        )}

        <div className='flex items-center gap-6'>
            <img onClick={() => setShowSearch(true)} className='w-5 cursor-pointer' src={assets.search_icon} alt="" />

            <div className='group relative'>
                
                <img onClick={() => token ? null : navigate('/login')} className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />

                {/* Dropdown Menu */}
                {
                    token && 
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 '>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded '>
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                            <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                            {adminURL && (
                                <a href={adminURL} target='_blank' rel='noopener noreferrer' className='cursor-pointer hover:text-black'>Admin Panel</a>
                            )}
                            <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                        </div>
                    </div>
                }
            </div>

            <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} className='w-5 min-w-5 cursor-pointer' alt="" />
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link>

            <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
        </div>

        {/* Mobile Drawer Menu with overlay (small screens) */}
        <div className={`sm:hidden fixed inset-0 z-50 ${visible ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!visible}>
            {/* Overlay */}
            <div onClick={() => setVisible(false)} className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}></div>

            {/* Drawer Panel */}
            <div
                role="dialog"
                aria-modal="true"
                className={`absolute right-0 top-0 h-full w-4/5 max-w-xs bg-white shadow-xl transition-transform duration-300 ${visible ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className='flex items-center justify-between p-4 border-b'>
                    <div className='flex items-center gap-3'>
                        <button onClick={() => setVisible(false)} className='p-2 rounded-md active:scale-95 transition' aria-label='Close menu'>
                            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Back" />
                        </button>
                        <span className='text-sm font-medium text-gray-700'>Menu</span>
                    </div>
                    <Link to='/' onClick={() => setVisible(false)} className='block'>
                        <img className='h-6' src={assets.logo} alt='Forever Buy' />
                    </Link>
                </div>

                {/* Quick Actions */}
                <div className='p-4 flex items-center gap-4 border-b'>
                    <button onClick={() => { setShowSearch(true); setVisible(false); }} className='flex-1 flex items-center justify-center gap-2 py-2 rounded-md bg-gray-100 active:scale-[0.98]'>
                        <img className='w-4' src={assets.search_icon} alt='Search' />
                        <span className='text-sm'>Search</span>
                    </button>
                    <Link to='/cart' onClick={() => setVisible(false)} className='relative flex-1 flex items-center justify-center gap-2 py-2 rounded-md bg-gray-100 active:scale-[0.98]'>
                        <img className='w-4' src={assets.cart_icon} alt='Cart' />
                        <span className='text-sm'>Cart</span>
                        <span className='absolute -right-1 -top-1 w-5 h-5 text-[10px] leading-5 text-center rounded-full bg-black text-white'>{getCartCount()}</span>
                    </Link>
                </div>

                {/* Nav Links */}
                <nav className='flex flex-col text-gray-700'>
                    <NavLink onClick={() => setVisible(false)} className={({isActive}) => `px-6 py-4 text-base ${isActive ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'}`} to="/">HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className={({isActive}) => `px-6 py-4 text-base ${isActive ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'}`} to="/collection">COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className={({isActive}) => `px-6 py-4 text-base ${isActive ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'}`} to="/about">ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className={({isActive}) => `px-6 py-4 text-base ${isActive ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'}`} to="/contact">CONTACT</NavLink>
                </nav>

                {/* Account Actions */}
                <div className='mt-auto p-4'>
                    {token ? (
                        <>
                            <div className='grid grid-cols-2 gap-3'>
                                <button onClick={() => { setVisible(false); navigate('/orders'); }} className='py-2 rounded-md bg-gray-100 active:scale-[0.98] text-sm'>Orders</button>
                                <button onClick={() => { setVisible(false); logout(); }} className='py-2 rounded-md bg-black text-white active:scale-[0.98] text-sm'>Logout</button>
                            </div>
                            {adminURL && (
                                <a href={adminURL} target='_blank' rel='noopener noreferrer' className='mt-3 inline-flex items-center justify-center w-full py-2 rounded-md bg-gray-50 text-sm text-gray-700 hover:bg-gray-100 active:scale-[0.98]'>Admin Panel</a>
                            )}
                        </>
                    ) : (
                        <div className='grid grid-cols-2 gap-3'>
                            <button onClick={() => { setVisible(false); navigate('/login'); }} className='py-2 rounded-md bg-black text-white active:scale-[0.98] text-sm'>Login</button>
                            <button onClick={() => { setVisible(false); navigate('/signup'); }} className='py-2 rounded-md bg-gray-100 active:scale-[0.98] text-sm'>Sign Up</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
