import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Img } from 'react-image';
import ModalComponent from "./ModalComponent";
import { useState } from "react";
import { FinancialRecordForm } from "../pages/dashboard/financial-record-form";

const Navbar: React.FC<{ darkMode: boolean; }> = ({ darkMode }) => {
    const logoUrl = darkMode? '/logo-dark.png' : '/logo-white.png';
    const [open, setOpen] = useState(false);
    const { user } = useUser();
    return (
        <>
            <div className="relative w-[10%] hidden md:block border-r bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-600">
                <div className="text-gray-900">
                    <aside className="flex w-full h-full flex-col items-center">
                        <div className="flex h-[6rem] w-full items-center justify-center">
                            <Link to="/">
                                <Img
                                    src={logoUrl}
                                    alt="logo"
                                    width={90}
                                    height={70}
                                />
                            </Link>
                        </div>
                        <nav className="flex flex-1 flex-col gap-y-4 pt-10">
                            <button className="group rounded-xl p-4 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <i className='bx bxs-dashboard text-lg lg:text-xl'></i>
                                <span className="text-xs mt-1 text-gray-400 block">Dashboard</span>
                            </button>
                            <button onClick={() => setOpen(true)} className="group rounded-xl p-4 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <i className='bx bx-plus-circle text-xl lg:text-2xl'></i>
                                <span className="text-xs mt-1 text-gray-400 block">New Entry</span>
                            </button>
                            {/* <button className="group rounded-xl p-4 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <i className='bx bx-bar-chart text-lg lg:text-xl'></i>
                                <span className="text-xs mt-1 text-gray-400 block">Income</span>
                            </button>
                            <button className="group rounded-xl p-4 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <i className='bx bxs-category text-lg lg:text-xl'></i>
                                <span className="text-xs mt-1 text-gray-400 block">Expenses</span>
                            </button> */}

                            <button className={`mt-2 ${open ? "invisible" : "visible"}`}>
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
                            </button>
                            <h2 className="user-name p-2 flex items-center justify-center rounded-2xl dark:bg-sky-950 m-2">{ user?.firstName } { user?.lastName }</h2>
                        </nav>
                    </aside>
                </div>

                {/*  */}
                <ModalComponent open={open} onClose={() => setOpen(false)} >
                    <FinancialRecordForm />
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

export default Navbar;