***Библиотека для управления временем вызова функций***

**Установка**

```
git clone https://github.com/wowshakhov/timer.git
cd timer
npm install
webpack
```

**Использование**

*TypeScript декораторы*

```@delay(n)``` - задерживает выполнение функции на n миллисекунд

```@debounce(n)``` - предотвращает вызов функции на следующие n миллисекунд

```@throttle(n)``` - предотвращает вызов функции на следующие n миллисекунд с гарантированным выполнением последнего вызова

Импорт: ```import { delay, debounce, throttle } from "./lib"```

*JavaScript функции*

```delay(f, ms)```

```debounce(f, ms)```

```throttle(f, ms)```
