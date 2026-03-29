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
            entry.target.classList.remove('animate-card-out');
            const tagImages = entry.target.querySelectorAll('.tag-image');
            tagImages.forEach(img => {
                img.classList.remove('animate-in');
                img.classList.remove('animate-in-out');
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
    if (navbar && navbar.classList.contains('transparent')) {
        navbar.style.boxShadow = 'none';
    } else {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        }
    }
});

// Toggle navbar transparency when the hero (video) is behind it
const heroSection = document.getElementById('accueil');
const navbarEl = document.querySelector('.navbar');
if (heroSection && navbarEl) {
    const heroObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navbarEl.classList.add('transparent');
            } else {
                navbarEl.classList.remove('transparent');
            }
        });
    }, { root: null, threshold: 0, rootMargin: '-60px 0px 0px 0px' });

    heroObserver.observe(heroSection);
}

// Mute / Unmute toggle for hero video
const heroVideo = document.getElementById('heroVideo');
const muteToggle = document.getElementById('muteToggle');
const playToggle = document.getElementById('playToggle');

if (heroVideo && muteToggle) {
    heroVideo.volume = 0.25;
    const updateMuteButton = () => {
        if (heroVideo.muted) {
            muteToggle.textContent = '🔈';
            muteToggle.title = 'Activer le son';
            muteToggle.setAttribute('aria-pressed', 'true');
        } else {
            muteToggle.textContent = '🔊';
            muteToggle.title = 'Désactiver le son';
            muteToggle.setAttribute('aria-pressed', 'false');
        }
    };

    // Initialize state
    updateMuteButton();

    muteToggle.addEventListener('click', () => {
        heroVideo.muted = !heroVideo.muted;
        updateMuteButton();
        if (!heroVideo.muted) {
            heroVideo.play().catch(() => {});
        }
    });
}

// Play / Pause toggle for hero video
if (heroVideo && playToggle) {
    const updatePlayButton = () => {
        if (heroVideo.paused) {
            playToggle.textContent = '▶️';
            playToggle.title = 'Lire la vidéo';
            playToggle.setAttribute('aria-pressed', 'false');
        } else {
            playToggle.textContent = '⏸️';
            playToggle.title = 'Pause';
            playToggle.setAttribute('aria-pressed', 'true');
        }
    };

    // Initialize state
    updatePlayButton();

    playToggle.addEventListener('click', () => {
        if (heroVideo.paused) {
            heroVideo.play().catch(() => {});
        } else {
            heroVideo.pause();
        }
    });

    // Update button state when video state changes
    heroVideo.addEventListener('play', updatePlayButton);
    heroVideo.addEventListener('pause', updatePlayButton);
}