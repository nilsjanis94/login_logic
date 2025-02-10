import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);
    
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [errorUsers, setErrorUsers] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        navigate('/login', { replace: true });
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    throw new Error('Kein Zugriffstoken gefunden.');
                }
                const response = await axios.get('http://localhost:8000/api/user_data/', {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                setUserDetails(response.data);
            } catch (err) {
                console.error('Fehler beim Abrufen der Benutzerdaten:', err);
                setError('Fehler beim Laden der Benutzerdaten.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const fetchUsers = async () => {
        setLoadingUsers(true);
        setErrorUsers('');
        try {
            const response = await axios.get('http://localhost:8000/api/users/', {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` }
            });
            setUsers(response.data);
        } catch (error) {
            setErrorUsers('Fehler beim Laden der Benutzer');
        } finally {
            setLoadingUsers(false);
        }
    };

    return (
        <div className="home-wrapper">
            <header className="home-header">
                <div className="header-content">
                    <h1>Willkommen, {userDetails.username || "Nutzer"}!</h1>
                    <p>Schön, dass du wieder da bist.</p>
                </div>
                <button onClick={handleLogout} className="logout-button">
                    Abmelden
                </button>
            </header>
            
            {loading && <p className="info">Lade Daten...</p>}
            {error && <p className="error">{error}</p>}
            
            <section className="user-data-card">
                <h2>Deine Daten</h2>
                <div className="user-info">
                    <div className="info-item">
                        <span className="label">Email:</span>
                        <span className="value">{userDetails.email}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Vorname:</span>
                        <span className="value">{userDetails.first_name}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Nachname:</span>
                        <span className="value">{userDetails.last_name}</span>
                    </div>
                </div>
            </section>

            {localStorage.getItem('isAdmin') === 'true' && (
                <article className="admin-section">
                    <button onClick={fetchUsers} className="admin-button">
                        Alle Benutzer anzeigen
                    </button>
                    {loadingUsers && (
                        <div className="loader-container">
                            <div className="loader"></div>
                            <p>Lädt...</p>
                        </div>
                    )}
                    {errorUsers && <p className="error-users">{errorUsers}</p>}
                    {users.length > 0 && (
                        <div className="users-list">
                            <h3>Benutzerliste:</h3>
                            <ul>
                                {users.map(user => (
                                    <li key={user.id}>
                                        {user.username} - {user.email}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </article>
            )}
        </div>
    );
}

export default Home; 