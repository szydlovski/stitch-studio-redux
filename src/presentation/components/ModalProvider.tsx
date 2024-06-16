'use client';
import {
	DependencyList,
	Dispatch,
	Fragment,
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useReducer,
	useState,
} from 'react';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Dialog, DialogContent, Button } from '@components/ui';

interface ModalHostContextType {
	state: ModalHostProviderState;
	dispatch: Dispatch<ModalHostProviderAction>;
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
	children: ReactNode;
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
	return (
		<ModalContext.Provider value={{ state, dispatch }}>
			{children}
			{state.instances.map(({ id, children, open }, index) => (
				<Dialog
					open={open}
					key={index}
					onOpenChange={(value) =>
						dispatch(modalProviderActions.setModalOpen({ id, value }))
					}
				>
					<Fragment key={index}>{children}</Fragment>
				</Dialog>
			))}
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

export const useGlobalModal = (
	children: ReactNode,
	deps: DependencyList,
	{
		open: controlledOpen,
		onOpenChange,
		initialOpen = false,
	}: UseGlobalModalOptions = {}
) => {
	const id = useMemo(
		() => Number(Math.random().toString().replace('.', '')).toString(36),
		[]
	);
	const { dispatch } = useModalContext();

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
		if (controlledOpen !== undefined) {
			dispatch(
				modalProviderActions.setModalOpen({ id, value: controlledOpen })
			);
		}
	}, [controlledOpen, dispatch, id]);

	useEffect(() => {
		dispatch(
			modalProviderActions.addModal({ children, id, open: initialOpen })
		);
		return () => {
			dispatch(modalProviderActions.removeModal(id));
		};
	}, [children, dispatch, id, initialOpen]);

	useEffect(() => {
		dispatch(modalProviderActions.updateModal({ id, children }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);

	return {
		open,
		close,
	};
};

const GlobalModal = ({
	children,
	...options
}: { children: ReactNode } & UseGlobalModalOptions) => {
	useGlobalModal(children, [children], options);
	return null;
};

const ConsumerModalContent = () => {
	const [isOpen, setIsOpen] = useState(false);
	const doOpen = useCallback(() => setIsOpen(true), []);
	// const doClose = useCallback(() => setIsOpen(false), []);
	const [count, setCount] = useState(0);
	return (
		<DialogContent>
			<div>
				<h2>This is a modal {count}</h2>
				<Button onClick={doOpen}>Open secondary modal</Button>
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
	const { open } = useGlobalModal(<ConsumerModalContent />, [], {
		initialOpen: true,
	});
	return (
		<div>
			<h2>Some View</h2>
			<Button onClick={open}>Open modal</Button>
		</div>
	);
};
