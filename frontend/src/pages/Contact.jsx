import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '../components/SEO';
import ThreeDCard from '../components/ThreeDCard';
import { useToast } from '../components/ToastProvider';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

function Contact() {
    useEffect(() => {
        let ctx = gsap.context(() => {
            // Contact Animations
            gsap.from('.contact-info', {
                scrollTrigger: {
                    trigger: '.contact',
                    start: 'top 75%'
                },
                x: -50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });

            gsap.from('.contact-map', {
                scrollTrigger: {
                    trigger: '.contact',
                    start: 'top 75%'
                },
                x: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });

            // 3D Parallax floating
            gsap.to('.contact-info', {
                scrollTrigger: {
                    trigger: '.contact',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5
                },
                y: -50,
                rotationZ: -2
            });

            gsap.to('.contact-form-wrap', {
                scrollTrigger: {
                    trigger: '.contact',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2
                },
                y: 50,
                rotationZ: 2
            });
        });

        return () => ctx.revert();
    }, []);

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { showToast } = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Define WhatsApp target number
        const phoneNumber = '919939429446'; // Replace with the shop's actual WhatsApp number

        // Construct the WhatsApp message payload
        const text = `*New Contact Inquiry*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Message:* ${formData.message}`;

        // Encode message to form valid URL 
        const encodedText = encodeURIComponent(text);

        showToast('Opening WhatsApp — sending your message', { type: 'info' });
        // Redirect directly to WhatsApp Web / App
        window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');

        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <>
            <SEO
                title="Contact Us"
                description="Get in touch with Krishna Juice Shop in Jagatpura, Jaipur. Visit us at Jagatpura Fatak or send us a WhatsApp message for inquiries and orders."
                keywords="Contact Krishna Juice Shop, Jagatpura Juice Shop Location, Juice Shop Phone Number, WhatsApp Krishna Juice"
            />
            <section id="contact" className="contact section-padding">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Visit Us</h2>
                        <p className="section-subtitle">We'd love to serve you! Get in touch or drop by.</p>
                    </div>

                    <div className="contact-content view-3d">
                        <ThreeDCard className="contact-info glass tilt-card">
                            <div className="info-item">
                                <i className="fa-solid fa-location-dot"></i>
                                <div>
                                    <h4>Location</h4>
                                    <p>Jagatpura Fatak, Jaipur, Rajasthan</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <i className="fa-solid fa-phone"></i>
                                <div>
                                    <h4>Phone</h4>
                                    <p>+91 99394 29446</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <i className="fa-solid fa-envelope"></i>
                                <div>
                                    <h4>Email</h4>
                                    <p>rkt2classes@gmail.com</p>
                                </div>
                            </div>

                            <div className="social-links">
                                <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="social-icon"><i className="fa-brands fa-instagram"></i></a>
                                <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="social-icon"><i className="fa-brands fa-facebook-f"></i></a>
                                {/* Simple WhatsApp redirect for general inquiries on the icon */}
                                <a href="https://wa.me/919939429446" target="_blank" rel="noreferrer" className="social-icon"><i className="fa-brands fa-whatsapp"></i></a>
                            </div>
                        </ThreeDCard>

                        <ThreeDCard className="contact-form-wrap glass tilt-card view-3d">
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <h3 className="text-center" style={{ marginBottom: '20px' }}>Send a WhatsApp Message directly!</h3>
                                <div className="form-group">
                                    <label>Your Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Krishna Das" />
                                </div>
                                <div className="form-group">
                                    <label>Your Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="example@email.com" />
                                </div>
                                <div className="form-group">
                                    <label>Your Message</label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" placeholder="I'd like to ask about..."></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                                    Send via WhatsApp <i className="fa-brands fa-whatsapp" style={{ marginLeft: '10px', fontSize: '1.2rem' }}></i>
                                </button>
                            </form>
                        </ThreeDCard>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Contact;
