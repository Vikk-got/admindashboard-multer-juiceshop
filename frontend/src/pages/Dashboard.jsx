import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastProvider';
import './Dashboard.css';

// Fallback toast function in case useToast hook fails
const showToastFallback = (message, type = 'info') => {
  alert(`${type.toUpperCase()}: ${message}`);
};

const API_URL = 'http://localhost:5000/api';

function Dashboard() {
  const navigate = useNavigate();
  const showToast = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const [currentUser, setCurrentUser] = useState(null);
  
  // Login state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Product state
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'juices',
    description: '',
    image: null
  });
  const [editingProductId, setEditingProductId] = useState(null);
  
  // Gallery state
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryForm, setGalleryForm] = useState({
    caption: '',
    image: null
  });
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  
  // Fetch current user on load
  useEffect(() => {
    checkAuthStatus();
  }, []);
  
  const checkAuthStatus = async () => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const userData = await response.json();
          setCurrentUser(userData);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('adminToken');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        localStorage.removeItem('adminToken');
      }
    }
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        setCurrentUser(data);
        setIsAuthenticated(true);
        (showToast || showToastFallback)('Login successful!', 'success');
      } else {
        (showToast || showToastFallback)(data.message || 'Login failed', 'error');
      }
    } catch (error) {
      (showToast || showToastFallback)('Network error. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUsername('');
    setPassword('');
    (showToast || showToastFallback)('Logged out successfully', 'info');
  };
  
  // Product functions
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      (showToast || showToastFallback)('Error fetching products', 'error');
    }
  };
  
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', productForm.name);
    formData.append('category', productForm.category);
    formData.append('description', productForm.description);
    if (productForm.image) {
      formData.append('image', productForm.image);
    }
    
    try {
      const token = localStorage.getItem('adminToken');
      let response;
      
      if (editingProductId) {
        response = await fetch(`${API_URL}/products/${editingProductId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
      } else {
        response = await fetch(`${API_URL}/products`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
      }
      
      if (response.ok) {
        const result = await response.json();
        if (editingProductId) {
          setProducts(products.map(p => p._id === editingProductId ? result : p));
          (showToast || showToastFallback)('Product updated successfully!', 'success');
        } else {
          setProducts([...products, result]);
          (showToast || showToastFallback)('Product added successfully!', 'success');
        }
        resetProductForm();
        fetchProducts();
      } else {
        const errorData = await response.json();
        (showToast || showToastFallback)(errorData.message || 'Error saving product', 'error');
      }
    } catch (error) {
      (showToast || showToastFallback)('Network error. Please try again.', 'error');
    }
  };
  
  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_URL}/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          setProducts(products.filter(p => p._id !== id));
          (showToast || showToastFallback)('Product deleted successfully!', 'success');
        } else {
          const errorData = await response.json();
          (showToast || showToastFallback)(errorData.message || 'Error deleting product', 'error');
        }
      } catch (error) {
        (showToast || showToastFallback)('Network error. Please try again.', 'error');
      }
    }
  };
  
  const editProduct = (product) => {
    setProductForm({
      name: product.name,
      category: product.category,
      description: product.description,
      image: null
    });
    setEditingProductId(product._id);
  };
  
  const resetProductForm = () => {
    setProductForm({
      name: '',
      category: 'juices',
      description: '',
      image: null
    });
    setEditingProductId(null);
  };
  
  // Gallery functions
  const fetchGalleryItems = async () => {
    try {
      const response = await fetch(`${API_URL}/gallery`);
      const data = await response.json();
      setGalleryItems(data);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      (showToast || showToastFallback)('Error fetching gallery items', 'error');
    }
  };
  
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('caption', galleryForm.caption);
    if (galleryForm.image) {
      formData.append('image', galleryForm.image);
    }
    
    try {
      const token = localStorage.getItem('adminToken');
      let response;
      
      if (editingGalleryId) {
        response = await fetch(`${API_URL}/gallery/${editingGalleryId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
      } else {
        response = await fetch(`${API_URL}/gallery`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
      }
      
      if (response.ok) {
        const result = await response.json();
        if (editingGalleryId) {
          setGalleryItems(galleryItems.map(g => g._id === editingGalleryId ? result : g));
          (showToast || showToastFallback)('Gallery item updated successfully!', 'success');
        } else {
          setGalleryItems([...galleryItems, result]);
          (showToast || showToastFallback)('Gallery item added successfully!', 'success');
        }
        resetGalleryForm();
        fetchGalleryItems();
      } else {
        const errorData = await response.json();
        (showToast || showToastFallback)(errorData.message || 'Error saving gallery item', 'error');
      }
    } catch (error) {
      (showToast || showToastFallback)('Network error. Please try again.', 'error');
    }
  };
  
  const deleteGalleryItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_URL}/gallery/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          setGalleryItems(galleryItems.filter(g => g._id !== id));
          (showToast || showToastFallback)('Gallery item deleted successfully!', 'success');
        } else {
          const errorData = await response.json();
          (showToast || showToastFallback)(errorData.message || 'Error deleting gallery item', 'error');
        }
      } catch (error) {
        (showToast || showToastFallback)('Network error. Please try again.', 'error');
      }
    }
  };
  
  const editGalleryItem = (item) => {
    setGalleryForm({
      caption: item.caption,
      image: null
    });
    setEditingGalleryId(item._id);
  };
  
  const resetGalleryForm = () => {
    setGalleryForm({
      caption: '',
      image: null
    });
    setEditingGalleryId(null);
  };
  
  // Load data when tab changes
  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'products') {
        fetchProducts();
      } else if (activeTab === 'gallery') {
        fetchGalleryItems();
      }
    }
  }, [activeTab, isAuthenticated]);
  
  if (!isAuthenticated) {
    return (
      <div className="dashboard-login">
        <div className="login-container">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <button type="submit" disabled={loading} className="login-btn">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="login-hint">Hint: Use admin@gmail.com and password admin123</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {currentUser?.username || 'Admin'}!</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>
      
      <nav className="dashboard-nav">
        <button 
          className={activeTab === 'products' ? 'active' : ''}
          onClick={() => setActiveTab('products')}
        >
          Products Management
        </button>
        <button 
          className={activeTab === 'gallery' ? 'active' : ''}
          onClick={() => setActiveTab('gallery')}
        >
          Gallery Management
        </button>
      </nav>
      
      <main className="dashboard-main">
        {activeTab === 'products' && (
          <div className="products-section">
            <div className="form-section">
              <h2>{editingProductId ? 'Edit Product' : 'Add New Product'}</h2>
              <form onSubmit={handleProductSubmit} className="product-form">
                <div className="form-group">
                  <label htmlFor="productName">Name:</label>
                  <input
                    type="text"
                    id="productName"
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="productCategory">Category:</label>
                  <select
                    id="productCategory"
                    value={productForm.category}
                    onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                  >
                    <option value="juices">Juices</option>
                    <option value="shakes">Shakes</option>
                    <option value="special">Special Items</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="productDescription">Description:</label>
                  <textarea
                    id="productDescription"
                    value={productForm.description}
                    onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="productImage">Image:</label>
                  <input
                    type="file"
                    id="productImage"
                    accept="image/*"
                    onChange={(e) => setProductForm({...productForm, image: e.target.files[0]})}
                  />
                </div>
                <button type="submit" className="submit-btn">
                  {editingProductId ? 'Update Product' : 'Add Product'}
                </button>
                {editingProductId && (
                  <button 
                    type="button" 
                    onClick={resetProductForm}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>
            
            <div className="list-section">
              <h2>Current Products ({products.length})</h2>
              <div className="items-list">
                {products.map(product => (
                  <div key={product._id} className="item-card">
                    <img 
                      src={`http://localhost:5000/${product.image}`} 
                      alt={product.name} 
                      className="item-image"
                    />
                    <div className="item-details">
                      <h3>{product.name}</h3>
                      <p><strong>Category:</strong> {product.category}</p>
                      <p><strong>Description:</strong> {product.description}</p>
                      <div className="item-actions">
                        <button 
                          onClick={() => editProduct(product)}
                          className="edit-btn"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => deleteProduct(product._id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'gallery' && (
          <div className="gallery-section">
            <div className="form-section">
              <h2>{editingGalleryId ? 'Edit Gallery Item' : 'Add New Gallery Item'}</h2>
              <form onSubmit={handleGallerySubmit} className="gallery-form">
                <div className="form-group">
                  <label htmlFor="galleryCaption">Caption:</label>
                  <input
                    type="text"
                    id="galleryCaption"
                    value={galleryForm.caption}
                    onChange={(e) => setGalleryForm({...galleryForm, caption: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="galleryImage">Image:</label>
                  <input
                    type="file"
                    id="galleryImage"
                    accept="image/*"
                    onChange={(e) => setGalleryForm({...galleryForm, image: e.target.files[0]})}
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">
                  {editingGalleryId ? 'Update Gallery Item' : 'Add Gallery Item'}
                </button>
                {editingGalleryId && (
                  <button 
                    type="button" 
                    onClick={resetGalleryForm}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>
            
            <div className="list-section">
              <h2>Current Gallery Items ({galleryItems.length})</h2>
              <div className="items-list">
                {galleryItems.map(item => (
                  <div key={item._id} className="item-card">
                    <img 
                      src={`http://localhost:5000/${item.image}`} 
                      alt={item.caption} 
                      className="item-image"
                    />
                    <div className="item-details">
                      <h3>{item.caption}</h3>
                      <p><strong>Uploaded:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
                      <div className="item-actions">
                        <button 
                          onClick={() => editGalleryItem(item)}
                          className="edit-btn"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => deleteGalleryItem(item._id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;