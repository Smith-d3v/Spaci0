import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { Button } from './ui/button'
import { UserButton, SignInButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

function Header() {
    const {user, isSignedIn} = useUser();

    return (
        <div className='flex justify-between items-center shadow-sm p-4'>
            <img src="/logo.svg" width={40} height={40} alt="logo"/>

            <ul className='hidden md:flex gap-14'>
                <li className='cursor-pointer'>
                    <Link 
                        className='text-sm font-medium text-black transition-all hover:text-gray-500' 
                        to="/"
                    >
                        Home
                    </Link>
                </li>
                <li className='cursor-pointer'>
                    <Link 
                        className='text-sm font-medium text-black transition-all hover:text-gray-500'
                        to="/search?offerType=Sale"
                    >
                        Buy
                    </Link>
                </li>
                <li className='cursor-pointer'>
                    <Link 
                        className='text-sm font-medium text-black transition-all hover:text-gray-500'
                        to="/search?offerType=Rent"
                    >
                        Rent
                    </Link>
                </li>
                <li className='cursor-pointer'>
                    <Link 
                        className='text-sm font-medium text-black transition-all hover:text-gray-500' 
                        to="/about"
                    >
                        About
                    </Link>
                </li>
            </ul>

            {isSignedIn?
                <div className='flex items-center gap-4'>
                    <UserButton/>
                    <Link to={'/profile'}>
                        <Button>Submit Listing</Button>
                    </Link>
                </div>
                :
                <div className='flex items-center gap-4'>
                    <SignInButton mode="modal">
                        <Button>Sign In</Button>
                    </SignInButton>
                    <Button variant="outline">Submit Listing</Button>
                </div>
            }
        </div>
    )
}

export default Header