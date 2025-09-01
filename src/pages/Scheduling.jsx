import './Scheduling.css'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { servicesList } from '../data/servicesData'
import schedulingImg from '../assets/pic.jpg'
import emailService from '../services/emailService'

function Scheduling() {
    const [formData, setFormData] = useState({
        // Personal Information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        relationship: '',
        
        // Care Recipient Information
        recipientName: '',
        recipientAge: '',
        recipientGender: '',
        recipientConditions: '',
        
        // Service Details
        services: [],
        careLevel: '',
        frequency: '',
        duration: '',
        startDate: '',
        preferredTime: '',
        urgency: '',
        
        // Location & Preferences
        address: '',
        city: 'Conroe',
        zipCode: '',
        specialRequests: '',
        additionalInfo: ''
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox' && name === 'services') {
            setFormData(prev => ({
                ...prev,
                services: checked 
                    ? [...prev.services, value]
                    : prev.services.filter(service => service !== value)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Send admin notification email
            const adminResult = await emailService.sendConsultationFormEmail(formData);
            
            if (adminResult.success) {
                console.log('Consultation request submitted successfully:', formData);
                
                // Send user confirmation email (only if user provided email)
                if (formData.email) {
                    try {
                        await emailService.sendConsultationConfirmationEmail(formData);
                        console.log('Consultation confirmation email sent to user');
                    } catch (confirmationError) {
                        console.warn('Failed to send confirmation email to user:', confirmationError);
                        // Don't fail the whole process if confirmation email fails
                    }
                }
                
                setShowSuccessMessage(true);
                
                // Reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    relationship: '',
                    recipientName: '',
                    recipientAge: '',
                    recipientGender: '',
                    recipientConditions: '',
                    services: [],
                    careLevel: '',
                    frequency: '',
                    duration: '',
                    startDate: '',
                    preferredTime: '',
                    urgency: '',
                    address: '',
                    city: 'Conroe',
                    zipCode: '',
                    specialRequests: '',
                    additionalInfo: ''
                });
                setCurrentStep(1);

                // Hide success message after 5 seconds
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 5000);
            } else {
                console.error('Failed to send consultation form:', adminResult.error);
                alert('Sorry, there was an error submitting your consultation request. Please try again or call us directly at (832) 446-0705.');
            }
        } catch (error) {
            console.error('Consultation form submission error:', error);
            alert('Sorry, there was an error submitting your consultation request. Please try again or call us directly at (832) 446-0705.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const relationshipOptions = [
        { value: "adult-child", label: "Adult Child" },
        { value: "spouse", label: "Spouse/Partner" },
        { value: "sibling", label: "Sibling" },
        { value: "friend", label: "Friend" },
        { value: "family-member", label: "Other Family Member" },
        { value: "self", label: "Myself" },
        { value: "professional", label: "Healthcare Professional" },
        { value: "other", label: "Other" }
    ];

    const careLevelOptions = [
        { value: "light", label: "Light Care (1-2 hours/day)" },
        { value: "moderate", label: "Moderate Care (3-6 hours/day)" },
        { value: "extensive", label: "Extensive Care (8-12 hours/day)" },
        { value: "live-in", label: "Live-in Care (24 hours)" },
        { value: "respite", label: "Respite Care (Temporary)" }
    ];

    const frequencyOptions = [
        { value: "daily", label: "Daily" },
        { value: "weekdays", label: "Weekdays Only" },
        { value: "weekends", label: "Weekends Only" },
        { value: "few-times-week", label: "Few Times Per Week" },
        { value: "weekly", label: "Weekly" },
        { value: "bi-weekly", label: "Bi-weekly" },
        { value: "monthly", label: "Monthly" },
        { value: "as-needed", label: "As Needed" }
    ];

    const timeOptions = [
        { value: "morning", label: "Morning (6AM - 12PM)" },
        { value: "afternoon", label: "Afternoon (12PM - 6PM)" },
        { value: "evening", label: "Evening (6PM - 10PM)" },
        { value: "overnight", label: "Overnight (10PM - 6AM)" },
        { value: "flexible", label: "Flexible" }
    ];

    const urgencyOptions = [
        { value: "immediate", label: "Immediate (Within 24 hours)" },
        { value: "urgent", label: "Urgent (Within 3 days)" },
        { value: "soon", label: "Soon (Within a week)" },
        { value: "flexible", label: "Flexible (Within a month)" }
    ];

    const steps = [
        { number: 1, title: "Personal Info", description: "Your contact details" },
        { number: 2, title: "Care Recipient", description: "Who needs care" },
        { number: 3, title: "Service Details", description: "Type and schedule" },
        { number: 4, title: "Location & Review", description: "Final details" }
    ];

    return (
        <div className="scheduling-page">
            <Header />
            
            {/* Hero Section */}
            <section className="scheduling-hero">
                <div className="scheduling-hero-container">
                    <div className="scheduling-hero-content">
                        <div className="scheduling-hero-text" data-aos="fade-up">
                            <div className="scheduling-badge">Schedule Care</div>
                            <h1 className="scheduling-hero-title">
                                Schedule Your<br />
                                <span className="highlight">Care Consultation</span>
                            </h1>
                            <p className="scheduling-hero-description">
                                Take the first step towards compassionate, professional home care. 
                                Complete our scheduling form and we'll arrange a free consultation 
                                to discuss your specific needs and create a personalized care plan.
                            </p>
                            <div className="scheduling-stats" data-aos="fade-up" data-aos-delay="200">
                                <div className="stat">
                                    <span className="stat-number">Free</span>
                                    <span className="stat-label">Consultation</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">24hr</span>
                                    <span className="stat-label">Response Time</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">Licensed</span>
                                    <span className="stat-label">Caregivers</span>
                                </div>
                            </div>
                        </div>
                        <div className="scheduling-hero-image" data-aos="fade-left" data-aos-delay="300">
                            <img src={schedulingImg} alt="Compassionate Care" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Scheduling Form Section */}
            <section className="scheduling-form-section">
                <div className="scheduling-form-container">
                    {/* Progress Indicator */}
                    <div className="progress-indicator" data-aos="fade-up">
                        <div className="steps-container">
                            {steps.map((step) => (
                                <div key={step.number} className={`step ${currentStep >= step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}>
                                    <div className="step-number">
                                        {currentStep > step.number ? '✓' : step.number}
                                    </div>
                                    <div className="step-info">
                                        <div className="step-title">{step.title}</div>
                                        <div className="step-description">{step.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
                        </div>
                    </div>

                    {/* Success Message */}
                    {showSuccessMessage && (
                        <div className="success-message" data-aos="fade-in">
                            <div className="success-icon">🎉</div>
                            <div className="success-content">
                                <h3>Consultation Scheduled Successfully!</h3>
                                <p>Thank you for choosing Journey of Care. We'll contact you within 24 hours to confirm your consultation appointment and discuss your care needs.</p>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form className="scheduling-form" onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="200">
                        {/* Step 1: Personal Information */}
                        {currentStep === 1 && (
                            <div className="form-step active">
                                <div className="step-header">
                                    <h2 className="step-title">Personal Information</h2>
                                    <p className="step-subtitle">Tell us about yourself so we can contact you about the consultation.</p>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name *</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your first name"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name *</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your last name"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your email address"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number *</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your phone number"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="relationship">Relationship to Care Recipient *</label>
                                    <select
                                        id="relationship"
                                        name="relationship"
                                        value={formData.relationship}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                    >
                                        <option value="">Select your relationship</option>
                                        {relationshipOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Care Recipient Information */}
                        {currentStep === 2 && (
                            <div className="form-step active">
                                <div className="step-header">
                                    <h2 className="step-title">Care Recipient Information</h2>
                                    <p className="step-subtitle">Help us understand who will be receiving care and their specific needs.</p>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="recipientName">Care Recipient's Name *</label>
                                    <input
                                        type="text"
                                        id="recipientName"
                                        name="recipientName"
                                        value={formData.recipientName}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter the care recipient's name"
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="recipientAge">Age *</label>
                                        <input
                                            type="number"
                                            id="recipientAge"
                                            name="recipientAge"
                                            value={formData.recipientAge}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Age"
                                            min="1"
                                            max="120"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="recipientGender">Gender</label>
                                        <select
                                            id="recipientGender"
                                            name="recipientGender"
                                            value={formData.recipientGender}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                        >
                                            <option value="">Select gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="prefer-not-to-say">Prefer not to say</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="recipientConditions">Medical Conditions or Special Needs</label>
                                    <textarea
                                        id="recipientConditions"
                                        name="recipientConditions"
                                        value={formData.recipientConditions}
                                        onChange={handleInputChange}
                                        rows="4"
                                        placeholder="Please describe any medical conditions, mobility issues, cognitive needs, or special requirements..."
                                        disabled={isSubmitting}
                                    ></textarea>
                                    <small className="form-note">This information helps us match you with the most suitable caregiver.</small>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Service Details */}
                        {currentStep === 3 && (
                            <div className="form-step active">
                                <div className="step-header">
                                    <h2 className="step-title">Service Details</h2>
                                    <p className="step-subtitle">Select the services you need and your preferred schedule.</p>
                                </div>

                                <div className="form-group">
                                    <label>Services Needed * (Select all that apply)</label>
                                    <div className="checkbox-grid">
                                        {servicesList.map((service) => (
                                            <label key={service.id} className="checkbox-item">
                                                <input
                                                    type="checkbox"
                                                    name="services"
                                                    value={service.id}
                                                    checked={formData.services.includes(service.id)}
                                                    onChange={handleInputChange}
                                                    disabled={isSubmitting}
                                                />
                                                <span className="checkbox-label">{service.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="careLevel">Level of Care Needed *</label>
                                        <select
                                            id="careLevel"
                                            name="careLevel"
                                            value={formData.careLevel}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isSubmitting}
                                        >
                                            <option value="">Select care level</option>
                                            {careLevelOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="frequency">Frequency *</label>
                                        <select
                                            id="frequency"
                                            name="frequency"
                                            value={formData.frequency}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isSubmitting}
                                        >
                                            <option value="">Select frequency</option>
                                            {frequencyOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="preferredTime">Preferred Time *</label>
                                        <select
                                            id="preferredTime"
                                            name="preferredTime"
                                            value={formData.preferredTime}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isSubmitting}
                                        >
                                            <option value="">Select preferred time</option>
                                            {timeOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="startDate">Preferred Start Date</label>
                                        <input
                                            type="date"
                                            id="startDate"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleInputChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="urgency">How soon do you need care to start? *</label>
                                    <select
                                        id="urgency"
                                        name="urgency"
                                        value={formData.urgency}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                    >
                                        <option value="">Select urgency</option>
                                        {urgencyOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Location & Review */}
                        {currentStep === 4 && (
                            <div className="form-step active">
                                <div className="step-header">
                                    <h2 className="step-title">Location & Final Details</h2>
                                    <p className="step-subtitle">Provide the care location and any additional information.</p>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address">Street Address *</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter the care location address"
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="city">City *</label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="City"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="zipCode">ZIP Code *</label>
                                        <input
                                            type="text"
                                            id="zipCode"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="ZIP Code"
                                            pattern="[0-9]{5}"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="specialRequests">Special Requests or Preferences</label>
                                    <textarea
                                        id="specialRequests"
                                        name="specialRequests"
                                        value={formData.specialRequests}
                                        onChange={handleInputChange}
                                        rows="3"
                                        placeholder="Any specific caregiver preferences, scheduling requirements, or special requests..."
                                        disabled={isSubmitting}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="additionalInfo">Additional Information</label>
                                    <textarea
                                        id="additionalInfo"
                                        name="additionalInfo"
                                        value={formData.additionalInfo}
                                        onChange={handleInputChange}
                                        rows="4"
                                        placeholder="Is there anything else you'd like us to know about your care needs or situation?"
                                        disabled={isSubmitting}
                                    ></textarea>
                                </div>
                            </div>
                        )}

                        {/* Form Navigation */}
                        <div className="form-navigation">
                            {currentStep > 1 && (
                                <button 
                                    type="button" 
                                    className="nav-btn prev-btn"
                                    onClick={prevStep}
                                    disabled={isSubmitting}
                                >
                                    ← Previous
                                </button>
                            )}
                            
                            {currentStep < 4 ? (
                                <button 
                                    type="button" 
                                    className="nav-btn next-btn"
                                    onClick={nextStep}
                                    disabled={isSubmitting}
                                >
                                    Next →
                                </button>
                            ) : (
                                <button 
                                    type="submit" 
                                    className={`nav-btn submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Scheduling Consultation...' : 'Schedule Consultation'}
                                </button>
                            )}
                        </div>

                        <div className="form-privacy-note">
                            <p>
                                <strong>Privacy Notice:</strong> Your information is secure and will only be used to provide you with care services. 
                                We will never share your personal information with third parties without your consent.
                            </p>
                        </div>
                    </form>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Scheduling
