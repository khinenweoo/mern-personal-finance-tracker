import { Img } from 'react-image';
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { SignInButton, SignUpButton } from '@clerk/clerk-react'
import { Navigate } from "react-router-dom";

const Header = () => {
    const logoImage = '/logo-dark.png';
    const imageUrl = '/hero_bg.png';
    return (
        <header className="bg-bluegray">
            <div className="container px-6 mx-auto">
                <nav className="flex flex-col py-6 sm:flex-row sm:justify-between sm:items-center">
                    <a href="#">
                        <Img className="w-24 h-auto sm:w-20" src={logoImage} alt="" />
                    </a>

                    <div className="flex items-center mt-2 -mx-2 sm:mt-0">
                        <SignedOut>
                            <a href="#" className="px-3 py-1 text-md font-semibold text-white transition-colors duration-300 transform border-1 rounded-md hover:bg-gray-700"><SignInButton /></a>

                            <a href="#" className="px-3 py-2 mx-2 text-md font-semibold text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-600"><SignUpButton /></a>
                        </SignedOut>
                        <SignedIn>
                            <Navigate to="/" />
                        </SignedIn>

                    </div>
                </nav>


                <div className="lg:flex">

                    <div className="w-full px-6 py-8 lg:w-1/2">
                        <div className="max-w-xl">
                            <h1 className="text-3xl font-semibold tracking-wide text-white lg:text-4xl text-left">
                                An Easy Way for Managing Your <span className="text-blue-300">Money</span>
                            </h1>
                            <p className="mt-4 text-md text-gray-400 text-left lg:text-base">Take control of your finances without the hassle. Our intuitive platform automates budgeting, tracking, and filtering—so you can focus on grow your savings effortlessly.</p>

                            <div className="mt-8 space-y-5">
                                <p className="flex items-center mx-2 text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                    <span className="mx-2">Clarity is Power</span>
                                </p>

                                <p className="flex items-center mx-2 text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                    <span className="mx-2">Track income and expenses</span>
                                </p>

                                <p className="flex items-center mx-2 text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                    <span className="mx-2">Easy to Use</span>
                                </p>


                                <p className="flex items-center mx-2 text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                    <span className="mx-2">Finance for All</span>
                                </p>
                            </div>
                        </div>
                        <div className="w-full lg:max-w-sm flex justify-left">
                            <a href="#" className="px-10 py-4 mt-6 text-sm font-medium leading-5 text-center text-white capitalize transition-colors duration-300 transform bg-gray-900 rounded-lg hover:bg-gray-600 lg:mx-0 lg:w-auto focus:outline-none">Get Started</a>
                        </div>
                    </div>

                    <div className="w-full h-64 lg:w-1/2 lg:h-auto">
                        <div className="w-full h-full bg-cover">
                            <Img
                                src={imageUrl}
                                alt='banner'
                                loader={<div>Loading...</div>}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;