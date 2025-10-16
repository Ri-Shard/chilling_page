# 🔒 Configuración de Seguridad - Panel Admin

## 📍 URL de Acceso

**Panel de Administración**: `/admin`

- **Desarrollo**: `http://localhost:3000/admin`
- **Producción**: `https://tudominio.com/admin`

---

## 🔑 Contraseña

### Contraseña Actual
```
chilling2025
```

### ⚠️ IMPORTANTE: Cambiar antes de publicar

1. Abre: `src/components/AdminLogin.js`
2. Línea 13: Cambia `"chilling2025"` por tu contraseña segura
3. Guarda y recarga la aplicación

### Ejemplo de Contraseña Segura
```javascript
const ADMIN_PASSWORD = "TuContraseñaSuperSegura123!";
```

---

## ⏰ Duración de Sesión

- **Tiempo activo**: 4 horas
- Después expira automáticamente
- Requiere login nuevamente

---

## ✅ Checklist de Seguridad

Antes de publicar tu sitio:

- [ ] Cambiar contraseña por defecto
- [ ] No compartir la URL `/admin` públicamente
- [ ] Probar el login en producción
- [ ] Configurar backups automáticos de productos
- [ ] Cerrar sesión después de cada uso

---

## 🎯 Acceso Rápido

1. Ve a `/admin`
2. Ingresa contraseña
3. Gestiona productos
4. Cierra sesión

---

## 🚨 En Caso de Problemas

**Olvidé mi contraseña:**
- Revisa `src/components/AdminLogin.js` línea 13

**Sesión expirada:**
- Normal después de 4 horas, vuelve a ingresar

**No puedo acceder:**
- Verifica la URL: debe ser `/admin` exactamente
- Revisa que la contraseña sea correcta (case-sensitive)

---

## 📱 Contacto de Emergencia

Si necesitas resetear el sistema:
```javascript
// Consola del navegador (F12)
localStorage.removeItem('adminSession');
localStorage.removeItem('chillingProducts');
```

Luego recarga la página.

