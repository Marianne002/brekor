// components/Navbar.jsx
"use client";
import "@styles/Navbar.scss";
import { Menu, Person, Search, ShoppingCart } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    // Get session and user from useSession hook
    const { data: session, status } = useSession(); 
    const user = session?.user;

    // State to manage dropdown menu
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const [userId, setUserId] = useState(null); // State to store userId

    // Get the router object
    const router = useRouter();

    // Effect to set userId from session when session updates
    useEffect(() => {
        if (session?.user?.id) {
            setUserId(session.user.id);
        }
    }, [session]);

    // Function to handle logout
    const handleLogout = async () => {
        signOut({ callbackUrl: '/login' });
    };

    // Get cart from user
    const cart = user?.cart;

    return (
        <div 
            className="navbar" 
            aria-label="Menu de navigation"
        >
            <a href="/">
                <img 
                    src='/assets/logo-brekor.svg' 
                    alt='Logo Brekor'
                />
            </a>

            <div className='navbar_search'>
                <input type='text' placeholder='Search...'/>
                <IconButton>
                    <Search sx={{ color: "red" }} />
                </IconButton>
            </div>

            <div className='navbar_right'>
                {user && (
                    <a href="/cart" className="cart">
                        <ShoppingCart sx={{ color: "gray" }}/>
                        Cart <span>({cart?.length})</span>
                    </a>
                )}
                <button className='navbar_right_account' onClick={() => setDropdownMenu(!dropdownMenu)}>
                    <Menu sx={{ color: "gray" }} />
                    {!user ? (
                        <Person sx={{ color: "gray" }} />
                    ) : (
                        <img src={user.profileImagePath} alt='profile' style={{ objectFit: "cover", borderRadius: "50%" }} />
                    )}
                </button>
                
                {dropdownMenu && !user && (
                    <div className='navbar_right_accountmenu'>
                        <Link href="/login">Log In</Link>
                        <Link href="/register">Sign Up</Link>
                    </div>
                )}

                {dropdownMenu && user && (
                    <div className='navbar_right_accountmenu'>
                        <Link href={userId ? `/wishlist?id=${userId}` : "/wishlist"}>Wishlist</Link>
                        <Link href="/cart">Cart</Link>
                        <Link href="/order">Orders</Link>
                        {userId && <Link href={`/shop?id=${userId}`}>Your Shop</Link>}
                        <Link href="/create-work">Sell Your Work</Link>
                        <a onClick={handleLogout}>Log Out</a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
