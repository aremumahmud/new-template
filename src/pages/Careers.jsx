import './Careers.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import careersImg from '../assets/p1.jpg'
import nurseImg from '../assets/p2.jpg'

function Careers() {
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

    const jobListings = [
        {
            id: 1,
            slug: "certified-home-health-aide",
            title: "Certified Home Health Aide",
            type: "Full-time / Part-time",
            location: "Conroe, TX & Surrounding Areas",
            salary: "$15-18/hour",
            posted: "Now Hiring",
            image: careersImg,
            description: "Join our compassionate team and make a meaningful difference in the lives of our clients. We're seeking dedicated, certified home health aides who are passionate about providing exceptional care to seniors and individuals with disabilities in the comfort of their own homes."
        },
        {
            id: 2,
            slug: "licensed-vocational-nurse",
            title: "Licensed Vocational Nurse (LVN)",
            type: "Full-time / Part-time",
            location: "Conroe, TX & Surrounding Areas",
            salary: "$22-28/hour",
            posted: "Now Hiring",
            image: nurseImg,
            description: "We are seeking a compassionate and skilled Licensed Vocational Nurse to provide professional nursing care in clients' homes. This position offers the opportunity to build meaningful relationships with clients and their families while delivering high-quality healthcare services."
        }
    ];



    return (
        <div className="careers-page">
            <Header />
            
            {/* Hero Section */}
            <section className="careers-hero">
                <div className="careers-hero-container">
                    <div className="careers-hero-content">
                        <div className="careers-hero-text" data-aos="fade-up">
                            <div className="careers-badge">Careers</div>
                            <h1 className="careers-hero-title">
                                Join Our<br />
                                <span className="highlight">Caring Team</span>
                            </h1>
                            <p className="careers-hero-description">
                                Make a meaningful difference in people's lives while building a rewarding career 
                                in home healthcare. We're looking for compassionate, dedicated professionals 
                                to join our growing team.
                            </p>
                            <div className="careers-stats" data-aos="fade-up" data-aos-delay="200">
                                <div className="stat">
                                    <span className="stat-number">$15-18</span>
                                    <span className="stat-label">Hourly Rate</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">Flexible</span>
                                    <span className="stat-label">Scheduling</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">Full Benefits</span>
                                    <span className="stat-label">Package Available</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Job Listings Section */}
            <section className="job-listings-section">
                <div className="job-listings-container">
                    <div className="job-listings-header" >
                        <h2 className="listings-title">Current Openings</h2>
                        <p className="listings-subtitle">
                            Explore our available positions and join our team of dedicated healthcare professionals.
                        </p>
                    </div>

                    <div className="job-cards-grid">
                        {jobListings.map((job, index) => (
                            <div key={job.id} className="job-card" data-aos="fade-up" data-aos-delay={index * 200}>
                                <div className="job-card-image">
                                    <img src={job.image} alt={job.title} />
                                    <div className="job-card-overlay">
                                        <span className="job-status">{job.posted}</span>
                                    </div>
                                </div>
                                
                                <div className="job-card-content">
                                    <div className="job-card-header">
                                        <h3 className="job-card-title">{job.title}</h3>
                                        <div className="job-card-meta">
                                            <span className="job-type">{job.type}</span>
                                            <span className="job-salary">{job.salary}</span>
                                        </div>
                                        <div className="job-card-location">
                                            <span className="location-icon">📍</span>
                                            <span>{job.location}</span>
                                        </div>
                                    </div>

                                    <p className="job-card-description">{job.description}</p>

                                    <div className="job-card-actions">
                                        <Link 
                                            to={`/careers/${job.slug}`}
                                            className="view-details-btn"
                                        >
                                            View Details
                                            <span className="">→</span>
                                        </Link>
                                        <button 
                                            className="apply-btn"
                                            onClick={() => handleApplyClick(job.title)}
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Careers
