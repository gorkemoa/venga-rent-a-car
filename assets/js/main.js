document.addEventListener('DOMContentLoaded', () => {
  // Form validation ve submission
  const searchForm = document.querySelector('.search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const pickupLocation = document.getElementById('pickup-location').value;
      const dropoffLocation = document.getElementById('dropoff-location').value;
      const pickupDate = document.getElementById('pickup-date').value;
      const dropoffDate = document.getElementById('dropoff-date').value;

      // Form validation
      if (!pickupLocation || !dropoffLocation || !pickupDate || !dropoffDate) {
        alert('Lütfen tüm alanları doldurun.');
        return;
      }

      // Tarihleri kontrol et
      const pickup = new Date(pickupDate);
      const dropoff = new Date(dropoffDate);
      
      if (dropoff <= pickup) {
        alert('Dönüş tarihi, alış tarihinden sonra olmalıdır.');
        return;
      }

      
      // Form geçerliyse submit işlemi
      console.log('Form submitted:', {
        pickupLocation,
        dropoffLocation,
        pickupDate,
        dropoffDate
      });
      
      // TODO: API call veya redirect
    });
  }

  // Tarih inputlarının minimum değerlerini ayarla
  const pickupDateInput = document.getElementById('pickup-date');
  const dropoffDateInput = document.getElementById('dropoff-date');
  
  if (pickupDateInput && dropoffDateInput) {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Minimum tarihleri ayarla
    const minDateTime = now.toISOString().slice(0, 16);
    const minDropoffDateTime = tomorrow.toISOString().slice(0, 16);
    
    pickupDateInput.min = minDateTime;
    dropoffDateInput.min = minDropoffDateTime;
    
    // Alış tarihi değiştiğinde dönüş tarihinin minimumunu güncelle
    pickupDateInput.addEventListener('change', (e) => {
      const selectedPickup = new Date(e.target.value);
      const minDropoff = new Date(selectedPickup);
      minDropoff.setDate(minDropoff.getDate() + 1);
      dropoffDateInput.min = minDropoff.toISOString().slice(0, 16);
      
      // Eğer seçili dönüş tarihi yeni minimumdan küçükse, dönüş tarihini güncelle
      if (new Date(dropoffDateInput.value) <= selectedPickup) {
        dropoffDateInput.value = minDropoff.toISOString().slice(0, 16);
      }
    });
  }

  // Yukarı çık butonu fonksiyonları
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  
  if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Mobil menü toggle
  const mobileMenuButton = document.createElement('button');
  mobileMenuButton.className = 'mobile-menu-button';
  mobileMenuButton.innerHTML = `
    <span class="menu-icon"></span>
    <span class="sr-only">Menüyü Aç/Kapat</span>
  `;
  
  const nav = document.querySelector('.nav');
  if (nav) {
    nav.prepend(mobileMenuButton);
    
    mobileMenuButton.addEventListener('click', () => {
      nav.classList.toggle('nav-open');
    });
  }

  // Scroll handler for header
  const header = document.querySelector('.header');
  if (header) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
      }
      
      if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
      } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
      }
      
      lastScroll = currentScroll;
    });
  }
}); 

