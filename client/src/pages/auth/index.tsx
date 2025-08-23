import './auth.css';
import Header from './layout/partials/header';
import Feature from './layout/partials/feature';
import Footer from './layout/partials/footer';

export const Auth = () => {
    return (
        <div className="relative m-h-screen mx-auto">
            <Header />
            <Feature />
            <Footer />
        </div>
    );
};