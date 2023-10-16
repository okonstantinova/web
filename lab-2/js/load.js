(function() {
    // Функция для вычисления статистики о времени загрузки страницы
    function calculateLoadTime() {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        return `Страница загружена за ${loadTime} миллисекунд.`;
    }

    // Функция для отображения статистики
    function displayStats() {
        const statsElement = document.getElementById('stats');
        statsElement.innerText = calculateLoadTime();
    }

    // Подписываемся на событие загрузки страницы
    window.addEventListener('load', displayStats);
})();