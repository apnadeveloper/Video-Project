// Load navbar and footer components
document.addEventListener('DOMContentLoaded', function() {
  // Load navbar
  fetch('components/navbar.html')
    .then(response => response.text())
    .then(data => {
      document.querySelector('header').innerHTML = data;
    });
  
  // Load footer
  fetch('components/footer.html')
    .then(response => response.text())
    .then(data => {
      document.querySelector('footer').innerHTML = data;
    });
  
  // For category page, load videos based on category
  if (window.location.pathname.includes('category.html')) {
    loadCategoryVideos();
  }

  // Initialize age verification
  initAgeVerification();
});

function loadCategoryVideos() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('cat');
  
  if (category) {
    document.title = `${category.charAt(0).toUpperCase() + category.slice(1)} Videos | Video Hub Movies`;
    document.querySelector('.page-header h1').textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Videos`;
    
    const videos = getVideosByCategory(category);
    renderVideos(videos, '.video-grid');
  }
}

function getVideosByCategory(category) {
  // Sample videos for each category
  const allVideos = [
    // Anal
    { 
      id: 1, 
      title: "Anal Adventure", 
      category: "anal", 
      thumbnail: "https://images.unsplash.com/photo-1742407795182-144225af8ebe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      views: "2.4M",
      preview: "videos/upload-full.mp4",
      full: "videos/uplaod-full.mp4"
    },
    
    // Big Dick
    { 
      id: 2, 
      title: "Massive Cock", 
      category: "big-dick", 
      thumbnail: "img/bigdick-thumbnail.jpg", 
      views: "1.9M",
      preview: "videos/bigdick-preview.mp4",
      full: "videos/uplaod-full.mp4"
    },
    
    // Big Tits
    { 
      id: 3, 
      title: "Busty Babes", 
      category: "big-tits", 
      thumbnail: "img/bigtits-thumbnail.jpg", 
      views: "3.1M",
      preview: "videos/bigtits-preview.mp4",
      full: "videos/uplaod-full.mp4"
    },
    
    // Ebony
    { 
      id: 4, 
      title: "Dark Fantasy", 
      category: "ebony", 
      thumbnail: "img/ebony-thumbnail.jpg", 
      views: "1.7M",
      preview: "videos/ebony-preview.mp4",
      full: "videos/uplaod-full.mp4"
    },
    
    // Japanese
    { 
      id: 5, 
      title: "Tokyo Nights", 
      category: "japanese", 
      thumbnail: "img/japanese-thumbnail.jpg", 
      views: "2.8M",
      preview: "videos/japanese-preview.mp4",
      full: "videos/uplaod-full.mp4"
    },
    
    // Lesbian
    { 
      id: 6, 
      title: "Girl Play", 
      category: "lesbian", 
      thumbnail: "img/lesbian-thumbnail.jpg", 
      views: "2.2M",
      preview: "videos/lesbian-preview.mp4",
      full: "videos/uplaod-full.mp4"
    },
    
    // Mature
    { 
      id: 7, 
      title: "Experienced Women", 
      category: "mature", 
      thumbnail: "img/mature-thumbnail.jpg", 
      views: "1.5M",
      preview: "videos/mature-preview.mp4",
      full: "videos/uplaod-full.mp4"
    },
    
    // MILF
    { 
      id: 8, 
      title: "Hot Moms", 
      category: "milf", 
      thumbnail: "img/milf-thumbnail.jpg", 
      views: "2.6M",
      preview: "videos/milf-preview.mp4",
      full: "videos/uplaod-full.mp4"
    },
    
    // Old/Young
    { 
      id: 9, 
      title: "Age Gap", 
      category: "old-young", 
      thumbnail: "img/oldyoung-thumbnail.jpg", 
      views: "1.8M",
      preview: "videos/oldyoung-preview.mp4",
      full: "videos/uplaod-full.mp4"
    },
    
    // Teen
    { 
      id: 10, 
      title: "Young & Fresh", 
      category: "teen", 
      thumbnail: "img/teen-thumbnail.jpg", 
      views: "3.3M",
      preview: "videos/teen-preview.mp4",
      full: "videos/uplaod-full.mp4"
    }
  ];
  
  return allVideos.filter(video => category === 'all' || video.category === category);
}

// Video modal functionality
function setupVideoModal() {
  const modal = document.createElement('div');
  modal.className = 'video-modal';
  modal.innerHTML = `
    <div class="video-modal-content">
      <span class="close-modal">&times;</span>
      <video controls id="modal-video">
        Your browser does not support the video tag.
      </video>
    </div>
  `;
  document.body.appendChild(modal);

  // Close modal when clicking X
  modal.querySelector('.close-modal').addEventListener('click', () => {
    const video = document.getElementById('modal-video');
    video.pause();
    modal.style.display = 'none';
  });

  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      const video = document.getElementById('modal-video');
      video.pause();
      modal.style.display = 'none';
    }
  });

  return modal;
}

function renderVideos(videos, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  
  container.innerHTML = '';
  
  videos.forEach(video => {
    const videoCard = document.createElement('div');
    videoCard.className = 'col-md-6 col-lg-4 col-xl-3';
    videoCard.innerHTML = `
      <div class="card video-card h-100">
        <div class="video-thumbnail">
          <img src="${video.thumbnail}" alt="${video.title}" class="card-img-top">
          <video loop muted preload="none">
            <source src="${video.preview}" type="video/mp4">
          </video>
          <span class="category-badge">${video.category}</span>
          <i class="fas fa-play-circle play-icon"></i>
        </div>
        <div class="card-body">
          <h5 class="card-title">${video.title}</h5>
          <p class="card-text text-muted">${video.views} views</p>
        </div>
      </div>
    `;
    container.appendChild(videoCard);
    
    // Add hover functionality
    const thumbnail = videoCard.querySelector('.video-thumbnail');
    const previewVideo = thumbnail.querySelector('video');
    
    thumbnail.addEventListener('mouseenter', () => {
      previewVideo.style.display = 'block';
      previewVideo.play().catch(e => console.log('Autoplay prevented:', e));
    });
    
    thumbnail.addEventListener('mouseleave', () => {
      previewVideo.style.display = 'none';
      previewVideo.pause();
      previewVideo.currentTime = 0;
    });
    
    // Add click handler to play full video
    thumbnail.addEventListener('click', () => {
      const modal = document.querySelector('.video-modal') || setupVideoModal();
      const modalVideo = document.getElementById('modal-video');
      modalVideo.src = video.full;
      modal.style.display = 'flex';
      modalVideo.play().catch(e => console.log('Autoplay prevented:', e));
    });
  });
}

function initAgeVerification() {
  // Check if age verification has expired (7 days)
  const verificationTime = localStorage.getItem('ageVerifiedTimestamp');
  if (verificationTime && (Date.now() - verificationTime > 604800000)) {
    localStorage.removeItem('ageVerified');
    localStorage.removeItem('ageVerifiedTimestamp');
  }

  // Check if age has already been verified
  if (!localStorage.getItem('ageVerified')) {
    document.body.classList.add('age-verification-active');
    const ageVerification = document.getElementById('ageVerification');
    
    // Confirm age button
    document.getElementById('confirmAge').addEventListener('click', function() {
      localStorage.setItem('ageVerified', 'true');
      localStorage.setItem('ageVerifiedTimestamp', Date.now());
      document.body.classList.remove('age-verification-active');
      ageVerification.style.display = 'none';
    });
    
    // Deny age button
    document.getElementById('denyAge').addEventListener('click', function() {
      window.location.href = 'https://www.google.com';
    });
  } else {
    document.getElementById('ageVerification').style.display = 'none';
  }
}