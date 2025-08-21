import { BodyText } from '../../elements/bodyText/bodyText';
import { DateBars } from '../../presentational/dateBars/dateBars';
import './homePage.scss';

export function HomePage() {
    return (
        <div className="home-page">
            <div className="home-page-content">
                <div className="home-page-content-top">
                    <DateBars>
                        <div className="home-page-content-top-content">
                            <img className="home-page-logo" src="src/assets/images/we-the-people.svg" />
                            <h1 className="home-page-hero-heading">America in conversation</h1>
                        </div>
                    </DateBars>
                    <div className="home-page-hero-image"></div>
                </div>
                <div className="home-page-content-bottom">
                    <div className="home-page-main-text">
                        {/* <h2 className="home-page-hero-subheading">On Freedom & Equality</h2> */}
                        <img className="home-page-hero-subheading-img" src="src/assets/images/on-freedom-and-equality.svg" />
                        <div className="home-page-main-inner">
                            <BodyText>
                                <p><strong>In honor of the 250th anniversary</strong> of the founding of the United States of America, the Napolitan Institute will host a conversation with Americans from across the nation to reflect on the legacy of our founding, the challenges of the present, and the opportunities still ahead in our future.</p>
                            </BodyText>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}