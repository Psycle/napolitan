import { BodyText } from '../../elements/bodyText/bodyText';
import { DateBars } from '../../presentational/dateBars/dateBars';
import headerVideo from '../../../assets/videos/header.mp4';
import { Accordion, AccordionBody, AccordionHeading, AccordionItem } from '../../elements/accordion/accordion';
import { Button } from '../../elements/button/button';
import logoImage from '../../../assets/images/we-the-people.svg';
import equalityImage from '../../../assets/images/on-freedom-and-equality.svg';
import './homePage.scss';

export function HomePage() {
    return (
        <div className="home-page">
            <div className="home-page-content">
                <div className="home-page-content-top">
                    <DateBars>
                        <div className="home-page-content-top-content">
                            <img
                                className="home-page-logo"
                                src={logoImage}
                                alt="We the People 250th anniversary. 1776 - 2026. America in conversation."
                            />
                            <h1 className="home-page-hero-heading">America in<br />conversation</h1>
                        </div>
                    </DateBars>
                    <video className="home-page-hero-image" autoPlay muted loop>
                        <source src={headerVideo} type="video/mp4" />
                    </video>
                </div>
                <div className="home-page-content-bottom">
                    <div className="home-page-main-text">
                        {/* <h2 className="home-page-hero-subheading">On Freedom & Equality</h2> */}
                        <img className="home-page-hero-subheading-img" src={equalityImage} alt="On Freedom and Equality" />
                        <div className="home-page-main-inner">
                            <BodyText>
                                <p><strong>In honor of the 250th anniversary</strong> of the founding of the United States of America, the Napolitan Institute will host a conversation with Americans from across the nation to reflect on the legacy of our founding, the challenges of the present, and the opportunities still ahead in our future.</p>
                            </BodyText>
                        </div>
                    </div>
                </div>
                <div className="home-page-introduction-section">
                    <div className="home-page-introduction-section-inner">
                        <h1 className="home-page-about-heading">TK About Section</h1>
                        <BodyText>
                            <p><strong>TK copy of</strong> the founding of the United States of America, the Napolitan Institute will host a conversation with Americans from across the nation to reflect on the legacy of our founding, the challenges of the present, and the opportunities of the future.</p>
                        </BodyText>
                    </div>
                </div>
                <div className="home-page-faq-section">
                    <div className="home-page-faq-section-inner">
                        <h1 className="home-page-faq-heading">Frequently asked questions</h1>
                        <Accordion>
                            <AccordionItem>
                                <AccordionHeading>Will this be a question in the TK?</AccordionHeading>
                                <AccordionBody>
                                    <p><strong>This is TK text</strong> of the founding of the United States of America, the Napolitan Institute will host a conversation with Americans from across the nation to reflect on the legacy of our founding, the challenges of the present, and the opportunities still ahead in our future.</p>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionHeading>Will this be a question in the TK?</AccordionHeading>
                                <AccordionBody>
                                    <p><strong>This is TK text</strong> of the founding of the United States of America, the Napolitan Institute will host a conversation with Americans from across the nation to reflect on the legacy of our founding, the challenges of the present, and the opportunities still ahead in our future.</p>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionHeading>Will this be a question in the TK?</AccordionHeading>
                                <AccordionBody>
                                    <p><strong>This is TK text</strong> of the founding of the United States of America, the Napolitan Institute will host a conversation with Americans from across the nation to reflect on the legacy of our founding, the challenges of the present, and the opportunities still ahead in our future.</p>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionHeading>Will this be a question in the TK?</AccordionHeading>
                                <AccordionBody>
                                    <p><strong>This is TK text</strong> of the founding of the United States of America, the Napolitan Institute will host a conversation with Americans from across the nation to reflect on the legacy of our founding, the challenges of the present, and the opportunities still ahead in our future. Future.</p>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionHeading>Will this be a question in the TK?</AccordionHeading>
                                <AccordionBody>
                                    <p><strong>This is TK text</strong> of the founding of the United States of America, the Napolitan Institute will host a conversation with Americans from across the nation to reflect on the legacy of our founding, the challenges of the present, and the opportunities still ahead in our future.</p>
                                </AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
                <div className="home-page-sign-up-section">
                    <div className="home-page-sign-up-section-inner">
                        <h1 className="home-page-sign-up-heading">Sign Up for updates</h1>
                        <Button variant="primary">Sign up</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}