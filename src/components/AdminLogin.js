import { useState } from 'react';
import './AdminLogin.css';

function AdminLogin({ onLoginSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  // Contraseña por defecto: "chilling2025"
  // Puedes cambiarla aquí directamente
  const ADMIN_PASSWORD = "chilling2025";

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      // Guardar sesión por 4 horas
      const sessionData = {
        authenticated: true,
        timestamp: new Date().getTime()
      };
      localStorage.setItem('adminSession', JSON.stringify(sessionData));
      setError('');
      onLoginSuccess();
    } else {
      setAttempts(attempts + 1);
      setError('Contraseña incorrecta');
      setPassword('');
      
      // Mensaje especial después de 3 intentos fallidos
      if (attempts >= 2) {
        setError('⚠️ Múltiples intentos fallidos. Contacta al administrador.');
      }
    }
  };

  return (
    <div className="admin-login-overlay">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <div className="admin-lock-icon">🔒</div>
          <h2>Panel de Administración</h2>
          <p>Acceso restringido</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa la contraseña"
              autoFocus
              className={error ? 'input-error' : ''}
            />
            {error && <span className="error-message">{error}</span>}
          </div>

          <button type="submit" className="btn-login">
            Ingresar
          </button>

          <div className="login-footer">
            <a href="/" className="back-link">← Volver a la tienda</a>
          </div>
        </form>

        <div className="login-info">
          <p>💡 Contraseña por defecto: <code>chilling2025</code></p>
          <p>Puedes cambiarla en <code>src/components/AdminLogin.js</code></p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

