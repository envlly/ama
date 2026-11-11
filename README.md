# AMA — Univers Anime 🌸

Site web fait pour un TP de classe. C'est une page d'accueil d'un site d'animés (comme une sorte de mini Crunchyroll) avec des avis, des notes et des infos sur les animes du moment.

## Ce que contient le site

- **`index.html`** → la page elle-même (toute la structure : le menu, la section "Anime à l'affiche", les commentaires...)
- **`style.css`** → tout le design (couleurs, polices, animation du header, responsive pour le téléphone)
- **`script.js`** → les effets interactifs (boutons du menu, animations au scroll...)

## Ce qui a été fait techniquement

### 1. La vignette cliquable (Demon Slayer)

Au début, l'affiche de Demon Slayer était juste une image dans la page : on ne pouvait rien faire en cliquant dessus.

On a **enveloppé l'image dans un lien** (`<a>`) qui pointe vers la bande-annonce YouTube :

```html
<a href="https://www.youtube.com/embed/VGGGg4azyso?autoplay=1" target="_blank">
    <img src="https://cdn.myanimelist.net/images/anime/1171/109222.jpg" alt="Affiche de Demon Slayer">
</a>
```

- Le `target="_blank"` fait que la vidéo s'ouvre dans un **nouvel onglet** (on ne quitte pas le site)
- L'URL utilise `youtube.com/embed/...` qui est le format "lecteur vidéo" de YouTube, avec `?autoplay=1` pour que la vidéo démarre toute seule

### 2. L'effet au survol (CSS)

Dans `style.css`, on a ajouté une règle pour que l'image réagisse à la souris :

```css
.review-feature a img {
    cursor: pointer;          /* le curseur devient une main */
    transition: transform 0.3s;  /* animation douce */
}
.review-feature a img:hover {
    transform: scale(1.05);   /* l'image grossit légèrement */
}
```

Le `transition` rend l'agrandissement fluide au lieu d'un changement brutal.

### 3. Correction des noms de fichiers

Un bug est arrivé en cours de projet : le HTML cherchait des fichiers qui s'appelaient `style.css` et `script.js`, mais les vrais fichiers s'appelaient `accueil.css` et `accueil.js`. Résultat : la page s'affichait **sans aucune couleur ni animation**, car le navigateur ne trouvait pas les fichiers.

La correction : renommer les fichiers pour qu'ils correspondent exactement à ce que demande le HTML (`accueil.html` → `index.html` aussi, car GitHub Pages cherche toujours un fichier nommé `index.html`).

### 4. Mise en ligne avec GitHub Pages

Le site est hébergé gratuitement sur **GitHub Pages** : le dépôt est public, et dans *Settings → Pages* on a choisi la branche `main`. GitHub transforme automatiquement le contenu du dépôt en site web accessible ici :

👉 **https://envlly.github.io/test1/**

À chaque commit, le site se met à jour tout seul en environ 1 minute.

## Ce qu'on pourrait faire ensuite

- Récupérer les infos des animés (images, trailers) automatiquement depuis une **API REST** comme [Jikan](https://jikan.moe) (API gratuite de MyAnimeList, qui marche sans clé ni serveur)
- Faire une grille de plusieurs animés générée en JavaScript
- Ouvrir la vidéo dans une petite fenêtre dans la page (modale) au lieu d'un nouvel onglet
