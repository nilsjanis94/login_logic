import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);
    
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [errorUsers, setErrorUsers] = useState('');

    // State zur Bearbeitung eines Benutzers
    const [editingUserId, setEditingUserId] = useState(null);
    const [editedUser, setEditedUser] = useState({});

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

    // Startet die Bearbeitung eines bestimmten Users
    const startEditing = (user) => {
        setEditingUserId(user.id);
        setEditedUser(user);
    };

    const cancelEditing = () => {
        setEditingUserId(null);
        setEditedUser({});
    };

    // Speichert die geänderten Daten für einen User
    const saveUserEdition = async (userId) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.put(
                `http://localhost:8000/api/users/${userId}/`,
                editedUser,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            // Aktualisiert den lokalen State (Liste aller Benutzer) mit den neuen Daten
            setUserDetails((prevUsers) =>
                prevUsers.map((user) => (user.id === userId ? response.data : user))
            );
            setEditingUserId(null);
            setEditedUser({});
        } catch (err) {
            console.error('Fehler beim Aktualisieren des Benutzers:', err);
            setError('Fehler beim Aktualisieren des Benutzers.');
        }
    };

    return (
        <div className="home-wrapper">
            <header className="home-header">
                <div className="header-content">
                    <h1>Willkommen!</h1>
                    <p>Schön, dass du wieder da bist.</p>
                </div>
                <button onClick={handleLogout} className="logout-button">
                    Abmelden
                </button>
            </header>
            
            {loading && <p className="info">Lade Daten...</p>}
            {error && <p className="error">{error}</p>}
            
            {userDetails && Array.isArray(userDetails) ? (
                <section className="user-list">
                    <h2>Alle Benutzer</h2>
                    <ul>
                        {userDetails.map((user) => (
                            <li key={user.id} className="user-list-item">
                                {editingUserId === user.id ? (
                                    <div className="edit-form">
                                        <input
                                            type="text"
                                            value={editedUser.username || ''}
                                            onChange={(e) =>
                                                setEditedUser({ ...editedUser, username: e.target.value })
                                            }
                                            placeholder="Benutzername"
                                        />
                                        <input
                                            type="email"
                                            value={editedUser.email || ''}
                                            onChange={(e) =>
                                                setEditedUser({ ...editedUser, email: e.target.value })
                                            }
                                            placeholder="Email"
                                        />
                                        <input
                                            type="text"
                                            value={editedUser.first_name || ''}
                                            onChange={(e) =>
                                                setEditedUser({ ...editedUser, first_name: e.target.value })
                                            }
                                            placeholder="Vorname"
                                        />
                                        <input
                                            type="text"
                                            value={editedUser.last_name || ''}
                                            onChange={(e) =>
                                                setEditedUser({ ...editedUser, last_name: e.target.value })
                                            }
                                            placeholder="Nachname"
                                        />
                                        <button onClick={() => saveUserEdition(user.id)}>Speichern</button>
                                        <button onClick={cancelEditing}>Abbrechen</button>
                                    </div>
                                ) : (
                                    <div className="user-row">
                                        <span>
                                            <strong>{user.username}</strong> – {user.email} – {user.first_name} {user.last_name}
                                        </span>
                                        <button onClick={() => startEditing(user)}>Bearbeiten</button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            ) : userDetails ? (
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
            ) : null}

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