import { useState, useEffect } from 'react';
import './Cart.css';

function Cart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('.', ''));
    return sum + (price * item.quantity);
  }, 0);

  const shipping = subtotal > 150000 ? 0 : 10000;
  const total = subtotal - discount + shipping;

  const applyPromoCode = () => {
    const codes = {
      'CHILLING10': subtotal * 0.10,
      'CHILLING15': subtotal * 0.15,
      'PRIMERA': subtotal * 0.15
    };

    if (codes[promoCode.toUpperCase()]) {
      setDiscount(codes[promoCode.toUpperCase()]);
      alert('✓ Código aplicado exitosamente!');
    } else {
      alert('✗ Código inválido');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>
            Tu Carrito 
            <span className="cart-count-badge">{cartItems.length}</span>
          </h2>
          <button className="close-cart" onClick={onClose}>✕</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h3>Tu carrito está vacío</h3>
            <p>¡Agrega productos increíbles!</p>
            <button className="btn-continue-shopping" onClick={onClose}>
              Continuar Comprando
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${item.selectedSize}-${index}`} className="cart-item">
                  <div className="cart-item-image" style={{ background: item.color }}></div>
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="cart-item-category">{item.category}</p>
                    <p className="cart-item-size">Talla: <strong>{item.selectedSize}</strong></p>
                    <p className="cart-item-price">${item.price}</p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="cart-quantity-control">
                      <button 
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(index, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                    <button 
                      className="btn-remove-item"
                      onClick={() => onRemoveItem(index)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-promo">
              <input
                type="text"
                placeholder="Código de descuento"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="promo-input"
              />
              <button className="btn-apply-promo" onClick={applyPromoCode}>
                Aplicar
              </button>
            </div>

            {discount > 0 && (
              <div className="promo-applied">
                ✓ Descuento aplicado: -${discount.toLocaleString('es-CO')} COP
              </div>
            )}

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString('es-CO')} COP</span>
              </div>
              {discount > 0 && (
                <div className="summary-row discount">
                  <span>Descuento</span>
                  <span>-${discount.toLocaleString('es-CO')} COP</span>
                </div>
              )}
              <div className="summary-row">
                <span>Envío</span>
                <span className={shipping === 0 ? 'free-shipping' : ''}>
                  {shipping === 0 ? '¡GRATIS!' : `$${shipping.toLocaleString('es-CO')} COP`}
                </span>
              </div>
              {shipping > 0 && subtotal < 150000 && (
                <div className="shipping-notice">
                  Agrega ${(150000 - subtotal).toLocaleString('es-CO')} más para envío gratis
                </div>
              )}
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toLocaleString('es-CO')} COP</span>
              </div>
            </div>

            <div className="cart-footer">
              <button className="btn-checkout">
                Proceder al Pago
              </button>
              <button className="btn-continue-shopping-footer" onClick={onClose}>
                Continuar Comprando
              </button>
            </div>

            <div className="cart-trust-badges">
              <div className="trust-badge">
                <span>🔒</span>
                <span>Pago Seguro</span>
              </div>
              <div className="trust-badge">
                <span>🚚</span>
                <span>Envío Rápido</span>
              </div>
              <div className="trust-badge">
                <span>✓</span>
                <span>Garantía</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;

