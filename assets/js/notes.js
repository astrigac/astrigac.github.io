// Global DOM references
let scrollContainer, sections, navLinks, toggleButtons, sidebarMenuLinks;

document.addEventListener('DOMContentLoaded', () => {
    scrollContainer = document.querySelector('main.notes-content');
    sections = document.querySelectorAll('.content-section');
    navLinks = document.querySelectorAll('.sidebar-menu a');
    toggleButtons = document.querySelectorAll('.cat-toggle-btn');
    sidebarMenuLinks = document.querySelectorAll('.sidebar-menu li');

    if (!scrollContainer || sections.length === 0) return;

    // 1. SCROLLSPY (Section Scroll Tracker)
    const observerOptions = {
        root: scrollContainer,
        rootMargin: '-10% 0px -35% 0px', 
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
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

// 2. CATEGORY FILTER SYSTEM
function setCategory(category) {
    if (!sections || !toggleButtons) return;

    // A. Update active status on segmented control buttons
    toggleButtons.forEach(btn => {
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // B. Filter the notes content cards
    sections.forEach(section => {
        if (category === 'all' || section.classList.contains(`cat-${category}`)) {
            section.style.display = '';
        } else {
            section.style.display = 'none';
        }
    });

    // C. Filter the vertical sidebar navigation links dynamically
    navLinks.forEach(link => {
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const parentLi = link.closest('li');

        if (targetSection && parentLi) {
            if (category === 'all' || targetSection.classList.contains(`cat-${category}`)) {
                parentLi.style.display = '';
            } else {
                parentLi.style.display = 'none';
            }
        }
    });

    // D. Soft-reset scrollbar location to the top of the container
    if (scrollContainer) {
        scrollContainer.scrollTop = 0;
    }
}

// 3. TEXT SEARCH FILTER
function filterNotes() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    
    // Fallback to "All" category if a search query is initiated
    setCategory('all');
            
    sections.forEach(section => {
        let text = section.innerText.toLowerCase();
        if (text.includes(input)) {
            section.style.display = "";
        } else {
            section.style.display = "none";
        }
    });
}