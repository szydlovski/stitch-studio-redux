export const dataUrlToXataBase64 = (dataUrl: string) => {
	return dataUrl.split(',')[1];
};