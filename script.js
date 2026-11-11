// LISTE DES ANIMES

const animes = [

    {
        title: "One Piece",
        type: "Série",
        genre: "Aventure",
        language: "Français",
        year: 1999,
        rating: "9,0",
        image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg"
    },

    {
        title: "Demon Slayer",
        type: "Série",
        genre: "Action",
        language: "Français",
        year: 2019,
        rating: "9,2",
        image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg"
    },

    {
        title: "Your Name",
        type: "Film",
        genre: "Romance",
        language: "Français",
        year: 2016,
        rating: "8,9",
        image: "https://cdn.myanimelist.net/images/anime/5/87048.jpg"
    },

    {
        title: "Jujutsu Kaisen",
        type: "Série",
        genre: "Action",
        language: "Japonais",
        year: 2020,
        rating: "8,7",
        image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg"
    },

    {
        title: "Spy x Family",
        type: "Série",
        genre: "Comédie",
        language: "Français",
        year: 2022,
        rating: "8,6",
        image: "https://cdn.myanimelist.net/images/anime/1441/122795.jpg"
    },

    {
        title: "Le Voyage de Chihiro",
        type: "Film",
        genre: "Fantastique",
        language: "Français",
        year: 2001,
        rating: "9,3",
        image: "https://cdn.myanimelist.net/images/anime/6/79597.jpg"
    },

    {
        title: "Weathering With You",
        type: "Film",
        genre: "Romance",
        language: "Japonais",
        year: 2019,
        rating: "8,4",
        image: "https://cdn.myanimelist.net/images/anime/1880/101146.jpg"
    },

    {
        title: "My Hero Academia",
        type: "Série",
        genre: "Action",
        language: "Français",
        year: 2016,
        rating: "8,5",
        image: "https://cdn.myanimelist.net/images/anime/10/78745.jpg"
    },

    {
        title: "Kaguya-sama",
        type: "Série",
        genre: "Comédie",
        language: "Japonais",
        year: 2019,
        rating: "8,8",
        image: "https://cdn.myanimelist.net/images/anime/1295/106551.jpg"
    },

    {
        title: "Le Château ambulant",
        type: "Film",
        genre: "Fantastique",
        language: "Français",
        year: 2004,
        rating: "8,8",
        image: "https://cdn.myanimelist.net/images/anime/5/75810.jpg"
    }

];


// RÉCUPÉRATION DES ÉLÉMENTS HTML

const grid = document.getElementById("animeGrid");

const filmsGrid = document.getElementById("filmsGrid");

const seriesGrid = document.getElementById("seriesGrid");

const searchInput = document.getElementById("searchInput");

const catalogPanel = document.getElementById("catalogPanel");

let currentPage = "accueil";

let activeGenre = "all";


// CRÉATION D'UNE CARTE ANIME

function cardTemplate(anime) {

    return `

        <article class="anime-card">

            <a class="poster-link"
               target="_blank"
               data-anime-title="${anime.title}"
               href="https://www.youtube.com/results?search_query=${encodeURIComponent(anime.title + " bande annonce officielle")}">

                <div class="poster-wrap">

                    <img
                        src="${anime.image}"
                        alt="Affiche de ${anime.title}"
                        loading="lazy"
                        onerror="this.src='https://placehold.co/400x600/F0E1E8/A8436D?text=AMA'"
                    >

                    <span class="poster-type">
                        ${anime.type}
                    </span>

                    <button class="watch-btn" type="button" aria-label="Visualiser la bande-annonce de ${anime.title}">
                        ▶ Visualiser
                    </button>

                </div>

            </a>


            <div class="anime-info">

                <h3>${anime.title}</h3>

                <div class="anime-meta">
                    ${anime.genre} · ${anime.year} · ${anime.language}
                </div>

                <div class="anime-bottom">

                    <span class="rating">
                        ★ ${anime.rating}/10
                    </span>

                    <span class="genre-tag">
                        ${anime.genre}
                    </span>

                </div>

            </div>

        </article>

    `;

}


// AFFICHER LES ANIMES

function render(list = animes) {

    grid.innerHTML = list.map(cardTemplate).join("");

    filmsGrid.innerHTML = animes
        .filter(a => a.type === "Film")
        .map(cardTemplate)
        .join("");

    seriesGrid.innerHTML = animes
        .filter(a => a.type === "Série")
        .map(cardTemplate)
        .join("");


    document.getElementById("emptyState").hidden =
        list.length !== 0;


    document.getElementById("resultCount").textContent =
        `${list.length} animé${list.length > 1 ? "s" : ""} dans la sélection`;

}


// RECHERCHE ET FILTRES

function filterAnimes() {

    const query = searchInput.value
        .trim()
        .toLocaleLowerCase("fr");


    const genre = document.getElementById("genreFilter").value;

    const language = document.getElementById("languageFilter").value;

    const type = document.getElementById("typeFilter").value;


    const filtered = animes.filter(a =>

        a.title.toLocaleLowerCase("fr").includes(query)

        && (genre === "all" || a.genre === genre)

        && (language === "all" || a.language === language)

        && (type === "all" || a.type === type)

        && (activeGenre === "all" || a.genre === activeGenre)

    );


    render(filtered);

}


// CHANGER DE PAGE

function showPage(page) {

    currentPage = page;

    document.querySelectorAll(".page-section").forEach(section => {

        section.classList.remove("active");

    });


    const target = document.getElementById(`page-${page}`);

    if (target) {

        target.classList.add("active");

    }


    document.querySelectorAll("[data-page-link]").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.pageLink === page
        );

    });


    catalogPanel.hidden = true;

    document.getElementById("catalogToggle")
        .setAttribute("aria-expanded", "false");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// NAVIGATION ENTRE LES PAGES

document.querySelectorAll("[data-page-link]").forEach(button => {

    button.addEventListener("click", () => {

        showPage(button.dataset.pageLink);

    });

});


// OUVRIR ET FERMER LE CATALOGUE

document.getElementById("catalogToggle").addEventListener("click", () => {

    catalogPanel.hidden = !catalogPanel.hidden;

    document.getElementById("catalogToggle")
        .setAttribute("aria-expanded", String(!catalogPanel.hidden));

});


document.getElementById("closeCatalog").addEventListener("click", () => {

    catalogPanel.hidden = true;

    document.getElementById("catalogToggle")
        .setAttribute("aria-expanded", "false");

});


// APPLIQUER LES FILTRES

document.getElementById("applyFilters").addEventListener("click", () => {

    activeGenre = "all";

    showPage("accueil");

    filterAnimes();

    document.getElementById("popular")
        .scrollIntoView({ behavior: "smooth" });

});


// RÉINITIALISER LES FILTRES

document.getElementById("resetFilters").addEventListener("click", () => {

    document.getElementById("genreFilter").value = "all";

    document.getElementById("languageFilter").value = "all";

    document.getElementById("typeFilter").value = "all";

    searchInput.value = "";

    activeGenre = "all";

    render();

});


// FONCTION RECHERCHE

searchInput.addEventListener("input", () => {

    activeGenre = "all";

    if (currentPage !== "accueil") {

        showPage("accueil");

    }

    filterAnimes();

});


// FILTRER PAR GENRE

document.querySelectorAll(".genre-chip").forEach(button => {

    button.addEventListener("click", () => {

        activeGenre = button.dataset.genre;

        showPage("accueil");

        filterAnimes();

        document.getElementById("popular")
            .scrollIntoView({ behavior: "smooth" });

    });

});


// BOUTON EXPLORER LES ANIMES

document.querySelectorAll("[data-scroll-to]").forEach(button => {

    button.addEventListener("click", () => {

        document.getElementById(button.dataset.scrollTo)
            .scrollIntoView({ behavior: "smooth" });

    });

});


// PUBLIER UN AVIS

document.getElementById("reviewForm").addEventListener("submit", event => {

    event.preventDefault();


    const name = document.getElementById("reviewName").value.trim();

    const rating = document.getElementById("reviewRating").value;

    const comment = document.getElementById("reviewText").value.trim();


    if (!name || !comment) return;


    // CRÉER LE COMMENTAIRE

    const article = document.createElement("article");

    article.className = "review-card";


    const top = document.createElement("div");

    top.className = "review-top";


    const author = document.createElement("strong");

    author.textContent = name;


    const score = document.createElement("span");

    score.textContent = `★ ${rating}/10`;


    const body = document.createElement("p");

    body.textContent = comment;


    top.append(author, score);

    article.append(top, body);


    // AJOUTER LE COMMENTAIRE EN PREMIER

    document.getElementById("reviewList").prepend(article);


    // VIDER LE FORMULAIRE

    document.getElementById("reviewForm").reset();


    // METTRE À JOUR LE NOMBRE D'AVIS

    const count = document.querySelectorAll(".review-card").length;

    document.querySelector(".review-count").textContent =
        `${count} avis`;

});


// BOUTON RETOUR EN HAUT

window.addEventListener("scroll", () => {

    document.getElementById("backTop")
        .classList.toggle("visible", window.scrollY > 450);

});


document.getElementById("backTop").addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// LANCER LE SITE

render();


// BANDE-ANNONCE DEMON SLAYER VIA L'API JIKAN
// L'API Jikan (https://jikan.moe) est l'API REST gratuite de MyAnimeList.
// On lui demande les infos de Demon Slayer (id 38000) et on récupère
// l'identifiant YouTube de sa bande-annonce officielle, sans clé ni serveur.

async function chargerBandeAnnonceDemonSlayer() {
    const lien = document.querySelector('.review-feature a');
    if (!lien) return;

    try {
        const reponse = await fetch('https://api.jikan.moe/v4/anime/38000');
        const anime = await reponse.json();
        const idTrailer = anime.trailer && anime.trailer.youtube_id;

        if (idTrailer) {
            lien.href = `https://www.youtube.com/embed/${idTrailer}?autoplay=1`;
        }
        // Si l'API ne répond pas, on garde le lien déjà écrit dans le HTML
    } catch (erreur) {
        // Mode hors-ligne de l'API : le lien de secours du HTML reste actif
    }
}

chargerBandeAnnonceDemonSlayer();


// TOUTES LES VIGNETTES CLIQUABLES GRÂCE AUX APIS JIKAN + ANILIST
// Le lien de secours (recherche YouTube) est remplacé par la vraie
// bande-annonce dès qu'une API répond. Un cache évite de redemander
// deux fois le même animé.

const cacheTrailers = new Map();

// fetch avec minuteur : si l'API met trop de temps à répondre, on abandonne
function fetchAvecDelai(url, options, delaiMs) {
    const controleur = new AbortController();
    const minuteur = setTimeout(() => controleur.abort(), delaiMs);
    return fetch(url, { ...options, signal: controleur.signal }).finally(() => clearTimeout(minuteur));
}

// Source 1 : Jikan (l'API de MyAnimeList)
async function jikanTrailer(titre) {
    const reponse = await fetchAvecDelai(
        `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(titre)}&limit=1`,
        {}, 6000
    );
    const donnees = await reponse.json();
    const anime = donnees.data && donnees.data[0];
    return (anime && anime.trailer && anime.trailer.youtube_id) || null;
}

// Source 2 : AniList (GraphQL) — UNE SEULE requête pour tous les titres.
// On prend 5 résultats par titre et on garde celui dont le titre
// contient le plus de mots du titre cherché.
async function anilistTrailers(titres) {

    const alias = titres.map((t, i) => `a${i}: Page(perPage:5){media(search:"${t.replace(/"/g, '\\"')}",type:ANIME){title{romaji english} trailer{id site}}}`);
    const reponse = await fetchAvecDelai('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `{${alias.join(' ')}}` })
    }, 10000);

    const donnees = await reponse.json();
    const resultats = {};

    titres.forEach((titre, i) => {
        const liste = (donnees.data && donnees.data[`a${i}`] && donnees.data[`a${i}`].media) || [];
        const mots = titre.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
        let meilleurId = null;
        let meilleurScore = 0;
        let meilleurTitre = '';

        for (const media of liste) {
            if (!media || !media.trailer || media.trailer.site !== 'youtube') continue;
            const titreComplet = (media.title.romaji + ' ' + (media.title.english || '')).toLowerCase();
            const score = mots.filter(mot => titreComplet.includes(mot)).length;
            // En cas d'égalité, on préfère le titre le plus court (la série
            // principale plutôt que ses suites/films)
            if (score > meilleurScore || (score === meilleurScore && meilleurId !== null && titreComplet.length < (meilleurTitre || '').length)) {
                meilleurScore = score;
                meilleurId = media.trailer.id;
                meilleurTitre = titreComplet;
            }
        }

        resultats[titre] = meilleurId;
    });

    return resultats;
}

async function lierTrailerJikan() {

    const liens = [...document.querySelectorAll("a.poster-link[data-anime-title]")];

    // 1. Appliquer tout ce qui est déjà dans le cache
    const manquants = [];
    for (const lien of liens) {
        const titre = lien.dataset.animeTitle;
        if (cacheTrailers.has(titre)) {
            if (cacheTrailers.get(titre)) {
                lien.href = `https://www.youtube.com/embed/${cacheTrailers.get(titre)}?autoplay=1`;
            }
        } else if (!manquants.includes(titre)) {
            manquants.push(titre);
        }
    }

    if (manquants.length === 0) return;

    // 2. Jikan pour chaque titre inconnu (en parallèle, avec délai de sécurité)
    await Promise.allSettled(
        manquants.map(async (titre, index) => {
            await new Promise(resolve => setTimeout(resolve, index * 150));
            try {
                const id = await jikanTrailer(titre);
                if (id) cacheTrailers.set(titre, id);
            } catch (erreur) {
                // Jikan injoignable ou trop lent : AniList prendra le relais
            }
        })
    );

    // 3. AniList en une seule requête pour les titres toujours inconnus
    const restants = manquants.filter(titre => !cacheTrailers.has(titre));
    if (restants.length > 0) {
        try {
            const resultats = await anilistTrailers(restants);
            for (const [titre, id] of Object.entries(resultats)) {
                cacheTrailers.set(titre, id);
            }
        } catch (erreur) {
            // AniList injoignable aussi : les liens de secours restent actifs
        }
    }

    // 4. Appliquer les liens trouvés
    for (const lien of liens) {
        const titre = lien.dataset.animeTitle;
        if (cacheTrailers.has(titre) && cacheTrailers.get(titre)) {
            lien.href = `https://www.youtube.com/embed/${cacheTrailers.get(titre)}?autoplay=1`;
        }
    }
}

// On relance la liaison à chaque fois que la grille est re-render
// (recherche, filtre de genre, changement de page...), ET une première
// fois tout de suite car le premier rendu a lieu avant cette ligne.

lierTrailerJikan();

const observateurVignettes = new MutationObserver(() => lierTrailerJikan());

observateurVignettes.observe(grid, { childList: true });

if (filmsGrid) observateurVignettes.observe(filmsGrid, { childList: true });
if (seriesGrid) observateurVignettes.observe(seriesGrid, { childList: true });
