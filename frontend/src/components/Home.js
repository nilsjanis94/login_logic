import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './Home.css';

function Home() {
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    // State für persönliche Benutzerdaten
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: ''
    });

    // State für Admin-spezifische Benutzerliste
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [errorUsers, setErrorUsers] = useState('');

    // Hole persönliche Benutzerdaten vom Backend
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user_data/', {
                    headers: { Authorization: `Token ${token}` }
                });
                setUserDetails(response.data);
                // Optional: Aktualisiere LocalStorage, falls nötig
                localStorage.setItem('username', response.data.username);
            } catch (error) {
                console.error('Fehler beim Laden der Benutzerdaten:', error);
            }
        };

        if (token) {
            fetchUserData();
        }
    }, [token]);

    // Funktion, um alle Benutzer (Admin-Funktion) anzuzeigen
    const fetchUsers = async () => {
        setLoadingUsers(true);
        setErrorUsers('');
        try {
            const response = await axios.get('http://localhost:8000/api/users/', {
                headers: { Authorization: `Token ${token}` }
            });
            setUsers(response.data);
        } catch (error) {
            setErrorUsers('Fehler beim Laden der Benutzer');
        } finally {
            setLoadingUsers(false);
        }
    };

    // Logout-Funktion
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('isAdmin');
        setIsAuthenticated(false);
        navigate('/login', { replace: true });
    };

    return (
        <div className="home-wrapper">
            <header className="home-header">
                <h1>Willkommen, {userDetails.username}!</h1>
                <button onClick={handleLogout} className="logout-button">
                    Abmelden
                </button>
            </header>
            <main className="home-main">
                {/* Anzeige der persönlichen Benutzerdaten */}
                <section className="user-details-card">
                    <h2>Deine persönlichen Daten</h2>
                    <p><strong>Benutzername:</strong> {userDetails.username}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <p><strong>Vorname:</strong> {userDetails.first_name}</p>
                    <p><strong>Nachname:</strong> {userDetails.last_name}</p>
                </section>

                {/* Admin-Bereich zum Anzeigen aller Benutzer */}
                {isAdmin && (
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
            </main>
        </div>
    );
}

export default Home; 