import { useState } from 'react';
import { signInAdmin } from '../firebase/authService';
import './AdminLogin.css';

function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signInAdmin(email, password);

    if (result.success) {
      onLoginSuccess(result.user);
    } else {
      setError('Email ou mot de passe incorrect');
    }

    setLoading(false);
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <h1>🔐 Administration BPDF</h1>
          <p>Connexion requise</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label>Mot de passe:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? '⏳ Connexion...' : '🔓 Se connecter'}
          </button>
        </form>

        <div className="login-footer">
          <a href="/">← Retour au jeu</a>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
