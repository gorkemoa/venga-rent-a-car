// Hamburger menü fonksiyonu - global olarak tanımlandı
window.toggleMobileMenu = function(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  console.log("Hamburger menüye tıklandı!");
  var menuToggle = document.querySelector('.mobile-menu-toggle');
  var nav = document.querySelector('.nav');
  
  if (menuToggle && nav) {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Nav içeriğinin doğru şekilde göründüğünden emin olmak için
    if (nav.classList.contains('active')) {
      setTimeout(function() {
        nav.style.display = 'block';
      }, 50);
    }
  }
};

// Menü dışına tıklandığında kapatma
document.addEventListener('click', function(e) {
  var nav = document.querySelector('.nav');
  var menuToggle = document.querySelector('.mobile-menu-toggle');
  
  if (nav && nav.classList.contains('active') && 
      !nav.contains(e.target) && 
      !menuToggle.contains(e.target)) {
    nav.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
});

// Sayfa boyutu değiştiğinde menüyü kapat
window.addEventListener('resize', function() {
  if (window.innerWidth > 992) {
    var nav = document.querySelector('.nav');
    var menuToggle = document.querySelector('.mobile-menu-toggle');
    var hasSubmenuItems = document.querySelectorAll('.has-submenu');
    
    if (menuToggle) menuToggle.classList.remove('active');
    if (nav) nav.classList.remove('active');
    document.body.classList.remove('menu-open');
    
    if (hasSubmenuItems) {
      hasSubmenuItems.forEach(function(item) {
        item.classList.remove('show');
      });
    }
  }
});

// Header yüklendikten sonra çalıştırılacak işlemler
function initHeader() {
  var nav = document.querySelector('.nav');
  var navMenu = document.querySelector('.nav-menu');
  
  if (nav && navMenu) {
    navMenu.style.opacity = '1';
    navMenu.style.visibility = 'visible';
  }
  
  // Alt menü fonksiyonlarını etkinleştir
  var hasSubmenuItems = document.querySelectorAll('.has-submenu > a');
  hasSubmenuItems.forEach(function(link) {
    link.addEventListener('click', function(e) {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        this.parentNode.classList.toggle('show');
      }
    });
  });
}

// DOM yüklendiğinde header'ı başlat
document.addEventListener('DOMContentLoaded', function() {
  // Header zaten yüklendiyse başlat
  if (document.querySelector('.header')) {
    initHeader();
  }
  
  // Eğer header bir komponent olarak yükleniyorsa, yüklenmesini bekle
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        for (var i = 0; i < mutation.addedNodes.length; i++) {
          if (mutation.addedNodes[i].querySelector && mutation.addedNodes[i].querySelector('.header')) {
            initHeader();
            break;
          }
        }
      }
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
}); 