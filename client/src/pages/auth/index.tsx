import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import './auth.css';
import SvgImageComponent from "../../components/SvgImageComponent";

export const Auth = () => {

    return (
        <div className="auth-container flex h-screen mx-auto dark:bg-black">
            {/* Left Pane */}
            <div className="lg:flex items-center justify-center flex-1 text-black">
                <div className="max-w-lg text-center">
                    <SvgImageComponent />
                </div>
            </div>

            {/* Right Pane */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
                <div className="max-w-md w-full p-6">
                    <SignedOut>
                        <SignIn />
                    </SignedOut>
                    <SignedIn>
                        <Navigate to="/" />
                    </SignedIn>
                </div>
            </div>
        </div>
    );
};