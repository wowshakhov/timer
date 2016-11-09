function log(str) { console.log(str); }

function delay(f, ms) {
	return function() { 
		let that = this;
		let args = arguments;
		setTimeout(() => { f.apply(that, args); }, ms);
	} 
}

function debounce(f, ms) {
	let flag = true;
	return function() { 
		let that = this;
		let args = arguments;
		if (flag) {
			f.apply(that, args);
			flag = false;
			setTimeout(function() { flag = true; }, ms);
		}
	} 
}

function throttle(f, ms) {
	let flag = true;
	let call = false;
	return function() { 
		let that = this;
		let args = arguments;
		if (flag) {
			f.apply(that, args);
			flag = false;
			setTimeout(function() { 
				flag = true; 
				if (call) { 
					f.apply(that, args); 
					call = false; 
				} 
			}, ms);
		} else {
			call = true;
		}
	} 
}

var d = delay(log, 10000);
var b = debounce(log, 10000);
var t = throttle(log, 10000);