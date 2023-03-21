let coups = ["PIERRE", "FEUILLE", "CISEAUX"];
let statutJeu = document.querySelector("#statut-jeu");
let boutons = document.querySelectorAll("button"); // récupère tous les boutons
let affichageCoupsJoues = document.querySelectorAll(
    ".container-coups-joues h2" // récupère tous les h2 qui sont enfants de .container-coups-joues
);

// Appel de la fonction de mise en place d'une nouvelle partie
commencerPartie();
statutJeu.textContent = "Choisissez!";
for (let i = 0; i < 3; i++) {
    boutons[i].textContent = coups[i];
}

for (let i = 0; i < affichageCoupsJoues.length; i++) {
    affichageCoupsJoues[i].style.display = "none";
}

for (let i = 0; i < boutons.length; i++) {
    boutons[i].textContent = coups[i];
    boutons[i].addEventListener("click", finirPartie);
}
// La suite du script constitue en la définition des fonctions utilisées dans le jeu


/**
 * Calcule le résultat de la partie, ie. le message de victoire, défaite ou égalité
 * @param  {Number}   monCoup  coup du joueur
 * @param  {Number}   coupOrdi  coup de l'ordinateur
 * @return {String}   result le message correspondant au résultat
 */
function calculerResultat(monCoup, coupOrdi) {
    if (monCoup === coupOrdi) {
        return "Copieur !";
    } else if (monCoup === 0) {
        if (coupOrdi === 2) {
            return "OK, gagne...";
        } else {
            return "Looser !";
        }
    } else if (monCoup === 1) {
        if (coupOrdi === 0) {
            return "OK, gagne...";
        } else {
            return "Looser !";
        }
    } else if (monCoup === 2) {
        if (coupOrdi === 1) {
            return "OK, gagne...";
        } else {
            return "Looser !";
        }
    }
}
/**
 * @return {Number}   nombre entier aléatoire entre 0 et 2
 */
function coupAleatoire() {
    return Math.floor(Math.random() * 3);
}

/**
 * Mise en place d'une nouvelle partie
 */
function commencerPartie() {
    statutJeu.textContent = "Choisissez !";

    for (let i = 0; i < boutons.length; i++) {
        boutons[i].textContent = coups[i];
        boutons[i].style.display = "inline-block"; // rend visible tous les boutons
        boutons[i].addEventListener("click", finirPartie);
    }

    for (let i = 0; i < affichageCoupsJoues.length; i++) {
        affichageCoupsJoues[i].style.display = "none";
    }
}

/**
 * Affiche le résultat final de la partie
 * @param {Event} event événement contenant les informations de l'entrée utilisateur
 */

function finirPartie(event) {// On récupère le coup joué par le joueur
    let monCoup = coups.indexOf(event.target.textContent);

    // On génère un coup aléatoire pour l'ordinateur
    let coupOrdi = coupAleatoire();

    // On calcule le résultat de la partie et on l'affiche dans "statutJeu"
    statutJeu.textContent = calculerResultat(monCoup, coupOrdi);

    // On affiche les coups joués par les deux joueurs dans les éléments "affichageCoupsJoues"
    // sous la forme "monCoup" "vs." "coupOrdi"
    affichageCoupsJoues[0].style.display = "inline-block";
    affichageCoupsJoues[0].textContent = coups[monCoup];
    affichageCoupsJoues[1].style.display = "inline-block";
    affichageCoupsJoues[1].textContent = "vs.";
    affichageCoupsJoues[2].style.display = "inline-block";
    affichageCoupsJoues[2].textContent = coups[coupOrdi];

    // On cache les 1er et 3ème boutons de jeu
    boutons[0].style.display = "none";
    boutons[2].style.display = "none";

    // On modifie le texte du bouton de nouvelle partie (2ème bouton) pour afficher "Rejouer"
    boutons[1].textContent = "Rejouer";

    // On supprime l'event listener existant sur le bouton "Rejouer"
    boutons[1].removeEventListener("click", finirPartie);

    // On ajoute un event listener sur le bouton "Rejouer" qui renvoie vers la fonction "commencerPartie"
    boutons[1].addEventListener("click", commencerPartie);
}