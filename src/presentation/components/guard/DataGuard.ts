import { MutationStatus, QueryStatus } from '@tanstack/react-query';
import { ReactNode } from 'react';

export const QueryStatusGuard = <T>({
	props,
	status,
	children,
	loadingContent,
	errorContent,
	_forceErrorState,
	_forceLoadingState,
}: {
	props: T;
	status: QueryStatus | MutationStatus;
	children: (props: Exclude<T, undefined>) => ReactNode;
	loadingContent: ReactNode;
	errorContent: ReactNode;
	_forceErrorState?: boolean;
	_forceLoadingState?: boolean;
}) => {
	if (_forceErrorState) return errorContent;
	if (_forceLoadingState) return loadingContent;
	return status === 'idle'
		? null
		: status === 'pending'
		? loadingContent
		: status === 'error'
		? errorContent
		: children(props as Exclude<T, undefined>);
};
