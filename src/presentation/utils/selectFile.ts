export const selectFile = (): Promise<File> =>
	new Promise((resolve, reject) => {
		const inputEl = document.createElement('input');
		inputEl.type = 'file';
		inputEl.accept = 'image/png';
		inputEl.multiple = false;
		inputEl.click();
		inputEl.addEventListener('change', async (evt) => {
			const file = (evt.target as HTMLInputElement).files?.[0];
			if (!file) return reject();
			resolve(file);
		});
		inputEl.addEventListener('error', reject);
	});
