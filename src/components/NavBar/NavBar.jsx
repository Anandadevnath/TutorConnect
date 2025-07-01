import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css';
import { AuthContext } from '../../contexts/AuthContext';
import ThemeToggle from '../toggle.jsx';

const NavBar = () => {
    const { signOutUser } = useContext(AuthContext);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });
    const [isLight, setIsLight] = useState(() => {
        return document.documentElement.getAttribute('data-theme') === 'light';
    });
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorage = () => {
            const stored = localStorage.getItem('user');
            setUser(stored ? JSON.parse(stored) : null);
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsLight(document.documentElement.getAttribute('data-theme') === 'light');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setShowMobileMenu(false);

        if (signOutUser) {
            signOutUser()
                .then(() => console.log('Sign out successful'))
                .catch(error => console.log(error));
        }
        navigate('/login');
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    const closeMobileMenu = () => {
        setShowMobileMenu(false);
    };

    const links = (
        <>
            <li>
                <NavLink to="/" className={isLight ? "text-black home hover:text-teal-600 flex items-center gap-2" : "text-white home hover:text-teal-400 flex items-center gap-2"} onClick={closeMobileMenu}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/findtutor" className={isLight ? "text-black room hover:text-teal-600 flex items-center gap-2" : "text-white room hover:text-teal-400 flex items-center gap-2"} onClick={closeMobileMenu}>
                    Find tutors
                </NavLink>
            </li>
            <li>
                <NavLink to="/addtutor" className={isLight ? "text-black browser hover:text-teal-600 flex items-center gap-2" : "text-white browser hover:text-teal-400 flex items-center gap-2"} onClick={closeMobileMenu}>
                    Add Tutorials
                </NavLink>
            </li>
            {user && (
                <li>
                    <NavLink to="/mytutorials" className={isLight ? "text-black mylist hover:text-teal-600 flex items-center gap-2" : "text-white mylist hover:text-teal-400 flex items-center gap-2"} onClick={closeMobileMenu}>
                        My Tutorials
                    </NavLink>
                </li>
            )}
            {user && (
                <li>
                    <NavLink to="/bookedtutors" className={isLight ? "text-black mylist hover:text-teal-600 flex items-center gap-2" : "text-white mylist hover:text-teal-400 flex items-center gap-2"} onClick={closeMobileMenu}>
                        My booked tutors
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <div
            className={
                isLight
                    ? "navbar bg-white text-black backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-50 transition-colors"
                    : "navbar bg-[#111827]/70 text-white backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-50 transition-colors"
            }
        >
            <div className="navbar-start">
                <div className="lg:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className={isLight ? "text-black text-2xl font-bold flex items-center gap-2 focus:outline-none" : "text-white text-2xl font-bold flex items-center gap-2 focus:outline-none"}
                    >
                        <span className={isLight ? 'titlemb text-black' : 'titlemb text-white'}>Tutor</span>
                        <span className="text-blue-400">Connect</span>
                    </button>
                </div>

                <Link to="/" className={isLight ? "hidden lg:flex text-black text-2xl font-bold items-center gap-2" : "hidden lg:flex text-white text-2xl font-bold items-center gap-2"}>
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl w-10 h-10 flex items-center justify-center mr-2">
                        <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
                            <rect width="24" height="24" rx="6" fill="#fff" fillOpacity="0.1" />
                            <path d="M8 8h8v8H8z" fill="#fff" fillOpacity="0.2" />
                            <rect x="7" y="7" width="10" height="10" rx="2" stroke="#fff" strokeWidth="2" />
                        </svg>
                    </div>
                    <span className={isLight ? 'title text-black' : 'title text-white'}>Tutor</span>
                    <span className="text-blue-400">Connect</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>

            <div className="navbar-end flex items-center gap-6 ">
                <ThemeToggle />
                {!user ? (
                    <>
                        <button
                            className={
                                isLight
                                    ? 'btn btn-md btn-outline px-5  border-black text-black hover:text-black'
                                    : 'btn btn-md px-5 btn-outline border-white text-white hover:text-white'
                            }
                            onClick={() => { navigate('/login'); closeMobileMenu(); }}
                        >
                            Login
                        </button>
                        <button
                            className={
                                isLight
                                    ? 'btn btn-md btn-outline px-5 border-black text-black hover:text-black'
                                    : 'btn btn-md btn-outline px-5 border-white text-white hover:text-white'
                            }
                            onClick={() => { navigate('/register'); closeMobileMenu(); }}
                        >
                            Signup
                        </button>
                    </>
                ) : (
                    <div className="relative flex items-center gap-4">
                        <div
                            className="cursor-pointer"
                            onMouseEnter={() => setShowProfileDropdown(true)}
                            onMouseLeave={() => setShowProfileDropdown(false)}
                        >
                            <img
                                src={user.photoURL || 'https://via.placeholder.com/40'}
                                alt={user.name || user.email || 'User'}
                                className="w-10 h-10 rounded-full border-2 border-gray-500 object-cover"
                            />
                            {showProfileDropdown && (
                                <div className="absolute right-16 mt-2 w-20 bg-white text-black rounded shadow-lg z-50">
                                    <div className="font-semibold text-center">
                                        {user.name || user.email}
                                    </div>
                                </div>
                            )}
                        </div>
                        <button onClick={handleSignOut} className={
                            isLight
                                ? 'btn btn-neutral text-black btn-outline hover:text-white'
                                : 'btn btn-neutral text-white border-white btn-outline'
                        }>
                            Logout
                        </button>
                    </div>
                )}
            </div>

            {showMobileMenu && (
                <div className={isLight ? "absolute left-0 top-full w-full bg-white shadow-lg border-t border-gray-200 z-40 animate-fade-in-down" : "absolute left-0 top-full w-full bg-[#1e293b] shadow-lg border-t border-gray-700 z-40 animate-fade-in-down"}>
                    <ul className="flex flex-col gap-3 px-6 py-4">{links}</ul>
                </div>
            )}
        </div>
    );
};

export default NavBar;