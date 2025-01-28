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