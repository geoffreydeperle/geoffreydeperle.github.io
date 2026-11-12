"use strict";

document.addEventListener("DOMContentLoaded", function () {

    activerApparitionProgressive();
    activerDefilementFluide();
    verifierLiensProvisoires();

});


/**
 * Fait apparaître progressivement les sections de la page
 * lorsqu'elles entrent dans la zone visible.
 */
function activerApparitionProgressive() {

    const elements = document.querySelectorAll(".reveal");

    if (
        !("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        elements.forEach(function (element) {
            element.classList.add("reveal-visible");
        });

        return;
    }

    const observateur = new IntersectionObserver(
        function (entrees, observer) {

            entrees.forEach(function (entree) {

                if (!entree.isIntersecting) {
                    return;
                }

                entree.target.classList.add("reveal-visible");
                observer.unobserve(entree.target);

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    elements.forEach(function (element) {
        observateur.observe(element);
    });

}


/**
 * Ajoute un défilement fluide aux liens internes.
 */
function activerDefilementFluide() {

    const liensInternes = document.querySelectorAll('a[href^="#"]');

    liensInternes.forEach(function (lien) {

        lien.addEventListener("click", function (evenement) {

            const identifiant = lien.getAttribute("href");

            if (!identifiant || identifiant === "#") {
                return;
            }

            const cible = document.querySelector(identifiant);

            if (!cible) {
                return;
            }

            evenement.preventDefault();

            cible.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            if (history.pushState) {
                history.pushState(null, "", identifiant);
            }

        });

    });

}


/**
 * Signale dans la console les liens qui doivent encore être remplacés.
 * Cette fonction n'a aucun effet visible pour les visiteurs.
 */
function verifierLiensProvisoires() {

    const liens = document.querySelectorAll("a[href]");

    liens.forEach(function (lien) {

        const adresse = lien.getAttribute("href");

        if (
            adresse &&
            (
                adresse.includes("LIEN_") ||
                adresse.includes("TON_ADRESSE_EMAIL")
            )
        ) {
            console.warn(
                "Lien provisoire à remplacer :",
                adresse,
                lien
            );
        }

    });

}