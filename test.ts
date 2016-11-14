import { delay, debounce, throttle, cumulative_debounce } from './lib';

export class Test {

    constructor() {
        this.flag = 0;
    }
    
    flag: number = 0;

    @delay(1000)
    test_delay() {
        this.flag++;
    }
    @debounce(1000)
    test_debounce() {
        this.flag++;
    }
    @throttle(1000)
    test_throttle() {
        this.flag++;
    }
    @cumulative_debounce(1000)
    test_cumulative_debounce() {
        this.flag++;
    }
}
