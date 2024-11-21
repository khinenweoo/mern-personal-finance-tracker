import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import './auth.css';

export const Auth = () => {
    return (
        <div className="auth-container">
            <div className="auth-content">
                <div className="auth-left">
                    <h1>Welcome to Finance Tracker App</h1>
                    <p>Start your journey with us today</p>
                </div>

                <div className="auth-right">
                    <SignedOut>
                        <div className="button-group">
                            <div className="signup-button">
                                <SignUpButton mode="modal" />
                            </div>
                            <div className="signin-button">
                                <SignInButton mode="modal" />
                            </div>
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <Navigate to="/" />
                    </SignedIn>
                </div>
            </div>
        </div>
    );
};