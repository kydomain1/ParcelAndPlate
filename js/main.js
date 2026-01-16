// Global variables
let currentPage = 1;
const articlesPerPage = 6;
let currentCategory = 'all';
let filteredArticles = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Ensure articles data is loaded
    if (typeof articles !== 'undefined' && articles.length > 0) {
        filteredArticles = articles;
    }
    
    if (document.getElementById('articlesContainer')) {
        initializeHomePage();
    }
    initializeNavigation();
    initializeSearch();
    
    // Handle hash navigation on page load
    handleHashNavigation();
});

// Handle hash navigation when page loads
function handleHashNavigation() {
    if (window.location.hash) {
        const hash = window.location.hash;
        setTimeout(() => {
            const target = document.querySelector(hash);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
    }
}

// Initialize home page
function initializeHomePage() {
    filteredArticles = articles;
    displayArticles();
    setupCategoryFilters();
    setupPagination();
}

// Display articles
function displayArticles() {
    const container = document.getElementById('articlesContainer');
    if (!container) return;

    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const articlesToShow = filteredArticles.slice(startIndex, endIndex);

    container.innerHTML = articlesToShow.map(article => `
        <article class="article-card" onclick="goToArticle(${article.id})">
            <img src="${article.image}" alt="${article.title}" class="article-image" onerror="this.src='https://via.placeholder.com/800x400/667eea/ffffff?text=Article'">
            <div class="article-content">
                <span class="article-category">${article.categoryName}</span>
                <h2 class="article-title">${article.title}</h2>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-meta">
                    <span>${article.date} • ${article.author}</span>
                    <a href="article.html?id=${article.id}" class="read-more" onclick="event.stopPropagation(); goToArticle(${article.id})">Read More →</a>
                </div>
            </div>
        </article>
    `).join('');

    // Update pagination
    updatePagination();
}

// Setup category filters
function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter articles
            currentCategory = this.dataset.category;
            if (currentCategory === 'all') {
                filteredArticles = articles;
            } else {
                filteredArticles = articles.filter(article => article.category === currentCategory);
            }

            // Reset to first page
            currentPage = 1;
            displayArticles();
        });
    });
}

// Setup pagination
function setupPagination() {
    updatePagination();
}

// Update pagination buttons
function updatePagination() {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let paginationHTML = '';

    // Previous button
    paginationHTML += `
        <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
            ← Previous
        </button>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `<span class="pagination-ellipsis">...</span>`;
        }
    }

    // Next button
    paginationHTML += `
        <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
            Next →
        </button>
    `;

    paginationContainer.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    displayArticles();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Go to article page
function goToArticle(articleId) {
    window.location.href = `article.html?id=${articleId}`;
}

// Initialize navigation
function initializeNavigation() {
    // Logo hover effect
    const logo = document.getElementById('logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.animation = 'aurora-shimmer 2s ease-in-out infinite';
        });
    }

    // Active nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.href.includes('#')) return;
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Initialize search
function initializeSearch() {
    const searchBox = document.querySelector('.search-box');
    const searchBtn = document.querySelector('.search-btn');

    if (searchBox && searchBtn) {
        const performSearch = () => {
            const query = searchBox.value.toLowerCase().trim();
            
            if (query === '') {
                filteredArticles = articles;
            } else {
                filteredArticles = articles.filter(article => 
                    article.title.toLowerCase().includes(query) ||
                    article.excerpt.toLowerCase().includes(query) ||
                    article.categoryName.toLowerCase().includes(query)
                );
            }

            currentPage = 1;
            if (document.getElementById('articlesContainer')) {
                displayArticles();
            }
        };

        searchBtn.addEventListener('click', performSearch);
        searchBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// Handle category filter links
document.querySelectorAll('a[data-filter]').forEach(link => {
    link.addEventListener('click', function(e) {
        const filter = this.getAttribute('data-filter');
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
            e.preventDefault();
            // Trigger filter
            const filterBtn = document.querySelector(`.filter-btn[data-category="${filter}"]`);
            if (filterBtn) {
                filterBtn.click();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle links with hash in href (e.g., index.html#about)
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href.includes('#')) return;
        
        const hashIndex = href.indexOf('#');
        const hash = href.substring(hashIndex);
        const path = href.substring(0, hashIndex);
        const currentPath = window.location.pathname;
        const isIndexPage = currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/');
        
        // If it's a link to index.html from another page
        if (path === 'index.html' && !isIndexPage) {
            // Let browser navigate, then scroll will happen on page load
            return;
        }
        
        // If we're on the index page, handle smooth scroll
        if (isIndexPage && (path === '' || path === 'index.html' || path === currentPath)) {
            e.preventDefault();
            const target = document.querySelector(hash);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

