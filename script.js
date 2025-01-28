document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelectorAll('.skill-item');
    const animateSkill = (skill) => {
        const circle = skill.querySelector('.progress');
        const percent = skill.dataset.percent;
        const percentText = skill.querySelector('.skill-percent');
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
        let count = 100;
        const timer = setInterval(() => {
            if (count <= percent) {
                clearInterval(timer);
            } else {
                count--;
                percentText.textContent = count + '%';
            }
        }, percent);
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                animateSkill(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    skills.forEach(skill => observer.observe(skill));
});

document.addEventListener('DOMContentLoaded', () => {
    let hash = window.location.hash; // Récupère la partie hash de l'URL
    if (!hash) {
        hash = '#home'; // Définit le hash par défaut à #home si l'URL ne contient pas de hash
        history.replaceState(null, null, hash); // Met à jour l'URL avec le hash par défaut
    }
    const tabTrigger = document.querySelector(`a[href="${hash}"]`);
    if (tabTrigger) {
        const tab = new bootstrap.Tab(tabTrigger);
        tab.show();
    }

    // Ajoute un gestionnaire d'événements pour les clics sur les liens d'onglets
    const tabLinks = document.querySelectorAll('.nav-link[data-bs-toggle="pill"]');
    tabLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            history.pushState(null, null, targetId); // Modifie le hash dans l'URL
        });
    });
});
