document.getElementById('properties').addEventListener('submit', function (event) {
    event.preventDefault(); // предотвращаем перезагрузку страницы

    const taste = document.querySelector('input[name="taste"]:checked');
    const decor = document.querySelector('input[name="decor"]:checked');

    let item = {
        title: "Бенто-торт",
        taste: taste.value,
        decor: decor.value,
        price: getPrice()
    };

    // получаем массив из хранилища
    const value = localStorage.getItem('cart');
    const items = value !== null ? JSON.parse(value) : [];
    items.push(item);

    localStorage.setItem('cart', JSON.stringify(items)); // обновляем хранилище

    renderCart(); // перерисовка корзины

    // отображение корзины
    const cart = document.getElementsByClassName('cart-container-hidden').item(0);
    cart.className = 'cart-container-visible';
});

function renderCart() {
    // получаем контейнер для динамических элементов
    const container = document.getElementsByClassName('cart-content').item(0);

    // очистим контейнер
    container.innerHTML = '';

    // получаем массив из хранилища
    const value = localStorage.getItem('cart');
    const items = value !== null ? JSON.parse(value) : [];

    // создаем элементы на основе данных
    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        const template = document.getElementById('cart-item-template'); // ссылка на шаблон
        const clone = document.importNode(template.content, true);

        const image = clone.querySelector('.cart-item-image-inner');
        image.src = getImageSrc();

        const title = clone.querySelector('.cart-item-title');
        title.textContent = item.title;

        const price = clone.querySelector('.cart-item-price');
        price.textContent = getPriceStr(item.price);

        const options = clone.querySelector('.cart-item-options');
        options.textContent = item.taste + ', ' + item.decor;

        const button = clone.querySelector('.cart-item-button');
        button.id = i.toString();

        container.appendChild(clone);
    }

    if (items.length === 0) {
        container.innerHTML = '<div class="cart-empty">В корзине пока что ничего нет...</div>';
        document.getElementsByClassName('cart-footer').item(0).style.display = 'none';
    }
    else
    {
        const price = document.getElementById("total-value");
        price.innerHTML = getTotalStr();
        document.getElementsByClassName('cart-footer').item(0).style.display = 'block';
    }
}

function closeCart() {
    const cart = document.getElementsByClassName('cart-container-visible').item(0);
    cart.className = 'cart-container-hidden';
}

function getPriceStr(price) {
    return price + ' руб.';
}

function getPrice() {
    return 3000;
}

function getTotalStr() {
    return getTotal() + ' руб.';
}

function getTotal() {
    // получаем массив из хранилища
    const value = localStorage.getItem('cart');
    const items = value !== null ? JSON.parse(value) : [];

    let total = 0
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        total += item.price;
    }

    return total;
}

function getImageSrc() {
    return 'img/category/bento.png';
}

function removeItem(event) {
    const element = event.target; // возвращаем элемент, который отправил событие
    const index = parseInt(element.id, 10); // представляем в 10-ой сс

    // получаем массив из хранилища
    const value = localStorage.getItem('cart');
    const items = value !== null ? JSON.parse(value) : [];

    items.splice(index, 1); // удаление
    localStorage.setItem('cart', JSON.stringify(items)); // обновляем хранилище

    renderCart(); // перерисовываем корзину
}

// инициализация компонента Swiper
const swiper = new Swiper(
    '.swiper', // имя класса-контейнера для слайдов
    {
    // установка опциональных параметров
    direction: 'horizontal', // анимация влево/вправо
    loop: true, // если дошли до последнего слайда, автоматически переходим к первому

    // инициализация кнопок
    navigation: {
        nextEl: '.swiper-button-next', // имя класса кнопки "следующий"
        prevEl: '.swiper-button-prev', // имя класса кнопки "предыдущий"
    },
});