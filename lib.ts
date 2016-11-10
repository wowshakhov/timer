export function delay(ms: number) {
	return (target, property, descriptor) => { 
		let orig = descriptor.value;
		descriptor.value = function(...args) {
			setTimeout( () => { orig.apply(this, args); }, ms);
		};
		return descriptor;
	}
}

export function debounce(ms: number) {
	return (target, property, descriptor) => {
		let orig = descriptor.value;

		let flag = true; //:(

		descriptor.value = function(...args) {
			if (flag) {
				orig.apply(this, args);
				flag = false;
				setTimeout( () => { flag = true; }, ms);
			}
		} 

		return descriptor;
	}
}

export function throttle(ms: number) {
	return (target, property, descriptor) => {
		let orig = descriptor.value;
		let flag = true; //:(
		let call = false; //:(
		let arg = [];

		descriptor.value = function(...args) { 
			if (flag) {
				orig.apply(this, args);
				flag = false;
				let that = this;
				let g = function h() { setTimeout(() => { 
					flag = true; 
					if (call) { 
						orig.apply(that, args); 
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