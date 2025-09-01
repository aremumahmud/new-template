import './Services.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { servicesData, servicesList } from '../data/servicesData'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ServicesParallax from '../components/ServicesParallax'
import ServicesFAQ from '../components/ServicesFAQ'
import pic from '../assets/pic.jpg'
import p1 from '../assets/p1.jpg'
import p2 from '../assets/p2.jpg'
import p3 from '../assets/p3.jpg'
import test1 from '../assets/test1.jpg'
import test2 from '../assets/test2.jpg'

function Services() {
    const { serviceId } = useParams();
    const [activeService, setActiveService] = useState(serviceId || 'inclusive-care');

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (serviceId && servicesData[serviceId]) {
            setActiveService(serviceId);
        }
    }, [serviceId]);
    
    const serviceImages = {
        'inclusive-care': pic,
        'personal-care': p1,
        'companion-care': p2,
        'respite-care': p3,
        'in-facility-care': test1,
        'specialized-care': test2
    };

    const currentService = servicesData[activeService];

    return (
        <div className="services-page">
            <Header />
            
            {/* Hero Section */}
            <section className="services-hero">
                <div className="services-hero-container">
                    <div className="services-hero-content">
                        <div className="services-hero-text" data-aos="fade-up">
                            <div className="services-badge">Our Services</div>
                            <h1 className="services-hero-title">
                                Comprehensive Care<br />
                                <span className="highlight">Tailored to Your Needs</span>
                            </h1>
                            <p className="services-hero-description">
                                From personal care to specialized support, we provide compassionate, 
                                professional home care services designed to help your loved ones live 
                                independently and comfortably at home.
                            </p>
                            <div className="services-stats" data-aos="fade-up" data-aos-delay="200">
                                <div className="stat">
                                    <span className="stat-number">6</span>
                                    <span className="stat-label">Specialized Services</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">24/7</span>
                                    <span className="stat-label">Support Available</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">100%</span>
                                    <span className="stat-label">Licensed & Insured</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Tabs */}
            <section className="services-tabs-section">
                <div className="services-tabs-container">
                    <div className="services-tabs" data-aos="fade-up">
                        {servicesList.map((service) => (
                            <button
                                key={service.id}
                                className={`service-tab ${activeService === service.id ? 'active' : ''}`}
                                onClick={() => setActiveService(service.id)}
                            >
                                {service.shortName}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Service Details */}
            <section className="service-details">
                <div className="service-details-container">
                    <div className="service-content" data-aos="fade-up">
                        <div className="service-header">
                            <div className="service-image" data-aos="fade-up" data-aos-delay="100">
                                <img src={serviceImages[activeService]} alt={currentService.title} />
                            </div>
                            <h2 className="service-title">{currentService.title}</h2>
                            <p className="service-subtitle">{currentService.subtitle}</p>
                            <p className="service-description">{currentService.description}</p>
                        </div>

                        <div className="service-features">
                            <div className="feature-section" data-aos="fade-up" data-aos-delay="200">
                                <h3 className="feature-title">What We Provide:</h3>
                                <ul className="feature-list">
                                    {currentService.whatWeProvide.map((item, index) => (
                                        <li key={index} className="feature-item">
                                            <span className="feature-icon">✓</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="feature-section" data-aos="fade-up" data-aos-delay="400">
                                <h3 className="feature-title">Key Benefits:</h3>
                                <ul className="feature-list">
                                    {currentService.keyBenefits.map((benefit, index) => (
                                        <li key={index} className="feature-item">
                                            <span className="feature-icon">★</span>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="service-cta1" data-aos="fade-up" data-aos-delay="600">
                            <h3 className="cta-title">{currentService.ctaTitle}</h3>
                            <p className="cta-description">{currentService.ctaDescription}</p>
                            <button className="cta-button">{currentService.ctaButton}</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Parallax Section */}
            <ServicesParallax />

            {/* Contact Section */}
            <section className="contact-section1">
                <div className="contact-container">
                    <div className="contact-content" data-aos="fade-up">
                        <h2 className="contact-title">
                            personalized care plan for your loved one!
                        </h2>
                        <div className="contact-info-grid">
                            <div className="contact-info-item" data-aos="fade-up" data-aos-delay="200">
                                <div className="contact-icon">📞</div>
                                <h3>Call Us</h3>
                                <a href="tel:8324460705" className="contact-link">(832) 446-0705</a>
                                <p className="contact-subtitle">Available 24/7 for emergencies</p>
                            </div>
                            <div className="contact-info-item" data-aos="fade-up" data-aos-delay="400">
                                <div className="contact-icon">📧</div>
                                <h3>Email Us</h3>
                                <a href="mailto:Info@journey-of-care.com" className="contact-link">Info@journey-of-care.com</a>
                                <p className="contact-subtitle">We respond within 24 hours</p>
                            </div>
                            <div className="contact-info-item" data-aos="fade-up" data-aos-delay="600">
                                <div className="contact-icon">📍</div>
                                <h3>Service Area</h3>
                                <p className="contact-text">Conroe, TX & Surrounding Communities</p>
                                <p className="contact-subtitle">Serving the greater Houston area</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services FAQ */}
            <ServicesFAQ />

            <Footer />
        </div>
    )
}

export default Services
