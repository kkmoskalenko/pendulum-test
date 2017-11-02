/**
 * Конвертирует градусы в радианы
 * @param degrees Значение в градусах
 * @returns {number} Значение в радианах
 */
Math.radians = (degrees) => {
    return degrees * Math.PI / 180;
};

/**
 * Класс, представляющий приложение
 */
class Application {
    /**
     * Создаёт приложение
     */
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");

        this.angleEl = document.getElementById("angle");
        this.lengthEl = document.getElementById("length");
        this.decelerationEl = document.getElementById("deceleration");

        // Время (в миллисекундах), через которое происходит перерисовка
        this.interval = 30;

        this.run = false;

        this.button = document.getElementById("mainButton");
        this.button.addEventListener('click', () => {
            if (this.run) {
                this.enableInputFields();

                clearInterval(this.timer);
                this.button.value = "Запустить";
            }
            else if (this.validateData()) {
                this.disableInputFields();

                const data = this.getData();

                // Если маятник существут, сохраняем его текущее время
                if (this.pendulum) {
                    data.time = this.pendulum.time;
                }

                // Создаём новый маятник
                this.pendulum = new Pendulum(250, 50, 15, data.angle, data.length, data.deceleration);

                // Если в data.time что-то сохранено, передаём текущее время новому маятнику
                if (isFinite(data.time)) {
                    this.pendulum.time = data.time;
                }

                this.timer = setInterval(() => this.redraw(), this.interval);
                this.button.value = "Остановить";
            }

            this.run = !this.run;
        });
    }

    /**
     * Очищает холст
     */
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Перерисовывает весь холст заново
     */
    redraw() {
        this.clear();

        this.pendulum.draw(this.context, this.interval);
    }

    /**
     * Получает данные полей
     * @returns {*} Данные полей или null, если они заполнены неправильно
     */
    getData() {
        const angle = parseFloat(this.angleEl.value);
        const length = parseFloat(this.lengthEl.value);
        const deceleration = parseFloat(this.decelerationEl.value);

        if (isFinite(angle) && isFinite(length) && isFinite(deceleration))
            return {
                angle: angle,
                length: length,
                deceleration: deceleration
            };
        else
            return null;
    }

    /**
     * Выводит alert'ы о недопустимых значениях
     * @returns {boolean} Флаг, верно ли заполнены поля
     */
    validateData() {
        const data = this.getData();

        if (data === null) {
            alert("Одно или несколько полей заполнены неправильно или не заполнены совсем!");
            return false;
        }
        else {
            if (data.angle < -90 || data.angle > 90) {
                alert("Начальный угол отклонения должен быть в пределах от -90° до 90°!");
                return false;
            }

            if (data.length <= 0) {
                alert("Длина подвеса должна быть больше нуля!");
                return false;
            }

            if (data.deceleration < 0) {
                alert("Коэффицент затухания не должен быть меньше нуля!");
                return false;
            }

            return true;
        }
    }

    /**
     * Активирует поля ввода
     */
    enableInputFields() {
        this.angleEl.disabled = false;
        this.lengthEl.disabled = false;
        this.decelerationEl.disabled = false;
    }

    /**
     * Блокирует поля ввода
     */
    disableInputFields() {
        this.angleEl.disabled = true;
        this.lengthEl.disabled = true;
        this.decelerationEl.disabled = true;
    }
}

/**
 * Класс, представляющий маятник
 */
class Pendulum {
    /**
     * Создаёт маятник
     * @param supportX0 Координата точки крепления маятника по оси X
     * @param supportY0 Координата точки крепления маятника по оси Y
     * @param radius Радиус груза (так как он имеет форму шара)
     * @param angle Угол начального отклонения маятника (в градусах)
     * @param length Длина подвеса
     * @param deceleration Коэффицент затухания
     */
    constructor(supportX0, supportY0, radius, angle, length, deceleration) {
        const coef = 400; // Коэффециент масштабирования длины нити
        length *= coef;

        // Начальные координаты маятника
        this.x0 = supportX0;
        this.y0 = supportY0 + length;

        // Текущие координаты маятника
        this.x = this.x0;
        this.y = this.y0;

        this.radius = radius;
        this.amplitude = Pendulum.calcAmplitude(angle, length);
        this.length = length;
        this.deceleration = deceleration;

        this.time = 0; // Время
        this.period = Pendulum.calcPeriod(length / coef); // Период колебаний
    }

    /**
     * Вычисляет амплитуду колебания
     * @param angle Угол начального отклонения (в градусах)
     * @param length Длина подвеса
     * @returns {number} Амплитуда колебания
     */
    static calcAmplitude(angle, length) {
        const angleInRad = Math.radians(angle);

        return Math.sin(angleInRad) * length;
    }

    /**
     * Вычисляет период колебания
     * @param length Длина подвеса
     * @returns {number} Период колебания
     */
    static calcPeriod(length) {
        const g = 9.80665; // Среднее ускорение свободного падения на Земле

        return 2 * Math.PI * Math.sqrt(length / g);
    }

    /**
     * Вычисляет предварительное значение x (без учёта начальных координат)
     * @returns {number} Значение x
     */
    calcX() {
        const angularFrequency = (2 * Math.PI) / this.period; //  Циклическая частота (ω = [1 рад/с])
        const deceleration = Math.pow(Math.E, -this.deceleration * this.getTime());

        // В данном случае начальная фаза равна нулю (φ0 = 0)
        return this.amplitude * Math.cos(angularFrequency * this.getTime()) * deceleration;
    }

    /**
     * Вычисляет предварительное значение y (без учёта начальных координат)
     * @returns {number} Значение y
     */
    calcY() {
        const lengthSquared = Math.pow(this.length, 2);
        const xSquared = Math.pow(this.calcX(), 2);

        return Math.sqrt(lengthSquared - xSquared) - this.length;
    }

    /**
     * Возвращает текущее время в секундах
     * @returns {number} Текущее время в секундах
     */
    getTime() {
        return this.time / 1000;
    }

    /**
     * Рисует груз
     * @param context Контекст 2D рендеринга для элемента canvas
     */
    drawBob(context) {
        const gradient = context.createRadialGradient(this.x, this.y, this.radius, this.x - 2, this.y - 4, 2);

        gradient.addColorStop(0, '#333');
        gradient.addColorStop(1, '#999');

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        context.fill();
    }

    /**
     * Рисует шнур/стержень (cord/rod), на котором висит груз
     * @param context Контекст 2D рендеринга для элемента canvas
     */
    drawCord(context) {
        drawLine(this.x0, this.y0 - this.length, this.x, this.y, "#555");

        /**
         * Рисует отрезок
         * @param x0 Начальная координата x
         * @param y0 Начальная координата y
         * @param x Конечная координата x
         * @param y Конечная координата y
         * @param color Цвет отрезка
         */
        function drawLine(x0, y0, x, y, color) {
            context.beginPath();
            context.strokeStyle = color;
            context.moveTo(x0, y0);
            context.lineTo(x, y);
            context.closePath();
            context.stroke();
        }
    }

    /**
     * Рисует маятник целиком
     * @param context Контекст 2D рендеринга для элемента canvas
     * @param interval Интервал, через который происходит перерисовка canvas
     */
    draw(context, interval) {
        this.time += interval;

        this.x = this.calcX() + this.x0;
        this.y = this.calcY() + this.y0;

        this.drawCord(context);
        this.drawBob(context);
    }
}

window.onload = () => {
    new Application();
};