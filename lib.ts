/*
delay decorator -- delays function calls by ms milliseconds

ms: number -- delay in milliseconds

returns function descriptor
*/
export function delay(ms: number) {
    return (target, property, descriptor) => { 
        let orig = descriptor.value;
        descriptor.value = function(...args) {
            setTimeout( () => {
                //call function with original arguments after timeout ms
                orig.apply(this, args); 
            }, ms);
        };
        return descriptor;
    };
}

/*
debounce decorator -- prevents successive calls of a function within ms milliseconds

ms: number -- time interval in milliseconds

returns function descriptor
*/
export function debounce(ms: number) {
    return (target, property, descriptor) => {
        let orig = descriptor.value;
        //flag indicates if the function is in the cooldown state
        let flag = true;
        descriptor.value = function(...args) {
            //if function isn't in cooldown
            if (flag) {
                //call function with original arguments
                orig.apply(this, args);
                //prevent following calls
                flag = false;
                //allow calls after ms milliseconds
                setTimeout(() => {
                    flag = true;
                }, ms);
            }
        };
        return descriptor;
    };
}

/*
cumulative_debounce decorator -- prevents successive calls of a function within ms milliseconds
if the function is called during cooldown. the cooldown period extends by another ms milliseconds

ms: number -- time interval in milliseconds

returns function descriptor
*/
export function cumulative_debounce(ms: number) {
    return (target, property, descriptor) => {
        let orig = descriptor.value;
        let flag = true;
        //timer identifier
        let time = null;
        descriptor.value = function(...args) {
            if (flag) {
                orig.apply(this, args);
                flag = false;
                time = setTimeout(() => {
                    flag = true;
                }, ms);
            } else {
                //if in cooldown - extend the cooldown period by resetting the timer
                clearTimeout(time);
                time = setTimeout(() => {
                    flag = true;
                }, ms);
            }
        };
        return descriptor;
    };
}

/*
throttle  decorator -- prevents successive calls of a function within ms milliseconds 
with guaranteed call after the last cooldown period

ms: number -- time interval in milliseconds

returns function descriptor
*/
export function throttle(ms: number) {
    return (target, property, descriptor) => {
        let orig = descriptor.value;
        let flag = true;
        //true if there was a call during the cooldown period
        let call = false;
        descriptor.value = function(...args) {
            if (flag) {
                orig.apply(this, args);
                flag = false;
                let that = this;
                let g = function h() {
                    setTimeout(() => {
                        //allow function calls
                        flag = true;
                        //if there was a call during cooldown
                        if (call) {
                            //perform the call
                            orig.apply(that, args);
                            //start cooldown again
                            call = false;
                            flag = false;
                            h();
                        }
                    }, ms);
                };
                //start cooldown
                g();
            } else {
                call = true;
            }
        };
    };
}
