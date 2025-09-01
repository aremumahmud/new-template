import './Testimonials.css'
import { useState, useEffect } from 'react'
import profileImg1 from '../assets/p1.jpg'
import profileImg2 from '../assets/p2.jpg'
import profileImg3 from '../assets/p3.jpg'
import profileImg4 from '../assets/test1.jpg'
import profileImg5 from '../assets/test2.jpg'
import profileImg6 from '../assets/test3.jpg'
import profileImg7 from '../assets/pic.jpg'

function Testimonials() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const testimonials = [
        {
            id: 1,
            feedback: "My teenage son has special needs, and finding the right support has always been challenging. Journey of Care gets it. Their caregiver is patient, understanding, and really connects with him. It's been life-changing for our family.",
            name: "Michael L.",
            location: "North Houston, TX",
            image: profileImg1
        },
        {
            id: 2,
            feedback: "When my husband was diagnosed with early-stage dementia, I felt overwhelmed. Journey of Care helped us create a routine that works for both of us. Their caregiver is like having a friend who truly cares.",
            name: "Jennifer S.",
            location: "Magnolia, TX",
            image: profileImg2
        },
        {
            id: 3,
            feedback: "At 89, I thought I'd have to move to a facility, but Journey of Care made it possible for me to stay home. My caregiver doesn't just help with daily tasks—she's become a dear friend. We laugh together every day.",
            name: "Robert T.",
            location: "Tomball, TX",
            image: profileImg3
        },
        {
            id: 4,
            feedback: "After my stroke, I was worried about being a burden to my family. Journey of Care gave me back my independence while ensuring I had the support I needed. Their caregivers are angels in disguise.",
            name: "Maria C.",
            location: "Sugar Land, TX",
            image: profileImg4
        },
        {
            id: 5,
            feedback: "My mother lived with us for years, but as her Alzheimer's progressed, we needed professional help. Journey of Care's specialized memory care has been incredible. Mom is calm and content now.",
            name: "David K.",
            location: "Katy, TX",
            image: profileImg5
        },
        {
            id: 6,
            feedback: "I was hesitant about in-home care, but Journey of Care changed my perspective completely. Their caregiver feels like family now. I look forward to her visits every day.",
            name: "Eleanor M.",
            location: "Cypress, TX",
            image: profileImg6
        },
        
    ];

    const itemsPerSlide = 3;
    const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;
        
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % totalSlides);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, totalSlides]);

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % totalSlides);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
        setIsAutoPlaying(false);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
    };

    const getCurrentTestimonials = () => {
        const start = currentSlide * itemsPerSlide;
        const end = start + itemsPerSlide;
        return testimonials.slice(start, end);
    };

    return (
        <section className="testimonials-section">
            <div className="testimonials-container">
                <div className="testimonials-header" data-aos="fade-up">
                    <div className="testimonials-badge">Testimonials</div>
                    <h2 className="testimonials-title">What Our Clients Say</h2>
                    <p className="testimonials-subtitle">
                        Read stories from families who have experienced the Journey of Care difference.
                    </p>
                </div>

                <div className="carousel-container" data-aos="fade-up" data-aos-delay="200">
                    <div className="carousel-wrapper">
                        <button className="carousel-nav prev" onClick={prevSlide} aria-label="Previous testimonials">
                            ←
                        </button>
                        
                        <div className="testimonials-carousel">
                            <div 
                                className="testimonials-track"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                                    <div key={slideIndex} className="testimonials-slide">
                                        {testimonials.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((testimonial, index) => (
                                            <div key={testimonial.id} className="testimonial-card">
                                                <div className="testimonial-header">
                                                    <span className="testimonial-label">Client Feedback</span>
                                                    <div className="quote-icon">"</div>
                                                </div>
                                                
                                                <div className="testimonial-content">
                                                    <p className="testimonial-text">
                                                        {testimonial.feedback}
                                                    </p>
                                                </div>
                                                
                                                <div className="testimonial-footer">
                                                    <div className="client-profile">
                                                        <img 
                                                            src={testimonial.image} 
                                                            alt={testimonial.name}
                                                            className="client-avatar"
                                                        />
                                                        <div className="client-info">
                                                            <h4 className="client-name">{testimonial.name}</h4>
                                                            <p className="client-location">{testimonial.location}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <button className="carousel-nav next" onClick={nextSlide} aria-label="Next testimonials">
                            →
                        </button>
                    </div>
                    
                    <div className="carousel-indicators">
                        {Array.from({ length: totalSlides }).map((_, index) => (
                            <button
                                key={index}
                                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials
