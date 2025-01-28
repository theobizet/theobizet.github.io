"use strict"

document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelectorAll('.skill-item');
    const animateSkill = (skill) => {
        const circle = skill.querySelector('.progress');
        const percent = skill.dataset.percent;
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
    // Handle nav-link-based tab navigation
    const navLinks = document.querySelectorAll('.nav-link[data-bs-toggle="pill"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const tab = new bootstrap.Tab(link);
            tab.show();
            history.pushState(null, null, targetId);
        });
    });

    // Handle non-nav links (like buttons or stretched links)
    const customLinks = document.querySelectorAll('.stretched-link[href], .btn[href]');
    customLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const targetTabLink = document.querySelector(`.nav-link[href="${targetId}"]`);

            if (targetTabLink) {
                const tab = new bootstrap.Tab(targetTabLink);
                tab.show(); // Programmatically show the tab
                history.pushState(null, null, targetId); // Update the hash
            } else {
                console.error(`No nav-link found for target: ${targetId}`);
            }
        });
    });

    // Activate the tab corresponding to the URL hash on page load
    let hash = window.location.hash;
    if (hash) {
        const tabTrigger = document.querySelector(`.nav-link[href="${hash}"]`);
        if (tabTrigger) {
            const tab = new bootstrap.Tab(tabTrigger);
            tab.show();
        }
    }
});