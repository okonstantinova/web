const pageToLinkMap = {
    "fav.html": "menu-fav",
    "cart.html": "menu-cart"
};

const currentPage = window.location.href; // url адрес текущей страницы
for (const page in pageToLinkMap) {
    if (currentPage.includes(page))
    {
        document.getElementById(pageToLinkMap[page]).className = "menu-nav-active";
        break;  // выход из цикла, как только найдена соответствующая страница
    }
}