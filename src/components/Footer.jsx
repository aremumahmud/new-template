import './Footer.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    const [email, setEmail] = useState('');

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (email) {
            console.log('Footer newsletter subscription:', email);
            setEmail('');
            // Add success handling here
        }
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    {/* Company Info */}
                    <div className="footer-section company-info">
                        <div className="footer-logo">
                            <h3>Journey of Care</h3>
                        </div>
                        <p className="company-description">
                            Providing trustworthy, heartfelt home care services in North Houston, Conroe, The Woodlands, Spring, and surrounding areas. Bringing compassionate support to your doorstep with certified caregivers who offer steady hands and open hearts.
                        </p>
                        <div className="company-badges">
                            <div className="badge">Licensed & Insured</div>
                            <div className="badge">Certified Caregivers</div>
                            <div className="badge">Personalized Care Plans</div>
                        </div>
                    </div>

                    {/* Our Services */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Our Services</h4>
                        <ul className="footer-links">
                            <li><a href="#services">Inclusive Care for All Abilities</a></li>
                            <li><a href="#services">Personal Care Services</a></li>
                            <li><a href="#services">Companion Care</a></li>
                            <li><a href="#services">Respite Care</a></li>
                            <li><a href="#services">In-Facility Care</a></li>
                        </ul>
                        <div className="footer-cta">
                            <a href="#contact" className="schedule-btn">Schedule Assessment</a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#services">Our Services</a></li>
                            <li><a href="#careers">Careers</a></li>
                            <li><a href="#blog">Blog</a></li>
                            <li><a href="#contact">Contact</a></li>
                            <li><Link to="/refer-us">Refer Us</Link></li>
                        </ul>
                        <h4 className="footer-heading legal-heading">Legal</h4>
                        <ul className="footer-links">
                            <li><a href="#privacy">Privacy Policy</a></li>
                            <li><a href="#terms">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Contact Information</h4>
                        <div className="contact-info1">
                            <div className="contact-item">
                                <strong>Service Area</strong>
                                <p>North Houston, Conroe, The Woodlands, Spring, and surrounding areas</p>
                            </div>
                            <div className="contact-item">
                                <strong>Phone</strong>
                                <p>(832) 446-0705</p>
                            </div>
                            <div className="contact-item">
                                <strong>Email</strong>
                                <p>Info@journey-of-care.com</p>
                            </div>
                        </div>
                        
                        <div className="business-hours">
                            <h4 className="footer-heading">Business Hours</h4>
                            <div className="hours-list">
                                <div className="hours-item">
                                    <span className="hours-icon">🕘</span>
                                    <div>
                                        <strong>Monday - Friday:</strong>
                                        <p>8:00 AM – 5:00 PM</p>
                                    </div>
                                </div>
                                <div className="hours-item">
                                    <span className="hours-icon">📞</span>
                                    <div>
                                        <strong>Saturday & Sunday:</strong>
                                        <p>On-call availability</p>
                                    </div>
                                </div>
                                <div className="hours-item">
                                    <span className="hours-icon">🚨</span>
                                    <div>
                                        <strong>24/7 Emergency:</strong>
                                        <p>Available when needed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="footer-newsletter">
                    <div className="newsletter-content">
                        <h3>Stay Connected with Journey of Care</h3>
                        <p>Get home care tips, updates, and news delivered to your inbox.</p>
                        <form className="footer-newsletter-form" onSubmit={handleNewsletterSubmit}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                required
                            />
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <div className="copyright">
                            <p>© 2024 Journey of Care. All rights reserved.</p>
                        </div>
                        <div className="footer-tagline">
                            <p>
                                Serving North Houston, Conroe, The Woodlands, Spring, and surrounding areas. 
                                Specializing in compassionate in-home senior care, including personal care, 
                                companion care, respite care, and specialized memory care.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
