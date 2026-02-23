import { useEffect, useState } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import './Layout.css'; // Will contain global layout styles (Navbar, Cursor, etc.)

function Layout() {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        // Theme logic and preloader logic could go here or in Context
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
        }

        // Scroll to top on route change
        window.scrollTo(0, 0);
        setIsMobileMenuOpen(false); // Close menu when route changes
    }, [location.pathname]);

    const toggleTheme = () => {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <Link to="/" className="logo">
                        <i className="fa-solid fa-lemon"></i> Krishna Juice
                    </Link>

                    <a
                        href="https://www.google.com/maps/search/?api=1&query=A-102+Anand+bihar+colony,+near+jagatpura+fatak,+302017,+jaipur,+rajasthan"
                        target="_blank"
                        rel="noreferrer"
                        className="nav-map-link"
                        title="Get Directions"
                    >
                        <i className="fa-solid fa-location-dot"></i>
                    </a>

                    <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
                    </div>

                    <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                        <li><NavLink to="/" end>Home</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/menu">Menu</NavLink></li>
                        <li><NavLink to="/reviews">Reviews</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/booking" className="btn btn-nav">Book Now</NavLink></li>
                    </ul>
                </div>
            </nav>

            <main>
                <Outlet />
            </main>

            {/* Global Footer */}
            <footer className="footer glass" style={{ marginTop: 'auto', borderRadius: '0', borderLeft: 'none', borderRight: 'none', borderBottom: 'none' }}>
                <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '40px 20px', gap: '20px' }}>
                    <div className="footer-brand" style={{ flex: '1 1 300px' }}>
                        <Link to="/" className="logo">Krishna <span>Juice</span></Link>
                        <p style={{ marginTop: '15px', color: 'var(--color-text-light)' }}>Freshness guaranteed since 2018. Serving the best juices and shakes in Jagatpura.</p>
                    </div>

                    <div className="footer-links" style={{ flex: '1 1 200px' }}>
                        <h4 style={{ marginBottom: '15px', color: 'var(--color-text)' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <li><Link to="/about" style={{ color: 'var(--color-text-light)' }}>About Us</Link></li>
                            <li><Link to="/menu" style={{ color: 'var(--color-text-light)' }}>Our Menu</Link></li>
                            <li><Link to="/booking" style={{ color: 'var(--color-text-light)' }}>Book an Event</Link></li>
                            <li><Link to="/contact" style={{ color: 'var(--color-text-light)' }}>Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-contact" style={{ flex: '1 1 300px' }}>
                        <h4 style={{ marginBottom: '15px', color: 'var(--color-text)' }}>Contact Info</h4>
                        <p style={{ color: 'var(--color-text-light)', marginBottom: '5px' }}><i className="fa-solid fa-location-dot" style={{ width: '20px', color: 'var(--color-primary)' }}></i> Jagatpura Fatak, Jaipur</p>
                        <p style={{ color: 'var(--color-text-light)', marginBottom: '5px' }}><i className="fa-solid fa-phone" style={{ width: '20px', color: 'var(--color-primary)' }}></i> +91 99394 29446</p>
                        <div className="social-links" style={{ marginTop: '15px' }}>
                            <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="social-icon" style={{ fontSize: '1.2rem', marginRight: '15px', color: 'var(--color-primary)' }}><i className="fa-brands fa-instagram"></i></a>
                            <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="social-icon" style={{ fontSize: '1.2rem', marginRight: '15px', color: 'var(--color-primary)' }}><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="https://wa.me/919939429446" target="_blank" rel="noreferrer" className="social-icon" style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}><i className="fa-brands fa-whatsapp"></i></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom" style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid var(--color-glass-border)', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                    <p>&copy; {new Date().getFullYear()} Krishna Juice Shop. All Rights Reserved.</p>
                </div>
            </footer>

            <button id="theme-toggle" aria-label="Toggle Dark Mode" onClick={toggleTheme}>
                <i className="fa-solid fa-moon"></i>
            </button>

            <a href="https://wa.me/919939429446" target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp">
                <i className="fa-brands fa-whatsapp"></i>
            </a>
        </>
    );
}

export default Layout;
