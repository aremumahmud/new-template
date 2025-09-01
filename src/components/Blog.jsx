import './Blog.css'

import profileImg1 from '../assets/p1.jpg'
import profileImg2 from '../assets/p2.jpg'
import profileImg3 from '../assets/p3.jpg'
import profileImg4 from '../assets/test1.jpg'
import profileImg5 from '../assets/test2.jpg'
import profileImg6 from '../assets/test3.jpg'
import profileImg7 from '../assets/pic.jpg'

function Blog() {
    const articles = [
        {
            id: 1,
            title: "Essential Tips for Caring for Seniors at Home",
            category: "Senior Care",
            date: "1/15/2024",
            readTime: "5 min read",
            excerpt: "Learn practical strategies to create a safe and comfortable environment for elderly family members receiving home care.",
            image: profileImg1
        },
        {
            id: 2,
            title: "Understanding Alzheimer's: A Family Guide",
            category: "Health",
            date: "1/12/2024",
            readTime: "8 min read",
            excerpt: "Comprehensive information about Alzheimer's disease and how families can provide the best support for their loved ones.",
            image: profileImg2
        },
        {
            id: 3,
            title: "The Benefits of Companion Care for Elderly Adults",
            category: "Companion Care",
            date: "1/10/2024",
            readTime: "6 min read",
            excerpt: "Discover how companion care services can improve quality of life and provide emotional support for seniors.",
            image: profileImg3
        },
        {
            id: 4,
            title: "Respite Care: Supporting Family Caregivers",
            category: "Respite Care",
            date: "1/8/2024",
            readTime: "4 min read",
            excerpt: "Learn how respite care services can help prevent caregiver burnout and maintain family well-being.",
            image: profileImg4
        },
        {
            id: 5,
            title: "Creating a Safe Home Environment for Seniors",
            category: "Safety",
            date: "1/5/2024",
            readTime: "7 min read",
            excerpt: "Essential home modifications and safety tips to prevent falls and accidents for elderly residents.",
            image: profileImg5
        },
        {
            id: 6,
            title: "Nutrition and Meal Planning for Seniors",
            category: "Nutrition",
            date: "1/3/2024",
            readTime: "5 min read",
            excerpt: "Important dietary considerations and meal planning strategies to maintain health and nutrition in older adults.",
            image: profileImg6
        }
    ];

    return (
        <section className="blog-section">
            <div className="blog-container">
                <div className="blog-header" data-aos="fade-up">
                    <div className="blog-badge">Latest Articles</div>
                    <h2 className="blog-title">Care Tips & Insights</h2>
                    <p className="blog-subtitle">
                        Stay informed with our latest articles on home care, health tips, and family support strategies.
                    </p>
                </div>

                <div className="blog-grid">
                    {articles.map((article, index) => (
                        <article 
                            key={article.id} 
                            className="blog-card" 
                            data-aos="fade-up" 
                            data-aos-delay={`${(index + 1) * 100}`}
                        >
                            <div className="blog-image">
                                <img src={article.image} alt={article.title} />
                                <div className="blog-category">{article.category}</div>
                            </div>
                            
                            <div className="blog-content">
                                <div className="blog-meta">
                                    <span className="blog-date">{article.date}</span>
                                    <span className="blog-read-time">{article.readTime}</span>
                                </div>
                                
                                <h3 className="blog-article-title">{article.title}</h3>
                                
                                <p className="blog-excerpt">{article.excerpt}</p>
                                
                                <button className="blog-read-more">
                                    Read more
                                    <span className="arrow">→</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="blog-footer" data-aos="fade-up" data-aos-delay="700">
                    <button className="view-all-btn">
                        View All Articles
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Blog
