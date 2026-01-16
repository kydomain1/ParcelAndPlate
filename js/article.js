// Load article content
document.addEventListener('DOMContentLoaded', function() {
    loadArticle();
});

function loadArticle() {
    // Get article ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = parseInt(urlParams.get('id'));

    if (!articleId) {
        document.getElementById('articleContent').innerHTML = '<p>Article not found.</p>';
        return;
    }

    // Find article
    const article = articles.find(a => a.id === articleId);
    
    if (!article) {
        document.getElementById('articleContent').innerHTML = '<p>Article not found.</p>';
        return;
    }

    // Display article
    const articleContent = document.getElementById('articleContent');
    articleContent.innerHTML = `
        <div class="article-header">
            <span class="article-category">${article.categoryName}</span>
            <h1 class="article-title">${article.title}</h1>
            <div class="article-meta">
                <span>${article.date} • By ${article.author}</span>
            </div>
        </div>
        <div class="article-body">
            ${article.content}
        </div>
    `;

    // Update page title
    document.title = `${article.title} - ParcelAndPlate`;
}

