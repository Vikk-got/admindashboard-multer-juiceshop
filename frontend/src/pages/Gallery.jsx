import { useState, useEffect } from 'react';
import './Gallery.css';
import SEO from '../components/SEO';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/gallery');
      const data = await response.json();
      // Map the API response to match the expected format
      const mappedImages = data.map((item, index) => ({
        _id: item._id || index + 1,
        imageUrl: item.image,
        title: item.caption,
        description: item.caption, // Using caption as description
      }));
      setImages(mappedImages);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const currentIndex = images.findIndex(img => img._id === selectedImage._id);
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % images.length
      : (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[newIndex]);
  };

  return (
    <>
      <SEO 
        title="Gallery - Our Culinary Creations"
        description="Browse our gallery of delicious dishes and restaurant ambiance"
      />
      <div className="gallery-page">
        <div className="gallery-header">
          <h1>Our Gallery</h1>
          <p>Explore our culinary creations and restaurant atmosphere</p>
        </div>

        {loading ? (
          <div className="gallery-loading">
            <div className="spinner"></div>
            <p>Loading gallery...</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {images.map((image) => (
              <div 
                key={image._id} 
                className="gallery-item"
                onClick={() => openLightbox(image)}
              >
                <img 
                  src={`http://localhost:5000/${image.imageUrl}`} 
                  alt={image.title}
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <h3>{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {images.length === 0 && !loading && (
          <div className="no-images">
            <p>No images found in gallery</p>
          </div>
        )}

        {selectedImage && (
          <div className="lightbox" onClick={closeLightbox}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
            <button 
              className="lightbox-nav prev" 
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
            >
              ‹
            </button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img 
                src={`http://localhost:5000/${selectedImage.imageUrl}`} 
                alt={selectedImage.title}
              />
              <div className="lightbox-info">
                <h3>{selectedImage.title}</h3>
              </div>
            </div>
            <button 
              className="lightbox-nav next" 
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;