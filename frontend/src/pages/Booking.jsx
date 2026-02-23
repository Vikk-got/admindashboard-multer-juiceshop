import { useEffect, useState } from 'react';
import gsap from 'gsap';
import SEO from '../components/SEO';
import ThreeDCard from '../components/ThreeDCard';
import { useToast } from '../components/ToastProvider';
import './Booking.css';

function Booking() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventType: 'birthday',
        date: '',
        time: '',
        guests: ''
    });

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.booking-header', {
                y: -30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });

            gsap.from('.booking-form-wrap', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: 0.2,
                ease: 'power3.out'
            });
        });
        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { showToast } = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();

        // WhatsApp logic
        const phoneNumber = '919939429446';

        const text = `*New Event Booking Request*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Event Type:* ${formData.eventType}\n*Date:* ${formData.date}\n*Time:* ${formData.time}\n*Guests:* ${formData.guests}`;

        const encodedText = encodeURIComponent(text);

        showToast('Opening WhatsApp to submit your booking...', { type: 'info' });
        window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');

        setFormData({
            name: '', email: '', phone: '', eventType: 'birthday', date: '', time: '', guests: ''
        });
    };

    return (
        <>
            <SEO
                title="Book an Event"
                description="Book Krishna Juice Shop for your special events, birthdays, weddings, or corporate gatherings. We provide fresh juice catering services in Jaipur."
                keywords="Event Booking, Juice Catering Jaipur, Birthday Party Drinks, Corporate Event Juice, Book Krishna Juice"
            />
            <section id="booking" className="booking section-padding">
                <div className="container">
                    <div className="booking-header text-center section-header">
                        <h2 className="section-title">Book an Event</h2>
                        <p className="section-subtitle">Celebrate your special moments with Krishna Juice, Freshness Guaranteed!</p>
                    </div>

                    <ThreeDCard className="booking-form-wrap glass">
                        <form onSubmit={handleSubmit} className="booking-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Krishna Das" />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="krishna@example.com" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 99394 29446" />
                                </div>
                                <div className="form-group">
                                    <label>Event Type</label>
                                    <select name="eventType" value={formData.eventType} onChange={handleChange}>
                                        <option value="birthday">Birthday Party</option>
                                        <option value="wedding">Wedding / Pre-Wedding</option>
                                        <option value="corporate">Corporate Event</option>
                                        <option value="other">Other Celebration</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Event Date</label>
                                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Event Time</label>
                                    <input type="time" name="time" value={formData.time} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Number of Guests</label>
                                    <input type="number" name="guests" min="5" value={formData.guests} onChange={handleChange} required placeholder="E.g., 50" />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary submit-btn">
                                Request Booking
                            </button>
                        </form>
                    </ThreeDCard>
                </div>
            </section>
        </>
    );
}

export default Booking;
