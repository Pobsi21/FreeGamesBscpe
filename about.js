const options = document.querySelectorAll('.option');

options.forEach(option => {
  option.addEventListener('click', () => {
    options.forEach(opt => opt.classList.remove('active')); // Remove 'active' class from all
    option.classList.add('active'); // Add 'active' class to the clicked one
  });
});
