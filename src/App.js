import './App.css';
import { useState, useEffect } from 'react';
import AdminPanel from './components/AdminPanel';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import productsData from './products.json';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  const loadProducts = () => {
    const savedProducts = localStorage.getItem('chillingProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(productsData.products);
      localStorage.setItem('chillingProducts', JSON.stringify(productsData.products));
    }
  };

  const loadCart = () => {
    const savedCart = localStorage.getItem('chillingCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  };

  const saveCart = (items) => {
    localStorage.setItem('chillingCart', JSON.stringify(items));
    setCartItems(items);
  };

  const addToCart = (product) => {
    const newItems = [...cartItems, product];
    saveCart(newItems);
    setCartOpen(true);
  };

  const updateCartQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const newItems = [...cartItems];
    newItems[index].quantity = newQuantity;
    saveCart(newItems);
  };

  const removeFromCart = (index) => {
    const newItems = cartItems.filter((_, i) => i !== index);
    saveCart(newItems);
  };

  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="App">
      {/* Top Banner */}
      <div className="top-banner">
        🚚 ENVÍO GRATIS POR COMPRAS SUPERIORES A $150.000 COP
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-text">Chilling</span>
            <div className="logo-dot"></div>
          </div>
          
          <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <a href="#home" className="nav-link">Inicio</a>
            <div className="nav-dropdown">
              <a href="#products" className="nav-link">Productos ▾</a>
              <div className="dropdown-content">
                <a href="#tops">Tops & Crops</a>
                <a href="#hoodies">Hoodies</a>
                <a href="#vestidos">Vestidos</a>
                <a href="#sets">Sets</a>
                <a href="#shorts">Shorts</a>
                <a href="#accesorios">Accesorios</a>
              </div>
            </div>
            <a href="#about" className="nav-link">Nosotros</a>
            <a href="#contact" className="nav-link">Contacto</a>
          </div>

          <div className="nav-actions">
            <button className="admin-icon" onClick={() => setShowAdmin(true)} title="Panel Admin">
              ⚙️
            </button>
            <button className="cart-icon" onClick={() => setCartOpen(true)}>
              🛒 <span className="cart-badge">{cartItems.length}</span>
            </button>
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Admin Panel */}
      {showAdmin && <AdminPanel onClose={() => {
        setShowAdmin(false);
        loadProducts();
      }} />}

      {/* Product Detail */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Cart */}
      <Cart 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
      />

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-badge">✨ Nueva Colección 2025</span>
            <h1 className="hero-title">
              Libera tu
              <span className="gradient-text"> Estilo Interior</span>
            </h1>
            <p className="hero-description">
              Descubre la moda urbana femenina que define tu personalidad. 
              Piezas versátiles, cómodas y con actitud para cada momento.
            </p>
            <div className="hero-buttons">
              <button className="btn-hero-primary">Ver Productos</button>
              <button className="btn-hero-secondary">Colecciones</button>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card card-1">
              <div className="card-icon">💕</div>
              <div className="card-text">
                <strong>Hot Sale</strong>
                <span>Hasta 50% OFF</span>
              </div>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">✨</div>
              <div className="card-text">
                <strong>Nueva</strong>
                <span>Colección</span>
              </div>
            </div>
            <div className="hero-circle circle-1"></div>
            <div className="hero-circle circle-2"></div>
            <div className="hero-circle circle-3"></div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-icon">👚</div>
            <h3>Tops & Crops</h3>
            <p>Frescos y versátiles</p>
          </div>
          <div className="category-card">
            <div className="category-icon">👗</div>
            <h3>Vestidos</h3>
            <p>Casuales y elegantes</p>
          </div>
          <div className="category-card">
            <div className="category-icon">🧥</div>
            <h3>Hoodies & Sets</h3>
            <p>Comodidad total</p>
          </div>
          <div className="category-card">
            <div className="category-icon">💫</div>
            <h3>Accesorios</h3>
            <p>El toque perfecto</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured" id="products">
        <div className="section-header">
          <span className="section-badge">✨ Lo Más Hot</span>
          <h2 className="section-title">Looks que Amas</h2>
          <p className="section-description">
            Piezas cuidadosamente seleccionadas para tu estilo único
          </p>
        </div>
        
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
              <div className="product-image" style={{ background: product.color }}>
                <button className="product-favorite" onClick={(e) => {
                  e.stopPropagation();
                  alert('❤️ Agregado a favoritos!');
                }}>♡</button>
                <div className="product-badge">NEW</div>
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-footer">
                  <span className="product-price">${product.price}</span>
                  <button className="btn-add-cart" onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(product);
                  }}>
                    Ver más
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cta-center">
          <button className="btn-view-all">Ver Todos los Productos</button>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💝</div>
            <h3>Envío Gratis</h3>
            <p>Compras superiores a $150.000</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Cambios Fáciles</h3>
            <p>30 días sin preguntas</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Compra Segura</h3>
            <p>100% protegida</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💫</div>
            <h3>Envío Rápido</h3>
            <p>Recíbelo en 24-48hrs</p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="cta-content">
          <h2>¿Lista para Renovar tu Estilo?</h2>
          <p>Únete a la comunidad Chilling y recibe 15% OFF en tu primera compra ✨</p>
          <div className="cta-input-group">
            <input type="email" placeholder="Tu email aquí..." className="cta-input" />
            <button className="btn-cta">Suscríbete</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-text">Chilling</span>
              <div className="logo-dot"></div>
            </div>
            <p>Tu tienda de moda urbana femenina. Estilo auténtico para mujeres con actitud.</p>
            <div className="social-icons">
              <a href="#instagram" className="social-icon">📷</a>
              <a href="#tiktok" className="social-icon">🎵</a>
              <a href="#pinterest" className="social-icon">📌</a>
              <a href="#facebook" className="social-icon">📘</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Tienda</h4>
            <a href="#new">Novedades</a>
            <a href="#tops">Tops & Crops</a>
            <a href="#vestidos">Vestidos</a>
            <a href="#sets">Sets</a>
            <a href="#accessories">Accesorios</a>
          </div>
          
          <div className="footer-section">
            <h4>Ayuda</h4>
            <a href="#faq">Preguntas</a>
            <a href="#shipping">Envíos</a>
            <a href="#returns">Devoluciones</a>
            <a href="#support">Soporte</a>
          </div>
          
          <div className="footer-section">
            <h4>Contacto</h4>
            <a href="#email">info@chilling.com</a>
            <a href="#phone">+1 234 567 890</a>
            <a href="#location">México City, MX</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 Chilling. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
