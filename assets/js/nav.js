document.addEventListener('DOMContentLoaded', function() {
    // Mevcut URL'yi al
    const currentPath = window.location.pathname;
    
    // Tüm nav linklerini seç
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Her link için kontrol et
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
            
            // Eğer link bir submenu içindeyse, parent elementini de aktif yap
            const parentSubmenu = link.closest('.has-submenu');
            if (parentSubmenu) {
                parentSubmenu.classList.add('active');
            }
        }
    });
}); 