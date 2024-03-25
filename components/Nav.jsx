'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import Logo from '@public/assets/images/logo.svg';
import Ava from '@public/assets/images/profile.svg';
import { CompanyInfo } from '@utils/constants';

const Nav = () => {
    // const isUserLoggedIn = true;

    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {

        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }

        setUpProviders();

    }, []);

    const handleToggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    }

    console.log('session ==> ', session);

    return (
        <nav className='flex-between w-full mb-16 pt-3 px-5'>
            <Link href="/" className='flex gap-2 flex-center'>
                <Image
                    src={Logo}
                    alt={CompanyInfo.company_name}
                    width={30}
                    height={30}
                    className='object-contain'
                />
                <p className="logo_text">
                    {CompanyInfo.company_name}
                </p>
            </Link>

            <div className="sm:flex hidden">
                {
                    session?.user ? (
                        <div className='flex gap-3'>
                            <Link
                                href="/create-prompt"
                                className='black_btn'
                            >
                                Create Post
                            </Link>

                            <button type='button' onClick={signOut} className="outline_btn">
                                Sign Out
                            </button>
                            <Link href="/profile">
                                <Image
                                    src={session.user?.image || Ava}
                                    alt={session.user?.name || CompanyInfo.company_name}
                                    width={37}
                                    height={37}
                                    className='rounded-full'
                                />
                            </Link>
                        </div>
                    ) : (
                        <>
                            {
                                providers && Object.values(providers).map((provider) => (
                                    <button
                                        type='button'
                                        key={provider.name}
                                        onClick={() => signIn(provider.id)}
                                        className='black_btn'
                                    >
                                        Sign In
                                    </button>
                                ))
                            }
                        </>
                    )
                }
            </div>
            <div className='sm:hidden flex relative'>
                {
                    session?.user ? (
                        <div className="flex">
                            <Image
                                src={session.user?.image || Ava}
                                alt={session.user?.name || CompanyInfo.company_name}
                                width={37}
                                height={37}
                                className='rounded-full'
                                onClick={handleToggleMenu}
                            />
                            {
                                isMenuOpen && (
                                    <div className="dropdown">
                                        <Link
                                            href="/profile"
                                            className='dropdown_link'
                                            onClick={handleToggleMenu}
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            href="/create-prompt"
                                            className='dropdown_link'
                                            onClick={handleToggleMenu}
                                        >
                                            Create Prompt
                                        </Link>
                                        <button
                                            type='button'
                                            className="mt-5 w-full black_btn"
                                            onClick={() => {
                                                handleToggleMenu();
                                                signOut();
                                            }}
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <>
                            {
                                providers && Object.values(providers).map((provider) => (
                                    <button
                                        type='button'
                                        key={provider.name}
                                        onClick={() => signIn(provider.id)}
                                        className='black_btn'
                                    >
                                        Sign In
                                    </button>
                                ))
                            }
                        </>
                    )
                }
            </div>
        </nav>
    )
}

export default Nav