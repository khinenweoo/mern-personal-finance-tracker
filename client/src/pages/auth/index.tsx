import './auth.css';
import Header from './layout/partials/Header';
import Feature from './layout/partials/Feature';
import Footer from './layout/partials/Footer';

export const Auth = () => {
    return (
        <div className="relative m-h-screen mx-auto">
            <Header />
            <Feature />
            <Footer />
        </div>
    );
};