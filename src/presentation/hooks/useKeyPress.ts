import { useEffect } from "react";

export const useKeyPress = (key: string, callback: () => void) => {
	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.key === key) {
				callback();
			}
		};

		document.addEventListener('keydown', handleKeyPress);
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [callback, key]);
};
