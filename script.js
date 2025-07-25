
function showSection(id) {
  document.querySelectorAll('.section').forEach(el => {
    el.style.display = 'none';
  });
  document.getElementById(id).style.display = 'block';
}
