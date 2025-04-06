const track = document.getElementById('carouselTrack');
const indicators = document.getElementById('indicators');
const cards = Array.from(track.children);
const totalCards = cards.length;
const visibleIndicators = 6;

let currentIndex = 0;
let autoSlideInterval;

function updateCarousel() {
  const offset = currentIndex * (cards[0].offsetWidth + 40);
  track.style.transform = `translateX(calc(50% - ${(cards[0].offsetWidth + 40) * currentIndex + cards[0].offsetWidth / 2}px))`;

  cards.forEach((card, i) => {
    card.classList.toggle('active', i === currentIndex);
  });

  updateIndicators();
}

function updateIndicators() {
  indicators.innerHTML = '';
  const groupSize = Math.ceil(totalCards / visibleIndicators);
  for (let i = 0; i < visibleIndicators; i++) {
    const btn = document.createElement('button');
    if (currentIndex >= i * groupSize && currentIndex < (i + 1) * groupSize) {
      btn.classList.add('active');
    }
    btn.addEventListener('click', () => {
      currentIndex = i * groupSize;
      updateCarousel();
      resetAutoSlide();
    });
    indicators.appendChild(btn);
  }
}

function autoSlide() {
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCarousel();
  }, 4000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
  stopAutoSlide();
  autoSlide();
}

document.querySelectorAll('.service-lines button').forEach(btn => {
  btn.addEventListener('click', () => {
    currentIndex = parseInt(btn.dataset.start);
    updateCarousel();
    resetAutoSlide();
  });
});

// Touch / Drag support
let startX = 0;
let isDragging = false;

track.addEventListener('mousedown', (e) => {
  startX = e.pageX;
  isDragging = true;
  stopAutoSlide();
});

track.addEventListener('mouseup', (e) => {
  if (!isDragging) return;
  isDragging = false;
  const diff = e.pageX - startX;
  if (diff > 50 && currentIndex > 0) currentIndex--;
  else if (diff < -50 && currentIndex < totalCards - 1) currentIndex++;
  updateCarousel();
  resetAutoSlide();
});

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  stopAutoSlide();
});

track.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;
  if (diff > 50 && currentIndex > 0) currentIndex--;
  else if (diff < -50 && currentIndex < totalCards - 1) currentIndex++;
  updateCarousel();
  resetAutoSlide();
});

// Init
window.addEventListener('load', () => {
  updateCarousel();
  autoSlide();
});

// Form 
  const openBtn = document.getElementById("openFormBtn");
  const closeBtn = document.getElementById("closeFormBtn");
  const modal = document.getElementById("formModal");

  openBtn.addEventListener("click", () => modal.classList.add("active"));
  closeBtn.addEventListener("click", () => modal.classList.remove("active"));

  document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = this.email.value.trim();
    const phone = phoneInput.getNumber();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return alert("Enter a valid email.");
    if (!phoneInput.isValidNumber()) return alert("Enter a valid phone number.");

    alert("Form submitted successfully!");

    modal.classList.remove("active");
    this.reset();
  });

//   USP 

function showOverlay(title, description) {
    document.getElementById('overlay-title').innerText = title;
    document.getElementById('overlay-description').innerText = description;
    document.getElementById('overlay').style.display = 'flex';
  }

  function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
  }

