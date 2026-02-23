import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '../components/SEO';
import ThreeDCard from '../components/ThreeDCard';
import { useToast } from '../components/ToastProvider';
import './Reviews.css';

gsap.registerPlugin(ScrollTrigger);

function Reviews() {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const INITIAL_REVIEWS = [
        { _id: '1', name: 'Alok Sharma', rating: 5, comment: 'Hands down the best Mango Shake in the entire city! The consistency is incredible.', createdAt: new Date() },
        { _id: '2', name: 'Kritika Singh', rating: 5, comment: 'Absolutely loved the fresh orange juice. It was perfectly sweet without any added sugar.', createdAt: new Date(Date.now() - 86400000) },
        { _id: '3', name: 'Vikas Kumar', rating: 4, comment: 'Great quality and clean environment. I always stop by for a strawberry shake after work.', createdAt: new Date(Date.now() - 172800000) },
        { _id: '4', name: 'Neha Gupta', rating: 5, comment: 'The mix fruit juice is loaded with flavors. You can actually taste the individual fresh fruits. Highly recommended.', createdAt: new Date(Date.now() - 345600000) },
        { _id: '5', name: 'Rohan Mehra', rating: 5, comment: 'Perfect spot for summer refreshments. The pricing is very reasonable for the huge quantity they serve.', createdAt: new Date(Date.now() - 604800000) }
    ];

    const [reviewsList, setReviewsList] = useState(INITIAL_REVIEWS);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch reviews from API
        const fetchReviews = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/reviews');
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        setReviewsList(data);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch reviews", err);
            }
        };
        fetchReviews();

        let ctx = gsap.context(() => {
            // 3D Parallax floating for review cards
            gsap.to('.review-card', {
                scrollTrigger: {
                    trigger: '.reviews-grid',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2
                },
                y: (i) => (i % 2 === 0 ? -60 : 60),
                rotation: (i) => (i % 2 === 0 ? -3 : 3)
            });

            // Floating animation for form
            gsap.to('.review-form-wrap', {
                y: -15,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            // Reviews Scroll Animations
            gsap.from('.review-card', {
                scrollTrigger: {
                    trigger: '.reviews',
                    start: 'top 75%'
                },
                scale: 0.8,
                opacity: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: 'power2.out'
            });

            gsap.from('.review-form-wrap', {
                scrollTrigger: {
                    trigger: '.review-form-wrap',
                    start: 'top 85%'
                },
                scale: 0.9,
                opacity: 0,
                duration: 0.6,
                ease: 'back.out(1.2)'
            });
        });

        return () => ctx.revert();
    }, []);

    const { showToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            showToast('Please select a rating star.', { type: 'error' });
            return;
        }
        setLoading(true);
        // Optimistic UI: add temporary review to the top immediately
        const tempId = `temp-${Date.now()}`;
        const optimisticReview = {
            _id: tempId,
            name: name || 'Anonymous',
            rating,
            comment,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        setReviewsList(prev => [optimisticReview, ...prev].slice(0, 5));

        try {
            const res = await fetch('http://localhost:5000/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, rating, comment }),
            });

            if (res.ok) {
                const serverReview = await res.json();
                // Replace optimistic review with server-provided review
                setReviewsList(prev => prev.map(r => r._id === tempId ? serverReview : r));
                // clear form
                setName('');
                setComment('');
                setRating(0);
                setHoverRating(0);
                showToast('Thank you for your review!', { type: 'success' });
            } else {
                // remove optimistic review
                setReviewsList(prev => prev.filter(r => r._id !== tempId));
                showToast('Something went wrong submitting your review', { type: 'error' });
            }
        } catch (err) {
            console.error(err);
            // remove optimistic review on network failure
            setReviewsList(prev => prev.filter(r => r._id !== tempId));
            showToast('Failed to submit review — please try again', { type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleStarClick = (e, val) => {
        setRating(val);
        gsap.to(e.target, { scale: 1.3, duration: 0.1, yoyo: true, repeat: 1 });
    };

    return (
        <>
            <SEO
                title="Reviews"
                description="Read what our happy customers say about Krishna Juice Shop. Real reviews from real people who love our fresh juices and shakes in Jagatpura."
                keywords="Customer Reviews, Krishna Juice Shop Ratings, Best Juice Shop Reviews, Jagatpura Food Reviews"
            />
            <section id="reviews" className="reviews section-padding">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Happy Sippers</h2>
                        <p className="section-subtitle">See what our community has to say about us.</p>
                    </div>

                    <div className="overall-rating text-center mb-4" style={{ marginBottom: "40px" }}>
                        <h3>Overall Rating: <span>4.8/5</span></h3>
                        <div className="menu-rating" style={{ justifyContent: "center", display: "flex", fontSize: "1.5rem" }}>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star-half-stroke"></i>
                        </div>
                    </div>

                    <div className="reviews-grid view-3d">
                        {reviewsList.slice(0, 5).map((rev, index) => (
                            <ThreeDCard key={rev._id || index} className="review-card glass tilt-card">
                                <div className="review-header depth-layer-1">
                                    <i className="fa-solid fa-user-circle user-icon"></i>
                                    <div className="user-info">
                                        <h4>{rev.name}</h4>
                                        <span className="date">{new Date(rev.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="menu-rating depth-layer-2">
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className={i < rev.rating ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
                                    ))}
                                </div>
                                <p className="review-text depth-layer-1">"{rev.comment}"</p>
                            </ThreeDCard>
                        ))}
                    </div>

                    {/* Review Form */}
                    <ThreeDCard className="review-form-wrap glass tilt-card view-3d">
                        <h3 className="text-center depth-layer-2" style={{ marginBottom: "20px" }}>Leave a Review</h3>
                        <form id="review-form" onSubmit={handleSubmit}>
                            <div className="rating-select">
                                <span>Your Rating: </span>
                                <div className="stars">
                                    {[1, 2, 3, 4, 5].map((val) => (
                                        <i
                                            key={val}
                                                className={val <= (hoverRating || rating) ? 'fa-solid fa-star' : 'fa-regular fa-star'}
                                                    onMouseEnter={() => setHoverRating(val)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            onClick={(e) => handleStarClick(e, val)}
                                        ></i>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    placeholder="Your Comment"
                                    rows="3"
                                    required
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
                                {loading ? (
                                    <>
                                        <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: 8 }}></i>
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Review'
                                )}
                            </button>
                        </form>
                    </ThreeDCard>
                </div>
            </section>
        </>
    );
}

export default Reviews;
