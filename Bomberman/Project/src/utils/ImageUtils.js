class ImageUtils {
    static createImage(onLoadHandler) {
    	const image = new Image();
    	image.onload = onLoadHandler;

    	return image;
    }
}