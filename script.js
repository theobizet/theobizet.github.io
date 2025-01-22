function showSection(id) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
}

// Show the home section by default
showSection('home');
