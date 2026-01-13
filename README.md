# 🎩 BPDF - Bon Père De Famille 💰

Un jeu de gestion de patrimoine où vous affrontez 7 amis pour devenir le meilleur investisseur !

## 🎮 Concept du jeu

Gérez votre portefeuille de **20 à 80 ans** sur **12 rounds** (5 ans par round).

**Objectif** : Avoir le plus gros patrimoine à 80 ans !

### 🎯 Règles du jeu

- **Capital de départ** : 10 000€ à 20 ans
- **12 rounds** de 5 ans chacun (20→25→30→...→80 ans)
- **8 joueurs** : Vous + 7 bots avec des personnalités uniques
- **6 actifs disponibles** : Euro 💶, Immobilier 🏠, Actions 📈, Obligations 📄, Bitcoin ₿, Or 🥇

### 🎲 Mécanique de jeu

À chaque round :
1. **Consultation des événements possibles** : 10 événements peuvent se produire avec différentes probabilités
2. **Allocation de patrimoine** : Répartissez votre capital en % sur les 6 actifs
3. **Résolution** : Les événements se réalisent selon leur probabilité, les actifs évoluent
4. **Classement** : Découvrez qui a le meilleur portefeuille

## 👥 Les 8 personnages

Chaque personnage a des contraintes d'investissement uniques :

- **Adrien** 👨‍💼 : Min 10% en immobilier
- **Antoine** 🚀 : Interdit d'avoir des euros (0% max)
- **Boris** 🛡️ : Prudent mais s'enflamme parfois
- **Jason** ₿ : Min 1% en Bitcoin
- **JB** 🏦 : Très prudent
- **Mako** 📊 : Achète ce qui a pumpé au round précédent
- **Maxime** 🦈 : Preneur de risques
- **Regio** ⚖️ : Toujours exactement 5% en Bitcoin

## 🎨 Design

Interface inspirée du **Monopoly** avec une esthétique finance fun et accessible.

## 🚀 Installation et Démarrage

```bash
# Installer les dépendances
npm install

# Lancer le jeu en mode développement
npm run dev

# Le jeu sera accessible sur http://localhost:5173
```

## 🏗️ Build pour production

```bash
npm run build
npm run preview
```

## 📊 Actifs et leurs caractéristiques

| Actif | Rendement/an | Volatilité | Description |
|-------|--------------|------------|-------------|
| 💶 Euro | 0% | 2% | Liquidités sûres mais pas de rendement |
| 🏠 Immobilier | +5% | 10% | Investissement stable |
| 📈 Actions | +7% | 18% | Potentiel de croissance élevé |
| 📄 Obligations | +3% | 5% | Sécurité et revenus réguliers |
| ₿ Bitcoin | +15% | 50% | Très volatile, potentiel explosif |
| 🥇 Or | +2% | 12% | Valeur refuge |

## 📰 Événements

Plus de 30 événements possibles, allant du réaliste au complètement délirant :
- 🇫🇷 "La France se dote d'une réserve stratégique de Bitcoin" (2% de chance, BTC ×10)
- 💥 "Crise immobilière" (10% de chance, Immo -50%)
- 🥖 "La baguette devient une monnaie d'échange" (1% de chance, Euro -90%)
- Et bien d'autres...

## 🎯 Stratégie

- Analysez les probabilités des événements
- Adaptez votre allocation aux risques
- Respectez vos contraintes de personnage
- Trouvez le bon équilibre risque/rendement
- Méfiez-vous de la volatilité !

## 🏆 Fin de partie

Après 12 rounds, découvrez :
- Votre classement final
- Un graphique d'évolution de tous les joueurs
- Le podium des 3 meilleurs
- Les statistiques détaillées

---

**Amusez-vous bien et que le meilleur BPDF gagne ! 🎉**
