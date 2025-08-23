import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Img } from 'react-image';
import ModalComponent from "./ModalComponent";
import { useRef, useState } from "react";
import { FinancialRecordForm } from "../pages/dashboard/financial-record-form";

const Sidebar: React.FC<{ darkMode: boolean; }> = ({ darkMode }) => {
    const logoUrl = darkMode ? '/logo-dark.png' : '/logo-white.png';
    const [open, setOpen] = useState(false);
    const { user } = useUser();
    const userButtonRef = useRef<HTMLDivElement>(null);

    const handleSettingsLink = () => {
        const button = userButtonRef.current?.querySelector("button");
        if (button) button.click();
    }
    return (
        <>
            <div className="relative w-auto hidden md:block border-r bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-600">
                <div className="text-gray-900">
                    <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white rtl:border-r-0 dark:bg-gray-800 dark:border-gray-700">
                        <a href="#" className="mx-auto">
                            <Link to="/">
                                <Img
                                    className="w-auto h-20 sm:h-14"
                                    src={logoUrl}
                                    alt="logo"
                                />
                            </Link>
                        </a>

                        <div className="flex flex-col items-center mt-6 -mx-2">
                            <div className={`w-auto mx-2 ${open ? "invisible" : "visible"}`}>
                               
                            </div>
                            {
                                user?.imageUrl && (
                                    <Img
                                        src={user?.imageUrl}
                                        alt={`${user?.firstName}'s avatar`}
                                        className="w-18 h-18 rounded-full object-cover"
                                    />
                                )
                            }

                            <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">{user?.firstName} {user?.lastName}</h4>
                            <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">{ user?.primaryEmailAddress?.emailAddress }</p>
                        </div>

                        <div className="flex flex-col justify-between flex-1 mt-6">
                            <nav>
                                <Link
                                    to="/"
                                    className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                    <span className="mx-4 font-medium">Dashboard</span>
                                </Link>


                                <Link
                                    className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                                    to="/profile"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                    <span className="mx-4 font-medium">Profile</span>
                                </Link>


                                <button
                                    className="w-full flex items-center px-4 py-2 mt-5 cursor-pointer text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                                    onClick={() => setOpen(true)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                                    </svg>

                                    <span className="mx-4 font-medium">New Entry</span>
                                </button>

                                <button 
                                    className="w-full flex items-center px-4 py-2 mt-5 cursor-pointer text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                                    onClick={handleSettingsLink}
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span className="mx-4 font-medium">Settings</span>
                                </button>

                                <div ref={userButtonRef} style={{ position: "absolute", visibility: "hidden" }}>
                                    <UserButton />
                                </div>
                                
                            </nav>
                        </div>
                    </aside>
                </div>

                {/*  */}
                <ModalComponent open={open} onClose={() => setOpen(false)} >
                    <FinancialRecordForm onCancel={() => setOpen(false)} />
                </ModalComponent>
            </div>
            {/* navbar in mobile viewport */}
            <div className="fixed top-0 left-0 right-0 z-10 bg-black backdrop-blur-lg bg-opacity-30 rounded-b-2xl text-white shadow-t-lg md:hidden flex justify-between px-3 items-center py-2 border-b border-gray-700">
                <nav className="navbar">
                    <div className="navbar-container dark:bg-slate-800">
                        <div className="navbar-brand">
                            <Link to="/">
                                <Img
                                    src={logoUrl}
                                    alt="logo"
                                    width={80}
                                    height={60}
                                />
                            </Link>
                        </div>
                        <div className="navbar-actions">
                            <SignedIn>
                                <UserButton
                                    afterSignOutUrl="/auth"
                                    appearance={{
                                        elements: {
                                            avatarBox: "navbar-user-button"
                                        }
                                    }}
                                />
                            </SignedIn>
                        </div>
                    </div>
                </nav>
            </div>

        </>
    );
}

export default Sidebar;