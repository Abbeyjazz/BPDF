# 🚀 2 DERNIÈRES ÉTAPES (3 minutes max)

Ta config Firebase est installée ! Il ne reste que 2 petites choses à faire manuellement dans la console Firebase.

## 📍 Étape 1 : Activer l'authentification (1 min)

1. Va sur [console.firebase.google.com](https://console.firebase.google.com)
2. Ouvre ton projet **bpdf-game**
3. Menu gauche → **Authentication**
4. Clique sur **"Commencer"**
5. Dans l'onglet **"Sign-in method"**
6. Clique sur **"Email/Password"**
7. Active le premier switch (Email/Password)
8. Clique sur **"Enregistrer"**

## 👤 Étape 1.5 : Créer ton compte admin (30 sec)

9. Reste dans **Authentication**, va dans l'onglet **"Users"**
10. Clique sur **"Ajouter un utilisateur"**
11. Entre ton email : `ton-email@exemple.com`
12. Entre un mot de passe (au moins 6 caractères)
13. Clique sur **"Ajouter un utilisateur"**

⚠️ **IMPORTANT** : Note bien ton email et mot de passe, tu en auras besoin pour te connecter à l'admin !

## 🔒 Étape 2 : Configurer les règles Firestore (1 min)

14. Menu gauche → **Firestore Database**
15. Onglet **"Règles"** (en haut)
16. **SUPPRIME** tout le contenu actuel
17. **COPIE-COLLE** exactement ceci :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /events/{eventId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

18. Clique sur **"Publier"**

## ✅ C'EST FINI !

Maintenant teste :

```bash
npm run dev
```

1. Va sur `http://localhost:5173`
2. Le jeu charge les événements (pour l'instant les 200 par défaut du code)
3. Va sur `http://localhost:5173/admin`
4. Connecte-toi avec ton email/password
5. Clique sur **"🔄 Initialiser BD"**
6. ✅ Les 200 événements sont maintenant dans Firebase !

## 🌐 Déployer (optionnel)

Si tu veux déployer en ligne :

```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Se connecter
firebase login

# Initialiser
firebase init hosting
# Sélectionne :
# - Use existing project -> bpdf-game
# - Public directory -> dist
# - Single-page app -> Yes
# - Set up automatic builds -> No

# Build et deploy
npm run build
firebase deploy
```

Ton site sera sur : `https://bpdf-game.web.app` 🎉
