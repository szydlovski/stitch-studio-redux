import { useUpdateProductAttributes } from '@application/product/updateProductAttributes';
import { RendererProvider } from '@components/context/RendererContext';
import {
	Button,
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from '@components/ui';
import { MockupCustomizer } from '@presentation/views/ProductImagesView/components/MockupCustomizer';
import {
	MockupCustomizerActions,
	getMockupCustomizerInitialState,
	mockupCustomizerReducer,
} from '@presentation/views/ProductImagesView/components/MockupCustomizer/mockupCustomizerReducer';
import isEqual from 'lodash.isequal';
import { useCallback, useMemo, useReducer, useState } from 'react';
import { useProductContext } from '../ProductContext';
import { useQueryClient } from '@tanstack/react-query';
import { getProductQueryKey } from '@application/product';

export const MockupSettingsModal = ({
	children,
}: {
	children: JSX.Element;
}) => {
	const queryClient = useQueryClient();
	const { product } = useProductContext();
	const [initialState, setInitialState] = useState(
		product.attributes.hoopConfig ?? getMockupCustomizerInitialState()
	);
	console.log(product.attributes.hoopConfig?.background);
	console.log(initialState.background);

	const [state, dispatch] = useReducer(
		mockupCustomizerReducer,
		initialState,
		() => initialState
	);
	console.log(state.background);

	const hasChanges = useMemo(
		() => !isEqual(state, initialState),
		[state, initialState]
	);
	const { mutate, status } = useUpdateProductAttributes({
		onSettled: (data) => data && setInitialState(data.attributes.hoopConfig!),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: getProductQueryKey(product.id),
			}),
	});
	const handleSave = useCallback(
		() =>
			mutate({
				id: product.id,
				body: {
					...product.attributes,
					hoopConfig: state,
				},
			}),
		[state, product]
	);
	return (
		<Dialog
			onOpenChange={(state) =>
				state && dispatch(MockupCustomizerActions.assign(initialState))
			}
		>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-xl">
				<DialogHeader>Mockup Settings</DialogHeader>
				<RendererProvider>
					<MockupCustomizer
						state={state}
						dispatch={dispatch}
						pattern={product.pattern}
					/>
				</RendererProvider>
				<DialogFooter>
					{hasChanges && (
						<span className="mr-auto flex items-center font-semibold text-sm">
							You have unsaved changes.
						</span>
					)}
					<Button
						disabled={!hasChanges || status === 'pending'}
						onClick={handleSave}
					>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
