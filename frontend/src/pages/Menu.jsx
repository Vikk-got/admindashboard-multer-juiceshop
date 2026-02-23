import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '../components/SEO';
import ThreeDCard from '../components/ThreeDCard';
import './Menu.css';

gsap.registerPlugin(ScrollTrigger);

const menuData = [
    { id: 1, name: 'Aam Juice', desc: 'Fresh mango juice made from ripe mangoes.', price: '₹20', rating: 4.5, category: 'juices', img: 'https://tse3.mm.bing.net/th/id/OIP.DiM4tKe-YWzWYT-3KhEC-QHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 2, name: 'Aam Shake', desc: 'Rich and creamy mango shake.', price: '₹30', rating: 4.8, category: 'shakes', img: 'https://tse3.mm.bing.net/th/id/OIP.ChfXnr1oip2EvImWoz5fwwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 3, name: 'Papita Juice', desc: 'Refreshing papaya juice full of nutrients.', price: '₹20', rating: 4.3, category: 'juices', img: 'https://tse3.mm.bing.net/th/id/OIP.KVriR1ny-Dz6J2Vzq0IraQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 4, name: 'Papita Shake', desc: 'Smooth and creamy papaya shake.', price: '₹30', rating: 4.4, category: 'shakes', img: 'https://i.ytimg.com/vi/lUIvM1DTU18/maxresdefault.jpg?sqp=-oaymwEoCIAKENAF8quKqQMcGADwAQH4AbYIgAKAD4oCDAgAEAEYZSBAKEYwDw==&rs=AOn4CLCQUEVnmYIU30YwKs1uhxT5OCQX5w' },
    { id: 5, name: 'Banana Juice', desc: 'Fresh banana juice blended to perfection.', price: '₹20', rating: 4.2, category: 'juices', img: 'https://tse2.mm.bing.net/th/id/OIP.3H52z134HHU8KfxKZfrzWwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 6, name: 'Banana Shake', desc: 'Creamy banana shake loved by all.', price: '₹30', rating: 4.7, category: 'shakes', img: 'https://foodtasia.com/wp-content/uploads/2021/07/banana-milkshake-41.jpg' },
    { id: 7, name: 'Pineapple Juice', desc: 'Sweet and tangy pineapple juice.', price: '₹20', rating: 5.0, category: 'juices', img: 'https://tse3.mm.bing.net/th/id/OIP.ATyUneXDog0aaVydBtpMMAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 8, name: 'Pineapple Shake', desc: 'Delicious pineapple shake with creamy texture.', price: '₹30', rating: 4.6, category: 'shakes', img: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=500&auto=format&fit=crop&q=60' },
    { id: 9, name: 'Bel Juice', desc: 'Traditional and cooling bel fruit juice.', price: '₹20', rating: 4.1, category: 'juices', img: 'https://assets.telegraphindia.com/abp/2022/May/1653577104_new-project-2022-05-26t202734-172.jpg' },
    { id: 10, name: 'Bel Shake', desc: 'Sweet and creamy bel shake.', price: '₹30', rating: 4.2, category: 'shakes', img: 'https://tse4.mm.bing.net/th/id/OIP.CcR1gaFhjzWzlv_3D3swtAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 11, name: 'Chikoo Shake', desc: 'Thick chikoo shake with natural sweetness.', price: '₹40', rating: 4.8, category: 'shakes', img: 'https://thumbs.dreamstime.com/b/tropical-fruit-chikoo-sapodilla-42420202.jpg' },
    { id: 12, name: 'Mosambi Juice', desc: 'Fresh sweet lime juice full of vitamin C.', price: '₹40', rating: 4.6, category: 'juices', img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&auto=format&fit=crop&q=60' },
    { id: 13, name: 'Mix Juice', desc: 'Blend of seasonal fruits in one glass.', price: '₹20', rating: 4.4, category: 'juices', img: 'https://static.vecteezy.com/system/resources/previews/022/454/679/large_2x/mix-fruit-juice-in-a-glass-with-fresh-fruits-generative-ai-free-photo.jpg' },
    { id: 14, name: 'Chukandar Juice', desc: 'Healthy beetroot juice packed with iron.', price: '₹30', rating: 4.3, category: 'juices', img: 'https://tse1.mm.bing.net/th/id/OIP.DOIVtpTt-RhxVo7RwMiFbwHaFj?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 15, name: 'KitKat Shake', desc: 'Chocolatey KitKat blended shake.', price: '₹50', rating: 4.9, category: 'special', img: 'https://images.unsplash.com/photo-1553787499-6f9133860278?w=500&auto=format&fit=crop&q=60' },
    { id: 16, name: 'Anjeer Shake', desc: 'Premium fig shake rich in flavor.', price: '₹60', rating: 4.9, category: 'special', img: 'https://cdn.cdnparenting.com/articles/2020/01/19153138/Almond-Anjeer-Milkshake-Recipe.jpg' },
    { id: 17, name: 'Butter Scotch Shake', desc: 'Classic butterscotch flavored shake.', price: '₹50', rating: 4.7, category: 'shakes', img: 'https://heavenlyhomecooking.com/wp-content/uploads/2021/05/Butterscotch-Shake-Recipe-Finished-4-720x1080.jpg' },
    { id: 18, name: 'Strawberry Shake', desc: 'Sweet and creamy strawberry delight.', price: '₹40', rating: 4.6, category: 'shakes', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=60' },
    { id: 19, name: 'Chocolate Shake', desc: 'Rich chocolate flavored shake.', price: '₹40', rating: 4.8, category: 'shakes', img: 'https://th.bing.com/th/id/R.bde0bc55f8ff1412d013ca04c67dd0cb?rik=jd%2bKK8FY9NjOUw&riu=http%3a%2f%2fwww.willcookforfriends.com%2fwp-content%2fuploads%2f2017%2f01%2fDecadent-Chocolate-Milkshake-Youd-Never-Know-Is-Healthy-hi-res-web-1B.jpg&ehk=JfCGyj5Tay9OJIFSngvu4vpy7HAPVBvybG%2fqtjsrmvc%3d&risl=&pid=ImgRaw&r=0' },
    { id: 20, name: 'Vanilla Shake', desc: 'Classic vanilla creamy shake.', price: '₹40', rating: 4.5, category: 'shakes', img: 'https://thebusybaker.ca/wp-content/uploads/2023/03/vanilla-milkshake-fb-ig-5-578x578.jpg' },
    { id: 21, name: 'Oreo Shake', desc: 'Crunchy Oreo blended shake.', price: '₹40', rating: 4.8, category: 'special', img: 'https://images.unsplash.com/photo-1553177595-4de2bb0842b9?w=500&auto=format&fit=crop&q=60' },
    { id: 22, name: 'Cold Coffee', desc: 'Chilled and refreshing cold coffee.', price: '₹40', rating: 4.7, category: 'special', img: 'https://media.istockphoto.com/id/155370125/photo/iced-coffee.webp?a=1&b=1&s=612x612&w=0&k=20&c=Aq9EcX3ITjlukZ6PpRvjC-j6L40cHhQxqT6OXhR7R-8=' },
    { id: 23, name: 'Cold Coffee with Ice Cream', desc: 'Cold coffee topped with ice cream.', price: '₹50', rating: 4.9, category: 'special', img: 'https://cdn.grofers.com/assets/search/usecase/banner/cold_coffee_with_ice_cream_01.png' },
    { id: 24, name: 'Kesar Pista Shake', desc: 'Royal kesar pista flavored shake.', price: '₹60', rating: 4.9, category: 'special', img: 'https://5.imimg.com/data5/SELLER/Default/2020/12/WU/KA/GV/119105065/real-kesar-pista-nut-shakes-1000x1000.jpg' },
    { id: 25, name: 'Badam Shake', desc: 'Healthy almond shake.', price: '₹60', rating: 4.8, category: 'special', img: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=500&auto=format&fit=crop&q=60' },
    { id: 26, name: 'Pan Fruit Shake', desc: 'Unique paan flavored fruit shake.', price: '₹60', rating: 4.6, category: 'special', img: 'https://tse4.mm.bing.net/th/id/OIP.gut_fKKM4gWvQjuPKidkfwHaLH?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 27, name: 'Raj Bhog Shake', desc: 'Traditional raj bhog flavored special shake.', price: '₹60', rating: 4.9, category: 'special', img: 'https://tse4.mm.bing.net/th/id/OIP.u6CDeS3LX5cPkMLJ5E823QHaDO?rs=1&pid=ImgDetMain&o=7&rm=3' }
];


function Menu() {
    const [filter, setFilter] = useState('all');

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

    const filteredMenu = filter === 'all' ? menuData : menuData.filter(item => item.category === filter);

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
                </div>
            </section>
        </>
    );
}

export default Menu;
