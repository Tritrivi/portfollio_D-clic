// Script pour gérer la navigation douce (smooth scrolling)
document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner tous les liens de navigation
    const navLinks = document.querySelectorAll('header nav a, a.btn');

    // Ajouter un gestionnaire d'événements de clic à chaque lien
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Vérifier si le lien pointe vers une ancre sur la page
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                
                // Sélectionner l'élément cible
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calculer la position de défilement
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - headerHeight;
                    
                    // Effectuer le défilement avec une animation
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const prenom = document.getElementById('prenom').value;
            const nom = document.getElementById('nom').value;
            const sujet = document.getElementById('sujet').value;
            const message = document.getElementById('message').value;
            
            // Vous pouvez ajouter ici le code pour envoyer les données à un serveur
            console.log({
                prenom,
                nom,
                sujet,
                message
            });
            
            // Réinitialiser le formulaire après soumission
            contactForm.reset();
            
            // Afficher un message de confirmation
            alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
        });
    }

    // Animation de la barre de navigation lors du défilement
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(34, 34, 34, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = '#222';
            header.style.boxShadow = 'none';
        }
    });
});

// Animation des barres de compétences
window.addEventListener('load', function() {
    // Fonction pour vérifier si un élément est visible dans la fenêtre
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Sélectionner toutes les barres de compétences
    const skillBars = document.querySelectorAll('.skill-level');
    
    // Fonction pour animer les barres de compétences
    function animateSkillBars() {
        const skillsSection = document.querySelector('.skills');
        
        if (isElementInViewport(skillsSection)) {
            skillBars.forEach(bar => {
                // Récupérer la largeur à partir du style inline
                const width = bar.style.width;
                
                // Réinitialiser la largeur à 0
                bar.style.width = '0';
                
                // Animer la largeur jusqu'à la valeur originale
                setTimeout(() => {
                    bar.style.transition = 'width 1s ease-in-out';
                    bar.style.width = width;
                }, 200);
            });
            
            // Supprimer l'écouteur d'événements après l'animation
            window.removeEventListener('scroll', animateSkillBars);
        }
    }
    
    // Ajouter un écouteur d'événements de défilement
    window.addEventListener('scroll', animateSkillBars);
    
    // Vérifier une fois au chargement de la page
    animateSkillBars();
});