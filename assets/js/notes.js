// Global DOM references
let scrollContainer, sections, navLinks, toggleButtons, sidebarMenuLinks, scrollTopBtn;

document.addEventListener('DOMContentLoaded', () => {
    scrollContainer = document.querySelector('main.notes-content');
    sections = document.querySelectorAll('.content-section');
    navLinks = document.querySelectorAll('.sidebar-menu a');
    toggleButtons = document.querySelectorAll('.cat-toggle-btn');
    sidebarMenuLinks = document.querySelectorAll('.sidebar-menu li');
    scrollTopBtn = document.querySelector('.scroll-top-btn');

    if (!scrollContainer || sections.length === 0) return;

    // SCROLLSPY (Section Scroll Tracker)
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

    // SCROLL LISTENER (Active bottom mapping & floating button visibility)
    scrollContainer.addEventListener('scroll', () => {
        // Scroll to bottom fallback
        const isAtBottom = scrollContainer.scrollHeight - scrollContainer.scrollTop <= scrollContainer.clientHeight + 15;
        if (isAtBottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[navLinks.length - 1].classList.add('active');
        }

        // Toggle floating button visibility after scrolling 250px down
        if (scrollTopBtn) {
            if (scrollContainer.scrollTop > 150) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    }, { passive: true });

    // SCROLL-TO-TOP CLICK LISTENER
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            scrollContainer.scrollTop = 0; // Instant teleport scroll
        });
    }
});

// CATEGORY FILTER SYSTEM
function setCategory(category) {
    if (!sections || !toggleButtons) return;

    // Update active status on segmented control buttons
    toggleButtons.forEach(btn => {
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Filter the notes content cards
    sections.forEach(section => {
        if (category === 'all' || section.classList.contains(`cat-${category}`)) {
            section.style.display = '';
        } else {
            section.style.display = 'none';
        }
    });

    // Filter the vertical sidebar navigation links dynamically
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

    // Soft-reset scrollbar location instantly to the top of the container
    if (scrollContainer) {
        scrollContainer.scrollTop = 0;
    }
}

// TEXT SEARCH FILTER
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