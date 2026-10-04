"use strict";


/* =====================================================
   ELEMENTS
===================================================== */

const card =
    document.getElementById("guideCard");

const openContacts =
    document.getElementById("openContacts");

const backButton =
    document.getElementById("backButton");

const languageToggle =
    document.getElementById("languageToggle");



/* =====================================================
   CARD STATE
===================================================== */

let cardSide = "front";


function showFront() {

    if (cardSide === "front") {
        return;
    }

    cardSide = "front";

    card.classList.remove("flipped");
}


function showBack() {

    if (cardSide === "back") {
        return;
    }

    cardSide = "back";

    card.classList.add("flipped");
}



/* =====================================================
   FRONT → BACK
===================================================== */

openContacts.addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        event.stopPropagation();

        showBack();

    }
);



/* =====================================================
   BACK → FRONT
===================================================== */

backButton.addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        event.stopPropagation();

        showFront();

    }
);



/* =====================================================
   LANGUAGE
===================================================== */

let currentLanguage =
    localStorage.getItem("guide-language") || "az";


function updateLanguage() {

    document
        .querySelectorAll(
            "[data-az][data-en]"
        )
        .forEach(function(element) {

            const text =
                element.getAttribute(
                    "data-" + currentLanguage
                );


            if (text !== null) {

                element.textContent =
                    text;

            }

        });


    document
        .querySelector(".lang-az")
        .classList.toggle(
            "active",
            currentLanguage === "az"
        );


    document
        .querySelector(".lang-en")
        .classList.toggle(
            "active",
            currentLanguage === "en"
        );


    document.documentElement.lang =
        currentLanguage;


    localStorage.setItem(
        "guide-language",
        currentLanguage
    );
}


languageToggle.addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        event.stopPropagation();


        currentLanguage =
            currentLanguage === "az"
                ? "en"
                : "az";


        updateLanguage();

    }
);


updateLanguage();



/* =====================================================
   SWIPE
===================================================== */

let touchStartX = 0;

let touchStartY = 0;

let touchStartTime = 0;

let swipeStartedOnLink = false;



card.addEventListener(
    "touchstart",
    function(event) {

        const target =
            event.target;


        /*
         * CONTACT LINK-ə toxunulubsa,
         * swipe sistemi həmin toxunuşa
         * qarışmır.
         */

        swipeStartedOnLink =
            !!target.closest(
                ".contact-card"
            );


        if (swipeStartedOnLink) {

            return;
        }


        const touch =
            event.changedTouches[0];


        touchStartX =
            touch.clientX;


        touchStartY =
            touch.clientY;


        touchStartTime =
            Date.now();

    },
    {
        passive: true
    }
);



card.addEventListener(
    "touchend",
    function(event) {

        /*
         * Link üzərindədirsə,
         * kartı çevirmə.
         */

        if (swipeStartedOnLink) {

            swipeStartedOnLink =
                false;

            return;
        }


        const target =
            event.target;


        if (
            target.closest(
                ".contact-card"
            )
        ) {

            return;
        }


        const touch =
            event.changedTouches[0];


        const deltaX =
            touch.clientX -
            touchStartX;


        const deltaY =
            touch.clientY -
            touchStartY;


        const duration =
            Date.now() -
            touchStartTime;


        if (duration > 900) {

            return;
        }


        if (
            Math.abs(deltaY) >
            Math.abs(deltaX)
        ) {

            return;
        }


        if (
            Math.abs(deltaX) < 60
        ) {

            return;
        }


        if (deltaX < 0) {

            showBack();

        } else {

            showFront();

        }

    },
    {
        passive: true
    }
);



/* =====================================================
   IMPORTANT
===================================================== */

/*

    WHATSAPP
    INSTAGRAM
    WIKILOC

    linklərinə burada heç bir müdaxilə edilmir.

    Onlar adi HTML <a href=""> linkləridir.

    Heç bir:

    window.open()
    preventDefault()
    whatsapp://
    instagram://
    target="_blank"

    istifadə edilmir.

*/



/* =====================================================
   START
===================================================== */

showFront();