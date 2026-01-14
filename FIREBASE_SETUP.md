# 🔥 Configuration Firebase pour BPDF

Ce guide explique comment configurer Firebase pour avoir une base de données persistante des événements.

## 📋 Prérequis

- Un compte Google
- Le projet BPDF installé localement

## 🚀 Étapes de configuration

### 1. Créer un projet Firebase

1. Va sur [Firebase Console](https://console.firebase.google.com/)
2. Clique sur **"Ajouter un projet"**
3. Nomme le projet : **bpdf-game** (ou autre nom)
4. Désactive Google Analytics (pas nécessaire)
5. Clique sur **"Créer le projet"**

### 2. Configurer Firestore Database

1. Dans le menu de gauche, clique sur **"Firestore Database"**
2. Clique sur **"Créer une base de données"**
3. Choisis **"Commencer en mode production"** (on configurera les règles après)
4. Sélectionne une région proche (ex: `eur3 (europe-west)`)
5. Clique sur **"Activer"**

### 3. Configurer les règles de sécurité Firestore

1. Dans Firestore, va dans l'onglet **"Règles"**
2. Remplace les règles par ceci :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Les événements peuvent être lus par tout le monde
    match /events/{eventId} {
      allow read: if true;
      // Seuls les utilisateurs authentifiés peuvent écrire
      allow write: if request.auth != null;
    }
  }
}
```

3. Clique sur **"Publier"**

### 4. Activer l'authentification

1. Dans le menu de gauche, clique sur **"Authentication"**
2. Clique sur **"Commencer"**
3. Dans l'onglet **"Sign-in method"**, active **"Email/Password"**
4. Va dans l'onglet **"Users"**
5. Clique sur **"Ajouter un utilisateur"**
6. Entre ton email et mot de passe pour l'admin
7. Clique sur **"Ajouter un utilisateur"**

⚠️ **Garde ces identifiants en sécurité !** Ce sera ton accès admin.

### 5. Obtenir la configuration Firebase

1. Dans les paramètres du projet (⚙️ en haut à gauche)
2. Clique sur **"Paramètres du projet"**
3. Scroll jusqu'à **"Vos applications"**
4. Clique sur l'icône **Web** `</>`
5. Nomme l'app : **bpdf-web**
6. Clique sur **"Enregistrer l'application"**
7. **Copie la configuration** qui s'affiche

### 6. Configurer le projet BPDF

1. Ouvre le fichier `src/firebase/config.js`
2. Remplace les valeurs par ta vraie configuration :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "bpdf-game.firebaseapp.com",
  projectId: "bpdf-game",
  storageBucket: "bpdf-game.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### 7. Initialiser la base de données

1. Démarre ton app : `npm run dev`
2. Va sur `/admin`
3. Connecte-toi avec ton email/password admin
4. Clique sur **"🔄 Initialiser BD"**
5. Confirme l'action

✅ **C'est fait !** Les 200 événements sont maintenant dans Firebase.

## 🌐 Déploiement

### Option A : Firebase Hosting (Recommandé)

```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Se connecter
firebase login

# Initialiser Firebase dans le projet
firebase init

# Sélectionner :
# - Hosting
# - Use existing project -> sélectionne ton projet
# - Public directory -> dist
# - Single-page app -> Yes
# - GitHub actions -> No

# Build le projet
npm run build

# Déployer
firebase deploy
```

Ton site sera accessible sur : `https://bpdf-game.web.app`

### Option B : Vercel

1. Va sur [vercel.com](https://vercel.com)
2. Importe ton repo GitHub
3. Framework Preset : **Vite**
4. Deploy

### Option C : Netlify

1. Va sur [netlify.com](https://netlify.com)
2. Drag & drop le dossier `dist` après `npm run build`

## 🔐 Sécurité de l'URL admin

L'URL `/admin` est protégée par authentification, mais tu peux la rendre encore plus sécurisée :

### Option 1 : URL secrète

Modifie `src/App.jsx` :

```javascript
<Route path="/secret-admin-xyz-123" element={<AdminPanel />} />
```

Puis change le lien dans le menu principal.

### Option 2 : Déploiement séparé

Déploie deux versions :
- **Version joueurs** : Sans le lien admin dans le menu
- **Version admin** : Sur un autre domaine (ex: admin-bpdf.web.app)

## 📊 Utilisation

### Pour les joueurs
1. Accèdent au site : `https://ton-site.web.app`
2. Jouent normalement
3. Voient toujours les événements à jour

### Pour toi (admin)
1. Accèdes à : `https://ton-site.web.app/admin`
2. Connecte-toi avec ton email/password
3. Modifie les événements
4. Les changements sont instantanés pour tous

## ⚠️ Limitations gratuites Firebase

- **Firestore** : 50k lectures/jour, 20k écritures/jour
- **Authentication** : Illimité
- **Hosting** : 10 GB stockage, 360 MB/jour transfer

Pour 8 joueurs, c'est largement suffisant !

## 🆘 Problèmes courants

### "Firebase: Error (auth/user-not-found)"
→ Va dans Firebase Console > Authentication > Users et ajoute un utilisateur

### "Missing or insufficient permissions"
→ Vérifie les règles Firestore (étape 3)

### "Firebase: Error (auth/invalid-api-key)"
→ Vérifie que tu as bien copié la vraie config dans `src/firebase/config.js`

### Les événements ne se chargent pas
→ Clique sur "🔄 Initialiser BD" dans l'admin panel

## 📝 Notes

- Les modifications d'événements sont **instantanées** pour tous les joueurs
- La base de données est **partagée** entre tous
- Tu peux exporter/importer des événements au format JSON pour backup
