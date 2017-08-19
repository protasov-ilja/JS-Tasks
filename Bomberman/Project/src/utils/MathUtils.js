class MathUtils {
	static intersectsRects(a, b) {
		return ( MathUtils.intersectsVertical(a, b) && MathUtils.intersectsHorisontal(a, b) );
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