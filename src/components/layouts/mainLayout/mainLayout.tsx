import { Outlet } from "react-router";
import { DateBars } from "../../presentational/dateBars/dateBars";
import './mainLayout.scss';

export function MainLayout() {
    return (
        <div className="main-layout">
            <main className="main-layout-main">
                <DateBars>
                    <Outlet />
                </DateBars>
            </main>
            <footer className="main-layout-footer">
                <div className="main-layout-footer-inner">                        
                    <div className="main-layout-footer-section">
                        <h3 className="main-layout-footer-heading">Email</h3>
                        <p><a href="mailto:hello@wethepeople250.com">hello@wethepeople250.com</a></p>
                    </div>
                    <div className="main-layout-footer-section">
                        <div className="main-layout-footer-logos">
                            <div className="main-layout-footer-logo"></div>
                            <div className="main-layout-footer-logo"></div>
                        </div>
                    </div>
                    <div className="main-layout-footer-section">
                        <h3 className="main-layout-footer-heading">Socials</h3>
                        <div className="main-layout-footer-section-socials">
                            <div className="main-layout-footer-section-social"></div>
                            <div className="main-layout-footer-section-social"></div>
                            <div className="main-layout-footer-section-social"></div>
                        </div>
                        <h3 className="main-layout-footer-heading">We the people</h3>
                        <p>Jigsaw copy TK that could fit within this section</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}