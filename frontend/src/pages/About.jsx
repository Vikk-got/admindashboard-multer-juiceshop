import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '../components/SEO';
import ThreeDCard from '../components/ThreeDCard';
import img1 from "../assets/c486167e-2a55-4016-aa1e-b7c660d7d8c5.jpg"
import './About.css';

gsap.registerPlugin(ScrollTrigger);

function About() {
    useEffect(() => {
        let ctx = gsap.context(() => {
            const tlAbout = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about',
                    start: 'top 70%',
                    once: true
                }
            });

            tlAbout.from('.section-title', { opacity: 0, y: 30, duration: 0.6 })
                .from('.section-subtitle', { opacity: 0, y: 20, duration: 0.4 }, '-=0.3')
                .from('.owner-img', { scale: 0.8, opacity: 0, duration: 0.8, ease: 'back.out(1.2)' }, '-=0.2')
                .from('.experience-badge', { x: 30, opacity: 0, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.4')
                .from('.about-text h3, .about-text .role, .about-text p', { opacity: 0, x: -30, duration: 0.6, stagger: 0.1 }, '-=0.4')
                .from('.stat-item', {
                    opacity: 0,
                    y: 30,
                    duration: 0.5,
                    stagger: 0.2,
                    onStart: runCounters
                }, '-=0.2');

            // 3D Parallax on Scroll for images
            gsap.to('.owner-img', {
                scrollTrigger: {
                    trigger: '.about',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                y: -50,
                rotateZ: -5
            });

            gsap.to('.experience-badge', {
                scrollTrigger: {
                    trigger: '.about',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2
                },
                y: 50,
                x: 20
            });

            // Floating stats animation
            gsap.to('.stat-item', {
                y: -10,
                duration: 2,
                repeat: -1,
                yoyo: true,
                stagger: 0.3,
                ease: "sine.inOut"
            });

            function runCounters() {
                const counters = document.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2; // seconds

                    gsap.to(counter, {
                        innerHTML: target,
                        duration: duration,
                        snap: { innerHTML: 1 },
                        ease: "power2.out"
                    });
                });
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            <SEO
                title="About Us"
                description="Learn about the journey of Krishna Juice Shop. Founded by Mr. Krishna, we have been serving the Jagatpura community with fresh and hygienic juices for over 10 years."
                keywords="About Krishna Juice Shop, Mr. Krishna, Juice Shop History, Jagatpura Juice Shop, Freshness Mission"
            />
            <section id="about" className="about section-padding">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Our Story</h2>
                        <p className="section-subtitle">Serving freshness with love and hygiene since Day 1.</p>
                    </div>

                    <div className="about-content">
                        <div className="about-image">
                            <img
                                src={img1}
                                alt="Mr. Krishna - Owner"
                                className="owner-img"
                                crossOrigin="anonymous"
                            />
                            <ThreeDCard className="experience-badge glass">
                                <span className="counter" data-target="10">0</span>+
                                <p>Years of Experience</p>
                            </ThreeDCard>
                        </div>

                        <div className="about-text">
                            <h3>Meet Mr. Krishna</h3>
                            <p className="role">Founder & Owner</p>
                            <p>Welcome to Krishna Juice Shop! We started our journey with a simple mission: to provide the most hygienic, fresh, and delicious juices and shakes to the Jagatpura community at affordable prices.</p>
                            <p>Every sip you take is crafted with the freshest fruits, premium ingredients, and a touch of our secret recipe that has been loved by thousands over the past decade.</p>

                            <div className="stats-grid">
                                <ThreeDCard className="stat-item glass">
                                    <i className="fa-solid fa-users"></i>
                                    <h4><span className="counter" data-target="5000">0</span>+</h4>
                                    <p>Happy Customers</p>
                                </ThreeDCard>
                                <ThreeDCard className="stat-item glass">
                                    <i className="fa-solid fa-glass-water"></i>
                                    <h4><span className="counter" data-target="50">0</span>+</h4>
                                    <p>Shake Varieties</p>
                                </ThreeDCard>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default About;
