function delay(ms: number) {
	return function(target, property, descriptor) { 
		let orig = descriptor.value;
		descriptor.value = function(...args) {
			setTimeout(function() { orig.apply(this, args); }, ms);
		};
		return descriptor;
	}
}

function debounce(ms: number) {
	return function(target, property, descriptor) {
		let orig = descriptor.value;

		let flag = true; //:(

		descriptor.value = function(...args) {
			if (flag) {
				orig.apply(this, args);
				flag = false;
				setTimeout(function() { flag = true; }, ms);
			}
		} 

		return descriptor;
	}
}

function throttle(ms: number) {
	return function(target, property, descriptor) {
		let orig = descriptor.value;
		let flag = true; //:(
		let call = false; //:(
		let arg = [];

		descriptor.value = function(...args) { 
			if (flag) {
				orig.apply(this, args);
				flag = false;
				let g = function h() { setTimeout(function() { 
					flag = true; 
					if (call) { 
						orig.apply(this, args); 
						call = false; 
						flag = false;
						h();
					} 
				}, ms) };
				g();
			} else {
				arg = args;
				call = true;
			}
		} 
	}
}


class Test {
	constructor() { }

//	@delay(3000)
//	@debounce(3000)
	@throttle(3000)
	write(s: string) {
		console.log(s);
	}
}

let i = 1;
let t = new Test();
t.write((i++).toString());
t.write((i++).toString());
t.write((i++).toString());


