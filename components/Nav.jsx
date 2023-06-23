"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }
        setUpProviders();
    }, []);

    return (
        <nav className="flex-between mb-16 pt-3 w-full">
            <Link href={"/"} className="flex flex-center gap-2">
                <Image
                    src="/assets/images/logo.svg"
                    alt="Promptopia-Logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text">Promptopia</p>
            </Link>

            {/* Desktop Nav */}
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href={"/create-prompt"} className="black_btn">
                            Create Post
                        </Link>

                        <button type="button" className="outline_btn" onClick={signOut}>
                            Sign Out
                        </button>

                        <Link href={"/profile"}>
                            <Image
                                src={session?.user.image}
                                width="37"
                                height="37"
                                className="rounded-full hover:opacity-70"
                                alt="Profile"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button className="black_btn" type="button" onClick={() => signIn(provider.id)} key={provider.name}>
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>

            {/* Mobile Nav */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image
                            src={session?.user.image}
                            width="37"
                            height="37"
                            className="rounded-full"
                            alt="Profile"
                            onClick={() => { setToggleDropdown((prev) => !prev) }}
                        />

                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href={"/profile"}
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href={"/create-prompt"}
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button type="button" onClick={() => {
                                    setToggleDropdown(false);
                                    signOut()
                                }} className="w-full mt-5 black_btn">
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button className="black_btn" type="button" onClick={() => signIn(provider.id)} key={provider.name}>
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    );
}

export default Nav;