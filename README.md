# User Dashboard App

## Einleitung

Die **User Dashboard App** ist eine Webanwendung, die es Benutzern ermöglicht, sich zu authentifizieren und ihre persönlichen Daten direkt auf der Home-Seite einzusehen. Zusätzlich haben Administratoren die Möglichkeit, eine Übersicht aller registrierten Benutzer abzurufen. Das Backend wird mit Django und Django REST Framework (DRF) realisiert, während das Frontend mittels React umgesetzt wurde.

## Technologien

- **Backend:**  
  - Django
  - Django REST Framework (DRF)
  - Token-basierte Authentifizierung

- **Frontend:**  
  - React
  - JavaScript
  - Axios

- **Datenbank:**  
  - SQLite (Standard, kann bei Bedarf angepasst werden)


## Installation und Setup

### Backend

1. **Repository klonen:**

   ```bash
   git clone <repository_url>
   cd backend
   ```

2. **Virtuelle Umgebung erstellen und aktivieren:**

   - Auf Linux/macOS:
     ```bash
     python -m venv venv
     source venv/bin/activate
     ```
   
   - Auf Windows:
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```

3. **Abhängigkeiten installieren:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Datenbank-Migrationen durchführen:**

   ```bash
   python manage.py migrate
   ```

5. **Entwicklungsserver starten:**

   ```bash
   python manage.py runserver
   ```

### Frontend

1. **Wechsle in das Frontend-Verzeichnis:**

   ```bash
   cd frontend
   ```

2. **Abhängigkeiten installieren:**

   Mit npm:
   ```bash
   npm install
   ```
   Oder mit yarn:
   ```bash
   yarn install
   ```

3. **React-Entwicklungsserver starten:**

   Mit npm:
   ```bash
   npm start
   ```
   Oder mit yarn:
   ```bash
   yarn start
   ```

## API Endpoints

- **Benutzerdaten abrufen:**
  - **Methode:** GET  
  - **Endpunkt:** `/api/user_data/`  
  - **Beschreibung:** Liefert die persönlichen Daten des aktuell authentifizierten Benutzers zurück.  
  - **Authentifizierung:** Token erforderlich

- **Alle Benutzer abrufen (Admin):**
  - **Methode:** GET  
  - **Endpunkt:** `/api/users/`  
  - **Beschreibung:** Gibt eine Liste aller Benutzer zurück. Nur für Administratoren verfügbar.
  - **Authentifizierung:** Token erforderlich

## Nutzung

1. **Benutzeranmeldung:**  
   Melden Sie sich über die Login-Seite an, um ein Authentifizierungs-Token zu erhalten. Dieses Token wird im LocalStorage gespeichert und ermöglicht den Zugriff auf geschützte API-Endpunkte.

2. **Persönliche Daten ansehen:**  
   Nach erfolgreicher Anmeldung wird auf der Home-Seite (React-Komponente in `Home.js`) automatisch ein API-Call an `/api/user_data/` durchgeführt und die erhaltenen Benutzerdaten werden angezeigt.

3. **Admin-Funktionalität:**  
   Administratoren können über einen speziellen Button eine Liste aller Benutzer abrufen und anzeigen lassen.

## Weitere Hinweise

- **Authentifizierung:**  
  Prüfen Sie, ob das Token korrekt im Authorization-Header übergeben wird und ob der Benutzer authentifiziert ist. Andernfalls wird der Zugriff auf geschützte Routen verweigert.

- **Fehlerbehandlung:**  
  Eventuelle Fehler werden in der Browser-Konsole (Frontend) bzw. im Terminal (Backend) protokolliert. Nutzen Sie diese Hinweise zur Fehlersuche.

- **Anpassungen:**  
  Konfigurationen wie Datenbankeinstellungen im Backend (in `settings.py`) oder Skriptkonfigurationen im Frontend (`package.json`) sollten bei Bedarf an die individuellen Projektanforderungen angepasst werden.

- **Deployment:**  
  Vor einem Produktions-Deployment sollten zusätzliche Sicherheitseinstellungen und ein geeigneter Webserver (z.B. Gunicorn für Django, Nginx als Reverse Proxy) konfiguriert werden.

## Tests

- **Backend-Tests:**  
  Erstellen Sie Unit-Tests für Ihre Django-Views und -Modelle, um die Funktionalität der API-Endpunkte sicherzustellen.

- **Frontend-Tests:**  
  Nutzen Sie Testing Libraries (z.B. Jest, React Testing Library), um Komponenten und deren Interaktion zu testen.

## Contributing

Beiträge zum Projekt sind herzlich willkommen! Bitte beachten Sie folgende Richtlinien:

1. Forken Sie das Repository.
2. Erstellen Sie einen Feature-Branch (`git checkout -b feature/your-feature`).
3. Commiten Sie Ihre Änderungen (`git commit -m 'Add some feature'`).
4. Pushen Sie Ihren Branch (`git push origin feature/your-feature`).
5. Eröffnen Sie einen Pull Request.



---

Dieses README bietet einen umfassenden Überblick über die Zielsetzung, den Aufbau und die Bedienung der **User Dashboard App**. Bei weiteren Fragen konsultieren Sie bitte die Dokumentation der verwendeten Technologien oder eröffnen Sie ein Issue im Repository.