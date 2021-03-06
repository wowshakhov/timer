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

```@cumulative_debounce(n)``` - предотвращает вызов функции на следующие n миллисекунд. При вызове функции во время задержки задержка сбрасывается.

```@throttle(n)``` - предотвращает вызов функции на следующие n миллисекунд с гарантированным выполнением последнего вызова

Импорт: ```import { delay, debounce, cumulative_debounce, throttle } from "./lib"```
