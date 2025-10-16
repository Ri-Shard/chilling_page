import { useState, useEffect } from 'react';
import './AdminPanel.css';

function AdminPanel({ onClose }) {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Tops',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    featured: true,
    sizes: ['S', 'M', 'L'],
    description: ''
  });

  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
  ];

  const categories = ['Tops', 'Hoodies', 'Vestidos', 'Sets', 'Shorts', 'Camisetas', 'Accesorios'];
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL'];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const savedProducts = localStorage.getItem('chillingProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Cargar productos por defecto desde el JSON
      import('../products.json').then((data) => {
        setProducts(data.products);
        localStorage.setItem('chillingProducts', JSON.stringify(data.products));
      });
    }
  };

  const saveProducts = (updatedProducts) => {
    localStorage.setItem('chillingProducts', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSizeToggle = (size) => {
    const newSizes = formData.sizes.includes(size)
      ? formData.sizes.filter(s => s !== size)
      : [...formData.sizes, size];
    setFormData({ ...formData, sizes: newSizes });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Editar producto existente
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id 
          ? { ...formData, id: editingProduct.id }
          : p
      );
      saveProducts(updatedProducts);
    } else {
      // Agregar nuevo producto
      const newProduct = {
        ...formData,
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
      };
      saveProducts([...products, newProduct]);
    }

    resetForm();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás segura de eliminar este producto?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      saveProducts(updatedProducts);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: 'Tops',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      featured: true,
      sizes: ['S', 'M', 'L'],
      description: ''
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify({ products }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'chilling-products.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importFromJSON = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          if (data.products) {
            saveProducts(data.products);
            alert('Productos importados exitosamente!');
          }
        } catch (error) {
          alert('Error al leer el archivo JSON');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="admin-overlay">
      <div className="admin-panel">
        <div className="admin-header">
          <h2>Panel de Administración</h2>
          <button className="close-btn" onClick={() => window.location.href = '/'}>✕ Cerrar Sesión</button>
        </div>

        <div className="admin-actions">
          <button className="btn-admin-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? '← Volver' : '+ Agregar Producto'}
          </button>
          <button className="btn-admin-secondary" onClick={exportToJSON}>
            📥 Exportar JSON
          </button>
          <label className="btn-admin-secondary" style={{ cursor: 'pointer' }}>
            📤 Importar JSON
            <input 
              type="file" 
              accept=".json" 
              onChange={importFromJSON}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        {showForm ? (
          <form className="product-form" onSubmit={handleSubmit}>
            <h3>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h3>
            
            <div className="form-group">
              <label>Nombre del Producto *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Ej: Crop Top Rosa"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Precio (COP) *</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  placeholder="Ej: 45.900"
                />
              </div>

              <div className="form-group">
                <label>Categoría *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Color/Gradiente *</label>
              <div className="gradient-selector">
                {gradients.map((gradient, index) => (
                  <div
                    key={index}
                    className={`gradient-option ${formData.color === gradient ? 'selected' : ''}`}
                    style={{ background: gradient }}
                    onClick={() => setFormData({ ...formData, color: gradient })}
                  />
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Tallas Disponibles *</label>
              <div className="size-selector">
                {availableSizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    className={`size-btn ${formData.sizes.includes(size) ? 'selected' : ''}`}
                    onClick={() => handleSizeToggle(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Descripción del producto..."
                rows="3"
              />
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                />
                <span>Producto destacado</span>
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save">
                {editingProduct ? 'Guardar Cambios' : 'Agregar Producto'}
              </button>
              <button type="button" className="btn-cancel" onClick={resetForm}>
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="products-list">
            <h3>Productos ({products.length})</h3>
            <div className="products-grid-admin">
              {products.map(product => (
                <div key={product.id} className="product-card-admin">
                  <div className="product-preview" style={{ background: product.color }}>
                    {product.featured && <span className="featured-badge">★</span>}
                  </div>
                  <div className="product-details">
                    <h4>{product.name}</h4>
                    <p className="product-category">{product.category}</p>
                    <p className="product-price">${product.price}</p>
                    <div className="product-sizes">
                      {product.sizes.map(size => (
                        <span key={size} className="size-tag">{size}</span>
                      ))}
                    </div>
                  </div>
                  <div className="product-actions">
                    <button className="btn-edit" onClick={() => handleEdit(product)}>
                      ✏️ Editar
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(product.id)}>
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;

