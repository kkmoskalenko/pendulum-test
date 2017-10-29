const g = 9.80665; // Среднее ускорение свободного падения на Земле

class Application {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");

        // Время (в миллисекундах), через которое происходит перерисовка
        this.interval = 30;

        this.run = false;

        this.button = document.getElementById("mainButton");
        this.button.addEventListener('click', () => {
            if(this.run) {
                Application.enableInputFields();

                clearInterval(this.timer);
                this.button.value = "Запустить";
            }
            else {
                if(Application.validateData()) {
                    Application.disableInputFields();

                    const data = Application.getData();

                    this.pendulum = new Pendulum(250, 50, 20, data.amplitude, data.dt, data.length);
                    this.pendulum.drawCord(this.context);
                    this.pendulum.drawBob(this.context);

                    this.timer = setInterval(() => this.redraw(), this.interval);
                    this.button.value = "Остановить";
                }
            }

            this.run = !this.run;
        });
    }

    // Очищает холст
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Вызывается каждый кадр таймером перерисовки
    redraw() {
        this.clear();

        this.pendulum.draw(this.context);
    }

    // Возвращает данные полей или null, если они заполнены неправильно
    static getData() {
        const amplitudeEl = document.getElementById("amplitude");
        const dtEl = document.getElementById("speed");
        const lengthEl = document.getElementById("length");
        // const decelerateEl = document.getElementById("decelerate");

        const amplitude = parseFloat(amplitudeEl.value);
        const dt = parseFloat(dtEl.value);
        const length = parseFloat(lengthEl.value);
        // const decelerate = decelerateEl.checked; // true -> pendulum.dclrt = 1; false -> pendulum.dclrt = 0

        if (isFinite(amplitude) && isFinite(dt) && isFinite(length))
            return {
                amplitude: amplitude,
                dt: dt,
                length: length
            };
        else
            return null;
    }

    // Выводит alert'ы о недопустимых значениях
    // Возвращает true, если с данными полей всё нормально
    static validateData() {
        const data = Application.getData();

        if(data === null) {
            alert("Одно или несколько полей заполнены неправильно или не заполнены совсем!");
            return false;
        }
        else {
            if (data.amplitude > data.length) {
                alert("Амплитуда не может быть больше длины нити!");
                return false;
            }

            if (data.amplitude <= 0) {
                alert("Амплитуда не может быть меньше либо равна 0!");
                return false;
            }

            return true;
        }
    }

    // Активирует поля ввода
    static enableInputFields() {
        const amplitudeField = document.getElementById('amplitude');
        const speedField = document.getElementById('speed');
        const lengthField = document.getElementById('length');

        amplitudeField.disabled = false;
        speedField.disabled = false;
        lengthField.disabled = false;
    }

    // Блокирует поля ввода
    static disableInputFields() {
        const amplitudeField = document.getElementById('amplitude');
        const speedField = document.getElementById('speed');
        const lengthField = document.getElementById('length');

        amplitudeField.disabled = true;
        speedField.disabled = true;
        lengthField.disabled = true;
    }
}

class Pendulum {
    constructor(supportX0, supportY0, radius, amplitude, dt, length) {
        // Начальные координаты маятника
        this.x0 = supportX0;
        this.y0 = supportY0 + length;

        // Текущие координаты маятника
        this.x = this.x0;
        this.y = this.y0;

        this.radius = radius; // Радиус груза (так как он имеет форму круга)
        this.amplitude = amplitude; // Амплитуда колебания
        this.dt = dt; // Шаг во времени – время, которое прибавляется к текущему при каждой альтерации setTimeout()
        this.length = length; // Длина нити

        this.time = 0; // Время
        this.period = this.calcPeriod();
        // this.dclrt = 0;
    }

    // Вычисляет предварительное значение x (без учёта начальных координат)
    calcX()  {
        // x = amplitude * Math.sin(time/period * 2* Math.PI) * Math.pow(2.71, -0.1 * time * dclrt);

        return this.amplitude * Math.sin(this.time / this.period * 2 * Math.PI); // TODO: Разобраться, почему формула именно такая
    }

    // Вычисляет предварительное значение y (без учёта начальных координат)
    calcY() {
        // y = Math.sqrt(length * length - x * x) - length;

        const lengthSquared = Math.pow(this.length, 2);
        const xSquared = Math.pow(this.calcX(), 2);

        return Math.sqrt(lengthSquared - xSquared) - this.length;
    }

    calcPeriod() {
        return 2 * Math.PI / Math.sqrt(this.length / g); // TODO: Разобраться, почему не 2π * sqrt(l/g)
    }

    // Рисуем груз (материальную точку)
    drawBob(context) {
        const gradient = context.createRadialGradient(this.x, this.y, this.radius, this.x - 2, this.y - 4, 2);

        gradient.addColorStop(0, '#333');
        gradient.addColorStop(1, '#999');

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        context.fill();
    }

    // Рисуем шнур/стержень (cord/rod), на котором висит груз
    drawCord(context) {
        drawLine(this.x0, this.y0 - this.length, this.x, this.y, "#555");

        function drawLine(x0, y0, x, y, color) {
            context.beginPath();
            context.strokeStyle = color;
            context.moveTo(x0, y0);
            context.lineTo(x, y);
            context.closePath();
            context.stroke();
        }
    }

    // Рисуем маятник целиком
    draw(context) {
        this.time += this.dt;

        this.x = this.calcX() + this.x0;
        this.y = this.calcY() + this.y0;

        this.drawCord(context);
        this.drawBob(context);
    }
}

window.onload = () => {
    new Application();
};