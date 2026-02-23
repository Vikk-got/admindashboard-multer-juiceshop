import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '../components/SEO';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

function Home() {
    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Hero Text
            tl.from('.hero-title', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            })
                .from('.hero-tagline', {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power3.out'
                }, '-=0.4')
                .from('.hero-ctas .btn', {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.2,
                    ease: 'power3.out'
                }, '-=0.3');

            // Floating Fruits
            tl.from('.fruit', {
                scale: 0,
                opacity: 0,
                duration: 1,
                stagger: 0.3,
                ease: 'back.out(1.7)'
            }, '-=0.5');

            // Continuous floating animation
            gsap.to('.orange-img', {
                y: '20px',
                rotation: 5,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            gsap.to('.mango-img', {
                y: '-15px',
                rotation: -5,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 0.5
            });

            // 3D Parallax on Scroll
            gsap.to('.orange-img', {
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                },
                y: 100,
                x: 50,
                rotation: 45
            });

            gsap.to('.mango-img', {
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5
                },
                y: -150,
                x: -30,
                rotation: -30
            });

            // Mouse Tilt Effect
            const mouseMove = (e) => {
                const { clientX, clientY } = e;
                const xPos = (clientX / window.innerWidth - 0.5) * 20;
                const yPos = (clientY / window.innerHeight - 0.5) * 20;

                gsap.to('.hero-content', {
                    rotateY: xPos,
                    rotateX: -yPos,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            };

            window.addEventListener('mousemove', mouseMove);
            return () => window.removeEventListener('mousemove', mouseMove);
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            <SEO
                title="Home"
                description="Welcome to Krishna Juice Shop - The best place for fresh juices, thick shakes, and refreshing smoothies in Jagatpura, Jaipur. Experience freshness in every sip!"
                keywords="Home, Krishna Juice Shop, Best Juice Shop Jagatpura, Fresh Shakes Jaipur, Healthy Drinks"
            />
            <section id="home" className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">Freshness in Every Sip 🍹</h1>
                    <p className="hero-tagline">Serving the Best Shakes & Juices in Jagatpura</p>
                    <div className="hero-ctas">
                        <Link to="/menu" className="btn btn-primary main-cta">View Menu</Link>
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=A-102+Anand+bihar+colony,+near+jagatpura+fatak,+302017,+jaipur,+rajasthan"
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-secondary map-cta"
                        >
                            View Map
                        </a>
                    </div>
                </div>
                <div className="floating-fruits">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/022/825/544/non_2x/orange-fruit-orange-on-transparent-background-free-png.png"
                        alt="Orange"
                        className="fruit orange-img"
                        crossOrigin="anonymous"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&auto=format&fit=crop&q=60"
                        alt="Mango"
                        className="fruit mango-img"
                        crossOrigin="anonymous"
                    />
                </div>
               
            </section>
        </>
    );
}

export default Home;
