import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export interface UseDisclosure {
	isOpen: boolean;
	open: () => void;
	close: () => void;
	toggle: () => void;
	set: Dispatch<SetStateAction<boolean>>;
}

export const useDisclosure = (): UseDisclosure => {
	const [isOpen, set] = useState(false);
	const open = useCallback(() => set(true), []);
	const close = useCallback(() => set(false), []);
	const toggle = useCallback(() => set((prev) => !prev), []);
	return { isOpen, open, close, toggle, set };
};
