import './About.css'
import aboutImage from '../assets/test3.jpg'

function About() {
    return (
        <section className="about-section">
            <div className="about-container">
                <div className="about-content">
                    <div className="about-text">
                        <div className="about-badge" data-aos="fade-up" data-aos-delay="100">
                            About CareConnect
                        </div>
                        
                        <h2 className="about-title" data-aos="fade-up" data-aos-delay="200">
                            Compassionate Care <span className="title-highlight">Feels Like Family</span>
                        </h2>
                        
                        <div className="about-description" data-aos="fade-up" data-aos-delay="300">
                            <p>
                                We provide certified, compassionate caregivers who become extended family members. Every interaction is guided by respect, dignity, and genuine human connection.
                            </p>
                        </div>
                    </div>
                    
                    <div className="about-image" data-aos="fade-left" data-aos-delay="300">
                        <img src={aboutImage} alt="Compassionate caregiving" />
                        <div className="image-overlay">
                            <div className="overlay-content">
                                <div className="overlay-stat">
                                    <span className="overlay-number">15+</span>
                                    <span className="overlay-label">Years Experience</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
