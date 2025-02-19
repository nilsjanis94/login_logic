import React, { useState } from 'react';
import './UserEditModal.css';

function UserEditModal({ user, onSave, onCancel }) {
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedUser);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>Benutzer bearbeiten</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Benutzername</label>
                        <input
                            type="text"
                            name="username"
                            value={editedUser.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={editedUser.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Vorname</label>
                        <input
                            type="text"
                            name="first_name"
                            value={editedUser.first_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Nachname</label>
                        <input
                            type="text"
                            name="last_name"
                            value={editedUser.last_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="submit">Speichern</button>
                        <button type="button" onClick={onCancel}>Abbrechen</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserEditModal; 