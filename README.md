# pendulum-test
Простое веб-приложение, симулирующее поведение математического маятника с помощью HTML5 Canvas.

## Как запустить
1. Склонировать этот репозиторий или скачать и распаковать [архив с исходным кодом](https://github.com/kkmoskalenko/pendulum-test/archive/master.zip).
2. Открыть `index.html` любым браузером

Кроме того, последняя версия проекта всегда доступна по [адресу](https://kkmoskalenko.github.io/pendulum-test/).

# Документация

## Classes

<dl>
<dt><a href="#Application">Application</a></dt>
<dd><p>Класс, представляющий приложение</p>
</dd>
<dt><a href="#Pendulum">Pendulum</a></dt>
<dd><p>Класс, представляющий маятник</p>
</dd>
</dl>

<a name="Application"></a>

## Application
Класс, представляющий приложение

**Kind**: global class  

* [Application](#Application)
    * [new Application()](#new_Application_new)
    * [.clear()](#Application+clear)
    * [.redraw()](#Application+redraw)
    * [.getData()](#Application+getData) ⇒ <code>\*</code>
    * [.validateData()](#Application+validateData) ⇒ <code>boolean</code>
    * [.enableInputFields()](#Application+enableInputFields)
    * [.disableInputFields()](#Application+disableInputFields)

<a name="new_Application_new"></a>

### new Application()
Создаёт приложение

<a name="Application+clear"></a>

### application.clear()
Очищает холст

**Kind**: instance method of [<code>Application</code>](#Application)  
<a name="Application+redraw"></a>

### application.redraw()
Перерисовывает весь холст заново

**Kind**: instance method of [<code>Application</code>](#Application)  
<a name="Application+getData"></a>

### application.getData() ⇒ <code>\*</code>
Получает данные полей

**Kind**: instance method of [<code>Application</code>](#Application)  
**Returns**: <code>\*</code> - Данные полей или null, если они заполнены неправильно  
<a name="Application+validateData"></a>

### application.validateData() ⇒ <code>boolean</code>
Выводит alert'ы о недопустимых значениях

**Kind**: instance method of [<code>Application</code>](#Application)  
**Returns**: <code>boolean</code> - Флаг, верно ли заполнены поля  
<a name="Application+enableInputFields"></a>

### application.enableInputFields()
Активирует поля ввода

**Kind**: instance method of [<code>Application</code>](#Application)  
<a name="Application+disableInputFields"></a>

### application.disableInputFields()
Блокирует поля ввода

**Kind**: instance method of [<code>Application</code>](#Application)  
<a name="Pendulum"></a>

## Pendulum
Класс, представляющий маятник

**Kind**: global class  

* [Pendulum](#Pendulum)
    * [new Pendulum(supportX0, supportY0, radius, angle, length, deceleration)](#new_Pendulum_new)
    * _instance_
        * [.calcX()](#Pendulum+calcX) ⇒ <code>number</code>
        * [.calcY()](#Pendulum+calcY) ⇒ <code>number</code>
        * [.getTime()](#Pendulum+getTime) ⇒ <code>number</code>
        * [.drawBob(context)](#Pendulum+drawBob)
        * [.drawCord(context)](#Pendulum+drawCord)
        * [.draw(context, interval)](#Pendulum+draw)
    * _static_
        * [.calcAmplitude(angle, length)](#Pendulum.calcAmplitude) ⇒ <code>number</code>
        * [.calcPeriod(length)](#Pendulum.calcPeriod) ⇒ <code>number</code>

<a name="new_Pendulum_new"></a>

### new Pendulum(supportX0, supportY0, radius, angle, length, deceleration)
Создаёт маятник


| Param | Description |
| --- | --- |
| supportX0 | Координата точки крепления маятника по оси X |
| supportY0 | Координата точки крепления маятника по оси Y |
| radius | Радиус груза (так как он имеет форму шара) |
| angle | Угол начального отклонения маятника (в градусах) |
| length | Длина подвеса |
| deceleration | Коэффицент затухания |

<a name="Pendulum+calcX"></a>

### pendulum.calcX() ⇒ <code>number</code>
Вычисляет предварительное значение x (без учёта начальных координат)

**Kind**: instance method of [<code>Pendulum</code>](#Pendulum)  
**Returns**: <code>number</code> - Значение x  
<a name="Pendulum+calcY"></a>

### pendulum.calcY() ⇒ <code>number</code>
Вычисляет предварительное значение y (без учёта начальных координат)

**Kind**: instance method of [<code>Pendulum</code>](#Pendulum)  
**Returns**: <code>number</code> - Значение y  
<a name="Pendulum+getTime"></a>

### pendulum.getTime() ⇒ <code>number</code>
Возвращает текущее время в секундах

**Kind**: instance method of [<code>Pendulum</code>](#Pendulum)  
**Returns**: <code>number</code> - Текущее время в секундах  
<a name="Pendulum+drawBob"></a>

### pendulum.drawBob(context)
Рисует груз

**Kind**: instance method of [<code>Pendulum</code>](#Pendulum)  

| Param | Description |
| --- | --- |
| context | Контекст 2D рендеринга для элемента canvas |

<a name="Pendulum+drawCord"></a>

### pendulum.drawCord(context)
Рисует шнур/стержень (cord/rod), на котором висит груз

**Kind**: instance method of [<code>Pendulum</code>](#Pendulum)  

| Param | Description |
| --- | --- |
| context | Контекст 2D рендеринга для элемента canvas |

<a name="Pendulum+draw"></a>

### pendulum.draw(context, interval)
Рисует маятник целиком

**Kind**: instance method of [<code>Pendulum</code>](#Pendulum)  

| Param | Description |
| --- | --- |
| context | Контекст 2D рендеринга для элемента canvas |
| interval | Интервал, через который происходит перерисовка canvas |

<a name="Pendulum.calcAmplitude"></a>

### Pendulum.calcAmplitude(angle, length) ⇒ <code>number</code>
Вычисляет амплитуду колебания

**Kind**: static method of [<code>Pendulum</code>](#Pendulum)  
**Returns**: <code>number</code> - Амплитуда колебания  

| Param | Description |
| --- | --- |
| angle | Угол начального отклонения (в градусах) |
| length | Длина подвеса |

<a name="Pendulum.calcPeriod"></a>

### Pendulum.calcPeriod(length) ⇒ <code>number</code>
Вычисляет период колебания

**Kind**: static method of [<code>Pendulum</code>](#Pendulum)  
**Returns**: <code>number</code> - Период колебания  

| Param | Description |
| --- | --- |
| length | Длина подвеса |
