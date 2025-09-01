import './JobDetail.css'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import careersImg from '../assets/p1.jpg'
import nurseImg from '../assets/p2.jpg'

function JobDetail() {
    const { jobId } = useParams();

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    const handleApplyClick = (position) => {
        const subject = encodeURIComponent(`Application for ${position}`);
        const body = encodeURIComponent(`Dear Journey of Care Team,

I am interested in applying for the ${position} position. Please find my resume attached and let me know if you need any additional information.

Best regards,
[Your Name]`);
        
        window.location.href = `mailto:Info@journey-of-care.com?subject=${subject}&body=${body}`;
    };

    const jobListings = {
        'certified-home-health-aide': {
            id: 1,
            title: "Certified Home Health Aide",
            type: "Full-time / Part-time",
            location: "Conroe, TX & Surrounding Areas",
            salary: "$15-18/hour",
            posted: "Now Hiring",
            image: careersImg,
            description: "Join our compassionate team and make a meaningful difference in the lives of our clients. We're seeking dedicated, certified home health aides who are passionate about providing exceptional care to seniors and individuals with disabilities in the comfort of their own homes.",
            responsibilities: [
                "Assist clients with activities of daily living (bathing, dressing, grooming)",
                "Provide companionship and emotional support",
                "Help with light housekeeping and meal preparation",
                "Monitor and report changes in client condition",
                "Assist with mobility and exercise as directed",
                "Maintain accurate documentation of care provided",
                "Follow individualized care plans",
                "Communicate effectively with clients, families, and care team"
            ],
            requirements: [
                "Valid Home Health Aide certification in Texas",
                "High school diploma or equivalent",
                "Minimum 1 year of home care experience preferred",
                "Excellent communication and interpersonal skills",
                "Compassionate, patient, and reliable personality",
                "Ability to lift up to 50 pounds",
                "Valid driver's license and reliable transportation",
                "Clean background check and drug screening",
                "CPR certification preferred"
            ],
            benefits: [
                "Competitive hourly wages ($15-18/hour)",
                "Flexible scheduling options",
                "Health insurance options",
                "Paid time off and holidays",
                "Ongoing training and professional development",
                "Supportive work environment",
                "Opportunity to make a real difference",
                "Travel reimbursement for client visits"
            ]
        },
        'licensed-vocational-nurse': {
            id: 2,
            title: "Licensed Vocational Nurse (LVN)",
            type: "Full-time / Part-time",
            location: "Conroe, TX & Surrounding Areas",
            salary: "$22-28/hour",
            posted: "Now Hiring",
            image: nurseImg,
            description: "We are seeking a compassionate and skilled Licensed Vocational Nurse to provide professional nursing care in clients' homes. This position offers the opportunity to build meaningful relationships with clients and their families while delivering high-quality healthcare services.",
            responsibilities: [
                "Administer medications and treatments as prescribed",
                "Monitor vital signs and assess client condition",
                "Coordinate care with physicians and healthcare team",
                "Provide wound care and medical procedures",
                "Educate clients and families on health management",
                "Document nursing assessments and care plans",
                "Supervise and train home health aides when applicable",
                "Ensure compliance with all regulatory requirements"
            ],
            requirements: [
                "Current LVN license in Texas",
                "Minimum 2 years of nursing experience",
                "Home health or community health experience preferred",
                "Strong clinical assessment skills",
                "Excellent communication and documentation skills",
                "Ability to work independently and make clinical decisions",
                "Valid driver's license and reliable transportation",
                "Current CPR certification",
                "Clean background check and drug screening"
            ],
            benefits: [
                "Competitive hourly wages ($22-28/hour)",
                "Flexible scheduling with weekday and weekend options",
                "Comprehensive health and dental insurance",
                "Paid time off and sick leave",
                "Continuing education reimbursement",
                "Professional development opportunities",
                "Mileage reimbursement",
                "Supportive clinical supervision"
            ]
        }
    };

    const job = jobListings[jobId];

    if (!job) {
        return (
            <div className="job-detail-page">
                <Header />
                <div className="job-not-found">
                    <div className="job-not-found-container">
                        <h1>Job Not Found</h1>
                        <p>The job you're looking for doesn't exist or has been removed.</p>
                        <Link to="/careers" className="back-to-careers-btn">
                            ← Back to Careers
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="job-detail-page">
            <Header />
            
            {/* Job Detail Hero */}
            <section className="job-detail-hero">
                <div className="job-detail-hero-container">
                    <div className="job-detail-breadcrumb">
                        <Link to="/careers" className="breadcrumb-link">← Back to Careers</Link>
                    </div>
                    
                    <div className="job-detail-hero-content">
                        <div className="job-detail-image" data-aos="fade-right">
                            <img src={job.image} alt={job.title} />
                            <div className="job-detail-overlay">
                                <span className="job-status">{job.posted}</span>
                            </div>
                        </div>
                        
                        <div className="job-detail-info" data-aos="fade-left" data-aos-delay="200">
                            <div className="job-detail-meta">
                                <span className="job-type">{job.type}</span>
                                <span className="job-salary">{job.salary}</span>
                            </div>
                            <h1 className="job-detail-title">{job.title}</h1>
                            <div className="job-detail-location">
                                <span className="location-icon">📍</span>
                                <span>{job.location}</span>
                            </div>
                            <p className="job-detail-description">{job.description}</p>
                            
                            <div className="job-detail-actions">
                                <button 
                                    className="apply-btn-large"
                                    onClick={() => handleApplyClick(job.title)}
                                >
                                    Apply for This Position
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Job Details Content */}
            <section className="job-details-content-section">
                <div className="job-details-content-container">
                    <div className="job-details-grid">
                        <div className="job-section" data-aos="fade-up">
                            <h2 className="job-section-title">Key Responsibilities</h2>
                            <ul className="job-list">
                                {job.responsibilities.map((responsibility, index) => (
                                    <li key={index} className="job-list-item">
                                        <span className="list-icon">✓</span>
                                        {responsibility}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="job-section" data-aos="fade-up" data-aos-delay="200">
                            <h2 className="job-section-title">Requirements</h2>
                            <ul className="job-list">
                                {job.requirements.map((requirement, index) => (
                                    <li key={index} className="job-list-item">
                                        <span className="list-icon">•</span>
                                        {requirement}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="job-section benefits-section" data-aos="fade-up" data-aos-delay="400">
                            <h2 className="job-section-title">Benefits & Perks</h2>
                            <ul className="job-list benefits-list">
                                {job.benefits.map((benefit, index) => (
                                    <li key={index} className="job-list-item">
                                        <span className="list-icon">★</span>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Apply Section */}
            <section className="job-apply-section">
                <div className="job-apply-container">
                    <div className="job-apply-content" data-aos="fade-up">
                        <h2 className="apply-section-title">Ready to Join Our Team?</h2>
                        <p className="apply-section-description">
                            Take the next step in your healthcare career. Apply for the {job.title} position today 
                            and become part of our compassionate care team.
                        </p>
                        <button 
                            className="apply-btn-large"
                            onClick={() => handleApplyClick(job.title)}
                        >
                            Apply for {job.title}
                        </button>
                        <p className="apply-note">
                            Questions about this position? Contact us at{' '}
                            <a href="mailto:Info@journey-of-care.com" className="email-link">
                                Info@journey-of-care.com
                            </a>{' '}
                            or call{' '}
                            <a href="tel:8324460705" className="phone-link">
                                (832) 446-0705
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default JobDetail
