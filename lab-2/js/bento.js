document.getElementById('properties').addEventListener('submit', function (event) {
    event.preventDefault(); // предотвращаем перезагрузку страницы

    const taste = document.querySelector('input[name="taste"]:checked');
    const decor = document.querySelector('input[name="decor"]:checked');

    let item = {
        title: "Бенто-торт",
        taste: taste.value,
        decor: decor.value
    };

    // находим свободное имя ключа, чтобы добавить элемент
    for (let i = 0; true; i++) {
        const key = "item-" + i;
        if (localStorage.getItem(key) === null) {
            localStorage.setItem(key, JSON.stringify(item));
            break;
        }
    }

    renderCart();

    const cart = document.getElementsByClassName('cart-container-hidden').item(0);
    cart.className = 'cart-container-visible';
});

function renderCart() {
    // получаем контейнер для динамических элементов
    var container = document.getElementsByClassName('cart-content').item(0);

    // очистим контейнер
    container.innerHTML = '';

    let added = false;

    // создаем элементы на основе данных
    for (let i = 0; i < 1000; i++) {
        const item = localStorage.getItem("item-" + i);

        if (item !== null) {
            let value = JSON.parse(item);

            var cartItem = document.createElement("div");
            cartItem.className = 'cart-item';
            container.appendChild(cartItem);

            cartItem.innerHTML =
                '<div class="cart-item-image">' +
                '<img src="' + getImageSrc() + '">' +
                '</div>' +
                '<div>' +
                '<div class="cart-item-title">' + value.title + '</div>' +
                '<div class="cart-item-price">' + getPriceStr() + '</div>' +
                '<div class="cart-item-options">' + value.taste + ', ' + value.decor + '</div>' +
                '<button id="' + "item-" + i + '" onclick="removeItem(event)">Удалить</button>' +
                '</div>'

            added = true;
        }
    }

    if (!added) {
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

function getPriceStr() {
    return getPrice() + ' руб.';
}

function getPrice() {
    return 3000;
}

function getTotalStr() {
    return getTotal() + ' руб.';
}

function getTotal() {
     const count = localStorage.length;
     return count * getPrice();
}

function getImageSrc() {
    return 'img/category/bento.png';
}

function removeItem(event) {
    const element = event.target; // возвращаем элемент, который отправил событие
    const id = element.id;
    localStorage.removeItem(id);

    renderCart(); // перерисовываем корзину
}
