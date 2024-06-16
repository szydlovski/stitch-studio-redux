const readImageFileAsDataURL = (file: Blob): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});

const loadImageFromDataUrl = (dataUrl: string): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const img = Object.assign(document.createElement('img'), {
			src: dataUrl,
		});
		img.onload = () => resolve(img);
		img.onerror = reject;
	});

export const readImageFromFile = (file: Blob): Promise<HTMLImageElement> =>
	readImageFileAsDataURL(file).then((src) => loadImageFromDataUrl(src));
