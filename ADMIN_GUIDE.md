# 🛍️ Guía de Administración - Chilling Store

## 📋 Descripción

Este sistema te permite gestionar los productos de tu tienda **Chilling** de dos formas:

1. **Panel de Administración Visual** (interfaz gráfica protegida)
2. **Archivo JSON** (edición manual)

---

## 🔐 Seguridad del Panel Admin

El panel de administración está protegido con:
- ✅ **URL Secreta**: `/admin` (no visible para clientes)
- ✅ **Contraseña**: Requerida para acceder
- ✅ **Sesión Temporal**: Expira después de 4 horas de inactividad

---

## 🎨 Opción 1: Panel de Administración Visual

### Acceso al Panel
1. Ve a la URL: **`tudominio.com/admin`**
   - En desarrollo local: **`http://localhost:3000/admin`**
2. Ingresa la contraseña de administrador
   - **Contraseña por defecto**: `chilling2025`
3. El panel se abrirá automáticamente
4. La sesión se mantendrá activa por 4 horas

### Cerrar Sesión
- Haz clic en "**✕ Cerrar Sesión**" en la esquina superior derecha
- Esto cerrará tu sesión y te redirigirá a la tienda

### Cambiar la Contraseña
Para cambiar la contraseña del admin:
1. Abre el archivo: `src/components/AdminLogin.js`
2. Busca la línea: `const ADMIN_PASSWORD = "chilling2025";`
3. Cambia `"chilling2025"` por tu nueva contraseña
4. Guarda el archivo y recarga la aplicación

### Funciones Disponibles

#### ✏️ Agregar Producto
1. Clic en "**+ Agregar Producto**"
2. Completa el formulario:
   - **Nombre**: Nombre del producto (ej: "Crop Top Rosa")
   - **Precio**: Solo el número (ej: "45.900")
   - **Categoría**: Selecciona de la lista
   - **Color/Gradiente**: Elige el color de fondo del producto
   - **Tallas**: Selecciona las tallas disponibles (XS, S, M, L, XL)
   - **Descripción**: Opcional
   - **Producto destacado**: Marca si quieres que aparezca en la página principal
3. Clic en "**Agregar Producto**"

#### 📝 Editar Producto
1. En la lista de productos, clic en "**✏️ Editar**"
2. Modifica los campos que desees
3. Clic en "**Guardar Cambios**"

#### 🗑️ Eliminar Producto
1. Clic en el icono de **basura (🗑️)**
2. Confirma la eliminación

#### 📥 Exportar Productos a JSON
1. Clic en "**📥 Exportar JSON**"
2. Se descargará un archivo `chilling-products.json` con todos tus productos
3. Guarda este archivo como respaldo

#### 📤 Importar Productos desde JSON
1. Clic en "**📤 Importar JSON**"
2. Selecciona un archivo JSON con la estructura correcta
3. Los productos se cargarán automáticamente

---

## 📄 Opción 2: Editar Archivo JSON

### Ubicación del Archivo
El archivo de productos está en: `src/products.json`

### Estructura del JSON

```json
{
  "products": [
    {
      "id": 1,
      "name": "Hoodie Oversized",
      "price": "89.900",
      "category": "Hoodies",
      "color": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "featured": true,
      "sizes": ["S", "M", "L", "XL"],
      "description": "Hoodie oversized cómoda y con estilo urbano"
    }
  ]
}
```

### Campos Explicados

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| `id` | Número | Identificador único (debe ser diferente para cada producto) | `1` |
| `name` | Texto | Nombre del producto | `"Crop Top Rosa"` |
| `price` | Texto | Precio sin símbolo $ | `"45.900"` |
| `category` | Texto | Categoría del producto | `"Tops"` |
| `color` | Texto | Gradiente CSS | `"linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"` |
| `featured` | Boolean | Si aparece en página principal | `true` o `false` |
| `sizes` | Array | Tallas disponibles | `["XS", "S", "M", "L"]` |
| `description` | Texto | Descripción del producto | `"Descripción aquí"` |

### Categorías Disponibles
- `Tops`
- `Hoodies`
- `Vestidos`
- `Sets`
- `Shorts`
- `Camisetas`
- `Accesorios`

### Gradientes de Color Disponibles

```css
/* Púrpura */
linear-gradient(135deg, #667eea 0%, #764ba2 100%)

/* Rosa */
linear-gradient(135deg, #f093fb 0%, #f5576c 100%)

/* Cyan */
linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)

/* Verde */
linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)

/* Rosa-Amarillo */
linear-gradient(135deg, #fa709a 0%, #fee140 100%)

/* Cyan-Púrpura */
linear-gradient(135deg, #30cfd0 0%, #330867 100%)

/* Pastel */
linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)

/* Rosa Suave */
linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)
```

### Ejemplo: Agregar un Producto Manualmente

```json
{
  "products": [
    // ... productos existentes ...
    {
      "id": 7,
      "name": "Top Deportivo",
      "price": "52.900",
      "category": "Tops",
      "color": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "featured": true,
      "sizes": ["XS", "S", "M", "L"],
      "description": "Top deportivo ideal para entrenar"
    }
  ]
}
```

### Pasos para Editar el JSON:
1. Abre el archivo `src/products.json`
2. Agrega o modifica productos siguiendo la estructura
3. **Importante**: Asegúrate de que cada producto tenga un `id` único
4. Guarda el archivo
5. Recarga la página web (F5)

---

## 💾 Almacenamiento

Los productos se guardan en dos lugares:

1. **localStorage del navegador**: Se guardan automáticamente al usar el panel admin
2. **Archivo JSON**: Respaldo permanente en `src/products.json`

### Reiniciar Productos a los Valores por Defecto

Si quieres volver a cargar los productos originales del JSON:

1. Abre la **Consola del navegador** (F12)
2. Escribe: `localStorage.removeItem('chillingProducts')`
3. Presiona Enter
4. Recarga la página (F5)

---

## 🔄 Sincronización

- Los cambios en el **Panel Admin** se guardan en localStorage
- Para hacer los cambios permanentes, **exporta el JSON** y reemplaza el archivo `src/products.json`
- Si editas el JSON directamente, los cambios se cargarán la próxima vez que borres el localStorage

---

## 🚀 Tips

✅ **Mejor Práctica**: Usa el Panel Admin para gestión diaria y exporta el JSON periódicamente como respaldo

✅ **Respaldos**: Exporta el JSON regularmente y guárdalo en un lugar seguro

✅ **IDs Únicos**: Asegúrate de que cada producto tenga un ID diferente

✅ **Precios**: Usa formato colombiano sin símbolo $ (ej: "89.900")

✅ **Productos Destacados**: Marca solo los mejores productos como `featured: true`

---

## ❓ Troubleshooting

### Los productos no se muestran
- Verifica que el JSON tenga la estructura correcta
- Revisa la consola del navegador (F12) para errores
- Intenta borrar el localStorage y recargar

### Los cambios no se guardan
- Asegúrate de hacer clic en "Agregar Producto" o "Guardar Cambios"
- Verifica que el navegador permita localStorage
- Exporta el JSON como respaldo

### Error al importar JSON
- Verifica que el archivo tenga la extensión `.json`
- Asegúrate de que la estructura sea correcta
- Revisa que no haya comas extra al final

---

## 🔒 Recomendaciones de Seguridad

### Para Producción
Cuando publiques tu sitio web:

1. **Cambia la contraseña por defecto** inmediatamente
   - Usa una contraseña fuerte con mayúsculas, minúsculas, números y símbolos
   - Ejemplo: `Ch1ll!ng@2025_S3cur3`

2. **No compartas la URL `/admin`** públicamente
   - Es una URL secreta solo para administradores
   - No la incluyas en redes sociales ni lugares públicos

3. **Mantén la sesión segura**
   - Cierra sesión cuando termines de trabajar
   - No dejes el panel abierto en computadoras públicas

4. **Backups regulares**
   - Exporta el JSON de productos regularmente
   - Guarda copias de seguridad en un lugar seguro

### Mejoras de Seguridad Futuras (Opcional)

Para mayor seguridad, considera:
- Implementar un backend con autenticación real (Firebase, Auth0, etc.)
- Usar variables de entorno para la contraseña
- Agregar autenticación de dos factores (2FA)
- Implementar límite de intentos de login

---

## ❓ Troubleshooting

### No puedo acceder al panel admin
- Verifica que estés usando la URL correcta: `/admin`
- Asegúrate de ingresar la contraseña correcta
- Si olvidaste la contraseña, revisa el archivo `src/components/AdminLogin.js`

### La sesión expiró
- Las sesiones expiran después de 4 horas por seguridad
- Simplemente vuelve a ingresar con tu contraseña

### Los productos no se muestran
- Verifica que el JSON tenga la estructura correcta
- Revisa la consola del navegador (F12) para errores
- Intenta borrar el localStorage y recargar

### Los cambios no se guardan
- Asegúrate de hacer clic en "Agregar Producto" o "Guardar Cambios"
- Verifica que el navegador permita localStorage
- Exporta el JSON como respaldo

### Error al importar JSON
- Verifica que el archivo tenga la extensión `.json`
- Asegúrate de que la estructura sea correcta
- Revisa que no haya comas extra al final

---

## 📧 Soporte

Si necesitas ayuda adicional, revisa los archivos:
- `src/components/AdminPanel.js` - Código del panel admin
- `src/components/AdminLogin.js` - Sistema de autenticación
- `src/App.js` - Configuración de rutas
- `src/products.json` - Archivo de productos

¡Disfruta gestionando tu tienda Chilling de forma segura! ✨💕🔒

