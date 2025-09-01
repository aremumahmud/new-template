import './ReferUs.css'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FAQ from '../components/FAQ'
import referImage from '../assets/test2.jpg'
import verifiedIcon from '../assets/verified-check-svgrepo-com.svg'
import emailService from '../services/emailService'

function ReferUs() {
    const [formData, setFormData] = useState({
        referrerName: '',
        referrerEmail: '',
        referrerPhone: '',
        referrerRelation: '',
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        clientAddress: '',
        careNeeds: '',
        urgency: '',
        additionalInfo: '',
        agreeToTerms: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Send admin notification email
            const adminResult = await emailService.sendReferralFormEmail(formData);
            
            if (adminResult.success) {
                console.log('Referral submitted successfully:', formData);
                
                // Send user confirmation email (only if referrer provided email)
                if (formData.referrerEmail) {
                    try {
                        await emailService.sendReferralConfirmationEmail(formData);
                        console.log('Referral confirmation email sent to user');
                    } catch (confirmationError) {
                        console.warn('Failed to send confirmation email to user:', confirmationError);
                        // Don't fail the whole process if confirmation email fails
                    }
                }
                
                setShowSuccessMessage(true);
                
                // Reset form
                setFormData({
                    referrerName: '',
                    referrerEmail: '',
                    referrerPhone: '',
                    referrerRelation: '',
                    clientName: '',
                    clientPhone: '',
                    clientEmail: '',
                    clientAddress: '',
                    careNeeds: '',
                    urgency: '',
                    additionalInfo: '',
                    agreeToTerms: false
                });

                // Hide success message after 5 seconds
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 5000);
            } else {
                console.error('Failed to send referral form:', adminResult.error);
                alert('Sorry, there was an error submitting your referral. Please try again or call us directly at (832) 446-0705.');
            }
        } catch (error) {
            console.error('Referral form submission error:', error);
            alert('Sorry, there was an error submitting your referral. Please try again or call us directly at (832) 446-0705.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const referralBenefits = [
        {
            id: 1,
            icon: "🎁",
            title: "Referral Rewards",
            description: "Receive a thank you gift for each successful referral that begins service with us."
        },
        {
            id: 2,
            icon: "🏆",
            title: "Quality Care Guarantee",
            description: "Your referrals receive the same exceptional, compassionate care that you've experienced."
        },
        {
            id: 3,
            icon: "🤝",
            title: "Ongoing Support",
            description: "We provide continuous support to both you and your referrals throughout their care journey."
        },
        {
            id: 4,
            icon: "⚡",
            title: "Fast Response",
            description: "Priority scheduling and assessment for all referred clients within 24-48 hours."
        }
    ];

    const careNeedsOptions = [
        { value: "personal-care", label: "Personal Care Services" },
        { value: "companion-care", label: "Companion Care" },
        { value: "respite-care", label: "Respite Care" },
        { value: "specialized-care", label: "Specialized Care" },
        { value: "inclusive-care", label: "Inclusive Care" },
        { value: "in-facility-care", label: "In-Facility Care" },
        { value: "assessment", label: "Care Assessment" },
        { value: "not-sure", label: "Not Sure - Need Consultation" }
    ];

    const urgencyOptions = [
        { value: "immediate", label: "Immediate (Within 24 hours)" },
        { value: "urgent", label: "Urgent (Within 3 days)" },
        { value: "soon", label: "Soon (Within a week)" },
        { value: "planning", label: "Planning ahead (More than a week)" }
    ];

    const relationOptions = [
        { value: "family", label: "Family Member" },
        { value: "friend", label: "Friend" },
        { value: "neighbor", label: "Neighbor" },
        { value: "healthcare-provider", label: "Healthcare Provider" },
        { value: "social-worker", label: "Social Worker" },
        { value: "current-client", label: "Current Client" },
        { value: "former-client", label: "Former Client" },
        { value: "other", label: "Other" }
    ];

    return (
        <div className="refer-us-page">
            <Header />
            
            {/* Hero Section */}
            <section className="refer-hero">
                <div className="refer-hero-container">
                    <div className="refer-hero-content">
                        <div className="refer-hero-text" data-aos="fade-up">
                            <div className="refer-badge">Refer Someone</div>
                            <h1 className="refer-hero-title">
                                Share the Gift of<br />
                                <span className="highlight">Compassionate Care</span>
                            </h1>
                            <p className="refer-hero-description">
                                Know someone who could benefit from our exceptional home care services? 
                                Your referral could make a meaningful difference in someone's life. 
                                Help us extend our compassionate care to more families in need.
                            </p>
                            <div className="refer-stats" data-aos="fade-up" data-aos-delay="200">
                                <div className="stat">
                                    <span className="stat-number">95%</span>
                                    <span className="stat-label">Referral Satisfaction</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">24HR</span>
                                    <span className="stat-label">Response Time</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">Free</span>
                                    <span className="stat-label">Initial Assessment</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Refer Section */}
            <section className="why-refer-section">
                <div className="why-refer-container">
                    <div className="why-refer-content">
                        <div className="why-refer-text" data-aos="fade-right">
                            <div className="section-badge">Why Refer to Us?</div>
                            <h2 className="section-title">
                                Trusted Care That Makes a <span className="title-highlight">Difference</span>
                            </h2>
                            <p className="section-description">
                                When you refer someone to Journey of Care, you're connecting them with 
                                a team that genuinely cares about their wellbeing and independence. 
                                Here's what makes our referral program special:
                            </p>
                            
                            <div className="benefits-list">
                                {referralBenefits.map((benefit, index) => (
                                    <div key={benefit.id} className="benefit-item" data-aos="fade-up" data-aos-delay={`${300 + (index * 100)}`}>
                                        <div className="benefit-icon">{benefit.icon}</div>
                                        <div className="benefit-content">
                                            <h4 className="benefit-title">{benefit.title}</h4>
                                            <p className="benefit-description">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="why-refer-image" data-aos="fade-left" data-aos-delay="300">
                            <img src={referImage} alt="Caregiver helping senior" />
                            <div className="image-overlay">
                                <div className="overlay-content">
                                    <img src={verifiedIcon} alt="Verified" className="verified-icon" />
                                    <div className="overlay-text">
                                        <span className="overlay-main">Licensed & Insured</span>
                                        <span className="overlay-sub">Trusted Care Provider</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Referral Form Section */}
            <section className="referral-form-section">
                <div className="referral-form-container">
                    <div className="referral-form-header" data-aos="fade-up">
                        <h2 className="form-title">Submit a Referral</h2>
                        <p className="form-subtitle">
                            Please fill out the information below to refer someone for our care services. 
                            All information is kept confidential and secure.
                        </p>
                    </div>

                    {showSuccessMessage && (
                        <div className="success-message" data-aos="fade-in">
                            <div className="success-icon">✅</div>
                            <div className="success-content">
                                <h4>Referral Submitted Successfully!</h4>
                                <p>Thank you for your referral. We'll contact them within 24 hours to discuss their care needs.</p>
                            </div>
                        </div>
                    )}

                    <form className="referral-form" onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="200">
                        {/* Your Information Section */}
                        <div className="form-section">
                            <h3 className="form-section-title">Your Information</h3>
                            <p className="form-section-subtitle">Tell us who you are so we can thank you properly</p>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="referrerName">Your Full Name *</label>
                                    <input
                                        type="text"
                                        id="referrerName"
                                        name="referrerName"
                                        value={formData.referrerName}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter your full name"
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="referrerEmail">Your Email Address *</label>
                                    <input
                                        type="email"
                                        id="referrerEmail"
                                        name="referrerEmail"
                                        value={formData.referrerEmail}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter your email"
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="referrerPhone">Your Phone Number</label>
                                    <input
                                        type="tel"
                                        id="referrerPhone"
                                        name="referrerPhone"
                                        value={formData.referrerPhone}
                                        onChange={handleInputChange}
                                        placeholder="Enter your phone number"
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="referrerRelation">Your Relationship to Client *</label>
                                    <select
                                        id="referrerRelation"
                                        name="referrerRelation"
                                        value={formData.referrerRelation}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                    >
                                        <option value="">Select relationship</option>
                                        {relationOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Client Information Section */}
                        <div className="form-section">
                            <h3 className="form-section-title">Client Information</h3>
                            <p className="form-section-subtitle">Information about the person who needs care</p>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="clientName">Client's Full Name *</label>
                                    <input
                                        type="text"
                                        id="clientName"
                                        name="clientName"
                                        value={formData.clientName}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter client's full name"
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="clientPhone">Client's Phone Number *</label>
                                    <input
                                        type="tel"
                                        id="clientPhone"
                                        name="clientPhone"
                                        value={formData.clientPhone}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter client's phone number"
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="clientEmail">Client's Email Address</label>
                                    <input
                                        type="email"
                                        id="clientEmail"
                                        name="clientEmail"
                                        value={formData.clientEmail}
                                        onChange={handleInputChange}
                                        placeholder="Enter client's email (optional)"
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="urgency">When is Care Needed? *</label>
                                    <select
                                        id="urgency"
                                        name="urgency"
                                        value={formData.urgency}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                    >
                                        <option value="">Select timeline</option>
                                        {urgencyOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="clientAddress">Client's Address</label>
                                <input
                                    type="text"
                                    id="clientAddress"
                                    name="clientAddress"
                                    value={formData.clientAddress}
                                    onChange={handleInputChange}
                                    placeholder="Enter client's address (City, State)"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        {/* Care Needs Section */}
                        <div className="form-section">
                            <h3 className="form-section-title">Care Needs</h3>
                            <p className="form-section-subtitle">Help us understand what type of care is needed</p>
                            
                            <div className="form-group">
                                <label htmlFor="careNeeds">Type of Care Needed</label>
                                <select
                                    id="careNeeds"
                                    name="careNeeds"
                                    value={formData.careNeeds}
                                    onChange={handleInputChange}
                                    disabled={isSubmitting}
                                >
                                    <option value="">Select care type (optional)</option>
                                    {careNeedsOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="additionalInfo">Additional Information</label>
                                <textarea
                                    id="additionalInfo"
                                    name="additionalInfo"
                                    value={formData.additionalInfo}
                                    onChange={handleInputChange}
                                    rows="4"
                                    placeholder="Please provide any additional details about the client's care needs, medical conditions, or special requirements..."
                                    disabled={isSubmitting}
                                ></textarea>
                            </div>
                        </div>

                        {/* Terms and Submit */}
                        <div className="form-section">
                            <div className="form-group checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="agreeToTerms"
                                        checked={formData.agreeToTerms}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                    />
                                    <span className="checkbox-text">
                                        I confirm that I have permission to refer this client and understand that 
                                        Journey of Care will contact them to discuss their care needs. I agree to the 
                                        <a href="/privacy" className="privacy-link"> privacy policy</a> and 
                                        <a href="/terms" className="terms-link"> terms of service</a>.
                                    </span>
                                </label>
                            </div>

                            <button 
                                type="submit" 
                                className={`referral-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                disabled={isSubmitting || !formData.agreeToTerms}
                            >
                                {isSubmitting ? 'Submitting Referral...' : 'Submit Referral'}
                            </button>

                            <p className="form-privacy-note">
                                Your referral information is kept strictly confidential. We will only contact 
                                the referred client to discuss their care needs and will never share their 
                                information with unauthorized parties.
                            </p>
                        </div>
                    </form>
                </div>
            </section>

            {/* Contact Section */}
            <section className="refer-contact-section">
                <div className="refer-contact-container">
                    <div className="refer-contact-content" data-aos="fade-up">
                        <h2 className="contact-title">Have Questions About Referring?</h2>
                        <p className="contact-description">
                            Our team is here to help you with the referral process. Contact us if you have 
                            any questions or need assistance.
                        </p>
                        <div className="contact-info-grid">
                            <div className="contact-info-item" data-aos="fade-up" data-aos-delay="200">
                                <div className="contact-icon">📞</div>
                                <h3>Call Us</h3>
                                <a href="tel:8324460705" className="contact-link">(832) 446-0705</a>
                                <p className="contact-subtitle">Available 24/7 for urgent referrals</p>
                            </div>
                            <div className="contact-info-item" data-aos="fade-up" data-aos-delay="400">
                                <div className="contact-icon">📧</div>
                                <h3>Email Us</h3>
                                <a href="mailto:referrals@journey-of-care.com" className="contact-link">referrals@journey-of-care.com</a>
                                <p className="contact-subtitle">Dedicated referral support team</p>
                            </div>
                            <div className="contact-info-item" data-aos="fade-up" data-aos-delay="600">
                                <div className="contact-icon">🕐</div>
                                <h3>Response Time</h3>
                                <p className="contact-text">Within 24 Hours</p>
                                <p className="contact-subtitle">We'll contact your referral promptly</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQ />

            <Footer />
        </div>
    )
}

export default ReferUs
