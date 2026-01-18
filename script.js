    // Menu mobile
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fermer le menu en cliquant sur un lien
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Ajouter l'animation de la carte elle-même
            if (entry.target.classList.contains('project-card')) {
                entry.target.classList.add('animate-card');
            } else {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
            
            // Animer les images des tags avec délai
            const tagImages = entry.target.querySelectorAll('.tag-image');
            tagImages.forEach((img, index) => {
                // Retirer la classe avant de la rajouter pour relancer l'animation
                img.classList.remove('animate-in');
                setTimeout(() => {
                    img.classList.add('animate-in');
                }, 10 + index * 100);
            });
        } else {
            // Retirer les classes quand la carte sort de l'écran
            entry.target.classList.remove('animate-card');
            const tagImages = entry.target.querySelectorAll('.tag-image');
            tagImages.forEach(img => {
                img.classList.remove('animate-in');
            });
        }
    });
}, observerOptions);

// Observer les cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

const competenceCategories = document.querySelectorAll('.competence-category');
competenceCategories.forEach(category => {
    category.style.opacity = '0';
    observer.observe(category);
});

// Gestion du scroll - modifier la navbar au scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    }
});