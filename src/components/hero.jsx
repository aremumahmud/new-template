import { useState, useEffect } from 'react'
import GooeyBtn from './gooeybtn'
import './hero.css'
import pic from '../assets/pic.jpg'
import p1 from '../assets/p1.jpg'
import p2 from '../assets/p2.jpg'
import p3 from '../assets/p3.jpg'
import test1 from '../assets/test1.jpg'
import test2 from '../assets/test2.jpg'
import test3 from '../assets/test3.jpg'
import decor from '../assets/download.svg'
import { BsArrowUpRight, BsArrowUpLeft } from 'react-icons/bs'
import GradientBlinds from '../../backgrounds/GradientBlinds/GradientBlinds'

function Hero() {
    // Array of all 7 images
    const images = [pic,test1, test2, test3];
    
    // Array of text content for each image
    const textContent = [
        {
            heading: "Professional Care Services",
            para: "Discover our comprehensive care solutions.",
            popularHeading: "Most Popular Services",
            popularPara: "All our caregivers are certified professionals with compassionate hearts."
        },
        // {
        //     heading: "24/7 Medical Support",
        //     para: "Round-the-clock medical assistance and monitoring.",
        //     popularHeading: "Emergency Response",
        //     popularPara: "Immediate medical response available at any time of day."
        // },
        // {
        //     heading: "Senior Companion Care",
        //     para: "Dedicated companionship for elderly loved ones.",
        //     popularHeading: "Social Engagement",
        //     popularPara: "Keeping seniors active and socially connected in their community."
        // },
        // {
        //     heading: "Home Health Services",
        //     para: "Professional healthcare delivered at home.",
        //     popularHeading: "Personalized Care",
        //     popularPara: "Tailored health services designed for individual needs."
        // },
        {
            heading: "Memory Care Support",
            para: "Specialized care for those with memory challenges.",
            popularHeading: "Cognitive Wellness",
            popularPara: "Supporting mental health and cognitive function daily."
        },
        {
            heading: "Post-Surgery Recovery",
            para: "Expert care during your recovery journey.",
            popularHeading: "Recovery Programs",
            popularPara: "Structured rehabilitation programs for faster healing."
        },
        {
            heading: "Family Caregiver Support",
            para: "Resources and respite for family caregivers.",
            popularHeading: "Respite Services",
            popularPara: "Giving family caregivers the breaks they need and deserve."
        }
    ];
    
    // State to track current image index
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    // Effect to cycle through images every 6 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => 
                    (prevIndex + 1) % images.length
                );
                setIsTransitioning(false);
            }, 600); // Half of transition duration
        }, 6000); // 6 seconds
        
        return () => clearInterval(interval); // Cleanup on unmount
    }, [images.length]);

    return (
        <div className="hero-container">
            <div className="hero-content">
                <div className="left-content" data-aos="fade-right" data-aos-delay="100">

                    <div className="badge" data-aos="zoom-in" data-aos-delay="200">Free Care Assessment</div>
                    <div className="hero-heading" data-aos="fade-up" data-aos-delay="300">
                        <h1>Compassionate Care for Your Loved Ones</h1>
                        <p>At CareConnect, we provide professional, reliable caregivers who deliver personalized care services in the comfort of home. Our certified caregivers are dedicated to enhancing quality of life with dignity and respect. <br />
                        </p>
                    </div>
                    <div className="team" data-aos="fade-up" data-aos-delay="400">
                        <div className="avatar-stack">
                            <div className="avatar-image one"></div>
                            <div className="avatar-image two"></div>
                            <div className="avatar-image three"></div>

                        </div>
                        <p>1.5k Families Served</p>
                    </div>

                    <div className="cta-buttons" data-aos="fade-up" data-aos-delay="500">
                        <GooeyBtn extendby={220} direction="left" text="Schedule Your Free Consultation" />

                    </div>

                </div>
                <div className="right-content" data-aos="fade-left" data-aos-delay="200">
                    <img 
                        src={images[currentImageIndex]} 
                        alt="" 
                        className={`hero-image ${isTransitioning ? 'transitioning-out' : 'transitioning-in'}`}
                        style={{
                            transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            opacity: isTransitioning ? 0 : 1,
                            transform: isTransitioning 
                                ? 'scale(1.1) translateY(-10px) rotateX(5deg)' 
                                : 'scale(1) translateY(0) rotateX(0deg)',
                            filter: isTransitioning ? 'blur(2px)' : 'blur(0px)'
                        }}
                    />

                    <div className="whole_page">
                        <div className="top">
                            <div className="group">
                                <div data-aos="fade-up" data-aos-delay="600" className="blur_badge">SENIOR CARE</div>
                                <div data-aos="fade-up" data-aos-delay="700" className="blur_badge">HOME ASSISTANCE</div>
                            </div>
                            <div data-aos="fade-up" data-aos-delay="800" className="blur_badge">MEDICAL SUPPORT</div>

                        </div>
                        <div className="bottom">

                            <div data-aos="fade-up" data-aos-delay="900" className="blur_arrow">
                                <BsArrowUpRight color='white' />
                            </div>
                            <div data-aos="fade-up" data-aos-delay="1000" className="info">
                                <p 
                                    className="heading"
                                    style={{
                                        transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                        opacity: isTransitioning ? 0 : 1,
                                        transform: isTransitioning 
                                            ? 'translateX(-30px) translateY(-10px)' 
                                            : 'translateX(0) translateY(0)',
                                        filter: isTransitioning ? 'blur(1px)' : 'blur(0px)'
                                    }}
                                >
                                    {textContent[currentImageIndex].heading}
                                </p>
                                <p 
                                    className="para"
                                    style={{
                                        transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                        transitionDelay: '0.1s',
                                        opacity: isTransitioning ? 0 : 1,
                                        transform: isTransitioning 
                                            ? 'translateX(-20px) translateY(-5px)' 
                                            : 'translateX(0) translateY(0)',
                                        filter: isTransitioning ? 'blur(1px)' : 'blur(0px)'
                                    }}
                                >
                                    {textContent[currentImageIndex].para}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* <div className="arrow-icon1">
            <BsArrowUpLeft color='white' />
            </div>   */}
                    <div className="decoration_wrapper" >
                        <img className="decor_top" src={decor} alt="" />
                        <img className="decor_bottom" src={decor} alt="" />

                        <div className="decor_content">
                            <div className="decor_content_inner">
                                <div className="arrow-icon">
                                    <BsArrowUpRight color='white' />
                                    <img className="decor_bottom1" src={decor} alt="" />
                                </div>

                                <div className="vertical"></div>
                                <div className="horizontal"></div>
                                <div className="whole">
                                    <p 
                                        data-aos="fade-up" 
                                        data-aos-delay="600" 
                                        className='heading'
                                        style={{
                                            transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                            opacity: isTransitioning ? 0 : 1,
                                            transform: isTransitioning 
                                                ? 'translateY(-20px) scale(0.95)' 
                                                : 'translateY(0) scale(1)',
                                            filter: isTransitioning ? 'blur(1px)' : 'blur(0px)'
                                        }}
                                    >
                                        {textContent[currentImageIndex].popularHeading}
                                    </p>
                                    <p 
                                        data-aos="fade-up" 
                                        data-aos-delay="700" 
                                        className='para'
                                        style={{
                                            transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                            transitionDelay: '0.15s',
                                            opacity: isTransitioning ? 0 : 1,
                                            transform: isTransitioning 
                                                ? 'translateY(-15px) scale(0.95)' 
                                                : 'translateY(0) scale(1)',
                                            filter: isTransitioning ? 'blur(1px)' : 'blur(0px)'
                                        }}
                                    >
                                        {textContent[currentImageIndex].popularPara}
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero