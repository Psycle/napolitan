import { Outlet } from "react-router";
import footerLogo from '../../../assets/images/napolitan-logo-white.svg';
import jigsawLogo from '../../../assets/images/jigsaw-logo.svg';
import iconFacebook from '../../../assets/images/icon-facebook.svg';
import iconX from '../../../assets/images/icon-x.svg';
import iconInstagram from '../../../assets/images/icon-instagram.svg';
import './mainLayout.scss';

export function MainLayout() {
    return (
        <div className="main-layout">
            <main className="main-layout-main">
                <Outlet />
            </main>
            <footer className="main-layout-footer">
                <div className="main-layout-footer-inner">                        
                    <div className="main-layout-footer-section">
                        <h3 className="main-layout-footer-heading">Email</h3>
                        <p><a href="mailto:hello@wethepeople250.com">hello@wethepeople250.com</a></p>
                    </div>
                    <div className="main-layout-footer-section">
                        <div className="main-layout-footer-logos">
                            <img className="main-layout-footer-logo" src={footerLogo} />
                            <img className="main-layout-footer-logo main-layout-footer-logo-jigsaw" src={jigsawLogo} />
                        </div>
                    </div>
                    <div className="main-layout-footer-section">
                        <h3 className="main-layout-footer-heading">Socials</h3>
                        <div className="main-layout-footer-section-socials">
                            <img className="main-layout-footer-section-social" src={iconInstagram} />
                            <img className="main-layout-footer-section-social" src={iconX} />
                            <img className="main-layout-footer-section-social" src={iconFacebook} />
                        </div>
                        <h3 className="main-layout-footer-wtp-heading">We the people</h3>
                        <p>Jigsaw copy TK that could fit within this section</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}