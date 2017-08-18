class MathUtils {
	static intersectsRects(a, b) {
		return ( a.left < (b.left + b.width) ) &&
			( b.left < (a.left + a.width) ) &&
			( a.top < (b.top + b.height) ) &&
			( b.top < (a.top + a.height) );
	};

	static intersectsVertical(a, b) {
		return ( a.left < (b.left + b.width) ) &&
			( b.left < (a.left + a.width) );
	}

	static intersectsHorisontal(a, b) {
		return ( a.top < (b.top + b.height) ) &&
			( b.top < (a.top + a.height) );
	}
}