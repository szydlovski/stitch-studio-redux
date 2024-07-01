'use client';
import {
	DependencyList,
	Dispatch,
	Fragment,
	ReactNode,
	SetStateAction,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useReducer,
	useRef,
	useState,
} from 'react';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Dialog, DialogContent, Button } from '@components/ui';
import { createPortal } from 'react-dom';
import { useDisclosure } from '@lib/hooks/useDisclosure';

interface ModalHostContextType {
	state: ModalHostProviderState;
	dispatch: Dispatch<ModalHostProviderAction>;
	containerRef: React.RefObject<HTMLDivElement>;
}

const ModalContext = createContext<ModalHostContextType | undefined>(undefined);

type ModalHostProviderAction = ReturnType<
	(typeof modalProviderActions)[keyof typeof modalProviderActions]
>;

interface ModalHostProviderProps {
	children: ReactNode;
}

interface ModalInstanceProps {
	children: ReactNode;
}

interface ModalInstanceState {
	id: string;
	open: boolean;
}

interface ModalHostProviderState {
	instances: ModalInstanceState[];
}

type ModalInstanceUpdatePayload = Partial<Omit<ModalInstanceState, 'id'>> &
	Pick<ModalInstanceState, 'id'>;

const {
	reducer: modalProviderReducer,
	getInitialState: getModalHostProviderInitialState,
	actions: modalProviderActions,
} = createSlice({
	name: 'modalProvider',
	initialState: (): ModalHostProviderState => ({
		instances: [],
	}),
	reducers: {
		setModals: (state, action: PayloadAction<ModalInstanceState[]>) => {
			state.instances = action.payload;
		},
		updateModal: (state, action: PayloadAction<ModalInstanceUpdatePayload>) => {
			const { id, ...update } = action.payload;
			const instance = state.instances.find((instance) => instance.id === id);
			if (!instance) {
				return;
			}
			Object.assign(instance, update);
		},
		addModal: (state, action: PayloadAction<ModalInstanceState>) => {
			state.instances.push(action.payload);
		},
		removeModal: (state, action: PayloadAction<string>) => {
			state.instances = state.instances.filter(
				(instance) => instance.id !== action.payload
			);
		},
		setModalOpen: (
			state,
			action: PayloadAction<{ id: string; value: boolean }>
		) => {
			const instance = state.instances.find(
				(instance) => instance.id === action.payload.id
			);
			if (!instance) return;
			instance.open = action.payload.value;
		},
		openModal: (state, action: PayloadAction<string>) => {
			const instance = state.instances.find(
				(instance) => instance.id === action.payload
			);
			if (!instance) return;
			instance.open = true;
		},
		closeModal: (state, action: PayloadAction<string>) => {
			const instance = state.instances.find(
				(instance) => instance.id === action.payload
			);
			if (!instance) return;
			instance.open = false;
		},
		toggleModal: (state, action: PayloadAction<string>) => {
			const instance = state.instances.find(
				(instance) => instance.id === action.payload
			);
			if (!instance) return;
			instance.open = !instance.open;
		},
	},
});

export const ModalHostProvider = ({ children }: ModalHostProviderProps) => {
	const [state, dispatch] = useReducer(
		modalProviderReducer,
		getModalHostProviderInitialState()
	);
	const containerRef = useRef<HTMLDivElement>(null);
	return (
		<ModalContext.Provider value={{ state, dispatch, containerRef }}>
			{children}
			<div ref={containerRef}></div>
		</ModalContext.Provider>
	);
};

const useModalContext = () => {
	const context = useContext(ModalContext);
	if (context === undefined) {
		throw new Error('useModalContext must be used within a ModalHostProvider');
	}
	return context;
};

interface UseGlobalModalOptions {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	initialOpen?: boolean;
}

export const useGlobalModal = <Props extends Record<string, any>>(
	Component: (props: Props) => ReactNode,
	props: Props,
	{
		open: controlledOpen,
		onOpenChange,
		initialOpen = false,
	}: UseGlobalModalOptions = {}
) => {
	const deps = useMemo(() => Object.values(props), [props]);
	const id = useMemo(
		() => Number(Math.random().toString().replace('.', '')).toString(36),
		[]
	);
	const { dispatch, containerRef } = useModalContext();

	const handleOpenChange = useCallback(
		(value: boolean) =>
			onOpenChange
				? onOpenChange(value)
				: dispatch(modalProviderActions.setModalOpen({ id, value })),
		[dispatch, onOpenChange, id]
	);

	const open = useCallback(() => handleOpenChange(true), [handleOpenChange]);
	const close = useCallback(() => handleOpenChange(false), [handleOpenChange]);

	useEffect(() => {
		console.log('controlled open effect');

		if (controlledOpen !== undefined) {
			dispatch(
				modalProviderActions.setModalOpen({ id, value: controlledOpen })
			);
		}
	}, [controlledOpen, dispatch, id]);

	useEffect(() => {
		console.log('add modal effect');

		dispatch(
			modalProviderActions.addModal({
				// children: <Component {...props} />,
				id,
				open: initialOpen,
			})
		);
		createPortal(
			<Dialog
				open={initialOpen}
				onOpenChange={(value) =>
					dispatch(modalProviderActions.setModalOpen({ id, value }))
				}
			>
				<Component {...props} />
			</Dialog>,
			containerRef.current as HTMLElement
		);
		console.log('portalled');

		return () => {
			dispatch(modalProviderActions.removeModal(id));
		};
	}, []);

	useEffect(() => {
		console.log('update modal');

		dispatch(
			modalProviderActions.updateModal({
				id,
				// children: <Component {...props} />,
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...deps]);

	return {
		open,
		close,
	};
};

export const GlobalModal = <Props extends Record<string, any>>({
	children,
	open,
	onOpenChange,
	initialOpen = false,
}: {
	children: ReactNode;
	open?: boolean;
	onOpenChange?: Dispatch<SetStateAction<boolean>>;
	initialOpen?: boolean;
}) => {
	const id = useMemo(
		() => Number(Math.random().toString().replace('.', '')).toString(36),
		[]
	);
	const { state, dispatch, containerRef } = useModalContext();

	useEffect(() => {
		console.log('add modal effect');

		dispatch(
			modalProviderActions.addModal({
				// children: <Component {...props} />,
				id,
				open: initialOpen,
			})
		);

		return () => {
			dispatch(modalProviderActions.removeModal(id));
		};
	}, []);

	const instance = state.instances.find((instance) => instance.id === id);

	if (!containerRef.current || !instance) return null;

	return createPortal(
		<Dialog
			open={open ?? instance.open}
			onOpenChange={(value) =>
				onOpenChange
					? onOpenChange(value)
					: dispatch(modalProviderActions.setModalOpen({ id, value }))
			}
		>
			{children}
		</Dialog>,
		containerRef.current as HTMLElement
	);
};

const ConsumerChildModal = ({
	count,
	setCount,
}: {
	count: number;
	setCount: Dispatch<SetStateAction<number>>;
}) => {
	return (
		<DialogContent className="w-[170px]">
			<div>
				<h2>This is a modal {count}</h2>
				<Button onClick={() => setCount((count) => count + 1)}>
					Increment
				</Button>
				<button>elo</button>
			</div>
		</DialogContent>
	);
};

const ConsumerModalContent = ({
	count,
	setCount,
}: {
	count: number;
	setCount: Dispatch<SetStateAction<number>>;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<DialogContent>
			<div>
				<h2>This is a modal {count}</h2>
				<Button onClick={() => setIsOpen(true)}>Open secondary modal</Button>
				<GlobalModal open={isOpen} onOpenChange={setIsOpen}>
					<DialogContent className="w-[170px]">
						<div>
							<h2>This is a modal {count}</h2>
							<Button onClick={() => setCount((count) => count + 1)}>
								Increment
							</Button>
							<p>{`It's very long.`}</p>
							<p>{`It's very long.`}</p>
							<p>{`It's very long.`}</p>
							<p>{`It's very long.`}</p>
							<p>{`It's very long.`}</p>
							<p>{`It's very long.`}</p>
							<p>{`It's very long.`}</p>
							<p>{`It's very long.`}</p>
							<button>elo</button>
						</div>
					</DialogContent>
				</GlobalModal>
			</div>
		</DialogContent>
	);
};

export const Consumer = () => {
	console.log('render consumer');

	const [count, setCount] = useState(0);
	const { state: isOpen, set: setIsOpen, open } = useDisclosure();
	return (
		<div>
			<h2>Some View</h2>
			<p>{`count: ${count}`}</p>
			<Button onClick={open}>Open modal</Button>
			<GlobalModal open={isOpen} onOpenChange={setIsOpen}>
				<ConsumerModalContent count={count} setCount={setCount} />
			</GlobalModal>
		</div>
	);
};
