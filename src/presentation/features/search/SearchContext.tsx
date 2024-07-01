import { LucideIcon } from 'lucide-react';
import { StaticImageData } from 'next/image';
import {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

interface CustomSearchItem {
	id: string;
	label: string;
	onClick?: VoidFunction;
	icon?: LucideIcon;
	image?: StaticImageData;
	href?: string;
}

interface SearchContextType {
	items: CustomSearchItem[];
	setItems: Dispatch<SetStateAction<CustomSearchItem[]>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [items, setItems] = useState<CustomSearchItem[]>([]);
	return (
		<SearchContext.Provider value={{ items, setItems }}>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearchContext = () => {
	const context = useContext(SearchContext);
	if (context === undefined) {
		throw new Error(
			'useSearchContext must be used within a SearchContextProvider'
		);
	}
	return context;
};

export const useCustomSearchItems = (items: CustomSearchItem[]) => {
	const { setItems } = useSearchContext();
	useEffect(() => {
		setItems((prev) => [...prev, ...items]);
		return () => {
			setItems((prev) => prev.filter((item) => !items.includes(item)));
		};
	}, [items, setItems]);
};
