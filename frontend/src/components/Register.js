import React, { useState } from 'react';
// Importiere React und useState, um den lokalen State in der Komponente zu verwalten.
import axios from 'axios';
// Importiere Axios für HTTP-Anfragen an das Backend.
import { useNavigate } from 'react-router-dom';
// useNavigate ermöglicht das programmatische Wechseln zwischen Routen (Seiten).
import './Register.css';
// Importiere das CSS-Stylesheet, das das Layout und Design dieser Komponente festlegt.

function Register() {
    // Die Register-Komponente stellt das Registrierungsformular dar.
    const navigate = useNavigate();
    // useNavigate wird verwendet, um den Benutzer nach erfolgreicher Registrierung zur Login-Seite zu leiten.
    const [firstName, setFirstName] = useState('');
    // firstName: Speichert den eingegebenen Vornamen.
    // Dieser Wert wird genutzt, um den neuen Benutzer im Backend mit einem Vornamen zu registrieren.
    const [lastName, setLastName]   = useState('');
    // lastName: Enthält den vom Nutzer eingegebenen Nachnamen, der für die Registrierung benötigt wird.
    const [username, setUsername]   = useState('');
    // username: Der vom Nutzer gewählte Benutzername.
    // Dieser muss einzigartig sein und wird als Login-Kennung genutzt.
    const [email, setEmail]         = useState('');
    // email: Speichert die gültige E-Mail-Adresse.
    // Diese wird zum Versenden von Benachrichtigungen und zur Verifikation verwendet.
    const [password, setPassword]   = useState('');
    // password: Lagert das eingegebene Passwort.
    // Dieses wird bei der Registrierung sicher an das Backend gesendet.
    const [error, setError]         = useState('');
    // error: Hält Fehlermeldungen, wenn Eingaben unvollständig sind oder der Server einen Fehler meldet.
    const [success, setSuccess]     = useState('');
    // success: Speichert Erfolgsmeldungen, die dem Nutzer bestätigen, dass die Registrierung erfolgreich verlief.
    const [isLoading, setIsLoading] = useState(false);
    // isLoading: Zeigt an, ob eine Anfrage an das Backend gerade läuft.
    // Dies verhindert mehrfaches Absenden des Formulars und gibt dem Nutzer visuelles Feedback.

    const handleSubmit = async (e) => {
        // Verhindere das Standard-Formularverhalten (Seitenreload),
        // damit wir die Eingaben asynchron mit JavaScript verarbeiten können.
        e.preventDefault();
        
        // Validierung: Prüfe, ob alle Eingabefelder ausgefüllt wurden.
        // Wenn eines oder mehrere Felder fehlen, wird eine Fehlermeldung angezeigt und der Registrierungsprozess abgebrochen.
        if (!firstName || !lastName || !username || !email || !password) {
            setError('Bitte füllen Sie alle Felder aus');
            return;
        }
        
        // Bereite das Formular vor: Entferne vorherige Fehler- und Erfolgsmeldungen
        // und aktiviere den Ladeindikator, um dem Nutzer zu signalisieren, dass die Registrierung läuft.
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            // Sende eine POST-Anfrage an den Registrierungs-Endpunkt des Backends.
            // In der Request-Body wird ein Objekt übergeben, das alle notwendigen Registrierungsdaten enthält.
            const response = await axios.post('http://localhost:8000/api/register/', {
                first_name: firstName,
                last_name: lastName,
                username,
                email,
                password
            });

            // Aktualisiere den Erfolg-Status, um dem Nutzer mitzuteilen, dass die Registrierung erfolgreich war.
            setSuccess('Registrierung erfolgreich! Sie werden zum Login weitergeleitet...');

            // Nach einer kurzen Wartezeit von 1,5 Sekunden, die dem Nutzer die Möglichkeit gibt, die Erfolgsmeldung zu lesen,
            // wird der Benutzer zur Login-Seite weitergeleitet.
            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 1500);
        } catch (err) {
            // Fehlerbehandlung: Unterscheide zwischen verschiedenen Fehlerarten.
            if (err.response) {
                // Wenn der Server eine Antwort mit einem Fehlerstatus liefert,
                // wird die vom Server zurückgegebene Fehlermeldung (oder ein Standardtext) verwendet.
                setError(err.response.data.error || 'Ein Fehler ist aufgetreten');
            } else if (err.request) {
                // Wird keine Antwort vom Server empfangen, liegt wahrscheinlich ein Netzwerkproblem vor.
                setError('Verbindung zum Server konnte nicht hergestellt werden');
            } else {
                // Für alle anderen, unerwarteten Fehler:
                setError('Ein unerwarteter Fehler ist aufgetreten');
            }
        } finally {
            // Deaktiviere den Ladeindikator, da die Anfrage abgeschlossen ist – unabhängig davon, ob sie erfolgreich war oder nicht.
            setIsLoading(false);
        }
    };

    return (
        <div className="register-container">
            {/* Hauptcontainer: Umgibt das gesamte Registrierungsformular und sorgt für das Layout */}
            <div className="register-header">
                {/* Kopfbereich: Zeigt den Titel "Registrierung" und eine kurze Anleitung */}
                <h2>Registrierung</h2>
                <p>Erstellen Sie ein neues Konto</p>
            </div>
            
            {/* Formular-Bereich: Benutzer geben hier ihre persönlichen Daten ein */}
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

                {/* Sende-Button: Sendet das Formular und zeigt einen dynamischen Text basierend auf dem Ladezustand */}
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