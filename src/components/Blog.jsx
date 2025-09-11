import './Blog.css'

import profileImg1 from '../assets/p1.jpg'
import profileImg2 from '../assets/p2.jpg'
import profileImg3 from '../assets/p3.jpg'
import profileImg4 from '../assets/test1.jpg'
import profileImg5 from '../assets/test2.jpg'
import profileImg6 from '../assets/test3.jpg'
import profileImg7 from '../assets/pic.jpg'
import homeCopy from '../../copy/home.json'

function Blog() {
    const articles = homeCopy.blog.articles.map((article, index) => ({
        id: index + 1,
        title: article.title,
        category: article.category,
        date: article.date,
        readTime: article.readTime,
        excerpt: article.excerpt,
        image: [profileImg1, profileImg2, profileImg3, profileImg4, profileImg5, profileImg6][index]
    }));

    return (
        <section className="blog-section">
            <div className="blog-container">
                <div className="blog-header" data-aos="fade-up">
                    <div className="blog-badge">{homeCopy.blog.badge}</div>
                    <h2 className="blog-title">{homeCopy.blog.title}</h2>
                    <p className="blog-subtitle">
                        {homeCopy.blog.subtitle}
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
                                    {homeCopy.blog.readMoreButton}
                                    <span className="arrow">→</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="blog-footer" data-aos="fade-up" data-aos-delay="700">
                    <button className="view-all-btn">
                        {homeCopy.blog.viewAllButton}
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Blog
