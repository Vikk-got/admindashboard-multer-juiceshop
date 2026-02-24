import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '../components/SEO';
import ThreeDCard from '../components/ThreeDCard';
import './Menu.css';

gsap.registerPlugin(ScrollTrigger);

function Menu() {
    const [filter, setFilter] = useState('all');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            const data = await response.json();
            // Map the API response to match the expected format
            const mappedProducts = data.map((product, index) => ({
                id: product._id || index + 1,
                name: product.name,
                desc: product.description,
                price: '₹' + (Math.floor(Math.random() * 40) + 20), // Placeholder price since API doesn't return price
                rating: parseFloat((Math.random() * 3 + 2).toFixed(1)), // Placeholder rating
                category: product.category,
                img: `http://localhost:5000/${product.image}`
            }));
            setProducts(mappedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Menu Scroll Animation
            gsap.from('.menu-card', {
                scrollTrigger: {
                    trigger: '.menu',
                    start: 'top 70%'
                },
                y: 50,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out'
            });
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        // Animate filter changes
        gsap.fromTo('.menu-card',
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05 }
        );
    }, [filter]);

    const filteredMenu = filter === 'all' ? products : products.filter(item => item.category === filter);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars.push(<i key={i} className="fa-solid fa-star"></i>);
            } else if (i - rating > 0 && i - rating < 1) {
                stars.push(<i key={i} className="fa-solid fa-star-half-stroke"></i>);
            } else {
                stars.push(<i key={i} className="fa-regular fa-star"></i>);
            }
        }
        return stars;
    };

    if (loading) {
        return (
            <div className="menu-loading">
                <div className="spinner"></div>
                <p>Loading menu items...</p>
            </div>
        );
    }

    return (
        <>
            <SEO
                title="Our Menu"
                description="Explore our wide variety of fresh fruit juices, delicious milkshakes, and special items like KitKat and Anjeer shakes. From Mango to Mosambi, we have it all!"
                keywords="Juice Menu, Milkshake List, Fresh Juice Prices, Krishna Juice Shop Menu, Jagatpura Shakes"
            />
            <section id="menu" className="menu section-padding">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Our Menu</h2>
                        <p className="section-subtitle">Discover our refreshing range of drinks made with love.</p>
                    </div>

                    <div className="menu-categories">
                        <button className={`menu-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
                        <button className={`menu-btn ${filter === 'shakes' ? 'active' : ''}`} onClick={() => setFilter('shakes')}>🥭 Shakes</button>
                        <button className={`menu-btn ${filter === 'juices' ? 'active' : ''}`} onClick={() => setFilter('juices')}>🍊 Fresh Juices</button>
                        <button className={`menu-btn ${filter === 'special' ? 'active' : ''}`} onClick={() => setFilter('special')}>🥤 Special Items</button>
                    </div>

                    {filteredMenu.length > 0 ? (
                        <div className="menu-grid view-3d">
                            {filteredMenu.map(item => (
                                <ThreeDCard key={item.id} className="menu-card glass tilt-card" data-category={item.category}>
                                    <div className="menu-img-wrap">
                                        <img src={item.img} alt={item.name} crossOrigin="anonymous" />
                                        <span className="price depth-layer-2">{item.price}</span>
                                    </div>
                                    <div className="menu-info view-3d">
                                        <h3 className="depth-layer-1">{item.name}</h3>
                                        <p className="depth-layer-1">{item.desc}</p>
                                        <div className="menu-rating depth-layer-1">
                                            {renderStars(item.rating)}
                                            <span>({item.rating.toFixed(1)})</span>
                                        </div>
                                    </div>
                                </ThreeDCard>
                            ))}
                        </div>
                    ) : (
                        <div className="no-products">
                            <p>No products found in this category.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default Menu;