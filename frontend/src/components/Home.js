import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './Home.css';

function Home() {
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [errorUsers, setErrorUsers] = useState('');

    const handleLogout = () => {
        // Lösche alle Auth-Daten
        localStorage.removeItem('username');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('isAdmin');
        
        // Setze den globalen Authentifizierungsstatus auf false
        setIsAuthenticated(false);
        
        // Navigiere zurück zur Login-Seite
        navigate('/login', { replace: true });
    };

    const fetchUsers = async () => {
        setLoadingUsers(true);
        setErrorUsers('');
        const token = localStorage.getItem('token');
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

    return (
        <div className="home-wrapper">
            <header className="home-header">
                <h1>Willkommen, {username}!</h1>
                <button onClick={handleLogout} className="logout-button">
                    Abmelden
                </button>
            </header>
            <main className="home-main">
                <section className="welcome-card">
                    <h2>Dashboard</h2>
                    <p>Herzlich willkommen zu Ihrer persönlichen Übersicht.</p>
                    <p>Hier finden Sie alle wichtigen Informationen und nützliche Funktionen.</p>
                    
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
                </section>
            </main>
        </div>
    );
}

export default Home; 