import React from "react";
import '../styles/about.scss';

const About = () => {
    return (
        <div id="about">
            <div className="top">
                <div className="container">
                    <div className="title">
                        About Sura
                        <div className="hr"></div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="container">
                    <div className="block">
                        <div className="title">Our Mission</div>
                        <div className="text">
                            Sura - in Kazakh means “ask”.
                            <br/>
                            Our mission is to help foreigners coming to Kazakhstan to solve their problems and live better in our country. Not everything can be known on the website, and some of it requires life experience. So we want to connect people who have this knowledge with people who need it, to ask their needs and share their knowledge so that everyone can live better in Kazakhstan.
                        </div>
                    </div>
                    <div className="block">
                        <div className="title">Our Video</div>
                        <div className="text">
                            About the experiences of some users who have used our pages and what problems we have helped to solve.
                        </div>
                        <iframe className="video" width="720" src="https://www.youtube.com/embed/wLAqN2ozb-Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;