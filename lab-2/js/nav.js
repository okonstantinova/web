const pageToLinkMap = {
    "fav.html": "menu-fav",
    "cart.html": "menu-cart"
};

const currentPage = window.location.pathname; // путь текущей страницы
const pageFilename = currentPage.split('/').pop(); // разбиение пути на сегменты и получение значения последнего

for (const page in pageToLinkMap) {
    if (pageFilename === page)
    {
        document.getElementById(pageToLinkMap[page]).className = "menu-nav-active";
        break;  // выход из цикла, как только найдена соответствующая страница
    }
}