import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');

    // Aktualisiere die Eingabefelder
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // Absenden des Formulars und Abruf der JWTs
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/token/', credentials);
            const { access, refresh } = response.data;
            // Speichere die Tokens im LocalStorage
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
            setIsAuthenticated(true);
            navigate('/home');
        } catch (error) {
            console.error('Login fehlgeschlagen:', error);
            setErrorMessage('Anmeldung fehlgeschlagen, bitte prüfe deine Zugangsdaten.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <h2>Willkommen zurück</h2>
                <p>Bitte melden Sie sich an, um fortzufahren</p>
            </div>
            
            <form onSubmit={handleSubmit}>
                {errorMessage && (
                    <div className="error-message" role="alert">
                        <i className="fas fa-exclamation-circle"></i> {errorMessage}
                    </div>
                )}
                
                <div className="form-group">
                    <label htmlFor="username">Benutzername</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        placeholder="Geben Sie Ihren Benutzernamen ein"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Passwort</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="Geben Sie Ihr Passwort ein"
                    />
                </div>

                <button 
                    type="submit" 
                    className="login-button"
                >
                    Anmelden
                </button>

                <p className="register-link">
                    Noch keinen Account? <Link to="/register">Registrieren</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
