// Section Scroll Tracker (ScrollSpy)
document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.querySelector('main.notes-content');
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.sidebar-menu a');

    if (!scrollContainer || sections.length === 0) return;

    // Configure the observer to watch the scrollable main container
    const observerOptions = {
        root: scrollContainer,
        // Triggers active state when a section is roughly in the lower quarter of page
        rootMargin: '-10% 0px -35% 0px', 
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                avLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});

// Notes Search
function filterNotes() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let sections = document.querySelectorAll('.content-section');
            
    sections.forEach(section => {
    let text = section.innerText.toLowerCase();
    if (text.includes(input)) {
        section.style.display = "";
    } else {
        section.style.display = "none";
    }
    });
}
