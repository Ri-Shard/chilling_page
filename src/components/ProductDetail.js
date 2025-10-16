import { useState } from 'react';
import './ProductDetail.css';

function ProductDetail({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart({
        ...product,
        selectedSize,
        quantity
      });
      // Mostrar feedback
      const btn = document.querySelector('.btn-add-to-cart');
      btn.textContent = '✓ Agregado!';
      btn.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
      setTimeout(() => {
        btn.textContent = 'Agregar al Carrito';
        btn.style.background = 'linear-gradient(135deg, #ff0080 0%, #ff8c00 100%)';
      }, 2000);
    }
  };

  return (
    <div className="product-detail-overlay" onClick={onClose}>
      <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-detail" onClick={onClose}>✕</button>
        
        <div className="detail-content">
          <div className="detail-image-section">
            <div className="detail-image" style={{ background: product.color }}>
              <div className="detail-badge">NEW</div>
            </div>
            <div className="image-thumbnails">
              <div className="thumbnail active" style={{ background: product.color }}></div>
              <div className="thumbnail" style={{ background: product.color, opacity: 0.7 }}></div>
              <div className="thumbnail" style={{ background: product.color, opacity: 0.5 }}></div>
            </div>
          </div>

          <div className="detail-info-section">
            <div className="detail-category">{product.category}</div>
            <h2 className="detail-title">{product.name}</h2>
            <div className="detail-rating">
              ⭐⭐⭐⭐⭐ <span className="rating-count">(124 reseñas)</span>
            </div>
            <div className="detail-price">${product.price} COP</div>

            <div className="detail-description">
              <h3>Descripción</h3>
              <p>{product.description || 'Prenda de alta calidad, perfecta para tu estilo único. Confeccionada con materiales premium para máxima comodidad y durabilidad.'}</p>
            </div>

            <div className="detail-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Envío gratis en compras +$150.000</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Cambios gratis 30 días</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Pago seguro</span>
              </div>
            </div>

            <div className="detail-size-selector">
              <h3>Selecciona tu talla</h3>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <a href="#guide" className="size-guide">📏 Guía de tallas</a>
            </div>

            <div className="detail-quantity">
              <h3>Cantidad</h3>
              <div className="quantity-selector">
                <button 
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button 
                  className="qty-btn"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                >
                  +
                </button>
              </div>
            </div>

            <div className="detail-actions">
              <button className="btn-add-to-cart" onClick={handleAddToCart}>
                Agregar al Carrito
              </button>
              <button className="btn-favorite-detail">
                ♡ Favoritos
              </button>
            </div>

            <div className="detail-extra-info">
              <div className="info-item">
                <strong>SKU:</strong> CHI-{product.id}
              </div>
              <div className="info-item">
                <strong>Categoría:</strong> {product.category}
              </div>
              <div className="info-item">
                <strong>Disponibilidad:</strong> <span className="in-stock">✓ En stock</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

