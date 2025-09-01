import './About.css'
import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Parallax from '../components/Parallax'
import aboutImg1 from '../assets/pic.jpg'
import aboutImg2 from '../assets/p1.jpg'
import aboutImg3 from '../assets/p2.jpg'

function About() {
    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    const values = [
        {
            icon: "❤️",
            title: "Compassionate Care",
            description: "We believe every person deserves care that honors their dignity, respects their choices, and nurtures their wellbeing with genuine compassion."
        },
        {
            icon: "🤝",
            title: "Trust & Reliability",
            description: "Building lasting relationships through consistent, dependable care that families can count on, day after day."
        },
        {
            icon: "🌟",
            title: "Excellence",
            description: "We strive for the highest standards in everything we do, from caregiver training to client care, always seeking to exceed expectations."
        },
        {
            icon: "🏠",
            title: "Home-Centered",
            description: "We believe there's no place like home, and we're committed to helping people maintain their independence and comfort in familiar surroundings."
        },
        {
            icon: "👥",
            title: "Family Partnership",
            description: "We work closely with families, providing support, communication, and peace of mind throughout the care journey."
        },
        {
            icon: "🌈",
            title: "Inclusive Care",
            description: "We celebrate diversity and provide specialized care for all abilities, including neurodivergent individuals and those with special needs."
        }
    ];



    const stats = [
        { number: "500+", label: "Families Served" },
        { number: "15+", label: "Years Experience" },
        { number: "50+", label: "Trained Caregivers" },
        { number: "24/7", label: "Support Available" }
    ];

    return (
        <div className="about-page">
            <Header />
            
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-container">
                    <div className="about-hero-content">
                        <div className="about-hero-text" data-aos="fade-up">
                            <div className="about-badge">About Journey of Care</div>
                            <h1 className="about-hero-title">
                                Compassionate Care<br />
                                <span className="highlight">Close to Home</span>
                            </h1>
                            <p className="about-hero-description">
                                Founded on the belief that everyone deserves to age with dignity in the comfort 
                                of their own home, Journey of Care has been serving the Conroe community and 
                                surrounding areas with personalized, professional home healthcare services.
                            </p>
                            <div className="about-stats" data-aos="fade-up" data-aos-delay="200">
                                {stats.map((stat, index) => (
                                    <div key={index} className="stat">
                                        <span className="stat-number">{stat.number}</span>
                                        <span className="stat-label">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="about-hero-image" data-aos="fade-left" data-aos-delay="300">
                            <img src={aboutImg1} alt="Journey of Care Team" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission-section">
                <div className="mission-container">
                    <div className="mission-content" data-aos="fade-up">
                        <div className="mission-header">
                            <h2 className="mission-title">Our Mission</h2>
                            <div className="mission-divider"></div>
                        </div>
                        <div className="mission-text">
                            <p className="mission-statement">
                                At Journey of Care, our mission is to provide compassionate, personalized home healthcare 
                                services that enable individuals to maintain their independence, dignity, and quality of life 
                                in the comfort of their own homes. We are committed to building trusted relationships with 
                                our clients and their families, delivering exceptional care that honors each person's unique 
                                needs, preferences, and life story.
                            </p>
                            <p className="mission-values">
                                We believe that home is where the heart is, and we're dedicated to ensuring that our clients 
                                can continue their journey of life surrounded by the familiar comforts, memories, and love 
                                that make a house a home. Through our inclusive approach, we proudly serve individuals of 
                                all abilities, including those who are neurodivergent or have special needs, ensuring that 
                                everyone receives the care and respect they deserve.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="story-section">
                <div className="story-container">
                    <div className="story-content">
                        <div className="story-text" data-aos="fade-right">
                            <h2 className="story-title">Our Story</h2>
                            <p className="story-description">
                                Journey of Care was born from a simple yet profound realization: that the best care 
                                happens when people can remain in the place they love most - their home. Our founder, 
                                Sarah Johnson, witnessed firsthand the challenges families face when trying to provide 
                                quality care for their loved ones while maintaining their independence and dignity.
                            </p>
                            <p className="story-description">
                                What started as a personal mission to help a few families in the Conroe area has grown 
                                into a comprehensive home care service that has touched the lives of hundreds of families. 
                                We've built our reputation on trust, reliability, and genuine care - values that guide 
                                every interaction we have with our clients and their families.
                            </p>
                            <p className="story-description">
                                Today, we're proud to be a leading provider of home healthcare services in the greater 
                                Houston area, known for our inclusive approach and specialized care for individuals 
                                with diverse needs and abilities.
                            </p>
                        </div>
                        <div className="story-image" data-aos="fade-left" data-aos-delay="200">
                            <img src={aboutImg2} alt="Our Story" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section">
                <div className="values-container">
                    <div className="values-header" data-aos="fade-up">
                        <h2 className="values-title">Our Core Values</h2>
                        <p className="values-subtitle">
                            These principles guide everything we do and shape the way we care for our clients and their families.
                        </p>
                    </div>
                    <div className="values-grid">
                        {values.map((value, index) => (
                            <div key={index} className="value-card" data-aos="fade-up" data-aos-delay={index * 100}>
                                <div className="value-icon">{value.icon}</div>
                                <h3 className="value-title">{value.title}</h3>
                                <p className="value-description">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Parallax Section */}
            <Parallax />

            {/* Commitment Section */}
            <section className="commitment-section">
                <div className="commitment-container">
                    <div className="commitment-content">
                        <div className="commitment-image" data-aos="fade-right">
                            <img src={aboutImg3} alt="Our Commitment" />
                        </div>
                        <div className="commitment-text" data-aos="fade-left" data-aos-delay="200">
                            <h2 className="commitment-title">Our Commitment to Excellence</h2>
                            <div className="commitment-points">
                                <div className="commitment-point">
                                    <span className="point-icon">✓</span>
                                    <div className="point-content">
                                        <h4>Licensed & Insured</h4>
                                        <p>All our caregivers are thoroughly vetted, licensed, and insured for your peace of mind.</p>
                                    </div>
                                </div>
                                <div className="commitment-point">
                                    <span className="point-icon">✓</span>
                                    <div className="point-content">
                                        <h4>Ongoing Training</h4>
                                        <p>We invest in continuous education to ensure our team stays current with best practices.</p>
                                    </div>
                                </div>
                                <div className="commitment-point">
                                    <span className="point-icon">✓</span>
                                    <div className="point-content">
                                        <h4>24/7 Support</h4>
                                        <p>We're available around the clock for emergencies and to address any concerns.</p>
                                    </div>
                                </div>
                                <div className="commitment-point">
                                    <span className="point-icon">✓</span>
                                    <div className="point-content">
                                        <h4>Personalized Care</h4>
                                        <p>Every care plan is tailored to meet the unique needs and preferences of each client.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="about-cta-section">
                <div className="about-cta-container">
                    <div className="about-cta-content" data-aos="fade-up">
                        <h2 className="cta-title">Ready to Start Your Journey with Us?</h2>
                        <p className="cta-description">
                            Let us help you or your loved one maintain independence and dignity at home. 
                            Contact us today for a free consultation and discover how we can support your family.
                        </p>
                        <div className="cta-buttons">
                            <a href="/scheduling" className="cta-btn primary">
                                Schedule Consultation
                            </a>
                            <a href="/contact" className="cta-btn secondary">
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default About
