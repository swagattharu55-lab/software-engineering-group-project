console.log('FoodShare App Loaded');
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  if (window.location.href.includes(btn.getAttribute('href'))) {
    btn.classList.add('active');
  }
});