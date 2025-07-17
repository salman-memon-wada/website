// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Function to load external HTML content
    async function loadHTML(elementId, filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            document.getElementById(elementId).innerHTML = html;
        } catch (error) {
            console.error(`Could not load ${filePath}:`, error);
        }
    }

    // Load header and footer
    loadHTML('header-placeholder', 'header.html');
    loadHTML('footer-placeholder', 'footer.html');

    // Dark Mode Toggle Logic
    const body = document.body;
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'darkModeToggle';
    darkModeToggle.classList.add('btn', 'rounded-pill', 'shadow');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Default icon for light mode

    // Append the toggle button to the body
    body.appendChild(darkModeToggle);

    // Check for saved theme preference on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for dark mode
    } else {
        body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for light mode
    }

    // Toggle theme on button click
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Change icon to sun
        } else {
            localStorage.setItem('theme', 'light');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Change icon to moon
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
