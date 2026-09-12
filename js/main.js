/**
 * SV Blau-Weiß - Haupt-JavaScript (js/main.js)
 * Steuert die mobile Navigation und die Formularvalidierung.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. MOBILE NAVIGATION
       ========================================================================== */
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.querySelector('.site-nav');
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

    if (menuToggle && siteNav) {
        function toggleMenu(forceClose = false) {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            const shouldOpen = forceClose ? false : !isExpanded;

            menuToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
            siteNav.classList.toggle('is-open', shouldOpen);
            document.body.classList.toggle('menu-open', shouldOpen);
        }

        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleMenu();
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(true));
        });

        document.addEventListener('click', (event) => {
            const isClickInside = siteNav.contains(event.target) || menuToggle.contains(event.target);
            if (!isClickInside && siteNav.classList.contains('is-open')) {
                toggleMenu(true);
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && siteNav.classList.contains('is-open')) {
                toggleMenu(true);
            }
        });
    }

    /* ==========================================================================
       2. FORMULAR-VALIDIERUNG & INLINE-FEEDBACK (kontakt.html)
       ========================================================================== */
    const probetrainingForm = document.getElementById('probetraining-form');
    const feedbackBox = document.getElementById('form-feedback');

    if (probetrainingForm && feedbackBox) {
        probetrainingForm.addEventListener('submit', (event) => {
            // Verhindert das Neuladen der Seite beim Absenden
            event.preventDefault();

            // Werte aus den Eingabefeldern holen
            const nameInput = document.getElementById('fullname');
            const emailInput = document.getElementById('email');
            const ageInput = document.getElementById('age');

            // Prüfung: Sind die Pflichtfelder ausgefüllt?
            if (!nameInput.value.trim() || !emailInput.value.trim() || !ageInput.value.trim()) {
                feedbackBox.style.display = 'block';
                feedbackBox.style.backgroundColor = '#fee2e2';
                feedbackBox.style.color = '#991b1b';
                feedbackBox.style.border = '1px solid #f87171';
                feedbackBox.textContent = 'Bitte fülle alle erforderlichen Felder (*) aus.';
                return;
            }

            // Erfolgsmeldung im Formular anzeigen
            feedbackBox.style.display = 'block';
            feedbackBox.style.backgroundColor = '#dcfce7';
            feedbackBox.style.color = '#166534';
            feedbackBox.style.border = '1px solid #86efac';
            feedbackBox.innerHTML = `Vielen Dank, <strong>${nameInput.value.trim()}</strong>! Deine Anfrage für das Probetraining wurde erfolgreich gesendet. Wir melden uns in Kürze.`;

            // Eingabefelder leeren
            probetrainingForm.reset();

            // Meldung nach 8 Sekunden ausblenden
            setTimeout(() => {
                feedbackBox.style.display = 'none';
            }, 8000);
        });
    }
});