import { Button } from '../../elements/button/button';
import './homePage.scss';

export function HomePage() {
    return (
        <div className="home-page">
            <div className="home-page-content">
                <div className="home-page-content-top">
                    <div className="home-page-content-top-content">
                        <div className="home-page-logo"></div>
                        <h1 className="home-page-hero-heading">America in conversation</h1>
                    </div>
                    <div className="home-page-hero-image"></div>
                </div>
                <div className="home-page-content-bottom">
                    <div className="home-page-main-text">
                        <h2 className="home-page-hero-subheading">On Freedom & Equality</h2>
                        <div className="home-page-main-inner">
                            <div className="home-page-main-inner-side home-page-main-inner-side-1">
                                <p><strong>In honor of the 250th anniversary</strong> of the founding of the United States of America, the Napolitan Institute will host a conversation with Americans from across the nation to reflect on the legacy of our founding, the challenges of the present, and the opportunities still ahead in our future.</p>
                            </div>
                            <div className="home-page-main-inner-side home-page-main-inner-side-2">
                                <div className="home-page-main-buttons">
                                    <Button>Register</Button>
                                    <Button>About the project</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )   
}