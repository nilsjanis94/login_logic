import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName]   = useState('');
    const [username, setUsername]   = useState('');
    const [email, setEmail]         = useState('');
    const [password, setPassword]   = useState('');
    const [error, setError]         = useState('');
    const [success, setSuccess]     = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!firstName || !lastName || !username || !email || !password) {
            setError('Bitte füllen Sie alle Felder aus');
            return;
        }
        
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/api/register/', {
                first_name: firstName,
                last_name: lastName,
                username,
                email,
                password
            });
            setSuccess('Registrierung erfolgreich! Sie werden zum Login weitergeleitet...');
            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 1500);
        } catch (err) {
            if (err.response) {
                // Hier können auch spezifischere Fehlermeldungen ausgegeben werden
                setError(err.response.data.error || 'Ein Fehler ist aufgetreten');
            } else if (err.request) {
                setError('Verbindung zum Server konnte nicht hergestellt werden');
            } else {
                setError('Ein unerwarteter Fehler ist aufgetreten');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-header">
                <h2>Registrierung</h2>
                <p>Erstellen Sie ein neues Konto</p>
            </div>
            
            <form onSubmit={handleSubmit}>
                {error && <div className="error-message" role="alert">{error}</div>}
                {success && <div className="success-message" role="alert">{success}</div>}
                
                <div className="form-group">
                    <label htmlFor="firstName">Vorname</label>
                    <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Geben Sie Ihren Vornamen ein"
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Nachname</label>
                    <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Geben Sie Ihren Nachnamen ein"
                        disabled={isLoading}
                    />
                </div>

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
                    <label htmlFor="email">E-Mail</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Geben Sie Ihre E-Mail ein"
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
                    className="register-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Registrierung läuft...' : 'Registrieren'}
                </button>
            </form>
        </div>
    );
}

export default Register; 