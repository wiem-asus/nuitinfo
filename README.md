# Formulaire de Contact Magique 

Un formulaire de contact interactif et ludique avec des Easter Eggs cachés et des animations spectaculaires !

##  Fonctionnalités

### Formulaire
- ✅ Validation en temps réel des champs
- ✅ Compteur de caractères pour le message
- ✅ Messages d'erreur personnalisés
- ✅ Envoi par EmailJS
- ✅ Design glassmorphism moderne
- ✅ Animations fluides et particules

### Animations & Effets
-  Particules animées en arrière-plan
-  Curseur personnalisé
-  Confettis lors de l'envoi
-  Feux d'artifice dans la popup de succès
-  Modes spéciaux (Party, Néon, Disco, Magic)

### Easter Eggs (7 au total)
-  Code secret au clavier
-  Clics multiples sur le titre
-  Mots magiques dans le message
-  Mouvements rapides de souris
-  Double-clics sur emojis
-  Hover prolongé sur le bouton

## Structure du Projet

```
projet/
├── index.html          # Structure HTML
├── formcss.css         # Styles CSS
└── scriptform.js       # Logique JavaScript
```

##  Installation

1. **Télécharger les fichiers**
   - Télécharge les 3 fichiers dans le même dossier

2. **Configuration EmailJS**
   - Inscris-toi sur [EmailJS](https://www.emailjs.com/)
   - Crée un service email
   - Crée un template
   - Remplace dans `scriptform.js` :
     ```javascript
     const EMAILJS_CONFIG = {
         serviceID: 'ton_service_id',
         templateID: 'ton_template_id',
         publicKey: 'ta_public_key'
     };
     ```

3. **Lancer le formulaire**
   - **Option 1** : Double-clique sur `index.html`
   - **Option 2** : Utilise Live Server dans VS Code
   - **Option 3** : Ouvre avec ton navigateur favori

##  Guide des Easter Eggs

### Easter Egg #1 : Code Secret 
**Comment débloquer :** Tape sur ton clavier : `↑ ↑ ↓ ↓`
**Effet :** Active le mode Party avec effet arc-en-ciel

### Easter Egg #2 : Clics Rapides �
**Comment débloquer :** Clique 5 fois rapidement sur le titre
**Effet :** Active le mode Néon avec pulsation lumineuse

### Easter Egg #3 : Mot Magique �
**Comment débloquer :** Tape le mot "magic" dans le message
**Effet :** Active le mode Magic avec dégradés de couleurs changeants

### Easter Egg #4 : Mot Konami �
**Comment débloquer :** Tape le mot "konami" dans le message
**Effet :** Active le mode Disco avec rotation

### Easter Egg #5 : Souris Folle �
**Comment débloquer :** Secoue ta souris rapidement (30 mouvements brusques)
**Effet :** Crée une explosion de particules colorées

### Easter Egg #6 : Emojis Magiques �
**Comment débloquer :** Double-clique sur les emojis ✉️ ou ✨ dans le titre
**Effet :** Change aléatoirement les emojis

### Easter Egg #7 : Turbo Mode 
**Comment débloquer :** Survole le bouton "Envoyer" pendant 3 secondes
**Effet :** Active le Turbo Mode

###  Mode Ultimate
**Déblocage :** Trouve tous les 7 Easter Eggs
**Effet :** Animation ultime avec confettis et effets arc-en-ciel + shake !

##  Personnalisation

### Modifier les couleurs
Dans `formcss.css`, change le gradient principal :
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Modifier les emojis des particules
Dans `scriptform.js`, ligne ~75 :
```javascript
const emojis = ['✨', '⭐', '💫', '🌟', '✨', '🎨', '🎭', '🎪'];
```

### Ajouter un nouveau Easter Egg
```javascript
// Exemple : Easter Egg sur triple-clic
let tripleClickCount = 0;
document.addEventListener('click', () => {
    tripleClickCount++;
    if (tripleClickCount === 3) {
        unlockEasterEgg('🎉 Nouveau Easter Egg!');
        // Ton effet ici
    }
});
```

##  Responsive

Le formulaire s'adapte automatiquement aux mobiles :
- Curseur personnalisé désactivé sur mobile
- Tailles de police adaptées
- Padding réduit
- Layout optimisé

##  Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Animations, glassmorphism, flexbox
- **JavaScript (ES6+)** : Logique interactive
- **EmailJS** : Envoi d'emails sans backend
- **Google Fonts** : Police Poppins

##  Configuration EmailJS

1. Va sur [EmailJS](https://www.emailjs.com/)
2. Crée un compte gratuit
3. Ajoute un service email (Gmail, Outlook, etc.)
4. Crée un template avec ces variables :
   - `{{from_name}}` : Nom de l'expéditeur
   - `{{from_email}}` : Email de l'expéditeur
   - `{{subject}}` : Sujet du message
   - `{{message}}` : Contenu du message
5. Récupère ton Service ID, Template ID et Public Key
6. Remplace dans `scriptform.js`

##  Dépannage

### Le formulaire ne s'affiche pas
- Vérifie que les 3 fichiers sont dans le même dossier
- Vérifie les noms de fichiers (sensibles à la casse)
- Ouvre la console (F12) pour voir les erreurs

### EmailJS ne fonctionne pas
- Vérifie tes identifiants dans `scriptform.js`
- Vérifie que le script EmailJS est chargé
- Vérifie ta connexion internet

### Les Easter Eggs ne fonctionnent pas
- Rafraîchis la page (F5)
- Vérifie la console pour les erreurs
- Assure-toi d'utiliser les bonnes touches/actions

##  Licence

Ce projet est libre d'utilisation pour des projets personnels et commerciaux.

##  Auteur

Créé avec ❤️ et beaucoup de ☕

##  Remerciements

- EmailJS pour le service d'envoi d'emails
- Google Fonts pour la police Poppins
- La communauté open source

---

**Amuse-toi bien à trouver tous les Easter Eggs ! **
