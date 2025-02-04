import React, { useState, useContext } from 'react';
import api from '../api'; // Unsere konfigurierte Axios-Instanz
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!username || !password) {
            setError('Bitte füllen Sie alle Felder aus');
            return;
        }
        
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            // Sende Login-Daten an den Endpunkt
            const response = await api.post('login/', { username, password });

            // Angenommen, die API liefert { token: "..." } zurück
            const { token } = response.data;
            if (token) {
                localStorage.setItem('authToken', token);
                // Speichere die Benutzerdaten
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('isAuthenticated', 'true');
                // Speichere, ob der Benutzer Admin-Rechte hat, anhand des is_staff-Felds
                localStorage.setItem('isAdmin', JSON.stringify(response.data.is_staff));
                localStorage.setItem('token', response.data.token); // Token speichern
                
                setSuccess('Login erfolgreich! Sie werden weitergeleitet...');
                
                // Aktualisiere den globalen Authentifizierungsstatus
                setIsAuthenticated(true);
                
                // Direkte Weiterleitung
                navigate('/home', { replace: true });
            } else {
                setError('Kein Token in der Antwort gefunden.');
            }
        } catch (err) {
            if (err.response) {
                // Spezifische Fehlermeldung vom Server
                setError(err.response.data.error);
            } else if (err.request) {
                // Netzwerkfehler
                setError('Verbindung zum Server konnte nicht hergestellt werden');
            } else {
                setError('Ein unerwarteter Fehler ist aufgetreten');
            }
            // Bei Fehler: Zustand zurücksetzen
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('username');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('authToken');
            localStorage.removeItem('token');
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <h2>Willkommen zurück</h2>
                <p>Bitte melden Sie sich an, um fortzufahren</p>
            </div>
            
            <form onSubmit={handleSubmit}>
                {error && (
                    <div className="error-message" role="alert">
                        <i className="fas fa-exclamation-circle"></i> {error}
                    </div>
                )}
                
                {success && (
                    <div className="success-message" role="alert">
                        <i className="fas fa-check-circle"></i> {success}
                    </div>
                )}
                
                <div className="form-group">
                    <label htmlFor="username">Benutzername</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Geben Sie Ihren Benutzernamen ein"
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Passwort</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Geben Sie Ihr Passwort ein"
                        disabled={isLoading}
                    />
                </div>

                <button 
                    type="submit" 
                    className="login-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Wird angemeldet...' : 'Anmelden'}
                </button>

                <p className="register-link">
                    Noch keinen Account? <Link to="/register">Registrieren</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
