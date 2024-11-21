import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <Link to="/">
                        <span className="navbar-logo">💰</span>
                        <span className="navbar-title">FinanceTracker</span>
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
    );
};