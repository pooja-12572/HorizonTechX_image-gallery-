/* ===========================
   JavaScript Functionality
   =========================== */

// Sample gallery data with images and metadata
const galleryData = [
    {
        id: 1,
        title: "Mountain Landscape",
        category: "nature",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop",
        description: "Beautiful mountain landscape with snow peaks"
    },
    {
        id: 2,
        title: "Ocean Waves",
        category: "nature",
        image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=500&h=500&fit=crop",
        description: "Serene ocean waves at sunset"
    },
    {
        id: 3,
        title: "Tech Innovation",
        category: "technology",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop",
        description: "Modern technology and innovation"
    },
    {
        id: 4,
        title: "City Skyline",
        category: "urban",
        image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500&h=500&fit=crop",
        description: "Urban city skyline at night"
    },
    {
        id: 5,
        title: "Forest Path",
        category: "nature",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=500&fit=crop",
        description: "Peaceful forest path"
    },
    {
        id: 6,
        title: "Tech Gadgets",
        category: "technology",
        image: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=500&h=500&fit=crop",
        description: "Latest technology gadgets"
    },
    {
        id: 7,
        title: "Urban Art",
        category: "urban",
        image: "https://images.unsplash.com/photo-1499475752891-1949a570b0dc?w=500&h=500&fit=crop",
        description: "Street art in urban setting"
    },
    {
        id: 8,
        title: "Abstract Patterns",
        category: "abstract",
        image: "https://images.unsplash.com/photo-1577720643272-265f434f8e3c?w=500&h=500&fit=crop",
        description: "Colorful abstract patterns"
    },
    {
        id: 9,
        title: "Sunset Valley",
        category: "nature",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop",
        description: "Golden sunset in valley"
    },
    {
        id: 10,
        title: "Digital Design",
        category: "technology",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop",
        description: "Digital design workspace"
    },
    {
        id: 11,
        title: "Modern Architecture",
        category: "urban",
        image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&h=500&fit=crop",
        description: "Contemporary architecture design"
    },
    {
        id: 12,
        title: "Color Splash",
        category: "abstract",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop",
        description: "Vibrant color splash art"
    }
];

// State variables
let currentFilter = 'all';
let currentLightboxIndex = -1;
let filteredData = galleryData;

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', () => {
    renderGallery(galleryData);
    setupEventListeners();
});

// Render gallery items
function renderGallery(data) {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';

    data.forEach((item, index) => {
        const galleryItem = createGalleryItem(item, index);
        galleryGrid.appendChild(galleryItem);
    });

    filteredData = data;
}

// Create gallery item element
function createGalleryItem(item, index) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.setAttribute('data-category', item.category);
    div.setAttribute('data-index', index);

    div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="gallery-overlay">
            <div class="gallery-title">${item.title}</div>
            <div class="gallery-category">${item.category}</div>
        </div>
    `;

    div.addEventListener('click', () => openLightbox(index));

    return div;
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');
            filterGallery(category);
        });
    });

    // Lightbox controls
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', previousImage);
    lightboxNext.addEventListener('click', nextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'ArrowLeft') previousImage();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'Escape') closeLightbox();
    });

    // Close lightbox on background click
    const lightbox = document.getElementById('lightbox');
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

// Filter gallery by category
function filterGallery(category) {
    currentFilter = category;

    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.animation = 'fadeInUp 0.5s ease';
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    // Update filteredData for lightbox navigation
    filteredData = galleryData.filter(item => 
        category === 'all' || item.category === category
    );
}

// Open lightbox
function openLightbox(index) {
    currentLightboxIndex = index;
    const item = galleryData[index];

    document.getElementById('lightboxImage').src = item.image;
    document.getElementById('lightboxTitle').textContent = item.title;
    document.getElementById('lightboxCategory').textContent = item.category;

    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Navigate to next image
function nextImage() {
    const filteredIndices = filteredData.map(item => galleryData.indexOf(item));
    const currentPosition = filteredIndices.indexOf(currentLightboxIndex);
    const nextPosition = (currentPosition + 1) % filteredIndices.length;
    openLightbox(filteredIndices[nextPosition]);
}

// Navigate to previous image
function previousImage() {
    const filteredIndices = filteredData.map(item => galleryData.indexOf(item));
    const currentPosition = filteredIndices.indexOf(currentLightboxIndex);
    const prevPosition = (currentPosition - 1 + filteredIndices.length) % filteredIndices.length;
    openLightbox(filteredIndices[prevPosition]);
}

// Lazy loading images
function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}
