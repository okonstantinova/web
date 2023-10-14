function showHover(element) {
    const overlay = element.querySelector('.catalog-item-hover'); // находим дочерний элемент
    overlay.style.display = 'block';
}

function hideHover() {
    const overlays = document.querySelectorAll('.catalog-item-hover');
    overlays.forEach(overlay => overlay.style.display = 'none');
}