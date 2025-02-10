"""
Django settings for myproject.

Diese Datei enthält alle Konfigurationseinstellungen für dein Django-Projekt.
Sie definiert unter anderem die Pfade, installierten Apps, Middleware, Datenbankeinstellungen,
Authentifizierungs- sowie Internationalisierungsoptionen.
"""

from pathlib import Path
from datetime import timedelta

# BASE_DIR definiert den Basisordner des Projekts. Alle Pfadangaben werden relativ zu diesem Verzeichnis erstellt.
BASE_DIR = Path(__file__).resolve().parent.parent


# SECURITY WARNING: behalte diesen geheimen Schlüssel für den Produktionsbetrieb geheim!
# SECRET_KEY wird zur Signierung von Cookies und anderen kryptographischen Operationen verwendet.
SECRET_KEY = 'django-insecure-v04mu7=k^#%t0afe3lbk&0!@r(w!dc5d!yz1uo+^_*51kv!m5b'

# DEBUG: Wenn True, werden detaillierte Fehlermeldungen angezeigt.
# Für den Produktionsbetrieb sollte dieser Wert auf False gesetzt werden.
DEBUG = True

# ALLOWED_HOSTS: Liste der Hosts/Domains, die Zugriff auf die Anwendung haben dürfen.
# In Entwicklung kann diese Liste leer bleiben oder z.B. ['localhost', '127.0.0.1'] enthalten.
ALLOWED_HOSTS = []


# INSTALLED_APPS: Hier werden alle Django-Apps und Drittanbieter-Apps aufgelistet, die in diesem Projekt verwendet werden.
INSTALLED_APPS = [
    'django.contrib.admin',           # Admin-Oberfläche von Django
    'django.contrib.auth',            # Authentifizierungssystem (Benutzer, Gruppen usw.)
    'django.contrib.contenttypes',    # Benötigt für das System der Berechtigungen
    'django.contrib.sessions',        # Sitzungsverwaltung
    'django.contrib.messages',        # Nachrichten-Framework (für temporäre Nachrichten z.B. nach einem Redirect)
    'django.contrib.staticfiles',     # Verwaltung von statischen Dateien (CSS, JavaScript, Bilder)
    'rest_framework',
    'corsheaders',
    'users',
]


# MIDDLEWARE: Liste der Middleware-Komponenten, die jede Anfrage/Antwort durchläuft.
# Middleware sind Hooks, die den Request/Response-Prozess anpassen oder überwachen können.
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',             # Sicherheitsbezogene Einstellungen, z.B. HSTS
    'django.contrib.sessions.middleware.SessionMiddleware',          # Sitzungsverwaltung via Cookies
    'django.middleware.common.CommonMiddleware',                     # Diverse Standard-Sicherheitsmaßnahmen und URL-Handling
    'django.middleware.csrf.CsrfViewMiddleware',                     # Schutz vor Cross-Site Request Forgery
    'django.contrib.auth.middleware.AuthenticationMiddleware',       # Verknüpft Benutzer mit jeder Anfrage
    'django.contrib.messages.middleware.MessageMiddleware',          # Ermöglicht das Arbeiten mit Nachrichten
    'django.middleware.clickjacking.XFrameOptionsMiddleware',        # Schutz vor Clickjacking-Angriffen
]


# ROOT_URLCONF: Gibt das Modul an, das die URL-Konfiguration enthält.
ROOT_URLCONF = 'backend.urls'


# TEMPLATES: Konfiguration der Templates (HTML-Dateien), die Django nutzt.
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',  # Standard-Template-Engine
        # DIRS: Verzeichnisse, in denen Django nach Templates sucht. Hier kannst du eigene Templateordner angeben.
        'DIRS': [],  
        'APP_DIRS': True,  # Wenn True, sucht Django auch in jedem installierten App-Verzeichnis nach einem Ordner "templates".
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',       # Fügt Debug-Informationen dem Kontext hinzu
                'django.template.context_processors.request',     # Ermöglicht den Zugriff auf das Request-Objekt in Templates
                'django.contrib.auth.context_processors.auth',    # Fügt Benutzerinformationen (request.user) hinzu
                'django.contrib.messages.context_processors.messages',  # Ermöglicht das Anzeigen von Nachrichten
            ],
        },
    },
]


# WSGI_APPLICATION: Pfad zum WSGI-Application-Objekt, das als Einstiegspunkt für WSGI-fähige Webserver dient.
WSGI_APPLICATION = 'backend.wsgi.application'


# DATABASES: Konfiguration der Datenbank. Hier verwenden wir SQLite als Beispiel.
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',       # Treiber für SQLite
        'NAME': BASE_DIR / 'db.sqlite3',                # Pfad zur SQLite-Datenbankdatei
    }
}


# AUTH_PASSWORD_VALIDATORS: Liste der Passwort-Validatoren, die die Sicherheit der Benutzerpasswörter gewährleisten.
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationale Einstellungen

# LANGUAGE_CODE: Standardspracheinstellung für dieses Projekt.
LANGUAGE_CODE = 'de-de'  # Hier wird Deutsch als Sprache definiert.

# TIME_ZONE: Definiert die Zeitzone.
TIME_ZONE = 'Europe/Berlin'  # Zeitzone für Deutschland/Berlin

# USE_I18N: Aktiviert die Internationalisierung (Übersetzungen) in Django.
USE_I18N = True

# USE_L10N: Aktiviert die Lokalisierung (Anpassung an lokale Formate z.B. Zahlen, Datumsangaben).
USE_L10N = True

# USE_TZ: Aktiviert die Zeitzonen-Unterstützung.
USE_TZ = True


# STATIC_URL: Gibt den URL-Pfad an, unter dem statische Dateien (z. B. CSS, JavaScript, Bilder) erreichbar sind.
STATIC_URL = '/static/'

# STATICFILES_DIRS: Zusätzliche Verzeichnisse, in denen Django nach statischen Dateien sucht.
STATICFILES_DIRS = [BASE_DIR / 'static']


# Media-Dateien (uploads) konfigurieren
MEDIA_URL = '/media/'  # URL, unter der Medien-Inhalte (z.B. hochgeladene Bilder) erreichbar sind.
MEDIA_ROOT = BASE_DIR / 'media'  # Pfad zum Verzeichnis, in dem die Medien-Dateien auf dem Server gespeichert werden.


# DEFAULT_AUTO_FIELD: Definiert den Standard-Feldtyp für Primärschlüssel, wenn kein Feldtyp explizit angegeben wird.
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

AUTH_USER_MODEL = 'users.CustomUser'

# REST Framework Konfiguration: Hier wird festgelegt, dass die JWT-Authentication genutzt wird.
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
}

# Konfiguration von Simple JWT
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),  # Lebensdauer des Access Tokens
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),      # Lebensdauer des Refresh Tokens
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": True,
}
