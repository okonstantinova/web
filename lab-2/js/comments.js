document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("load", function() {
        loadComments();
    });
});

function hidePreloader() {
    const preloader = document.querySelector(".preloader");
    preloader.style.display = "none";
}

function loadComments() {
    setTimeout(delayedLoadComments, 1000);
}

function delayedLoadComments() {
    let page = getRandomPage();
    const url = `http://localhost:3000/bento-comments?_page=${page}&_limit=5`; // запрашиваем случайные 5 комментариев
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const request = fetch(url, requestOptions);
    const response = request.then(response => {
        if (!response.ok) {
            throw new Error(`Response was not ok: ${response.statusText}`);
        }

        return response.json();
    });

    const result = response.then(data => {
        renderComments(data);
    });

    result.catch(error => {
        renderError();
        console.error('Loading error: ', error.message);
    });
}

function renderComments(data) {
    hidePreloader();
    console.log('Data received:', data);

    // получаем контейнер для динамических элементов
    const container = document.getElementsByClassName('content-comments').item(0);

    for (let i = 0; i < data.length; i++) {
        const comment = data[i];
        const template = document.getElementById('content-comment-template'); // ссылка на шаблон
        const clone = document.importNode(template.content, true);

        const rating = clone.querySelector('.comment-rating');

        let stars = '';
        for (let i = 0; i < comment.rating; i++) {
            stars += '\u2605'
        }
        rating.textContent = stars;

        const title = clone.querySelector('.comment-title');
        title.textContent = comment.title;

        const nameDate = clone.querySelector('.comment-name-date');
        nameDate.textContent = comment.author + " " + comment.date;

        const text = clone.querySelector('.comment-text');
        text.textContent = comment.text;

        container.appendChild(clone);
    }
}

function renderError() {
    hidePreloader();

    // получаем контейнер для динамических элементов
    const container = document.getElementsByClassName('content-comments').item(0);

    const template = document.getElementById('content-error-template'); // ссылка на шаблон
    const clone = document.importNode(template.content, true);

    container.appendChild(clone);
}

function getRandomPage() {
    const pageCount= 3;
    return Math.floor(Math.random() * pageCount) + 1; // возвращаем значение от 1 до 3 включительно
}