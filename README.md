# 💕 Chilling - Tienda de Moda Urbana Femenina

E-commerce moderno y funcional enfocado en moda urbana para mujeres, con diseño oscuro y acentos neón.

## ✨ Características Principales

### 🛍️ **Carrito de Compras Completo**
- ✅ Agregar productos al carrito con talla y cantidad
- ✅ Modificar cantidades
- ✅ Eliminar productos
- ✅ Códigos de descuento funcionales
- ✅ Cálculo automático de envío
- ✅ Persistencia en localStorage

### 👗 **Detalle de Productos**
- ✅ Modal con información completa
- ✅ Selector de tallas (XS, S, M, L, XL)
- ✅ Control de cantidad
- ✅ Descripción detallada
- ✅ Rating y reseñas

### ⚙️ **Panel de Administración Protegido**
- ✅ Acceso via URL secreta `/admin`
- ✅ Protegido con contraseña
- ✅ Sesión temporal (4 horas)
- ✅ Agregar/Editar/Eliminar productos
- ✅ Importar/Exportar JSON
- ✅ Selector visual de colores
- ✅ Gestión de inventario

### 🎨 **Diseño Moderno**
- ✅ Tema oscuro (negro predominante)
- ✅ Acentos rosa neón y gradientes
- ✅ Animaciones suaves
- ✅ 100% responsive
- ✅ Fuentes juveniles (Poppins, Outfit)

### 🔒 **Seguridad**
- ✅ Panel admin protegido con contraseña
- ✅ URL secreta no visible para clientes
- ✅ Sesión temporal con expiración automática
- ✅ Sin exposición de accesos administrativos

---

## 🔐 Acceso Administrativo

### Para Administradores
1. Ve a: `http://localhost:3000/admin` (o `tudominio.com/admin` en producción)
2. Ingresa la contraseña: `chilling2025`
3. Gestiona productos en el panel admin
4. Cierra sesión al terminar

### ⚠️ Importante
- **Cambia la contraseña** antes de publicar (ver `SECURITY.md`)
- **No compartas** la URL `/admin` públicamente
- La sesión expira después de 4 horas

### Documentación Completa
- 📖 `ADMIN_GUIDE.md` - Guía completa de administración
- 🔒 `SECURITY.md` - Configuración de seguridad
- 📝 `CAMBIOS_SEGURIDAD.md` - Cambios recientes de seguridad

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 🚀 Instalación y Uso

### Requisitos
- Node.js 14 o superior
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone [url-del-repo]

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

---

## 📚 Guías de Uso

- **[ADMIN_GUIDE.md](ADMIN_GUIDE.md)** - Guía completa para gestionar productos
- **[CART_GUIDE.md](CART_GUIDE.md)** - Documentación del carrito y detalle de productos

---

## 🎯 Funcionalidades Clave

### 🛒 **Carrito de Compras**
1. Haz clic en cualquier producto para ver el detalle
2. Selecciona talla y cantidad
3. Agrega al carrito
4. Gestiona tu carrito desde el icono 🛒
5. Aplica códigos de descuento:
   - `CHILLING10` - 10% OFF
   - `CHILLING15` - 15% OFF
   - `PRIMERA` - 15% OFF

### ⚙️ **Panel Admin**
1. Haz clic en el icono ⚙️ en la navegación
2. Gestiona tus productos
3. Exporta/Importa desde JSON
4. Productos editables: `src/products.json`

### 💾 **Datos Persistentes**
- Productos: `localStorage.chillingProducts`
- Carrito: `localStorage.chillingCart`
- Se mantienen al cerrar el navegador

---

## 🎨 Paleta de Colores

```css
/* Primario */
--primary-gradient: linear-gradient(135deg, #ff0080 0%, #ff8c00 100%);

/* Secundario */
--secondary-gradient: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);

/* Fondo */
--dark: #000000;
--dark-card: #1a1a1a;

/* Texto */
--text-primary: #ffffff;
--text-secondary: #a0a0a0;
```

---

## 📦 Estructura del Proyecto

```
chilling_page/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── AdminPanel.js/css      # Panel de administración
│   │   ├── ProductDetail.js/css   # Detalle de producto
│   │   └── Cart.js/css            # Carrito de compras
│   ├── App.js                     # Componente principal
│   ├── App.css                    # Estilos principales
│   ├── products.json              # Base de datos de productos
│   └── ...
├── ADMIN_GUIDE.md                 # Guía de administración
├── CART_GUIDE.md                  # Guía del carrito
└── README.md                      # Este archivo
```

---

## 🔧 Personalización

### Cambiar Productos por Defecto
Edita `src/products.json`:
```json
{
  "products": [
    {
      "id": 1,
      "name": "Nombre del Producto",
      "price": "89.900",
      "category": "Tops",
      "color": "linear-gradient(...)",
      "featured": true,
      "sizes": ["S", "M", "L"],
      "description": "Descripción aquí"
    }
  ]
}
```

### Cambiar Códigos de Descuento
En `src/components/Cart.js`, línea ~18:
```javascript
const codes = {
  'CHILLING10': subtotal * 0.10,
  'NUEVOPROMO': subtotal * 0.20
};
```

### Cambiar Límite de Envío Gratis
En `src/components/Cart.js`, línea ~12:
```javascript
const shipping = subtotal > 150000 ? 0 : 10000;
```

---

## 🎯 Próximos Pasos Sugeridos

### Fase 1: Backend
- [ ] API REST para productos
- [ ] Base de datos (MongoDB/PostgreSQL)
- [ ] Autenticación de usuarios
- [ ] Sistema de órdenes

### Fase 2: Pagos
- [ ] Integración con Stripe/PayU/Mercado Pago
- [ ] Procesamiento de pagos
- [ ] Confirmación de órdenes por email
- [ ] Webhooks de pago

### Fase 3: Extras
- [ ] Sistema de favoritos real
- [ ] Reseñas y ratings
- [ ] Filtros y búsqueda avanzada
- [ ] Recomendaciones personalizadas

---

## 🐛 Solución de Problemas

### Los productos no se muestran
```javascript
// En la consola del navegador (F12):
localStorage.removeItem('chillingProducts')
// Recarga la página
```

### El carrito está vacío pero muestra items
```javascript
localStorage.removeItem('chillingCart')
```

### Resetear todo
```javascript
localStorage.clear()
// Recarga la página
```

---

## 📱 Responsive

- ✅ Desktop (1920px+)
- ✅ Laptop (1440px)
- ✅ Tablet (768px)
- ✅ Mobile (375px+)

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
