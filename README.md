# pendulum-test
Простое веб-приложение, симулирующее поведение математического маятника с помощью HTML5 Canvas.

## Как запустить
1. Склонировать этот репозиторий или скачать и распаковать [архив с исходным кодом](https://github.com/kkmoskalenko/pendulum-test/archive/master.zip).
2. Открыть `index.html` любым браузером

# Документация

## Классы

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
    * _instance_
        * [.clear()](#Application+clear)
        * [.redraw()](#Application+redraw)
    * _static_
        * [.getData()](#Application.getData) ⇒ <code>\*</code>
        * [.validateData()](#Application.validateData) ⇒ <code>boolean</code>
        * [.enableInputFields()](#Application.enableInputFields)
        * [.disableInputFields()](#Application.disableInputFields)

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
<a name="Application.getData"></a>

### Application.getData() ⇒ <code>\*</code>
Получает данные полей

**Kind**: static method of [<code>Application</code>](#Application)
**Returns**: <code>\*</code> - Данные полей или null, если они заполнены неправильно
<a name="Application.validateData"></a>

### Application.validateData() ⇒ <code>boolean</code>
Выводит alert'ы о недопустимых значениях

**Kind**: static method of [<code>Application</code>](#Application)
**Returns**: <code>boolean</code> - Флаг, верно ли заполнены поля
<a name="Application.enableInputFields"></a>

### Application.enableInputFields()
Активирует поля ввода

**Kind**: static method of [<code>Application</code>](#Application)
<a name="Application.disableInputFields"></a>

### Application.disableInputFields()
Блокирует поля ввода

**Kind**: static method of [<code>Application</code>](#Application)
<a name="Pendulum"></a>

## Pendulum
Класс, представляющий маятник

**Kind**: global class

* [Pendulum](#Pendulum)
    * [new Pendulum(supportX0, supportY0, radius, amplitude, dt, length)](#new_Pendulum_new)
    * [.calcX()](#Pendulum+calcX) ⇒ <code>number</code>
    * [.calcY()](#Pendulum+calcY) ⇒ <code>number</code>
    * [.calcPeriod()](#Pendulum+calcPeriod) ⇒ <code>number</code>
    * [.drawBob(context)](#Pendulum+drawBob)
    * [.drawCord(context)](#Pendulum+drawCord)
    * [.draw(context)](#Pendulum+draw)

<a name="new_Pendulum_new"></a>

### new Pendulum(supportX0, supportY0, radius, amplitude, dt, length)
Создаёт маятник


| Param | Description |
| --- | --- |
| supportX0 | Координата точки крепления маятника по оси X |
| supportY0 | Координата точки крепления маятника по оси Y |
| radius | Радиус груза (так как он имеет форму шара) |
| amplitude | Амплитуда колебания |
| dt | Шаг во времени – время, которое прибавляется к текущему при каждой перерисовке |
| length | Длина нити |

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
<a name="Pendulum+calcPeriod"></a>

### pendulum.calcPeriod() ⇒ <code>number</code>
Вычисляет период колебания

**Kind**: instance method of [<code>Pendulum</code>](#Pendulum)
**Returns**: <code>number</code> - Период колебания
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

### pendulum.draw(context)
Рисует маятник целиком

**Kind**: instance method of [<code>Pendulum</code>](#Pendulum)

| Param | Description |
| --- | --- |
| context | Контекст 2D рендеринга для элемента canvas |